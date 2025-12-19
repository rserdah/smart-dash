import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

// __filename is the path to this file
const __filename = fileURLToPath(import.meta.url);

// __dirname is the folder this file is in
const __dirname = path.dirname(__filename);

function createWindow() {
    const win = new BrowserWindow({
        width: 1000,
        height: 800,
        /* frame: false,  */ /* Hide Windows window frame */
        webPreferences: {
            preload: path.join(__dirname, 'preload.ts')
        }
    });

    // Removes application top menu (also prevents shortcuts, though)
    // win.removeMenu();

    if (process.env.NODE_ENV === 'development') {
        win.loadURL('http://localhost:5173/');
    } else {
        win.loadFile(path.join(__dirname, '../dist/index.html'));
    }
}

app.whenReady().then(createWindow);
