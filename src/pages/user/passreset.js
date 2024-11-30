// components/EmailForm.js
import { useState } from 'react';
import axios from 'axios';
import Layout from '@/components/Layout';
import { center } from '@cloudinary/url-gen/qualifiers/textAlignment';
import Close from '../../../public/images/icon/Close';
import Loader from '@/components/Loader';
import Link from 'next/link';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [ allowSubmit, setAllowSubmit ] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [ timer, setTimer ] = useState(60);
  const [ timerDisplay, setTimerDisplay ] = useState('hidden');

  function allow () {
    setTimer(10);
    setAllowSubmit(true);
    setTimerDisplay('hidden')
  }
  const count = setTimeout(() => {
      if (!allowSubmit) {
        const time = timer - 1 
        setTimer(time);
      }
  }, 1000);

  if (timer === 0) { 
    clearTimeout(count);
    allow();
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
    event.preventDefault();
    setMessage('');
    let emailAddress;
    setLoading(true);
    try {
      const findUser = await axios.get('/api/findUser', { params: { email } });
      emailAddress = findUser.data.email;

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
        setMessage(`A link to reset your password was sent to ${emailAddress}`);
        setAllowSubmit(false);
        setTimerDisplay('visible');
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
    <div >
      <Loader/>
      <div className='flex flex-row justify-end px-8 py-3'>
          <Link href={'/'}><Close/></Link> 
      </div>
      <div style={{width:'100%', placeSelf:'center'}} >
        <div className='border-b-1 border-green-100 py-3 text-center text-[17px] font-bold text-green-600'>
          <span>ACROSS NIGERIA REALITY SHOW</span>
        </div>
        <form style={{alignItems: 'center'}}className='flex flex-col' 
        onSubmit={allowSubmit? handleSubmit : (e)=>{e.preventDefault()}}>
          <h2 style={{fontSize:'23px', textAlign:'center', margin:'15px 0px'}} className="w-full font-semibold tracking-wider">Reset your password</h2>
          <p className='mb-[20px] pb-[10px] border-b-[2px]' style={{alignSelf:'left', width:'315px', fontSize:'16px'}}>
            If the account exist, we will email you instructions to reset the password.
          </p>
          <label style={{alignSelf:'left', width:'315px', fontSize:'19px'}}>Email </label>
            <input
            placeholder='Enter your email'
              style={{width:'320px'}}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='mb-4 ml-1 h-[49px] pl-[10px] bg-gray-200 text-[19px] font-thin font-sans border-none rounded-[5px]'
            />
          <div className="flex flex-row justify-between w-full px-[20px] md:w-[400px]">
          <button className="text-[16px] rounded-[5px] h-[49px] hover:bg-green-700 hover:border-none hover:text-white text-green-700 border-1 border-green-700 w-[48%]"><Link href="/account/login" className="mt-3">Return to login</Link></button>
          <button style={{backgroundColor:(allowSubmit?'#166534':'grey'), fontSize:'19px', width:'48%'}}  className='block hover:opacity-80 text-white cursor-pointer rounded' type="submit">
            {loading?'Submiting...':'Submit'}
          </button> 
          </div>
          <div className='mt-[20px]' style={{display:'flex', flexDirection:'column', alignItems:'center', width:'100%', paddingLeft:'20px', paddingRight:'20px'}}>
            <p style={{fontSize:'19px', textAlign:'center', lineHeight:'25px'}}>{message}</p>
            <p style={{textAlign:'center', color:'grey', fontSize:'17px', visibility:(timerDisplay)}}>You can submit a new request in {timer}s</p>
        </div>
        </form>
      </div>
    </div>
  );
};

export default EmailForm;
