import speakeasy from 'speakeasy';
import UserSecret from '@/models/UserSecret';
import db from '../../../../utils/db';
import nodemailer from 'nodemailer';

const handler = async ( req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Cache-Control', 'no-store');
    if (req.method === 'POST') {
        let secret;
        const { email } = req.body;

        function generateOtp(secretStr) {
            const token = speakeasy.time( {
                secret: secretStr,
                encoding: 'base32',
                step:600,
                window:0,
            })

            return token;
        }

        try {
            // check if email has secret in the database
            await db.connect();
            const isUserSecretAvailable = await UserSecret.findOne( { email } );

            if (isUserSecretAvailable) {
                await db.disconnect();
                console.log('user secret matching email was found');
                secret = isUserSecretAvailable.secret;
                const data = { secret, email };

                const token = generateOtp(secret);
                // const emailSent = sendOtpToEmail( email, token );

                res.status(200).json( { token });
               
            } else {
                console.log('No user secret matches email, creating new user secret')
                secret = speakeasy.generateSecret({ length:20 });
                const data = { secret:secret.base32 , email };
                const newUserSecret = await UserSecret.create(data);
                await db.disconnect();

                const token = generateOtp(secret.base32);
                // const emailSent = sendOtpToEmail( email, token );

                res.status(200).json( { token });
            }
            res.status(200).json( { isSent: true});
            
        } catch (err){
            console.log(err.message);
            await db.disconnect();
            res.status(500).json( {error: 'something went wrong'})
        }

    } else {
        res.status(405).json( { error: ' method not allowed'});
    }
   
}

export default handler;