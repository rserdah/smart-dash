import express from 'express';
import { prisma } from '../lib/prisma';

const router = express.Router();

// GET all widgets
router.get('/', async (req, res) => {
    try {
        const widgets = await prisma.widget.findMany();
        res.json(widgets);
    }
    catch(e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to fetch widgets' });
    }
});

// POST create widget
router.post('/', async (req, res) => {
    try {
        const { type, title, col, row, colSpan, rowSpan } = req.body;

        const widget = await prisma.widget.create({
            data: { type, title, col, row, colSpan, rowSpan },
        });

        res.json(widget);
    }
    catch(e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to create widget' });
    }
});

// PUT update widget
router.put('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const data = req.body;

        const updatedWidget = await prisma.widget.update({
            where: { id },
            data,
        });

        res.json(updatedWidget);
    }
    catch(e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to update widget' });
    }
});

// DELETE delete widget
router.delete('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);

        await prisma.widget.delete({
            where: { id },
        });

        res.json({ success: true });
    }
    catch(e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to delete widget' });
    }
});

export default router;
