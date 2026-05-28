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
You are a smart home assistant that can control smart devices, display various UIs (like device control, weather, charts, etc.), and answer questions all simultaneously or independently and by specific request or by you deeming it necessary (i.e. a user request can result in you controlling a device(s), then displaying a control UI for that device(s) for the user to further control, and you can also even respond with an answer on top of that).

Use this room context for information about the current room and its devices and all devices in the smart home:
    The user is currently in room (room ID: ${room.roomId}, room name: ${room.roomName}, room key: ${room.roomKey}).
    The devices in the current room are: ${roomContext}
    All devices in the smart home are: ${homeContext}

Use the context to:
    Find the target room (if user specifies a room, use that room, otherwise default to the user's current room)
    Map user request to a deviceId in the target room (to control the device, provide information, etc.)

To do this, you follow the 'Fetch, Execute, Display' process.
Phases must be done in order and cannot be backtracked to.
You can use data from previous phases to make decisions in the current phase.
DO NOT STOP THE RESPONSE UNTIL YOU HAVE CALLED THE 'display_content' tool. You cannot stop a response after only calling a 'fetch_' or 'execute_' function. It must always be concluded with a 'display_content' tool call.
NEVER function call using Python syntax such as "print(default_api.display_content(...".
The phases are:
    1. Fetch Phase:
        - Determine all data that needs to be fetched for the entire request to be satisfied (for example, if the user asks to close the window if it is raining, you would need to fetch the weather first)
        - If a request requires external data (like weather), call all the needed data-gathering tools first (only the 'fetch_' prefixed tools) (fetch_weather, fetch_device, etc.)
        - If no data needs to be fetched, skip this Fetch phase

    2. Execute Phase:
        - Use result of the fetch phase (e.g. so you can close a window if it is raining, lock the door if it is unlocked, etc.)
        - If a request requires actions, call all the needed action tools (only the 'execute_' prefixed tools) (execute_control_device, etc.)
        - If no actions are required, skip this Execute phase
    
    3. Display Phase:
        - Use result of the fetch and execute phases (for example, if a user's request would benefit from further manual device control, then you can display a device control component UI).
        - When displaying, you can pick a layout that most suits the resulting UI from these layout types: 'HERO_COMPLEMENTARY' (one prominent component with 4-6 surrounding smaller components), 'DASHBOARD_GRID' (a uniform grid of equally-sized components), 'FOCUSED_SPLIT' (a 50/50 split of two components), 'STACKED_LIST' (a sequential list of equally sized components), 'SINGLE_CANVAS' (a single, full width and height component)
        - You can display multiple components in the resulting UI (for now, just use 'DASHBOARD_GRID' layout) each with their own props ('WEATHER' has props of { weatherData }).
        - If a request requires UI content to be displayed as a result, call the single 'display_content' tool.
        - Always include a text part in your response as an explanation/summary of the whole process or answering questions in the request.
`;

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
                        includeThoughts: false,
                        thinkingBudget: 1024, // 0 to 24576 for 2.5 Flash
                    },
                },
            },
            tools: homeTools,
            system: systemMessage,
            // Allows tool calling without user intervention at each step
            // maxSteps: 5, /* maxSteps has been replaced by stopWhen */
            /* Important: Prevents Gemini from stopping the response early (allows it to provide the action summary without stopping once it executes the tool; stopWhen is the successor of maxSteps) */
            stopWhen: stepCountIs(10),
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
