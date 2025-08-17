import { useState } from "react";
import InfoIcon from "../../../../public/images/icon/InfoIcon";
import axios from "axios";
import Upload from "../../../../public/images/icon/Upload";
import ImgIcon from "../../../../public/images/icon/ImgIcon";
import adpt2 from '../../../../public/images/adpt2.jpg';
import Image from "next/image";
import LineLoader from "@/components/LineLoader";
import Close from "../../../../public/images/icon/Close";
import { useSession } from "next-auth/react";
import ReloadIcon from "../../../../public/images/icon/ReloadIcon";
import SuccessIcon from "../../../../public/images/icon/SuccessIcon";

const StepThree = ( { showContactUsButton, advertType, setAdvertImage, advertImage, nextScreen, setTempImageFile, tempImageFile }) => {

    const { data:session } = useSession();

    const [ modalBottom, setModalBottom ] = useState('top-[-50px]');
    const [ modalOpacity, setModalOpacity ] = useState('opacity-0');
    const [ successModalOp, setSuccessModalOp ] = useState('opacity-0');
    const [ successModal, setSuccessModal ] = useState('hidden');


    const [ imgSize, setImgSize ] = useState('');
    const [ imgName, setImgName ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState('Unknown error.');
    const [ selectedFile, setSelectedFile ] = useState(tempImageFile!==null);
    const [ isUploading, setIsUploading ] = useState(false);
    const [ anImageWasUploaded, setAnImageWasUploaded ] = useState(false);
    const [ showRetry, setShowRetry ] = useState(false);
    const [ imageFile, setImageFile ] = useState(null);

    const [ isDeleting, setIsDeleting ] = useState(false);
    const [ deleteState, setDeleteState ] = useState('Deleting...');

    const showError = (error) => {
        if (error) {
            setErrorMessage(error);
        }
        setModalBottom('top-[120px]');
        setModalOpacity('opacity-100');
        setTimeout(() => {
            setModalBottom('top-[-50px]');
            setModalOpacity('opacity-0');
            setErrorMessage('Unkwown error');
        }, 1500);
    }

    function extractPublicId(url) {
        const match = url.split('upload/')[1].split('/')[1];
        return match
    }

    const showSuccess = () => {
        setSuccessModal('visible')
        setTimeout(() => {
            setSuccessModalOp('opacity-100')

            setTimeout(() => {
                setSuccessModalOp('opacity-0')
                setTimeout(() => {
                    setSuccessModal('hidden')
                }, 1000);
            }, 2000);
        }, 1000);
    }

    const resetImageState = () => {
        setImageFile(null);
        setAnImageWasUploaded(false);
        setSelectedFile(false);
        setImgName('');
        setIsUploading(false);
        setShowRetry(false);
        setTempImageFile(null);
        setAdvertImage(null);
    }

    const handleRemoveFile = async () => {
        setIsDeleting(true);
        try {
          if (advertImage) {
            const publicId = extractPublicId(advertImage);
            const response = await axios.patch('/api/media/delete-video', { publicId });
            if ( response.status === 200 ) {
                setDeleteState('Deleted ✔');
                setTimeout(() => {
                    setIsDeleting(false);
                    setSelectedFile(null);
                    setDeleteState('Deleting...');
                    resetImageState();
                }, 1500);
            } else {
                showError(`Something went wrong: ${response.status}`);
            }
          } else {
            showError(`No image found to delete`);
          }
        } catch (err) {
          showError(`Failed to delete uploaded image: ${err.message}`);
        }
      }

    const uploadHandler = async (e, isRetry) => {
        if (!e?.target?.files || e?.target?.files?.length === 0) {
            showError('No image was selected.');
            resetImageState();
            return;
        }
        
        // Check file size
        const maxSize = 5 
        if ( Math.trunc(imgSize) > maxSize) {
            showError('File size exceeds 5MB limit.');
            resetImageState();  
            return;
        }
        setIsUploading(true);
        setShowRetry(false);
        let result;
        if ( !isRetry ) {
            result = window.confirm(`Do you want to proceed with uploading ${imgName}?`);
        } else {
            result= true;
        }
        if (result) {
            const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
            try {
                const {
                data: { signature, timestamp },
                } = await axios('/api/admin/cloudinary-sign?type=advertImage');
            
                const file = e.target.files[0];
                const formData = new FormData();
                formData.append('file', file);
                formData.append('signature', signature);
                formData.append('timestamp', timestamp);
                formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
                formData.append('folder', 'advert_image_uploads');
                const { data } = await axios.post(url, formData);
                setIsUploading(false);
                setAnImageWasUploaded(true);
                const user = session?.user?._id;
                const advertImage = data?.secure_url;
                setAdvertImage(advertImage);
                showSuccess();
                
            } catch (err) {
                showError(err.message);
                setShowRetry(true);
            }
        } else {
            return;
        }
       
    };

    const retryUpload = () => {
        uploadHandler(imageFile, true);
    }

    const shoutoutChange=(e)=>{
        const inputValue=e.target.value;
        if(inputValue.length<=200){
            setShoutout(inputValue)
        }
    }
    
    const photoUploader = async (e) => {
        resetImageState();
        const file = e.target.files[0];
        setImageFile(e);
        setImgSize(e.target.files[0].size / 1024 / 1024);
        setImgName(e.target.files[0].name);
            // preview Photo
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setTempImageFile(reader.result);
                setSelectedFile(true);
                uploadHandler(e, false);
            };
            reader.readAsDataURL(file);
        } else {
            setTempImageFile(null);
            setSelectedFile(false);
            setAnImageWasUploaded(false);
        }
    }

    const selectPhoto = (e) => {
        e.preventDefault();
        if ( !isUploading ) {
            document.getElementById('imageFile').click()
        }
    }

    const toConfirm = () => {
        if ( advertImage ) {
            nextScreen();
        }
    }


    return (
        <div className="md:w-[70%] md:ml-[15%] mt-[20px] w-[100%] px-[3%] flex flex-col items-center text-center text-[18px]">
            <div style={{lineHeight:'16px'}} className={`fixed ${modalBottom} ${modalOpacity} transition-all text-center ease-in-out duration-500 text-red-600 bg-white z-[2000] rounded-[20px] md:w-fit w-[80%] border-b-1 border-red-500 h-fit p-3`}>
                <span>{errorMessage}</span>
            </div>
            <span style={{lineHeight:'20px'}} className="md:text-[25px] text-[20px] font-bold">Upload Your Advert Banner</span>
            <span style={{lineHeight:'20px'}} className="md:mt-[10px] mt-[4px] text-[15px]">Upload your banner and see how it would look like.</span>
            <div className="md:w-[70%] w-[100%] h-[400px] bg-white rounded-[5px] p-3 mt-[14px]">
                <div className='flex flex-col my-[10px]'>
                    <input
                        accept=".jpg,.jpeg,.png,.jfif,image/*"
                        type="file"
                        className="mb-4 w-[100%] hidden opacity-0 border-2 h-[30px] "
                        id="imageFile"
                        onChange={photoUploader} />
                    <button onClick={selectPhoto} className='bg-gray-200 hover:bg-gray-400 hover:text-white cursor-pointer border-1 border-gray-400 rounded-[2px] h-[40px] text-[15px] gap-[10px] flex text-gray-600 flex-row justify-center items-center'>
                        <span>Choose an image</span>
                        <Upload/>
                    </button>
                </div>
                { !selectedFile && (
                    <div className={`${advertType===1 || advertType === 4 ?'w-[100%] md:h-[250px] h-[190px]':'md:w-[70%] w-[88%] h-[300px] mx-auto'} w-[100%] px-[5%] border-gray-600 border-1 h-[250px] flex flex-col justify-center items-center `}>
                        <ImgIcon/>
                        <span className="mt-[10px] text-[12px] text-gray-600">Recommended size: {(advertType===1 || advertType===4)?'1000 x 400 ( Landscape )':'700 x 1000 ( Protrait )'} pixels (JPG or PNG, max 5MB)</span>
                    </div>
                )}
                { anImageWasUploaded && (
                    <button onClick={handleRemoveFile} className={`h-[30px] z-[100] hover:bg-red-600/30 cursor-pointer text-white bg-black/30 w-[fit] absolute px-[15px] gap-2 justify-center items-center flex flex-row`}>
                        <span className="text-[12px]">Remove</span>
                        <Close size={'15px'} bg={'white'}/>
                    </button>
                )}
                { selectedFile && (
                    <div className={`${advertType===1 || advertType===4 ?'w-[100%] md:h-[250px] h-[190px]':'md:w-[70%] w-[88%] h-[300px] mx-auto'} border-gray-300 border-1 justify-center items-center flex flex-col`}>
                        <div className={`${advertType===1 || advertType === 4 ?(showContactUsButton?'md:h-[220px] h-[160px]':'md:h-[250px] h-[190px]'):(showContactUsButton?'h-[270px]':'h-[100%]')} w-[100%] border-gray-300 ${isUploading || isDeleting ?'opacity-50 animate-pulse':'opacity-100'} relative border-b-1 flex flex-col justify-center items-center`}>
                            <Image src={tempImageFile} fill className=""/>
                        </div>
                        <div className={`${advertType===1 || advertType===4 ?(showContactUsButton?'h-[30px]':'h-[0px] hidden'):(showContactUsButton?'h-[30px]':'hidden h-[0px]')} w-[100%] flex flex-row justify-end px-[2%]`}>
                            <button className="h-[25px] px-4 border-1 mt-[2px] border-gray-400 text-gray-400 text-[14px]">Contact Us</button>
                        </div>
                        { isUploading && (
                            <div className={`h-[100px] bg-black/30 self-center w-[100px] gap-2 justify-center items-center absolute flex flex-col`}>
                                { !showRetry && (
                                    <>
                                        <span className="text-[12px] text-white">Uploading...</span>
                                        <LineLoader/>
                                    </>
                                )}
                                { showRetry && (
                                    <button onClick={retryUpload} className="flex flex-col gap-2 justify-center items-center">
                                        <span className="text-[12px] text-white">Tap to retry</span>
                                        <ReloadIcon bg={'white'} size={'20px'}/>
                                    </button>
                                )}
                            </div>
                        )}

                        { isDeleting && (
                            <div className={`h-[100px] bg-black/30 self-center w-[100px] gap-2 justify-center items-center absolute flex flex-col`}>
                                <span className="text-[12px] text-white">{deleteState}</span>
                                <LineLoader/>
                            </div>
                        )}
                        <div className={`${successModal} ${successModalOp} h-[100px] transition-all duration-300 ease-in-out bg-black/30 self-center w-[100px] gap-2 justify-center items-center absolute flex flex-col`}>
                            <span className="text-[13px] text-white">Uploaded ✔</span>
                        </div>
                        
                    </div>
                )}

            </div>
            <button onClick={toConfirm} className={`${advertImage?'hover:bg-green-700 bg-green-500':' bg-gray-400'} h-[45px] md:w-[300px] transition-all duration-300 ease-in-out w-[100%] border-1 border-black rounded-[25px] mt-[20px] text-white`}>Continue</button>
        </div>
    )
}

export default StepThree;