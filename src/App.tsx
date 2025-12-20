/** @jsxImportSource @emotion/react */
import { PropsWithChildren } from 'react';
import { MemoryRouter, Routes, Route, NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import Header from './components/Header';
import Home from './pages/Home';

interface AppProps extends PropsWithChildren {
}

// IMPORTANT! styled.element variables CANNOT be defined inside the functional component or else they will unmount every time the functional component re-renders
const AppBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    font-family: "Onest", sans-serif;
    font-optical-sizing: auto;
    font-weight: 500;
    font-style: normal;
    /* background: radial-gradient(hsl(from var(--primary-color) h calc(s * 0.5) calc(l * 0.25)), var(--background-color)); */
    background: var(--background-color);
    transition: background-color 0.25s ease;
`;

const AppCenterBox = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 20px;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const AppLowerBox = styled.div`
    padding: 0px 10px;
    max-height: 250px;
    
    transition: max-height 0.5s ease;
`;

export default function App(props: AppProps) {
    return (
        <MemoryRouter>
            <AppBox>
                <Header />
                
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/settings' element={<>test</>} />
                </Routes>
            </AppBox>
        </MemoryRouter>
    )
}
