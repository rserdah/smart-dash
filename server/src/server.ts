import express from 'express';
import cors from 'cors';

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.get('/api/widgets', (req, res) => {
    res.json([
        { id: 1, type: 'weather', title: 'Weather', col: 1, row: 1, colSpan: 4, rowSpan: 2 }, 
        { id: 2, type: 'light', title: 'Living Room Light', col: 5, row: 1, colSpan: 3, rowSpan: 2 }, 
    ]);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
});
