import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
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

  if (ref!==undefined) {
    localStorage.setItem( "refId",ref );// save ref in local storage
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
  

  // loads the confirm page
  const today=new Date();
  function toConfirm(e) {
     e.preventDefault();
     const dateOfBirth = new Date(dob);
     const age= today.getFullYear()-dateOfBirth.getFullYear();
     
     if( age<18 ){
       return( alert("underage! cannot register below 18years old") );
     };
     setToConfirmPage(true);
  }

  async function beginPayment() {
    const formData = { name: firstname, surname: lastname, email, phone, residence, gender, password, dob };
    try {
      dispatch({type:'RESET'});
      dispatch({type:'ADD_USER', payload: formData });
      Cookies.set( 'user', JSON.stringify({...user,userDetails:formData,}) );
      localStorage.setItem('referee',ref);
      await router.push( { pathname:'/paystack' });
    } catch ( err ) {
      console.log(err.message);
    }

  }

  return (
    <div className='flex flex-col'>
      <Loader/>
      <div className='flex flex-row justify-end px-8 py-3'>
          <Link href={'/'}><Close/></Link> 
      </div>
      <div className='pt-4 pb-10' style={{ display:( toConfirmPage?'none':'block' ) }}>
        <div className='border-b-1 border-green-100 py-3 text-center text-[17px] font-bold text-green-600'>
          <span>ACROSS NIGERIA REALITY SHOW</span>
        </div>

        {/* <Layout> */}
        <div className="max-w-[90%] mx-auto">
          {/* handleSubmit */}
          <form onSubmit={toConfirm} style={{ }} className="md:max-w-xl flex flex-col max-w-full mx-auto  m-4 p-2">
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
                id="surname"
                placeholder='Surname'
                name="surname"
                value={lastname}
                onChange={ (e)=>setLastname(e.target.value) }
                className="bg-gray-200 rounded-[8px] h-[52px] text-[19px] px-4 w-full focus:outline-gray-600"
                required
              />
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
              <option className='focus:bg-green-500 checked:bg-green-500 hover:bg-green-500 accent-green-500' value="05">July</option>
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
              <label htmlFor="email" className="block mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder='Email address'
                value={email}
                onChange={ (e)=>setEmail(e.target.value)}
                className="border bg-gray-200 px-2 rounded-[8px] h-[52px] text-[19px] w-full"
                required
              />
            </div>
            
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
                  REGISTER
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

    {/* confirmation page */}
      <div className='flex flex-col max-w-[700px]' style={{ display:(toConfirmPage?'block':'none'), alignSelf:'center'}}>
        <div className="text-[25px] font-extrabold text-center w-[100%] border-b-1 pb-4 text-green-600 border-green-100 mt-[30px]">Confirm Details</div>
        <div className='bg-gray-100 py-4 rounded-[10px]'>
          <div className='mb4 px-5 p-1 text-[19px] font-semibold'><span className='pr-2 text-gray-500 font-bold'>Name: </span>{firstname}</div>
          <div className='mb4 px-5 p-1 text-[19px] font-semibold'><span className='pr-2 text-gray-500 font-bold'>Surname: </span>{lastname}</div>
          <div className='mb4 px-5 p-1 text-[19px] font-semibold'><span className='pr-2 text-gray-500 font-bold'>Date of Birth: </span>{dob}</div>
          <div className='mb4 px-5 p-1 text-[19px] font-semibold'><span className='pr-2 text-gray-500 font-bold'>Email: </span>{email}</div>
          <div className='mb4 px-5 p-1 text-[19px] font-semibold'><span className='pr-2 text-gray-500 font-bold'>Phone Number: </span>{phone}</div>
          <div className='mb4 px-5 p-1 text-[19px] font-semibold'><span className='pr-2 text-gray-500 font-bold'>Residence: </span>{residence}</div> 
          <div className='mb4 px-5 p-1 text-[19px] font-semibold'><span className='pr-2 text-gray-500 font-bold'>Gender: </span>{gender}</div>
        </div>

        
        <p className='px-5 text-[20px] text-blue-500'>*Please verify your details above.</p>
        <div className='px-5 flex flex-row justify-around mt-[35px]'>
          <button className='bg-transparent text-green-700 font-bold border-2 border-green-700 hover:bg-green-700 hover:text-white rounded-[5px] px-[22px] text-[20px] py-2' onClick={()=>{setToConfirmPage(false)}}>Edit</button> 
          <button className=' bg-green-600 font-bold text-white text-[21px] py-2 rounded-[5px] px-[20px]' onClick={beginPayment}>Proceed to Pay</button>  
        </div>

      </div>
    </div>
  );
};

export default Register;
