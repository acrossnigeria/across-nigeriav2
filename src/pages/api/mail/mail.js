
import nodemailer from 'nodemailer';

const handler = async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  const emailPass = process.env.ZOHO_PASS;

  console.log("from mail api:", req.body);
  const { recepient, subject, content, heading } = req.body;
  // Email content 
  const mailOptions = {
    from: '"Across Nigeria Reality TV Show" <noreply@acrossnig.com>',
    to: recepient,
    subject: subject,
    text: content,
    html: `<div>${content}</div>`
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
    } else {
      console.log('Email sent:', info.response);
      return res.status(200).json({ message: 'Email sent successfully', info: info.response });
    }
  });

}

export default handler;