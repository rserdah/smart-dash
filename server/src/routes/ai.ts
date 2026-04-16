import express from 'express';
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { homeTools } from '../services/ai-tools';

const model = 'gemini-2.5-flash';

const router = express.Router();

// POST chat
router.post('/', async (req, res) => {
    try {
        const { messages } = req.body;

        const result = streamText({
            model: google(model, {
                useSearchGrounding: true,
            }),
            messages,
            tools: homeTools,
            system: `You are a smart home assistant.`, /* TODO: Finish system message */
            // Allows tool calling without user intervention at each step
            maxSteps: 5,
        });

        result.pipeUIMessageStreamToResponse(res);

        console.log('--------------------------------------------------');
        console.log(await result.content);
    }
    catch(e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to POST chat' });
    }
});

export default router;
