const { BrowserWindow, Menu } = require("electron")

//给文本框增加右键菜单
const contextMenuTemplate = [
    {
        label: "转到上一页",
        id: "context_goBack",
        enabled: false,
        click: () => {
            BrowserWindow.getFocusedWindow().webContents.goBack()
        }
    },
    {
        label: "转到下一页",
        id: "context_goForward",
        enabled: false,
        click: () => {
            BrowserWindow.getFocusedWindow().webContents.goForward()
        }
    },
    { type: "separator" }, //分隔线 
    { label: "剪切", role: "cut" }, //Cut菜单项 
    { label: "复制", role: "copy" }, //Copy菜单项 
    { label: "粘贴", role: "paste" }, //Paste菜单项 
    { label: "删除", role: "delete" }, //Delete菜单项 
    { type: "separator" }, //分隔线 
    { label: "全选", role: "selectall" } //Select All菜单项 
]

const contextMenu = Menu.buildFromTemplate(contextMenuTemplate)
const manualPageContextMenu = Menu.buildFromTemplate(contextMenuTemplate.slice(3))

module.exports = {
    contextMenu,
    manualPageContextMenu
}