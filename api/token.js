import fs from 'fs';
import path from 'path';

/**
 * 保存token及其过期时间到token.json文件
 * @param {string} token - 需要保存的token
 */
export function saveToken(token) {
    const filePath = path.join('/tmp', 'token.json');
    const currentTime = Date.now();
    const expirationTime = currentTime + 180 * 1000; // 180秒后过期

    let tokens = {};

    // 如果文件存在，读取现有的token数据
    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf8');
        tokens = JSON.parse(fileData);
    }

    // 保存token和过期时间
    tokens[token] = expirationTime;

    // 将更新后的token数据写入文件
    fs.writeFileSync(filePath, JSON.stringify(tokens, null, 2), 'utf8');
}
