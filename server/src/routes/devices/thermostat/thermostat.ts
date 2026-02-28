import express from 'express';
import { prisma } from '../../../lib/prisma';
import { DeviceService } from '../../../services/deviceServices';

const router = express.Router();
const service = new DeviceService();

// GET
router.get('/', async (req, res) => {
    res.json({ message: 'Hi from thermostats endpoint!!!!!!!!!!' });
});

// POST ..................
router.post('/', async (req, res) => {
    const { name, type } = req.body;

    // const device = await service.create(name, type);

    // res.json(device);
});

export default router;
