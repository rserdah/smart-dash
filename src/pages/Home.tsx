/** @jsxImportSource @emotion/react */
import React, { useState, PropsWithChildren, useEffect } from 'react';
import { MemoryRouter, Routes, Route, NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import { css, useTheme } from '@emotion/react';
import type { Theme } from '@/theme/types';
import { baseTheme, themes, ThemeName } from '../theme/index';
import { useThemeContext } from '../theme/themeContext';
import Header from '../components/Header';
import InputKnob from '../components/input/InputKnob';
import ToggleSwitch from '../components/input/ToggleSwitch';
import Keyboard from '../components/input/Keyboard';
import InputText from '../components/input/InputText';
import ToggleButtonGroup from '../components/input/ToggleButtonGroup';
import InputLinearSlider from '../components/input/InputLinearSlider';
import InputCheckbox from '../components/input/InputCheckbox';
import ToggleButton from '../components/input/ToggleButton';

const options = Object.keys(themes);

// IMPORTANT! styled.element variables CANNOT be defined inside the functional component or else they will unmount every time the functional component re-renders
const AppBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    font-family: "Onest", sans-serif;
    font-optical-sizing: auto;
    font-weight: 500;
    font-style: normal;
    /* background: radial-gradient(hsl(from var(--primary-color) h calc(s * 0.5) calc(l * 0.25)), var(--background-color)); */
    background: var(--background-color);
    transition: background-color 0.25s ease;
`;

const AppCenterBox = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 20px;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const AppLowerBox = styled.div`
    padding: 0px 10px;
    max-height: 250px;
    
    transition: max-height 0.5s ease;
`;

export default function Home() {
    const { theme, setTheme } = useThemeContext();

    return (
        <>
            <select css={css`margin: 10px; width: max-content; font-family: "Onest", sans-serif; font-size: 20px;`} value={theme} onChange={e => setTheme(e.target.value as ThemeName)}>
                {options.map(x => (<option value={x}>{x}</option>))}
            </select>

            {/* <AppCenterBox> */}
            {/* <InputKnob /> */}
            {/* <ToggleSwitch /> */}
            {/* <Keyboard /> */}
            {/* <InputText /> */}
            {/* <InputLinearSlider sliderWidthPx={200} /> */}
            {/* <InputCheckbox name='testCheckbox' /> */}
            {/* <ToggleButton name='testTogggleButton' onChange={c => console.log('ToggleButton active:', c)} /> */}

            {/* <div css={css`margin-bottom: 100px;`}></div> */}

            {/* <div css={css`box-sizing: border-box; display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1; gap: 10px; padding: 25px 50px; width: 100%;`}>
                <div css={css`box-sizing: border-box; display: flex; flex-direction: column; flex: 1; gap: 10px; width: 40%;`}>
                    <div css={css`display: flex; gap: 10px;`}>
                        <h3 css={css`flex: 1; margin: 0px;`}>Settings</h3>
                    </div>

                    <div css={css`display: flex; gap: 10px;`}>
                        <span css={css`flex: 1`}>Other setting</span>
                        <ToggleSwitch name='testCheckbox' />
                    </div>

                    <div css={css`display: flex; gap: 10px;`}>
                        <span css={css`flex: 1`}>Another option for thing</span>
                        <ToggleSwitch name='testCheckbox' />
                    </div>

                    <div css={css`display: flex; gap: 10px;`}>
                        <span css={css`flex: 1`}>Enable for more options</span>
                        <ToggleSwitch name='testCheckbox' />
                    </div>

                    <div css={css`--primary-neo-shadow-color: #303030; --secondary-neo-shadow-color: #808080; --primary-neo-shadow-color: #ef1b1b; --secondary-neo-shadow-color: #0141cf; --primary-color: #0141cf; display: flex; align-items: center; justify-content: center; padding: 10px; width: 150px; height: 300px; border: 1px solid var(--primary-neo-shadow-color); border-top-color: var(--secondary-neo-shadow-color); border-left-color: var(--secondary-neo-shadow-color); border-radius: 10px; background: radial-gradient(#212121 10%, #0b0b0b); background: #121212; box-shadow: 3px 3px 8px 0px var(--primary-neo-shadow-color), -3px -3px 8px 0px var(--secondary-neo-shadow-color);`}>
                        <ToggleButton name='adsad' />
                    </div>
                </div>
            </div> */}
            {/* </AppCenterBox> */}

            {/* <AppLowerBox>
                </AppLowerBox> */}

            <div css={css`box-sizing: border-box; display: flex; flex: 1; width: 100%; min-height: 0px; gap: 10px; padding: 10px;`}>
                <div css={css`box-sizing: border-box; display: flex; flex-direction: column; flex-basis: 66%; width: 100%; min-height: 0px; border-radius: 10px; gap: 10px;`}>
                    <div css={css`box-sizing: border-box; display: flex; flex: 1; width: 100%; min-height: 0px; border-radius: 10px; gap: 10px;`}>
                        <div css={css`box-sizing: border-box; display: flex; flex: 1; width: 100%; min-height: 0px; border: 1px solid gray; border-radius: 10px; gap: 10px; background: var(--container-background-color);`}></div>
                    </div>

                    <div css={css`box-sizing: border-box; display: flex; flex: 1; width: 100%; min-height: 0px; border-radius: 10px; gap: 10px;`}>
                        <div css={css`box-sizing: border-box; display: flex; flex: 1; width: 100%; min-height: 0px; border: 1px solid gray; border-radius: 10px; gap: 10px; background: var(--container-background-color);`}></div>
                        <div css={css`box-sizing: border-box; display: flex; flex: 1; width: 100%; min-height: 0px; border: 1px solid gray; border-radius: 10px; gap: 10px; background: var(--container-background-color);`}></div>
                        <div css={css`box-sizing: border-box; display: flex; flex: 1; width: 100%; min-height: 0px; border: 1px solid gray; border-radius: 10px; gap: 10px; background: var(--container-background-color);`}></div>
                        <div css={css`box-sizing: border-box; display: flex; flex: 1; width: 100%; min-height: 0px; border: 1px solid gray; border-radius: 10px; gap: 10px; background: var(--container-background-color);`}></div>
                    </div>

                    <div css={css`box-sizing: border-box; display: flex; flex: 1; width: 100%; min-height: 0px; border-radius: 10px; gap: 10px;`}>
                        <div css={css`box-sizing: border-box; display: flex; flex: 1; width: 100%; min-height: 0px; border: 1px solid gray; border-radius: 10px; gap: 10px; background: var(--container-background-color);`}></div>
                        <div css={css`box-sizing: border-box; display: flex; flex: 1; width: 100%; min-height: 0px; border: 1px solid gray; border-radius: 10px; gap: 10px; background: var(--container-background-color);`}></div>
                    </div>
                </div>
                <div css={css`box-sizing: border-box; display: flex; flex-direction: column; flex: 1; width: 100%; min-height: 0px; border-radius: 10px; gap: 10px;`}>
                    <div css={css`box-sizing: border-box; display: flex; flex-direction: column; flex: 1; width: 100%; min-height: 0px; border-radius: 10px; gap: 10px;`}>
                        <div css={css`box-sizing: border-box; display: flex; flex: 1; width: 100%; min-height: 0px; border-radius: 10px; gap: 10px;`}>
                            <div css={css`box-sizing: border-box; display: flex; flex: 1; width: 100%; min-height: 0px; border: 1px solid gray; border-radius: 10px; gap: 10px; background: var(--container-background-color);`}></div>
                            <div css={css`box-sizing: border-box; display: flex; flex: 1; width: 100%; min-height: 0px; border: 1px solid gray; border-radius: 10px; gap: 10px; background: var(--container-background-color);`}></div>
                        </div>

                        <div css={css`box-sizing: border-box; display: flex; flex: 1; width: 100%; min-height: 0px; border-radius: 10px; gap: 10px;`}>
                            <div css={css`box-sizing: border-box; display: flex; flex: 1; width: 100%; min-height: 0px; border: 1px solid gray; border-radius: 10px; gap: 10px; background: var(--container-background-color);`}></div>
                            <div css={css`box-sizing: border-box; display: flex; flex: 1; width: 100%; min-height: 0px; border: 1px solid gray; border-radius: 10px; gap: 10px; background: var(--container-background-color);`}></div>
                        </div>
                    </div>

                    <div css={css`box-sizing: border-box; display: flex; flex-basis: 40%; width: 100%; min-height: 0px; border: 1px solid gray; border-radius: 10px; gap: 10px; background: var(--container-background-color);`}></div>
                </div>
            </div>
        </>
    )
}
