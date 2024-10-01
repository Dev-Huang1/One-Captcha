// api/verify.js
export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests are allowed' });
    }

    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ message: 'Token is required' });
    }

    const cookieHeader = req.headers.cookie;
    if (!cookieHeader) {
        return res.status(400).json({ message: 'No cookies found' });
    }

    const cookieToken = cookieHeader
        .split('; ')
        .find(row => row.startsWith('OneCaptchaToken='))
        ?.split('=')[1];

    if (!cookieToken) {
        return res.status(400).json({ message: 'Token not found in cookies' });
    }

    if (token === cookieToken) {
        return res.status(200).json({ message: 'success' });
    } else {
        return res.status(401).json({ message: 'failed' });
    }
}
