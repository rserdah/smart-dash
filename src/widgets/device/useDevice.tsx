import { useState, useEffect } from 'react';
import { useDeviceActions } from './useDeviceActions';

export type DeviceState = {
} | any;

export function useDevice(device: any) {
    const [state, setState] = useState<DeviceState>({} as DeviceState);

    const actions = useDeviceActions(device, setState);

    const deviceId: number = device.id;

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

    return {
        state,
        actions,
    };
}
