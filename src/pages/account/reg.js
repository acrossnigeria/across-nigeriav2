import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Store } from '../../../utils/Store';
import Layout from '@/components/Layout';
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
  const [ otp, setOtp ] = useState('');
  const [ isOtpSent, setIsOtpSent ] = useState(false);
  const [ confirmText, setConfirmText ] = useState('Confirm');
  const [ requestText, setRequestText ] = useState('Request code');
  const [ regText, setRegText ] = useState('Register');
  const [loading, setLoading ] = useState(false);
  const [ isOtpInvalid, setIsOtpInvalid ] = useState(false);
  const [ showEmailExistError, setShowEmailExistError ] = useState(false);
  
  const [ timer, setTimer ] = useState(60);
  const [ timerDisplay, setTimerDisplay ] = useState(true);
  const [ allowSubmit, setAllowSubmit ] = useState(true);

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
    const response = await axios.post('/api/verification/generate-otp', data);
    return response.data.isSent;
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
    const data = { token:otp, email };
    let response;
    let isVerified;
    try {
      response = await axios.post('/api/verification/verify-otp', data);
      isVerified = response.data.isVerified;
      if (isVerified) {
        initiateReg();
      } else {
        setIsOtpInvalid(true);
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
    const refCode= firstname.trim()+randomCode;
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
      router.push('/success')

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
    <div className='flex flex-col'>
      <Loader/>
      <div className={`${toAuthPage || toConfirmPage ? 'hidden':''} flex flex-row justify-end px-8 py-3`}>
          <Link href={'/'}><Close/></Link> 
      </div>
      <div className={`${toFormPage?'':'hidden'} pt-4 pb-10`}>
        <div className='border-b-1 border-green-100 py-3 text-center text-[17px] font-bold text-green-600'>
          <span>ACROSS NIGERIA REALITY SHOW</span>
        </div>

        {/* <Layout> */}
        <div className="max-w-[90%] mx-auto">
          {/* handleSubmit */}
          <form onSubmit={toConfirmDetails} className="md:max-w-xl flex flex-col max-w-full mx-auto  m-4 p-2">
            <h1 className="text-2xl text-left font-bold mb-9">Register</h1>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">Name</label>
              <input
                type="text"
                placeholder='First name'
                id="name"
                name="name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="rounded-[8px] h-[52px] text-[19px] px-4  w-full focus:outline-gray-600 bg-gray-200"
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
                className="bg-gray-200 rounded-[8px] h-[52px] text-[19px] px-4 w-full focus:outline-gray-600"
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
                className="bg-gray-200 rounded-[8px] h-[52px] text-[19px] px-4 w-full focus:outline-gray-600"
                required
              />
              <div className={`${showEmailExistError?'':'hidden'} text-red-500 italic text-[14px]`}>An account with this email already exists. please try logging in or use a different email to create a new account.</div>
            </div>
    <div className='mb-4'>
      <label htmlFor="dob" className="block mb-2">Date of Birth</label>
          <div className="flex space-x-2 bg-gray-200 rounded-[8px] border contain flex-shrink">
            <input
              type="number"
              value={day}
              onChange={handleDayChange}
              placeholder="Day"
              className="col-span-1 border h-[48px] text-[18px] md:text-lg w-[50px] sm:w-32 md:w-32  block appearance-none bg-gray-100 pl-1 py-0
              md:px-4 md:py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            /><span className='text-3xl font-thin'>/</span>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="col-span-1 border text-[18px] text-gray-700 md:text-lg md:w-40 w-[120px] block appearance-none bg-gray-100 pl-1 py-0
              md:px-4 md:py-2 rounded leading-tight focus:outline-none focus:shadow-outline"

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
              py-0 md:px-4 md:py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            />
          </div></div>

        {yearError&&<span className='text-red-600 text-sm'>Please only enter Years not Earlier than 1900 and not later than {today.getFullYear()-18}</span>}  
        {dayError&&<span className='text-red-600 text-sm'>Please only enter days between 1-31</span>}  
            
            <div className="mb-4">
              <label htmlFor="phone" className="block mb-2">Phone Number</label>
              <div className='w-full bg-gray-200 rounded-[5px] '>
              <PhoneInput 
              defaultCountry='ng'
              required
              inputStyle={{fontSize:'18px', backgroundColor:'#e5e7eb', height:'48px', borderTop:'none', borderLeft:'1px solid gray', borderRight:'none', borderBottom:'none'}}
              countrySelectorStyleProps={{ buttonStyle:{backgroundColor:'#e5e7eb', height:'48px', width:'100%', borderTop:'none', borderLeft:'none', borderBottom:'none'}}}
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
                className="border rounded-[8px] h-[52px] text-[19px] px-4 bg-gray-200 py-2 w-full"
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
              <div className='rounded-[8px] h-[52px] bg-gray-200 flex flex-row justify-between'>
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
              <div className='rounded-[8px] h-[52px] bg-gray-200 flex flex-row justify-between'>
                <input
                  type={showPassword2?'text':'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  placeholder='Confirm Password'
                  onChange={ (e)=>setConfirmPassword(e.target.value) }
                  className="w-[75%] h-[52px] text-[19px] outline-none bg-gray-200 rounded px-4 py-2"
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
                  className="font-semibold text-white w-[100%] h-[48px] py-2 rounded-[5px] bg-green-700 hover:bg-green-900 active:bg-green-950"
                >
                  {regText}
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={true}
                  className="font-semibold text-white w-[100%] h-[48px] py-2 rounded-[5px] bg-gray-300"
                >
                  REGISTER
                </button>
              )}
            </div>
            <div className='mt-3 text-[16px]'>Already have an Account? <Link className="text-green-500 underline font-semibold" href="#" onClick={()=>router.push("/account/login")}>Login</Link></div> 
          </form>
        </div>
        {/* </Layout> */}
      </div>

        {/* Email aunthentication */}
      <div className='flex flex-col max-w-[700px] px-[5%] pt-[50px]' style={{ display:(toAuthPage?'flex':'none'), alignSelf:'center'}}>
        <div>
          <button onClick={()=>{setToAuthPage(false);setToConfirmPage(true)}} className='flex flex-row justify-center items-center border-1 border-black px-2'><BackIcon/>Back</button>
        </div>
        <div className='flex mt-[70px] flex-col'>
          <span className='text-[25px] text-green-600 mb-2'>Verify your identity</span>
          <span>For your security, we've sent a One-Time Password (OTP) to <span className='text-blue-600'>{email}</span>. Please enter the code below to complete the authentication process and secure your account.</span>
        </div>
        <div>
          <div className={`${isOtpInvalid?'opacity-100':'opacity-0'} mt-1 italic text-[15px] text-red-500 ml-2`}>Invalid OTP code</div>
          <div className="mt-1 pt-8 border-t-1 border-gray-300 flex flex-row justify-between gap-7">
            <input
              type="text"
              id="otp"
              placeholder='Enter OTP code here...'
              name="otp"
              value={otp}
              onChange={ (e)=>setOtp(e.target.value) }
              className="bg-gray-200 rounded-[30px] h-[48px] text-[19px] px-5 w-full focus:outline-none"
              required
            />
            <button onClick={verifyOtp}  className={`text-white hover:bg-green-700 bg-green-600 rounded-[30px] w-[150px] h-[48px]`}>{confirmText}</button>
          </div>
          <div className={`${isOtpSent?'opacity-100':'opacity-0'} mt-1 text-[14px] text-green-500 ml-2`}>a new code has been sent to {email} ✔</div>
          <div className='flex md:flex-row flex-col gap-3 justify-center mt-5 items-center border-gray-300 pt-[10px] border-t-1'>
            <span className={`${timerDisplay?'opacity-100':'opacity-20'}`}>You can request a new OTP code in {timer}s </span>
            <button disabled={allowSubmit?false:true} onClick={requestNewOtp} className={`${allowSubmit?'bg-blue-500 hover:bg-blue-700':'bg-gray-500 cursor-not-allowed'} text-white p-1 px-3 rounded-[30px]`}>{requestText}</button>
          </div>
        </div>

      </div>


    {/* confirmation page */}
      <div className='flex mt-[120px] flex-col max-w-[700px]' style={{ display:(toConfirmPage?'block':'none'), alignSelf:'center'}}>
        <div className="text-[25px] border-b-1 pb-4 text-green-600 mt-[30px]">Confirm your details</div>
        <div className='bg-gray-100 py-4 rounded-[5px]'>
          <div className='px-5 text-[20px]'><span className='pr-2 text-gray-500 font-semibold'>Name: </span>{firstname}</div>
          <div className='px-5 text-[20px]'><span className='pr-2 text-gray-500 font-semibold'>Surname: </span>{lastname}</div>
          <div className='px-5 text-[20px]'><span className='pr-2 text-gray-500 font-semibold'>Date of Birth: </span>{dob}</div>
          <div className='px-5 text-[20px]'><span className='pr-2 text-gray-500 font-semibold'>Email: </span>{email}</div>
          <div className='px-5 text-[20px]'><span className='pr-2 text-gray-500 font-semibold'>Phone Number: </span>{phone}</div>
          <div className='px-5 text-[20px]'><span className='pr-2 text-gray-500 font-semibold'>Residence: </span>{residence}</div> 
          <div className='px-5 text-[20px]'><span className='pr-2 text-gray-500 font-semibold'>Gender: </span>{gender}</div>
        </div>

        
        <p className='px-5 text-[20px] text-blue-500'>*Please verify your details above.</p>
        <div className='px-5 flex flex-row justify-around mt-[35px]'>
          <button className='bg-transparent text-green-700 font-bold border-2 border-green-700 hover:bg-green-700 hover:text-white rounded-[30px] w-[120px] text-[20px] py-2' onClick={()=>{setToConfirmPage(false);setToFormPage(true)}}>Edit</button> 
          <button className=' bg-green-600 font-bold text-white text-[21px] py-2 rounded-[30px] w-[120px]' onClick={toVerificationPage}>Next</button>  
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
