/** @jsxImportSource @emotion/react */
import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useDrag } from '@/hooks/useDrag';

interface InputLinearSliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
    range?: [number, number];
    clampRange?: [number, number];
    sliderWidthPx?: number;
    handleOverlayJsx?: React.ReactNode;
}

interface Vector {
    x: number, 
    y: number, 
}

// Modified from ChatGPT
function mapRange(
    value: number,
    inMin: number,
    inMax: number,
    outMin: number = 0,
    outMax: number = 1
) {
    // Normalize first (makes it from 0 to 1)
    const normalized = (value - inMin) / (inMax - inMin);

    // Then just multiply by the output range (adding the min so it doesn't go below the min)
    return outMin + normalized * (outMax - outMin);
}

const sliderHeightPx = 20;
const progressBarPadPx = 1;

const InputLinearSliderBox = styled.div<{ $sliderWidthPx: number }>`
    --input-slider-width: ${p => p.$sliderWidthPx}px;
    --slider-height: ${sliderHeightPx}px;
    box-sizing: border-box;
    position: relative;
    height: var(--slider-height);
`;

const Gutter = styled.div`
    box-sizing: border-box;
    position: relative;
    display: flex;
    padding: 1px;
    width: var(--input-slider-width);
    border-radius: 999px;
    outline: 1px solid var(--input-border-color);
    box-shadow: 0px 0px 5px 2px var(--primary-color);
    transition: all 0.25s ease;
`;

const GutterClip = styled.div`
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex: 1;
    border-radius: 999px;
    overflow: hidden;
`;
const ProgressBar = styled.div<{ $pixelWidth: number }>`
    box-sizing: border-box;
    position: relative;
    display: flex;
    padding: ${progressBarPadPx}px;
    width: ${p => `${p.$pixelWidth}px`};
    min-width: ${sliderHeightPx + progressBarPadPx + progressBarPadPx}px;
    border-radius: 999px;
    /* background: linear-gradient(135deg, var(--primary-color), color-mix(in srgb, var(--primary-color), white)); */
    background: var(--primary-color);
`;

const InputLinearSliderHandle = styled.div`
    margin-left: auto;
    width: var(--slider-height);
    min-width: var(--slider-height);
    max-width: var(--slider-height);
    height: var(--slider-height);
    min-height: var(--slider-height);
    max-height: var(--slider-height);
    border-radius: 999px;
    background: var(--input-handle-color);
    box-shadow: 0px 0px 4px 0px #232323;
    transition: all 0.25s ease;
`;

export default function InputLinearSlider(props: InputLinearSliderProps) {
    const [value, setValue] = useState<number>(0);
    const [styleValue, setStyleValue] = useState<number>(0);

    const gutterRef = useRef<HTMLDivElement | null>(null);
    const handleRef = useRef<HTMLDivElement | null>(null);

    // The actual input value is going to be based on the style/visual value because the visual range of the slider has restrictions (the handle can't go further down than the width of it or else it will go off of the slider gutter)
    useEffect(() => {
        let newValue = 0;
        const visualMinPx = (sliderHeightPx + progressBarPadPx + progressBarPadPx);
        const visualMaxPx = props.sliderWidthPx ?? 100;

        newValue = mapRange(styleValue, visualMinPx, visualMaxPx, 0, 100);

        setValue(newValue);
    }, [styleValue]);

    const onDragStart = (e: PointerEvent) => {
        // // Prevent user from selecting text when dragging
        // e.preventDefault();

        // const rect: DOMRect | undefined = handleRef!.current?.getBoundingClientRect();
        // const newCenterX = rect!.x + rect!.width / 2;
        // const newCenterY = rect!.y + rect!.height / 2;

        // const startDragX = e.clientX;
        // const startDragY = e.clientY;
    };

    const onDrag = (e: PointerEvent, info: { dx: number; dy: number }) => {
        setStyleValue(v => {
            let newStyleValue = v + info.dx;

            // Clamp the value to the visual minimum of the slider (visual miniumum meaning the lowest that the slider handle can go; which will effectively subtract from the full range of values (i.e. if the slider handle is 32px circle, then the new range would be from 32px to <the slider width>))
            // Pixel values are used because percents will cause it to misalign with the user's drag
            const visualMinPx = (sliderHeightPx + progressBarPadPx + progressBarPadPx);
            const visualMaxPx = props.sliderWidthPx ?? 100;
            
            newStyleValue = Math.min(Math.max(newStyleValue, visualMinPx), visualMaxPx);

            // Since the visual range of the slider has restrictions (the handle can't go further down than the width of it or else it will go off of the slider gutter), the actual value is going to be based on the style/visual value
            // The actual input value will be set using a useEffect based on the style value

            return newStyleValue;
        });
    };

    const onDragEnd = (e: PointerEvent) => {
    };

    const drag = useDrag({ onDragStart, onDrag, onDragEnd });

    return (
        <InputLinearSliderBox $sliderWidthPx={props.sliderWidthPx ?? 100}>
            <Gutter ref={gutterRef}>
                <GutterClip {...drag}>
                    <ProgressBar $pixelWidth={styleValue}>
                        <InputLinearSliderHandle
                            ref={handleRef}
                            // onMouseDown={onMouseDown}
                        >
                            {props.handleOverlayJsx}
                        </InputLinearSliderHandle>
                    </ProgressBar>
                </GutterClip>
            </Gutter>
        </InputLinearSliderBox>
    )
}
