# Mohu App

[English](https://github.com/Xmader/mohu/blob/master/README_en.md) | [中文](https://github.com/Xmader/mohu/blob/master/README.md)

A simple APP of Mohu, no climbing over the GFW needed

[![+1s](%CE%98..%CE%98-%2B1s-green.svg)](https://en.wikipedia.org/wiki/Moha_culture)

## Features

* Auto add hosts, Browse Mohu without climbing over the GFW

* Include a continuing-life(xuming) clock and a violently-continuing-life(baoli xuming) programme

* Include `Mogicians Manual`

* Include three moha/rubao small games:

    * Flappy Winnie
    * Flappy Frog
    * Baozi Ninja

* Auto update

## Download

You can download the source code and build it yourself, or download the built version from following links:

[for Windows 32bit](https://mohu.oss-cn-shanghai.aliyuncs.com/v1/MohuAPP-win32-ia32.zip)

[for Windows 64bit](https://mohu.oss-cn-shanghai.aliyuncs.com/v1/MohuAPP-win32-x64.zip)

[for Linux 32bit](https://mohu.oss-cn-shanghai.aliyuncs.com/v1/MohuAPP-linux-ia32.zip)

[for Linux 64bit](https://mohu.oss-cn-shanghai.aliyuncs.com/v1/MohuAPP-linux-x64.zip)

[for MacOS 64bit](https://mohu.oss-cn-shanghai.aliyuncs.com/v1/MohuAPP-darwin-x64.zip)

## Build

> If you downloaded the built version, you can simply skip this step.

```bash
cd ./resources/app

electron-packager . MohuAPP   --out ../../OutApp/ --electron-version 2.0.4 --overwrite --icon=./logo.ico --tmpdir=../../OutApp/Temp/ --ignore=packager.sh --download.cache=../../OutApp/Temp/ --download.mirror="https://npm.taobao.org/mirrors/electron/"
```

## Run

1. Unzip all the files
2. find `MohuAPP.exe`(Windows) or `MohuAPP`(Linux) or `MohuAPP.app`(MacOS), just run it

## Notes

* If you find some bugs in this project, please create a report [here](https://github.com/Xmader/mohu/issues) to help us improve 

## Update History

[Read](update_history.md)

## With Special Thanks to

> This project references some of their codes when developing

* [Hydrogen](https://github.com/Xmader/hydrogen/tree/linux) (Referenced its landing page)

* [Mogicians Manual](https://github.com/Xmader/mogicians_manual) (This project includes Mogicians Manual)

* [angry.im](https://angry.im/) (This project uses angry.im's continuing-life(xuming) API)

* [@hahaxixi](https://github.com/hahaxixi) (This project includes his three small games)

* [SwitchHosts!](https://github.com/oldj/SwitchHosts) (Referenced its codes about editing hosts file)


## LICENSE

This software is a free and open source software, it is released under the MIT license.

> I think I speak very poor English, but anyway I dare to say. This is very important.
