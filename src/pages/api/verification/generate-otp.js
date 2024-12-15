import speakeasy from 'speakeasy';
import UserSecret from '@/models/UserSecret';
import db from '../../../../utils/db';
import nodemailer from 'nodemailer';

const handler = async ( req, res) => {
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

        function sendOtpToEmail(recipient, token) {
            console.log('sending otp to user');
            const otpEmailTemplate = (otpCode) => `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                    <div style="text-align: center; margin-bottom: 20px;">
                    <h1 style="color: #007BFF;">Your OTP Code</h1>
                    </div>
                    <p>Hello,</p>
                    <p>Thank you for using our service. To complete your request, please use the following One-Time Password (OTP):</p>
                    <p style="font-size: 24px; font-weight: bold; color: #007BFF; text-align: center; background: #f9f9f9; padding: 10px; border: 1px dashed #ddd; display: inline-block;">${otpCode}</p>
                    <p>This code is valid for the next <strong>10 minutes</strong> and can only be used once. If you did not request this code, please ignore this email.</p>
                    <p>For your security, please do not share this code with anyone.</p>
                    <p>Best regards,<br>The Across Nigeria Reality TV Show Team</p>
                    <hr>
                    <footer style="text-align: center; font-size: 14px; color: #666;">
                    &copy; ${new Date().getFullYear()} Acrossnig. All rights reserved.<br>
                    Need help? Contact us at <a href="mailto:support@acrossnig.com">support@acrossnig.com</a>
                    </footer>
                </div>
                `;


            const emailPass = process.env.ZOHO_PASS;
            // Email content 
            const mailOptions = {
              from: '"Across Nigeria Reality TV Show" <noreply@acrossnig.com>',
              to: recipient,
              subject: 'Your OTP Code for Acrossnig',
              text: '',
              html: otpEmailTemplate(token),
            };
            // Creating a transporter using ZOHO smtp settings
            const transporter = nodemailer.createTransport({
              host: 'smtp.zoho.com',
              port: 587,
              secure: false,
              auth: {
                user: 'noreply@acrossnig.com',
                pass: emailPass
              },
              tls: {
                rejectUnauthorized: false,
              },
            });
            // sending mail
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log('Error Occurred:', error);
                return res.status(500).json({ message: 'An error occurred', error: error.message });
                return false;
              } else {
                console.log('Email sent')
                return true;
              }
            });
        }

        try {
            // check if email has secret in the database
            await db.connect();
            const isUserSecretAvailable = await UserSecret.findOne( { email } );

            if (isUserSecretAvailable) {
                console.log('user secret matching email was found');
                secret = isUserSecretAvailable.secret;
                const data = { secret, email };

                const token = generateOtp(secret);
                const emailSent = sendOtpToEmail( email, token );
               
            } else {
                console.log('No user secret matches email, creating new user secret')
                secret = speakeasy.generateSecret({ length:20 });
                const data = { secret:secret.base32 , email };
                const newUserSecret = await UserSecret.create(data);

                const token = generateOtp(secret.base32);
                const emailSent = sendOtpToEmail( email, token );

            }
            res.status(200).json( { isSent: true});
            
        } catch (err){
            console.log(err.message);
            res.status(500).json( {error: 'something went wrong'})
        }

    } else {
        res.status(405).json( { error: ' method not allowed'});
    }
   
}

export default handler;