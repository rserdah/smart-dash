import { Dispatch } from 'react';
import { useDeviceCallbacks } from './useDeviceCallbacks';

export type DeviceActions = {
} | any;

export function useDeviceActions(device: any) {
    const capabilities = (device ? device.capabilities : []) as string[];

    // Gets all possible callbacks (because you can't conditionally call useCallback), then this hook filters unneeded ones out based on device capability
    const callbacks = useDeviceCallbacks(device);

    const actions: DeviceActions = {};

    // TODO: Add capabilities to devices table, then here, go through the device capabilities and conditionally add actions based on each capability
    ([
        ['power', 'setPower'],
        ['brightness', 'setBrightness'],
        ['color', 'setColor'],
        ['targetTemperature', 'setTemperature'],
    ] as [string, keyof typeof callbacks][]).forEach(([capability, fnName]: [string, keyof typeof callbacks]) => {
        if(capabilities.includes(capability)) {
            actions[fnName] = callbacks[fnName];
        }
    });

    return actions;
}
