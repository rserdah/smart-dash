import { prisma } from '../lib/prisma';

export type DeviceType =
    | 'light'
    | 'switch'
    | 'sensor'
    | 'thermostat';

export enum DeviceErrorCode {
    UNKNOWN_ERROR = 'UNKNOWN_ERROR',
    DEVICE_NOT_FOUND = 'DEVICE_NOT_FOUND',
    UNSUPPORTED_CAPABILITY = 'UNSUPPORTED_CAPABILITY',
    INVALID_TEMPERATURE = 'INVALID_TEMPERATURE',
};

export const deviceErrorHttpMap: Record<DeviceErrorCode, number> = {
    [DeviceErrorCode.UNKNOWN_ERROR]: 500, // ?
    [DeviceErrorCode.DEVICE_NOT_FOUND]: 404,
    [DeviceErrorCode.UNSUPPORTED_CAPABILITY]: 400,
    [DeviceErrorCode.INVALID_TEMPERATURE]: 400,
};

export class DeviceService {
    async getAll() {
        return await prisma.device.findMany();
    }

    async getById(id: number) {
        return await prisma.device.findUnique({ where: { id } });
    }

    async toggle(id: number) {
        const device = await prisma.device.findUnique({ where: { id } });

        if(!device) {
            throw new Error(DeviceErrorCode.DEVICE_NOT_FOUND);
        }

        // TODO: Improve it so actions are not tied to types, but rather types have capabilities and then simply check the capability
        /*
            E.g. light: {
                // Represents 'toggle'
                power: true,
                brightness: true
            }

            TV {
                power: true,
                volume: true
            }

            OR use a bitmask to represent capabilities and store that as a column
        */
        if(device.type !== 'light' && device.type !== 'switch') {
            throw new Error(DeviceErrorCode.UNSUPPORTED_CAPABILITY);
        }

        const newState = device.state === 'on' ? 'off' : 'on';

        return await prisma.device.update({
            where: { id },
            data: { state: newState },
        });
    }

    async setTargetTemperature(id: number, temp: number) {
        const device = await prisma.device.findUnique({ where: { id } });

        if(!device) {
            throw new Error(DeviceErrorCode.DEVICE_NOT_FOUND);
        }

        // TODO: Change to read from a capability column (e.g. if(!device.capabilities?.temperature)...)
        if(device.type !== 'thermostat') {
            throw new Error(DeviceErrorCode.UNSUPPORTED_CAPABILITY);
        }

        return await prisma.device.update({
            where: { id },
            data: { state: temp.toString() },
        });
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
