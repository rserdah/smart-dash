/** @jsxImportSource @emotion/react */
import React, { useState, PropsWithChildren, useEffect } from 'react';
import { MemoryRouter, Routes, Route, NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import { css, useTheme } from '@emotion/react';
import type { Theme } from '@/theme/types';
import { baseTheme, themes, ThemeName } from '../theme/index';
import { useThemeContext } from '../theme/themeContext';
import Header, { ThemeSwitcher } from '../components/Header';
import InputKnob from '../components/input/InputKnob';
import ToggleSwitch from '../components/input/ToggleSwitch';
import Keyboard from '../components/input/Keyboard';
import InputText from '../components/input/InputText';
import ToggleButtonGroup from '../components/input/ToggleButtonGroup';
import InputLinearSlider from '../components/input/InputLinearSlider';
import InputCheckbox from '../components/input/InputCheckbox';
import ToggleButton from '../components/input/ToggleButton';
import { useModal } from '@/modals/ModalContext';
import { ModalProps, ModalBody, ModalFooter, ModalFooterBtn } from '@/modals/ModalShell';


// IMPORTANT! styled.element variables CANNOT be defined inside the functional component or else they will unmount every time the functional component re-renders
const ImgBackground = styled.img`
    position: absolute;
    height: 100%;
    z-index: -1;
`;

const AppItemBox = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    padding: 5px;
    min-width: 75px;
    max-width: 75px;
    min-height: 75px;
    max-height: 75px;
    border-radius: 8px;
    background: #69696910;
    backdrop-filter: blur(10px) saturate(0.9);
`;

export default function AppsPage() {
    const modal = useModal();

    return (
        <>
            {/* <div css={css`position: absolute; z-index: -1; min-width: 100vw; max-width: 100vw; min-height: 100vh; max-height: 100vh; overflow: hidden; background: radial-gradient(#131313ff, #535353ff); background-size: 150vw 150vw; background-position: center; background-repeat: no-repeat;`}></div> */}

            <div css={css`position: absolute; z-index: -1; min-width: 100vw; max-width: 100vw; min-height: 100vh; max-height: 100vh; overflow: hidden;`}>
                <ImgBackground src='src/img/LivingRoomImage_Vecislavas_Popa_Pexels.jpg' />
            </div>

            <div css={css`box-sizing: border-box; display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1; gap: 10px; padding: 25px 50px; width: 100%; color: var(--text-color)`}>
                <div css={css`box-sizing: border-box; display: flex; flex-direction: column; flex: 1; gap: 10px; width: 80%;`}>
                    <div css={css`display: flex; gap: 10px;`}>
                        <h3 css={css`flex: 1; margin: 0px;`}>Apps</h3>
                    </div>

                    <div css={css`display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; outline: 1px solid red;`}>
                        <AppItemBox>
                            <div css={css`min-width: 35px; max-width: 35px; min-height: 35px; max-height: 35px; border-radius: 8px; background: green;`}></div>
                            <span css={css`font-size: 0.75rem; color: white;`}>App Name</span>
                        </AppItemBox>
                        <AppItemBox>
                            <div css={css`min-width: 35px; max-width: 35px; min-height: 35px; max-height: 35px; border-radius: 8px; background: green;`}></div>
                            <span css={css`font-size: 0.75rem; color: white;`}>App Name</span>
                        </AppItemBox>
                        <AppItemBox>
                            <div css={css`min-width: 35px; max-width: 35px; min-height: 35px; max-height: 35px; border-radius: 8px; background: green;`}></div>
                            <span css={css`font-size: 0.75rem; color: white;`}>App Name</span>
                        </AppItemBox>
                        <AppItemBox>
                            <div css={css`min-width: 35px; max-width: 35px; min-height: 35px; max-height: 35px; border-radius: 8px; background: green;`}></div>
                            <span css={css`font-size: 0.75rem; color: white;`}>App Name</span>
                        </AppItemBox>
                        <AppItemBox>
                            <div css={css`min-width: 35px; max-width: 35px; min-height: 35px; max-height: 35px; border-radius: 8px; background: green;`}></div>
                            <span css={css`font-size: 0.75rem; color: white;`}>App Name</span>
                        </AppItemBox>
                        <AppItemBox>
                            <div css={css`min-width: 35px; max-width: 35px; min-height: 35px; max-height: 35px; border-radius: 8px; background: green;`}></div>
                            <span css={css`font-size: 0.75rem; color: white;`}>App Name</span>
                        </AppItemBox>
                        <AppItemBox>
                            <div css={css`min-width: 35px; max-width: 35px; min-height: 35px; max-height: 35px; border-radius: 8px; background: green;`}></div>
                            <span css={css`font-size: 0.75rem; color: white;`}>App Name</span>
                        </AppItemBox>
                        
                        
                        <AppItemBox>
                            <div css={css`min-width: 35px; max-width: 35px; min-height: 35px; max-height: 35px; border-radius: 8px; background: green;`}></div>
                            <span css={css`font-size: 0.75rem; color: white;`}>App Name</span>
                        </AppItemBox>
                        <AppItemBox>
                            <div css={css`min-width: 35px; max-width: 35px; min-height: 35px; max-height: 35px; border-radius: 8px; background: green;`}></div>
                            <span css={css`font-size: 0.75rem; color: white;`}>App Name</span>
                        </AppItemBox>
                        <AppItemBox>
                            <div css={css`min-width: 35px; max-width: 35px; min-height: 35px; max-height: 35px; border-radius: 8px; background: green;`}></div>
                            <span css={css`font-size: 0.75rem; color: white;`}>App Name</span>
                        </AppItemBox>
                        <AppItemBox>
                            <div css={css`min-width: 35px; max-width: 35px; min-height: 35px; max-height: 35px; border-radius: 8px; background: green;`}></div>
                            <span css={css`font-size: 0.75rem; color: white;`}>App Name</span>
                        </AppItemBox>
                        <AppItemBox>
                            <div css={css`min-width: 35px; max-width: 35px; min-height: 35px; max-height: 35px; border-radius: 8px; background: green;`}></div>
                            <span css={css`font-size: 0.75rem; color: white;`}>App Name</span>
                        </AppItemBox>
                        <AppItemBox>
                            <div css={css`min-width: 35px; max-width: 35px; min-height: 35px; max-height: 35px; border-radius: 8px; background: green;`}></div>
                            <span css={css`font-size: 0.75rem; color: white;`}>App Name</span>
                        </AppItemBox>
                        <AppItemBox>
                            <div css={css`min-width: 35px; max-width: 35px; min-height: 35px; max-height: 35px; border-radius: 8px; background: green;`}></div>
                            <span css={css`font-size: 0.75rem; color: white;`}>App Name</span>
                        </AppItemBox>
                        
                        
                        <AppItemBox>
                            <div css={css`min-width: 35px; max-width: 35px; min-height: 35px; max-height: 35px; border-radius: 8px; background: green;`}></div>
                            <span css={css`font-size: 0.75rem; color: white;`}>App Name</span>
                        </AppItemBox>
                        <AppItemBox>
                            <div css={css`min-width: 35px; max-width: 35px; min-height: 35px; max-height: 35px; border-radius: 8px; background: green;`}></div>
                            <span css={css`font-size: 0.75rem; color: white;`}>App Name</span>
                        </AppItemBox>
                        <AppItemBox>
                            <div css={css`min-width: 35px; max-width: 35px; min-height: 35px; max-height: 35px; border-radius: 8px; background: green;`}></div>
                            <span css={css`font-size: 0.75rem; color: white;`}>App Name</span>
                        </AppItemBox>
                        <AppItemBox>
                            <div css={css`min-width: 35px; max-width: 35px; min-height: 35px; max-height: 35px; border-radius: 8px; background: green;`}></div>
                            <span css={css`font-size: 0.75rem; color: white;`}>App Name</span>
                        </AppItemBox>
                        <AppItemBox>
                            <div css={css`min-width: 35px; max-width: 35px; min-height: 35px; max-height: 35px; border-radius: 8px; background: green;`}></div>
                            <span css={css`font-size: 0.75rem; color: white;`}>App Name</span>
                        </AppItemBox>
                        <AppItemBox>
                            <div css={css`min-width: 35px; max-width: 35px; min-height: 35px; max-height: 35px; border-radius: 8px; background: green;`}></div>
                            <span css={css`font-size: 0.75rem; color: white;`}>App Name</span>
                        </AppItemBox>
                        <AppItemBox>
                            <div css={css`min-width: 35px; max-width: 35px; min-height: 35px; max-height: 35px; border-radius: 8px; background: green;`}></div>
                            <span css={css`font-size: 0.75rem; color: white;`}>App Name</span>
                        </AppItemBox>
                        
                        
                    </div>
                </div>
            </div>
        </>
    )
}
