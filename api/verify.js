export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { token } = req.body;

        try {
            // 从Vercel KV读取token
            const tokenData = await kv.get(token);

            if (tokenData && new Date(tokenData.expiresAt) > new Date()) {
                return res.status(200).json({ message: 'success' });
            } else {
                return res.status(400).json({ message: 'failed' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Error verifying token', error });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
