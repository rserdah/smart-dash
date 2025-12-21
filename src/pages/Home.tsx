/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { css } from '@emotion/react';
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

// IMPORTANT! styled.element variables CANNOT be defined inside the functional component or else they will unmount every time the functional component re-renders
const ImgBackground = styled.img`
    position: absolute;
    width: 100%;
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

const Widget = styled.div`
    box-sizing: border-box;
    display: flex;
    flex: 1;
    gap: 10px;
    padding: 10px;
    width: 100%;
    min-height: 0px;
    border: 1px solid white;
    border-radius: 10px;
    /* background: var(--container-background-color); */
    background: #69696910;
    backdrop-filter: blur(10px) saturate(0.9);
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
    align-items: center;
    justify-content: center;
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

export default function Home() {
    const [checked, setChecked] = useState(false);
    const modal = useModal();

    return (
        <>
            <ImgBackground src='src/img/LivingRoomImage_Vecislavas_Popa_Pexels.jpg' />

            <Box>
                {/* <InputKnob /> */}
                {/* <Keyboard /> */}
                {/* <InputText /> */}
                {/* <InputLinearSlider sliderWidthPx={200} /> */}
                {/* <InputCheckbox name='testCheckbox' /> */}
                {/* <ToggleButton name='testTogggleButton' onChange={c => console.log('ToggleButton active:', c)} /> */}

                <MainContentBox>
                    <div css={css`box-sizing: border-box; display: flex; flex-direction: column; flex-basis: 66%; width: 100%; min-height: 0px; border-radius: 10px; gap: 10px;`}>
                        <WidgetRow>
                            <Widget>
                                <ToggleSwitch checked={checked} onToggle={checked => !Boolean(console.log(checked)) && modal.open(ConfirmModal, { title: 'Are you sure?', message: 'Are you sure you want to flip this switch?', onConfirm: () => { setChecked(c => !c); return true; } })} />
                                <span css={css`color: white;`}>Toggle Modal</span>
                            </Widget>
                        </WidgetRow>

                        <WidgetRow>
                            <Widget>
                                <InputCheckbox name='testCheckbox' />
                                <span css={css`color: white;`}>Lighting</span>
                            </Widget>
                            <Widget>
                                <ToggleButton name='testTogggleButton' />
                                <span css={css`color: white;`}>Light</span>
                            </Widget>
                            <Widget />
                            <Widget />
                        </WidgetRow>

                        <WidgetRow>
                            <Widget />
                            <Widget />
                        </WidgetRow>
                    </div>

                    <WidgetCol>
                        <WidgetCol>
                            <WidgetRow>
                                <Widget />
                                <Widget />
                            </WidgetRow>

                            <WidgetRow>
                                <Widget />
                                <Widget />
                            </WidgetRow>
                        </WidgetCol>

                        <Widget css={css`position: relative; overflow: hidden;`}>
                            <ImgBackground src='src/img/LivingRoomImage_Vecislavas_Popa_Pexels.jpg' css={css`top: 0px; left: -45px; width: unset; height: 100%; transform: scale(1.25)`} />

                            <div css={css`display: flex; gap: 8px; align-items: center; justify-content: center; padding: 2px 10px; height: max-content; border: 1px solid #ffffff49; border-radius: 999px; color: white; background: #69696910; backdrop-filter: blur(10px) saturate(0.9);`}>
                                <div css={css`width: 5px; height: 5px; border-radius: 999px; background: #e92323ff; box-shadow: 0px 0px 4px 2px #e92323ff;`}></div>
                                <span css={css`font-size: 14px;`}>Live</span>
                            </div>

                            <div css={css`display: flex; gap: 0px; align-items: center; justify-content: center; padding: 2px 10px; padding-left: 5px; height: max-content; border: 1px solid #ffffff49; border-radius: 999px; color: white; background: #69696910; backdrop-filter: blur(10px) saturate(0.9);`}>
                                <span className='material-symbols-outlined' css={css`font-size: 20px;`}>bolt</span>
                                <span css={css`font-size: 14px;`}>65W</span>
                            </div>

                            <div css={css`display: flex; gap: 0px; align-items: center; justify-content: center; padding: 2px 10px; padding-left: 5px; height: max-content; border: 1px solid #ffffff49; border-radius: 999px; color: white; background: #69696910; backdrop-filter: blur(10px) saturate(0.9);`}>
                                <span className='material-symbols-outlined' css={css`font-size: 20px;`}>lightbulb_2</span>
                                <span css={css`font-size: 14px;`}>60%</span>
                            </div>

                            <div css={css`display: flex; gap: 0px; align-items: center; justify-content: center; padding: 2px 10px; padding-left: 5px; height: max-content; border: 1px solid #ffffff49; border-radius: 999px; color: white; background: #69696910; backdrop-filter: blur(10px) saturate(0.9);`}>
                                <span className='material-symbols-outlined' css={css`font-size: 20px;`}>thermometer</span>
                                <span css={css`font-size: 14px;`}>78°F</span>
                            </div>
                        </Widget>
                    </WidgetCol>
                </MainContentBox>

                <RoomSelectorBox>
                    <ToggleButtonGroup name='togglebuttongroup1' options={[{ label: 'Home', value: 'home' }, { label: 'Lighting', value: 'lighting' }, { label: 'Settings', value: 'settings' }, ]} />
                </RoomSelectorBox>
            </Box>
        </>
    )
}
