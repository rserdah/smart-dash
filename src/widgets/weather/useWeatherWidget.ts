// Modified from ChatGPT
import { useState, useEffect, useCallback, useMemo } from 'react';

export type WeatherState = {
    brightness: number;
    coords: string;
    weatherDataPromise?: Promise<any>;
};

export type WeatherActions = {
    setBrightness: (value: number) => void;
};

export function useWeatherWidget() {
    const [state, setState] = useState<WeatherState>({
        brightness: 50,
        coords: '33.84,-83.9',
        weatherDataPromise: undefined,
    });

    // The useMemo ensures the promise only gets re-created if a prop used in the fetch changes (e.g. coords to pass to the fetch URL)
    const weatherDataPromise = useMemo(async () => {
        // return fetch(`https://api.weather.gov/points/${coords}`).then(x => x.json());
        return fetch('https://api.weather.gov/points/33.84,-83.9').then(res => res.json()).then(resJson => Promise.all([
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

        // return fetch('https://api.weather.gov/points/33.84,-83.9').then(x => x.json()); // Can use a prop like coords to pass coordinates to the fetch call
    }, [state.coords /* Can use prop like coords to replace the coordinates passed to fetch */]);

    useEffect(() => {
        setState(s => ({
            ...s,
            weatherDataPromise: weatherDataPromise,
        }));
    }, []);

    const setBrightness = useCallback((value: number) => {
        setState(s => ({
            ...s,
            brightness: value,
        }));
    }, []);

    return {
        state,
        actions: {
            setBrightness,
        },
    };
}
