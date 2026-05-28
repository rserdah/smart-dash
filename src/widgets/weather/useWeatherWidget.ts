// Modified from ChatGPT
import { useState, useEffect, useCallback, useMemo } from 'react';

export type WeatherState = {
    brightness: number;
    weatherDataPromise?: Promise<any>;
};

export type WeatherActions = {
};

export function useWeatherWidget({ lat, lon }: { lat: number, lon: number }) {
    const [state, setState] = useState<WeatherState>({
        brightness: 50,
        weatherDataPromise: undefined,
    });

    const coords = `${lat},${lon}`;

    // The useMemo ensures the promise only gets re-created if a prop used in the fetch changes (e.g. coords to pass to the fetch URL)
    const weatherDataPromise = useMemo(async () => {
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
        ])).then(([x, y]) => ({ ...x, ...y }));
    }, [lat, lon]);

    useEffect(() => {
        setState(s => ({
            ...s,
            weatherDataPromise: weatherDataPromise,
        }));
    }, []);

    return {
        state,
        actions: {
        },
    };
}
