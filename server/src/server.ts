import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import cors from 'cors';
import widgetRouter from './routes/widgets';
import deviceRouter from './routes/devices/devices';
import { DeviceErrorCode, deviceErrorHttpMap } from './services/deviceServices';

const app = express();
const port = 4000;

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    // TODO: Make more single general error type enum or add more error code types (e.g. one for lights, widgets, etc.)
    const messageCode = err instanceof Error ? (err.message as DeviceErrorCode) : DeviceErrorCode.UNKNOWN_ERROR;

    // TODO: Add new error type (so service layer can do `throw new AppError`) rather than just using enum
    if(Object.values(DeviceErrorCode).includes(messageCode)) {
        const status = deviceErrorHttpMap[messageCode] ?? 400;

        return res.status(status).json({
            error: messageCode,
            /* message: err.message, */ /* If a custom error type is made, pass the message here, but the error.message is used as the code for now */
        });
    }

    return res.status(500).json({
        error: 'INTERNAL_SERVER_ERROR'
    });
};

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

// Must be last
app.use(errorHandler);
