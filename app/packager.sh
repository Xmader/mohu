platform=$1 # 操作系统名称: win32 或 linux
if [ $2 ]
then
   arch=$2 # 系统构架: x64 或 ia32 或 arm64 或 armv7l
else
   arch=x64
fi

if [ ${platform} = "darwin" -a $(uname -o) = "Msys" ]
then
    echo "由于系统限制，目前只能在*unix系统上打包darwin(MacOS)版的APP"
    exit
fi

electron-packager . MohuAPP --platform=${platform} --arch=${arch}  --out ../../OutApp/ --electron-version 2.0.4 --overwrite --icon=./logo.ico --tmpdir=../../OutApp/Temp/ --ignore=packager.sh --download.cache=../../OutApp/Temp/ --download.mirror="https://npm.taobao.org/mirrors/electron/"
cd ../../OutApp/MohuAPP-${platform}-${arch}
rm LICENSE LICENSES.chromium.html version
cp ../../README.md ./

cd ../ # 在OutApp文件夹
electron-installer-zip MohuAPP-${platform}-${arch} ../dist/MohuAPP-${platform}-${arch}.zip
rm -rf MohuAPP-${platform}-${arch}

python ../upload/main.py ../dist/MohuAPP-${platform}-${arch}.zip
python ../upload/main.py ../resources/app/package.json

rm ../dist/MohuAPP-${platform}-${arch}.zip