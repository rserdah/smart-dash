import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppThemeProvider } from './theme/themeContext';
import App from './App';

const root = document.getElementById('root');

if (!root) {
    throw new Error('Root element with id \'root\' not found');
}

ReactDOM.createRoot(root!).render(
    <React.StrictMode>
        <AppThemeProvider>
            <App />
        </AppThemeProvider>
    </React.StrictMode>
);
