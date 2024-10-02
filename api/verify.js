import fs from 'fs';
import path from 'path';

/**
 * 验证token的有效性
 * @param {string} token - 需要验证的token
 * @returns {boolean} - 如果token有效返回true，否则返回false
 */
export function verifyToken(token) {
    const filePath = path.join('/tmp', 'token.json');

    // 如果文件不存在，返回失败
    if (!fs.existsSync(filePath)) {
        return false;
    }

    const tokenData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const currentTime = Date.now();

    // 检查token是否存在且未过期
    if (tokenData[token] && currentTime <= tokenData[token]) {
        return true;
    }

    return false;
}
