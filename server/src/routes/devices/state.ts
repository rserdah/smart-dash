import express from 'express';
import { prisma } from '../../lib/prisma';
import { DeviceService } from '../../services/deviceServices';

const router = express.Router();
const service = new DeviceService();

// POST toggle device power
router.post('/:id/power', async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const updated = await service.toggle(id);

        res.json(updated);
    }
    catch(err) {
        next(err);
    }
});

// PATCH set device temperature (mostly only for thermostats)
router.patch('/:id/temperature', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const { targetTemperature } = req.body;

        const updated = await service.setTargetTemperature(id, targetTemperature);

        res.json(updated);
    }
    catch(err) {
        next(err);
    }
});

export default router;
