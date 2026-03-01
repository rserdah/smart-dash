import { useState, useEffect, useCallback } from 'react';
import { fetchDevice, toggleDevicePower, setDeviceTemperature } from '@/api/devices';

export type DeviceState = {
} | any;

export type DeviceActions = {
} | any;

export function useDevice(device: any) {
    const [state, setState] = useState<DeviceState>({});

    const deviceId: number = device.id;
    const deviceType = device.type;

    const togglePower = useCallback(async () => {
        const result = await toggleDevicePower(deviceId);

        if(result && typeof result.power === 'boolean') {
            setState((s: any) => ({ ...s, power: result.power }));
        }
    }, [deviceId, setState]);

    const setTemperature = useCallback(async (value: number) => {
        const result = await setDeviceTemperature(deviceId, value);

        setState((s: any) => ({
            ...s,
            targetTemperature: Math.max(30, Math.min(90, value)),
        }));
    }, [deviceId, setState]);

    useEffect(() => {
        let stateParsed;
        
        try {
            stateParsed = JSON.parse(device.state);
        }
        catch(e) {
            console.warn('Device state is not valid JSON');
            stateParsed = {};
        }

        setState((s: any) => stateParsed);
    }, [deviceId, setState]);

    const actions: DeviceActions = {};

    // TODO: Add capabilities to devices table, then here, go through the device capabilities and conditionally add actions based on each capability
    if(['light', 'switch', 'thermostat'].includes(deviceType)) {
        actions.togglePower = togglePower;
    }

    if(['thermostat'].includes(deviceType)) {
        actions.setTemperature = setTemperature;
    }

    return {
        state,
        actions,
    };
}
