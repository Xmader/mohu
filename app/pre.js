const { ipcRenderer,remote } = require('electron');
var mainWindow = remote.BrowserWindow.fromId(2)
var url = mainWindow.webContents.getURL()

if (url.indexOf("http") >= 0) {
    
    window.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        ipcRenderer.send('right_btn');
    });
}