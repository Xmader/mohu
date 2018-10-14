/**
 * copy_current_url.js - 复制当前URL到剪贴板
 * @author Xmader
 * @copyright Copyright (c) 2018 Xmader
 */

const { dialog, BrowserWindow, clipboard } = require("electron")

module.exports = () => {
    const url = BrowserWindow.getFocusedWindow().webContents.getURL()

    clipboard.writeText(url)

    dialog.showMessageBox({
        type: "info",
        buttons: ["确定"],
        defaultId: 0,
        title: "复制成功",
        message: `已复制 '${url}' 到剪贴板`,
    })
}