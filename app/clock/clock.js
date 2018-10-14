var now = new Date()

const add_0 = (i) => {
    if (i < 10) { i = "0" + i }
    return i
}

const update_clock = () => {
    var y = add_0(now.getFullYear())
    var mo = add_0(now.getMonth())
    var d = add_0(now.getDate())

    var h = add_0(now.getHours())
    var m = add_0(now.getMinutes())
    var s = add_0(now.getSeconds())

    if (s == 58) {
        now.setTime(now.getTime() + 1000)
        increase_time()
    }
    document.getElementById('clock').innerHTML = y + "-" + mo + "-" + d + " " + h + ":" + m + ":" + s

    now.setTime(now.getTime() + 1000) // 单位: 毫秒
}

update_clock()
setInterval(update_clock, 60000 / 59)
