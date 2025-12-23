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

const WidgetRow = styled.div`
    box-sizing: border-box;
    display: flex;
    gap: 10px;
    flex: 1;
    width: 100%;
    min-height: 0px;
    border-radius: 10px;
`;

const WidgetCol = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
    width: 100%;
    min-height: 0px;
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

/* export */ function ConfirmModal({ message, onConfirm, onClose }: ModalProps) {
    return (
        <>
            <ModalBody>
                <p>{message}</p>
            </ModalBody>

            <ModalFooter>
                <ModalFooterBtn onClick={() => { onClose?.(); }}>Cancel</ModalFooterBtn>
                <ModalFooterBtn onClick={async () => { const result = await onConfirm(); result && onClose?.(); }}>Confirm</ModalFooterBtn>
            </ModalFooter>
        </>
    )
}

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
    const [checked, setChecked] = useState(false);
    const modal = useModal();

    const currentRoom = rooms.find(x => x.id == roomId);

    return (
        <>
            <div css={css`position: absolute; z-index: -1; min-width: 100vw; max-width: 100vw; min-height: 100vh; max-height: 100vh; overflow: hidden;`}>
                <ImgBackground src={currentRoom?.img} />
            </div>

            <Box>
                {/* <InputKnob /> */}
                {/* <Keyboard /> */}
                {/* <InputText /> */}
                {/* <InputCheckbox name='testCheckbox' /> */}
                {/* <ToggleButton name='testToggleButton' onChange={c => console.log('ToggleButton active:', c)} /> */}

                <MainContentBox>
                    <div css={css`box-sizing: border-box; display: flex; flex-direction: column; flex-basis: 66%; width: 100%; min-height: 0px; border-radius: 10px; gap: 10px;`}>
                        <WidgetRow>
                            <Widget
                                title='test1'
                                header={<div css={css`display: flex; flex-direction: row; justify-content: space-between; gap: 10px;`}>
                                    <span css={css`color: white;`}>Toggle Modal</span>
                                    <ToggleSwitch checked={checked} onToggle={checked => !Boolean(console.log(checked)) && modal.open(ConfirmModal, { title: 'Are you sure?', message: 'Are you sure you want to flip this switch?', onConfirm: () => { setChecked(c => !c); return true; } })} />
                                </div>}
                            >
                            </Widget>
                        </WidgetRow>

                        <WidgetRow>
                            <Widget
                                title='test2'
                                header={<div css={css`display: flex; flex-direction: row; gap: 10px;`}>

                                    <InputCheckbox name='testCheckbox' />
                                    <span css={css`color: white;`}>Lighting</span>
                                </div>}
                            >
                            </Widget>
                            <Widget title='Light'>
                                <div css={css`display: flex; align-items: center; justify-content: center; height: 100%;`}>
                                    <ToggleButton name='testToggleButton' />
                                </div>
                            </Widget>
                            <Widget title='test3' />
                            <Widget title='test4' />
                        </WidgetRow>

                        <WidgetRow>
                            <Widget title='test5' custom>
                                <div css={css`box-sizing: border-box; display: flex; padding: 10px; padding-top: 0px; flex: 1; width: 100%; max-width: 100%; min-height: 0px; align-items: flex-end;`}>
                                    <div css={css`display: flex; flex-direction: column; align-items: flex-start; justify-content: space-between; height: 100%;`}>
                                        <span css={css`display: flex; flex-direction: row; width: 100%; color: white;`}>Desk Lamp</span>
                                        <InputLinearSlider sliderWidthPx={150} handleOverlayJsx={<div css={css`display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;`}><MaterialIcon icon='lightbulb_2' wght={300} addCssGetter={() => css`font-size: 1rem; color: var(--primary-color);`} /></div>} />
                                    </div>
                                    
                                    <div css={css`position: relative; top: 5px; width: 110px; height: 140px; overflow: hidden;`}>
                                        <img
                                            src='src/img/NONCOMMERCIAL_DeskLampRender_yganko_Vecteezy.png'
                                            css={css`position: relative; top: 0px; left: -23px; width: 150px;`}
                                        />
                                    </div>
                                </div>
                            </Widget>
                            <Widget
                                title='test6'
                                addCssGetter={() => css`background: #00aeff91; border-color: #70d2ffff; background: radial-gradient(#96bcde 60%, #5a96c6); background-size: 1000px 1000px; background-repeat: no-repeat;`}
                                header={<>
                                    {/* clear_day, cloud, foggy, partly_cloudy_day, partly_cloudy_night, rainy, sunny, thunderstorm */}

                                    <div css={css`display: flex; flex-direction: column; color: white;`}>
                                        <div css={css`display: flex; flex-direction: row; align-items: center; justify-content: space-between;`}>
                                            <MaterialIcon icon='partly_cloudy_day' wght={300} addCssGetter={() => css`font-size: 2.5rem; color: yellow;`} />
                                            <span css={css`font-size: 1.5rem;`}>78°F</span>
                                        </div>

                                        <div css={css`display: flex; flex-direction: row; align-items: center; justify-content: space-between;`}>
                                            <span css={css``}>Partly Cloudy</span>
                                            <span css={css``}>9MPH wind</span>
                                        </div>
                                    </div>
                                </>}
                            >
                                <div css={css`display: flex; flex-direction: row; align-items: center; justify-content: space-between; margin-top: auto; width: 100%; font-weight: 200;`}>
                                    {
                                        ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((x, i) => (
                                            <div css={css`display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2px; width: 2rem; border-radius: 5px; background: ${new Date().getDay() == i ? '#ffffff48' : 'transparent'};`}>
                                                <span css={css`color: #ffffff8e;`}>{x}</span>
                                                <span>{24 + i}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </Widget>
                        </WidgetRow>
                    </div>

                    <WidgetCol>
                        <WidgetCol>
                            <WidgetRow>
                                <Widget title='test7' />
                                <Widget title='test8' />
                            </WidgetRow>

                            <WidgetRow>
                                <Widget title='test9' />
                                <Widget title='test10' />
                            </WidgetRow>
                        </WidgetCol>

                        <Widget custom>
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
                    </WidgetCol>
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
