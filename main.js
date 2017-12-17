import { BrowserWindow, app } from 'electron';
import windowStateKeeper from 'electron-window-state';


app.on('ready', () => {

    let mainWindowState = windowStateKeeper({
        defaultWidth: 900,
        defaultHeight: 600,

    });

    let win = new BrowserWindow({
        width: mainWindowState.width,
        height: mainWindowState.height,
        x: mainWindowState.x,
        y: mainWindowState.y
    });
    mainWindowState.manage(win);
    win.loadURL(`file://${__dirname}/index.html`)
});

