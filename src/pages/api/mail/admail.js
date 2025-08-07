
import nodemailer from 'nodemailer';

const handler = async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  const emailPass = process.env.ZOHO_ADS_PASS;

  console.log("from mail api:", req.body);
  const { recipient, clientName, duration, amount, advertType, startDate, endDate } = req.body;
  // Email content 
  const mailOptions = {
    from: '"Across Nigeria Reality TV Show" <ads@acrossnig.com>',
    to: recipient,
    subject: "Your Advert As Been Successfully Placed",
    text: `Hi ${clientName},
        Thank you for placing your ad on Across Nigeria.

        Ad Type: ${advertType}
        Duration: ${duration} days (${startDate} - ${endDate})
        Amount Paid: ₦${amount}

        Your advert is now live and visible on our homepage.

        If you have any questions, feel free to contact us.

        Best regards,
        The Across Nigeria Team`,
    html: `<!DOCTYPE html>
                <html>
                <head>
                <style>
                    body {
                    font-family: Arial, sans-serif;
                    background-color: #ffffff;
                    color: #333;
                    margin: 0;
                    padding: 0;
                    }
                    .header {
                    background-color: #22c55e; /* Tailwind's green-500 */
                    color: white;
                    padding: 20px;
                    text-align: center;
                    }
                    .content {
                    padding: 30px;
                    }
                    .footer {
                    text-align: center;
                    color: #666;
                    font-size: 14px;
                    padding: 20px;
                    }
                    .btn {
                    background-color: #22c55e;
                    color: white;
                    padding: 10px 20px;
                    text-decoration: none;
                    display: inline-block;
                    border-radius: 6px;
                    margin-top: 20px;
                    }
                </style>
                </head>
                <body>

                <div class="header">
                    <h1>Across Nigeria Reality Show</h1>
                    <p>Your Ad Has Been Successfully Placed!</p>
                </div>

                <div class="content">
                    <p>Hi ${clientName},</p>

                    <p>Thank you for placing an advert on <strong>Across Nigeria</strong>.</p>

                    <p><strong>Ad Type:</strong> ${advertType}<br>
                    <strong>Duration:</strong> ${duration} days (${startDate} - ${endDate})<br>
                    <strong>Amount Paid:</strong> ₦${amount}</p>

                    <p>Your advert is now live and visible on our homepage. We appreciate your support!</p>

                    <p>If you have any questions or need help, feel free to contact us anytime.</p>

                    <p>Best regards,<br>
                    The Across Nigeria Team</p>
                </div>

                <div class="footer">
                    &copy; 2025 Across Nigeria Reality Show. All rights reserved.
                </div>

                </body>
                </html>
                `
  };
  // Creating a transporter using ZOHO smtp settings
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 587,
    secure: false,
    auth: {
      user: 'ads@acrossnig.com',
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