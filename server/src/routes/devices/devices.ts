import express from 'express';
import { prisma } from '../../lib/prisma';
import { DeviceService } from '../../services/deviceServices';
import thermostatRouter from './thermostat/thermostat';

const router = express.Router();
const service = new DeviceService();

router.use('/thermostat', thermostatRouter);

// GET all devices
router.get('/', async (req, res) => {
    const devices = await service.getAll();

    res.json(devices);
});

// GET device by ID
router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);

    const device = await service.getById(id);

    res.json(device);
});

// POST create device
router.post('/', async (req, res) => {
    const { name, type } = req.body;

    const device = await service.create(name, type);

    res.json(device);
});

// POST toggle device
router.post('/:id/toggle', async (req, res) => {
    const id = Number(req.params.id);

    const updated = await service.toggle(id);

    res.json(updated);
});

export default router;
