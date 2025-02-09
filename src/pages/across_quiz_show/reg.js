import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { getError } from "../../../utils/error";
import { CloseButton, toast } from "react-toastify";
import Layout from "@/components/Layout";
import { Textarea } from "@nextui-org/react";
import PaystackBtn from "@/components/PaystackBtn"; 
import { useSession } from "next-auth/react";
import FileIcon from "../../../public/images/icon/FileIcon";
import Upload from "../../../public/images/icon/Upload";
import DeleteIcon from "../../../public/images/icon/DeleteIcon";
import CreatorIcon from "../../../public/images/icon/CreatorIcon";
import Link from "next/link";
import ImgIcon from "../../../public/images/icon/ImgIcon";
import CycleLoader from "@/components/CycleLoader";
import VidThumbnail from "@/components/VidThumbnail";
import Close from "../../../public/images/icon/Close";
import SuccessIcon from "../../../public/images/icon/SuccessIcon";
import UploadLoader from "@/components/UploadLoader";

const Across_Quiz_Show = () => {
    const { query } = useRouter();
    const [ dataUrl, setDataUrl] = useState(null);
    const [ title, setTitle ] = useState("");
    const [description,setDescription] = useState("");
    const [ selectedFile, setSelectedFile ] = useState(null);
    const [ uploadProgress, SetUploadProgress ] = useState('1%');
    const [ isDeleting, setIsDeleting ] = useState(false);
    const [ anError, setAnError ] = useState(null);
    const [ loading, setLoading ] = useState(false)
    const [ loadingUpdate, setLoadingUpdate ] = useState(false);
    const [ loadingPay, setLoadingPay ] = useState(false);
    const [ loadingUpload, setLoadingUpload ] = useState(false);

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
  
    function extractPublicId(url) {
      const match = url.split('upload/')[1].split('/')[1];
      return match
    }
  
    const handleRemoveFile = async (e) => {
      e.preventDefault();
      setIsDeleting(true);
      try {
        if (dataUrl) {
          const publicId = extractPublicId(dataUrl);
          const response = await axios.patch('/api/media/delete-video', { publicId });
        }
        setSelectedFile(null);
        document.getElementById('videoFile').value = '';
        setDataUrl(null);
        setIsDeleting(false);
      } catch (err) {
        console.log(error);
        toast.error('Failed to delete file, try again')
      }
    }
    
    const uploadHandler = async (e) => {
      setSelectedFile(e.target.files[0]);
  
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
      };
      const result = window.confirm(`Do you want to proceed with uploading ${e.target.files[0].name}?`);
      if (result) {
        const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
      try {
        const {
            data: { signature, timestamp },
            } = await axios('/api/admin/cloudinary-sign?type=vid');
     
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('signature', signature);
        formData.append('timestamp', timestamp);
        formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
  
        const { data } = await axios.post(url, formData, 
          {
            onUploadProgress: (progressEvent) => {
              const percentage = Math.round( (progressEvent.loaded / progressEvent.total)*100);
              SetUploadProgress(`${percentage}%`);
            },
          }
        );
  
        setDataUrl( data.secure_url);
        toast.success('File uploaded successfully');
        
      } catch (err) {
        handleRemoveFile();
        toast.error(`${getError(err)}, please check your internet connection and try again`);
      }
      } else {
        return;
      }
     
    };
  
    const submitHandler=({title, description})=>{
      setTitle(title);
      setDescription(description);
    };
  
    const newData = {
      name:session?.user.name?? null, 
      userId:session?.user._id?? null, 
      email:session?.user.email?? null,
      url: dataUrl,
    }
  
    const paySuccesAction = async (ref,) => {
        try {
          const oldData = {
            ...newData,
            referencePay:ref.reference,
            title:title, 
            description:description, 
            payment: true
          }
  
          const data = oldData;
          const response = await axios.post(`/api/skits`,data);
          console.log(response.data.id)
          toast.success('Product updated successfully');
          const baseUrl = window.location.origin;
          const url = `https://acrossnig.com/skits/${response.data.id}`;
          setPostUrl(url)
          setShowPreview(true);
        } catch (err) {
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
  
    const selectVideo = (e) => {
      e.preventDefault();
      document.getElementById('videoFile').click()
    }
    
    return (
       <div className="pt-[70px] flex flex-col items-center bg-gray-100">
        <div className="flex flex-col md:px-0 md:w-[50%] w-[90%] justify-center md:gap-5">
          <div className="md:col-span-3">
            {anError ? (
              <div className="alert-error">{anError}</div>
            ) : (
           <div>   
            <form className="mx-auto align-middle snap-center flex flex-col self-center justify-center text-center content-center max-w-screen-md" onSubmit={handleSubmit(submitHandler)} >
                <div className="w-[100%] text-center gap-2 text-[22px] font-bold text-green-600 border-b-1 border-b-gray-400 pb-[20px]">Across Nigeria Quiz Show</div>
                <span className="w-[100%] text-left gap-2 text-[30px] mt-[20px] mb-[10px] font-light text-black">Form</span>
                <div className="text-[14px] text-left text-gray-500 italic mb-[35px] border-t-1 border-t-green-400 pt-[10px] rounded-[10px] px-[10px]">Thank you for your interest in participating in the Across Nigeria Quiz Show! Please take a few moments to complete the registration form below. be sure to review your information before submitting the form.</div>
                
                <div className="text-left flex flex-col gap-2">
                  <label htmlFor="title">What is your current occupation/ Current status ? </label>
                  <input
                    type="text"
                    className="w-full border-1 border-gray-400 h-[45px] px-3 outline-none rounded-[12px] bg-gray-200 mb-[10px] accent-slate-950"
                    id="title"
                    placeholder="Are you a student, worker, farmer or enterprenuer...."
                    autoFocus
                    {...register('title', {
                      required: 'Please enter your occupation or status',
                    })}
                  />
                  {errors.title && (
                    <div className="text-red-500">{errors.title.message}</div>
                  )}
                </div>

                <div className="text-left flex flex-col mt-[10px] gap-2">
                  <label htmlFor="title">How well do you know about Nigeria? Give us a sense of your knowledge about Nigeria. What aspects of Nigerian history,
                    culture, geography, or politics do you find most fascinating? </label>
                  <textarea
                    className="w-full border-1 border-gray-400 h-[90px] px-3 outline-none rounded-[12px] bg-gray-200 mb-[10px] accent-slate-950"
                    id="title"
                    placeholder="Write here...."
                    autoFocus
                    {...register('title', {
                      required: 'Please enter your occupation or status',
                    })}
                  />
                  {errors.title && (
                    <div className="text-red-500">{errors.title.message}</div>
                  )}
                </div>

                <div className="text-left flex flex-col gap-2 mt-[10px]">
                  <label htmlFor="title">How did you hear about Across Nigeria Quiz Show?</label>
                  <select className="w-full border-1 border-gray-400 h-[45px] px-3 outline-none rounded-[12px] bg-gray-200 mb-[10px] accent-slate-950">
                    <option value="" disabled>-Select choice-</option>
                    <option value='social media'>Social Media</option>
                    <option value='from a friend'>From a Friend</option>
                    <option value='across nigeria website'>Across Nigeria Website</option>
                    <option value='television or radio'>Television or Radio</option>
                    <option value='other'>Other</option>
                  </select>
                </div>

                <div className="text-left flex flex-col gap-2 mt-[10px]">
                  <label htmlFor="title">How confident are you in answering questions about Nigeria? </label>
                  <select className="w-full border-1 border-gray-400 h-[45px] px-3 outline-none rounded-[12px] bg-gray-200 mb-[10px] accent-slate-950">
                    <option value="" disabled>-Select choice-</option>
                    <option value='very confident'>Very Confident</option>
                    <option value='somewhat confident'>Somewhat Confident</option>
                    <option value='not confident at all'>Not Confident at All</option>
                  </select>
                </div>

                <div className="text-left flex flex-col mt-[10px] gap-2">
                  <label htmlFor="title">What Nigerian city or landmark would you love to visit the most and why ? This could be an iconic location, a historical site, or a place rich in culture. </label>
                  <textarea
                    className="w-full border-1 border-gray-400 h-[90px] px-3 outline-none rounded-[12px] bg-gray-200 mb-[10px] accent-slate-950"
                    id="title"
                    placeholder="Write here...."
                    autoFocus
                    {...register('title', {
                      required: 'Please enter your occupation or status',
                    })}
                  />
                  {errors.title && (
                    <div className="text-red-500">{errors.title.message}</div>
                  )}
                </div>
               
                <div className="mb-4 mt-[20px] text-left">
                  <label htmlFor="imageFile">Upload a short video (1 minute max) introducing yourself, and share why you&apos;re excited to be part of the show</label>
                  <div className="flex flex-col text-[15px] mt-[10px] mb-[10px]">
                    <span>In your video, we&apos;d love to hear:</span>
                    <span>- Who you are and where you&apos;re from</span>
                    <span>- Why you want to participate in the quiz show</span>
                    <span>- How well do you know about nigeria</span>
                  </div>
                  <input accept=".mp4" type="file" className="w-full hidden" id="videoFile" onChange={uploadHandler}/>
                  <button onClick={selectVideo} className='bg-green-600 w-full mb-2 border-green-400 border-b-2 rounded-[25px] hover:bg-green-700 hover:border-none h-[50px] gap-[10px] flex text-white flex-row justify-center items-center'>
                    <span>Select a Video</span>
                    <Upload/>
                  </button>
                   { dataUrl ? (
                      <div className=' w-[100%]' style={{ position: "relative", height: "250px" }}>
                        <VidThumbnail url={dataUrl}/>
                      </div>
                    ) : (
                      <div className='w-[100%] rounded-[20px] border-gray-400 border-1 h-[250px] flex flex-col justify-center text-gray-400 items-center'>
                        { loadingUpload ?  <CycleLoader size={'40px'}/> : (
                          <>
                          <span className="mb-2">video thumbnail</span>
                          <ImgIcon/>
                          <span className="mt-3 text-[13px] text-gray-500">video should not exceed 30MB and 1 minute</span>
                          </>) 
                        }
                      </div>
                    )
                      }
                </div>
                {selectedFile && (
                  <div className={`${isDeleting?'animate-pulse opacity-50':''} flex flex-col justify-between items-center bg-gray-200 h-fit py-[10px] px-[10px] mt-[5px]`}>
                    <div className="flex w-full flex-row justify-between items-center">
                      <div className='flex flex-row gap-[15px] items-center'>
                        <FileIcon/>
                        <div className='flex flex-col text-[12px] text-gray-500'>
                          <span>{selectedFile.name.length>50?selectedFile.name.slice(0, 45)+' ...mp4':selectedFile.name}</span>
                          <span>{((selectedFile.size/1024)/1024).toFixed(2)} mb</span>
                        </div>
                        
                      </div>
                      <button disabled={!(uploadProgress==='100%')} className={`cursor-pointer border-2 rounded-[50%] p-[11px] hover:bg-gray-400 transition-background duration-500 ease-in-out ${uploadProgress==='100%'?'opacity-[100%]':'opacity-[0%]'}`} onClick={handleRemoveFile}><DeleteIcon/></button>
                    </div>
                    <div className=" bg-gray-200 flex flex-col w-full text-[14px]">
                      <UploadLoader percentage={uploadProgress}/>
                      <span className={`text-red-600 ${uploadProgress === '100%'?'hidden':''} text-[12px]`}>Please don&apos;t Navigate from this page, your file is uploading</span>
                    </div>
  
                  </div>
                )}
                {isDeleting && <span>Deleting video...</span>}
                <div className="mb-[20px] mt-[20px] text-left flex flex-row w-[100%] gap-3 items-top">
                  <input className="h-[25px] w-[25px]" checked={false} type="checkbox"/>
                  <span className="text-left">
                    I agree to the <span className="text-green-500 underline">Terms and Conditions </span>
                    before proceeding.
                  </span>
                </div>
                <div className="mb-4 flex-row flex justify-center items-center">
                  <button className="bg-green-500 h-[45px] mb-[80px] rounded-[25px] hover:border-l-0 hover:border-b-0 text-white hover:bg-green-600 border-l-3 border-b-3 border-b-green-800 border-l-green-800 w-[100%]" disabled={loadingUpdate||loadingUpload}>
                    {loadingUpdate||loadingUpload ? 'Submiting...' : 'Submit'}
                  </button>
                </div>
            </form>
              {loadingPay && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="w-fit h-fit p-2 font-semibold text-lg rounded-md cursor-pointer absolute left-2 top-20 z-50 bg-yellow-700" onClick={()=>(dispatch({type:'PAY_SUCCESS'}))}>Close</div>
                  <PaystackBtn pay={paySuccesAction} amount={10000} email={session?.user.email?? null} purpose="Payment for Skits Across Nigeria"/></div>)}
                  { showPreview&&(
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200">
                      <button className="w-[50px] flex flex-row justify-center items-center h-[50px] rounded-full cursor-pointer absolute right-[20px] top-[20px] z-50 bg-gray-300" 
                      onClick={()=>(router.push("/skitsPage"))}><Close/></button>
                        <div className="flex flex-col items-center space-x-2">
                          <SuccessIcon/>
                          <span className="font-extrabold text-gray-600 text-[22px]">Success, Your skit has been created</span>
                          <p className="flex w-full mt-[20px]">Copy the Link below and send it to your friends to view and vote for your skit</p>
                          <input type="text" value={postUrl} readOnly className="border border-gray-300 mt-[5px] rounded-[30px] px-2 h-[50px] w-[250px]"/>
                          <div>
                            <button onClick={copyToClipboard} className="bg-transparent border-gray-700 rounded-[30px] hover:bg-gray-300 text-gray-800 mt-[10px] border-1 px-4 h-[50px]">
                              Copy link
                            </button>
                            <Link href={postUrl}>
                              <button className="bg-transparent border-gray-700 rounded-[30px] hover:bg-gray-300 text-gray-800 mt-[10px] border-1 px-4 h-[50px]">
                                Open skit
                              </button>
                            </Link>
                          </div>
                        </div>
                    </div>
              )}  
          </div>  
                
          )}
        </div>
      </div>
    </div>
    );
}

export default Across_Quiz_Show;