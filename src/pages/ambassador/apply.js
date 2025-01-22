import { useState } from 'react';
import banner from '../../../public/images/ambassador.jpg';
import Image from 'next/image';
import Link from 'next/link';

const Reg = () => {
    const [ currentStatus, setCurrentStatus ] = useState('');
    const [ isWillingToJoinMeet, setIsWillingToJoinMeet ] = useState('no');
    const [ termsAgree, setTermsAgree ] = useState(false);
    const nigeriaStates = [
        'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
        'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
        'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
        'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
      ];
    
    return (
        <div className='flex flex-col pt-[20px] items-center'>
            <div className='w-[100%] md:w-[50%] h-fit flex flex-col justify-center items-center'>
                <div className='w-full flex flex-col items-center justify-center px-[5px]'>
                    <Image className='h-[200px] w-[100%]' src={banner} alt='banner'/>
                    <div className='h-[100px] mt-[100px] md:w-[50%] w-full absolute bg-gradient-to-b from-transparent to-white'></div>
                </div>
                <span className='text-[20px] text-green-500 px-[20px] font-extrabold text-center'>Join Our Ambassador Program &  Make a Difference!</span>
                <span className='text-[19px] font-light italic mt-[15px] self-start ml-[20px]' >Fill the form bellow</span>
                <form className='w-full text-[18px] flex flex-col border-t-1 pt-[20px]'>
                    <div className='flex flex-col  gap-1 w-[100%] px-[15px]'>
                        <label htmlFor='status'>Current status</label>
                        <select onChange={(e)=>{setCurrentStatus}} id='status' className='h-[48px] bg-gray-200 px-[10px] rounded-[5px] w-[100%]' >
                            <option className='focus:text-gray-200 hover:text-gray-400' value={'student'}> Student</option>
                            <option className='focus:text-gray-200 hover:text-gray-400' value={'corper'}>Youth service corper (NYSC)</option>
                            <option className='focus:text-gray-200 hover:text-gray-400' value={'Other'}>Other</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-1 w-[100%] mt-[25px] px-[15px]'>
                        <label htmlFor='location'>Please write your University name/ NYSC camp center/ Work place</label>
                        <input type='text' id='location' placeholder='Enter your university name/ NYSC camp/ Work place' className='h-[48px] bg-gray-200 px-[10px] rounded-[5px] w-[100%]' />
                    </div>
                    <div className='flex flex-col gap-1 w-[100%] mt-[25px] px-[15px]'>
                        <label htmlFor='why'>Why do you want to become an Ambassador to represent Across Nigeria Reality Show?</label>
                        <textarea id='why' placeholder='Write here...' className='h-[90px] bg-gray-200 px-[10px] rounded-[5px] w-[100%]'></textarea>
                    </div>
                    <div className='flex flex-col gap-1 w-[100%] mt-[25px] px-[15px]'>
                        <label >Are you willing to attend events/meetings on call or in person?</label>
                        <div className='flex flex-row gap-2'>
                            <label className='flex flex-row gap-2 text-[18px] items-center'><input className='h-[20px] w-[20px]' type='radio' name='isWillingToJoinMeet' value={'yes'} checked={ isWillingToJoinMeet === 'yes'} onChange={(e)=>setIsWillingToJoinMeet(e.target.value)}/>Yes</label>
                            <label className='flex flex-row gap-2 text-[18px] items-center'><input className='h-[20px] w-[20px]' type='radio' name='isWillingToJoinMeet' value={'no'} checked={ isWillingToJoinMeet === 'no'} onChange={(e)=>setIsWillingToJoinMeet(e.target.value)}/>No</label>
                        </div>
                    </div>
                    <div className='flex flex-col gap-1 w-[100%] mt-[25px] px-[15px]'>
                        <label htmlFor='state'>Which state do you currently reside in?</label>
                        <select id='state' className='h-[48px] bg-gray-200 px-[10px] rounded-[5px] w-[100%]' >
                            <option disabled>Select state</option>
                            { nigeriaStates.map(state=> { return <option className='focus:text-gray-200 hover:text-gray-400' key={state} value={state}>{state}</option>} )}
                        </select>
                    </div>
                    <div className='flex flex-col gap-1 w-[100%] mt-[25px] px-[15px]'>
                        <label htmlFor='city'>Please write the name of the city/ town/ village where you reside</label>
                        <input type='text' id='city' placeholder='Enter city/ town/ village' className='h-[48px] bg-gray-200 px-[10px] rounded-[5px] w-[100%]' />
                    </div>
                    <div className='px-[15px] mt-[30px] flex flex-row items-top gap-2'>
                        <input className='h-[30px] w-[30px]' value={termsAgree} onChange={(e)=>{setTermsAgree(e.target.value)}} checked={termsAgree} type='checkbox'/>
                        <span className='text-green-600'>I certify that the information provided is accurate and agree to the terms of the ambassador program</span>
                    </div>
                    <button className='h-[43px] w-[90%] self-center bg-green-500 hover:bg-green-600 rounded-[30px] text-white mt-[30px]' type='submit'>Apply</button>
                </form>
            </div>
            <span className='mt-[50px] text-[14px] text-gray-500 mb-[15px]'>2025 Acrossnig</span>
        </div>
    )
}

export default Reg;