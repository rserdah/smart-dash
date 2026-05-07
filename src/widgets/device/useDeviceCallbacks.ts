import { useCallback, Dispatch } from 'react';
import { setDevicePower, setDeviceBrightness, setDeviceColor, setDeviceTemperature } from '@/api/devices';
import { useQueryClient } from '@tanstack/react-query';

export function useDeviceCallbacks(device: any) {
    const deviceId: number = device?.id;
    const queryClient = useQueryClient();

    const setPower = useCallback(async (power: boolean) => {
        // Can't conditionally call useCallback hook so if device is empty, make the callback itself just return
        if(!device) { return; }

        const result = await setDevicePower(deviceId, power);

        // TODO: Parse device state on the backend so it is validated
        result.state = JSON.parse(result.state);

        if(result && typeof result.state.power === 'boolean') {
            queryClient.invalidateQueries({ queryKey: ['rooms'] });
        }
    }, [device, deviceId]);

    const setBrightness = useCallback(async (brightness: number) => {
        if(!device) { return; }

        const result = await setDeviceBrightness(deviceId, brightness);

        // TODO: Parse device state on the backend so it is validated
        result.state = JSON.parse(result.state);

        if(result && typeof result.state.brightness === 'number') {
            queryClient.invalidateQueries({ queryKey: ['rooms'] });
        }
    }, [device, deviceId]);

    const setColor = useCallback(async (color: [number, number, number]) => {
        if(!device) { return; }

        const result = await setDeviceColor(deviceId, color);

        // TODO: Parse device state on the backend so it is validated
        result.state = JSON.parse(result.state);

        if(result && Array.isArray(result.state.color) && result.state.color.length === 3) {
            queryClient.invalidateQueries({ queryKey: ['rooms'] });
        }
    }, [device, deviceId]);

    const setTemperature = useCallback(async (value: number) => {
        if(!device) { return; }

        const newValue = Math.max(30, Math.min(90, value));

        const result = await setDeviceTemperature(deviceId, newValue);

        // TODO: Parse device state on the backend so it is validated
        result.state = JSON.parse(result.state);
        
        queryClient.invalidateQueries({ queryKey: ['rooms'] });
    }, [device, deviceId]);
    

    return {
        setPower,
        setBrightness,
        setColor,
        setTemperature,
    };
}
