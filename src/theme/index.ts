import { css } from '@emotion/react';
import light from './light'
import dark from './dark'
import christmas from './christmas'

export const themes = {
    light,
    dark,
    christmas
};

export type ThemeName = keyof typeof themes;

export const baseTheme = css`
    :root {
        --theme-swap-dur: 0.3s;
        --primary-color: #ff6000;
        --background-color: #dddddd;
        --text-color: #0f0f0f;
        --text-color-inverted: #f5f5f5;
        --input-gutter-color: #C7C7C7;
        --input-handle-color: white;
        --input-border-color: gray;
        --input-shadow-color: #878787;
        --input-keyboard-background: #b2b2b2;
        --input-keyboard-key-background: white;
    }

    /* Make all element smoothly transition by default for when the theme changes (all theme-dependent properties should appear here) */
    * {
        transition: 
            background-color        var(--theme-swap-dur) ease, 
            color                   var(--theme-swap-dur) ease, 
            border-color            var(--theme-swap-dur) ease, 
            box-shadow              var(--theme-swap-dur) ease;
    }
`;
