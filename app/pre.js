/**
 * pre.js - 用于外部页面的预加载脚本
 * @author Xmader
 * @copyright Copyright (c) 2018 Xmader
 */

const { ipcRenderer } = require("electron")
const protocol = location.protocol

// 判断是否是外部页面
if (protocol == "http" || protocol == "https") {
    // 添加右键菜单
    window.addEventListener("contextmenu", (e) => {
        e.preventDefault()
        ipcRenderer.send("right_btn")
    })
}