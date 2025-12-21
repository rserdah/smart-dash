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

export default function Settings() {
    const { theme, setTheme } = useThemeContext();

    return (
        <div css={css`box-sizing: border-box; display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1; gap: 10px; padding: 25px 50px; width: 100%;`}>
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
            </div>
        </div>
    )
}
