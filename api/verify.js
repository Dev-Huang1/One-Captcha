import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { token } = req.body;

        const filePath = path.join(process.cwd(), 'token.json');
        let tokenData;
        try {
            const fileContent = await fs.readFile(filePath, 'utf8');
            tokenData = JSON.parse(fileContent);
        } catch (err) {
            return res.status(500).json({ message: 'failed', error: 'Token file not found or corrupted' });
        }

        // 检查 token 是否存在且在有效期内（180秒）
        const currentTime = Date.now();
        const tokenEntry = tokenData.tokens.find(entry => entry.token === token);

        if (tokenEntry && currentTime - tokenEntry.timestamp < 180 * 1000) {
            return res.status(200).json({ message: 'success' });
        } else {
            return res.status(400).json({ message: 'failed' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
