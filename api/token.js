export default async function handler(req, res) {
    // 允许的域名
    const allowedOrigin = 'https://onecaptcha.us.kg';

    // 检查请求的来源域
    if (req.headers.origin !== allowedOrigin) {
        return res.status(403).json({ message: 'Forbidden: Invalid origin' });
    }

    if (req.method === 'POST') {
        const { token, createdAt, expiresAt } = req.body;

        try {
            // 保存token到Vercel KV
            await kv.set(token, { createdAt, expiresAt });
            return res.status(200).json({ message: 'Token saved successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Error saving token', error });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
