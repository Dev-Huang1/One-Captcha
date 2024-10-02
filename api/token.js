import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { token } = req.body;

        // Store token with a timestamp
        const tokenData = { token, timestamp: Date.now() };
        const filePath = path.join(process.cwd(), 'token.json');

        fs.writeFileSync(filePath, JSON.stringify(tokenData));

        return res.status(200).json({ message: 'Token stored successfully' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
}
