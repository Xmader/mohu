platform=$1 # 操作系统名称: win32 或 linux 或 darwin
if [ $2 ]
then
   arch=$2 # 系统构架: x64 或 ia32 或 arm64 或 armv7l
else
   arch=x64
fi

electron-packager . MohuAPP --app-copyright="Copyright (c) 2018 Xmader" \
    --platform=${platform} --arch=${arch} --electron-version 3.0.4 \
    --out ../OutApp/ --overwrite \
    --icon=./assets/logo.ico --ignore=packager.sh \
    --tmpdir=../OutApp/Temp/ --download.cache=../OutApp/Temp/ \
    --download.mirror="https://npm.taobao.org/mirrors/electron/"

cd ../OutApp/MohuAPP-${platform}-${arch}
rm LICENSE LICENSES.chromium.html version
cp ../../README.md ./
cp ../../LICENSE ./

cd ../ # 在OutApp文件夹
cd "MohuAPP-${platform}-${arch}"

if [ ${platform} = "darwin" ]
then
    electron-installer-zip MohuAPP.app ../../dist/MohuAPP-${platform}-${arch}.zip
elif [ ${platform} = "linux" ]
then
    electron-installer-zip MohuAPP-${platform}-${arch} ../../dist/MohuAPP-${platform}-${arch}.zip
else
    electron-installer-zip . ../../dist/MohuAPP-${platform}-${arch}.zip
fi
