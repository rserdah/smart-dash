import { useCallback, Dispatch } from 'react';
import { toggleDevicePower, setDeviceTemperature } from '@/api/devices';

export type DeviceActions = {
} | any;

export function useDeviceCallbacks(device: any, setState: Dispatch<any>) {
    const deviceId: number = device.id;


    const togglePower = useCallback(async () => {
        const result = await toggleDevicePower(deviceId);

        if(result && typeof result.power === 'boolean') {
            setState((s: any) => ({ ...s, power: result.power }));
        }
    }, [deviceId, setState]);

    const setTemperature = useCallback(async (value: number) => {
        const newValue = Math.max(30, Math.min(90, value));

        const result = await setDeviceTemperature(deviceId, newValue);

        setState((s: any) => ({
            ...s,
            targetTemperature: result.targetTemperature,
        }));
    }, [deviceId, setState]);
    

    return {
        togglePower,
        setTemperature,
    };
}
