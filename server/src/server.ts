import express from 'express';
import cors from 'cors';
import { prisma } from './lib/prisma';

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.get('/api/widgets', async (req, res) => {
    const widgets = await prisma.widget.findMany();
    res.json(widgets);

    // res.json([
    //     { id: 1, type: 'weather', title: 'Weather', col: 1, row: 1, colSpan: 4, rowSpan: 2 }, 
    //     { id: 2, type: 'light', title: 'Living Room Light', col: 5, row: 1, colSpan: 3, rowSpan: 2 }, 
    // ]);
});

// Will crash if id is not unique
// await prisma.widget.create({
//     data: { id: 2, type: 'weather', title: 'Weather', col: 1, row: 2, colSpan: 4, rowSpan: 2 }
// });

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
});
