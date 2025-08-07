// pages/booking.js

import { useEffect, useReducer, useState } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import Calendar from '@/components/Calendar';
import Checkbox from '@/components/Checkbox';
import { toast } from 'react-toastify';
import axios from 'axios';
import Link from 'next/link';
import Upload from '../../../public/images/icon/Upload';
import Image from 'next/image';
import ImgIcon from '../../../public/images/icon/ImgIcon';
import DeleteIcon from '../../../public/images/icon/DeleteIcon';
import FileIcon from '../../../public/images/icon/FileIcon';
import CycleLoader from '@/components/CycleLoader';

// Reducer function
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
      return {...state, loadingPay:true, errorPay:''};
      
    case 'PAY_SUCCESS':
      return {...state, loadingPay:false, errorPay:''};
      
    case 'PAY_FAIL':
      return {...state, loadingPay:'', errorPay:action.payload};
      
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
  const router = useRouter();
  const [ isLoadingCalender, setIsLoadingCalender ] = useState(true);
  const { status, data: session } = useSession();
  // Example available dates
  const [ data, setData ] = useState([]);

  useEffect(() => {
    setData([]);
    const fetchData = async () => {
      try {
        dispatch({type:'UPLOAD_REQUEST'});
        const response = await axios.get("/api/booking/data?type=premium");
        setIsLoadingCalender(false);
        const premiumCollections = response.data;
        setData(premiumCollections.map(doc=>doc.dateSelected));
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
      const dateVal = date.toISOString().split('T')[0];
      console.log(dateVal);
      return dateVal;
  });

  const [ selectedDate, setSelectedDate ] = useState(null);
  const [ agree, setAgree ] = useState(false)
  const [ displayName, setDisplayName ] = useState('');
  const [ shoutout, setShoutout ] = useState('');
  const [ selectedCategory, setSelectedCategory ] = useState('');
  const [ showInfo, setShowInfo ] = useState(false);
  const [ selectedFile, setSelectedFile ] = useState(false);
  const [ imgPreview, setImgPreview ] = useState(null);
  const [ imgName, setImgName ] = useState('');
  const [ imgSize, setImgSize ] = useState(0);

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
  const maxSize = 2 
  if ( Math.trunc(imgSize) > maxSize) {
    toast.error('File size exceeds 2MB limit.');

     e.target.files[0].value = "";  
       return;
  }

  const result = window.confirm(`Do you want to proceed with uploading ${imgName}?`);
    if (result) {
      const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const {
        data: { signature, timestamp },
      } = await axios('/api/admin/cloudinary-sign?type=shoutOutImage');
   
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp);
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
      formData.append('folder', 'shoutout_image_uploads');
      const { data } = await axios.post(url, formData);
      const user = session?.user?._id;
      console.log(user);

      const response = await axios.post('/api/booking/booking', { mediaUrl: data.secure_url, user });
      console.log(response.data);

      dispatch({ type: 'UPLOAD_SUCCESS' });
      localStorage.setItem('bookingId', response.data.tempBooking._id );
      toast.success('File uploaded successfully');
      
    } catch (err) {
      dispatch({ type: 'UPLOAD_FAIL', payload: err.message });
      toast.error(err.message);
    }
    } else {
      return;
    }
   
  };
  const handleRemoveFile = () => {
   // Clear the selected file
     document.getElementById('imageFile').value = '';
     setSelectedFile(false);
     setImgPreview(null);
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

  const photoUploader = (e) => {
    const file = e.target.files[0];
    setImgSize(e.target.files[0].size / 1024 / 1024);
    setImgName(e.target.files[0].name);
        // preview Photo
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImgPreview(reader.result);
        setSelectedFile(true);

        const timeOut = setTimeout(() => {
          uploadHandler(e);
          clearTimeout(timeOut);
        }, 2000);
      };
      reader.readAsDataURL(file);
    } else {
      setImgPreview(null)
    }
  }

  const selectPhoto = (e) => {
    e.preventDefault();
    document.getElementById('imageFile').click()
  }

  return (
    <Layout>
      <div className={`${isLoadingCalender?'':'hidden'} h-[620px] w-full flex flex-col items-center`}>
        <div className='bg-gray-200 mt-6 h-[20px] rounded-[20px] w-[200px] animate-pulse'></div>
        <div className='bg-gray-200 mt-2 h-[35px] rounded-[20px] w-[250px] animate-pulse'></div>
        <div className='md:w-[400px] mt-6 w-[85%] h-[400px] bg-gray-200 animate-pulse rounded-[20px]  flex flex-col justify-center items-center'>
        </div>
        <div className='bg-gray-200 mt-4 h-[50px] rounded-[20px] md:w-[300px] w-[85%] animate-pulse'></div>
      </div>
      <div  className={`${isLoadingCalender?'hidden':''} m-0 left-0 top-0 mx-auto px-5`}>
        <div className='my-6 flex flex-col text-center'>
          <span className='text-gray-500'>We&apos;d love to get started</span>
          <span className='text-[25px] font-medium'>Make a booking</span>
        </div>
        <Calendar unavailableDates={updatedUnavailableDates} selectedDate={selectedDate} onSelectDate={handleSelectDate} />
        <p className='mb-7 mt-3 border-1 text-[20px] border-gray-400 bg-gray-100 p-2 rounded-[20px]'>Selected : <span className='font-bold bg-green-800 text-white p-1 animate-pulse'>{selectedDate?.toDateString()}</span></p>
        {selectedDate && ( 
          <div className="max-w-lg text-[19px] mx-auto mt-2 mb-8 rounded-lg">     
              <h2 className="text-[30px] text-green-700 font-light mb-4">Booking Form</h2>
            <form onSubmit={confirm}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="displayName">Title</label>
                <input
                  type="text"
                  id="displayName"
                  className="w-full bg-gray-200 h-[48px] text-[19px] px-4 py-2 rounded border border-gray-300 focus:outline-none"
                  placeholder="Enter your desired title"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="displayName">Caption</label>
                <textarea
                  type="text"
                  id="shoutOut"
                  className="w-full bg-gray-200 text-[19px] px-4 py-2 rounded border border-gray-300 focus:outline-none"
                  placeholder="Make your Shout-Out"
                  value={shoutout}
                  rows={4}
                  cols={50}
                  onChange={shoutoutChange}
                />
                <div>Characters left: {200 - shoutout.length}</div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="imageFile">Upload image</label>
                <div className='flex flex-col my-[10px]'>
                  <input
                  accept=".jpg, png, jfif"
                  type="file"
                  className="mb-4 w-[100%] hidden opacity-0 border-2 h-[30px] "
                  id="imageFile"
                  onChange={photoUploader} />
                  <button onClick={selectPhoto} className='bg-green-600 border-green-400 border-b-2 rounded-[25px] hover:bg-green-700 hover:border-none h-[50px] gap-[10px] flex text-white flex-row justify-center items-center'>
                    <span>Select a Photo</span>
                    <Upload/>
                  </button>
                </div>
                { imgPreview ? (
                    <div className=' w-[100%]' style={{ position: "relative", height: "300px" }}>
                      <Image src={imgPreview} layout='fill' objectFit='contain' priority={true}/>
                    </div>
                  ) : (
                    <div className='w-[100%] rounded-[20px] border-gray-400 border-1 h-[300px] border-1 flex flex-col justify-center text-gray-400 items-center border-gray-400'>
                      <span>Photo preview</span>
                      <ImgIcon/>
                    </div>
                  )
                    }
                {selectedFile && (
                  <div className='flex flex-row justify-between items-center bg-gray-200 h-[70px] px-[10px] mt-[5px]'>
                    <div className='flex flex-row gap-[15px] items-center'>
                      <FileIcon/>
                      <div className='flex flex-col text-[12px] text-gray-500'>
                        <span>{imgName}</span>
                        <span>{ imgSize.toFixed(2) } mb</span>
                      </div>
                      
                    </div>
                    <button className='cursor-pointer border-2 rounded-[50%] p-[11px] hover:bg-gray-400 transition-background duration-500 ease-in-out ' onClick={handleRemoveFile}><DeleteIcon/></button>
                  </div>
                )}

                {loadingUpload && <div style={{borderRadius:'10px'}} className="mt-2 p-2 bg-orange-200">Please wait while the photo is uploaded....
                <p>`Don&apos;t Navigate from this Page </p></div>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="category">Category</label>
                <select
                  id="category"
                  className="w-full px-4 py-2 rounded border h-[48px] bg-gray-200 border-gray-300 focus:outline-none"
                  value={selectedCategory}
                  onChange={handleCategoryChange} >
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
              {agree && (selectedCategory==="premium"||selectedCategory==="general") &&selectedFile&&(<button type="submit" onClick={confirm}
                className="bg-green-500 text-white font-semibold h-[50px] w-full px-[30px] py-2 rounded-[30px] my-3 hover:bg-green-700 border-b-1 border-b-green-900"  >
                Submit
              </button>)}
            </form>
          </div>)}
      </div>
    </Layout>
  );
};
BookingPage.auth=true;
export default BookingPage;
