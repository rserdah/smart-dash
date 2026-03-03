import { prisma } from '../lib/prisma';
import { getDeviceProvider } from '../providers';

export type DeviceType =
    | 'light'
    | 'switch'
    | 'sensor'
    | 'thermostat';

export enum DeviceErrorCode {
    UNKNOWN_ERROR = 'UNKNOWN_ERROR',
    DEVICE_NOT_FOUND = 'DEVICE_NOT_FOUND',
    MALFORMED_DEVICE_STATE_JSON = 'MALFORMED_DEVICE_STATE_JSON',
    UNSUPPORTED_CAPABILITY = 'UNSUPPORTED_CAPABILITY',
    MALFORMED_DEVICE_CAPABILITY_JSON = 'MALFORMED_DEVICE_CAPABILITY_JSON',
    INVALID_TEMPERATURE = 'INVALID_TEMPERATURE',
};

export const deviceErrorHttpMap: Record<DeviceErrorCode, number> = {
    [DeviceErrorCode.UNKNOWN_ERROR]: 500, // ?
    [DeviceErrorCode.DEVICE_NOT_FOUND]: 404,
    [DeviceErrorCode.MALFORMED_DEVICE_STATE_JSON]: 500, // ?
    [DeviceErrorCode.UNSUPPORTED_CAPABILITY]: 400,
    [DeviceErrorCode.MALFORMED_DEVICE_CAPABILITY_JSON]: 500, // ?
    [DeviceErrorCode.INVALID_TEMPERATURE]: 400,
};

export function parseDeviceState(json: string) {
    let finalState;
    try {
        finalState = JSON.parse(json);
    }
    catch(e) {
        throw new Error(DeviceErrorCode.MALFORMED_DEVICE_STATE_JSON);
    }

    if(finalState == null || typeof finalState !== 'object') {
        throw new Error(DeviceErrorCode.MALFORMED_DEVICE_STATE_JSON);
    }

    return finalState;
}

export class DeviceService {
    async getAll() {
        return await prisma.device.findMany();
    }

    async getById(id: number) {
        return await prisma.device.findUnique({ where: { id } });
    }

    async toggle(id: number) {
        const device = await prisma.device.findUnique({ where: { id } });

        if(!device) { throw new Error(DeviceErrorCode.DEVICE_NOT_FOUND); }
        if(device.capabilities == null) { throw new Error(DeviceErrorCode.MALFORMED_DEVICE_CAPABILITY_JSON); }
        if(!Array.isArray(device.capabilities)) { throw new Error(DeviceErrorCode.MALFORMED_DEVICE_CAPABILITY_JSON); }
        if(!device.capabilities.includes('power')) { throw new Error(DeviceErrorCode.UNSUPPORTED_CAPABILITY); }

        const provider = getDeviceProvider(device.provider);

        const updated = await provider.toggle(device);

        const finalState = parseDeviceState(updated.state);

        return finalState;
    }

    async setTargetTemperature(id: number, temp: number) {
        const device = await prisma.device.findUnique({ where: { id } });

        if(!device) { throw new Error(DeviceErrorCode.DEVICE_NOT_FOUND); }
        if(device.capabilities == null) { throw new Error(DeviceErrorCode.MALFORMED_DEVICE_CAPABILITY_JSON); }
        if(!Array.isArray(device.capabilities)) { throw new Error(DeviceErrorCode.MALFORMED_DEVICE_CAPABILITY_JSON); }
        if(!device.capabilities.includes('targetTemperature')) { throw new Error(DeviceErrorCode.UNSUPPORTED_CAPABILITY); }

        const provider = getDeviceProvider(device.provider);

        const updated = await provider.setTargetTemperature(device, temp);

        const finalState = parseDeviceState(updated.state);

        return finalState;
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
