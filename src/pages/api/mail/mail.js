
import nodemailer from 'nodemailer';

// const resend = new Resend(process.env.RESEND_API_KEY);
// export default handler = async (req, res) => {

//   console.log("from mail api:", req.body);

//   const { outgoing, recepient, subject, content, heading } = req.body;

//   const { data, error } = await resend.emails.send({
//     from: outgoing,
//     to: [recepient],
//     subject: subject,
//     react: EmailTemplate( { content:content, heading:heading }),
//   });

//   if (error) {
//     return res.status(400).json(error);
//   }

//   res.status(200).json(data);
// };

// Handling Email sending using nodemailer
const emailPass = process.env.ZOHO_PASS;
const handler = async (req, res) => {
  console.log("from mail api:", req.body);
  const { outgoing, recepient, subject, content, heading } = req.body;
  // Email content 
  const mailOptions = {
    from: '"Across Nigeria Reality TV Show" <noreply@acrossnig.com>',
    to: recepient,
    subject: subject,
    text: content,
    html: `<h2><strong>${heading}</strong></h2><p>${content}</p>`
  };
  // Creating a transporter using ZOHO smtp settings
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: 'noreply@acrossnig.com',
      pass: emailPass
    }
  });
  // sending mail
  transporter.sendMail( mailOptions, ( error, info )=> {
    if (error) {
      console.log('Error Occured');
      res.status(500).json('an Error Occurd:', error)
    } else {
      console.log( 'Email sent:', info.response )
      res.status(200).json( info.response );
    }
  } )

}

export default handler;