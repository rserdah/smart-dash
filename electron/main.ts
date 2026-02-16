import { app, BrowserWindow, globalShortcut } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

// __filename is the path to this file
const __filename = fileURLToPath(import.meta.url);

// __dirname is the folder this file is in
const __dirname = path.dirname(__filename);

const useSemiKiosk = false;

function createWindow() {
    const win = new BrowserWindow({
        width: 1128,
        height: 800,
        frame: !useSemiKiosk, /* Hide Windows window frame */
        fullscreen: useSemiKiosk,
        kiosk: false,
        autoHideMenuBar: useSemiKiosk,
        webPreferences: {
            preload: path.join(__dirname, 'preload.ts'),
            contextIsolation: useSemiKiosk,
        },
    });

    // Removes application top menu (also prevents shortcuts, though)
    // win.removeMenu();

    if (process.env.NODE_ENV === 'development') {
        win.loadURL('http://localhost:5173/');
    } else {
        win.loadFile(path.join(__dirname, '../dist/index.html'));
    }

    if(useSemiKiosk) {
        globalShortcut.register('Ctrl+Alt+F', () => {
            win.setFullScreen(!win.isFullScreen());
        });

        globalShortcut.register('Ctrl+Shift+Q', () => {
            app.quit();
        });
    }
}

app.whenReady().then(createWindow);
