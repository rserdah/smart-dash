// Modified from Gemini
import { tool } from 'ai';
import { z, ZodNumber } from 'zod'; // Used for type-safe schemas
import { DeviceService } from '../services/deviceServices';

const deviceService = new DeviceService();

export const homeTools = {
    controlDevice: tool({
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
                console.log(`AI is calling updateDevice for ${deviceId} with state:`, state);

                const updatedDevice = await deviceService.updateDevice(deviceId, state);

                // Return this so the AI knows it worked
                return {
                    status: 'success',
                    message: `Updated ${updatedDevice.name}`,
                    appliedState: state
                };
            } catch(error) {
                return { status: 'error', message: 'Failed to update device' };
            }
        },
    }),
};
