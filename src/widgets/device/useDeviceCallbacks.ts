import { useCallback, Dispatch } from 'react';
import { setDevicePower, setDeviceBrightness, setDeviceColor, setDeviceTemperature } from '@/api/devices';

export type DeviceActions = {
} | any;

export function useDeviceCallbacks(device: any, setState: Dispatch<any>) {
    const deviceId: number = device.id;


    const setPower = useCallback(async (power: boolean) => {
        const result = await setDevicePower(deviceId, power);

        // TODO: Parse device state on the backend so it is validated
        result.state = JSON.parse(result.state);

        if(result && typeof result.state.power === 'boolean') {
            setState((s: any) => ({ ...s, power: result.state.power }));
        }
    }, [deviceId, setState]);

    const setBrightness = useCallback(async (brightness: number) => {
        const result = await setDeviceBrightness(deviceId, brightness);

        // TODO: Parse device state on the backend so it is validated
        result.state = JSON.parse(result.state);

        if(result && typeof result.state.brightness === 'number') {
            setState((s: any) => ({ ...s, brightness: result.state.brightness }));
        }
    }, [deviceId, setState]);

    const setColor = useCallback(async (color: [number, number, number]) => {
        const result = await setDeviceColor(deviceId, color);

        // TODO: Parse device state on the backend so it is validated
        result.state = JSON.parse(result.state);

        if(result && Array.isArray(result.state.color) && result.state.color.length === 3) {
            setState((s: any) => ({ ...s, color: result.state.color }));
        }
    }, [deviceId, setState]);

    const setTemperature = useCallback(async (value: number) => {
        const newValue = Math.max(30, Math.min(90, value));

        const result = await setDeviceTemperature(deviceId, newValue);

        // TODO: Parse device state on the backend so it is validated
        result.state = JSON.parse(result.state);

        setState((s: any) => ({
            ...s,
            targetTemperature: result.state.targetTemperature,
        }));
    }, [deviceId, setState]);
    

    return {
        setPower,
        setBrightness,
        setColor,
        setTemperature,
    };
}
