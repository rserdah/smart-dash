// Modified from Gemini
import { tool } from 'ai';
import { z, ZodNumber } from 'zod'; // Used for type-safe schemas
import { DeviceService } from '../services/deviceServices';

const deviceService = new DeviceService();

// Modified from Google AI Mode
const getCoordinates = async (cityState: string) => {
    const baseUrl = 'https://nominatim.openstreetmap.org/search';
    const queryParams = new URLSearchParams({
        q: cityState,
        format: 'json',
        limit: '1',
        countrycodes: 'us'
    });

    const headers = {
        'User-Agent': 'MyWeatherVercelApp/1.0 (contact@myweatherapp.com)',
    };

    try {
        // Do NOT pass a custom 'User-Agent' header here; the browser will restrict it on the frontend.
        const response = await fetch(`${baseUrl}?${queryParams.toString()}`, { headers });
        if(!response.ok) throw new Error('Network error');

        const data = await response.json();
        if(data.length === 0) return null;

        return {
            latitude: parseFloat(data[0].lat),
            longitude: parseFloat(data[0].lon)
        };
    } catch(error) {
        console.error('Frontend Fetch Error:', error);
        return null;
    }
};

const getWeatherData = async (latitude: number, longitude: number) => {
    const coords = `${latitude},${longitude}`;

    return fetch(`https://api.weather.gov/points/${coords}`).then(res => res.json()).then(resJson => Promise.all([
        {
            city: resJson.properties.relativeLocation.properties.city,
            state: resJson.properties.relativeLocation.properties.state,
            forecastUrl: resJson.properties.forecast,
            forecastHourlyUrl: resJson.properties.forecastHourly,
        },
        fetch(resJson.properties.forecast).then(res => res.json()).then(resJson => ({
            forecastPeriods: resJson.properties.periods,
        }))
    ])).then(([x, y]) => ({ ...x, ...y }))
        .then(x => !console.warn(JSON.stringify(x)) && x)
        .then(x => ({
            cityState: `${x.city}`,
            forecast: x.forecastPeriods.map((forecast: any) => ({
                shortForecast: forecast.shortForecast,
                detailedForecast: forecast.detailedForecast,
            })),
        }));
};

export const homeTools = {
    /* 1. Fetch Phase tools */
    fetch_weather: tool({
        description: `
            Fetch the weather data:
                Decide the city and state for the user's weather request and put it into cityState in the format of 'City, State'.
        `,
        inputSchema: z.object({
            cityState: z.string().describe(`The 'City, State' that the user requests the weather for.`),
        }),
        execute: async ({ cityState }) => {
            try {
                const coords = await getCoordinates(cityState);
                const weatherData = await getWeatherData(coords?.latitude, coords?.longitude);

                // Return this so the AI knows it worked (Gemini reads this return and can respond based on it)
                return {
                    weatherData: weatherData,
                    longitude: coords?.longitude,
                    latitude: coords?.latitude,
                };
            } catch(error) {
                return {
                    status: 'error',
                    message: 'Failed to fetch weather',
                };
            }
        },
    }),
    /******************************************************************************/

    /* 2. Execute Phase tools */
    execute_control_device: tool({
        /* The tool descriptions must be specific or else it won't know how to use them. */
        description: `
            Update a smart home device state like power, brightness, or temperature.
            First determine the deviceId parameter from the request (deviceId must be a number and can be found in the message request). If a user is vague (e.g., "Make it bright"), ask which room or check the devices first to determine the deviceId.
            Then create the state parameter (which dictates the new target state of the device) (e.g. to turn off a device, use state object { power: false }).
            The user can describe a scene or mood and you must decide the most appropriate state object to create that scene/mood 
            (e.g. if the user requests a mood for movie-watching, turn down the brightness, turn on the light power, and decide the color of the light based on the scene/mood description. Choose an appropriate color of the light based on the requested mood (neutral, happy, sad, scary, etc.))

            To set the color parameter, it must be an array of three integers like [red, green, blue] where each integer is 0-255.
        `,
        /* USE inputSchema INSTEAD OF parameters OR ELSE THE SCHEMA WILL BE IGNORED (it won't get passed correctly and Gemini will receive `"parameters": { "type": "TYPE_UNSPECIFIED" }, "behavior": "UNSPECIFIED"`) */
        inputSchema: z.object({
            deviceId: z.number().int().describe(`The unique ID of the device to control. This must be a number and it can be determined from the user\'s message.`),
            // The AI will build this object based on the user's request
            state: z.object({
                power: z.boolean().describe(`Set to true to turn the device ON, or false to turn it device OFF.`).optional(),
                targetTemperature: z.number().optional(),
                mode: z.string().describe(`The climate mode of a climate device. Can be 'heat', 'cool', or 'auto'.`).optional(),
                brightness: z.number().min(0).max(100).describe(`The brightness of the light on a 0-100 scale.`).optional(),
                color: z.array(z.number().int()).length(3).describe(`Must be an array of three integers [red, green, blue] where each channel can be 0-255.`).optional(),
            }).describe(`Use this to control a device by creating the new target state of the device. For example, for turning off the device, use state object { power: false }`),
            music: z.string().describe(`
                Only if the user requests music or if music is appropriate for the requested mood, choose an appropriate song that matches the requested mood.
                Search Google for a real song and artist that matches the requested mood and only respond with a song title not a description or any general information. It must be a real song title and artist name.
                If the user mentions movie-watching, going to sleep/bed, or silence, do not provide music.
            `).optional(),
        }),
        execute: async ({ deviceId, state }) => {
            try {
                const updatedDevice = await deviceService.updateDevice(deviceId, state);

                return {
                    message: `Updated ${updatedDevice.name}`,
                    controlledDeviceId: updatedDevice.id,
                    appliedState: state,
                };
            } catch(error) {
                return {
                    status: 'error',
                    message: 'Failed to update device',
                };
            }
        },
    }),
    /******************************************************************************/

    /* 3. Display Phase tool */
    display_content: tool({
        description: `
            Use the results from the context and the previous phases to display relevant content to the user. Build a 'suggestedUi' object containing a 'layout' string and 'components' array where each component has a type and JSON string props
            The possible component 'type' and 'props' are:
                - 'DEVICE_CONTROL'
                    - props: {
                        deviceId: The 'controlledDeviceId' returned from the 'execute_control_device' call
                    }
                - 'WEATHER'
                    - props: {
                        locationString: 'City, State' string deduced from the user request,
                        longitude,
                        latitude,
                    }
        `,
        inputSchema: z.object({
            suggestedUi: z.object({
                layout: z.string().describe(`What layout should the resulting UI be displayed in? The order of the components array will correspond to that component's placement within the layout so make sure the components are ordered so they are in the right spot (i.e. if a component should be more prominent or have more space, make sure it goes to a larger layout slot, etc.)`),

                components: z.array(z.discriminatedUnion('type', [
                    z.object({
                        type: z.literal('DEVICE_CONTROL'),
                        props: z.looseObject({
                            deviceId: z.number().describe(`The 'controlledDeviceId' returned from the 'execute_control_device' call`),
                        })
                    }),
                    z.object({
                        type: z.literal('WEATHER'),
                        /* Use looseObject or else if even one property doesn't match, the whole object will be empty object */
                        props: z.looseObject({
                            locationString: z.string().describe(`The 'City, State' deduced from the user request`),
                            longitude: z.number().describe(``),
                            latitude: z.number().describe(``),
                        }).describe(`Props for the component using any data available via context or 'fetch_' tool calls in the previous fetch phase.`)
                    }),
                ])),
            }).describe(`If a request should include a UI for control or display, include this object.`).optional(),
        }),
        execute: async ({ suggestedUi }) => {
            try {
                return {
                    suggestedUi: suggestedUi,
                };
            } catch(error) {
                return {
                    status: 'error',
                    message: 'Failed to display content',
                };
            }
        },
    }),
    /******************************************************************************/
};
