import { BrowserWindow, app } from 'electron';
import windowStateKeeper from 'electron-window-state';


app.on('ready', () => {

    let mainWindowState = windowStateKeeper({
        defaultWidth: 900,
        defaultHeight: 600,

    });

    let splashWin=new BrowserWindow({
        width:500,
        height:400,
        frame:false
    });



    let win = new BrowserWindow({
        width: mainWindowState.width,
        height: mainWindowState.height,
        x: mainWindowState.x,
        y: mainWindowState.y,
        show:false
    });


    win.on('closed',()=>{
        app.quit();

    });

    splashWin.on('closed',()=>splashWin=null);

    win.on('ready-to-show',()=>{
        win.show();
        splashWin.close();
    });

    mainWindowState.manage(win);
    win.loadURL(`file://${__dirname}/index.html`);
    splashWin.loadURL(`file://${__dirname}/hello.html`);
});

