/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useChat, UseChatHelpers } from '@ai-sdk/react';
import { DefaultChatTransport, UIDataTypes, UIMessage, UIMessagePart, UITools } from 'ai';
import Widget from '@/components/Widget';
import InputKnob from '../components/input/InputKnob';
import InputText from '../components/input/InputText';
import ToggleButtonGroup from '../components/input/ToggleButtonGroup';
import InputLinearSlider from '../components/input/InputLinearSlider';
import InputCheckbox from '../components/input/InputCheckbox';
import ToggleButton from '../components/input/ToggleButton';
import { useModal } from '@/modals/ModalContext';
import { ModalHeader, ModalBody, ModalFooter, ModalFooterBtn, ModalShell } from '@/modals/ModalShell';
import MaterialIcon from '@/components/MaterialIcon';
import { WeatherWidget } from '@/widgets/weather/WeatherWidget';
import { DeviceWidget } from '@/widgets/device/DeviceWidget';
import WidgetController from '@/widgets/WidgetController';
import ExpandedWidget from '@/widgets/ExpandedWidget';
import { HideScrollbar } from '@/styles/GlobalStyles';
import Searchbar from '@/components/Searchbar';
import { useCurrentRoom } from '@/hooks/rooms/useCurrentRoom';
import { fetchDevices } from '@/api/devices';

// IMPORTANT! styled.element variables CANNOT be defined inside the functional component or else they will unmount every time the functional component re-renders
const ImgBackground = styled.img`
    position: absolute;
    height: 100%;
    z-index: -1;
    opacity: 1;

    transition: opacity 2s ease;

    /* Use this to make room backgrounds fade in (but fade out is instant currently) */
    /* @starting-style {
        opacity: 0;
    } */
`;

const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3.2rem;
    width: 100vw;
    height: 100vh;
    font-weight: 500;
    /* background: radial-gradient(hsl(from var(--primary-color) h calc(s * 0.5) calc(l * 0.25)), var(--background-color)); */
    transition: background-color 0.25s ease;

    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 48rem auto;
    gap: 10px;
    padding: 3rem 0px;
`;

const TempButton = styled.button`
    --button-size: 2.8rem;
    appearance: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    min-width: var(--button-size);
    width: var(--button-size);
    max-width: var(--button-size);
    min-height: var(--button-size);
    height: var(--button-size);
    max-height: var(--button-size);
    border: none;
    border-radius: 999rem;
    background: #116EFF;
`;

const SearchbarInput = styled.input`
    flex: 1;
    font-size: 1.6rem;
    background: transparent;
    color: var(--text-color-inverted);
    border: none;
    outline: none;
`;

const MainContentBox = styled.div`
    box-sizing: border-box;
    display: flex;
    gap: 10px;
    /* padding: 10px; */
    width: 100%;
    height: 100%;
    min-height: 0px;
    border-radius: 10px;
    /* background: #ffffff41; */
`;

const DashboardGrid = styled.div`
    box-sizing: border-box;
    display: grid;
    gap: 10px;
    align-content: start;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    grid-template-rows: repeat(6, minmax(0, 1fr));
    padding: 0px;
    width: 100%;
    height: 100%;
    max-height: 100%;
`;

const WidgetSlot = styled.div<{ $col: number, $colSpan: number, $row: number, $rowSpan: number }>`
    grid-column: ${p => `${p.$col} / span ${p.$colSpan}`};
    grid-row: ${p => `${p.$row} / span ${p.$rowSpan}`};
`;

const RoomSelectorBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    align-self: end;
    justify-self: center;
    gap: 5px;
    padding: 5px;
    margin: 0px;
    width: max-content;
    height: max-content;
    max-height: max-content;
    border: 1px solid white;
    border-radius: 999px;
    color: white;
    backdrop-filter: blur(2px) saturate(0.95);
`;

const RoomSelectorBtn = styled.button<{ $active?: boolean }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 999px;
    background: ${p => p.$active ? '#ffffff50' : 'transparent'};
    color: white;

    &:hover {
        background: #ffffff2f;
    }
`;

/** Temp.; for mapping rooms to images before the images are stored in DB */
const _roomImgs = {
    living_room: 'src/img/LivingRoomImage_Vecislavas_Popa_Pexels.jpg',
    dining_room: 'src/img/DiningRoomImage_Jean_van_der_Meulen_Pexels.jpg',
    bedroom: 'src/img/BedroomImage_Jean_van_der_Meulen_Pexels.jpg',
};

const renderWidget = (widget: any) => {
    switch(widget.type) {
        case 'weather':
            return <WeatherWidget grid={{ col: widget.col, row: widget.row, colSpan: widget.colSpan, rowSpan: widget.rowSpan }} />

        case 'device':
            if(widget.device == undefined) {
                return null;
            }

            return <DeviceWidget id={widget.deviceId} deviceId={widget.device?.id} grid={{ col: widget.col, row: widget.row, colSpan: widget.colSpan, rowSpan: widget.rowSpan }} />

        default:
            return <WidgetController
                compactRender={props => <Widget addCssGetter={() => css`height: 100%;`} title={widget.title} onLongPress={() => props.setExpanded(true)} />}
                expandedRender={props => <ExpandedWidget title={widget.title} state={{}} actions={{}} />}
            />
    }
};

const renderRoomDashboard = (room: any) => {
    const dashboardWidgets: any[] = room?.dashboard?.widgets || [];

    return dashboardWidgets.map((x: any, i: number) => {
        const { id, col, row, colSpan, rowSpan, widget } = x;

        return <WidgetSlot key={`${widget.title}_${col}_${row}_${colSpan}_${rowSpan}_${id}_${i}`} $col={col} $row={row} $colSpan={colSpan} $rowSpan={rowSpan}>
            {renderWidget(widget)}
        </WidgetSlot>
    })
};

const ChatBox = styled.div`
    label: ChatBox;

    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 1rem;
    overflow: auto;

    ${HideScrollbar}
`;

const ChatRow = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

const ChatBubble = styled.div`
    padding: 1rem;
    max-width: 50%;
    border-radius: 1rem;
`;

const AssistantChatBubble = styled(ChatBubble)`
    margin-right: auto;
    border-bottom-left-radius: 0.25rem;
    background: #4D4D4D;
`;

const SystemChatBubble = styled(ChatBubble)`
    margin-right: auto;
    border-bottom-left-radius: 0.25rem;
    background: #4D4D4D;
`;

const UserChatBubble = styled(ChatBubble)`
    margin-left: auto;
    border-bottom-right-radius: 0.25rem;
    background: #1687FF;
`;

interface MessageProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, | ''> {
    message: UIMessage<unknown, UIDataTypes, UITools>;
}

const Message = ({ message }: MessageProps) => {
    switch(message.role) {
        case 'assistant':
            return <AssistantMessage message={message} />

        case 'system':
            return <SystemMessage message={message} />

        case 'user':
            return <UserMessage message={message} />
    }
};

const AssistantMessage = ({ message }: { message: UIMessage<unknown, UIDataTypes, UITools> }) => {
    let reasoningPart: UIMessagePart<UIDataTypes, UITools> | undefined = undefined, textPart: UIMessagePart<UIDataTypes, UITools> | undefined = undefined;

    // Loop until reasoning AND text parts were found or until reached the end (only display reasoning if text is not found yet or else there will always be both a reasoning chat bubble AND a text response chat bubble)
    message.parts.some((p: UIMessagePart<UIDataTypes, UITools>) => {
        if(p.type === 'reasoning') {
            reasoningPart = p;
        }
        else if(p.type === 'text') {
            textPart = p;
        }

        return reasoningPart && textPart;
    });

    if(textPart != undefined) {
        return <AssistantChatBubble>{textPart.text}</AssistantChatBubble>
    }
    else if(reasoningPart != undefined) {
        return <AssistantChatBubble>Reasoning: {reasoningPart.text}</AssistantChatBubble>
    }
};

const SystemMessage = ({ message }: { message: UIMessage<unknown, UIDataTypes, UITools> }) => {
    return message.parts.map(part => {
        if(part.type === 'text') {
            return <SystemChatBubble>{part.text}</SystemChatBubble>
        }
    });
};

const UserMessage = ({ message }: { message: UIMessage<unknown, UIDataTypes, UITools> }) => {
    return message.parts.map(part => {
        if(part.type === 'text') {
            return <UserChatBubble>{part.text}</UserChatBubble>
        }
    });
};

export default function Home() {
    const queryClient = useQueryClient();

    const { data: allDevices = [] } = useQuery({
        queryKey: ['devices'],
        queryFn: fetchDevices,
    });

    const { data: roomId } = useCurrentRoom();

    const { data: rooms = [] } = useQuery({
        queryKey: ['rooms'],
        queryFn: () => fetch('http://localhost:4000/api/rooms').then(res => res.json())/* .then(x => { console.log(x); return x; }) */
    });

    const { data: roomLayout, isLoading: isLayoutLoading } = useQuery({
        queryKey: ['rooms', roomId, 'layout'],
        queryFn: () => fetch(`http://localhost:4000/api/rooms/${roomId}/layout`).then(res => res.json())/* .then(x => { console.warn(x.dashboard.widgets.find((w: any) => w.widget.deviceId == 1).widget.device.state); return x; }) */
    });

    const { data: roomDevices = [] } = useQuery({
        queryKey: ['rooms', roomId, 'devices'],
        queryFn: () => fetch(`http://localhost:4000/api/rooms/${roomId}/devices`).then(res => res.json())/* .then(x => { console.log(x); return x; }) */
    });

    console.log('roomDevices', roomDevices);
    console.log('allDevices', allDevices);

    const { messages, sendMessage, status } = useChat({
        transport: new DefaultChatTransport({
            api: 'http://localhost:4000/api/chat',
            sendReasoning: true,
            /* The body option here does not work because it doesn't seem to get the most updated values from useQuery so body is passed in sendMessage */
        }),
        onToolCall: ({ toolCall }) => {
            console.log('toolCall', toolCall);

            if(toolCall.toolName === 'controlDevice') {
                queryClient.invalidateQueries({ queryKey: ['rooms'] });
            }
        },
    });

    const onChat = useCallback(async (msg: string) => {
        setModalOpen(true);

        await sendMessage({ text: msg }, {
            body: {
                room: { roomId: roomId, roomKey: roomDevices.roomKey, roomName: roomDevices.name },
                roomDevices: roomDevices?.devices?.map?.(x => ({ deviceId: x.id, roomId: x.roomId, deviceName: x.name, deviceType: x.type, capabilities: x.capabilities, currentState: JSON.parse(x.state) })),
                allDevices: allDevices?.map?.(x => ({ deviceId: x.id, roomId: x.roomId, deviceName: x.name, deviceType: x.type, capabilities: x.capabilities, currentState: JSON.parse(x.state) })),
            }
        });
    }, [roomId, allDevices, roomDevices]);

    const [modalOpen, setModalOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const lastUserMessageRef = useRef<HTMLElement>(null);

    useEffect(() => {
        // console.log(structuredClone(messages));

        // Was making it scroll to last user view (make sure it goes to the top of the scrollview if possible (might need to add spacing to allow that if the current chatbox isn't currently scrolling))
        lastUserMessageRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }, [messages]);

    return (
        <>
            {modalOpen && <ModalShell onClose={() => setModalOpen(false)} css={css`display: none; width: unset; max-width: 90vw;`} open>
                <ModalBody css={css`label: ModalBody; display: flex; flex-direction: row; gap: 1rem; flex: 1; min-height: 0px; overflow: unset;`}>
                    <div css={css`flex: 1; width: max-content; min-width: 20rem; background: red;`}>
                        <div css={css`width: 50rem; max-width: 100%; height: 10rem; background: blue;`}></div>
                    </div>

                    <div css={css`display: flex; flex-direction: column; gap: 1rem; width: 20rem; min-height: 0px; overflow: unset;`}>
                        <ChatBox>
                            {
                                messages.map((m: UIMessage, i: number) => {
                                    // Assigning the ref multiple times will overwrite it so naturally the last message to satisfy this condition will have the ref attached which is desired
                                    const isLastUserMessage = m.role === 'user' && (messages[i + 1]?.role === 'assistant' || i === messages.length - 1);

                                    return <ChatRow>
                                        <Message key={i} ref={isLastUserMessage ? lastUserMessageRef : null} message={m} />
                                    </ChatRow>
                                })
                            }
                        </ChatBox>

                        <Searchbar onChat={onChat} />
                    </div>
                </ModalBody>

                <ModalFooter>
                    <ModalFooterBtn onClick={() => setModalOpen(false)}>Close</ModalFooterBtn>
                </ModalFooter>
            </ModalShell>}

            <div css={css`position: absolute; z-index: -1; min-width: 100vw; max-width: 100vw; min-height: 100vh; max-height: 100vh; background: gray; overflow: hidden;`}>
                {/* Use key to allow image to have a CSS transition (need to uncomment the @starting-style in this element first) */}
                <ImgBackground key={`${roomLayout?.roomKey}_${roomLayout?.id}`} src={roomLayout?.img || _roomImgs[roomLayout?.roomKey as keyof typeof _roomImgs] || ''} />
            </div>

            <Box>
                {/* <Keyboard /> */}

                <div css={css`display: flex; align-items: center; gap: 1rem; width: 100%`}>
                    <Searchbar onChat={onChat} />

                    <TempButton onClick={() => setModalOpen(true)} type='button'>
                        <MaterialIcon icon='visibility' wght={300} addCssGetter={() => css`font-size: 2rem; margin-left: 0.25rem; color: white;`} />
                    </TempButton>
                </div>

                <MainContentBox>
                    <DashboardGrid>
                        {renderRoomDashboard(roomLayout)}

                        {/* <WidgetSlot $col={1} $row={5} $colSpan={4} $rowSpan={2}>
                            <WidgetController
                                compactRender={props => (
                                    <Widget onLongPress={() => props.setExpanded(true)} custom>
                                        <div css={css`box-sizing: border-box; display: flex; padding: 10px; padding-top: 0px; flex: 1; width: 100%; max-width: 100%; min-height: 0px; align-items: flex-end;`}>
                                            <div css={css`display: flex; flex-direction: column; align-items: flex-start; justify-content: space-between; height: 100%;`}>
                                                <span css={css`display: flex; flex-direction: row; width: 100%; color: white;`}>Desk Lamp</span>
                                                <InputLinearSlider name='' sliderWidthPx={150} handleOverlayJsx={<div css={css`display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;`}><MaterialIcon icon='lightbulb_2' wght={300} addCssGetter={() => css`font-size: 1.6rem; color: var(--primary-color);`} /></div>} stopPointerDownPropagation />
                                            </div>

                                            <div css={css`position: relative; top: 5px; width: 110px; height: 140px; overflow: hidden;`}>
                                                <img
                                                    src='src/img/NONCOMMERCIAL_DeskLampRender_yganko_Vecteezy.png'
                                                    css={css`position: relative; top: 0px; left: -23px; width: 150px;`}
                                                />
                                            </div>
                                        </div>
                                    </Widget>
                                )}
                                expandedRender={props => (
                                    <ExpandedWidget title='new test' state={{}} actions={{}} custom>
                                        <div css={css`box-sizing: border-box; display: flex; padding: 10px; padding-top: 0px; flex: 1; width: 100%; max-width: 100%; min-height: 0px; align-items: flex-end;`}>
                                            <div css={css`display: flex; flex-direction: column; align-items: flex-start; justify-content: space-between; height: 100%;`}>
                                                <span css={css`display: flex; flex-direction: row; width: 100%; color: white;`}>Desk Lamp</span>
                                                <InputLinearSlider name='' sliderWidthPx={150} handleOverlayJsx={<div css={css`display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;`}><MaterialIcon icon='lightbulb_2' wght={300} addCssGetter={() => css`font-size: 1.6rem; color: var(--primary-color);`} /></div>} stopPointerDownPropagation />
                                            </div>

                                            <div css={css`position: relative; top: 5px; width: 110px; height: 140px; overflow: hidden;`}>
                                                <img
                                                    src='src/img/NONCOMMERCIAL_DeskLampRender_yganko_Vecteezy.png'
                                                    css={css`position: relative; top: 0px; left: -23px; width: 150px;`}
                                                />
                                            </div>
                                        </div>
                                    </ExpandedWidget>
                                )}
                            />
                        </WidgetSlot>

                        <WidgetSlot $col={9} $row={4} $colSpan={4} $rowSpan={3}>
                            <WidgetController
                                compactRender={props => (
                                    <Widget addCssGetter={() => css`height: 100%;`} onLongPress={() => props.setExpanded(true)} custom>
                                        <ImgBackground src={currentRoom?.img} css={css`top: 0px; left: -45px; width: unset; height: 100%; transform: scale(1.25);`} />

                                        <div css={css`display: flex; gap: 5px; overflow: auto; scrollbar-width: none;`}>
                                            <div onClick={() => props.setExpanded(true)} css={css`display: flex; gap: 8px; align-items: center; justify-content: center; padding: 2px 10px; width: max-content; height: 2rem; border: 1px solid #ffffff49; border-radius: 999px; color: white; background: #69696910; backdrop-filter: blur(10px) saturate(0.9);`}>
                                                <div css={css`width: 5px; height: 5px; border-radius: 999px; background: #e92323ff; box-shadow: 0px 0px 4px 2px #e92323ff;`}></div>
                                                <span css={css`font-size: 14px;`}>Live</span>
                                            </div>

                                            <div onClick={() => props.setExpanded(true)} css={css`display: flex; gap: 0px; align-items: center; justify-content: center; padding: 2px 10px; padding-left: 5px; width: max-content; height: 2rem; border: 1px solid #ffffff49; border-radius: 999px; color: white; background: #69696910; backdrop-filter: blur(10px) saturate(0.9);`}>
                                                <MaterialIcon icon='bolt' addCssGetter={() => css`font-size: 20px;`} />
                                                <span css={css`font-size: 14px;`}>65W</span>
                                            </div>

                                            <div onClick={() => props.setExpanded(true)} css={css`display: flex; gap: 0px; align-items: center; justify-content: center; padding: 2px 10px; padding-left: 5px; width: max-content; height: 2rem; border: 1px solid #ffffff49; border-radius: 999px; color: white; background: #69696910; backdrop-filter: blur(10px) saturate(0.9);`}>
                                                <MaterialIcon icon='lightbulb_2' addCssGetter={() => css`font-size: 20px;`} />
                                                <span css={css`font-size: 14px;`}>60%</span>
                                            </div>

                                            <div onClick={() => props.setExpanded(true)} css={css`display: flex; gap: 0px; align-items: center; justify-content: center; padding: 2px 10px; padding-left: 5px; width: max-content; height: 2rem; border: 1px solid #ffffff49; border-radius: 999px; color: white; background: #69696910; backdrop-filter: blur(10px) saturate(0.9);`}>
                                                <MaterialIcon icon='thermometer' addCssGetter={() => css`font-size: 20px;`} />
                                                <span css={css`font-size: 14px;`}>78°F</span>
                                            </div>
                                        </div>
                                    </Widget>
                                )}
                                expandedRender={props => (
                                    <ExpandedWidget state={{}} actions={{}}>
                                        <ImgBackground src={currentRoom?.img} css={css`top: 0px; left: -45px; width: unset; height: 100%; transform: scale(1.25);`} />

                                        <div css={css`display: flex; gap: 5px; overflow: auto; scrollbar-width: none;`}>
                                            <div css={css`display: flex; gap: 8px; align-items: center; justify-content: center; padding: 2px 10px; width: max-content; height: max-content; border: 1px solid #ffffff49; border-radius: 999px; color: white; background: #69696910; backdrop-filter: blur(10px) saturate(0.9);`}>
                                                <div css={css`width: 5px; height: 5px; border-radius: 999px; background: #e92323ff; box-shadow: 0px 0px 4px 2px #e92323ff;`}></div>
                                                <span css={css`font-size: 14px;`}>Live</span>
                                            </div>

                                            <div css={css`display: flex; gap: 0px; align-items: center; justify-content: center; padding: 2px 10px; padding-left: 5px; width: max-content; height: max-content; border: 1px solid #ffffff49; border-radius: 999px; color: white; background: #69696910; backdrop-filter: blur(10px) saturate(0.9);`}>
                                                <MaterialIcon icon='bolt' addCssGetter={() => css`font-size: 20px;`} />
                                                <span css={css`font-size: 14px;`}>65W</span>
                                            </div>

                                            <div css={css`display: flex; gap: 0px; align-items: center; justify-content: center; padding: 2px 10px; padding-left: 5px; width: max-content; height: max-content; border: 1px solid #ffffff49; border-radius: 999px; color: white; background: #69696910; backdrop-filter: blur(10px) saturate(0.9);`}>
                                                <MaterialIcon icon='lightbulb_2' addCssGetter={() => css`font-size: 20px;`} />
                                                <span css={css`font-size: 14px;`}>60%</span>
                                            </div>

                                            <div css={css`display: flex; gap: 0px; align-items: center; justify-content: center; padding: 2px 10px; padding-left: 5px; width: max-content; height: max-content; border: 1px solid #ffffff49; border-radius: 999px; color: white; background: #69696910; backdrop-filter: blur(10px) saturate(0.9);`}>
                                                <MaterialIcon icon='thermometer' addCssGetter={() => css`font-size: 20px;`} />
                                                <span css={css`font-size: 14px;`}>78°F</span>
                                            </div>
                                        </div>
                                    </ExpandedWidget>
                                )}
                            />
                        </WidgetSlot> */}
                    </DashboardGrid>
                </MainContentBox>

                <RoomSelectorBox>
                    {rooms.map((x, i) => (
                        <NavLink to={`/dashboard/${x.id}`}>
                            <RoomSelectorBtn key={`${x.name}_${x.id}_${i}`} $active={x.id == roomLayout?.id}>{x.name}</RoomSelectorBtn>
                        </NavLink>
                    ))}

                    <RoomSelectorBtn className='material-symbols-outlined' css={css`--sidebar-link-size: 32px; display: inline-flex; align-items: center; justify-content: center; padding: 2px; min-width: var(--sidebar-link-size); width: var(--sidebar-link-size); max-width: var(--sidebar-link-size); min-height: var(--sidebar-link-size); height: var(--sidebar-link-size); max-height: var(--sidebar-link-size); font-size: 28px; border-radius: 999px; background: transparent; color: white; &:hover { background: #ffffff2f; }`}>add</RoomSelectorBtn>
                </RoomSelectorBox>
            </Box>
        </>
    )
}
