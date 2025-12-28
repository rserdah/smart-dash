// Modified from ChatGPT
import { useState, useEffect, useCallback } from 'react';

export type LightState = {
    isOn: boolean;
    brightness: number;
};

export type LightActions = {
    toggle: () => void;
    setBrightness: (value: number) => void;
};

export function useLightWidget() {
    const [state, setState] = useState<LightState>({
        isOn: false,
        brightness: 50,
    });

    const toggle = useCallback(() => {
        setState(s => ({ ...s, isOn: !s.isOn }))
    }, []);

    const setBrightness = useCallback((value: number) => {
        setState(s => ({
            ...s,
            brightness: Math.max(0, Math.min(100, value)),
        }));
    }, []);

    useEffect(() => {
        // Example: sync with Python / GPIO
        // deviceApi.setLight(state.isOn, state.brightness)
    }, [state.isOn, state.brightness]);

    return {
        state,
        actions: {
            toggle,
            setBrightness,
        },
    };
}
