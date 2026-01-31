/** @jsxImportSource @emotion/react */
import React, { useState, useRef, useEffect, useCallback, ReactNode } from 'react';
import styled from '@emotion/styled';
import { useDrag } from '@/hooks/useDrag';
import { css, SerializedStyles } from '@emotion/react';

interface InputKnobProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, | 'type' | 'name' | 'value' | 'defaultValue' | 'onChange'> {
    name: string;
    value?: number;
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    onChange?: (value: number) => void;
    addContainerStyle?: string | SerializedStyles;

    /** Should propagation of onPointerDown event on the container element be stopped? */
    stopPointerDownPropagation?: boolean;
}

const InputKnobBox = styled.div`
    position: relative;
    width: 100px;
    height: 100px;
`;

const InputKnobHandle = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100px;
    height: 100px;
    background: var(--input-handle-color);
    border-radius: 999px;
    outline: 1px solid var(--input-border-color);
    box-shadow: 0px 0px 5px 2px var(--primary-color);
    transform: rotate(0deg);
    transition: outline 0.5s ease, box-shadow 0.5s ease;
`;

const InputKnobIndicator = styled.div`
    --handle-indicator-size: 10px;
    position: absolute;
    width: var(--handle-indicator-size);
    height: var(--handle-indicator-size);
    top: 5px;
    left: calc(50% - var(--handle-indicator-size) / 2);
    border-radius: 999px;
    background: gray;
`;

// Modified from ChatGPT
function normalizeDelta(delta: number) {
    if(delta > Math.PI) return delta - Math.PI * 2;
    if(delta < -Math.PI) return delta + Math.PI * 2;
    return delta;
}

// Modified from ChatGPT
function getAngle(cx: number, cy: number, x: number, y: number) {
    return Math.atan2(y - cy, x - cx);
}

// Modified from ChatGPT
function clamp(v: number, min: number, max: number) {
    return Math.min(max, Math.max(min, v));
}

// Modified from ChatGPT
function snap(v: number, step?: number) {
    if(!step) return v;
    return Math.round(v / step) * step;
}

export default function InputKnob(props: InputKnobProps) {
    const controlled = props.value != undefined;
    // Internal value and state setter (only used if not controlled)
    const [_value, _setValue] = React.useState(props.defaultValue ?? 0);
    const value = controlled ? props.value! : _value;

    const startAngleRef = useRef(0);
    const startValueRef = useRef(0);

    const handleRef = useRef<HTMLDivElement | null>(null);

    const onChange = (value: typeof _value) => {
        if(!controlled) _setValue(value);

        props.onChange?.(value);
    };

    // Modified from ChatGPT
    const onDragStart = useCallback((e: PointerEvent) => {
        if(props.stopPointerDownPropagation) {
            e.stopPropagation();
        }

        // Prevent user from selecting text when dragging
        e.preventDefault();

        const rect = handleRef.current!.getBoundingClientRect();

        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        startAngleRef.current = getAngle(cx, cy, e.clientX, e.clientY);
        startValueRef.current = value;
    }, [value]);

    // Modified from ChatGPT
    const onDrag = useCallback((e: PointerEvent, info: { dx: number; dy: number }) => {
        if(props.stopPointerDownPropagation) {
            e.stopPropagation();
        }

        const rect = handleRef.current!.getBoundingClientRect();

        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const currentAngle = getAngle(cx, cy, e.clientX, e.clientY);
        let delta = currentAngle - startAngleRef.current;
        delta = normalizeDelta(delta);

        let degrees = delta * (180 / Math.PI);

        degrees = startValueRef.current + degrees;
        
        degrees = snap(clamp(degrees, -90, 90), props.step);

        onChange(degrees);
    }, [_value]); // ?????

    // Modified from ChatGPT
    const onDragEnd = useCallback((e: PointerEvent) => {
        if(props.stopPointerDownPropagation) {
            e.stopPropagation();
        }
    }, []);

    const drag = useDrag({ onDragStart, onDrag, onDragEnd }, { stopPropagation: props.stopPointerDownPropagation });

    return (
        <InputKnobBox>
            <InputKnobHandle
                ref={handleRef}
                style={{ transform: `rotate(${value}deg)` }}
                {...drag}
            >
                <InputKnobIndicator />
            </InputKnobHandle>
        </InputKnobBox>
    )
}
