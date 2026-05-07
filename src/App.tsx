/** @jsxImportSource @emotion/react */
import { PropsWithChildren } from 'react';
import { MemoryRouter, Routes, Route, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import styled from '@emotion/styled';
import Home from './pages/Home';
import AppsPage from './pages/AppsPage';
import Settings from './pages/Settings';
import Sidebar from './components/Sidebar';
import DevicesPage from './pages/DevicesPage/DevicesPage';
import RoomsPage from './pages/Rooms/RoomsPage';
import RoomPage from './pages/Rooms/RoomPage';
import { UrlListener } from './components/UrlListener';

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
    background: var(--background-color);
    /* Allows the home screen background to be on top of the background color if present, but when the image is not present, the background color is correctly visible */
    isolation: isolate;
    transition: background-color 0.25s ease;
`;

const SidePanelBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 10%;
`;

const queryClient = new QueryClient();

export default function App(props: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <MemoryRouter initialEntries={['/dashboard/1']}>
                <AppBox>
                    <SidePanelBox>
                        <Sidebar />
                    </SidePanelBox>

                    <Routes>
                        {/* Dedicated component for listening for changes in URL (must be underneath the Routes component or else useParams in it won't work) */}
                        {/* Used to sync the roomId from URL with the React Query roomId and possibly other things in the future */}
                        {/* Outlet renders the currently active child route */}
                        <Route element={<><UrlListener /><Outlet /></>}>
                            <Route path='/dashboard/:roomId' element={<Home />} />
                        </Route>
                        <Route path='/apps' element={<AppsPage />} />
                        <Route path='/rooms' element={<RoomsPage />} />
                        <Route path='/rooms/:id' element={<RoomPage />} />
                        <Route path='/devices' element={<DevicesPage />} />
                        <Route path='/settings' element={<Settings />} />
                    </Routes>

                    <SidePanelBox />
                </AppBox>
            </MemoryRouter>
        </QueryClientProvider>
    )
}
