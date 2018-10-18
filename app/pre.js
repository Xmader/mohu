/**
 * pre.js - 用于外部页面的预加载脚本
 * @author Xmader
 * @copyright Copyright (c) 2018 Xmader
 */

const { ipcRenderer } = require("electron")
const protocol = location.protocol

// 判断是否是外部页面
if (protocol.startsWith("http")) {
    // 判断是否是膜法指南或乳包指南页面
    const is_manual_page = location.href.includes("manual") && location.host.includes("github.io")

    // 添加右键菜单
    window.addEventListener("contextmenu", (e) => {
        e.preventDefault()
        ipcRenderer.send("right_btn", is_manual_page)
    })
}

if (location.host.includes("zh.wikipedia.org")) { 
    document.addEventListener("DOMContentLoaded", () => {
        document.body.style.fontFamily = '"Helvetica Neue", "STHeiti", "微软雅黑", "Microsoft YaHei", Helvetica, Arial, sans-serif'
    }, { once: true })
}
