/**
 * copy_current_url.js - 复制当前URL到剪贴板
 * @author Xmader
 * @copyright Copyright (c) 2018 Xmader
 */

const { dialog, BrowserWindow, clipboard } = require("electron")

module.exports = () => {
    const url = decodeURI(BrowserWindow.getFocusedWindow().webContents.getURL())

    clipboard.writeText(url)

    dialog.showMessageBox({
        type: "info",
        buttons: ["确定"],
        defaultId: 0,
        title: "复制成功",
        message: `已复制 '${
            new Array(Math.ceil(url.length / 50)).fill(null).map((x, i) => url.slice(i * 50, (i + 1) * 50)).join("\n") // 每50个字符换行，否则会显示不完整
        }' 到剪贴板`,
    })
}