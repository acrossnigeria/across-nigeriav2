// components/EmailForm.js
import { useState } from 'react';
import axios from 'axios';
import Layout from '@/components/Layout';
import { center } from '@cloudinary/url-gen/qualifiers/textAlignment';
import Close from '../../../public/images/icon/Close';
import Loader from '@/components/Loader';
import Link from 'next/link';
import logo1 from "../../../public/images/logo1.png";
import Image from 'next/image';

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
      const findUser = await axios.get(`/api/findUser?email=${email}`);
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
    <div className='h-screen w-screen flex flex-col justify-center items-center'>
      <Loader/>
      <div className='flex flex-row absolute top-[5%] right-[5%]'>
          <Link href={'/'}><Close/></Link> 
      </div>
      <div >
        <div className='text-center mb-[10px] font-bold text-green-600'>
          <div className='text-center flex flex-row justify-center gap-1 items-center'>
            <Image src={logo1} alt='logo' placeholder='blur' className='h-[45px] w-[50px]' />
            <div className='flex flex-col justify-center items-start'>
              <span className='text-[16px] font-bold text-green-700'>ACROSS NIGERIA</span>
              <span className='text-[14px] text-green-500'>REALITY SHOW</span>
            </div>
          </div>
        </div>
        <form style={{alignItems: 'center'}} className='flex flex-col' 
        onSubmit={allowSubmit? handleSubmit : (e)=>{e.preventDefault()}}>
          <div style={{fontSize:'20px', textAlign:'center'}} className="w-full mt-[10px] md:text-center font-semibold">Reset your password</div>
          <div className='pb-[10px] md:text-center text-left' style={{width:'315px', fontSize:'16px'}}>
            If the account exist, we will email you instructions to reset the password.
          </div>
          <label style={{alignSelf:'left', width:'315px', fontSize:'17px', marginLeft:'10px'}}>Email </label>
            <input
            placeholder='example@domain.com'
              style={{width:'320px'}}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border-gray-400 border-1 h-[45px] px-3 outline-none rounded-[15px] bg-gray-200"
            />
          <div className="flex flex-row justify-between w-full px-[20px] md:w-[400px]">
          <button style={{backgroundColor:(allowSubmit?'#166534':'grey'),}}  className='block hover:opacity-80  text-white cursor-pointer rounded-[30px] h-[45px] md:w-[100%] mt-[30px] w-[80%]' type="submit">
            {loading?'Submiting...':'Submit'}
          </button> 
          </div>
          <div className='mt-[20px]' style={{display:'flex', flexDirection:'column', alignItems:'center', width:'100%', paddingLeft:'20px', paddingRight:'20px'}}>
            <p style={{fontSize:'19px', textAlign:'center', lineHeight:'25px'}}>{message}</p>
            <p style={{textAlign:'center', color:'grey', fontSize:'17px', visibility:(timerDisplay)}}>You can submit a new request in {timer}s</p>
        </div>
        </form>
        <div className="text-[16px] mt-[50px] mx-auto text-center">Remember your password? <Link className='text-green-600' href="/account/login" >Log In</Link></div>
      </div>
    </div>
  );
};

export default EmailForm;
