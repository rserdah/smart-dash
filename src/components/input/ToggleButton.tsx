/** @jsxImportSource @emotion/react */
import React, { useState, useRef, ReactNode } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import InputCheckbox from './InputCheckbox';

interface ToggleButtonBaseProps {
    name: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    icon?: ReactNode | ((checked: boolean) => ReactNode);
}

type ToggleButtonProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof ToggleButtonBaseProps> & ToggleButtonBaseProps;

const ToggleButtonBox = styled.div`
    --input-checkbox-padding: 2px;
    --input-checkbox-size: 22px;
    --input-checkbox-font-size: 17px;
    --input-checkbox-border-radius: 5px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--input-checkbox-padding);
    width: var(--input-checkbox-size);
    min-width: var(--input-checkbox-size);
    max-width: var(--input-checkbox-size);
    height: var(--input-checkbox-size);
    min-height: var(--input-checkbox-size);
    max-height: var(--input-checkbox-size);
    border: 1px solid var(--input-border-color);
    border-radius: var(--input-checkbox-border-radius);
    /* box-shadow: 0px 0px 5px 2px var(--primary-color); */
`;

const CheckboxInput = styled.input`
    opacity: 0;
    position: absolute;
    padding: 0px;
    margin: 0px;
    width: 0px;
    height: 0px;
    top: 0px;
    left: 0px;
    pointer-events: none;
    inset: 0;
`;

const Checkbox = styled.label<{ $active: boolean }>`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    min-width: 0px;
    height: 100%;
    
    border-radius: calc(var(--input-checkbox-border-radius) - var(--input-checkbox-padding));
    background: radial-gradient(var(--input-gutter-color) 10%, color-mix(in srgb, var(--input-gutter-color), transparent 50%));

    user-select: none;
    cursor: pointer;
    transition: background 2s ease;

    /* Active */
    ${p => p.$active && css`
        background: radial-gradient(var(--primary-color) 10%, color-mix(in srgb, var(--primary-color), transparent 50%));
        color: var(--text-color-inverted);
    `}

    /* Inactive */
    ${p => !p.$active && css`
        background: radial-gradient(var(--input-gutter-color) 10%, color-mix(in srgb, var(--input-gutter-color), transparent 50%));
        color: var(--text-color);
    `}
`;

const ButtonIcon = styled.span<{ $checked: boolean }>`
    font-variation-settings: 'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24;
    font-size: 24px;

    ${p => !p.$checked && css`
        color: var(--text-color);
    `}
`;

export default function ToggleButton(props: ToggleButtonProps) {
    const controlled = props.checked != undefined;
    // Internal value and state setter (only used if not controlled)
    const [_checked, _setChecked] = React.useState(props.defaultChecked ?? false);
    const checked = controlled ? props.checked! : _checked;

    const onChange = (checked: typeof _checked) => {
        if(!controlled) _setChecked(checked);

        props.onChange?.(checked);
    };

    return (
        <InputCheckbox
            name={props.name}
            addContainerStyle={css`--input-checkbox-size: 48px; --input-checkbox-padding: 3px; --input-checkbox-border-radius: 10px;`}
            icon={checked => <ButtonIcon className='material-symbols-outlined' $checked={checked}>power_settings_new</ButtonIcon>}
            checked={checked}
            onChange={onChange}
        />
    )
}

