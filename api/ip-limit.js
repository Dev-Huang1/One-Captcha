// api/ip-limit.js

const axios = require('axios');

let ipRequestCount = {};  // 临时存储 IP 请求计数，实际部署中应使用数据库

module.exports = async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // 获取用户 IP
    try {
        const response = await axios.get('https://api.ipify.org?format=json');
        const userIp = response.data.ip;

        // 记录请求次数
        if (!ipRequestCount[userIp]) {
            ipRequestCount[userIp] = { count: 0, timestamp: Date.now() };
        }

        const now = Date.now();
        if (now - ipRequestCount[userIp].timestamp > 60000) { // 1 分钟
            ipRequestCount[userIp] = { count: 0, timestamp: now };
        }

        ipRequestCount[userIp].count += 1;

        if (ipRequestCount[userIp].count > 5) { // 限制每分钟最多 5 次请求
            res.status(429).json({ message: 'Too many requests, please try again later.' });
        } else {
            res.status(200).json({ message: 'Request allowed' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching IP' });
    }
};
