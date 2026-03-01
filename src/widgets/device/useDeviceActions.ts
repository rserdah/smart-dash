import { Dispatch } from 'react';
import { useDeviceCallbacks } from './useDeviceCallbacks';

export type DeviceActions = {
} | any;

export function useDeviceActions(device: any, setState: Dispatch<any>) {
    const capabilities = device.capabilities as string[];

    // Gets all possible callbacks (because you can't conditionally call useCallback), then this hook filters unneeded ones out based on device capability
    const callbacks = useDeviceCallbacks(device, setState);

    const actions: DeviceActions = {};

    // TODO: Add capabilities to devices table, then here, go through the device capabilities and conditionally add actions based on each capability
    if(capabilities.includes('power')) {
        actions.togglePower = callbacks.togglePower;
    }

    if(capabilities.includes('targetTemperature')) {
        actions.setTemperature = callbacks.setTemperature;
    }

    return actions;
}
