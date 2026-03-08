import express from 'express';
import { prisma } from '../../lib/prisma';
import { DeviceService } from '../../services/deviceServices';

const router = express.Router();
const service = new DeviceService();

// PATCH device state
router.patch('/:id/state', async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const updated = await service.updateDevice(id, req.body);

        res.json(updated);
    }
    catch(err) {
        console.error(err);
        next(err);
    }
});

export default router;
