import speakeasy from 'speakeasy';
import db from '../../../../utils/db';
import UserSecret from '@/models/UserSecret';

const handler = async ( req, res) => {
   if (req.method === 'POST') {
        const { token, email } = req.body;
        let secret;

        try {
            // check for user secret
            console.log('Checking for user secret assocuated with the given email')
            await db.connect();
            const userSecret = await UserSecret.findOne( { email });
            await db.disconnect();

            if (userSecret) {
                console.log('found user secret');
                secret = userSecret.secret;
                const isVerified = speakeasy.time.verify( {
                    token: token,
                    encoding:'base32',
                    secret: secret,
                    step: 600,//10 mins
                    window:0,
                })
        
                res.status(200).json({ isVerified })
            } else {
                res.status(200).json({ isVerified:false })
            }
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ error: 'something went wrong when getting the user secret'})
        }

   } else {
        res.status(405).json({ error: 'method not allowed'});
   }
}

export default handler;