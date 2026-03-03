import { Device } from '@prisma/client';
import { DeviceProvider } from './types';
import { prisma } from '../lib/prisma';
import { DeviceErrorCode, parseDeviceState } from '../services/deviceServices';

export const localProvider: DeviceProvider = {
    async toggle(device: Device) {
        const state = parseDeviceState(device.state);

        if(typeof state.power !== 'boolean') { throw new Error(DeviceErrorCode.MALFORMED_DEVICE_STATE_JSON); }

        const power = state.power;

        const newState = {
            ...state,
            power: !power,
        };

        const newStateJson = JSON.stringify(newState);

        const updatePromise = prisma.device.update({
            where: { id: device.id },
            data: { state: newStateJson },
        });

        return updatePromise;
    },

    async setTargetTemperature(device: Device, temp: number) {
        const state = parseDeviceState(device.state);

        if(typeof state.targetTemperature !== 'number') { throw new Error(DeviceErrorCode.MALFORMED_DEVICE_STATE_JSON); }

        const newState = {
            ...state,
            targetTemperature: temp,
        };

        const newStateJson = JSON.stringify(newState);

        const updatePromise = prisma.device.update({
            where: { id: device.id },
            data: { state: newStateJson },
        });

        return updatePromise;
    },
};
