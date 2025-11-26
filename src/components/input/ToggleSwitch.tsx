/** @jsxImportSource @emotion/react */
import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface ToggleSwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
}

const ToggleSwitchBox = styled.div`
    --toggle-switch-width: 40px;
    --toggle-switch-height: 20px;
    position: relative;
    width: var(--toggle-switch-width);
    height: var(--toggle-switch-height);
`;
// Use this to make styles based on props (so the style element can be outside of the exported function and still have styling based on props; p will be of type passed into styled.div<T>)
// color: ${p => p};

const Gutter = styled.div<{ $value: boolean }>`
    display: flex;
    padding: 1px;
    width: var(--toggle-switch-width);
    height: var(--toggle-switch-height);
    outline: 1px solid var(--input-border-color);
    border-radius: 999px;
    box-shadow: 0px 0px 5px 2px var(--primary-color);
    transition: all 0.25s ease;

    /* On */
    ${p => p.$value && css`
        background: var(--primary-color);
    `}

    /* Off */
    ${p => !p.$value && css`
        background: var(--input-gutter-color);
    `}
`;

const Handle = styled.div<{ $value: boolean }>`
    margin-left: 0px;
    width: var(--toggle-switch-height);
    min-width: var(--toggle-switch-height);
    max-width: var(--toggle-switch-height);
    height: var(--toggle-switch-height);
    border-radius: 999px;
    background: var(--input-handle-color);
    box-shadow: 0px 0px 4px 0px #232323;
    transition: all 0.25s ease;

    /* On */
    ${p => p.$value && css`
        margin-left: calc(100% - var(--toggle-switch-height));
    `}

    /* Off */
    ${p => !p.$value && css`
        margin-left: 0px;
    `}
`;

export default function ToggleSwitch(props: ToggleSwitchProps) {
    const [value, setValue] = useState(false);

    return (
        <ToggleSwitchBox onClick={e => setValue(!value)}>
            <Gutter $value={value} /* className={`toggle-switch__gutter ${value ? 'toggle-switch__gutter--on' : 'toggle-switch__gutter--off'}`} */>
                <Handle $value={value} /* className={`toggle-switch__handle ${value ? 'toggle-switch__handle--on' : 'toggle-switch__handle--off'}`} */ />
            </Gutter>
        </ToggleSwitchBox>
    )
}
