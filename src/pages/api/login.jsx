import { withIronSession } from 'next-iron-session';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
            const phpApiUrl = 'https://kyroes.in/st-josephs/api/login/'; // Replace with your PHP API URL
            const response = await fetch(phpApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: req.body,
            });
            res.status(200).json({ success: true, data:response });
            // if (!response.ok) {
            //     throw new Error('Invalid email or password');
            // }

            // // Assuming your PHP API returns JSON with { success: true } upon successful login
            // const data = await response.json();
            // if (data.success) {
            //     req.session.set('user', { email });
            //     await req.session.save();
            //     res.status(200).json({ success: true });
            // } else {
            //     throw new Error('Invalid email or password');
            // }
        } catch (error) {
            res.status(401).json({ success: false, message: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}

// export default withIronSession(handler, {
//     password: process.env.SECRET_COOKIE_PASSWORD,
//     cookieName: 'session',
//     cookieOptions: {
//         secure: process.env.NODE_ENV === 'production' ? true : false,
//     },
// });
