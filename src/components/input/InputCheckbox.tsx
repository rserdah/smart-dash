/** @jsxImportSource @emotion/react */
import React, { useState, useRef, ReactNode } from 'react';
import styled from '@emotion/styled';
import { css, SerializedStyles } from '@emotion/react';
import MaterialIcon from '../MaterialIcon';

interface InputCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, | 'type' | 'name' | 'checked' | 'onChange'> {
    name: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    addContainerStyle?: string | SerializedStyles;
    icon?: ReactNode | ((checked: boolean) => ReactNode);

    /** Should propagation of onPointerDown event on the container element be stopped? */
    stopPointerDownPropagation?: boolean;
}

const InputCheckboxBox = styled.div<{ $addContainerStyle?: string | SerializedStyles }>`
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

    ${p => p.$addContainerStyle}
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
    color: var(--text-color-inverted);

    user-select: none;
    cursor: pointer;
    transition: background 2s ease;

    /* Active */
    ${p => p.$active && css`
        background: radial-gradient(var(--primary-color) 10%, color-mix(in srgb, var(--primary-color), transparent 50%));
    `}

    /* Inactive */
    ${p => !p.$active && css`
        background: radial-gradient(var(--input-gutter-color) 10%, color-mix(in srgb, var(--input-gutter-color), transparent 50%));
    `}
`;

export default function InputCheckbox(props: InputCheckboxProps) {
    const controlled = props.checked != undefined;
    // Internal value and state setter (only used if not controlled)
    const [_checked, _setChecked] = React.useState(props.defaultChecked ?? false);
    const checked = controlled ? props.checked! : _checked;

    const onChange = (checked: typeof _checked) => {
        if(!controlled) _setChecked(checked);

        props.onChange?.(checked);
    };

    const getIcon = () => {
        let icon: ReactNode;

        if(typeof props.icon === 'function') {
            icon = props.icon(checked);
        }
        else if(typeof props.icon === 'object') {
            icon = props.icon;
        }
        else {
            icon = <MaterialIcon icon='check' addCssGetter={() => css`font-size: var(--input-checkbox-font-size); ${!checked ? css`display: none` : ''}`} />
        }

        return icon;
    };

    return (
        <InputCheckboxBox $addContainerStyle={props.addContainerStyle} onPointerDown={props.stopPointerDownPropagation ? e => e.stopPropagation() : undefined}>
            {/* Since label is clickable and will trigger the onChange, the custom visual needs to be a child of label, but does not need any interactability */}
            <Checkbox
                // htmlFor={props.name}
                $active={checked}
            >
                {getIcon()}

                <CheckboxInput
                    type='checkbox'
                    name={props.name}
                    checked={checked}
                    onChange={e => onChange(e.target.checked)}
                />
            </Checkbox>
        </InputCheckboxBox>
    )
}

