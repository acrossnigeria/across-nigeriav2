import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import PaystackBtn from "@/components/PaystackBtn"; 
import { useSession } from "next-auth/react";
import FileIcon from "../../../public/images/icon/FileIcon";
import Upload from "../../../public/images/icon/Upload";
import DeleteIcon from "../../../public/images/icon/DeleteIcon";
import ImgIcon from "../../../public/images/icon/ImgIcon";
import CycleLoader from "@/components/CycleLoader";
import VidThumbnail from "@/components/VidThumbnail";
import Close from "../../../public/images/icon/Close";
import SuccessIcon from "../../../public/images/icon/SuccessIcon";
import UploadLoader from "@/components/UploadLoader";
import ExitConfirmScreen from "@/components/ExitConfirmScreen";
import { getSession } from "next-auth/react";

export async function  getServerSideProps(context) {
    const session = await getSession(context);
    const userId = session?.user?._id??false;
    if ( userId ) {
      const response = await axios.get(`https://acrossnig.com/api/across_quiz_show/handler?type=CHECKUSER&userId=${userId}`);
      const isUserRegistered = response.data.isUserFound;

      if ( isUserRegistered ) {
          return {
              redirect: {
                  destination: '/across_quiz_show',
                  permanent: false,
              }
          };
      } else {
        return { props: { message: 'user not registered, proceed.'} }
      }
    } else {
      return {
        redirect: {
            destination: '/account/login',
            permanent: false,
        }
    };
    }
   
} 


const Across_Quiz_Show = ( { message } ) => {
    console.log( message )
    const { query } = useRouter();

    // const [ selectedFile, setSelectedFile ] = useState(null);
    // const [ uploadProgress, SetUploadProgress ] = useState('1%');
    // const [ loadingUpload, setLoadingUpload ] = useState(false);
    // const [ isDeleting, setIsDeleting ] = useState(false);
    const [ anError, setAnError ] = useState(null);
    // const [ videoId, setVideoId ] = useState('');
    const [ introVideoUrl, setIntroVideoUrl ] = useState('No introduction');

    const [ startPayment, setStartPayment ] = useState(false);
    const [ regSuccess, setRegSuccess ] = useState(false);
    const [ startRegistration, setStartRegistration ] = useState(false)
    const router = useRouter();
    const { data: session } = useSession();
    const [ toExit, setToExit ] = useState(false);

    // form states
    const [ status, setStatus ] = useState('');
    const [ whatsappPhone, setWhatsappPhone ] = useState('');
    const [ knowledgeOfNigeria, setKnowledgeOfNigeria ] = useState('');
    const [referralSource, setReferralSource ] = useState('');
    const [confidenceInKnowledge, setConfidenceInKnowledge ] = useState('');
    const [ loveToVisit,  setLoveToVisit ] = useState('');
    const [agreedToTerms, setAgreedToTerms ] = useState(false);
    const isFormFilled = status !== '' && whatsappPhone !== '' && knowledgeOfNigeria !== '' && referralSource !== '' && confidenceInKnowledge !== '' && loveToVisit !== '' && agreedToTerms !== false

    
    // function extractPublicId(url) {
    //   const match = url.split('upload/')[1].split('/')[1];
    //   return match
    // }
  
    // const handleRemoveFile = async (e) => {
    //   if (e) {
    //     e.preventDefault();
    //   }
    //   setIsDeleting(true);
    //   try {
    //     if (introVideoUrl) {
    //       const publicId = extractPublicId(introVideoUrl);
    //       const response = await axios.patch('/api/media/delete-video', { publicId });
    //     }
    //     setSelectedFile(null);
    //     document.getElementById('videoFile').value = '';
    //     setIntroVideoUrl(null);
    //     setIsDeleting(false);
    //   } catch (err) {
    //     console.log(err.message);
    //     toast.error('Failed to delete file, try again')
    //   }
    // }
    
    // const uploadHandler = async (e) => {
    //   setSelectedFile(e.target.files[0]);
  
    //   if (!e.target.files || e.target.files.length === 0) {
    //   toast.error('Please select a VIDEO file to upload.');
    //   return;
    //   }
    //   // Check file size
    //   const fileSize = e.target.files[0].size; // Size in bytes
    //   const maxSize = 35 * 1024 * 1024; // 30 MB in bytes
    //   if (fileSize > maxSize) {
    //     toast.error('File size exceeds 35MB limit.');
  
    //     e.target.files[0].value = "";  
    //       return;
    //   };
    //   const result = window.confirm(`Do you want to proceed with uploading ${e.target.files[0].name}?`);
    //   if (result) {
    //     const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
    //   try {
    //     const { data: { signature, timestamp } } = await axios('/api/admin/cloudinary-sign?type=quizShow');
     
    //     const file = e.target.files[0];
    //     const formData = new FormData();
    //     formData.append('file', file);
    //     formData.append('signature', signature);
    //     formData.append('timestamp', timestamp);
    //     formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
    //     formData.append('folder', 'quiz_show_uploads')
  
    //     const { data } = await axios.post(url, formData, 
    //       {
    //         onUploadProgress: (progressEvent) => {
    //           const percentage = Math.round( ((progressEvent.loaded / progressEvent.total)*100)-2);
    //           SetUploadProgress(`${percentage}%`);
    //         },
    //       }
    //     );
  
    //     setIntroVideoUrl( data.secure_url);
    //     setVideoId(data.public_id)
    //     SetUploadProgress(`100%`);
        
    //   } catch (err) {
    //     handleRemoveFile();
    //   }
    //   } else {
    //     return;
    //   }
     
    // };
  
    const submitHandler=(e)=>{
      e.preventDefault();
      setStartPayment(true)
    };
  
  
    const paySuccesAction = async (ref,) => {
      setStartRegistration(true);
        try {
          const data = {
                status,
                whatsappPhone,
                knowledgeOfNigeria,
                referralSource,
                confidenceInKnowledge,
                loveToVisit,
                agreedToTerms,
                user:session?.user?._id,
                paymentRef:ref.reference,
              }
          const response = await axios.post(`/api/across_quiz_show/regParticipant`, data);
          setRegSuccess(true);
        } catch (err) {
          toast.error(`Something went wrong: ${err.message}`);
        }
      };
  
  
    const selectVideo = (e) => {
      e.preventDefault();
      document.getElementById('videoFile').click()
    }

    const closeExit = () => {
      setToExit(false)
    }
    
    return (
       <div className="flex flex-col items-center bg-gray-100">
        <div className="flex flex-col md:px-0 md:w-[50%] w-[90%] justify-center md:gap-5">
          <div className="md:col-span-3">
            {anError ? (
              <div className="alert-error">{anError}</div>
            ) : (
           <div>   
            <form className="mx-auto pt-[70px]  align-middle snap-center flex flex-col self-center justify-center text-center content-center max-w-screen-md" onSubmit={submitHandler} >
                <div className="w-[100%] text-center gap-2 text-[22px] font-bold text-green-600 border-b-1 border-b-gray-400 pb-[20px]">Across Nigeria Quiz Show</div>
                <span className="w-[100%] text-left gap-2 text-[30px] mt-[20px] mb-[10px] font-light text-black">Form</span>
                <div className="text-[14px] text-left text-gray-500 italic mb-[35px] border-t-1 border-t-green-400 pt-[10px] rounded-[10px] px-[10px]">Thank you for your interest in participating in the Across Nigeria Quiz Show! Please take a few moments to complete the registration form below. be sure to review your information before submitting the form.</div>
                
                <div className="text-left flex flex-col gap-2">
                  <label htmlFor="title"><span className="font-bold">1. </span>What is your current occupation/ Current status ? </label>
                  <input
                    type="text"
                    className="w-full border-1 border-gray-400 h-[45px] px-3 outline-none rounded-[12px] bg-gray-200 mb-[10px] accent-slate-950"
                    id="title"
                    placeholder="Are you a student, worker, farmer or enterprenuer...."
                    value={status}
                    onChange={(e)=>{setStatus(e.target.value)}}
                  />
                </div>

                <div className="text-left flex flex-col mt-[10px] gap-2">
                  <label htmlFor="title"><span className="font-bold">2. </span>How well do you know about Nigeria? Give us a sense of your knowledge about Nigeria. What aspects of Nigerian history,
                    culture, geography, or politics do you find most fascinating? </label>
                  <textarea
                    className="w-full border-1 border-gray-400 h-[90px] p-3 outline-none rounded-[12px] bg-gray-200 mb-[10px] accent-slate-950"
                    id="title"
                    placeholder="Write here...."
                    value={knowledgeOfNigeria}
                    onChange={(e)=>{setKnowledgeOfNigeria(e.target.value)}}
                  />
                </div>

                <div className="text-left flex flex-col gap-2 mt-[10px]">
                  <label htmlFor="title"><span className="font-bold">3. </span>How did you hear about Across Nigeria Quiz Show?</label>
                  <select 
                    value={referralSource} 
                    onChange={(e)=>{setReferralSource(e.target.value)}}
                    className="w-full border-1 border-gray-400 h-[45px] px-3 outline-none rounded-[12px] bg-gray-200 mb-[10px] accent-slate-950">
                    <option value="" disabled>-Select choice-</option>
                    <option value='social media'>Social Media</option>
                    <option value='from a friend'>From a Friend</option>
                    <option value='across nigeria website'>Across Nigeria Website</option>
                    <option value='television or radio'>Television or Radio</option>
                    <option value='other'>Other</option>
                  </select>
                </div>

                <div className="text-left flex flex-col gap-2 mt-[10px]">
                  <label htmlFor="title"><span className="font-bold">4. </span>How confident are you in answering questions about Nigeria? </label>
                  <select value={confidenceInKnowledge}
                    onChange={(e)=>{setConfidenceInKnowledge(e.target.value)}}
                    className="w-full border-1 border-gray-400 h-[45px] px-3 outline-none rounded-[12px] bg-gray-200 mb-[10px] accent-slate-950">
                    <option value="" disabled>-Select choice-</option>
                    <option value='very confident'>Very Confident</option>
                    <option value='somewhat confident'>Somewhat Confident</option>
                    <option value='not confident at all'>Not Confident at All</option>
                  </select>
                </div>

                <div className="text-left flex flex-col mt-[10px] gap-2">
                  <label htmlFor="title"><span className="font-bold">5. </span>What Nigerian city or landmark would you love to visit the most and why ? This could be an iconic location, a historical site, or a place rich in culture. </label>
                  <textarea
                    className="w-full border-1 border-gray-400 h-[90px] p-3 outline-none rounded-[12px] bg-gray-200 mb-[10px] accent-slate-950"
                    id="title"
                    placeholder="Write here...."
                    value={loveToVisit}
                    onChange={(e)=>{setLoveToVisit(e.target.value)}}
                  />
                </div>
               
                {/* <div className="mb-4 mt-[20px] text-left">
                  <label htmlFor="imageFile"><span className="font-bold">6. </span>Upload a short video (1 minute max) introducing yourself, and share why you&apos;re excited to be part of the show</label>
                  <div className="flex flex-col text-[15px] mt-[10px] mb-[10px]">
                    <span>In your video, we&apos;d love to hear:</span>
                    <span>- Who you are and where you&apos;re from</span>
                    <span>- Why you want to participate in the quiz show</span>
                    <span>- How well you know about nigeria</span>
                  </div>
                  <input accept=".mp4" type="file" className="w-full hidden" id="videoFile" onChange={uploadHandler}/>
                  <button onClick={selectVideo} className='bg-green-600 w-full mb-2 border-green-400 border-b-2 rounded-[25px] hover:bg-green-700 hover:border-none h-[50px] gap-[10px] flex text-white flex-row justify-center items-center'>
                    <span>Select a Video</span>
                    <Upload/>
                  </button>
                   { introVideoUrl && videoId ? (
                      <div className=' w-[100%]' style={{ position: "relative", height: "250px" }}>
                        <VidThumbnail url={introVideoUrl} videoId={videoId}/>
                      </div>
                    ) : (
                      <div className='w-[100%] rounded-[20px] border-gray-400 border-1 h-[250px] flex flex-col justify-center text-gray-400 items-center'>
                        { loadingUpload ?  <CycleLoader size={'40px'}/> : (
                          <>
                          <span className="mb-2">video thumbnail</span>
                          <ImgIcon/>
                          <span className="mt-3 text-[13px] text-gray-500">video should not exceed 35MB and 1 minute</span>
                          </>) 
                        }
                      </div>
                    )
                      }
                </div>
                  {/* {selectedFile && ( */}
                    {/* <div className={`${isDeleting?'animate-pulse opacity-50':''} flex flex-col justify-between items-center bg-gray-200 h-fit py-[10px] px-[10px] mt-[5px]`}>
                      <div className="flex w-full flex-row justify-between items-center">
                        <div className='flex flex-row gap-[15px] items-center'>
                          <FileIcon/>
                          <div className='flex flex-col text-left text-[12px] text-gray-500'>
                            <span>{selectedFile.name.length>50?selectedFile.name.slice(0, 45)+' ...mp4':selectedFile.name}</span>
                            <span>{((selectedFile.size/1024)/1024).toFixed(2)} mb</span>
                          </div>
                          
                        </div>
                        <button disabled={!(uploadProgress==='100%')} className={`cursor-pointer border-2 rounded-[50%] p-[11px] hover:bg-gray-400 transition-background duration-500 ease-in-out ${uploadProgress==='100%'?'opacity-[100%]':'opacity-[0%]'}`} onClick={handleRemoveFile}><DeleteIcon/></button>
                      </div>
                      <div className=" bg-gray-200 flex flex-col w-full text-left text-[14px]">
                        <UploadLoader percentage={uploadProgress}/>
                        <span className={`text-red-600 ${uploadProgress === '100%'?'hidden':''} text-[12px]`}>Please don&apos;t Navigate from this page, your file is uploading</span>
                      </div>
    
                    </div>
                  )} */} 
                {/* {isDeleting && <span>Deleting video...</span>} */}

                <div className="text-left flex flex-col mt-[10px] gap-2">
                  <label htmlFor="title"><span className="font-bold">6. </span>Enter your Current Whatsapp Number here. (Note: participant will be contacted through they Whatsapp and email) </label>
                  <input
                    type="tel"
                    className="w-full border-1 border-gray-400 h-[45px] px-3 outline-none rounded-[12px] bg-gray-200 mb-[10px] accent-slate-950"
                    id="Whatsapp phone"
                    placeholder="+000 000..."
                    value={whatsappPhone}
                    onChange={(e)=>{setWhatsappPhone(e.target.value)}}
                  />
                </div>

                <div className="mb-[20px] mt-[20px] text-left flex flex-row w-[100%] gap-3 items-top">
                  <input 
                    className="h-[25px] cursor-pointer w-[25px]" 
                    checked={agreedToTerms} 
                    onClick={()=>{setAgreedToTerms(!agreedToTerms)}}
                    type="checkbox"/>
                  <span className="text-left">
                    I agree to the <span className="text-green-500 underline">Terms and Conditions </span>
                    before proceeding.
                  </span>
                </div>
                <div className="mb-[100px] flex-col flex justify-center items-center">
                  <button 
                      className={`${isFormFilled?'bg-green-500 hover:border-l-0 cursor-pointer hover:border-b-0 hover:bg-green-600 border-l-3 border-b-3 border-b-green-800 border-l-green-800':'bg-gray-300 cursor-not-allowed'} h-[45px] mb-[80px] rounded-[25px] text-white w-[100%]`} disabled={!isFormFilled}>
                      Submit
                  </button>
                </div>
            </form>
              { startPayment && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <PaystackBtn pay={paySuccesAction} amount={1000} email={session?.user.email?? null} purpose="registration for Febraury Across Nigeria Quiz Show"/></div>)}
                  { startRegistration && (
                    <div className="fixed h-screen w-screen inset-0 z-50 flex items-center justify-center bg-gray-100">
                      { regSuccess ? (
                        <div className="flex flex-col justify-center text-center px-[5%] items-center">
                          <SuccessIcon size={'30px'}/>
                          <span className="font-bold text-gray-800 text-[20px]">Congratulations! {session?.user?.name} You&apos;re officially registered for the May Across Nigeria Quiz Show</span>
                          <p className="flex w-full text-left mt-[20px]">Thank you for completing your registration. You&apos;ve secured your spot and now in the running!</p>
                          <p className="flex w-full text-left mt-[20px]">Our team will review all entries and the selected participants will be announced soon. Keep an eye on home page and your inbox for updates. Good luck, and stay tuned</p>
                          <button className="px-[15px] py-[15px] mt-[20px] text-white bg-green-500 hover:bg-green-700 rounded-[30px]" onClick={()=>{router.push('/across_quiz_show')}}>Okay got it</button>
                        </div>
                      ):(
                        <div className="flex flex-col gap-3 justify-center items-center">
                          <CycleLoader size={'60px'}/>
                          <div className="mt-[15px] flex-row flex gap-2 items-center text-[16px]">Please wait while we process your registration...</div>
                        </div>
                      )}
                    </div>
                    )
                  }  
            </div>  
                
              )}
        </div>
      </div>
      <div className={`${startPayment?'fixed':'absolute'} w-fit h-fit p-[10px] rounded-full fixed font-semibold text-lg cursor-pointer right-[5%] top-[2%] md:right-10 md:top-10 z-50 bg-gray-200`} onClick={()=>{setToExit(true)}}>
        <Close bg={'gray'} />
      </div>
      { toExit && <ExitConfirmScreen to={'/across_quiz_show'} cancelFunction={closeExit}/> }
    </div>
    );
}

export default Across_Quiz_Show;