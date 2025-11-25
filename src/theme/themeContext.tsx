import { createContext, useContext, useState, ReactNode } from 'react';
import { ThemeProvider } from '@emotion/react';
import { themes } from './index';

type ThemeName = keyof typeof themes;

const ThemeContext = createContext<{
    themeName: ThemeName,
    setThemeName: (name: ThemeName) => void
}>({
    themeName: 'light',
    setThemeName: (name: ThemeName) => { }
});

export const useThemeSwitcher = () => useContext(ThemeContext);

export const AppThemeProvider = ({ children }: { children?: ReactNode }) => {
    const [themeName, setThemeName] = useState<ThemeName>('light');
    const theme = themes[themeName];

    return (
        <ThemeContext.Provider value={{ themeName, setThemeName }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
};
