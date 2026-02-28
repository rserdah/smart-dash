import express from 'express';
import { prisma } from '../../../lib/prisma';
import { DeviceService } from '../../../services/deviceServices';

const router = express.Router();
const service = new DeviceService();


/*
    This route is for actions rather than setting device state

    For example:

    POST /devices/:id/actions
    Body:
    {
        "action": "runScript",
        "value": "path/to/script"
    }
*/

export default router;
