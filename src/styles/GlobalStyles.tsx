import { Global, css } from '@emotion/react';

const styles = css`
    html {
        font-size: 16px;
    }

    body {
        font-family: "Onest", sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial;
        font-optical-sizing: auto;
        font-weight: 500;
        font-style: normal;

        user-select: none;
    }

    div,
    button,
    input,
    textarea,
    select {
        font-family: inherit;
    }
`;

export default function GlobalStyles() {
    return (
        <Global styles={styles} />
    )
}
