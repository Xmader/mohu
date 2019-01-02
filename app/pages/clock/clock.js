/**
 * 续命时钟
 * @author Xmader
 * @copyright Copyright (c) 2018-2019 Xmader
 */

const now = new Date()

const add_0 = (i) => {
    if (i < 10) { i = "0" + i }
    return i
}

const update_clock = () => {
    const y = add_0(now.getFullYear())
    const mo = add_0(now.getMonth())
    const d = add_0(now.getDate())

    const h = add_0(now.getHours())
    const m = add_0(now.getMinutes())
    const s = add_0(now.getSeconds())

    if (s == 58) {
        now.setTime(now.getTime() + 1000)
        increase_time()
    }
    document.getElementById("clock").innerHTML = y + "-" + mo + "-" + d + " " + h + ":" + m + ":" + s

    now.setTime(now.getTime() + 1000) // 单位: 毫秒
}

update_clock()
setInterval(update_clock, 60000 / 59)
setInterval(increase_time, 1000, true)
