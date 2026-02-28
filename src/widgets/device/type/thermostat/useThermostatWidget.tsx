import { useState, useEffect, useCallback } from 'react';
import { fetchDevice, toggleDevice } from '@/api/devices';

export type ThermostatState = {
    temperature: number;
};

export type ThermostatActions = {
    setTemperature: (value: number) => void;
};

export function useThermostatWidget(deviceId: number) {
    const [state, setState] = useState<ThermostatState>({
        temperature: 50,
    });

    const setTemperature = useCallback((value: number) => {
        setState(s => ({
            ...s,
            temperature: Math.max(30, Math.min(90, value)),
        }));
    }, [setState]);

    useEffect(() => {
        fetchDevice(deviceId).then(data => {
            setState(s => ({ ...s, temperature: Number(data.state) }))
        });
    }, [deviceId]);

    return {
        state,
        actions: {
            setTemperature,
        },
    };
}
