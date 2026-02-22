import express from 'express';
import cors from 'cors';
import widgetRouter from './routes/widgets';
import deviceRouter from './routes/devices';

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.use('/api/widgets', widgetRouter);
app.use('/api/devices', deviceRouter);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
});
