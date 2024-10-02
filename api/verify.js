import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { token } = req.body;
        const filePath = path.join('/tmp/', 'token.json'); // 使用/tmp目录

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: 'failed' });
        }

        const tokenData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const currentTime = Date.now();

        // Check if the token exists and is still valid
        if (tokenData[token] && (currentTime <= tokenData[token])) {
            return res.status(200).json({ message: 'success' });
        }

        return res.status(404).json({ message: 'failed' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
}
