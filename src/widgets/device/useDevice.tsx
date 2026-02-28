import { useState, useEffect, useCallback } from 'react';
import { fetchDevice, toggleDevice } from '@/api/devices';

export type DeviceState = {
    isOn: boolean;
    isSwitchOn: boolean;
    brightness: number;
};

export type DeviceActions = {
    toggle: () => void;
    toggleSwitch: () => void;
    setBrightness: (value: number) => void;
};

export function useDeviceWidget(deviceId: number) {
    const [state, setState] = useState<DeviceState>({
        isOn: false,
        isSwitchOn: false,
        brightness: 50,
    });

    const toggle = useCallback(() => {
        setState(s => ({ ...s, isOn: !s.isOn }))
    }, [setState]);

    const toggleSwitch = useCallback(async () => {
        const result = await toggleDevice(deviceId);

        setState(s => ({ ...s, isSwitchOn: result.state === 'on' }));
    }, [deviceId, setState]);

    const setBrightness = useCallback((value: number) => {
        setState(s => ({
            ...s,
            brightness: Math.max(0, Math.min(100, value)),
        }));
    }, [setState]);

    useEffect(() => {
        fetchDevice(deviceId).then(data => {
            setState(s => ({ ...s, isSwitchOn: data.state === 'on' }))
        });
    }, [deviceId]);

    return {
        state,
        actions: {
            toggle,
            toggleSwitch,
            setBrightness,
        },
    };
}
