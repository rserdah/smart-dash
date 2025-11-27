/** @jsxImportSource @emotion/react */
import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { useDrag } from '@/hooks/useDrag';

interface InputKnobProps extends React.InputHTMLAttributes<HTMLInputElement> {
}

interface Vector {
    x: number, 
    y: number, 
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

export default function InputKnob(props: InputKnobProps) {
    const [value, setValue] = useState<number>(0);
    const [rotOffset, setRotOffset] = useState<number>(0);
    const [rot, setRot] = useState<number>(0);
    const [centerX, setCenterX] = useState<number>(0);
    const [centerY, setCenterY] = useState<number>(0);
    const [dragX, setDragX] = useState<number>(0);
    const [dragY, setDragY] = useState<number>(0);

    const handleRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const elem: HTMLElement | null = document.querySelector('#posTest2');
        elem!.style.left = dragX + 'px';
        elem!.style.top = dragY + 'px';

        const normalizeElem: HTMLElement | null = document.querySelector('#posTest3');

        // Gets vector from center of knob to cursor (don't change this to be relative to current rot)
        const dragVect = addVector(scaleVector(normalizeVector(addVector(vector(dragX, dragY), vector(-centerX, -centerY))), 60), vector(centerX, centerY));

        normalizeElem!.style.left = dragVect.x + 'px';
        normalizeElem!.style.top = dragVect.y + 'px';

        const x = dragVect.x - centerX;
        const y = dragVect.y - (centerY - 60);

        const angle = Math.abs((Math.atan2(x, y) * 180 / Math.PI) - 180);

        console.log('angle', angle);
        // console.log('startRot', startRot);

        const newRot = rotOffset + angle;

        !Number.isNaN(newRot) && setRot(newRot);
    }, [dragX, dragY]);

    useEffect(() => {
        const elem: HTMLElement | null = document.querySelector('#posTest');
        elem!.style.left = centerX + 'px';
        elem!.style.top = centerY + 'px';

        const elem4: HTMLElement | null = document.querySelector('#posTest4');
        elem4!.style.left = centerX + 'px';
        elem4!.style.top = (centerY - 60) + 'px';
    }, [centerX, centerY]);

    const vector = (x: number, y: number) => ({ x, y });

    const magnitude = (v: Vector) => Math.sqrt(v.x ** 2 + v.y ** 2);

    const addVector = (v1: Vector, v2: Vector) => vector(
        v1.x + v2.x,
        v1.y + v2.y,
    );

    const scaleVector = (v: Vector, scale: number) => vector(
        v.x * scale,
        v.y * scale,
    );

    const normalizeVector = (v: Vector) => scaleVector(v, 1 / magnitude(v));

    const onDragStart = (e: PointerEvent) => {
        // Prevent user from selecting text when dragging
        e.preventDefault();

        const rect: DOMRect | undefined = handleRef!.current?.getBoundingClientRect();
        const newCenterX = rect!.x + rect!.width / 2;
        const newCenterY = rect!.y + rect!.height / 2;

        const startDragX = e.clientX;
        const startDragY = e.clientY;

        console.log('(e.clientX, e.clientY)', e.clientX, e.clientY);

        // Gets vector from center of knob to cursor (don't change this to be relative to current rot)
        const dragVect = addVector(scaleVector(normalizeVector(addVector(vector(startDragX, startDragY), vector(-newCenterX, -newCenterY))), 60), vector(newCenterX, newCenterY));

        // console.log('rot', rot);

        const currX = Math.cos((rot) * Math.PI / 180) * 60;
        const currY = Math.sin((rot) * Math.PI / 180) * 60;

        const currVect = addVector(scaleVector(normalizeVector(vector(currX, currY)), 60), vector(newCenterX, newCenterY));

        const elem5: HTMLElement | null = document.querySelector('#posTest5');
        elem5!.style.left = currVect.x + 'px';
        elem5!.style.top = currVect.y + 'px';

        const x = dragVect.x - currVect.x;
        const y = dragVect.y - currVect.y;

        const angle = Math.atan2(x, y) * 180 / Math.PI;
        // console.log('angle', angle);

        // console.log('angle - rot', angle - rot);

        setCenterX(newCenterX);
        setCenterY(newCenterY);
        setRotOffset(angle);
    };

    const onDrag = (e: PointerEvent, info: { dx: number; dy: number }) => {
        const newDragX = e.clientX;
        const newDragY = e.clientY;
        setDragX(newDragX);
        setDragY(newDragY);
    };

    const onDragEnd = (e: PointerEvent) => {
    };

    const drag = useDrag({ onDragStart, onDrag, onDragEnd });

    return (
        <InputKnobBox>
            <InputKnobHandle
                ref={handleRef}
                className='input-knob__handle'
                style={{ transform: `rotate(${rot}deg)` }}
                // onMouseDown={onMouseDown}
                {...drag}
            >
                <InputKnobIndicator />
            </InputKnobHandle>
        </InputKnobBox>
    )
}
