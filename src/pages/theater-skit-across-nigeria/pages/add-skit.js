import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { getError } from "../../../../utils/error"; 
import { CloseButton, toast } from "react-toastify";
import Layout from "@/components/Layout";
import { Textarea } from "@nextui-org/react";
import PaystackBtn from "@/components/PaystackBtn"; 
import { useSession } from "next-auth/react";
import FileIcon from "../../../../public/images/icon/FileIcon";
import Upload from "../../../../public/images/icon/Upload";
import DeleteIcon from "../../../../public/images/icon/DeleteIcon";
import CreatorIcon from "../../../../public/images/icon/CreatorIcon";
import Link from "next/link";
import ImgIcon from "../../../../public/images/icon/ImgIcon";
import CycleLoader from "@/components/CycleLoader";
import InfoIcon from "../../../../public/images/icon/InfoIcon";
import VidThumbnail from "@/components/VidThumbnail";
import Close from "../../../../public/images/icon/Close";
import SuccessIcon from "../../../../public/images/icon/SuccessIcon";
import UploadLoader from "@/components/UploadLoader";
import Next from "../../../../public/images/icon/Next";
 
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
  const router = useRouter();
  const { data: session } = useSession();

  const [ dataUrl, setDataUrl] = useState(null);
  const [ selectedFile, setSelectedFile ] = useState(null);
  const [ uploadProgress, SetUploadProgress ] = useState('1%');
  const [ isDeleting, setIsDeleting ] = useState(false);
  const [ videoId, setVideoId ] = useState('');
  const [ vidTitle, setVidTitle ] = useState("");
  const [ vidCaption, setVidCaption ] = useState("");
  const [ vidLength, setVidLength ] = useState("");
  const [ loadingUpload, setLoadingUpload ] = useState(false);

  const [ modalHeight, setModalHeight ] = useState('h-[10%]');
  const [ modalOpacity, setModalOpacity ] = useState('opacity-0');
  const [ modalBlur, setModalBlur ] = useState('backdrop-blur-[0px]');
  const [ saveSuccess, setSaveSuccess ] = useState(false);
  const [ isSaving, setIsSaving ] = useState(false);
  const [ showUpdateModal, setShowUpdateModal ] = useState(false);

  const isFormFilled = vidTitle!=="" && vidCaption!=="";
  const isVideoUploaded = dataUrl !== null;

  const [ displayMessage, setDisplayMessage ] = useState(false);
  const [ message, setMessage ] = useState('Unknown message');
  const [ messageType, setMessageType ] = useState('neutral');

  const showInfo = (text, type) => {
    setDisplayMessage(true);
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setDisplayMessage(false);
      setMessage('Unknown message');
      setMessageType('neutral');
    }, 5000);
  }

  function extractPublicId(url) {
    const match = url.split('upload/')[1].split('/')[1];
    return match
  }

  const convertToVideoLengthFormat = ( seconds ) => {
    const hours = Math.floor(seconds/3600);
    const minutes = Math.floor( ( seconds % 3600 )/60);
    const secondsLeft = seconds % 60;

    const hoursStr = hours.toString().padStart(2, '0');
    const minutesStr = minutes.toString().padStart(2, '0');
    const secondsLeftStr = secondsLeft.toString().padStart(2, '0');
    if ( hours > 0 ) {
      return `${hoursStr}:${minutesStr}:${secondsLeftStr}`;
    } else {
      return `${minutesStr}:${secondsLeftStr}`;
    }
  }

  const modal = (type) => {
    if (type==='in') {
        setShowUpdateModal(true);

        setTimeout(() => {
            setModalHeight('h-[85%]');
            setModalOpacity('opacity-[100%]');
            setModalBlur('backdrop-blur-[2px]');
        }, 300);
    } else {
        setModalHeight('h-[10%]');
        setModalOpacity('opacity-0');
        setModalBlur('backdrop-blur-[0px]');

        setTimeout(() => {
            setShowUpdateModal(false);
        }, 500);
    }
}

  const handleRemoveFile = async () => {
    setIsDeleting(true);
    setLoadingUpload(true);
    try {
      if (dataUrl) {
        const publicId = extractPublicId(dataUrl);
        const response = await axios.patch('/api/media/delete-video', { publicId });
      }
      setSelectedFile(null);
      document.getElementById('videoFile').value = '';
      setDataUrl(null);
      setIsDeleting(false);
      setLoadingUpload(false);
    } catch (err) {
      showInfo('Failed to delete file, try again', 'error');
    }
  }
  
  const uploadHandler = async (e) => {
    setSelectedFile(e.target.files[0]);

    if (!e.target.files || e.target.files.length === 0) {
      showInfo('Please select a video file to upload.', 'error');
    return;
    }
    // Check file size
    const fileSize = e.target.files[0].size; // Size in bytes
    const maxSize = 60 * 1024 * 1024; // 30 MB in bytes
    if (fileSize > maxSize) {
      toast.error('File size exceeds 30MB limit.');

      e.target.files[0].value = "";  
        return;
    };
    const result = window.confirm(`Do you want to proceed with uploading ${e.target.files[0].name}?`);
    if (result) {
      const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
    try {
      setLoadingUpload(true);
      const { data: { signature, timestamp },  } = await axios('/api/admin/cloudinary-sign?type=theaterSkitCompetition');
   
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp);
      formData.append('folder', 'theater_skit_uploads');
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
      // formData.append('resource_type', 'video');
      // formData.append('format', 'mp4');// Explicitly convert to MP4 format

      const { data } = await axios.post(url, formData, 
        {
          onUploadProgress: (progressEvent) => {
            const percentage = Math.round( (progressEvent.loaded / progressEvent.total)*100);
            SetUploadProgress(`${percentage}%`);
          },
        }
      );
      setDataUrl( data.secure_url);
      setVideoId(data.public_id);
      const duration = data.duration;
      setVidLength( convertToVideoLengthFormat( duration ) );
      showInfo('File uploaded successfully', 'success');
      setLoadingUpload(false);
      
    } catch (err) {
      handleRemoveFile();
      showInfo(`Upload failed: ${err.message}`, 'error');
    }
    } else {
      return;
    }
   
  };


  const videoUpload = async () => {
    const data = { 
      userId:session?.user._id?? null, 
      email:session?.user.email?? null,
      vidUrl: dataUrl,
      vidCaption,
      vidTitle,
      vidLength,
    }
    try {
      setIsSaving(true);
      const response = await axios.post(`/api/media/upload-theater-skit`,data);
      const vidId = response.data.id;
      const url = `/theater-skit-across-nigeria/pages/skit-video/${vidId}`;
      setSaveSuccess(true);
      router.push( {
        pathname:url,
        query: {
          isNew:true
        }
      });
    } catch (error) {
      setIsSaving(false);
      setSaveSuccess(false);
      showInfo('Something went wrong, check your internet and try again.', 'error');
    }
        
  };

  const selectVideo = (e) => {
    e.preventDefault();
    document.getElementById('videoFile').click()
  }
  const enterVidDetails = () => {
    if (isVideoUploaded) {
      modal('in');
    }
  }

  return (
      <div className="flex flex-col md:px-0 px-[3%] pt-[25px] h-screen bg-gray-100 items-center md:gap-5">  
        <div className="mx-auto align-middle flex flex-col h-[100%] md:w-[50%] w-[100%] md:px-0" >
            <div className="mb-[20px]">
              <button onClick={()=>{modal('out')}} className="w-fit flex flex-row items-center transition-all duration-500 ease-in-out hover:scale-105 gap-2"><div className="rotate-180"><Next bg={'black'} size={'20px'}/></div>Go back</button>
            </div>
            <div className={`absolute z-10 ${displayMessage?'top-[50px] opacity-100':'top-[-10px] opacity-0'} ${messageType==='neutral'?'border-b-yellow-200':(messageType==='error'?'border-b-red-500':'border-b-green-500')} transition-all duration-300 ease-in-out border-[1px] border-gray-300 md:w-[50%] w-[80%] bg-white border-b-[2px] h-fit p-2 rounded-[3px]`}>
              <span>{message}</span>
            </div>
            <div className="mb-5 flex flex-row items-center gap-2 text-[20px] font-semibold text-green-600">Upload your masterpiece video!<CreatorIcon color={'#16a34a'}/></div>
            <div className="mb-4">
              <input accept=".mp4" type="file" className="w-full hidden" id="videoFile" onChange={uploadHandler}/>
              <button onClick={selectVideo} className='bg-green-500 hover:bg-green-600 w-full mb-3 rounded-[15px] text-white transition-all ease-in-out duration-300 h-[40px] gap-[10px] flex flex-row justify-center items-center'>
                <Upload />
                <span>Select video</span>
              </button>
              { dataUrl !== null &&
                  <div className=' w-[100%]' style={{ position: "relative", height: "200px" }}>
                    <VidThumbnail url={dataUrl} videoId={videoId}/>
                  </div> 
              }
              { dataUrl === null &&
                  <div className='w-[100%] rounded-[5px] border-gray-400 border-1 h-[200px] flex flex-col justify-center text-gray-400 items-center'>
                    { loadingUpload ?  <CycleLoader size={'30px'}/> : (
                      <>
                      <ImgIcon />
                      <span className="mt-3 text-[13px] text-gray-500">Video should not exceed 50MB</span>
                      </>) 
                    }
                  </div>
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
            <div className="mb-[40px] mt-[40px] flex-row flex justify-center items-center">
              <button onClick={enterVidDetails} className={`${isVideoUploaded?'bg-green-500 hover:scale-95 hover:bg-green-600 cursor-pointer':'bg-gray-400 cursor-not-allowed'} h-[40px] rounded-[25px] text-white transition-all duration-300 ease-in-out w-[100%]`}>
                Next
              </button>
            </div>
        </div>
         { showUpdateModal && 
          <div className={`h-screen w-screen transition-all duration-300 ease-in-out bg-black/10 flex flex-col justify-end ${modalBlur} fixed top-0`}>
              <div className={`${modalHeight} ${modalOpacity} transition-all overflow-hidden duration-500 ease-in-out w-[100%] rounded-t-[30px] pt-[30px] md:px-[25%] px-[3%] bg-gray-100`}>
                  <div className="mb-[20px]">
                      <button onClick={()=>{modal('out')}} className="w-fit flex flex-row items-center transition-all duration-500 ease-in-out hover:scale-105 gap-2"><div className="rotate-180"><Next bg={'black'} size={'20px'}/></div>Go back</button>
                  </div>
                  <span className="text-[23px] font-bold">Add a title and caption to your skit.</span>
                  <div className="mt-[20px] text-[18px]">
                      <div>
                          <label htmlFor="bank">Title</label>
                          <input 
                              type="text"
                              className="h-[48px] mt-[7px] px-3 outline-none w-[100%] bg-gray-200 rounded-[15px] border-1 border-gray-400"
                              placeholder="A beautiful story..."
                              onChange={(e) => {setVidTitle(e.target.value)}}
                              value={vidTitle}
                          />
                      </div>
                      <div className="mt-[10px]">
                          <label htmlFor="bank">Add caption</label>
                          <textarea
                              type="text"
                              className="h-[100px] mt-[7px] p-3 outline-none w-[100%] bg-gray-200 rounded-[15px] border-1 border-gray-400"
                              placeholder="Add caption here...."
                              onChange={(e) => {setVidCaption(e.target.value)}}
                              value={vidCaption}
                          />
                      </div>
                      <button onClick={videoUpload} className={`h-[45px] w-[100%] gap-2 mt-[30px] flex flex-row justify-center items-center text-white ${isSaving ?'bg-gray-400':(isFormFilled?'bg-green-500 hover:scale-105 hover:bg-green-700 transition-all':'bg-gray-400')} duration-500 ease-in-out rounded-[30px]`}>
                        { isSaving? <CycleLoader size={'20px'}/> : ''}
                        <span>Submit</span>
                      </button>
                  </div>
              </div>
          </div>
      }
      </div>
  );
}

// UploadScreen.auth=true;
