const { dialog, shell, BrowserWindow, clipboard } = require('electron')

module.exports = () => {
    url = BrowserWindow.getFocusedWindow().webContents.getURL()

    clipboard.writeText(url)

    dialog.showMessageBox({
        type: "info",
        buttons: ["确定"],
        defaultId: 0,
        title: `复制成功`,
        message: `已复制 '${url}' 到剪贴板`,
    })
}