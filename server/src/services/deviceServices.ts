import { prisma } from '../lib/prisma';
import { getDeviceProvider } from '../providers';
import { BaseDeviceState } from '../types/devices/types/device.types';

export type DeviceType =
    | 'light'
    | 'switch'
    | 'sensor'
    | 'thermostat';

export enum DeviceErrorCode {
    UNKNOWN_ERROR = 'UNKNOWN_ERROR',
    DEVICE_NOT_FOUND = 'DEVICE_NOT_FOUND',
    UNSUPPORTED_DEVICE_TYPE = 'UNSUPPORTED_DEVICE_TYPE',
    MALFORMED_DEVICE_STATE_JSON = 'MALFORMED_DEVICE_STATE_JSON',
    UNSUPPORTED_CAPABILITY = 'UNSUPPORTED_CAPABILITY',
    MALFORMED_DEVICE_CAPABILITY_JSON = 'MALFORMED_DEVICE_CAPABILITY_JSON',
    INVALID_TEMPERATURE = 'INVALID_TEMPERATURE',
};

export const deviceErrorHttpMap: Record<DeviceErrorCode, number> = {
    [DeviceErrorCode.UNKNOWN_ERROR]: 500, // ?
    [DeviceErrorCode.DEVICE_NOT_FOUND]: 404,
    [DeviceErrorCode.UNSUPPORTED_DEVICE_TYPE]: 400, // ?
    [DeviceErrorCode.MALFORMED_DEVICE_STATE_JSON]: 500, // ?
    [DeviceErrorCode.UNSUPPORTED_CAPABILITY]: 400,
    [DeviceErrorCode.MALFORMED_DEVICE_CAPABILITY_JSON]: 500, // ?
    [DeviceErrorCode.INVALID_TEMPERATURE]: 400,
};

export class DeviceService {
    async getAll() {
        return await prisma.device.findMany();
    }

    async getById(id: number) {
        return await prisma.device.findUnique({ where: { id } });
    }

    async updateDevice(id: number, state: Partial<BaseDeviceState>) {
        const device = await prisma.device.findUnique({ where: { id } });

        if(!device) { throw new Error(DeviceErrorCode.DEVICE_NOT_FOUND); }

        const provider = getDeviceProvider(device.provider);

        if(!provider) {
            throw new Error('Provider not found');
        }

        switch(device.type as DeviceType) {
            case 'light':
                if(typeof provider.updateLight === 'function') {
                    return provider.updateLight(device, state);
                }

            case 'switch':
                if(typeof provider.updateSwitch === 'function') {
                    return provider.updateSwitch(device, state);
                }

            // case 'sensor':
            //     if(typeof provider.updateSensor === 'function') {
            //         return provider.updateSensor(device, state);
            //     }

            case 'thermostat':
                if(typeof provider.updateClimate === 'function') {
                    return provider.updateClimate(device, state);
                }

            default:
                throw new Error(DeviceErrorCode.UNSUPPORTED_DEVICE_TYPE);
        }
    }

    async create(name: string, type: string, initialState='off') {
        return await prisma.device.create({
            data: {
                name,
                type,
                state: initialState,
            },
        });
    }
}
