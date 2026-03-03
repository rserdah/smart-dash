import { Device } from '@prisma/client';
import { DeviceProvider } from './types';

export const customRpiProvider: DeviceProvider = {
    async toggle(device: Device) {
        throw new Error('Not implemented');
    },

    async setTargetTemperature(device: Device, temp: number) {
        throw new Error('Not implemented');
    },
};
