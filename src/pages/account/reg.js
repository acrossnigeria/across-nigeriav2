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
import BackIcon from '../../../public/images/icon/BackIcon';
import CycleLoader from '@/components/CycleLoader';
import { setConfig } from 'next/config';
import logo1 from "../../../public/images/logo1.png";
import Image from 'next/image';
import Next from '../../../public/images/icon/Next';

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
  const [ toConfirmPage, setToConfirmPage ] = useState(true);
  const [ toAuthPage, setToAuthPage ] = useState(false);
  const [toFormPage, setToFormPage ] = useState(false);

  const [ confirmText, setConfirmText ] = useState('Confirm');
  const [ requestText, setRequestText ] = useState('Request code');
  const [ regText, setRegText ] = useState('Register');
  const [loading, setLoading ] = useState(false);

  const [ isOtpInvalid, setIsOtpInvalid ] = useState(false);
  const [ showEmailExistError, setShowEmailExistError ] = useState(false);
  const [ activeInput, setActiveInput ] = useState(0);
  const [ boxArray, setBoxArray ] = useState(['', '', '', '', '', '']);
  const [ isOtpSent, setIsOtpSent ] = useState(false);
  
  const [ timer, setTimer ] = useState(60);
  const [ timerDisplay, setTimerDisplay ] = useState(true);
  const [ allowSubmit, setAllowSubmit ] = useState(true);

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
  }

    // loads the confirm page
  const today=new Date();
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
    setRegText('Loading...');
    // check if account with email already exists
    try {
      const response = await axios.get(`/api/findUser?email=${email}`);

      if (response.data.exists) {
        setShowEmailExistError(true);
        setRegText('Register');
        router.push('/account/reg#Surname');
      } else {
        toConfirm();
        setRegText('Register');
      }
    } catch (err) {
      console.log(err.message)
      setRegText('Register');
      alert('Network error: please check your internet connection and try again');
    }
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
        <h1 style="color: #007BFF;">Your OTP Code</h1>
        </div>
        <p>Hello,</p>
        <p>Thank you for using our service. To complete your request, please use the following One-Time Password (OTP):</p>
        <p style="font-size: 24px; font-weight: bold; color: #007BFF; text-align: center; background: #f9f9f9; padding: 10px; border: 1px dashed #ddd; display: inline-block;">${otpCode}</p>
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

  const requestNewOtp = async () => {
    setRequestText('Requesting...')
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
      setRequestText('Request code');
      alert('Network error: please check your internet connection')
    }

  }

  const verifyOtp = async () => {
    setConfirmText('Verifying...');
    let otpCode = ''
    boxArray.map((val)=>{
        otpCode = otpCode.concat(val)
    });
    console.log(otpCode)
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
      alert('please check your internet connection');
      setConfig('Confirm');
    }
  }

  const toVerificationPage = async () => {
    setLoading(true);
    const isOtpSent = await sendOtp();
    if (isOtpSent) {
      setLoading(false);
      setAllowSubmit(false);
      setToAuthPage(true);
      setToConfirmPage(false);
    } else {
      setLoading(false);
    }

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

  const {user}= state;
  const  handleTermsCheckboxChange = (isChecked) => {setAcceptTerms(true)};// sets and unsets tac checkbox
  
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

  return (
    <div className='flex flex-col bg-white'>
      <Loader/>
      <div className={`${toAuthPage || toConfirmPage ? 'hidden':''} flex flex-row justify-end px-8 py-3`}>
          <Link href={'/'}><Close/></Link> 
      </div>
      <div className={`${toFormPage?'':'hidden'} pt-[40px]`}>
        <div className='text-center flex flex-row justify-center gap-1 items-center'>
          <Image src={logo1} alt='logo' placeholder='blur' className='h-[45px] w-[50px]' />
          <div className='flex flex-col justify-center items-start'>
            <span className='text-[16px] font-bold text-green-700'>ACROSS NIGERIA</span>
            <span className='text-[14px] text-green-500'>REALITY SHOW</span>
          </div>
        </div>

        {/* <Layout> */}
        <div className="mx-auto bg-gray-100 mt-[50px] border-t-1 border-t-gray-500 rounded-t-[30px] pb-[50px]">
          {/* handleSubmit */}
          <form onSubmit={toConfirmDetails} className="md:max-w-[517px] flex px-4 flex-col mt-[20px] max-w-full mx-auto">
            <div className='flex flex-col md:w-[100%] w-[300px] mx-auto mt-[5px]'>
              <span className="text-center font-bold text-[19px]">Welcome!</span>
              <span style={{lineHeight:'22px'}} className="text-center mt-1 mb-9 text-[16px]">Giveaways, game shows, and entertainment. Your journey starts here.</span>
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">Name</label>
              <input
                type="text"
                placeholder='First name'
                id="name"
                name="name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="w-full border-gray-400 border-1 h-[45px] px-3 outline-none rounded-[15px] bg-gray-200"
                required
                autoFocus
              />
            </div>
            <div className="mb-4">
              <label htmlFor="surname" className="block mb-2">Surname</label>
              <input
                type="text"
                id="Surname"
                placeholder='Surname'
                name="surname"
                value={lastname}
                onChange={ (e)=>setLastname(e.target.value) }
                className="w-full border-gray-400 border-1 h-[45px] px-3 outline-none rounded-[15px] bg-gray-200"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="surname" className="block mb-2">Email</label>
              <input
                type="text"
                id="Email"
                placeholder='email'
                name="email"
                value={email}
                onChange={ (e)=>setEmail(e.target.value) }
                className="w-full border-gray-400 border-1 h-[45px] px-3 outline-none rounded-[15px] bg-gray-200"
                required
              />
              <div className={`${showEmailExistError?'':'hidden'} text-red-500 text-[14px]`}>An account with this email already exists. please try logging in or use a different email to create a new account.</div>
            </div>
    <div className='mb-4'>
      <label htmlFor="dob" className="block mb-2">Date of Birth</label>
          <div className="flex space-x-2 bg-gray-200 rounded-[15px] border contain flex-shrink">
            <input
              type="number"
              value={day}
              onChange={handleDayChange}
              placeholder="Day"
              className="col-span-1 border h-[48px] text-[18px] md:text-lg w-[50px] sm:w-32 md:w-32  block appearance-none bg-gray-100 pl-1 py-0
              md:px-4 md:py-2 rounded-[15px] shadow leading-tight focus:outline-none focus:shadow-outline"
            /><span className='text-3xl font-thin'>/</span>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="col-span-1 border text-[18px] text-gray-700 md:text-lg md:w-40 w-[120px] block appearance-none bg-gray-100 pl-1 py-0
              md:px-4 md:py-2 rounded-[15px] leading-tight focus:outline-none focus:shadow-outline"

            >
              <option className='focus:bg-green-500 checked:bg-green-500' value="" disabled>-Select Month-</option>
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
            </select><span className='text-3xl font-thin'>/</span>
            <input
              type="number"
              value={year}
              onChange={handleYearChange}
              placeholder="Year"
              className="col-span-1 border h-[48px] text-[18px] md:text-lg md:w-40 flex-grow w-full md:max-w-[140px] appearance-none bg-gray-100 px-2 
              py-0 md:px-4 md:py-2 rounded-[15px] shadow leading-tight focus:outline-none focus:shadow-outline"
            />
          </div></div>

        {yearError&&<span className='text-red-600 text-sm'>Please only enter Years not Earlier than 1900 and not later than {today.getFullYear()-18}</span>}  
        {dayError&&<span className='text-red-600 text-sm'>Please only enter days between 1-31</span>}  
            
            <div className="mb-4">
              <label htmlFor="phone" className="block mb-2">Phone Number</label>
              <div className='w-full bg-gray-200 rounded-[15px] px-1 border-gray-400 border-1'>
              <PhoneInput 
              defaultCountry='ng'
              required
              inputStyle={{fontSize:'18px', backgroundColor:'#e5e7eb', height:'48px', borderTop:'none', borderLeft:'1px solid gray', borderRight:'none', borderBottom:'none'}}
              countrySelectorStyleProps={{ buttonStyle:{backgroundColor:'#e5e7eb', height:'48px', width:'100%', borderTop:'none', borderLeft:'none', borderBottom:'none', borderRadius:'15px'}}}
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
                className="w-full border-gray-400 border-1 h-[45px] px-3 outline-none rounded-[15px] bg-gray-200"
                required
              >
                <option value="">Select State</option>
                {nigeriaStates.map((residence) => (
                  <option className='text-[14px]'  key={residence} value={residence}>{residence}</option>
                ))}
              </select>
            </div>
            <div className='mb-4'></div>
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
              <label htmlFor="password" className="block mb-2">Password</label>
              <div className=' bg-gray-200 flex flex-row justify-between w-full border-gray-400 border-1 h-[45px] px-3 outline-none rounded-[15px]'>
                <input type={showPassword?'text':'password'}
                  id="password"
                  name="password"
                  placeholder='Password'
                  value={password}
                  onChange={ (e)=>setPassword(e.target.value) }
                  className="border outline-none  w-[75%] text-[19px] bg-gray-200 rounded px-4 py-2"
                  required
                />  <button
                    type="button"
                  className={`right-0 w-fit ${showPassword?"":""} px-2 rounded-r-md py-2 ` }
                    onClick={togglePasswordVisibility1}
                  >
                    {showPassword ? <EyeOpen/> : <EyeClose/>}
                  </button>
                </div>
                {password && password.length<6 && (
                  <p className="text-red-500 font-thin ">Passwords must have Six(6) or more characters</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block mb-2">Confirm Password</label>
              <div className=' bg-gray-200 flex flex-row justify-between w-full border-gray-400 border-1 h-[45px] px-3 outline-none rounded-[15px]'>
                <input
                  type={showPassword2?'text':'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  placeholder='Confirm Password'
                  onChange={ (e)=>setConfirmPassword(e.target.value) }
                  className="w-[75%] text-[19px] outline-none bg-gray-200 rounded px-4 py-2"
                  required
                />
                <button
                    type="button"
                    className={`right-0 w-fit ${showPassword2?"":""} px-2 rounded-r-md py-2` }
                    onClick={togglePasswordVisibility2}
                  >
                    {showPassword2 ? <EyeOpen/> : <EyeClose/>}
                </button>
              </div>
          
            </div>
            <div> {confirmPassword &&
                password !== confirmPassword && (
                  <p className="animate-bounce text-red-700 font-thin">Passwords don&apos;t match</p>
              )}</div>
              <div className="mb-4">
                <Checkbox handleTermsCheckboxChange={handleTermsCheckboxChange}/>
            </div>
            <div style={{alignSelf:'center'}} className="flex w-full justify-between mt-2">
              {firstname.length && phone.length && lastname.length && dob.length && email.length &&
                password.length && phone.length>11 && gender.length && residence.length && password.length>5 && password===confirmPassword && acceptTerms? (
                <button
                  type="submit"
                  className="text-white w-[100%] h-[45px] py-2 rounded-[30px] bg-green-700 hover:bg-green-900 active:bg-green-950"
                >
                  {regText}
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={true}
                  className="text-white w-[100%] h-[45px] py-2 rounded-[30px] bg-gray-300"
                >
                  Sign Up
                </button>
              )}
            </div>
            <div className='mt-[30px] text-center'>Already have an Account? <Link className="text-green-500 underline font-semibold" href="#" onClick={()=>router.push("/account/login")}>Login</Link></div> 
          </form>
        </div>
        {/* </Layout> */}
      </div>

        {/* Email aunthentication */}
      <div className='flex flex-col max-w-[700px] h-screen w-[100%] px-4 md:pt-[50px] pt-[30px] pb-[50%]' style={{ display:(toAuthPage?'flex':'none'), alignSelf:'center'}}>
        <div>
          <button onClick={()=>{setToAuthPage(false);setToConfirmPage(true)}} className='flex flex-row justify-center items-center gap-2'>
            <div className='rotate-180'>
              <Next bg={'black'} size={'25px'}/>
            </div>
            <span className='md:flex hidden'>Go Back</span>
            </button>
        </div>

        <div className='flex mt-[30px] md:text-center text-left flex-col'>
          <span className='text-[23px] font-bold mb-2'>Verify your identity</span>
          <span>We sent you a 6-digit code via your email </span>
          <span className='font-bold'>{email}</span>
        </div>

        <div>
          <div className={`${isOtpInvalid?'opacity-100':'opacity-0'} text-[15px] text-red-500 ml-2`}>Invalid OTP code</div>
           <div className="flex flex-row gap-2 w-[95%] mt-[10px] mx-auto justify-center items-center">
              { boxArray.map( (_, index) => {
                  return <input key={index} pattern="\d*" onKeyDown={(e) => handleKeyDown(e, index)} inputMode="numeric" id={`otp-${index}`} value={boxArray[index]} onChange={(e)=>{handleInput(e, index)}} className='h-[50px] md:w-[50px] w-[15%] border-[1px] border-gray-400 rounded-[5px] text-center bg-transparent' type="tel" maxLength={1} />
              
              })}
            </div>
          <div className={`${isOtpSent?'opacity-100':'opacity-0'} mt-1 text-[14px] text-green-500 ml-2`}>a new code has been sent to {email} ✔</div>
          <div className='flex flex-col gap-2 justify-start'>
            <span className={`${timerDisplay?'opacity-100':'opacity-0'}`}>You can request a new OTP code in {timer}s </span>
            <button disabled={allowSubmit?false:true} onClick={requestNewOtp} className={`${allowSubmit?'hover:text-green-700 hover:scale-95':'text-gray-500 cursor-not-allowed'} w-fit text-green-600 font-semibold`}>{requestText}</button>
          </div>
        </div>
        <div className='mt-[70px]'>
          <button onClick={verifyOtp}  className={`text-white hover:bg-green-700 bg-green-600 rounded-[30px] w-[100%] h-[50px]`}>{confirmText}</button>
        </div>

      </div>


    {/* confirmation page */}
      <div className='flex flex-col w-screen h-screen md:pt-[50px] px-4 pt-[30px] bg-gray-100' style={{ display:(toConfirmPage?'block':'none'), alignSelf:'center'}}>
        <div className='md:w-[400px] mx-auto w-[100%] flex flex-col justify-center'>
          <div>
            <button onClick={()=>{setToConfirmPage(false);setToFormPage(true)}} className='flex flex-row justify-center items-center gap-2'>
              <div className='rotate-180'>
                <Next bg={'black'} size={'25px'}/>
              </div>
              <span className='md:flex hidden'>Go Back</span>
              </button>
          </div>
          <div className="text-[23px] font-bold mt-[25px]">Confirm your details</div>
          <div className='mt-[10px]'> <span>Please, we&apos;d like you to verify your details below.</span></div>
          <div className='mt-[25px]'>
            <div><span className='text-gray-600 font-semibold'>Name: </span>{firstname}</div>
            <div className='mt-[5px]'><span className='text-gray-600 font-semibold'>Surname: </span>{lastname}</div>
            <div className='mt-[5px]'><span className='text-gray-600 font-semibold'>Date of Birth: </span>{dob}</div>
            <div className='mt-[5px]'><span className='text-gray-600 font-semibold'>Email: </span>{email}</div>
            <div className='mt-[5px]'><span className='text-gray-600 font-semibold'>Phone Number: </span>{phone}</div>
            <div className='mt-[5px]'><span className='text-gray-600 font-semibold'>Residence: </span>{residence}</div> 
            <div className='mt-[5px]'><span className='text-gray-600 font-semibold'>Gender: </span>{gender}</div>
          </div>
          <button className=' bg-green-600 text-white h-[50px] rounded-[30px] w-[100%] mt-[70px]' onClick={toVerificationPage}>Continue</button>  
        </div>
    
      </div>

      { /* Loader */} 
      <div className={`${loading?'':'hidden'} absolute z-[10000] bg-gray-50 top-0 right-0 h-screen w-screen flex flex-row justify-center items-center`}>
        <CycleLoader/>
      </div>
    </div>
  );
};

export default Register;
