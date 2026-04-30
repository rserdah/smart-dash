import express from 'express';
import { google } from '@ai-sdk/google';
import { streamText, convertToModelMessages, stepCountIs } from 'ai';
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
            messages: await convertToModelMessages(messages, {
                tools: homeTools,
            }),
            providerOptions: {
                google: {
                    // THIS IS THE NESTING THAT CHANGED
                    thinkingConfig: {
                        includeThoughts: true,
                        thinkingBudget: 1024, // 0 to 24576 for 2.5 Flash
                    },
                },
            },
            tools: homeTools,
            system: `
                You are a smart home assistant.
                If you execute a tool or tools, you must always return a friendly response of what you did if it was successful. If it failed you must explain why.
                1. When asked to control a device, always use the controlDevice tool.
                2. After the tool executes successfully, provide a brief, friendly confirmation to the user (e.g., "Done! I've dimmed the lights for you").
                3. If a tool fails, explain why.

                When reasoning, provide concise, user-friendly, and slightly entertaining reasoning.

            `, /* TODO: Finish system message */
            // Allows tool calling without user intervention at each step
            // maxSteps: 5, /* maxSteps has been replaced by stopWhen */
            /* Important: Prevents Gemini from stopping the response early (allows it to provide the action summary without stopping once it executes the tool; stopWhen is the successor of maxSteps) */
            stopWhen: stepCountIs(5),
        });

        result.pipeUIMessageStreamToResponse(res, {
            /* Important: Providing the originalMessages prevents it from accidentally duplicating the same messages */
            originalMessages: messages,
        });

        console.log('--------------------------------------------------');
        console.log('--------------------------------------------------');
        console.log('--------------------------------------------------');
        console.log('--------------------------------------------------');
        console.log('--------------------------------------------------');
        console.log('--------------------------------------------------');
        console.log('--------------------------------------------------');
        console.log('--------------------------------------------------');
        console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n');

        console.log('messages', JSON.stringify(messages));
        // console.log(await result.content);
    }
    catch(e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to POST chat' });
    }
});

export default router;
