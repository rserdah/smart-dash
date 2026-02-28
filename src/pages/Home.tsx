/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Widget from '@/components/Widget';
import InputKnob from '../components/input/InputKnob';
import ToggleSwitch from '../components/input/ToggleSwitch';
import InputText from '../components/input/InputText';
import ToggleButtonGroup from '../components/input/ToggleButtonGroup';
import InputLinearSlider from '../components/input/InputLinearSlider';
import InputCheckbox from '../components/input/InputCheckbox';
import ToggleButton from '../components/input/ToggleButton';
import { useModal } from '@/modals/ModalContext';
import { ModalProps, ModalBody, ModalFooter, ModalFooterBtn } from '@/modals/ModalShell';
import { useEffect, useState } from 'react';
import MaterialIcon from '@/components/MaterialIcon';
import { LightWidget } from '@/widgets/light/LightWidget';
import { WeatherWidget } from '@/widgets/weather/WeatherWidget';
import { DeviceWidget } from '@/widgets/device/DeviceWidget';
import WidgetController from '@/widgets/WidgetController';
import ExpandedWidget from '@/widgets/ExpandedWidget';
import { fetchDevices } from '@/api/devices';

// IMPORTANT! styled.element variables CANNOT be defined inside the functional component or else they will unmount every time the functional component re-renders
const ImgBackground = styled.img`
    position: absolute;
    height: 100%;
    z-index: -1;
`;

const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    width: 100vw;
    height: 100vh;
    font-weight: 500;
    /* background: radial-gradient(hsl(from var(--primary-color) h calc(s * 0.5) calc(l * 0.25)), var(--background-color)); */
    transition: background-color 0.25s ease;
`;

const MainContentBox = styled.div`
    box-sizing: border-box;
    display: flex;
    gap: 10px;
    padding: 10px;
    width: 100%;
    height: 70%;
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
    gap: 5px;
    padding: 5px;
    margin: 0px;
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

type RoomData = {
    id: string;
    name: string;
    img: string;
};

const rooms: RoomData[] = [
    {
        id: 'living_room', 
        name: 'Living Room', 
        img: 'src/img/LivingRoomImage_Vecislavas_Popa_Pexels.jpg', 
    }, 
    {
        id: 'dining_room', 
        name: 'Dining Room', 
        img: 'src/img/DiningRoomImage_Jean_van_der_Meulen_Pexels.jpg', 
    }, 
    {
        id: 'bedroom', 
        name: 'Bedroom', 
        img: 'src/img/BedroomImage_Jean_van_der_Meulen_Pexels.jpg', 
    }, 
];

export default function Home() {
    const [roomId, setRoomId] = useState('living_room');
    const [widgets, setWidgets] = useState([]);
    const [checked, setChecked] = useState(false);
    const modal = useModal();

    useEffect(() => {
        fetch('http://localhost:4000/api/widgets')
            .then(res => res.json())
            .then(json => { setWidgets(json); return json; })
            .then(json => { console.log('widgets', json); })
            .catch(e => console.error(e))
    }, []);

    const currentRoom = rooms.find(x => x.id == roomId);

    return (
        <>
            <div css={css`position: absolute; z-index: -1; min-width: 100vw; max-width: 100vw; min-height: 100vh; max-height: 100vh; overflow: hidden;`}>
                <ImgBackground src={currentRoom?.img} />
            </div>

            <Box>
                {/* <Keyboard /> */}

                <MainContentBox>
                    <DashboardGrid>
                        {
                            widgets.map((x: any) => (
                                <WidgetSlot $col={x.col} $row={x.row} $colSpan={x.colSpan} $rowSpan={x.rowSpan}>
                                    {/* { x.type == 'light' && <LightWidget grid={{col: x.col, row: x.row, colSpan: x.colSpan, rowSpan: x.rowSpan}} /> } */}
                                    { x.type == 'weather' && <WeatherWidget grid={{col: x.col, row: x.row, colSpan: x.colSpan, rowSpan: x.rowSpan}} /> }
                                    { x.type == 'device' && <DeviceWidget id={x.deviceId} device={x.device} grid={{col: x.col, row: x.row, colSpan: x.colSpan, rowSpan: x.rowSpan}} /> }
                                </WidgetSlot>
                            ))
                        }
                    </DashboardGrid>

                    {/* <DashboardGrid>
                        <WidgetSlot $col={1} $row={1} $colSpan={8} $rowSpan={2}>
                            <LightWidget grid={{col: 1, row: 1, colSpan: 1, rowSpan: 1}} />
                        </WidgetSlot>

                        <WidgetSlot $col={9} $row={1} $colSpan={2} $rowSpan={2}>
                            <WidgetController
                                compactRender={props => <Widget addCssGetter={() => css`height: 100%;`} title='test7' onLongPress={() => props.setExpanded(true)} />}
                                expandedRender={props => <ExpandedWidget title='test7' state={{}} actions={{}} />}
                            />
                        </WidgetSlot>

                        <WidgetSlot $col={11} $row={1} $colSpan={2} $rowSpan={2}>
                            <WidgetController
                                compactRender={props => <Widget addCssGetter={() => css`height: 100%;`} title='test8' onLongPress={() => props.setExpanded(true)} />}
                                expandedRender={props => <ExpandedWidget title='test8' state={{}} actions={{}} />}
                            />
                        </WidgetSlot>

                        <WidgetSlot $col={1} $row={3} $colSpan={2} $rowSpan={2}>
                            <WidgetController
                                compactRender={props => (
                                    <Widget
                                        addCssGetter={() => css`height: 100%;`}
                                        header={<div css={css`display: flex; flex-direction: row; gap: 10px;`}><InputCheckbox name='testCheckbox' stopPointerDownPropagation /><span css={css`color: white;`}>Lighting</span></div>}
                                        onLongPress={() => props.setExpanded(true)}
                                    >
                                    </Widget>
                                )}
                                expandedRender={props => (
                                    <ExpandedWidget title='test8' header={<div css={css`display: flex; flex-direction: row; gap: 10px;`}><InputCheckbox name='testCheckbox' stopPointerDownPropagation /><span css={css`color: white;`}>Lighting</span></div>} state={{}} actions={{}} >
                                    </ExpandedWidget>
                                )}
                            />
                        </WidgetSlot>

                        <WidgetSlot $col={3} $row={3} $colSpan={2} $rowSpan={2}>
                            <WidgetController
                                compactRender={props => (
                                    <Widget title='Light' addCssGetter={() => css`height: 100%;`} onLongPress={() => props.setExpanded(true)} >
                                        <div css={css`display: flex; align-items: center; justify-content: center; height: 100%;`}>
                                            <ToggleButton name='testToggleButton' />
                                        </div>
                                    </Widget>
                                )}
                                expandedRender={props => (
                                    <ExpandedWidget title='Light' state={{}} actions={{}} >
                                        <div css={css`display: flex; align-items: center; justify-content: center; height: 100%;`}>
                                            <ToggleButton name='testToggleButton' />
                                        </div>
                                    </ExpandedWidget>
                                )}
                            />
                        </WidgetSlot>

                        <WidgetSlot $col={5} $row={3} $colSpan={2} $rowSpan={2}>
                            <WidgetController
                                compactRender={props => (
                                    <Widget title='test3' addCssGetter={() => css`height: 100%;`} onLongPress={() => props.setExpanded(true)} >
                                        <div css={css`display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;`}>
                                            <InputKnob name='' stopPointerDownPropagation />
                                        </div>
                                    </Widget>
                                )}
                                expandedRender={props => (
                                    <ExpandedWidget title='test3' state={{}} actions={{}} >
                                        <div css={css`display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;`}>
                                            <InputKnob name='' stopPointerDownPropagation />
                                        </div>
                                    </ExpandedWidget>
                                )}
                            />
                        </WidgetSlot>

                        <WidgetSlot $col={7} $row={3} $colSpan={2} $rowSpan={2}>
                            <WidgetController
                                compactRender={props => <Widget title='test4' addCssGetter={() => css`height: 100%;`} onLongPress={() => props.setExpanded(true)} />}
                                expandedRender={props => <ExpandedWidget title='test4' state={{}} actions={{}} />}
                            />
                        </WidgetSlot>

                        <WidgetSlot $col={9} $row={3} $colSpan={4} $rowSpan={1}>
                            <WidgetController
                                compactRender={props => (
                                    <Widget title='new test' addCssGetter={() => css`height: 100%;`} onLongPress={() => props.setExpanded(true)} >
                                        <InputText stopPointerDownPropagation />
                                    </Widget>
                                )}
                                expandedRender={props => (
                                    <ExpandedWidget title='new test' state={{}} actions={{}} >
                                        <InputText stopPointerDownPropagation />
                                    </ExpandedWidget>
                                )}
                            />
                        </WidgetSlot>

                        <WidgetSlot $col={1} $row={5} $colSpan={4} $rowSpan={2}>
                            <WidgetController
                                compactRender={props => (
                                    <Widget onLongPress={() => props.setExpanded(true)} custom>
                                        <div css={css`box-sizing: border-box; display: flex; padding: 10px; padding-top: 0px; flex: 1; width: 100%; max-width: 100%; min-height: 0px; align-items: flex-end;`}>
                                            <div css={css`display: flex; flex-direction: column; align-items: flex-start; justify-content: space-between; height: 100%;`}>
                                                <span css={css`display: flex; flex-direction: row; width: 100%; color: white;`}>Desk Lamp</span>
                                                <InputLinearSlider name='' sliderWidthPx={150} handleOverlayJsx={<div css={css`display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;`}><MaterialIcon icon='lightbulb_2' wght={300} addCssGetter={() => css`font-size: 1rem; color: var(--primary-color);`} /></div>} stopPointerDownPropagation />
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
                                                <InputLinearSlider name='' sliderWidthPx={150} handleOverlayJsx={<div css={css`display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;`}><MaterialIcon icon='lightbulb_2' wght={300} addCssGetter={() => css`font-size: 1rem; color: var(--primary-color);`} /></div>} stopPointerDownPropagation />
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

                        <WidgetSlot $col={5} $row={5} $colSpan={4} $rowSpan={2}>
                            <WeatherWidget grid={{col: 1, row: 1, colSpan: 1, rowSpan: 1}} />
                        </WidgetSlot>

                        <WidgetSlot $col={9} $row={4} $colSpan={4} $rowSpan={3}>
                            <WidgetController
                                compactRender={props => (
                                    <Widget addCssGetter={() => css`height: 100%;`} onLongPress={() => props.setExpanded(true)} custom>
                                        <ImgBackground src={currentRoom?.img} css={css`top: 0px; left: -45px; width: unset; height: 100%; transform: scale(1.25);`} />

                                        <div css={css`display: flex; gap: 5px;`}>
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
                                    </Widget>
                                )}
                                expandedRender={props => (
                                    <ExpandedWidget state={{}} actions={{}}>
                                        <ImgBackground src={currentRoom?.img} css={css`top: 0px; left: -45px; width: unset; height: 100%; transform: scale(1.25);`} />

                                        <div css={css`display: flex; gap: 5px;`}>
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
                        </WidgetSlot>
                    </DashboardGrid> */}
                </MainContentBox>

                <RoomSelectorBox>
                    {/* <ToggleButtonGroup name='togglebuttongroup1' options={[{ label: 'Home', value: 'home' }, { label: 'Lighting', value: 'lighting' }, { label: 'Settings', value: 'settings' }, ]} /> */}
                    
                    {
                        rooms.map(x => (
                            <RoomSelectorBtn onClick={e => setRoomId(r => x.id)} $active={x.id == currentRoom?.id}>{x.name}</RoomSelectorBtn>
                        ))
                    }
                    
                    <RoomSelectorBtn>Porch</RoomSelectorBtn>
                    <RoomSelectorBtn className='material-symbols-outlined' css={css`--sidebar-link-size: 32px; display: inline-flex; align-items: center; justify-content: center; padding: 2px; min-width: var(--sidebar-link-size); width: var(--sidebar-link-size); max-width: var(--sidebar-link-size); min-height: var(--sidebar-link-size); height: var(--sidebar-link-size); max-height: var(--sidebar-link-size); font-size: 28px; border-radius: 999px; background: transparent; color: white; &:hover { background: #ffffff2f; }`}>add</RoomSelectorBtn>
                </RoomSelectorBox>
            </Box>
        </>
    )
}
