/** @jsxImportSource @emotion/react */
import React, { useState, PropsWithChildren, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, useTheme } from '@emotion/react';
import type { Theme } from '@/theme/types';
import { baseTheme, themes, ThemeName } from './theme/index';
import Header from './components/Header';
import InputKnob from './components/input/InputKnob';
import ToggleSwitch from './components/input/ToggleSwitch';
import Keyboard from './components/input/Keyboard';

interface AppProps extends PropsWithChildren {
}

const options = Object.keys(themes);

export default function App(props: AppProps) {
    const AppBox = styled.div`
        display: flex;
        flex-direction: column;
        width: 100vw;
        height: 100vh;
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
        font-family: "Onest", sans-serif;
        font-optical-sizing: auto;
        font-weight: 500;
        font-style: normal;
    `;

    const AppLowerBox = styled.div`
        padding: 0px 10px;
        max-height: 250px;
        
        transition: max-height 0.5s ease;
    `;

    return (
        <AppBox>
            <Header />

            <select css={css`margin: 10px; width: max-content; font-family: "Onest", sans-serif; font-size: 20px;`} /* onChange={e => setTheme(e.target.value as ThemeName)} */>
                {options.map(x => ( <option value={x}>{x}</option> ))}
            </select>

            <AppCenterBox>
                <InputKnob />
                <ToggleSwitch />
                <Keyboard />
            </AppCenterBox>

            <AppLowerBox>
            </AppLowerBox>
        </AppBox>
    )
}
