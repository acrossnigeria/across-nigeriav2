// components/EmailForm.js
import { useState } from 'react';
import axios from 'axios';
import Layout from '@/components/Layout';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }
  
  return result;
}

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const response = await axios.get('/api/findUser', { params: { email } });
      console.log(response.data)
      setMessage(response.data)
      setCheck(true);
      const outgoing="noreply <password-reset@acrossnig.com>";
        const recepient=message.email;
        const subject="Password Reset";
        const resetCode= generateRandomString(8);
        const resetCodeUrl=window.location.origin+`/mail/`+resetCode;
        const content= `Dear ${message?.name?? ""} kindly click on ${resetCodeUrl} to reset your password`;
      const mailResult= await axios.patch('/api/findUser',{recepient, resetCodeUrl,resetCode});
       const storResult= await axios.post('/api/mail/mail',{outgoing,
        recepient, subject, content
      });
      console.log("MAIL RESULT IS",mailResult)
      console.log("DATABASE RESULT IS",storResult)
    } catch (error) {
      console.error('Error checking email:', error);
    
    } 
     setLoading(false)
     setEmail("");
  };

  return (
    <Layout title="Password Reset" >
    <div className='m-10 font-semibold text-2xl'>
      <form onSubmit={handleSubmit}>
        <label className='mb-4'>
          Email:      </label>
          <input
          placeholder='Enter your Email'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='mb-4 ml-1 border p-2 text-lg font-thin font-mono border-gray-500 rounded w-52'
          />
  
        <button className='block border bg-green-800 text-white border-gray-500 cursor-pointer rounded p-2' type="submit">Submit</button>
      </form>
      {check&&!message.exists && <p>Email doesnt exist</p>}
      <div>
        {!loading&&message.exists&&<p>Reset code has been sent to {message.email}</p>}
      </div>
    </div></Layout>
  );
};

export default EmailForm;
