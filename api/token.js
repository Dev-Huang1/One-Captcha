export default async function handler(req, res) {
  const fs = require('fs');
  const path = require('path');

  // 仅处理 POST 请求
  if (req.method === 'POST') {
    const { token } = req.body;

    // 定义文件路径为 /tmp 目录
    const filePath = path.join('/tmp', 'token.json');

    // 读取现有的 token.json 文件，如果不存在则创建一个空对象
    let tokens = {};
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      tokens = JSON.parse(fileData);
    }

    // 存储token以及生成过期时间戳
    const expirationTime = Date.now() + 180 * 1000; // 当前时间加上180秒
    tokens[token] = expirationTime;

    // 将更新后的token列表写入token.json
    fs.writeFileSync(filePath, JSON.stringify(tokens, null, 2), 'utf8');

    res.status(200).json({ message: 'Token stored successfully' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
