import express from 'express';
import { google } from '@ai-sdk/google';
import { streamText, convertToModelMessages, stepCountIs } from 'ai';
import { homeTools } from '../services/ai-tools';

const model = 'gemini-2.5-flash';

const router = express.Router();

// POST chat
router.post('/', async (req, res) => {
    try {
        const { messages, room, roomDevices, allDevices } = req.body;

        const body = structuredClone(req.body);
        delete body.messages;

        console.log('req.body...', JSON.stringify(body));

        const roomContext = roomDevices.map((x: any) => (
            '(' +
            `device ID: ${x.deviceId}, ` +
            `device name: ${x.deviceName}, ` +
            `deviceType: ${x.deviceType}, ` +
            `capabilities: ${x.capabilities}, ` +
            `currentState: ${Object.entries(x.currentState).map(([k, v]) => `${k}: ${v}`).join(', ')}` +
            ')'
        )).join(', ');

        const homeContext = allDevices.map((x: any) => (
            '(' +
            `device ID: ${x.deviceId}, ` +
            `device name: ${x.deviceName}, ` +
            `deviceType: ${x.deviceType}, ` +
            `capabilities: ${x.capabilities}, ` +
            `currentState: ${Object.entries(x.currentState).map(([k, v]) => `${k}: ${v}`).join(', ')}` +
            ')'
        )).join(', ');

        const systemMessage = `
Use this room context for information about the current room and its devices and all devices in the smart home (use the context to target devices based on user request, provide the user with information about a target device or room, etc.):
    The user is currently in room (room ID: ${room.roomId}, room name: ${room.roomName}, room key: ${room.roomKey}).
    The devices in the current room are: ${roomContext}
    All devices in the smart home are: ${homeContext}

You are a smart home assistant.
If you execute a tool or tools, you must always return a friendly response of what you did if it was successful. If it failed you must explain why.
1. When asked to control a device, find the target room (if user specifies a room, use that room, otherwise default to the user's current room), then find the target device based on the devices available to the target room, then use the controlDevice tool to control the target device.
2. After the tool executes successfully, provide a brief, friendly confirmation to the user (e.g., "Done! I've dimmed the lights for you").
3. If a tool fails, explain why.

When reasoning, provide concise, user-friendly, and slightly entertaining reasoning.
`;

        console.log('systemMessage', systemMessage);

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
            system: systemMessage,
            // Allows tool calling without user intervention at each step
            // maxSteps: 5, /* maxSteps has been replaced by stopWhen */
            /* Important: Prevents Gemini from stopping the response early (allows it to provide the action summary without stopping once it executes the tool; stopWhen is the successor of maxSteps) */
            stopWhen: stepCountIs(5),
        });

        result.pipeUIMessageStreamToResponse(res, {
            /* Important: Providing the originalMessages prevents it from accidentally duplicating the same messages */
            originalMessages: messages,
        });
    }
    catch(e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to POST chat' });
    }
});

export default router;
