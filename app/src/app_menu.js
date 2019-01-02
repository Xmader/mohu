const { BrowserWindow, Menu, shell } = require("electron")
const path = require("path")

const check_update = require("./check_update")
const copy_current_url = require("./copy_current_url")

const getMainWindow = () => {
    return BrowserWindow.fromId(2)
}

const openClockWin = (t) => {
    const clock_win = new BrowserWindow({
        title: t == "violent" ? "暴力续命" : "续命时钟",
        icon: path.join(__dirname, "../", "assets", "logo.png"),
        width: 600,
        height: t == "violent" ? 130 : 175,
        resizable: false,
        maximizable: false,
        alwaysOnTop: true,
        useContentSize: true
    })
    clock_win.setMenu(null)
    clock_win.loadURL(`file://${__dirname}/../pages/clock/clock.html${t == "violent" ? "?violent=true" : ""}`)
}

const openManual = (ty) => {
    const manual_win = new BrowserWindow({
        width: 1100,
        height: 740,
        icon: path.join(__dirname, "../", "assets", ty == "mogicians" ? "mogicians_manual.png" : "rubao_manual.jpg"),
        title: `${ty == "mogicians" ? "膜法" : "乳包"}指南`,
        webPreferences: {
            // webSecurity: false,  // 禁用同源策略
            preload: path.join(__dirname, "../", "pre.js")
        }
    })
    manual_win.setMenu(null)
    manual_win.loadURL(ty == "mogicians" ? "https://mogicians-manual.github.io/" : "https://ru-bao.github.io/rubao_manual/")

}

const loadURL = (url) => {
    getMainWindow().webContents.loadURL(url)
}

const menuTemplate = [
    {
        label: "页面",

        submenu: [
            {
                label: "转到上一页",
                id: "goBack",
                accelerator: "Ctrl+Left",
                enabled: false,
                click: () => {
                    BrowserWindow.getFocusedWindow().webContents.goBack()
                }
            },
            {
                label: "转到下一页",
                id: "goForward",
                accelerator: "Ctrl+Right",
                enabled: false,
                click() {
                    BrowserWindow.getFocusedWindow().webContents.goForward()
                }
            },
            {
                label: "刷新",

                accelerator: "F5",
                click() {
                    BrowserWindow.getFocusedWindow().webContents.reload()
                }
            },
            { type: "separator" },//分割线
            {
                label: "放大页面",
                role: "zoomin",
                accelerator: "Ctrl+=",
            },
            {
                label: "重置缩放级别",
                role: "resetzoom"
            },
            {
                label: "缩小页面",
                role: "zoomout"
            },
        ]
    },
    {
        label: "进入",

        submenu: [
            {
                label: "膜乎备份",
                click() {
                    loadURL("https://mohubackup.github.io/")
                }
            },
            // {
            //     label: "辱乎",
            //     click() { loadURL("https://ruhu.eu-gb.mybluemix.net/") }
            // },
            // {
            //     label: "品葱备份",
            //     click() { loadURL("https://pincong.rocks/topic/品葱备份") }
            // },
            {
                label: "新品葱",
                click() { loadURL("https://pincong.rocks/") }
            },
            {
                label: "中文维基百科",
                click: () => { loadURL("https://zh.wikipedia.org/") }
            },
            {
                label: "reddit",
                click: () => { loadURL("https://www.reddit.com/") }
            },
            {
                label: "端点星计划 (备份微信、微博等平台被删文章)",
                click() { loadURL("https://terminus2049.github.io/") }
            },
            {
                label: "第三新S1市",
                click() { loadURL("https://www.reddit.com/r/saraba1st/.compact") }
            },
            {
                label: "续命",
                submenu: [
                    {
                        label: "续命时钟",
                        click() { openClockWin() }
                    },
                    {
                        label: "暴力续命",
                        click() { openClockWin("violent") }
                    },
                ]
            },
            {
                label: "膜法指南",
                click() { openManual("mogicians") }
            },
            {
                label: "乳包指南",
                click() { openManual("rubao") }
            },
            {
                label: "小游戏",

                submenu: [
                    {
                        label: "Flappy Winnie",

                        click() {
                            loadURL(`file://${__dirname}/../pages/flappy_winnie/index.html`)
                        }
                    },
                    {
                        label: "切包子",

                        click() {
                            loadURL(`file://${__dirname}/../pages/bao/index.html`)
                        }
                    },
                    {
                        label: "Flappy Frog",

                        click() {
                            loadURL(`file://${__dirname}/../pages/flappy_frog/index.html`)
                        }
                    },
                ]
            }]
    },
    {
        label: "续命时钟",
        click() { openClockWin() }
    },
    {
        label: "膜法指南",
        click() { openManual("mogicians") }
    },
    {
        label: "乳包指南",
        click() { openManual("rubao") }
    },
    {
        label: "视图",
        submenu: [
            {
                label: "全屏",
                accelerator: "F11",
                click() {
                    BrowserWindow.getFocusedWindow().setFullScreen(!getMainWindow().isFullScreen())
                }
            },
            {
                label: "切换开发者工具",
                accelerator: "F12",
                click() { BrowserWindow.getFocusedWindow().webContents.toggleDevTools() }
            },
        ]
    },
    {
        label: "分享",

        submenu: [
            {
                label: "复制当前网址",
                click() {
                    copy_current_url()
                }
            },

        ]
    },
    {
        label: "高级",
        submenu: [
            {
                label: "检查更新",
                click() { check_update(true) }
            },
            {
                label: "关于",
                click() { shell.openExternal("https://github.com/Xmader/mohu") }
            },
        ]
    },
]

const menu = Menu.buildFromTemplate(menuTemplate)

module.exports = { menu }
