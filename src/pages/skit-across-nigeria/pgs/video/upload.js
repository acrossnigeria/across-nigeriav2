/**
 * Safely sets meta, link, and title tags for SEO and social.
 *
 * @param {Object} config
 * @param {string} config.title - The page title
 * @param {string} config.description - Description meta
 * @param {string} config.keywords - Keywords meta
 * @param {string} config.image - Social share image
 * @param {string} config.url - Canonical page URL
*/

import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import DeleteIcon from "../../../../../public/images/icon/DeleteIcon";
import VidThumbnail from "@/components/VidThumbnail";
import Next from "../../../../../public/images/icon/Next";
import { CheckLine, CloudUpload, EllipsisVertical, FileVideo, Info, Layers2, Server, TriangleAlert, Upload } from "lucide-react";
import ProcessLoader from "@/components/ui/ProcessLoader";
import TextInput from "@/components/ui/TextInput";
import TextAreaInput from "@/components/ui/TextAreaInput";
import PaystackClick from "@/components/PaystackClick";
 
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
  const uploadRef = useRef(null);

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
    const secondsLeft = Math.floor(seconds % 60);

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
      SetUploadProgress('1%');
    } catch (err) {
      showInfo('Failed to delete file, try again', 'error');
      setIsDeleting(false);
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
    const maxSize = 95 * 1024 * 1024; // 95 MB in bytes
    if (fileSize > maxSize) {
        toast.error('File size exceeds 30MB limit.');
        e.target.value = "";  
        return;
    }

    const originalFile = e.target.files[0];

    // Convert file to Blob
    const videoBlob = new Blob([originalFile], { type: originalFile.type });

    // Generate a random name with the same file extension
    const fileExtension = originalFile.name.split('.').pop();
    const randomFileName = `${crypto.randomUUID()}.${fileExtension}`;

    // Create a new File object with the Blob
    const renamedFile = new File([videoBlob], randomFileName, { type: originalFile.type });

    const result = window.confirm(`Do you want to proceed with uploading ${randomFileName}?`);
    if (!result) return;

    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;

    try {
        setLoadingUpload(true);
        const uploadController = new AbortController();
        uploadRef.current = uploadController;

        // Get Cloudinary signature
        const { data: { signature, timestamp } } = await axios('/api/admin/cloudinary-sign?type=SKIT_ACROSS_NIGERIA');

        const formData = new FormData();
        formData.append('file', renamedFile, renamedFile.name);
        formData.append('signature', signature);
        formData.append('timestamp', timestamp);
        formData.append('folder', 'skit_across_nigeria_uploads');
        formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);

        const { data } = await axios.post(url, formData, {
            onUploadProgress: (progressEvent) => {
                const percentage = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                SetUploadProgress(`${percentage}%`);
            },
            signal:uploadController.signal,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        setDataUrl(data.secure_url);
        setVideoId(data.public_id);
        setVidLength(convertToVideoLengthFormat(data.duration));

        showInfo('File uploaded successfully', 'success');
        setLoadingUpload(false);
        
    } catch (err) {
        handleRemoveFile();
        showInfo(`Upload failed: ${err.message}`, 'error');
    }
  };

  const cancelUpload = () => {
    if (uploadRef.current) {
      uploadRef.current.abort();
      setLoadingUpload(false);
      setDataUrl(null);
      setSelectedFile(null);
      SetUploadProgress('1%');
      showInfo('Upload cancelled', 'neutral');
    }
  }



  const videoUpload = async ( ref ) => {
    modal('out');
    setIsSaving(true);
    const data = { 
      userId:session?.user._id?? null, 
      email:session?.user.email?? null,
      vidUrl: dataUrl,
      vidCaption,
      vidTitle,
      vidLength,
      paymentRef:ref?.reference
    }
    try {
      const response = await axios.post(`/api/media/skit_across_nigeria/skit`,data);
      const vidId = response.data.id;
      const url = `/skit-across-nigeria/pages/skit-video/${vidId}`;
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
      showInfo('Something went wrong, ', error.message);
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

  useEffect( () => {
    document.addEventListener("DOMContentLoaded", () => {
      configureMeta();
    })
  }, [])

  return (
      <div className="flex flex-col justify-center h-screen bg-gray-100 items-center">  

        <div className="absolute top-0 bg-green-600 w-[100%] py-5 flex flex-row justify-between px-3 gap-4 left-0 z-50">
          <button onClick={()=>{router.push('/skit-across-nigeria/pages')}} className="w-fit p-2 transition-all duration-500 ease-in-out hover:scale-105"><div className="rotate-180"><Next bg={'white'} size={'20px'}/></div></button>
          <div className="flex font-bold flex-row items-center gap-3 text-[20px] text-white">{ loadingUpload ? "Uploading" : "Video upload" }</div>
          <button onClick={()=>{router.push('/skit-across-nigeria/pages')}} className="w-fit p-2 transition-all duration-500 ease-in-out hover:scale-105"><div className="rotate-180"><EllipsisVertical color={'white'} size={'20px'}/></div></button>
        </div>

        { isSaving && (
          <div className="z-[1000] flex flex-col gap-2 justify-center items-center h-screen w-screen bg-gray-100">
            <Layers2 strokeWidth={1} size={'100px'} className="text-green-500"/>
            <div className="flex flex-row items-center gap-2">
              <ProcessLoader size={'25px'}/>
              <span>Submiting your skit..</span>
            </div>
            <div className="absolute bottom-[15%] text-gray-500 flex flex-row items-center justify-between gap-2">
              <Info size={'15px'}/>
              <span className="text-[14px]">Please don&nbsp;t navigate from this page</span>
            </div>
          </div>
        )}
        
        { !isSaving && (
          <div className="mx-auto align-middle flex flex-col h-fit max-w-[400px] w-[100%] md:px-0" >
            <div className={`fixed z-[2000] text-[14px] ${displayMessage?'top-[70px] opacity-100':'top-[-10px] opacity-0'} ${messageType==='neutral'?'border-b-yellow-200':(messageType==='error'?'border-b-red-500':'border-b-green-600')} flex flex-row gap-2 items-center transition-all duration-300 ease-in-out border-[1px] border-gray-300 md:w-[50%] md:left-[25%] left-[10%] w-[80%] bg-white border-b-[2px] h-fit p-3 rounded-[5px]`}>
              <span>{message}</span>
              { messageType==='error' ?(
                <TriangleAlert strokeWidth={1} size={'20px'} className="text-red-600"/>
              ):(
                <CheckLine strokeWidth={1} size={'20px'} className="text-green-600"/>
              )}
            </div>

            <div className="mb-4">
              { dataUrl !== null &&
                  <div className='w-[85%] mx-auto flex flex-row justify-end' style={{ position: "relative", height: "350px" }}>
                    { isDeleting && (
                      <div className="h-full w-full bg-black/50 text-white absolute flex flex-col gap-2 justify-center items-center">
                        <ProcessLoader size={'20px'}/>
                        <span>Deleting video..</span>
                      </div>
                    )}
                    { !isDeleting && ( 
                      <button disabled={!(uploadProgress==='100%')} className={`cursor-pointer absolute z-50 bg-white/50 rounded-[50%] p-[11px] hover:bg-white/80 mt-2 mr-2 transition-background duration-500 ease-in-out ${uploadProgress==='100%'?'opacity-[100%]':'opacity-[0%]'}`} onClick={handleRemoveFile}>
                        <DeleteIcon/>
                      </button>
                    )}
                    <VidThumbnail url={dataUrl} videoId={videoId}/>
                  </div> 
              }
              { dataUrl === null &&
                  <>
                    { loadingUpload ?  ( 
                        <div className='w-[85%] mx-auto h-[350px] flex flex-col justify-center items-center'>
                          <div className="flex flex-col justify-center mb-5 items-center">
                            <CloudUpload strokeWidth={1} className="animate-pulse" size={'70px'}/>
                            <FileVideo strokeWidth={1} size={'180px'} className=" text-green-700"/>
                            <div className='flex flex-col mt-2 text-[12px] text-gray-500'>
                              <span>{selectedFile?.name?.length>50?selectedFile?.name?.slice(0, 45)+' ...mp4':selectedFile?.name}</span>
                              <span>{((selectedFile?.size/1024)/1024).toFixed(2)} mb</span>
                            </div>
                          </div>
                          <div className="w-full h-[25px] flex flex-col justify-center items-center bg-green-400 rounded-[5px]">
                            <div style={{ width:uploadProgress }} className="h-full self-start bg-green-600 animate-pulse rounded-[5px]"/>
                            <span className="absolute text-white">{uploadProgress}</span>
                          </div>
                        </div>
                    ) : (
                        <div className='w-[85%] mx-auto rounded-[5px] border-gray-300 border-2 h-[350px] flex flex-col justify-center items-center'>
                          <FileVideo strokeWidth={1} size={'180px'} className=" text-yellow-500"/>
                          <div className="flex flex-row items-center justify-center mt-5 mb-2 gap-1">
                            <button onClick={selectVideo} className="flex flex-row gap-2 hover:text-blue-800 text-blue-600">
                              <Upload strokeWidth={2} size={'18px'} className="text-blue-600 mt-[1.5px]"/>
                              <span>Upload</span>
                            </button>
                            <span>from device</span>
                          </div>
                          <span className="text-[13px] text-gray-500">Max video size upto 90mb</span>
                        </div>
                      ) 
                    }
                  </>
              }
            </div>

            <input accept=".mp4" type="file" className="w-full hidden" id="videoFile" onChange={uploadHandler}/>
            <div className="flex flex-row justify-center mt-[50px] items-center">

              { ( !isVideoUploaded && !loadingUpload ) && (
                <button onClick={selectVideo} className='bg-green-500 hover:bg-green-600 w-[90%] rounded-[20px] text-white transition-all ease-in-out duration-300 Md:h-[45px] h-[50px] flex flex-row justify-center items-center'>
                  <span>Upload</span>
                </button>
              )}

              { ( isVideoUploaded && !loadingUpload ) && (
                <button onClick={ !isDeleting ? enterVidDetails : ()=>null } className={`${isVideoUploaded?`cursor-pointer ${isDeleting?'bg-gray-400 cursor-not-allowed':'bg-green-500 hover:bg-green-600'} border-gray-400 text-white`:'text-gray-400 border-gray-400 border-1 cursor-not-allowed'} rounded-[20px] h-[50px] md:h-[45px] flex flex-row gap-2 items-center justify-center transition-all duration-300 ease-in-out w-[90%]`}>
                  Continue
                </button>
              )}

              { loadingUpload && (
                <button onClick={cancelUpload} className={`rounded-[5px] bg-red-600 hover:bg-red-700 border-1 h-[50px] md:h-[45px] flex flex-row gap-2 text-white items-center justify-center transition-all duration-300 ease-in-out w-[80%]`}>
                  Cancel upload
                </button>
              )}

            </div>

          </div>
        )}

         { showUpdateModal && 
          <div className={`h-screen w-screen transition-all duration-300 ease-in-out bg-black/10 flex flex-col justify-end ${modalBlur} fixed z-[1000] top-0`}>
              <div className={`${modalHeight} ${modalOpacity} transition-all overflow-hidden duration-500 ease-in-out w-[100%] rounded-t-[5px] pt-7 bg-gray-100`}>
                  <div className="mb-4 flex flex-row px-3 items-center gap-2">
                      <button onClick={()=>{modal('out')}} className="w-fit transition-all duration-500 ease-in-out hover:scale-105 p-1"><div className="rotate-180"><Next bg={'black'} size={'20px'}/></div></button>
                      <span className="font-semibold text-[18px]">Add title and caption to your skit</span>
                  </div>
                  <div className="md:max-w-[400px] md:px-0 px-3 h-fit w-[100%] flex flex-col mx-auto">
                    <div className="mt-[20px] flex flex-col text-[18px]">
            
                      <TextInput className={'mb-4'} label={'Title'} type={'text'} placeholder={"A beautiful story.."} onChange={(e) => {setVidTitle(e.target.value)}} value={vidTitle}/>
                      <TextAreaInput onChange={(e) => {setVidCaption(e.target.value)}} value={vidCaption} label={'Caption'} className={'mb-6'} placeholder={'Write here...'}/>

                      { isFormFilled ? (
                        <PaystackClick buttonText={'Pay and submit'} callBack={videoUpload} email={session?.user?.email} amount={5000}/>
                      ): (
                        <button className={`h-[45px] w-[100%] gap-2 mb-2 flex flex-row justify-center items-center text-white bg-gray-400 cursor-not-allowed duration-500 ease-in-out rounded-[5px]`}>
                          <span>Pay and submit</span>
                        </button>
                      )}
                      <div className="text-gray-800 flex flex-row justify-center items-center gap-1 w-full mt-4 text-[14px]">
                        <Info strokeWidth={1} size={'15px'}/>
                        <span>Participation costs &#8358;5000</span>
                      </div>
                    </div>
                  </div>
              </div>
          </div>
      }
      </div>
  );
}

// UploadScreen.auth=true;
