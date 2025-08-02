/**
 * Safely sets meta, link, and title tags for SEO and social.
 *
 * @param {Object} config
 * @param {string} config.title - The page title
 * @param {string} config.description - Description meta
 * @param {string} config.keywords - Keywords meta
 * @param {string} config.image - Social share image
 * @param {string} config.url - Canonical page URL
*/

import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Store } from '../../../utils/Store';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import Checkbox from '@/components/Checkbox';
import Link from 'next/link';
import Close from '../../../public/images/icon/Close';
import Loader from '@/components/Loader';
import EyeOpen from '../../../public/images/icon/EyeOpen';
import EyeClose from '../../../public/images/icon/EyeClose';
import { signIn } from 'next-auth/react';
import CycleLoader from '@/components/CycleLoader';
import logo1 from "../../../public/images/logo1.png";
import Image from 'next/image';
import Next from '../../../public/images/icon/Next';
import ReloadIcon from '../../../public/images/icon/ReloadIcon';
import TextInput from '@/components/ui/TextInput';
import EmailIcon from '../../../public/images/icon/EmailIcon';
import TextInputWithIcon from '@/components/ui/TextInputWithIcon';
import PadlockIcon from '../../../public/images/icon/PadlockIcon';
import Button from '@/components/ui/Button';
import ProcessLoader from '@/components/ui/ProcessLoader';
import ErrorCard from '@/components/ui/ErrorCard';
import SuccessCard from '@/components/ui/SuccessCard';

const Register = () => {
   const nigeriaStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
    'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
    'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ];

  const [ firstname, setFirstname ] = useState('');
  const [ lastname, setLastname ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ gender, setGender ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ residence, setResidence ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ acceptTerms, setAcceptTerms ] = useState(false);
  const [ dob, setDob ] = useState('');

  const { state, dispatch } = useContext(Store);
  const { user : { userDetails } ,} = state;
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [dayError, setDayError]=useState(false);
  const [yearError, setYearError]=useState(false);
  const [formattedDate, setFormattedDate] = useState('');
  const router = useRouter();
  const { ref } = router.query; // Get the referrer from the URL query

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [ toConfirmPage, setToConfirmPage ] = useState(false);
  const [ toAuthPage, setToAuthPage ] = useState(false);
  const [toFormPage, setToFormPage ] = useState(true);

  const [ loadingConfirm, setLoadingConfirm ] = useState(false);
  const [ confirmText, setConfirmText ] = useState('Confirm');
  const [ requestText, setRequestText ] = useState('Request code');
  const [ regText, setRegText ] = useState('Register');
  const [ loading, setLoading ] = useState(false);

  const [ isOtpInvalid, setIsOtpInvalid ] = useState(false);
  const [ showConflictError, setShowConflictError ] = useState(false);
  const [ conflictError, setConflictError ] = useState("Unkwon error");
  const [ showError, setShowError ] = useState(false);
  const [ activeInput, setActiveInput ] = useState(0);
  const [ boxArray, setBoxArray ] = useState(['', '', '', '', '', '']);
  const [ isOtpSent, setIsOtpSent ] = useState(false);
  const [ sendOtpError, setSendOtpError ] = useState(false);
  const [ loadingOtpConfirm, setIsLoadingOtpConfirm ] = useState(false);
  const [ toConfirmPageError, setConfirmPageError ] = useState('');
  const [ showConfirmPageError, setShowConfirmPageError ] = useState(false);
  const [ confirmOtpPageError, setConfirmOtpPageError ] = useState('');
  const [ showConfirmOtpPageError, setShowConfirmOtpPageError ] = useState(false);
  const [ isVerifyingOtp, setIsVerifyingOtp ] = useState(false);
  
  const [ timer, setTimer ] = useState(60);
  const [ timerDisplay, setTimerDisplay ] = useState(true);
  const [ allowSubmit, setAllowSubmit ] = useState(true);

  const isFormFilled = () => {
    const val = firstname.length && phone.length && lastname.length && dob.length && email.length && password.length && phone.length>11 && gender.length && residence.length && password.length>5 && password===confirmPassword && acceptTerms;
    return val;
  }

  // Update otp focus
  useEffect( () => {
    const inputBox = document.getElementById(`otp-${activeInput}`);
    if (inputBox) {
        inputBox.focus();
    }
  }, [activeInput]);

  const otpBorderRed = (notVerified) => {
    if (notVerified) {
      boxArray.map( (_, index) => {
        const inputBox = document.getElementById(`otp-${index}`);
        inputBox.style.borderColor = 'red';
      })
    } else {
      boxArray.map( (_, index) => {
        const inputBox = document.getElementById(`otp-${index}`);
        inputBox.style.borderColor = 'gray';
      })
    }
  }

  const handleInput = ( e, index) => {
    if (isOtpInvalid) {
        otpBorderRed(false)
        setIsOtpInvalid(false);
    }
    const str = e.target.value;
    // only accept digits. if non-digit ignore
    if (!/^\d*$/.test(e.target.value)) return 

    // update the OTP state and take only the last digit
    const newOtp = [...boxArray];
    newOtp[index] = str.slice(-1);
    setBoxArray(newOtp);

    // if digit was entered and was not the last digit move to the next box
    if ( str && (index < boxArray.length-1) ) {
        setActiveInput(index+1);
    }
  };

  const handleKeyDown = ( e, index ) => {
    if ( e.key === 'Backspace' && boxArray[index] === '' ) {
        setActiveInput(index-1);
    }
  };

    // loads the confirm page
  const today = new Date();
  function toConfirm() {
      const dateOfBirth = new Date(dob);
      const age= today.getFullYear()-dateOfBirth.getFullYear();
      
      if( age<18 ){
        return( alert("underage! cannot register below 18years old") );
      };
      setToConfirmPage(true);
      setToFormPage(false);
      setToAuthPage(false);
  }

  const toConfirmDetails = async (e) => {
    e.preventDefault();
    setShowConflictError(false);

    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) === false) {
      handleRegFormError('Please enter a valid email address');
      router.push('/account/reg#top');
      return;
    }
    setLoadingConfirm(true);
    // check if account with email already exists
    try {
      const response = await axios.get(`/api/auth/checkUserConflict?email=${email}&phone=${phone}`);

      if (response.data.exists) {
        handleRegFormError(response.data.message);
        setLoadingConfirm(false)
        router.push('/account/reg#top');
      } else {
        toConfirm();
        setLoadingConfirm(false)
      }
    } catch (err) {
      setLoadingConfirm(false)
      alert('Network error: please check your internet connection and try again');
    }
  }

  const handleRegFormError = (error) => {
      setShowConflictError(true);
      setConflictError(error);
  }

  function allow () {
    setTimer(60);
    setAllowSubmit(true);
    setTimerDisplay(false)
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

  const sendOtp = async () => {
    const data = { email };
    const response = await axios.post('/api/verification/generate-otp', data)
    const otpEmailTemplate = (otpCode) => { 
      return ` <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color:rgb(1, 212, 85);">Your OTP Code</h1>
        </div>
        <p>Hello,</p>
        <p>Thank you for using our service. To complete your request, please use the following One-Time Password (OTP):</p>
        <p style="font-size: 24px; font-weight: bold; color:rgb(1, 212, 85); text-align: center; background: #f9f9f9; padding: 10px; border: 1px dashed #ddd; display: inline-block;">${otpCode}</p>
        <p>This code is valid for the next <strong>10 minutes</strong> and can only be used once. If you did not request this code, please ignore this email.</p>
        <p>For your security, please do not share this code with anyone.</p>
        <p>Best regards,<br>The Across Nigeria Reality TV Show Team</p>
        <hr>
        <footer style="text-align: center; font-size: 14px; color: #666;">
        &copy; ${new Date().getFullYear()} Acrossnig. All rights reserved.<br>
        Need help? Contact us at <a href="mailto:support@acrossnig.com">support@acrossnig.com</a>
        </footer>
    </div>`
    };
    const content = otpEmailTemplate(response.data.token);
    const dataEmail = { 
      recepient: email,
      subject: 'Your OTP Code for Acrossnig',
      content,
      heading: 'verification',
    };

    const isEmailSent = await axios.post('/api/mail/mail', dataEmail );
    console.log(isEmailSent.data.message)
    return true;
  
  }

  const retrySendOtp = async () => {
    setSendOtpError(false);
    const isOtpSent = await sendOtp();
    if ( isOtpSent ) {
      setLoading(false);
      setAllowSubmit(false);
      setToAuthPage(true);
      setToConfirmPage(false);
    } else {
      setSendOtpError(true)
    }
  }

  const requestNewOtp = async () => {
    setRequestText('Requesting...');
    try {
      const newOtpSent = await sendOtp();
      if (newOtpSent) {
        setIsOtpSent(true);
        setAllowSubmit(false);
        setTimer(60);
        setTimerDisplay(true)
        setRequestText('Request code')

        const counter = setTimeout(() => {
          setIsOtpSent(false);
          clearTimeout(counter);
        }, 10000);
      }
    } catch (err) {
      handleOtpConfirmPageError(err.message);
    }

  }

  const verifyOtp = async () => {
    setIsVerifyingOtp(true);

    let otpCode = ''
    boxArray.map((val)=>{
        otpCode = otpCode.concat(val)
    });

    const data = { token:otpCode, email };
    let response;
    let isVerified;
    try {
      response = await axios.post('/api/verification/verify-otp', data);
      isVerified = response.data.isVerified;
      if (isVerified) {
        initiateReg();
      } else {
        setIsOtpInvalid(true);
        otpBorderRed(true);
        const count = setTimeout(() => {
          setIsOtpInvalid(false);
        }, 10000);
        setConfirmText('Confirm');
      }
    } catch (err) {
      handleOtpConfirmPageError(err.message);
    }
    setIsVerifyingOtp(false);
  }

  // handle errors in OTP confirm page
  const handleOtpConfirmPageError = (error) => {
    setConfirmOtpPageError(error);
    setShowConfirmOtpPageError(true);
  }

  // valiadtes user details in the form and moves user to the verification page
  const toVerificationPage = async () => {
    setIsLoadingOtpConfirm(true);

    try {
      await sendOtp();
      setAllowSubmit(false);
      setToAuthPage(true);
      setToConfirmPage(false);
      
    } catch (error) {
      handleConfirmPageError(error.message);
    }
    setIsLoadingOtpConfirm(false)

  }

  const handleConfirmPageError = (error) => {
    setConfirmPageError(error);
    setShowConfirmPageError(true);
  }

  // Registration function
  const initiateReg =  async () => {

    function generateRandomCode() {
      const characters = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789';
      let result = '';
      const charactersLength = characters.length;
      for (let i = 0; i < 7; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }

    const referee = ref?ref:undefined;
    const randomCode = generateRandomCode();
    const refCode= firstname.slice(0, 3).trim()+randomCode;
    const refInfo = 'free reg';

    Cookies.set('refCode',refCode, {expires:1});
    localStorage.setItem("refCode",refCode);

    const data = {
      name : firstname,
      surname: lastname,
      email,
      phone,
      residence,
      dob,
      gender,
      password,
      refInfo,
      refCode,
      referee
    }
    setLoading(true);

    try {
      const regData = await axios.post('/api/auth/signup', data);
      const result = await signIn('credentials', {
          redirect: false,
          email,
          password,
      });
      if (result.error) {
          console.log(result.error);
      }
      router.push('/account/registration-success');

    } catch (err) {
      setLoading(false)
      console.log("Error in the page:")
    }
  }


  // handles change in day
  const handleDayChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and limit to 2 characters
    if (/^\d{0,2}$/.test(value)&&value<=31) {
      setDay(value);
      setDayError(false)
    }else{setDayError(true)}
  };

  // handles change in year
  const handleYearChange = (e) => {
    const value = e.target.value;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    // Allow only numbers, limit to 4 characters and make compares the year with present year to make sure userAge>=18
    if (/^\d{0,4}$/.test(value)&&value<=(currentYear-18)) {
      setYear(value);
      setYearError(false)
      if(value.length>=4&&value<1900){
        setYearError(true)
        setYear("")}
          }
    else{setYearError(true)}
  };

  useEffect(()=>{
    const formatEnteredDate = () => {
      // Ensure all parts of the date are entered
      if (day && month && year) {
        // Format the date as YYYY-MM-DD
        setFormattedDate(`${year}-${month}-${day.padStart(2, '0')}`);
        // setFormData({...formData, dob:formattedDate})
        setDob(formattedDate)
      }
    };
    formatEnteredDate();
  }, [day,month, year,formattedDate]);

  const  handleTermsCheckboxChange = (val) => { setAcceptTerms(val) };// sets and unsets tac checkbox
  
  // show and hide password inputs
  const togglePasswordVisibility1 = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };



  // --------PAYMENT ENABLED REGISTRATION HANDLER----------
  // async function beginPayment() {
  //   const formData = { name: firstname, surname: lastname, email, phone, residence, gender, password, dob };
  //   try {
  //     dispatch({type:'RESET'});
  //     dispatch({type:'ADD_USER', payload: formData });
  //     Cookies.set( 'user', JSON.stringify({...user,userDetails:formData,}) );
  //     localStorage.setItem('referee',ref);
  //     await router.push( { pathname:'/paystack' });
  //   } catch ( err ) {
  //     console.log(err.message);
  //   }

  // }

  useEffect( () => {
    document.addEventListener("DOMContentLoaded", () => {
      configureMeta("Register - Across Nigeria Reality Show Login Page",
        "Registration page for Across Nigeria Reality Show users",
        "Across Nigeria, Reality TV Show, Sign Up, Register, Entertainment, Prizes, Game Shows, Giveaways",
        "/images/frontBanner.JPG",
        "https://acrossnig.com/account/register"
      );
    })
  })

  return (
    <div className='flex flex-col bg-gray-100'>
      <Loader/>
      <div className={`${toAuthPage || toConfirmPage ? 'hidden':''} flex flex-row absolute justify-start top-[3.5%] left-[3.5%]`}>
          <Link href={'/'}><Close size="20px" bg="black"/></Link> 
      </div>

      <div className={`${toFormPage?'':'hidden'} pt-[40px]`}>

        <div className='text-center flex flex-row justify-center gap-1 items-center'>
          <Image src={logo1} alt='logo' placeholder='blur' className='h-[30px] w-[35px]' />
          <div className='flex flex-col justify-center items-start'>
            <span className='text-[14px] font-bold text-green-700'>ACROSS NIGERIA</span>
            <span className='text-[12px] text-green-500'>REALITY SHOW</span>
          </div>
        </div>

        <div id='top' className='flex flex-col max-w-[450px] px-4 mx-auto mt-7'>
          <span className="text-center font-bold text-[20px]">Sign Up</span>
          <span style={{lineHeight:'22px'}} className="text-center mt-1 text-gray-500 text-[16px]">Giveaways, game shows, and entertainment. Your journey starts here.</span>
        </div>

        {/* <Layout> */}
        <div className="mx-auto bg-gray-100 mt-[20px] border-1 border-gray-400 md:max-w-[450px] max-w-[95%] pb-[50px] mb-[100px]">
          {/* handleSubmit */}
          <form onSubmit={toConfirmDetails} className="md:max-w-[517px] flex px-4 flex-col mt-[20px] max-w-full mx-auto">

            <ErrorCard error={conflictError} className={'mb-2'} setShowError={setShowConflictError} showError={showConflictError}/>

            <div className='mb-4 flex flex-row justify-between items-center w-[100%]'>
              <TextInput placeholder={'e.g Bola'} label={'First name'} className={'w-[48%]'} value={firstname} onChange={(e)=>{setShowError(false);setFirstname(e.target.value)}} />
              <TextInput placeholder={'e.g Musa'} label={'Last name'} className={'w-[48%]'} value={lastname} onChange={(e)=>{setShowError(false);setLastname(e.target.value)}} />
            </div>

            <TextInputWithIcon icon={<EmailIcon/>} placeholder={'e.g bolamusa@gmail.com'} label={'Email address'} className={'mb-4'} value={email} onChange={(e)=>{setShowError(false);setEmail(e.target.value)}}/>

            <div className='mb-4'>
              <label htmlFor="dob" className="block text-[16px] ml-1 mb-1">Date of Birth</label>
              <div className="flex justify-between items-center rounded-[15px] contain flex-row">
                <input
                  type="number"
                  value={day}
                  onChange={handleDayChange}
                  placeholder="Day"
                  className="h-[45px] text-[16px] w-[32%] bg-gray-100 px-2 py-1 rounded-[5px] leading-tight border-gray-400 border-[0.5px] outline-[0.5px] outline-green-500"
                />

                <select value={month}  onChange={(e) => setMonth(e.target.value)}className="h-[45px] text-[16px] w-[32%] bg-gray-100 px-2 py-1 rounded-[5px] leading-tight border-gray-400 border-[0.5px] outline-[0.5px] outline-green-500" >
                  <option className='focus:bg-green-500 checked:bg-green-500 text-gray-400' value="" disabled>Month</option>
                  <option className='focus:bg-green-500 checked:bg-green-500 hover:bg-green-500 accent-green-500' value="01">January</option>
                  <option className='focus:bg-green-500 checked:bg-green-500 hover:bg-green-500 accent-green-500' value="02">February</option>
                  <option className='focus:bg-green-500 checked:bg-green-500 hover:bg-green-500 accent-green-500' value="03">March</option>
                  <option className='focus:bg-green-500 checked:bg-green-500 hover:bg-green-500 accent-green-500' value="04">April</option>
                  <option className='focus:bg-green-500 checked:bg-green-500 hover:bg-green-500 accent-green-500' value="05">May</option>
                  <option className='focus:bg-green-500 checked:bg-green-500 hover:bg-green-500 accent-green-500' value="06">June</option>
                  <option className='focus:bg-green-500 checked:bg-green-500 hover:bg-green-500 accent-green-500' value="07">July</option>
                  <option className='focus:bg-green-500 checked:bg-green-500 hover:bg-green-500 accent-green-500' value="08">August</option>
                  <option className='focus:bg-green-500 checked:bg-green-500 hover:bg-green-500 accent-green-500' value="09">September</option>
                  <option className='focus:bg-green-500 checked:bg-green-500 hover:bg-green-500 accent-green-500' value="10">October</option>
                  <option className='focus:bg-green-500 checked:bg-green-500 hover:bg-green-500 accent-green-500' value="11">November</option>
                  <option className='focus:bg-green-500 checked:bg-green-500 hover:bg-green-500 accent-green-500' value="12">December</option>
                </select>

                <input type="number" value={year} min={1900} onChange={handleYearChange} placeholder="Year" className="h-[45px] text-[16px] w-[32%] bg-gray-100 px-2 py-1 rounded-[5px] leading-tight border-gray-400 border-[0.5px] outline-[0.5px] outline-green-500"/>
              </div>
            </div>

            {yearError&&<span className='text-red-600 text-sm'>Please only enter Years not Earlier than 1900 and not later than {today.getFullYear()-18}</span>}  
            {dayError&&<span className='text-red-600 text-sm'>Please only enter days between 1-31</span>}  
            
            <div className="mb-4">
              <label htmlFor="phone" className="block mb-2">Phone Number</label>
              <div className='w-full h-[45px] text-[16px] bg-gray-100 flex flex-row items-center rounded-[5px] leading-tight border-gray-400 border-[0.5px] outline-[0.5px] outline-green-500'>
              <PhoneInput 
              defaultCountry='ng'
              required
              inputStyle={{fontSize:'18px', backgroundColor:' #f3f4f6', height:'40px', borderTop:'none', borderLeft:'1px solid #d1d5db', borderRight:'none', borderBottom:'none'}}
              countrySelectorStyleProps={{ buttonStyle:{backgroundColor:' #f3f4f6', height:'40px', width:'100%', borderTop:'none', borderLeft:'none', borderBottom:'none'}}}
              onChange={ (phone)=>setPhone(phone)}
              name='phone'
              value={phone}/></div>
            </div>

            <div className="mb-4">
              <label htmlFor="state" className="block mb-2">State of Residence</label>
              <select
                id="residence"
                name="residence"
                value={residence}
                placeholder='Residence'
                onChange={ (e)=>setResidence(e.target.value) }
                className="w-full h-[45px] text-[16px] bg-gray-100 px-3 rounded-[5px] leading-tight border-gray-400 border-[0.5px] outline-[0.5px] outline-green-500"
                required >
                <option value="">Select State</option>
                {nigeriaStates.map((residence) => (
                  <option className='text-[14px]'  key={residence} value={residence}>{residence}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="gender" className="block mb-2">Gender</label>
              <div className="flex text-[18px] text-gray-800 font-semibold ">

                <label htmlFor="male" className="mr-4">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    onChange={ (e) => setGender( e.target.value)}
                    checked={gender === 'male'}
                    className="mr-2 h-[17px] w-[17px] accent-green-700"
                  />
                  Male
                </label>

                <label htmlFor="female">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    onChange={ (e)=>setGender(e.target.value) }
                    checked={gender === 'female'}
                    className="mr-2 h-[17px] w-[17px] accent-green-700"
                  />
                  Female
                </label>

              </div>
            </div>
            {/* <div className='mb-4'>
              <label className='mb-2 block mr-4' htmlFor='referalCode'>Referal Code</label>
              <input
              className='w-full rounded px-4 py-2 focus:outline-gray-600 bg-gray-200'
              type='text' 
              placeholder='Input Referal code if you have one'/>
            </div> */}
            <div className="mb-4">
              <TextInputWithIcon type={showPassword?'text':'password'} icon={<PadlockIcon/>} label={'Password'} placeholder={"Password"} value={password} onChange={(e)=>{setConflictError(false);setPassword(e.target.value)}}>
                <button type="button" style={{height:'100%'}} className={`right-0 px-[5px] w-fit` } onClick={togglePasswordVisibility1} >
                    {showPassword? <EyeOpen/>: <EyeClose/>}
                </button>
              </TextInputWithIcon>

              {password && password.length<6 && (
                <p className="text-red-500 font-thin text-[13px] ">Passwords must have Six(6) or more characters</p>
              )}
            </div>

            <div className="mb-4">
              <TextInputWithIcon type={showPassword2?'text':'password'} icon={<PadlockIcon/>} label={'Confirm password'} placeholder={"Confirm your password"} value={confirmPassword} onChange={(e)=>{setConflictError(false);setConfirmPassword(e.target.value)}}>
                <button type="button" style={{height:'100%'}} className={`right-0 px-[5px] w-fit` } onClick={togglePasswordVisibility2} >
                    {showPassword2? <EyeOpen/>: <EyeClose/>}
                </button>
              </TextInputWithIcon>

              {confirmPassword &&
                password !== confirmPassword && (
                  <p className="text-red-500 font-thin text-[13px]">Passwords don&apos;t match</p>
              )}
            </div>

            <div className="mb-4">
                <Checkbox handleTermsCheckboxChange={handleTermsCheckboxChange}/>
            </div>

            <Button size={'md'} disabled = {!isFormFilled() | loadingConfirm} type='submit'>
              {loadingConfirm?<ProcessLoader/>:"Register"}
            </Button>

            <div className='mt-[30px] text-[16px] text-center text-gray-500'>Already have an Account? <Link className="text-black underline" href="#" onClick={()=>router.push("/account/login")}>Login</Link></div> 
          </form>
        </div>
        {/* </Layout> */}
      </div>

        {/* Email aunthentication */}
      <div className='flex flex-col mx-auto h-screen px-4 md:pt-[50px] pt-[30px bg-gray-100 mt-[20px] md:max-w-[450px] max-w-[95%]' style={{ display:(toAuthPage?'flex':'none'), alignSelf:'center'}}>

        <div className='absolute z-50 top-[3.5%] left-[3.5%]'>
          <button onClick={()=>{setToAuthPage(false);setToConfirmPage(true)}} className='flex flex-row justify-center cursor-pointer mb-[35px] hover:underline items-center gap-2'>
            <div className='rotate-180'>
              <Next bg={'black'} size={'20px'}/>
            </div>
            <span className='md:flex hidden'>Go Back</span>
          </button>
        </div>

        <div className='flex mt-[50px] text-center flex-col'>
          <span className='text-[22px] font-bold mb-2'>Verify your identity</span>
          <span className='text-[16px] text-gray-500'>We sent you a 6-digit code via your email </span>
          <span className='text-[16px] underline'>{email}</span>
        </div>

        <div>
          <ErrorCard className={'mt-2'} error={'Invalid Otp'} setShowError={setIsOtpInvalid} showError={isOtpInvalid}/>
          <div className="flex flex-row gap-2 w-[95%] mt-5 mb-3 mx-auto justify-center items-center">
            { boxArray.map( (_, index) => {
                return <input key={index} pattern="\d*" onKeyDown={(e) => handleKeyDown(e, index)} inputMode="numeric" id={`otp-${index}`} value={boxArray[index]} onChange={(e)=>{handleInput(e, index)}} className='h-[50px] md:w-[50px] w-[15%] border-[1px] border-gray-400 rounded-[5px] text-center bg-transparent' type="tel" maxLength={1} />
            
            })}
          </div>
          <SuccessCard className={'mb-1'} message={`New otp code sent to ${email}`} showSuccess={isOtpSent}/>
          <div className='flex flex-col gap-2 justify-start'>
            <span className={`${timerDisplay?'opacity-100':'opacity-0'}`}>You can request a new OTP code in {timer}s </span>
            <button disabled={allowSubmit?false:true} onClick={requestNewOtp} className={`${allowSubmit?'hover:text-green-700 hover:scale-95':'text-gray-500 cursor-not-allowed'} w-fit text-green-600 font-semibold`}>{requestText}</button>
          </div>
        </div>
        <div className='mt-[50px]'>
          <Button className='w-full' onClick={verifyOtp} disabled={isVerifyingOtp} size={'md'}>
            {isVerifyingOtp ? <ProcessLoader/> : "Confirm"}
          </Button>
        </div>

      </div>


    {/* confirmation page */}
      <div className='flex flex-col mx-auto h-screen px-4 md:pt-[50px] pt-[50px] bg-gray-100 mt-[20px] md:max-w-[450px] max-w-[95%]' style={{ display:(toConfirmPage?'block':'none'), alignSelf:'center'}}>
        <div className='md:w-[400px] mx-auto w-[100%] flex flex-col justify-center'>

          <div className='absolute z-50 top-[3.5%] left-[3.5%]'>
            <button onClick={()=>{setToConfirmPage(false);setToFormPage(true)}} className='flex flex-row justify-center cursor-pointer mb-[35px] hover:underline items-center gap-2'>
              <div className='rotate-180'>
                <Next bg={'black'} size={'20px'}/>
              </div>
              <span className='md:flex hidden'>Go Back</span>
            </button>
          </div>

          <div className="text-[22px] font-bold text-center">Confirm your details</div>
          <div className='mb-5 text-gray-500 text-center'>
            <span>Please, we&apos;d like you to verify your details below.</span>
          </div>
          <ErrorCard error={toConfirmPageError} setShowError={setShowConfirmPageError} showError={showConfirmPageError}/>
          <div className='mb-6'>
            <div>First name: <span className='text-gray-600 font-semibold'> { firstname }</span></div>
            <div className='mt-[7px]'>Last name: <span className='text-gray-600 font-semibold'> { lastname } </span></div>
            <div className='mt-[7px]'>Date of birth: <span className='text-gray-600 font-semibold'> { dob } </span></div>
            <div className='mt-[7px]'>Email address: <span className='text-gray-600 font-semibold'> { email } </span></div>
            <div className='mt-[7px]'>Phone number: <span className='text-gray-600 font-semibold'> { phone } </span></div>
            <div className='mt-[7px]'>Residence: <span className='text-gray-600 font-semibold'> { residence } </span></div> 
            <div className='mt-[7px]'>Gender: <span className='text-gray-600 font-semibold'> { gender } </span></div>
          </div>
          <Button cl disabled={loadingOtpConfirm} size={'md'} onClick={toVerificationPage}>
            { loadingOtpConfirm ? <ProcessLoader/> : "Continue" }
          </Button>
        </div>
    
      </div>

      { /* Loader */} 
      <div className={`${loading?'':'hidden'} absolute z-[10000] bg-gray-50 top-0 right-0 h-screen w-screen flex flex-row justify-center items-center`}>
        { !sendOtpError && (<CycleLoader/>)}
        { sendOtpError && (
          <div onClick={retrySendOtp} className='flex flex-col justify-center items-center gap-4'>
            <span className='text-center text-[13px] text-red-600'>Something Went wrong, please tap below in a few minutes to retry.</span>
            <ReloadIcon size={'20px'} bg={'gray'}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;

