import { prisma } from '../lib/prisma';

export type DeviceType =
    | 'light'
    | 'switch'
    | 'sensor'
    | 'thermostat';

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
            throw new Error('Device not found');
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
            throw new Error('This device cannot be toggled');
        }

        const newState = device.state === 'on' ? 'off' : 'on';

        return await prisma.device.update({
            where: { id },
            data: { state: newState },
        });
    }

    async setTemperature(id: number, temp: number) {
        const device = await prisma.device.findUnique({ where: { id } });

        if(!device) {
            throw new Error('Device not found');
        }

        if(device.type !== 'thermostat') {
            throw new Error('This device is not a thermostat');
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
