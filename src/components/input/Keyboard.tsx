/** @jsxImportSource @emotion/react */
import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import { css, cx } from '@emotion/css';

interface KeyboardProps {
}

const KeyboardBox = styled.div`
    --keyboard-base-unit: 80px;
    box-sizing: border-box;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: calc(var(--keyboard-base-unit) * 0.1);
    bottom: 0px;
    padding: calc(var(--keyboard-base-unit) * 0.1) calc(var(--keyboard-base-unit) * 0.08);
    padding-bottom: calc(var(--keyboard-base-unit) * 0.1);
    width: 100%;
    max-width: calc(var(--keyboard-base-unit) * 5.5);
    background: var(--input-keyboard-background);
    color: var(--text-color);
`;

const KeyboardRow = styled.div`
    display: flex;
    justify-content: center;
    gap: calc(var(--keyboard-base-unit) * 0.07);
    width: 100%;
`;

const KeyboardKey = styled.button`
    --keyboard-key-width: calc(var(--keyboard-base-unit) * 0.45);
    --keyboard-key-height: calc(var(--keyboard-base-unit) * 0.60);
    width: var(--keyboard-key-width);
    min-width: var(--keyboard-key-width);
    max-width: var(--keyboard-key-width);
    height: var(--keyboard-key-height);
    min-height: var(--keyboard-key-height);
    max-height: var(--keyboard-key-height);
    border: none;
    border-radius: calc(var(--keyboard-base-unit) * 0.08);
    font-family: "Onest", sans-serif;
    font-size: calc(var(--keyboard-base-unit) * 0.24);
    font-weight: 500;
    background: var(--input-keyboard-key-background);
    color: var(--text-color);
    box-shadow: 0px calc(var(--keyboard-base-unit) * 0.02) calc(var(--keyboard-base-unit) * 0.02) 0px var(--input-shadow-color);
`;

const Keyboard__row__number = css`
    margin-bottom: calc(var(--keyboard-base-unit) * 0.04);
`;

const Keyboard__key__number = css`
    --keyboard-key-height: calc(var(--keyboard-base-unit) * 0.45);
`;

const Keyboard__row__row1 = css``;

const Keyboard__row__row2 = css``;

const Keyboard__row__row3 = css``;

const Keyboard__key__shift = css`
    --keyboard-key-width: calc(var(--keyboard-base-unit) * 0.45);
`;

const Keyboard__key__backspace = css`
    --keyboard-key-width: calc(var(--keyboard-base-unit) * 0.45);
`;

export default function Keyboard(props: KeyboardProps) {
    const numberRow = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '0',
    ];

    const row1 = [
        'q',
        'w',
        'e',
        'r',
        't',
        'y',
        'u',
        'i',
        'o',
        'p',
    ];

    const row2 = [
        'a',
        's',
        'd',
        'f',
        'g',
        'h',
        'j',
        'k',
        'l',
    ];

    const row3 = [
        'z',
        'x',
        'c',
        'v',
        'b',
        'n',
        'm',
    ];

    const renderNumberRow = () => {
        return (
            <KeyboardRow className={cx(Keyboard__row__number)}>
                {
                    numberRow.map(key => (
                        <KeyboardKey className={cx(Keyboard__key__number)}>
                            {key}
                        </KeyboardKey>
                    ))
                }
            </KeyboardRow>
        )
    };

    const renderRow1 = () => {
        return (
            <KeyboardRow className={cx(Keyboard__row__row1)}>
                {
                    row1.map(key => (
                        <KeyboardKey>
                            {key}
                        </KeyboardKey>
                    ))
                }
            </KeyboardRow>
        )
    };

    const renderRow2 = () => {
        return (
            <KeyboardRow className={cx(Keyboard__row__row2)}>
                {
                    row2.map(key => (
                        <KeyboardKey>
                            {key}
                        </KeyboardKey>
                    ))
                }
            </KeyboardRow>
        )
    };

    const renderRow3 = () => {
        return (
            <KeyboardRow className={cx(Keyboard__row__row3)}>
                <KeyboardKey className={cx(Keyboard__key__shift)}>↑</KeyboardKey>

                {
                    row3.map(key => (
                        <KeyboardKey>
                            {key}
                        </KeyboardKey>
                    ))
                }

                <KeyboardKey className={cx(Keyboard__key__backspace)}>←</KeyboardKey>
            </KeyboardRow>
        )
    };

    return (
        <>
            <KeyboardBox>
                {renderNumberRow()}
                {renderRow1()}
                {renderRow2()}
                {renderRow3()}

                <KeyboardRow>
                    <KeyboardKey style={{ width: '60%', minWidth: '60%', maxWidth: '60%', }}>
                    </KeyboardKey>
                </KeyboardRow>
            </KeyboardBox>
        </>
    )
}
