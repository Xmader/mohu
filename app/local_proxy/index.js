const fs = require("fs")
const path = require("path")
const socks = require("wikipedia-proxy")

const HOSTS_FILE = path.join(__dirname, "hosts.json")

let hosts = []
/*
  hosts 的结构是这样的：
  [
    {
      regex: false,         // 是否为正则表达式
      src: 'localhost',     // 源    域名 / IP
      dst: '127.0.0.1'      // 目的  域名 / IP
    },

    // 这个例子将 www.mydomain.com 指向 www.google.com
    {
      regex: false,
      src: 'www.mydomain.com',
      dst: 'www.google.com'
    },

    // 这个例子屏蔽站长统计
    {
      regex: true,          // 正则表达式
      src: '(.*\\.|)cnzz\\.com',
      dst: '0.0.0.0'
    }
  ]
*/

const loadHosts = function (filename) {
    const text = fs.readFileSync(filename).toString().trim()
    if (!text.length)
        return
    hosts = JSON.parse(text)
}

// 当 hosts.json 发生改变时重新载入
fs.watch(HOSTS_FILE, function () {
    loadHosts(HOSTS_FILE)
})

loadHosts(HOSTS_FILE)

const random = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// 在 localhost 上运行一个 socks5 server
exports.run = function (cb) {
    const host = "localhost"
    const port = random(20000, 30000) // 从这个范围内随机选一个端口

    const server = socks.run({
        protocol: "socks5",
        host,
        port,
        silent: true,
        hostsConfig: hosts
    })

    server.on("error", (err) => {
        cb(err)
    })

    server.once("listening", () => {
        cb(null, host + ":" + port)
    })
}
