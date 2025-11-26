/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface HeaderProps {
}

const AppHeader = styled.div`padding: 10px;`;
const AppTitle = styled.h1`margin: 0px; font-family: "Onest", sans-serif; font-optical-sizing: auto; font-weight: 400; font-style: normal; color: white;`;

export default function Header(props: HeaderProps) {
    return (
        <AppHeader>
            <AppTitle>
                <span css={css({ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px', minWidth: '48px', minHeight: '48px', width: '48px', height: '48px', maxWidth: '48px', maxHeight: '48px', borderRadius: '999px', background: 'purple' })}>
                    <span css={css({ marginBottom: '5px', transition: 'all 0.1s linear', scale: 1, filter: 'contrast(0) brightness(0) blur(0.15px)' })}>☺</span>
                </span>
                Dashboard App
            </AppTitle>
        </AppHeader>
    )
}
