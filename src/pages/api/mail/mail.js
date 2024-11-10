
import { EmailTemplate } from '@/components/email-contact';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req, res) => {
  console.log("from mail api:",req.body);
  const{outgoing, recepient, subject, content, heading}=req.body;
  const { data, error } = await resend.emails.send({
    from: outgoing,
    to: [recepient],
    subject: subject,
    react: EmailTemplate({content:content,heading:heading}),
  });

  if (error) {
    return res.status(400).json(error);
  }

  res.status(200).json(data);
};
