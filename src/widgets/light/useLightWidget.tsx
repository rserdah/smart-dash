// Modified from ChatGPT
import { useState, useEffect, useCallback } from 'react';

export type LightState = {
    isOn: boolean;
    isSwitchOn: boolean;
    brightness: number;
};

export type LightActions = {
    toggle: () => void;
    toggleSwitch: () => void;
    setBrightness: (value: number) => void;
};

export function useLightWidget() {
    const [state, setState] = useState<LightState>({
        isOn: false,
        isSwitchOn: false,
        brightness: 50,
    });

    const toggle = useCallback(() => {
        setState(s => ({ ...s, isOn: !s.isOn }))
    }, []);

    const toggleSwitch = useCallback(() => {
        setState(s => ({ ...s, isSwitchOn: !s.isSwitchOn }))
    }, []);

    const setBrightness = useCallback((value: number) => {
        setState(s => ({
            ...s,
            brightness: Math.max(0, Math.min(100, value)),
        }));
    }, []);

    // useEffect(() => {
    //     // Example: sync with Python / GPIO
    //     // deviceApi.setLight(state.isOn, state.brightness)
    // }, [state.isOn, state.brightness]);

    return {
        state,
        actions: {
            toggle,
            toggleSwitch,
            setBrightness,
        },
    };
}
