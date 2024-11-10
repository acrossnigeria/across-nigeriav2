import axios from "axios";
import { useRouter } from "next/router";
import React, { useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Layout from "@/components/Layout";
import { Textarea } from "@nextui-org/react";
import PaystackBtn from "@/components/PaystackBtn";
import { useSession } from "next-auth/react";
import WelcomeScreen2 from "@/components/WelcomScreen2";
import { getError } from "../../../utils/error";
import Checkbox from "@/components/Checkbox";

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
const UploadForm = () => {
  const [fileType, setFileType] = useState('');
  const [fileCategory, setFileCategory] = useState('');
  const [ticked, setTicked]=useState(false)
    const [{ loading, error, loadingUpdate, loadingPay, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading:false,
      error: '',
      loadingUpload:false
    });

const[dataUrl, setDataUrl]=useState("");
const [title, setTitle]=useState("");
const [description,setDescription]=useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const[isuploaded, setIsuploaded]=useState(false);
  const router = useRouter();
 const { data: session } = useSession();

   const handleFileTypeChange = (e) => {
    setFileType(e.target.value);
    setFileCategory('');
  };
  
  const handleFileCategoryChange = (e) => {
    setFileCategory(e.target.value);
  };


 const uploadHandler = async (e) => {
     if (!e.target.files || e.target.files.length === 0) {
    toast.error('Please select a VIDEO file to upload.');
    return;
  }
   // Check file size
  const fileSize = e.target.files[0].size; // Size in bytes
  const maxSize = 30 * 1024 * 1024; // 30 MB in bytes
  if (fileSize > maxSize) {
    toast.error('File size exceeds 30MB limit.');

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
      setIsuploaded(true);
      setDataUrl( data.secure_url);
      localStorage.setItem('dataUrl', data.secure_url)
      toast.success('File uploaded successfully');
      
    } catch (err) {
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
    } else {
      return;
    }
   
  };
  
  const  handleTermsCheckboxChange=(isChecked)=>{setTicked(isChecked)}
 const submitHandler=({title, description})=>{
   dispatch({type:'PAY_REQUEST'})
setTitle(title);
setDescription(description)
   }
   const newData={name:session?.user.name?? null, 
  userId:session?.user._id?? null, 
  email:session?.user.email?? null, url: dataUrl,fileType:fileType,
category:fileCategory,}

 const paySuccesAction = async (ref,) => {
    dispatch({type:'PAY_SUCCESS'})
    try {
      const oldData={...newData,referencePay:ref.reference,title:title, 
        description:description, payment: true}
      dispatch({ type: 'UPDATE_REQUEST' });
      const data= oldData;
      const response=await axios.post(`/api/naijavibes/postVibes`,data);
      console.log (response)
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success(`Your NaijaVibes ${fileType} has been uploaded successfully`);
      const baseUrl=window.location.origin;
      const url=baseUrl+`/naijavibes/${fileType==='videos'?'naijavideos':'naijaphotos'}/`+response.data.id;
      localStorage.setItem('postUrl',url);
      localStorage.setItem('name',newData.name);
     localStorage.setItem('email',newData.email);
     localStorage.setItem('filetype',fileType);
     localStorage.setItem("mediaTitle", title);
      localStorage.setItem("mediaDesc", description);
     router.push("/naijavibes/preview")
       } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  };
  


  return (
    <Layout title={`Naija Vibes Upload Page`}>
        <WelcomeScreen2 section="Naija vibes Photos" toc="Welcome to NaijaVibes Picture upload Page" />
    <div className="max-w-md px-10 mx-auto mt-8">
      <h1 className="text-3xl font-bold text-center mb-4">Welcome to Naija Vibes</h1>
      <p className="text-lg text-center mb-6">What type of file will you want upload to Naijavibes Today?</p>
      
      <div className="mb-6">
        <label className="block mb-2 font-semibold" htmlFor="fileType">Choose file type:</label>
        <select
          id="fileType"
          className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-yellow-400"
          value={fileType}
          onChange={handleFileTypeChange}
        >
          <option value="">Select file type</option>
          <option value="videos">Naijavibes videos</option>
          <option value="photos">Naijavibes photos</option>
        </select>
      </div>
      
      {fileType === 'videos' && (
        <div className="mb-6">
          <label className="block mb-2 font-semibold" htmlFor="fileCategory">Choose video category:</label>
          <select
            id="fileCategory"
            className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-yellow-400"
            value={fileCategory}
            onChange={handleFileCategoryChange}
          >
            <option value="">Select video category</option>
            <option value="tweTwe">TWE TWE</option>
            <option value="musik">MUSIK</option>
            <option value="dance">DANCE</option>
            <option value="skitsPranks">SKITS & PRANKS</option>
          </select>
        </div>
      )}
      
      {fileType === 'photos' && (
        <div className="mb-6">
          <label className="block mb-2 font-semibold" htmlFor="fileCategory">Choose photo category:</label>
          <select
            id="fileCategory"
            className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-yellow-400"
            value={fileCategory}
            onChange={handleFileCategoryChange}
          >
            <option value="">Select Picture category</option>
            <option value="naijaFaces">FACES</option>
            <option value="showdem">SHOW DEM</option>
            <option value="lookingood">LOOKING GOOD</option>
            <option value="scenes">SCENES</option>
          </select>
        </div>
      )}
      
      {fileCategory && (
        <form onSubmit={handleSubmit(submitHandler)}>
          <h2 className="text-xl font-bold mb-4">Upload Your NaijaVibes {fileType === 'videos' ? 'Video' : 'Picture'}</h2>
          <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-yellow-400"
              placeholder={`Enter title of your ${fileType === 'videos' ? 'video' : 'picture'}`}
              {...register('title', {
                    required: `Please enter ${fileType === 'videos' ? 'Upload Video' : 'Upload Picture'} title`,
                  })}
            />
             {errors.title && (
                  <div className="text-red-500">{errors.title.message}</div>
                )}
          </div>
          
          <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="imageFile">Upload Image</label>
            <input
              type="file"
              id="imageFile"
              className="w-full"
              accept={fileType === 'videos' ? '.mp4' : 'image/*'}
               onChange={uploadHandler}
            />
          </div>
          {loadingUpload && <div className=" bg-orange-400">Please wait while we upload your File....
                <p>Don&apos;t Navigate from this Page </p></div>}
          
          {fileType === 'videos' && (
            <p className="mb-4">Videos should not exceed 30MB</p>
          )}
          
          <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="description">Description</label>
            <Textarea
              id="description"
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-yellow-400"
              placeholder="Please describe your video or picture"
              rows="4"
              {...register('description', {
                    required: 'Please enter description',
                  })}
            ></Textarea>
            {errors.description && (
                  <div className="text-red-500">
                    {errors.description.message}
                  </div>
                )}
          </div>
           <Checkbox handleTermsCheckboxChange={handleTermsCheckboxChange}/>
        
          <div className="mb-4">
           {isuploaded && ticked&&<button type="submit" className="w-full bg-yellow-700 text-white font-bold py-2 px-4 rounded-md">
              {fileType === 'videos' ? 'Upload Video' : 'Upload Picture'}
            </button>}
          </div>
        </form>
      )}
     {loadingPay && (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                 <div className="w-fit h-fit p-2 font-semibold text-lg rounded-md cursor-pointer absolute left-2 top-20 z-50 bg-yellow-700" 
                 onClick={()=>(dispatch({type:'PAY_SUCCESS'}))}>Close</div><PaystackBtn pay={paySuccesAction} 
            amount={100} email={session?.user.email?? null} 
            purpose="Payment for NaijaVibes"/></div>)} 
            
    </div></Layout>
  );
};

export default UploadForm;
UploadForm.auth=true;