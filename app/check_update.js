const process = require("process");
const get_json = require("./get_json")
const path = require('path');
const { dialog, shell, app } = require('electron')


var _platform = process.platform == "win32" ? "windows" : process.platform;
var platform = process.platform;
var arch = process.arch
arch = (arch == "arm") ? "armv7l" : arch
arch = (arch == "x32") ? "ia32" : arch

var version = app.getVersion()/*当前版本号, 在package.json中定义*/
// var versionCheckApi = "https://raw.githubusercontent.com/Xmader/mohu/master/resources/app/package.json"/*检查更新Api地址*/
var versionCheckApi = "https://mohu.oss-cn-shanghai.aliyuncs.com/package.json"
var DownloadUrl = `https://mohu.oss-cn-shanghai.aliyuncs.com/MohuAPP-${platform}-${arch}.zip`
var version_formatted = format_version(version)

var find_new_version = (new_version) => {
    dialog.showMessageBox({
        type: "question",
        buttons: ["下载", "取消"],
        defaultId: 0,
        cancelId: 1,
        title: `发现新版本!`,
        message: "是否要下载新版本?",
        detail: `当前版本: v${version} ,\n新版本: v${new_version} `,
        icon: path.join(__dirname, './logo.png'),
    }, (response, checkboxChecked) => {
        if (response == 0) {
            shell.openExternal(DownloadUrl)
        }
    })
}

var download_remote_version = function () {
    const url = versionCheckApi

    get_json(url, (data) => {
        var new_version = data["version"] // get_new_version
        var new_version_formatted = format_version(new_version)
        if (version_formatted < new_version_formatted) {
            find_new_version(new_version)
        }
    })
}

var manual_check_update = () => {
    get_json(versionCheckApi, (data) => {
        var new_version = data["version"] // get_new_version
        var new_version_formatted = format_version(new_version)
        if (version_formatted < new_version_formatted) {
            find_new_version(new_version)
        }
        else {
            dialog.showMessageBox({
                type: "warning",
                buttons: ["确定"],
                defaultId: 0,
                cancelId: 1,
                title: `没有更新的版本`,
                message: `当前版本 v${version} 是最新版本!`,
                // icon: path.join(__dirname, './logo.png'),
            })
        }
    })
}

function format_version(e) {
    return e.split(".").map(function (e) { return e - 0 })
}

module.exports = {
    check_update: download_remote_version,
    manual_check_update: manual_check_update
}

