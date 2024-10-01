import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
    // CORS 处理，只允许 onecaptcha.us.kg 访问
    res.setHeader('Access-Control-Allow-Origin', 'https://onecaptcha.us.kg');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        // 处理预检请求
        return res.status(200).end();
    }

    if (req.method === 'POST') {
        const tokenData = req.body;

        const filePath = path.join(process.cwd(), 'token.json');

        // 读取现有的 token.json 文件
        let existingTokens = { tokens: [] };
        try {
            const fileContent = await fs.readFile(filePath, 'utf8');
            existingTokens = JSON.parse(fileContent);
        } catch (err) {
            // 如果文件不存在，则初始化为一个空的 tokens 数组
        }

        // 添加新 token
        existingTokens.tokens.push(tokenData);

        // 保存到文件
        try {
            await fs.writeFile(filePath, JSON.stringify(existingTokens));
            return res.status(200).json({ message: 'Token saved' });
        } catch (err) {
            return res.status(500).json({ message: 'Error saving token' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
