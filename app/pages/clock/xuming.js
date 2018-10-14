/**
 * @author Xmader
 * @copyright Copyright (c) 2018 Xmader
 */

/**
 * 格式化已续命时间
 * @param {number} t - 已续命时间 (单位:秒)
 * 
 * 代码来自: https://angry.im/
 */
const formatTime = (t) => {
    if (t == 0) return "0s"
    let ret = ""
    if (t > 60 * 60 * 24 * 30 * 12) {
        ret += Math.floor(t / (60 * 60 * 24 * 30 * 12)) + "y "
        t = t % (60 * 60 * 24 * 30 * 12)
    }

    if (t > 60 * 60 * 24 * 30) {
        ret += Math.floor(t / (60 * 60 * 24 * 30)) + "mo "
        t = t % (60 * 60 * 24 * 30)
    }

    if (t > 60 * 60 * 24) {
        ret += Math.floor(t / (60 * 60 * 24)) + "d "
        t = t % (60 * 60 * 24)
    }

    if (t > 60 * 60) {
        ret += Math.floor(t / (60 * 60)) + "h "
        t = t % (60 * 60)
    }

    if (t > 60) {
        ret += Math.floor(t / (60)) + "m "
        t = t % (60)
    }

    if (t > 0) {
        ret += Math.floor(t) + "s"
        t = 0
    }

    return ret.trim()
}

/**
 * 续命1s，并获取已续命时间 (单位:秒)
 * @param {boolean} get_only - 是否只获取已续命时间，不续命1s
 * @see 续命API: https://angry.im/
 */
const increase_time = async (get_only = false) => {
    try {
        const res = get_only ? await fetch("https://angry.im/l/life", {
            method: "GET",
            mode: "cors"
        }) : await fetch("https://angry.im/p/life", {
            method: "POST",
            mode: "cors"
        })
        const time = await res.text() | 0
        document.getElementById("time").innerText = formatTime(time)
    }
    catch (e) {
        console.error(e)
        console.error("你们这样子啊, 是不行的!")
    }
}
