/** @jsxImportSource @emotion/react */
import React, { useState, useRef, forwardRef, ChangeEvent } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
}

const InputTextBox = styled.div`
    position: relative;
`;

const InputTextInput = styled.input`
    padding: 0px 10px;
    height: 28px;
    border: none;
    border-radius: 8px;
    font-family: "Onest", sans-serif;
    font-size: 20px;
    font-weight: 300;
    font-style: normal;
    font-optical-sizing: auto;
    background: var(--input-handle-color);
    color: var(--text-color);

    &:focus {
        outline: none;
        box-shadow: 0px 0px 5px 2px var(--primary-color);
    }
`;

const InputText = forwardRef<HTMLInputElement, InputTextProps>((props: InputTextProps, ref) => {
    let value: string | number | readonly string[], onChange: React.ChangeEventHandler<HTMLInputElement>, setValue: React.Dispatch<React.SetStateAction<typeof value>>;

    // If used as a controlled component, then just pass the value and onChange props to the inner input
    if(props.value != undefined && props.onChange != undefined) {
        value = props.value;
        onChange = props.onChange;
    }
    // Otherwise, this component manages its own state
    else {
        ([value, setValue] = useState<typeof value>(props.defaultValue != undefined ? props.defaultValue : ''));

        onChange = e => {
            setValue(e.target.value);
        };
    }

    return (
        <InputTextBox>
            <InputTextInput {...props} ref={ref} type='text' value={value} onChange={onChange} />
        </InputTextBox>
    )
});

export default InputText;
