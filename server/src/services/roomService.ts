import { prisma } from '../lib/prisma';

export class RoomService {
    async getAll() {
        return await prisma.room.findMany();
    }

    async getById(id: number) {
        return await prisma.room.findUnique({ where: { id } });
    }

    async getByIdDevices(id: number) {
        return await prisma.room.findUnique({
            where: { id },
            include: {
                devices: true
            }
        });
    }

    async getByIdLayout(id: number) {
        const include = ['dashboard', 'widgets', 'widget', 'device'].toReversed().reduce((obj: any, x: any) => ({ [x]: { include: obj} }), true);

        return await prisma.room.findUnique({
            where: { id },
            include
        });
    }

    async create(name: string) {
        return await prisma.room.create({
            data: {
                name,
            },
        });
    }
}
