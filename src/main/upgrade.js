import fs from 'fs';
import {app} from 'electron';
import {AES, enc} from 'crypto-js';

const DATA_PATH = app.getPath('userData');
const PATH = DATA_PATH + '/security.db';

try {
    // 打开文件
    let fd = fs.openSync(PATH, 'rs+')
    let buf = new Buffer(512 * 1024);
    // 读取文件
    let bytes = fs.readSync(fd, buf, 0, buf.length, 0)
    // console.log(bytes + "  字节被读取");

    // 仅输出读取的字节
    if (bytes > 0) {
        let oldSecretData = buf.slice(0, bytes).toString().split('\n');

        if (oldSecretData.length > 0) {
            if (typeof JSON.parse(oldSecretData[0]) === 'object') {
                let newContent = oldSecretData
                    .filter(item => item.length > 0)
                    .map(item => AES.encrypt(item, 'AortgbIKEQHtXK19nmOK2tw9D0qUNQiI').toString())
                    .join('\n');
                fs.writeSync(fd, newContent, 0);
            }
        }
    }
    fs.closeSync(fd);
} catch (e) {
    console.log('file not exist');
}

