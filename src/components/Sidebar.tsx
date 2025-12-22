/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { Theme } from '@/theme/types';
import { baseTheme, themes, ThemeName } from '../theme/index';
import { useThemeContext } from '../theme/themeContext';

interface SidebarProps {
}

const SidebarBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 15px 0px;
    margin: 0px;
    width: 50px;
    border: 1px solid white;
    border-radius: 999px;
    color: white;
    backdrop-filter: blur(2px) saturate(0.95);
`;

const SidebarIconBtn = styled.span`
    --sidebar-link-size: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
    min-width: var(--sidebar-link-size);
    width: var(--sidebar-link-size);
    max-width: var(--sidebar-link-size);
    min-height: var(--sidebar-link-size);
    height: var(--sidebar-link-size);
    max-height: var(--sidebar-link-size);
    font-size: 28px;
    border-radius: 999px;
    background: transparent;
    color: white;

    &:hover {
        background: #ffffff2f;
    }
`;

export default function Sidebar(props: SidebarProps) {
    return (
        <nav>
            <SidebarBox>
                <NavLink to='/'><SidebarIconBtn className='material-symbols-outlined'>search</SidebarIconBtn></NavLink>
                <NavLink to='/'><SidebarIconBtn className='material-symbols-outlined'>home</SidebarIconBtn></NavLink>
                <NavLink to='/'><SidebarIconBtn className='material-symbols-outlined'>apps</SidebarIconBtn></NavLink>
                <NavLink to='/settings'><SidebarIconBtn className='material-symbols-outlined'>settings</SidebarIconBtn></NavLink>
            </SidebarBox>
        </nav>
    )
}
