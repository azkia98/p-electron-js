import { BrowserWindow, app } from 'electron';
import windowStateKeeper from 'electron-window-state';
require('electron-reload')(__dirname);

app.on('ready', () => {

    let mainWindowState = windowStateKeeper({
        defaultWidth: 900,
        defaultHeight: 600,

    });

    let win = new BrowserWindow({
        width: mainWindowState.width,
        height: mainWindowState.height,
        x: mainWindowState.x,
        y: mainWindowState.y,
        show:false
    });

    let splashWin=new BrowserWindow({
        width:500,
        height:400,
        frame:false
    });


    let mainContent=win.webContents;

    mainContent.on('new-window',(event,url)=>{
        event.preventDefault();
        let w=new BrowserWindow({width:800,height:600,show:false});
        w.once('ready-to-show',()=>w.show());
        w.loadURL(url);
        event.newGuest=w;

    })


    


    win.on('closed',()=>{
        app.quit();

    });

    splashWin.on('closed',()=>splashWin=null);
    win.on('ready-to-show',()=>{
        win.show();
        splashWin.destroy();
    });

    
    win.loadURL(`file://${__dirname}/index.html`);
    splashWin.loadURL(`file://${__dirname}/loading.html`);
    mainWindowState.manage(win);
});

