const https = require('https');

module.exports = (url, callback) => {

    https.get(url, (res) => {
        const { statusCode } = res;
        const contentType = res.headers['content-type'];

        if (statusCode !== 200) {
            throw new Error('请求失败。' + `状态码: ${statusCode}`);
        }
        // else if (!/^application\/json/.test(contentType)) {
        //     throw new Error('无效的 content-type.' + `期望 application/json 但获取的是 ${contentType}`);
        // }
        else {
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    callback(parsedData)
                } catch (e) {
                    throw e;
                }
            });

        }
    })


}