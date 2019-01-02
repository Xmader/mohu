/**
 * 检查更新
 * @author Xmader
 * @copyright Copyright (c) 2018-2019 Xmader
 */

const fetch = require("../libs/node-fetch")
const path = require("path")
const { dialog, shell, app } = require("electron")

const platform = process.platform
let arch = process.arch
if (arch == "x32") arch = "ia32"

const versionCheckApi = "https://raw.githubusercontent.com/Xmader/mohu/master/app/package.json"
const getReleasesApi = "https://api.github.com/repos/Xmader/mohu/releases/latest"

/**
 * @param {string} version
 * @param {string} new_version
 */
const found_new_version = (version, new_version) => {
    shell.beep() // 播放提示音
    dialog.showMessageBox({
        type: "question",
        buttons: ["下载", "取消"],
        defaultId: 0,
        cancelId: 1,
        title: "发现新版本!",
        message: "是否要下载新版本?",
        detail: `当前版本: v${version} ,\n新版本: v${new_version} `,
        icon: path.join(__dirname, "../assets/logo.png"),
    }, (response) => {
        if (response == 0) {
            const DownloadUrl = `https://github.com/Xmader/mohu/releases/download/v${new_version}/MohuAPP-${platform}-${arch}.zip`
            shell.openExternal(DownloadUrl)
        }
    })
}

/**
 * 检查更新
 */
const check_update = async (manual = false) => {
    const req = await fetch(versionCheckApi)
    const data = await req.json()

    const version = app.getVersion() // 当前版本号, 在package.json中定义
    const version_formatted = format_version(version)

    const new_version = data["version"]
    const new_version_formatted = format_version(new_version)

    if (version_formatted < new_version_formatted) {
        try {
            const releases = await (await fetch(getReleasesApi)).json()
            if (releases.name != `v${new_version}` || releases.assets.length != 4) {
                return manual && dialog.showMessageBox({
                    type: "warning",
                    buttons: ["重试", "取消"],
                    defaultId: 0,
                    cancelId: 1,
                    title: "膜乎APP",
                    message: `已发现新版本, 但最新版本 v${new_version} 正在构建中, 请耐心等候...`
                }, (response) => {
                    if (response == 0) {
                        check_update(true)
                    }
                })
            }
        }
        catch (e) {
            console.error("访问GithubAPI失败")
        }

        found_new_version(version, new_version)
    } else if (manual) {
        dialog.showMessageBox({
            type: "warning",
            buttons: ["确定"],
            defaultId: 0,
            cancelId: 1,
            title: "没有更新的版本",
            message: `当前版本 v${version} 是最新版本!`
        })
    }
}

/**
 * @param {string} e - 需要被格式化的版本号字符串
 */
const format_version = (e) => {
    return e.split(".").map((e) => +e)
}

module.exports = check_update

