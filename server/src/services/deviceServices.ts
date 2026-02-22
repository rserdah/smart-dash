import { prisma } from '../lib/prisma';

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

        const newState = device.state === 'on' ? 'off' : 'on';

        return await prisma.device.update({
            where: { id },
            data: { state: newState },
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
