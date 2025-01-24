import { useState } from 'react';
import banner from '../../../public/images/ambassador.jpg';
import Image from 'next/image';
import axios from 'axios';
import CycleLoader from '@/components/CycleLoader';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import BackIcon from '../../../public/images/icon/BackIcon';
import Link from 'next/link';

const Reg = () => {
    const { data:session } = useSession();
    const [ refLink, setRefLink ] = useState('https://localhost:3000/ertg35er1')

    const [ currentStatus, setCurrentStatus ] = useState('student');
    const [ isWillingToJoinMeet, setIsWillingToJoinMeet ] = useState(false);
    const [ orgName, setOrgName ] = useState('');
    const [ city, setCity ] = useState('');
    const [ why, setWhy ] = useState('');
    const [ state, setState ] = useState('');
    const [ termsAgree, setTermsAgree ] = useState(false);

    const [ isProcessing, setIsProcessing ] = useState(false);
    const [ isSuccess, setIsSuccess ] = useState(false);
    const [ showError, setShowError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');
    const nigeriaStates = [
        'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
        'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
        'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
        'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
      ];

    function scrollToTop() {
        window.scrollTo( {
            top:0,
            behavior:'smooth',
        })
    }

    function displayError() {
        setShowError(true);
        setTimeout(() => {
            setShowError(false);
        }, 5000);     
    }
    const sendApplication = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        const data = { user:session.user._id, currentStatus, isWillingToJoinMeet, orgName, city, why, state, termsAgree };

        try {
            const response = await axios.post('/api/ambassador/adduser', data);
            if (response.data.success) {
                scrollToTop();
                setIsProcessing(false);
                setIsSuccess(true);
                setRefLink(response.data.refLink);
            } else {
                setIsProcessing(false);
                setIsSuccess(false); 
                setErrorMessage(response.data.error);
                displayError();
            }

        } catch(err) {
            console.log('something went wrong', err.message)
            setIsProcessing(false);
            setIsSuccess(false);
            setErrorMessage('Please check your internet connection and try again');
            displayError()
        }

    }

    async function copyRefLink() {
        try {
           await navigator.clipboard.writeText(refLink);
        //    setIsCopied('');
        //    setTimeout(() => {
        //      setIsCopied('hidden')
        //    }, 2000);
        } catch (err) {
           alert('An error occurred when copying ref link');
        }
     }
    
    return (
        <div className='flex flex-col pt-[20px] items-center'>
            { showError && (
                <div className='text-red-500 absolute bg-white/90 border-b-3 border-b-red-500 px-[20px] rounded-[10px] py-[5px] bottom-[70px] italic'>{errorMessage}</div>
            ) }
            { isProcessing && (
                <div className='h-screen w-full flex flex-col justify-center items-center'>
                    <CycleLoader size={'40px'}/>
                    <span className='px-[30px] mt-[25px] font-light animate-pulse'>Please wait while we processing your application...</span>
                </div>
            )}
            { isSuccess && (
                <div className='h-screen w-full md:w-[50%] px-[20px] text-center flex flex-col items-center'>
                    <Link className='self-start' href='/'><div className='w-fit px-1 h-[30px] font-bold flex mt-[10px] flex-row gap-2'><BackIcon/>back home</div></Link>
                    <span className=' text-[21px] font-extrabold mt-[45px] text-green-500'>Congratulations, {session.user.name} Your application has been approved</span>
                    <span className='mt-[8px] text-left font-light text-[17px]'>Your referral link is ready to use and you can start sharing it with your friends, family and followers to earn rewards. This is your chance to get ahead and maximize your impact as an Ambassador</span>
                    <div className='mt-[20px] flex flex-col items-left'>
                        <span className='text-gray-600 font-bold text-[17px]'>Why start now ?</span>
                        <span className='text-left font-extralight text-[15px]'>1. Every referral you make counts toward future bonuses and exclusive perks.</span>
                        <span className='text-left font-extralight text-[15px]'>2. Be among the first to grow your network and secure your spot at the top!</span>
                    </div>
                    <div className='flex flex-col gap-2  justify-center items-center mt-[15px] gap-2'>
                        <span className='text-green-600 font-bold'>Your Referral Link </span>
                        <div className='flex flex-row gap-2'>
                            <div className='border-1 border-gray-600 h-[30px] rounded-[5px] w-[200px] overflow-x-scroll'>{refLink}</div>
                            <button className='border-1 h-[30px] w-[60px] hover:bg-gray-400 rounded-[5px] border-gray-800 bg-gray-200'>Copy</button>
                        </div>
                    </div>
                    <div className='mt-[40px] border-t-1 px-[20px] text-[14px] pt-[10px] text-gray-500'>
                        <span>Stay tuned! more exciting Ambassador features are on the way</span>
                    </div>
                </div>
            )}
            <div className={`${ (!isProcessing && !isSuccess) ? '':'hidden'} w-[100%] md:w-[50%] h-fit flex flex-col justify-center items-center`}>
                <div className='w-full flex flex-col items-center justify-center px-[5px]'>
                    <Image className='h-[200px] w-[100%]' src={banner} alt='banner'/>
                    <div className='h-[100px] mt-[100px] md:w-[50%] w-full absolute bg-gradient-to-b from-transparent to-white'></div>
                </div>
                <span className='text-[20px] text-green-500 px-[20px] font-extrabold text-center'>Join Our Ambassador Program &  Make a Difference!</span>
                <span className='text-[19px] font-light italic mt-[15px] self-start ml-[20px]' >Fill the form bellow</span>
                <form onSubmit={sendApplication} className='w-full text-[18px] flex flex-col border-t-1 pt-[20px]'>
                    <div className='flex flex-col  gap-1 w-[100%] px-[15px]'>
                        <label htmlFor='status'>Current status</label>
                        <select required value={currentStatus} onChange={(e)=>{setCurrentStatus(e.target.value)}} id='status' className='h-[48px] bg-gray-200 px-[10px] rounded-[5px] w-[100%]' >
                            <option className='focus:text-gray-200 hover:text-gray-400' value={'student'}> Student</option>
                            <option className='focus:text-gray-200 hover:text-gray-400' value={'corper'}>Youth service corper (NYSC)</option>
                            <option className='focus:text-gray-200 hover:text-gray-400' value={'Other'}>Other</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-1 w-[100%] mt-[25px] px-[15px]'>
                        <label htmlFor='location'>Please write your Institution name/ NYSC camp center/ Work place</label>
                        <input required value={orgName} onChange={(e)=>{setOrgName(e.target.value)}} type='text' id='location' placeholder='Enter your university name/ NYSC camp/ Work place' className='h-[48px] bg-gray-200 px-[10px] rounded-[5px] w-[100%]' />
                    </div>
                    <div className='flex flex-col gap-1 w-[100%] mt-[25px] px-[15px]'>
                        <label htmlFor='why'>Why do you want to become an Ambassador to represent Across Nigeria Reality Show?</label>
                        <textarea required value={why} onChange={(e)=>{setWhy(e.target.value)}} id='why' placeholder='Write here...' className='h-[90px] bg-gray-200 px-[10px] rounded-[5px] w-[100%]'></textarea>
                    </div>
                    <div className='flex flex-col gap-1 w-[100%] mt-[25px] px-[15px]'>
                        <label >Are you willing to attend events/meetings on call or in person?*</label>
                        <div className='flex flex-row gap-2'>
                            <label className='flex flex-row gap-2 text-[18px] items-center'><input className='h-[20px] w-[20px]' type='radio' name='isWillingToJoinMeet' value={true} checked={ isWillingToJoinMeet === true} onChange={(e)=>setIsWillingToJoinMeet(true)}/>Yes</label>
                            <label className='flex flex-row gap-2 text-[18px] items-center'><input className='h-[20px] w-[20px]' type='radio' name='isWillingToJoinMeet' value={false} checked={ isWillingToJoinMeet === false} onChange={(e)=>setIsWillingToJoinMeet(false)}/>No</label>
                        </div>
                    </div>
                    <div className='flex flex-col gap-1 w-[100%] mt-[25px] px-[15px]'>
                        <label htmlFor='state'>Which state do you currently reside in?</label>
                        <select required value={state} onChange={(e)=>{setState(e.target.value)}} id='state' className='h-[48px] bg-gray-200 px-[10px] rounded-[5px] w-[100%]' >
                            <option value={''} disabled>Select state</option>
                            { nigeriaStates.map(state=> { return <option className='focus:text-gray-200 hover:text-gray-400' key={state} value={state}>{state}</option>} )}
                        </select>
                    </div>
                    <div className='flex flex-col gap-1 w-[100%] mt-[25px] px-[15px]'>
                        <label htmlFor='city'>Please write the name of the city/ town/ village where you reside</label>
                        <input required value={city} onChange={(e)=>{setCity(e.target.value)}} type='text' id='city' placeholder='Enter city/ town/ village' className='h-[48px] bg-gray-200 px-[10px] rounded-[5px] w-[100%]' />
                    </div>
                    <div className='px-[15px] mt-[30px] flex flex-row items-top gap-2'>
                        <input className='h-[30px] w-[30px]' value={termsAgree} onChange={(e)=>{setTermsAgree(!termsAgree)}} checked={termsAgree===true} type='checkbox'/>
                        <span className='text-green-600'>I certify that the information provided is accurate and agree to the terms of the ambassador program</span>
                    </div>
                    <button 
                    disabled={!(termsAgree && orgName && state && city && why && currentStatus && isWillingToJoinMeet)}
                     className={`h-[43px] w-[90%] self-center ${ (termsAgree && orgName && state && city && why && currentStatus && isWillingToJoinMeet)? 'bg-green-500 hover:bg-green-600':'bg-gray-500'} rounded-[30px] text-white mt-[30px]`} type='submit'>Apply</button>
                </form>
                <span className='mt-[50px] text-[14px] text-gray-500 mb-[15px]'>2025 Acrossnig</span>
            </div>
        </div>
    )
}

Reg.auth = true;
export default Reg;