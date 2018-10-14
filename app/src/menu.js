const { BrowserWindow } = require("electron")

const { contextMenu, manualPageContextMenu } = require("./context_menu")
const { menu } = require("./app_menu")

const refresh_menu = () => {
    const mainWindow = BrowserWindow.fromId(2)
    menu.getMenuItemById("goBack").enabled = mainWindow.webContents.canGoBack()
    menu.getMenuItemById("goForward").enabled = mainWindow.webContents.canGoForward()
    contextMenu.getMenuItemById("context_goBack").enabled = mainWindow.webContents.canGoBack()
    contextMenu.getMenuItemById("context_goForward").enabled = mainWindow.webContents.canGoForward()
}

const showContextMenu = (event, is_manual_page) => {
    const context_menu = is_manual_page ? manualPageContextMenu : contextMenu
    refresh_menu()
    context_menu.popup({})
}

module.exports = {
    menu,
    refresh_menu,
    showContextMenu
}