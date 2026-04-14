import express from 'express';
import { RoomService } from '../../services/roomService';

const router = express.Router();
const service = new RoomService();

// GET all
router.get('/', async (req, res, next) => {
    try {
        const rows = await service.getAll();

        res.json(rows);
    }
    catch(err) {
        console.error(err);
        next(err);
    }
});

// GET by ID
router.get('/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const row = await service.getById(id);

        res.json(row);
    }
    catch(err) {
        console.error(err);
        next(err);
    }
});

// GET room devices by ID
router.get('/:id/devices', async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const row = await service.getByIdDevices(id);

        res.json(row);
    }
    catch(err) {
        console.error(err);
        next(err);
    }
});

// GET room layout by ID
router.get('/:id/layout', async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const row = await service.getByIdLayout(id);

        res.json(row);
    }
    catch(err) {
        console.error(err);
        next(err);
    }
});

// POST create
router.post('/', async (req, res, next) => {
    try {
        const { name } = req.body;

        const row = await service.create(name);

        res.json(row);
    }
    catch(err) {
        console.error(err);
        next(err);
    }
});

export default router;
