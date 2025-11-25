import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AppThemeProvider } from './theme/themeContext'

const root = document.getElementById('root');

if (!root) {
    throw new Error('Root element with id \'root\' not found');
}

ReactDOM.createRoot(root!).render(
    <AppThemeProvider>
        <App />
    </AppThemeProvider>
);
