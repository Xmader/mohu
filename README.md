# Mohu App

一个simple的膜乎免 番羽土啬 APP

[![+1s](%CE%98..%CE%98-%2B1s-green.svg)](https://zh.wikipedia.org/wiki/%E8%86%9C%E8%9B%A4%E6%96%87%E5%8C%96)

## 功能

* 免 番羽土啬 浏览膜乎、辱乎、品葱

* 内置一个续命时钟和一个暴力续命程序

* 内置一个 好几百个教授一致通过 的 `膜法指南` 

    * 视频加载速度可能有些慢，请耐心等候

* 内置 `乳包指南`

* 内置三个镆铪/乳苞小游戏:

    * Flappy Winnie
    * Flappy Frog
    * 切包子

* 自动检查更新

## 下载

你可以下载源码自行构建, 或者直接在下面下载构建好的可执行版本:

[Windows 32位版](https://mohu.oss-cn-shanghai.aliyuncs.com/MohuAPP-win32-ia32.zip)

[Windows 64位版](https://mohu.oss-cn-shanghai.aliyuncs.com/MohuAPP-win32-x64.zip)

[Linux 32位版](https://mohu.oss-cn-shanghai.aliyuncs.com/MohuAPP-linux-ia32.zip)

[Linux 64位版](https://mohu.oss-cn-shanghai.aliyuncs.com/MohuAPP-linux-x64.zip)

[MacOS 64位版](https://mohu.oss-cn-shanghai.aliyuncs.com/MohuAPP-darwin-x64.zip)

<!-- [查看Android版 (作者: 膜乎用户@辱乎)](https://www.mohu.club/article/170) -->

## 构建

> 如果您下载的是构建好的版本, 您可以直接跳过泽一步

```bash
cd ./app

electron-packager . MohuAPP --app-copyright="Copyright (c) 2018 Xmader" \
    --platform=${platform} --arch=${arch} --electron-version 3.0.4 \
    --out ../OutApp/ --overwrite \
    --icon=./assets/logo.ico --ignore=packager.sh \
    --tmpdir=../OutApp/Temp/ --download.cache=../OutApp/Temp/ \
    --download.mirror="https://npm.taobao.org/mirrors/electron/"
```

## 运行

1. 解压全部文件
2. 找到 `MohuAPP.exe`(Windows) 或 `MohuAPP`(Linux) 或 `MohuAPP.app`(MacOS)，双击运行

## 备注

* 如果有bug，请尽快在[这里](https://github.com/Xmader/mohu/issues)向我反馈

## 更新历史

[点我查看](update_history.md)

## 特别感谢

> 本项目在开发过程中参考了以下项目或用户的部分源代码

* [Hydrogen](https://github.com/Xmader/hydrogen/tree/linux) (参考了其landing页面)

* [膜法指南 网页版](https://github.com/Xmader/mogicians_manual) (本项目内置了【膜法指南】网页版)

* [乳包指南](https://github.com/Xmader/rubao_manual) (本项目内置了乳包指南)

* [【膜法指南】安卓客户端](https://github.com/naco-siren/mogicians_manual_public_release)

* [angry.im](https://angry.im/) (本项目使用了angry.im的续命API)

* [@hahaxixi](https://github.com/hahaxixi) (本项目内置了他的三个小游戏)

## 开源许可证

本软件是一个完全免费的开源软件, 基于 MIT 协议开源。

> 很惭愧，就做了一点微小的工作，谢谢大家
