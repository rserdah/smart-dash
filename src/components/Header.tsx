/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface HeaderProps {
}

const AppHeader = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    height: 75px;
    min-height: 75px;
    max-height: 75px;
    background: var(--container-background-color);
`;

const AppTitle = styled.h1`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0px;
    font-family: "Onest", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    color: white;
`;

const FlexRow = styled.div<{ $gap?: number }>`
    display: flex;
    flex-direction: row;
    gap: ${p => p.$gap ?? 5}px;
`;

const NavButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    min-width: 32px;
    max-width: 32px;
    height: 32px;
    min-height: 32px;
    max-height: 32px;
    font-size: 28px;
    border: none;
    border-radius: 999px;
    background: #0084ffff;
    color: white;
    cursor: pointer;

    &:hover {
        background: #006cd1ff;
    }
`;

export default function Header(props: HeaderProps) {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <AppHeader>
            <AppTitle>
                <span css={css({ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px', minWidth: '48px', minHeight: '48px', width: '48px', height: '48px', maxWidth: '48px', maxHeight: '48px', borderRadius: '999px', background: 'purple' })}>
                    <span css={css({ marginBottom: '5px', transition: 'all 0.1s linear', scale: 1, filter: 'contrast(0) brightness(0) blur(0.15px)' })}>☺</span>
                </span>

                <FlexRow>
                    <NavButton onClick={() => navigate(-1)}>
                        <span className='material-symbols-outlined' css={css`font-variation-settings: 'FILL' 0, 'wght' 600, 'GRAD' 0, 'opsz' 24;`}>arrow_back</span>
                    </NavButton>
                    <NavButton onClick={() => navigate(1)}>
                        <span className='material-symbols-outlined' css={css`font-variation-settings: 'FILL' 0, 'wght' 600, 'GRAD' 0, 'opsz' 24;`}>arrow_forward</span>
                    </NavButton>
                </FlexRow>

                Dashboard App
            </AppTitle>
        </AppHeader>
    )
}
