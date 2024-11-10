import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { Store } from '../../utils/Store';
import Layout from '@/components/Layout';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import Checkbox from '@/components/Checkbox';
import Link from 'next/link';

const Register = () => {
   const nigeriaStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
    'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
    'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ];
    const { state, dispatch } = useContext(Store);
     const {user:{userDetails},}= state;
   const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [dayError, setDayError]=useState(false)
  const [yearError, setYearError]=useState(false)
  const [formattedDate, setFormattedDate] = useState('');
    const router = useRouter();
    const { ref } = router.query; // Get the referrer from the URL query
    console.log(ref)
  if(ref!==undefined){
    localStorage.setItem("refId",ref)
  }
  const [formData, setFormData] = useState({
    name: '',
    surname:"",
    dob:'',
    email: '',
    gender:'',
    password: '',
    phone:'',
    residence:'',
    confirmPassword: '',
     acceptTerms: false, 
  });
  const handleDayChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and limit to 2 characters
    if (/^\d{0,2}$/.test(value)&&value<=31) {
      setDay(value);
      setDayError(false)
    }else{setDayError(true)}
  };

  const handleYearChange = (e) => {
    const value = e.target.value;
    const currentDate = new Date();
const currentYear = currentDate.getFullYear();
    // Allow only numbers and limit to 4 characters
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
      setFormData({...formData, dob:formattedDate})
    }
  };
  formatEnteredDate();
},[day,month, year,formattedDate])

 const today=new Date();
  useEffect(()=>{
    if(!userDetails[0]?.name){setFormData({...formData,  name: "",
        surname:"",
    dob:"",
    email: "",
    password: "",
    phone:"",
    residence:"",
    confirmPassword: "",
     acceptTerms: false, });}
     else{
      
setFormData({...formData,  name: userDetails[0].name,
      surname:userDetails[0].surname,
    dob:userDetails[0].dob,
    email: userDetails[0].email,
    password: userDetails[0].password,
    phone:userDetails[0].phone,
    gender:userDetails[0].gender,
    residence:userDetails[0].residence,
    confirmPassword: userDetails[0].password,
     acceptTerms: userDetails[0].acceptTerms, });
     }

  }, [])
 const [showPassword, setShowPassword] = useState(false);
 const [showPassword2, setShowPassword2] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

  };
 const {user}= state;
  const  handleTermsCheckboxChange=(isChecked)=>{setFormData({...formData,acceptTerms:isChecked})}
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dob=new Date(formData.dob);
     const age= today.getFullYear()-dob.getFullYear();
    if(age<18 ){
      return(alert("underage! cannot register below 18years old"));
    } else{
    try {
  
 dispatch({type:'RESET'})
dispatch({type:'ADD_USER', payload: formData })
Cookies.set(
  'user', JSON.stringify({...user,userDetails:formData,})
  );
 localStorage.setItem('referee',ref)
  router.push('/confirm')
      // Post data to confirmation page
      await router.push({
        pathname: '/confirm',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }}
  };
  const togglePasswordVisibility1 = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const passwordFieldType = showPassword ? 'text' : 'password';

  return (
    <Layout>
    <div className="max-w-[90%] mx-auto">
      
      <form onSubmit={handleSubmit} className="md:max-w-xl max-w-full mx-auto  m-4 p-10 rounded-md ">
        <h1 className="text-2xl text-left font-bold mb-9">Register</h1>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="rounded px-4 py-2 w-full focus:outline-gray-600 bg-gray-200"
            required
            autoFocus
          />
        </div>
        <div className="mb-4">
          <label htmlFor="surname" className="block mb-2">Surname</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            className="bg-gray-200 rounded px-4 py-2 w-full focus:outline-gray-600"
            required
          />
        </div>
<div className='mb-4'>
  <label htmlFor="dob" className="block mb-2">Date of Birth</label>
           <div className="flex space-x-2 bg-gray-200 rounded-md border contain flex-shrink">
         <input
          type="text"
          value={day}
          onChange={handleDayChange}
          placeholder="Day (DD)"
          className="col-span-1 border text-[10px] md:text-lg w-12 sm:w-32 md:w-32  block appearance-none bg-white pl-1 py-0
           md:px-4 md:py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        /><span className='text-3xl font-thin'>/</span>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
       className="col-span-1 border text-[10px] text-gray-500 md:text-lg md:w-40 w-20  checked:bg-green-700 block appearance-none bg-white pl-1 py-0
       md:px-4 md:py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"

        >
          <option className='focus:bg-green-700 checked:bg-green-700' value="" disabled>-Select Month-</option>
          <option className='focus:bg-green-700 checked:bg-green-700 hover:bg-green-500 accent-green-700' value="01">January</option>
          <option className='focus:bg-green-700 checked:bg-green-700 hover:bg-green-500 accent-green-700' value="02">February</option>
          <option className='focus:bg-green-700 checked:bg-green-700 hover:bg-green-500 accent-green-700' value="03">March</option>
          <option className='focus:bg-green-700 checked:bg-green-700 hover:bg-green-500 accent-green-700' value="04">April</option>
          <option className='focus:bg-green-700 checked:bg-green-700 hover:bg-green-500 accent-green-700' value="05">May</option>
          <option className='focus:bg-green-700 checked:bg-green-700 hover:bg-green-500 accent-green-700' value="06">June</option>
          <option className='focus:bg-green-700 checked:bg-green-700 hover:bg-green-500 accent-green-700' value="07">July</option>
          <option className='focus:bg-green-700 checked:bg-green-700 hover:bg-green-500 accent-green-700' value="08">August</option>
          <option className='focus:bg-green-700 checked:bg-green-700 hover:bg-green-500 accent-green-700' value="09">September</option>
          <option className='focus:bg-green-700 checked:bg-green-700 hover:bg-green-500 accent-green-700' value="10">October</option>
          <option className='focus:bg-green-700 checked:bg-green-700 hover:bg-green-500 accent-green-700' value="11">November</option>
          <option className='focus:bg-green-700 checked:bg-green-700 hover:bg-green-500 accent-green-700' value="12">December</option>
        </select><span className='text-3xl font-thin'>/</span>
        <input
          type="text"
          value={year}
          onChange={handleYearChange}
          placeholder="Year (YYYY)"
          className="col-span-1 border text-[10px] md:text-lg md:w-40 flex-grow max-w-[80px] md:max-w-[140px] appearance-none bg-white px-2 
          py-0 md:px-4 md:py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        />
      </div></div>
    {yearError&&<span className='text-red-600 text-sm'>Please only enter Years not Earlier than 1900 and not later than {today.getFullYear()-18}</span>}  
    {dayError&&<span className='text-red-600 text-sm'>Please only enter days between 1-31</span>}  
    
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border bg-gray-200 rounded px-4 py-2 w-full"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="phone" className="block mb-2">Phone Number</label>
          <div className='w-full '>
          <PhoneInput 
          defaultCountry='ng'
          className="border bg-gray-200 rounded px-0 py-0 h-fit w-fit"
          required
          onChange={(phone)=>{
    setFormData((prevFormData) => ({ ...prevFormData, phone: phone }));
  }}
          name='phone'
          value={formData.phone}/></div>
        </div>
       <div className="mb-4">
          <label htmlFor="state" className="block mb-2">State of Residence</label>
          <select
            id="residence"
            name="residence"
            value={formData.residence}
            onChange={handleChange}
            className="border rounded px-4 bg-gray-200 py-2 w-full"
            required
          >
            <option value="">Select State</option>
            {nigeriaStates.map((residence) => (
              <option className=''  key={residence} value={residence}>{residence}</option>
            ))}
          </select>
        </div>
        <div className='mb-4'></div>
           <div className="mb-4">
          <label htmlFor="gender" className="block mb-2">Gender</label>
          <div className="flex ">
            <label htmlFor="male" className="mr-4">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                onChange={handleChange}
                checked={formData.gender === 'male'}
                className="mr-2 accent-green-700"
              />
              Male
            </label>
            <label htmlFor="female">
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                onChange={handleChange}
                checked={formData.gender === 'female'}
                className="mr-2 accent-green-700"
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
          <input
            type={showPassword?'text':'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border w-[83%] bg-gray-200 rounded px-4 py-2"
            required
          />  <button
              type="button"
             className={`right-0 w-fit ${showPassword?"bg-red-600 opacity-90 px-1":"bg-green-600 px-[2px]"} rounded-r-md py-2 ` }
              onClick={togglePasswordVisibility1}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
            {formData.password &&
            formData.password.length<6 && (
              <p className="text-red-500 font-thin ">Passwords must have Six(6) or more characters</p>
          )}
        </div>
         <div className="mb-4">
          <label htmlFor="confirmPassword" className="block mb-2">Confirm Password</label>
          <input
            type={showPassword2?'text':'password'}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-[83%] bg-gray-200 rounded px-4 py-2"
            required
          />  <button
              type="button"
              className={`right-0 w-fit ${showPassword2?"bg-red-600 opacity-90 px-1":"bg-green-600 px-[2px]"} rounded-r-md py-2` }
              onClick={togglePasswordVisibility2}
            >
              {showPassword2 ? 'Hide' : 'Show'}
            </button>
        </div>
        <div> {formData.confirmPassword &&
            formData.password !== formData.confirmPassword && (
              <p className="animate-bounce text-red-700 font-thin">Passwords don&apos;t match</p>
          )}</div>
           <div className="mb-4">
            <Checkbox handleTermsCheckboxChange={handleTermsCheckboxChange}/>
        
        </div><div className="flex justify-between px-4 py-2">
          {formData.name.length && formData.phone.length&&formData.surname.length&&formData.dob.length&&formData.email.length&&
            formData.password.length&&formData.phone.length>11&&formData.gender.length&&formData.residence.length&&formData.password.length>5&&formData.password===formData.confirmPassword &&formData.acceptTerms? (
            <button
              type="submit"
              className="font-semibold text-white px-8 py-2 rounded-md bg-green-800 hover:bg-green-900 active:bg-green-950"
            >
              {' '}
              REGISTER
            </button>
          ) : (
            <button
              type="submit"
              disabled={true}
              className="font-semibold text-white  px-8 py-2 rounded-md bg-green-500"
            >
              REGISTER
            </button>
          )}
        </div>
       <div>Already have an Account? <Link className="text-green-700 font-semibold" href="#" onClick={()=>router.push("/login")}>Login</Link></div> 
      </form>
    </div></Layout>
  );
};

export default Register;
