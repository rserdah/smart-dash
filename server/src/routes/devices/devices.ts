import express from 'express';
import { prisma } from '../../lib/prisma';
import { DeviceService } from '../../services/deviceServices';
import stateRouter from './state';
import actionsRouter from './actions/actions';

const router = express.Router();
const service = new DeviceService();

// State endpoints are for controlling state of a device. Since different devices can share state types (power state, availability, etc.), these endpoints are not separated by device type. State endpoints are at the same level as devices endpoints, not a separate route but separated for organization
router.use('/', stateRouter);

// Actions are for future actions like commands
router.use('/actions', actionsRouter);

// GET all devices
router.get('/', async (req, res, next) => {
    try {
        const devices = await service.getAll();

        res.json(devices);
    }
    catch(err) {
        console.error(err);
        next(err);
    }
});

// GET device by ID
router.get('/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const device = await service.getById(id);

        res.json(device);
    }
    catch(err) {
        console.error(err);
        next(err);
    }
});

// POST create device
router.post('/', async (req, res, next) => {
    try {
        const { name, type } = req.body;

        const device = await service.create(name, type);

        res.json(device);
    }
    catch(err) {
        console.error(err);
        next(err);
    }
});

export default router;
