// components/EmailForm.js
import { useState } from 'react';
import axios from 'axios';
import Close from '../../../public/images/icon/Close';
import ProcessLoader from '@/components/ui/ProcessLoader';
import Link from 'next/link';
import logo1 from "../../../public/images/logo1.png";
import Image from 'next/image';
import Button from '@/components/ui/Button';
import ErrorCard from '@/components/ui/ErrorCard';
import SuccessCard from '@/components/ui/SuccessCard';
import TextInputWithIcon from '@/components/ui/TextInputWithIcon';
import EmailIcon from '../../../public/images/icon/EmailIcon';
import Loader from '@/components/Loader';

const EmailForm = () => {
  const [ email, setEmail] = useState('');
  const [ allowSubmit, setAllowSubmit ] = useState(true);
  const [ loading, setLoading] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ showError, setShowError ] = useState(false);
  const [ successMessage, setSuccessMessage ] = useState('');
  const [ timer, setTimer ] = useState(60);
  const [ timerDisplay, setTimerDisplay ] = useState('hidden');
  const [ showSuccess, setShowSuccess ] = useState(false);

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

  const handleError = (error) => {
    setShowError(true);
    setErrorMessage(error);
  }

  const handleSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccess(true);
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

    setErrorMessage('');
    setShowError(false);
    setShowSuccess(false);
    setSuccessMessage('');

    if (email === '') {
      handleError('Email field cannot be empty');
      return;
    }

    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) === false) {
      handleError('Please enter a valid email address');
      return;
    }

    if (!allowSubmit) {
      handleError(`You can submit a new request in ${timer}s`);
      return;
    }

    setLoading(true);
    let emailAddress;
    try {
      const findUser = await axios.get(`/api/findUser?email=${email}`);
      emailAddress = findUser.data.email;

      const outgoing = "noreply <password-reset@acrossnig.com>";
      const recepient = findUser.data.email;
      const subject="Password Reset";
      const resetCode= generateRandomString(15);
      const resetCodeUrl=window.location.origin+`/mail/`+resetCode;
      const content=  `<p>Hi ${findUser.data?.name?? ""} </p>
        <p>We received a request to reset the password for your account. If this was you, simply click the link below to create a new password:</p>
        <p>${resetCodeUrl}<p/>
        <p>If you didn't request a password reset, no worries! You can safely ignore this email. Your account is still secure.</p>
        <p>Thanks for being a part of Across Nigeria reality TV show!</p>
        <p>Best regards, <br></br> The Across Nigeria Team</p>`
      const heading = 'Reset Your Password - We have Got You Covered!';

      await axios.patch('/api/findUser', { recepient, resetCodeUrl, resetCode });

      try {
        const isEmailSent = await axios.post('/api/mail/mail', { outgoing, recepient, subject, content, heading } );
        if (isEmailSent.status !== 200) {
          handleError('Something went wrong, please try again');
        }

        handleSuccess(`A link to reset your password was sent to ${emailAddress}`);
        setLoading(false);
        setAllowSubmit(false);
        setTimerDisplay('visible');

      } catch (err) {
        console.log('error:', err.message );
        setLoading(false);
        handleError(`something went wrong, Could you please try again`);
      }
  

    } catch (error) {
        console.log('Error checking email:', error.message);
        handleError(error.message || 'An error occurred while checking the email address');
        setLoading(false);
    } 

    setLoading(false)
    setEmail("");
  };

  return (
    <div className='h-screen w-screen flex flex-col justify-start pt-[90px] items-center bg-gray-100'>
      <Loader/>
      <div className='flex flex-row absolute top-[3.5%] left-[3.5%]'>
          <Link href={'/'}><Close bg={'black'} size={'20px'}/></Link> 
      </div>
      <div className='max-w-[350px]'>
          <div className='text-center flex flex-row md:mb-10 mb-[80px] justify-center gap-1 items-center'>
            <Image src={logo1} alt='logo' placeholder='blur' className='h-[40px] w-[45px]' />
            <div className='flex flex-col justify-center leading-[15px] items-start'>
              <span className='text-[15px] font-bold text-green-700'>ACROSS NIGERIA</span>
              <span className='text-[13px] text-green-500'>REALITY SHOW</span>
            </div>
          </div>
        <form style={{alignItems: 'center'}} className='flex flex-col'>
          <div className="md:mb-4 mb-[30px]">
            <h1 className="text-[22px] font-bold mb-2 text-center">Reset your password</h1>
            <div className="text-gray-500 text-center leading-[18px] text-[16px]"> If the account exist, we will email you instructions to reset the password.</div>
          </div>
          <ErrorCard className={'w-full'} error={errorMessage} showError={showError} setShowError={setShowError} />
          <SuccessCard className={'w-full'} message={successMessage} showSuccess={showSuccess} />
          <TextInputWithIcon icon={<EmailIcon/>} onChange={(e) => { setShowError(false); setEmail(e.target.value) }} value={email} placeholder={'Enter your email address'} label={'Email Address'} className='w-full' type='email' />
          <div className="flex flex-row justify-between w-full mt-4">
            <Button size={"md"} className='w-[100%]' onClick={allowSubmit? handleSubmit : (e)=>{e.preventDefault()}} disabled={loading}>{loading?<ProcessLoader size={'20px'} /> :'Submit'}</Button>
          </div>
          <div className='mt-[15px]' style={{display:'flex', flexDirection:'column', alignItems:'center', width:'100%', paddingLeft:'20px', paddingRight:'20px'}}>
            <p style={{textAlign:'center', color:'grey', fontSize:'16px', visibility:(timerDisplay)}}>You can submit a new request in {timer}s</p>
        </div>
        </form>
        <div className="flex flex-row justify-center text-[16px] items-center gap-2 mt-[35px] mb-2">
          <span className="text-gray-500">Remember your password?</span>
          <Link href="/account/login" className="hover:text-green-900 underline font-medium hover:scale-105">Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default EmailForm;
