/** @jsxImportSource @emotion/react */
import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface ToggleButtonGroupProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, | 'type' | 'name' | 'onChange'> {
    name: string, 
    onChange?: (value: string | number | readonly string[]) => void, 
    options?: { label: string, value: string | number | readonly string[] }[], 
}

const ToggleButtonGroupBox = styled.div`
    display: flex;
    gap: 3px;
    padding: 3px;
    border-radius: 8px;
    background: gray;
`;

const RadioInput = styled.input`
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

const ToggleButton = styled.label<{ $active: boolean }>`
    position: relative;
    padding: 10px;
    border-radius: 8px;

    /* background: var(--input-keyboard-background); */
    /* color: var(--text-color); */
    user-select: none;
    
    cursor: pointer;
    transition: background 0.2s ease;

    /* Active */
    ${p => p.$active && css`
        background: var(--primary-color);
    `}

    /* Inactive */
    ${p => !p.$active && css`
    `}
`;

export default function ToggleButtonGroup(props: ToggleButtonGroupProps) {
    const controlled = props.value != undefined;
    // Internal value and state setter (only used if not controlled)
    const [_value, _setValue] = React.useState(props.defaultValue ?? '');
    const value = controlled ? props.value : _value;

    const onChange = (value: typeof _value) => {
        if(!controlled) _setValue(value);

        props.onChange?.(value);

        console.log(value);
    };

    return (
        <ToggleButtonGroupBox>
            {
                props.options?.map(o => (
                    // Since label is clickable and will trigger the onChange, the custom visual needs to be a child of label, but does not need any interactability
                    <ToggleButton 
                        key={`toggle_button_group_option_${o.label}_${o.value}`}
                        $active={value == o.value}
                    >
                        <RadioInput type='radio' name={props.name} value={o.value} onChange={e => onChange(o.value)} />

                        {o.label}
                    </ToggleButton>
                ))
            }
        </ToggleButtonGroupBox>
    )
}
