/**
 * Mohu APP
 * 膜乎免`番羽土啬`APP
 * 
 * @author Xmader
 * @copyright Copyright (c) 2018 Xmader
 * 
 * Source Code: https://github.com/Xmader/mohu
 */

const path = require("path")
const { app, BrowserWindow, ipcMain, Menu, dialog } = require("electron")

const localProxy = require("./local_proxy")
const check_update = require("./src/check_update")
const { menu, refresh_menu, showContextMenu } = require("./src/menu")

const isDev = process.argv.pop() == "dev"

let mainWindow = null, landingWindow = null

const createWindow = (proxyAddress) => {
    landingWindow = new BrowserWindow({
        show: false,
        frame: isDev,
        title: "膜乎APP",
        icon: path.join(__dirname, "assets", "logo.png"),
        width: 490,
        height: 400
    })

    landingWindow.once("show", () => {
        // Create the browser window.
        mainWindow = new BrowserWindow({
            width: 1100,
            height: 740,
            icon: path.join(__dirname, "assets", "logo.png"),
            title: "膜乎APP",
            show: false,
            webPreferences: {
                nodeIntegration: false, // 不集成 Nodejs
                // webSecurity: false,//禁用同源策略
                // allowRunningInsecureContent:true,//允许一个 https 页面运行 http url 里的资源
                preload: path.join(__dirname, "pre.js") // 但预加载的 js 文件内仍可以使用 Nodejs 的 API
            }
        })

        mainWindow.once("show", () => {
            landingWindow.hide()
            landingWindow.close()
            landingWindow.removeAllListeners()
            mainWindow.show()
            landingWindow = null
            check_update()
        })

        mainWindow.webContents.once("did-finish-load", () => {
            if (!mainWindow) {
                throw new Error("\"mainWindow\" is not defined")
            }
            mainWindow.show()
            mainWindow.focus()
        })

        mainWindow.webContents.on("did-navigate", () => {
            refresh_menu()
        })

        mainWindow.webContents.on("new-window", (event, url) => {
            event.preventDefault()
            mainWindow.webContents.loadURL(url)
        })

        mainWindow.on("closed", () => {
            mainWindow.removeAllListeners()
            mainWindow = null

            if (process.platform === "darwin") {
                app.exit(0)
            }
        })

        mainWindow.webContents.session.setProxy({
            proxyRules: "socks5://" + proxyAddress
        }, function () {
            mainWindow.loadURL("https://www.mohu.club/")
        })

        Menu.setApplicationMenu(menu)
    })

    landingWindow.loadURL(`file://${__dirname}/pages/landing.html`)
    landingWindow.once("ready-to-show", () => {
        landingWindow.show()
    })
}

app.commandLine.appendSwitch("ignore-certificate-errors") // 忽略证书相关错误, 因为中文维基百科本地反代服务器使用自签名证书

app.on("ready", () => {
    localProxy.run((error, proxyAddress) => {
        if (error) {
            dialog.showMessageBox({
                type: "error",
                buttons: ["确定"],
                defaultId: 0,
                title: "错误",
                message: `${error}`
            })
            app.exit(1)
        } else {
            createWindow(proxyAddress)
        }
    })
})

app.on("window-all-closed", () => {
    app.quit()
})

app.on("quit", () => {
    app.exit(0)
})

ipcMain.on("reload", () => {
    mainWindow.webContents.reloadIgnoringCache()
})

ipcMain.on("right_btn", showContextMenu)
