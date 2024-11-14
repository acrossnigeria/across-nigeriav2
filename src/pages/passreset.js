// components/EmailForm.js
import { useState } from 'react';
import axios from 'axios';
import Layout from '@/components/Layout';
import { center } from '@cloudinary/url-gen/qualifiers/textAlignment';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [ allowSubmit, setAllowSubmit ] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [ timer, setTimer ] = useState(60);
  const [ timerDisplay, setTimerDisplay ] = useState('none')

  function startTimer() {
    setTimerDisplay('block');
    const count = setTimeout(() => {
      if (allowSubmit) { clearTimeout(count)}
      const time = timer - 1
      if ( timer === 0 ) { 
        setAllowSubmit(true);
        clearTimeout(count);
      }
      setTimer(time);
    }, 1000);
    setTimer(60);
  }


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
    setMessage('');
    setLoading(true);
    event.preventDefault();
    try {

      const findUser = await axios.get('/api/findUser', { params: { email } });

      const outgoing = "noreply <password-reset@acrossnig.com>";
      const recepient = findUser.data.email;
      const subject="Password Reset";
      const resetCode= generateRandomString(8);
      const resetCodeUrl=window.location.origin+`/mail/`+resetCode;
      const content=  `<p>Hi ${findUser.data?.name?? ""} </p>
      <p>We received a request to reset the password for your account. If this was you, simply click the link below to create a new password:</p>
      <p>${resetCodeUrl}<p/>
      <p>If you didn't request a password reset, no worries! You can safely ignore this email. Your account is still secure.</p>
      <p>Thanks for being a part of Across Nigeria reality TV show!</p>
      <p>Best regards, <br></br>
        The Across Nigeria Team</p>`
      const heading= 'Reset Your Password - We have Got You Covered!';

      const setReset = await axios.patch('/api/findUser', { recepient, resetCodeUrl, resetCode });

      try {
        const isEmailSent = await axios.post('/api/mail/mail', { outgoing, recepient, subject, content, heading } );
        startTimer();
        setMessage('A link to reset your password has been sent to ', email);
      } catch (err) {
        console.log('error:', err.message );
        setLoading(false);
        setMessage(`something went wrong, Could you please try again`);
      }
  

    } catch (error) {
        console.log('Error checking email:', error.message);
        setMessage(`Oops, something went wrong, please try again`);

    } 

    setLoading(false)
    setEmail("");
  };

  return (
    <Layout title="Password Reset" >
    <div style={{width:'fit-content', placeSelf:'center'}} >
      <form 
      style={{alignItems: 'center'}}
      className='flex flex-col' 
      onSubmit={allowSubmit? handleSubmit : (e)=>{e.preventDefault()}}>
        <h2 style={{fontSize:'25px', textAlign:'center', margin:'15px 0px'}} className="w-full font-bold tracking-wider">Password Recovery</h2>
        <label style={{alignSelf:'left', width:'315px', fontSize:'21px', color:'166534'}}>Email: </label>
          <input
          placeholder='Enter your Email'
            style={{width:'320px'}}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='mb-4 ml-1 border p-2 text-lg font-thin font-sans border-gray-500 rounded'
          />
       <div>
          <p style={{fontSize:'19px', textAlign:'center', lineHeight:'25px'}}>{message}</p>
          <p style={{ color:'grey', fontSize:'17px', display:(timerDisplay)}}>You can submit a new request in {timer}s</p>
       </div>
  
        <button style={{backgroundColor:(allowSubmit?'#166534':'grey'), marginTop:'10px', fontSize:'19px', width:'150px'}}  className='block hover:opacity-80 text-white cursor-pointer rounded p-2' type="submit">
          {loading?'Submiting...':'Submit'}
        </button>
      </form>
    </div></Layout>
  );
};

export default EmailForm;
