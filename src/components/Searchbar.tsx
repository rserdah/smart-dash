/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { Theme } from '@/theme/types';
import { baseTheme, themes, ThemeName } from '../theme/index';
import { useThemeContext } from '../theme/themeContext';
import MaterialIcon from './MaterialIcon';
import { useOffclick } from '@/hooks/useOffclick';
import { HideScrollbar } from '@/styles/GlobalStyles';

interface SearchbarProps {
    onChat: (message: string) => void;
}

const SearchbarRelativeBox = styled.div`
    label: SearchbarRelativeBox;
    --searchbar-box-closed-height: 4rem;
    min-height: var(--searchbar-box-closed-height);
    height: var(--searchbar-box-closed-height);
    max-height: var(--searchbar-box-closed-height);
    z-index: 99;
`;

const SearchbarWrapper = styled.div<{ $open: boolean }>`
    label: SearchbarWrapper;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex: 1;
    /* gap: 1rem; */
    /* padding: 1rem; */
    width: 100%;
    border: 1px solid white;
    border-radius: calc(var(--searchbar-box-closed-height) / 2);
    background: #69696910;
    color: var(--text-color-inverted);
    backdrop-filter: blur(10px) saturate(0.9);
    overflow: hidden;

    &:has(input:focus) {
        border-color: red;
    }

    ${p => p.$open ?
        `
            height: max-content;
            /* max-height: ; */
        ` :
        `
            height: 100%;
        `
    }
`;

const SearchbarBox = styled.div`
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    align-self: start;
    flex: 1;
    gap: 10px;
    padding: 10px;
    width: 100%;
    height: 4rem;
    min-height: 0px;
    color: var(--text-color-inverted);
    overflow: hidden;

    &:has(input:focus) {
        border-color: red;
    }
`;

const SearchbarInput = styled.input`
    flex: 1;
    font-size: 1.6rem;
    background: transparent;
    color: var(--text-color-inverted);
    border: none;
    outline: none;
`;

const SearchbarSendButton = styled.button`
    --button-size: 2.8rem;
    appearance: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    min-width: var(--button-size);
    width: var(--button-size);
    max-width: var(--button-size);
    min-height: var(--button-size);
    height: var(--button-size);
    max-height: var(--button-size);
    border: none;
    border-radius: 999rem;
    background: #116EFF;
`;

const SearchbarResults = styled.div`
    display: flex;
    flex-direction: column;
    border-top: 1px solid white;
    max-height: 35rem;
    color: var(--text-color-inverted);

    transition: max-height 0.25s ease;
    overflow: auto;

    ${HideScrollbar}

    @starting-style {
        max-height: 0px;
    }
`;

const SearchResult = styled.button`
    appearance: none;
    display: flex;
    flex-direction: row;
    padding: 1rem;
    border: none;
    background: none;
    color: var(--text-color-inverted);
    opacity: 1;

    transition: opacity 1s ease;

    @starting-style {
        opacity: 0;
    }

    &:hover {
        background: #00000040;
    }
`;

export default function Searchbar({ onChat }: SearchbarProps) {
    const [open, setOpen] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const searchbarRelativeBoxRef = useRef<HTMLDivElement | null>(null);

    useOffclick({
        ref: searchbarRelativeBoxRef,
        callback: () => setOpen(false),
    });

    return (
        <SearchbarRelativeBox ref={searchbarRelativeBoxRef}>
            <SearchbarWrapper $open={open}>
                <SearchbarBox>
                    {({ 'error': <span>ERR</span>, 'submitted': <span>DONE</span>, 'streaming': <span>...</span>, 'ready': <MaterialIcon icon='search' /> })[status as string]}

                    <form onSubmit={async e => { e.preventDefault(); if(searchValue.length === 0) { return; } const value = searchValue; setSearchValue(''); onChat(value); }} css={css`flex: 1; display: flex;`}>
                        <SearchbarInput placeholder='Search' value={searchValue} onFocus={e => setOpen(true)} onBlur={e => setOpen(false)} onChange={e => setSearchValue(e.target.value)} type='text' />

                        <SearchbarSendButton type='submit'>
                            <MaterialIcon icon='send' wght={300} addCssGetter={() => css`font-size: 2rem; margin-left: 0.25rem; color: white;`} />
                        </SearchbarSendButton>
                    </form>
                </SearchbarBox>

                {open && searchValue.length > 0 && <SearchbarResults>
                    {searchValue.length > 0 && <SearchResult>
                        {`AI Chat: '${searchValue}'`}
                    </SearchResult>}
                </SearchbarResults>}
            </SearchbarWrapper>
        </SearchbarRelativeBox>
    )
}
