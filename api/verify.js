import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { token } = req.body;
        const filePath = path.join(process.cwd(), 'tmp/token.json');

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: 'failed' });
        }

        const tokenData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const currentTime = Date.now();

        // Check if token is valid and within 180 seconds
        if (tokenData.token === token && (currentTime - tokenData.timestamp) <= 180000) {
            return res.status(200).json({ message: 'success' });
        }

        return res.status(404).json({ message: 'failed' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
}
