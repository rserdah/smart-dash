import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppThemeProvider } from './theme/themeContext';
import App from './App';
import ModalProvider from './modals/ModalContext';
import GlobalStyles from './styles/GlobalStyles';

const root = document.getElementById('root');

if (!root) {
    throw new Error('Root element with id \'root\' not found');
}

ReactDOM.createRoot(root!).render(
    <React.StrictMode>
        <AppThemeProvider>
            <GlobalStyles />

            <ModalProvider>
                <App />
            </ModalProvider>
        </AppThemeProvider>
    </React.StrictMode>
);
