/** @jsxImportSource @emotion/react */
import React, { useState, PropsWithChildren, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, useTheme } from '@emotion/react';
import type { Theme } from '@/theme/types';
import { baseTheme, themes, ThemeName } from './theme/index';
import { useThemeContext } from './theme/themeContext';
import Header from './components/Header';
import InputKnob from './components/input/InputKnob';
import ToggleSwitch from './components/input/ToggleSwitch';
import Keyboard from './components/input/Keyboard';
import InputText from './components/input/InputText';
import ToggleButtonGroup from './components/input/ToggleButtonGroup';
import InputLinearSlider from './components/input/InputLinearSlider';

interface AppProps extends PropsWithChildren {
}

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

export default function App(props: AppProps) {
    const { theme, setTheme } = useThemeContext();

    return (
        <AppBox>
            <Header />

            <select css={css`margin: 10px; width: max-content; font-family: "Onest", sans-serif; font-size: 20px;`} value={theme} onChange={e => setTheme(e.target.value as ThemeName)}>
                {options.map(x => ( <option value={x}>{x}</option> ))}
            </select>

            <div css={css`display: flex; width: 100%; justify-content: center;`}>
                <ToggleButtonGroup name='togglebuttongroup1' options={[{ label: 'Home', value: 'home' }, { label: 'Lighting', value: 'lighting' }, { label: 'Settings', value: 'settings' }, ]} />
            </div>

            <AppCenterBox>
                <InputKnob />
                <ToggleSwitch />
                {/* <Keyboard /> */}
                <InputText />
                <InputLinearSlider />

                <div css={css`margin-bottom: 100px;`}></div>
            </AppCenterBox>

            <AppLowerBox>
            </AppLowerBox>
        </AppBox>
    )
}
