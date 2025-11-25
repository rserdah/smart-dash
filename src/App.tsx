/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import type { Theme } from '@/theme/types';

export default function App() {
    const theme = useTheme() as Theme;

    return (
        <div css={css({ minHeight: '100vh', background: theme.bg, color: theme.text, padding: 20, transition: 'background 0.3s ease, color 0.3s ease', display: 'flex', flexDirection: 'column', gap: 20 })}>
            <header css={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'center' })}>
            </header>

            <main css={css({ display: 'flex', flexDirection: 'column', gap: 20 })}>
            </main>
        </div>
    )
}
