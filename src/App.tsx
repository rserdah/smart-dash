/** @jsxImportSource @emotion/react */
import { PropsWithChildren } from 'react';
import { MemoryRouter, Routes, Route, NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import Header from './components/Header';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Sidebar from './components/Sidebar';

interface AppProps extends PropsWithChildren {
}

// IMPORTANT! styled.element variables CANNOT be defined inside the functional component or else they will unmount every time the functional component re-renders
const AppBox = styled.div`
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 100vh;
    font-weight: 500;
    /* background: radial-gradient(hsl(from var(--primary-color) h calc(s * 0.5) calc(l * 0.25)), var(--background-color)); */
    /* background: var(--background-color); */
    transition: background-color 0.25s ease;
`;

const SidePanelBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 10%;
`;

export default function App(props: AppProps) {
    return (
        <MemoryRouter>
            <AppBox>
                {/* <Header /> */}

                <SidePanelBox>
                    <Sidebar />
                </SidePanelBox>

                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/settings' element={<Settings />} />
                </Routes>

                <SidePanelBox />
            </AppBox>
        </MemoryRouter>
    )
}
