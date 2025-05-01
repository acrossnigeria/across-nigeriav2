import { useState } from "react";
import InfoIcon from "../../../../public/images/icon/InfoIcon";
import axios from "axios";
import Upload from "../../../../public/images/icon/Upload";
import ImgIcon from "../../../../public/images/icon/ImgIcon";
import adpt2 from '../../../../public/images/adpt2.jpg';
import Image from "next/image";

const StepThree = ( { showContactUsButton, advertType }) => {

    const [ modalBottom, setModalBottom ] = useState('top-[-50px]');
    const [ modalOpacity, setModalOpacity ] = useState('opacity-0');
    const [ imgSize, setImgSize ] = useState('');
    const [ imgName, setImgName ] = useState('');
    const [ imgPreview, setImgPreview ] = useState(null);
    const [ errorMessage, setErrorMessage ] = useState('Unknown error.');
    const [ selectedFile, setSelectedFile ] = useState(false);

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
          formData.append('folder', 'advert_image_uploads');
          const { data } = await axios.post(url, formData);
          const user = session?.user?._id;
          console.log(user);
    
          const response = await axios.post('/api/booking/booking', { mediaUrl: data.secure_url, user });
          console.log(response.data);
          
        } catch (err) {
          showModal(err.message);
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
    
            // const timeOut = setTimeout(() => {
            //   uploadHandler(e);
            //   clearTimeout(timeOut);
            // }, 2000);
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
    console.log(advertType)


    return (
        <div className="md:w-[70%] md:ml-[15%] mt-[20px] w-[100%] px-[3%] flex flex-col items-center text-center text-[18px]">
            <div style={{lineHeight:'16px'}} className={`fixed ${modalBottom} ${modalOpacity} transition-all text-center ease-in-out duration-500 text-red-600 bg-white z-[2000] rounded-[20px] md:w-fit w-[80%] border-b-1 border-red-500 h-fit p-3`}>
                <span>Please select Your preferred advert type</span>
            </div>
            <div style={{lineHeight:'16px'}} className={`fixed ${modalBottom} ${modalOpacity} transition-all text-center ease-in-out duration-500 text-red-600 bg-white z-[2000] rounded-[20px] md:w-fit w-[80%] border-b-1 border-red-500 h-fit p-3`}>
                <span>Please select Your preferred advert type</span>
            </div> 
            <span style={{lineHeight:'20px'}} className="md:text-[25px] text-[20px] font-bold">Upload Your Advert Banner</span>
            <span style={{lineHeight:'20px'}} className="md:mt-[10px] mt-[4px] text-[15px]">Upload your banner and see how it would look like.</span>
            <div className="md:w-[70%] w-[100%] h-[400px] bg-white rounded-[10px] p-3 mt-[14px]">
                <div className='flex flex-col my-[10px]'>
                    <input
                        accept=".jpg, png, jfif"
                        type="file"
                        className="mb-4 w-[100%] hidden opacity-0 border-2 h-[30px] "
                        id="imageFile"
                        onChange={photoUploader} />
                    <button onClick={selectPhoto} className='bg-gray-200 hover:bg-gray-300 cursor-pointer border-1 border-gray-400 rounded-[4px] h-[40px] text-[15px] gap-[10px] flex text-gray-400 flex-row justify-center items-center'>
                    <span>Select a Photo</span>
                    <Upload/>
                    </button>
                </div>
                { !selectedFile && (
                    <div className={`${advertType===1 || advertType === 4 ?'w-[100%] md:h-[250px] h-[190px]':'md:w-[70%] w-[88%] h-[300px] mx-auto'} w-[100%] px-[5%] border-gray-300 border-1 h-[250px] flex flex-col justify-center items-center `}>
                        <ImgIcon/>
                        <span className="mt-[10px] text-[12px] text-gray-400">Recommended size: {advertType?'1000 x 800':'1200 x 300'} pixels (JPG or PNG, max 2MB)</span>
                    </div>
                )}

                { selectedFile && (
                    <div className={`${advertType===1 || advertType===4 ?'w-[100%] md:h-[250px] h-[190px]':'md:w-[70%] w-[88%] h-[300px] mx-auto'} border-gray-300 border-1 flex flex-col`}>
                        <div className={`${advertType===1 || advertType === 4 ?(showContactUsButton?'md:h-[220px] h-[160px]':'md:h-[250px] h-[190px]'):(showContactUsButton?'h-[270px]':'h-[100%]')} w-[100%] border-gray-300 relative border-b-1 flex flex-col justify-center items-center`}>
                            <Image src={imgPreview} fill className=""/>
                        </div>
                        <div className={`${advertType===1 || advertType===4 ?(showContactUsButton?'h-[30px]':'h-[0px] hidden'):(showContactUsButton?'h-[30px]':'hidden h-[0px]')} w-[100%] flex flex-row justify-end px-[2%]`}>
                            <button className="h-[25px] px-4 border-1 mt-[2px] border-gray-400 text-gray-400 text-[14px]">Contact Us</button>
                        </div>
                    </div>
                )}

            </div>
            <button className="h-[45px] md:w-[300px] hover:bg-green-700 transition-all duration-300 ease-in-out w-[100%] bg-green-500 border-1 border-black rounded-[25px] mt-[20px] text-white">Continue</button>
        </div>
    )
}

export default StepThree;