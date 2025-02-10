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
import InfoIcon from "../../../public/images/icon/InfoIcon";
import VidThumbnail from "@/components/VidThumbnail";
import Close from "../../../public/images/icon/Close";
import SuccessIcon from "../../../public/images/icon/SuccessIcon";
import UploadLoader from "@/components/UploadLoader";

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
};

export default function UploadScreen() {
  const { query } = useRouter();
  const [{ loading, error, loadingUpdate, loadingPay, loadingUpload }, dispatch] =
  useReducer(reducer, {
    loading:false,
    error: '',
  });
  const [ dataUrl, setDataUrl] = useState(null);
  const [title, setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [ selectedFile, setSelectedFile ] = useState(null);
  const [ uploadProgress, SetUploadProgress ] = useState('1%');
  const [ isDeleting, setIsDeleting ] = useState(false);
  const [ videoId, setVideoId ] = useState('');
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
      dispatch({ type: 'UPLOAD_REQUEST' });
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

      dispatch({ type: 'UPLOAD_SUCCESS' });
      setDataUrl( data.secure_url);
      setVideoId(data.public_id)
      toast.success('File uploaded successfully');
      
    } catch (err) {
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
      handleRemoveFile();
      toast.error(`${getError(err)}, please check your internet connection and try again`);
    }
    } else {
      return;
    }
   
  };

  const submitHandler=({title, description})=>{
    dispatch({type:'PAY_REQUEST'})
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
      dispatch({type:'PAY_SUCCESS'})
      try {
        const oldData = {
          ...newData,
          referencePay:ref.reference,
          title:title, 
          description:description, 
          payment: true
        }

        dispatch({ type: 'UPDATE_REQUEST' });
        const data = oldData;
        const response = await axios.post(`/api/skits`,data);
        console.log(response.data.id)
        dispatch({ type: 'UPDATE_SUCCESS' });
        toast.success('Product updated successfully');
        const baseUrl = window.location.origin;
        const url = `https://acrossnig.com/skits/${response.data.id}`;
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

  const selectVideo = (e) => {
    e.preventDefault();
    document.getElementById('videoFile').click()
  }


  return (
    <Layout title={`Upload Skit`}>
      {/* <WelcomeScreen2 section="Skits Across Nigeria" toc="Coming soon" /> */}
      <div className="mt-5 flex flex-col md:px-0 px-[5%] justify-center md:gap-5">
        <div className="md:col-span-3">
          {error ? (
            <div className="alert-error">{error}</div>
          ) : (
         <div>   
          <form className="mx-auto align-middle snap-center self-center justify-center content-center max-w-screen-md" onSubmit={handleSubmit(submitHandler)} >
              <div className="mb-4 inline-flex gap-2 text-[26px] font-bold text-green-600">Upload a skit<CreatorIcon color={'#16a34a'}/></div>
              <div className="mb-4">
                <label htmlFor="title">Skit Title</label>
                <input
                  type="text"
                  className="w-full border h-[48px] px-3 rounded-[20px] bg-gray-100 accent-slate-950"
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
                <label htmlFor="imageFile">Upload video</label>
                <input accept=".mp4" type="file" className="w-full hidden" id="videoFile" onChange={uploadHandler}/>
                <button onClick={selectVideo} className='bg-green-600 w-full mb-2 border-green-400 border-b-2 rounded-[25px] hover:bg-green-700 hover:border-none h-[50px] gap-[10px] flex text-white flex-row justify-center items-center'>
                  <span>Select a Video</span>
                  <Upload/>
                </button>
                 { dataUrl ? (
                    <div className=' w-[100%]' style={{ position: "relative", height: "300px" }}>
                      <VidThumbnail url={dataUrl} videoId={videoId}/>
                    </div>
                  ) : (
                    <div className='w-[100%] rounded-[20px] border-gray-400 border-1 h-[300px] flex flex-col justify-center text-gray-400 items-center'>
                      { loadingUpload ?  <CycleLoader size={'40px'}/> : (
                        <>
                        <span className="mb-2">video thumbnail</span>
                        <ImgIcon/>
                        <span className="mt-3 text-[13px] text-gray-500">Skits should not exceed 30MB</span>
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
              <div className="mb-4 mt-4">
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
              <div className="mb-4 flex-row flex justify-center items-center">
                <button className="bg-orange-500 h-[50px] rounded-[25px] hover:border-l-0 hover:border-b-0 text-white hover:bg-orange-600 border-l-3 border-b-3 border-b-orange-800 border-l-orange-800 w-[70%]" disabled={loadingUpdate||loadingUpload}>
                  {loadingUpdate||loadingUpload ? 'Loading...' : 'Create'}
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
  </Layout>
  );
}

UploadScreen.auth=true;
