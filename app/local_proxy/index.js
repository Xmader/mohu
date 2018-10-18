const fs = require("fs")
const path = require("path")
const socks = require("socksv5")
const zhwp_proxy = require("wikipedia-proxy")

const HOSTS_FILE = path.join(__dirname, "hosts.json")

let zhwp_proxy_port
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
fs.watch(HOSTS_FILE, function (curr, prev) {
    loadHosts(HOSTS_FILE)
})

loadHosts(HOSTS_FILE)

const lookupHost = function (src) {
    const a = hosts.reverse().find(
        x => (x.regex && src.match(x.src)) || (src == x.src)
    )
    return a && a.dst
}

// 创建 socks5 server
const createServer = function () {
    const server = socks.createServer(function (info, accept, deny) {
        const newAddr = lookupHost(info.dstAddr)
        if (newAddr) {
            info.dstAddr = newAddr
        }
        else if (info.dstAddr == "zh.wikipedia.org" || info.dstAddr.includes("www.reddit.com")) {
            info.dstAddr = "127.0.0.1"
            info.dstPort = zhwp_proxy_port
        }
        accept()
    })
    server.useAuth(socks.auth.None())
    return server
}

const random = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// 在 localhost 上运行一个 socks5 server
exports.run = function (cb) {
    const host = "localhost"
    const port = random(20000, 30000) // 从这个范围内随机选一个端口
    zhwp_proxy_port = port + 1

    const server = createServer()

    server.listen(port, host, function () {
        cb(null, host + ":" + port)
    })

    server.on("error", function (err) {
        cb(err)
    })

    zhwp_proxy.run({
        port: zhwp_proxy_port,
        host,
        protocol: "https",
        silent: true
    })
}
