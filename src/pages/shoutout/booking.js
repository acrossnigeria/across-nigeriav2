// pages/booking.js

import { useEffect, useReducer, useState } from 'react';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import Calendar from '@/components/Calendar';
import Checkbox from '@/components/Checkbox';
import { toast } from 'react-toastify';
import axios from 'axios';
import Link from 'next/link';


function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true, errorUpdate: '' };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false, errorUpdate: '' };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };
    case 'PAY_REQUEST':
      return{...state, loadingPay:true, errorPay:''};
      
    case 'PAY_SUCCESS':
      return{...state, loadingPay:false, errorPay:''};
      
    case 'PAY_FAIL':
      return{...state, loadingPay:'', errorPay:action.payload};
      
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
}
const BookingPage = () => {
  const router=useRouter();
  // Example available dates
   const [data, setData] = useState([]);
     useEffect(() => {
    setData([]);
    const fetchData = async () => {
      try {
       dispatch({type:'UPLOAD_REQUEST'});
        const response = await axios.get("/api/booking/booking", {params:{param:'fetch'}});
        const premiumCollections = response.data.filter(doc => doc.category === 'premium');
        setData(premiumCollections.map(doc=>doc.dateSelected));
         console.log(data); // Log response.data directly
      } catch (error) {
        dispatch({type:'UPDATE_FAIL'});
      } finally {
        dispatch({type:'UPLOAD_SUCCESS'})
      }
    };
    fetchData();
  }, []);
  const unavailableDates = data;

// Convert date strings to Date objects
const unavailableDateObjects = unavailableDates.map(dateString => new Date(dateString));
const [{ loading, error, loadingUpdate, loadingPay, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading:false,
      error: '',
    });
// Example: Add 1 day to each date
const updatedUnavailableDates = unavailableDateObjects.map(date => {
    date.setDate(date.getDate());
    return date.toISOString().split('T')[0];
});

  const [selectedDate, setSelectedDate] = useState(null);
  const [agree, setAgree]= useState(false)
 const [displayName, setDisplayName] = useState('');
 const [shoutout, setShoutout]=useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showInfo, setShowInfo] = useState(false);
const [selectedFile, setSelectedFile]=useState(false);
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setShowInfo(true);
  };
  const handleSelectDate = (date) => {
    setSelectedDate(date);
    console.log(selectedDate)
  };
    const uploadHandler = async (e) => {
     if (!e.target.files || e.target.files.length === 0) {
    toast.error('Please select a Picture file to upload.');
    return;
  }
   // Check file size
  const fileSize = e.target.files[0].size; // Size in bytes
  const maxSize = 2 * 1024 * 1024; // 2MB in bytes
  if (fileSize > maxSize) {
    toast.error('File size exceeds 2MB limit.');

     e.target.files[0].value = "";  
       return;
  }
  const result = window.confirm(`Do you want to proceed with uploading ${e.target.files[0].name}?`);
    if (result) {
      const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const {
        data: { signature, timestamp },
      } = await axios('/api/admin/cloudinary-sign');
   
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp);
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
      const { data } = await axios.post(url, formData);
      dispatch({ type: 'UPLOAD_SUCCESS' });
      localStorage.setItem('dataUrl',data.secure_url)
      toast.success('File uploaded successfully');
      
    } catch (err) {
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
    } else {
      return;
    }
   
  };
  const handleRemoveFile = () => {
   // Clear the selected file
     document.getElementById('imageFile').value = '';
     setSelectedFile(false)
  };
  const shoutoutChange=(e)=>{
    const inputValue=e.target.value;
    if(inputValue.length<=200){
      setShoutout(inputValue)
    }
  }
  const confirm=(e)=>{
    e.preventDefault();
    localStorage.setItem('selectedDate', selectedDate?.toDateString());
    localStorage.setItem('amount',selectedCategory==='general'?(1000):(10000));
    localStorage.setItem('category',selectedCategory);
    localStorage.setItem('displayName',displayName);
    localStorage.setItem('shoutout',shoutout );
     router.push(`/shoutout/confirmbooking`);
    }

  return (
    <Layout>
    <div  className=' m-0 left-0 top-0 mx-auto px-12 pt-10'>
      <div className='md:ml-[30%]'><Link href="/" className=' mb-4 mx-auto text-center ' legacyBehavior>
  <a className='font-bold cursor-pointer bg-gray-400 rounded-md p-2 mb-4'>Go to Shoutout Page</a>
</Link></div> 
      <h1 className='my-8 font-bold text-2xl text-center underline'>Book a Date</h1>
      <Calendar unavailableDates={updatedUnavailableDates} selectedDate={selectedDate} onSelectDate={handleSelectDate} />
 
          {selectedDate && ( 
            <div className="max-w-lg mx-auto mt-8 mb-8 p-6 rounded-lg">     
            <p className='mb-10'>You have Selected <span className='font-bold'>{selectedDate?.toDateString()}</span> for your SHOUTOUT</p>
      <h2 className="text-2xl font-semibold mb-4">Booking Form</h2>
      <form onSubmit={confirm}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="displayName">Display Name</label>
          <input
            type="text"
            id="displayName"
            className="w-full bg-gray-300 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-green-500"
            placeholder="Input Desired Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="displayName">Display Name</label>
          <textarea
            type="text"
            id="shoutOut"
            className="w-full bg-gray-300 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-green-500"
            placeholder="Make your Shout-Out (max 200 characters)"
            value={shoutout}
            rows={4}
            cols={50}
            onChange={shoutoutChange}
          />
          <div>Characters left: {200 - shoutout.length}</div>
        </div>
        <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="imageFile">Upload image</label>
                <input
                accept=".jpg"
                  type="file"
                  className="mb-4 w-full"
                  id="imageFile"
                  onChange={(e)=>{e.target.files[0]&&setSelectedFile(true);uploadHandler(e);}}
                /> {selectedFile&&<span className='bg-red-500 cursor-pointer text-white opacity-95 rounded-lg p-2 mt-2 hover:bg-red-700' onClick={handleRemoveFile}>Remove file</span>}

                {loadingUpload && <div className=" bg-orange-400">Please wait while we upload your File....
                <p>`Don&apos;t Navigate from this Page </p></div>}
              </div>
               <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="category">Category</label>
          <select
            id="category"
            className="w-full px-4 py-2 rounded border bg-gray-300 border-gray-300 focus:outline-none focus:border-green-500"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option disabled value="">Select Category</option>
            <option value="premium">Premium</option>
            <option value="general">General</option>
          </select>
        </div>
        {showInfo &&(selectedCategory==="premium"||selectedCategory==="general") &&(displayName.length>0)&&(
          <div className="mb-4">
            {selectedCategory === 'premium' ? (
              <p className="text-green-700">
                Cost: Ten Thousand Naira. Your booking date is locked in.
              </p>
            ) : (
              <p className="text-green-700">
                Cost: One Thousand Naira. Your shout-out will be entered into the daily draw.
              </p>
            )}
          </div>
        
        )}
        <Checkbox handleTermsCheckboxChange={()=>{setAgree(!agree)}}/>
        {agree && (selectedCategory==="premium"||selectedCategory==="general") &&selectedFile&&(<button
          type="submit" onClick={confirm}
          className="bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-green-700 focus:outline-none focus:bg-green-700"
        >
          Submit
        </button>)}
      
      </form>
    </div>
          )}
    
    </div></Layout>
  );
};
BookingPage.auth=true;
export default BookingPage;
