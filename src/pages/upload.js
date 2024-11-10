import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { getError } from "../../utils/error";
import { toast } from "react-toastify";
import Layout from "@/components/Layout";
import { Textarea } from "@nextui-org/react";
import PaystackBtn from "@/components/PaystackBtn";
import { useSession } from "next-auth/react";
import WelcomeScreen2 from "@/components/WelcomScreen2";

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
export default function AdminProductEditScreen() {
  const { query } = useRouter();
   const [{ loading, error, loadingUpdate, loadingPay, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading:false,
      error: '',
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
    const[ postUrl, setPostUrl]=useState("")
      const[ showPreview, setShowPreview]=useState(false)
  const router = useRouter();
 const { data: session } = useSession();
  
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
      setDataUrl( data.secure_url);
      toast.success('File uploaded successfully');
      
    } catch (err) {
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
    } else {
      return;
    }
   
  };
const submitHandler=({title, description})=>{
   dispatch({type:'PAY_REQUEST'})
setTitle(title);
setDescription(description)
   }
const newData={name:session?.user.name?? null, 
  userId:session?.user._id?? null, 
  email:session?.user.email?? null, url: dataUrl,}
 const paySuccesAction = async (ref,) => {
    dispatch({type:'PAY_SUCCESS'})
    try {
      const oldData={...newData,referencePay:ref.reference,title:title, 
        description:description, payment: true}
      dispatch({ type: 'UPDATE_REQUEST' });
      const data= oldData;
      const response=await axios.post(`/api/skits`,data);
      console.log (response.data.id)
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('Product updated successfully');
      const baseUrl=window.location.origin;
      const url=baseUrl+`/skits/`+response.data.id;
      setPostUrl(url)
      setShowPreview(true);
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(postUrl)
      .then(() => {
       toast.success('Link copied to clipboard!');
      })
      .catch((error) => {
        console.error('Unable to copy link: ', error);
      });
  };

  return (
    <Layout title={`Upload Skit`}>
      <WelcomeScreen2 section="Skits Across Nigeria" toc="Coming soon" />
      <div className="grid p-10 md:grid-cols-4 md:gap-5">
        <div className="md:col-span-3">
          {error ? (
            <div className="alert-error">{error}</div>
          ) : (
         <div>   <form
              className="mx-auto align-middle snap-center self-center justify-center content-center max-w-screen-md"
              onSubmit={handleSubmit(submitHandler)}
            >
              <h1 className="mb-4 text-xl">{`Upload Your Skit`}</h1>
              <div className="mb-4">
                <label htmlFor="title">Skit Title</label>
                <input
                  type="text"
                  className="w-full border border-yellow-700 accent-slate-950"
                  id="title"
                  placeholder="Enter title of your Skit"
                  autoFocus
                  {...register('title', {
                    required: 'Please enter Skit title',
                  })}
                />
                {errors.title && (
                  <div className="text-red-500">{errors.title.message}</div>
                )}
              </div>
             
              <div className="mb-4">
                <label htmlFor="imageFile">Upload image</label>
                <input
                accept=".mp4"
                  type="file"
                  className="w-full"
                  id="imageFile"
                  onChange={uploadHandler}
                />

                {loadingUpload && <div className=" bg-orange-400">Please wait while we upload your File....
                <p>`Don&apos;t Navigate from this Page </p></div>}
              </div>
              <div className="mb-4">
                Skits should not exceed 30MB
              </div>
              <div className="mb-4">
                <label htmlFor="description">Video Description</label>
                <Textarea
                  type="text"

                  className="w-full border ring-0 rounded-md p-0"
                  id="description"
                  placeholder="Please Describe your video"
                  {...register('description', {
                    required: 'Please enter description',
                  })}
                />
                {errors.description && (
                  <div className="text-red-500">
                    {errors.description.message}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <button disabled={loadingUpdate||loadingUpload} className="">
                  {loadingUpdate||loadingUpload ? 'Loading' : 'Update'}
                </button>
              </div>
            </form>
              {loadingPay&&(<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                 <div className="w-fit h-fit p-2 font-semibold text-lg rounded-md cursor-pointer absolute left-2 top-20 z-50 bg-yellow-700" 
                 onClick={()=>(dispatch({type:'PAY_SUCCESS'}))}>Close</div><PaystackBtn pay={paySuccesAction} 
            amount={10000} email={session?.user.email?? null} 
            purpose="Payment for Skits Across Nigeria"/></div>)}
            {showPreview&&(<div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200">
                 <div className="w-fit flex flex-col justify-start h-fit p-2 font-semibold text-lg rounded-md cursor-pointer absolute left-2 top-20 z-50 bg-yellow-700" 
                 onClick={()=>(router.push("/skitsPage"))}>Close</div>
                 <p className="flex w-full">Copy the Link below and send it to your friends to view and vote for your skit</p>
                  <div className="flex items-center space-x-2">
      <input
        type="text"
        value={postUrl}
        readOnly
        className="border border-gray-300 rounded-md px-2 py-1 w-48"
      />
      <button
        onClick={copyToClipboard}
        className="bg-yellow-700 text-white px-4 py-1 rounded-md"
      >
        Copy
      </button>
    </div>
                 </div>)}  </div>  
              
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminProductEditScreen.auth=true;
