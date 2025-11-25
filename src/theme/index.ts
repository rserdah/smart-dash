import light from './light'
import dark from './dark'
import christmas from './christmas'

export const themes = {
    light,
    dark,
    christmas
}

export type ThemeName = keyof typeof themes
