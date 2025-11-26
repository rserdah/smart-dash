import { useState, useEffect, createContext, useContext, ReactNode, PropsWithChildren } from 'react';
import { ThemeProvider, Global } from '@emotion/react';
import { baseTheme, themes, ThemeName } from './index';

interface AppThemeProviderProps {
    theme: ThemeName,
    setTheme: (name: ThemeName) => void
}

const ThemeContext = createContext<AppThemeProviderProps | null>(null);

export const useThemeContext = () => {
    const ctx = useContext(ThemeContext);

    if (!ctx) {
        throw new Error("useThemeContext must be used inside <AppThemeProvider>");
    }

    return ctx;
};

export const AppThemeProvider = ({ children }: PropsWithChildren) => {
    const [theme, setTheme] = useState<ThemeName>('light');
    const currentTheme = themes[theme];

    return (
        <>
            <Global styles={baseTheme} />
            <Global styles={currentTheme} />

            <ThemeContext.Provider value={{ theme, setTheme }}>
                <ThemeProvider theme={currentTheme}>
                    {children}
                </ThemeProvider>
            </ThemeContext.Provider>
        </>
    )
};
