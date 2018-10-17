const fs = require("fs")
const path = require("path")
const socks = require("socksv5")

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

function loadHosts(filename) {
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

function lookupHost(src) {
    for (var i = hosts.length - 1; i >= 0; i--) {
        if (hosts[i].regex) {
            if (src.match(hosts[i].src))
                return hosts[i].dst
        } else {
            if (src == hosts[i].src)
                return hosts[i].dst
        }
    }
}


// 创建 socks5 server
function createServer() {
    const server = socks.createServer(function (info, accept, deny) {
        const newAddr = lookupHost(info.dstAddr)
        if (newAddr)
            info.dstAddr = newAddr
        accept()
    })
    server.useAuth(socks.auth.None())
    return server
}


function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// 在 localhost 上运行一个 socks5 server
exports.run = function (cb) {
    const host = "localhost"
    const port = random(20000, 30000) // 从这个范围内随机选一个端口

    const server = createServer()

    server.listen(port, host, function () {
        cb(null, host + ":" + port)
    })

    server.on("error", function (err) {
        cb(err)
    })
}
