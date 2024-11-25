import Layout from '@/components/Layout'
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession, signOut } from 'next-auth/react';
import TextLoader from './TextLoader';

const Profile = () => {
  const { status, data: session } = useSession();

  const [ isMobile, setIsMobile ] = useState(false);
  const [ email, setEmail ] = useState('');
  const [ phone, setPhone ] = useState(null);
  const [ fullname, setFullname ] = useState(null);
  const [ refs, setRefs ] = useState(0);
  const [ refCode, setRefCode ] = useState(null);
  const [ refLink, setRefLink ] = useState(null);
  const [ isCopied, setIsCopied ] = useState('hidden');
  const [ notifications, setNotifications ] = useState(null);

  const getUserData = async () => {
    setEmail(session?.user?.email);
    try {
      const response = await axios.get('/api/findUser', { params:{ email } });
      const profile = response.data;
      setRefs(profile.refs);
      setRefCode(profile.refCode);
      setRefLink(`https://acrossnig.com/account/reg?ref=${profile.refCode}`);
      setPhone(profile.phone);
      setFullname(profile.fullname);
      setNotifications(profile.notifications);
    } catch( err ) {
    //   alert('an error occurred, please check your internet connection');
    }

  }

  async function copyRefLink() {
     try {
        await navigator.clipboard.writeText(refLink);
        setIsCopied('');
        setTimeout(() => {
          setIsCopied('hidden')
        }, 2000);
     } catch (err) {
        alert('An error occurred when copying ref link');
     }
  }

  useEffect(()=>{
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)&&window.matchMedia("(max-width: 600px)").matches) {
    setIsMobile(true)
    } else { setIsMobile(false) }
    getUserData();
    // console.log(isMobile, navigator.userAgent)
  },[ isMobile ])

  const logoutClickHandler = async () => {
    await signOut({ callbackUrl: `/account/login` });
  };

  return (
    <>
        <div style={{alignItems:'center'}} className='mt-[10px] flex flex-col'>
          <div style={{borderRadius:'5px', alignItems:'center'}} className={`${isMobile?'w-[95%]':'w-[70%]'} gap-4 text-left flex flex-row bg-gray-200 p-[15px]`}>
            <div style={{borderRadius:'50%', alignItems:'center'}} className='w-[60px] h-[60px] text-[30px] font-extrabold flex flex-col justify-center bg-green-500'>{session?.user?.name[0].toUpperCase()}</div>
            <div className='flex flex-col gap-1'>
              <span> { fullname ?fullname: <div className={`w-[140px] h-[15px] bg-gray-300 animate-pulse rounded-[20px]`}></div>}</span>
              <span> { email ? email: <div className={`w-[130px] h-[15px] bg-gray-300 animate-pulse rounded-[20px]`}></div> }</span>
              <span> {phone ? phone: <div className={`w-[100px] h-[15px] bg-gray-300 animate-pulse rounded-[20px]`}></div> }</span>
            </div>
          </div>
          <div style={{borderRadius:'5px', alignItems:'center'}} className={`${isMobile?'w-[95%]':'w-[70%]'} mt-[10px] text-left gap-1 flex flex-col bg-gray-200 p-[5px]`}>
            <span style={{alignItems:'center'}} className='flex flex-row gap-2'> {refs ? (`Referrals:${refs}`): <div className={`w-[150px] h-[15px] bg-gray-300 animate-pulse rounded-[20px]`}></div> }</span>
            <span style={{alignItems:'center'}} className='flex flex-row gap-2'> {refCode ? (`Referral code: ${refCode}`): <div className={`w-[150px] h-[15px] bg-gray-300 animate-pulse rounded-[20px]`}></div> }</span>
            <span className='text-[14px] mt-1 mb-2 border-b-1 border-green-950'>{refLink ? refLink: <div className={`w-[200px] h-[15px] bg-gray-300 animate-pulse rounded-[20px]`}></div> }</span>
            <button onClick={copyRefLink} style={{borderRadius:'10px'}} className='border-1 border-gray-600 bg-gray-300 py-1 px-4 hover:opacity-70'>Copy link<span className={`px-4 bg-green-400 text-green-900 py-1 border-1 absolute ml-[-90px] mt-[30px] border-green-900 ${isCopied}`}>Link copied</span></button>
          </div>
          <div style={{borderRadius:'5px', alignItems:'center'}} className={`${isMobile?'w-[95%]':'w-[70%]'} h-[300px] bg-gray-200 mt-[10px] text-left flex flex-col bg-gray-200 p-[5px]`}>
            <span className='font-bold text-gray-500 text-[16px] border-green-950'>Notifications</span>
            <div className=' mt-2 flex flex-col justify-start w-[100%]'>
              { notifications ? (notifications.length === 0? <span className='text-gray-400 text-center mt-[100px]'>No notifications for you</span>:notifications) : <div>
                <div className={`w-[100%] h-[70px] mt-2 bg-gray-300 animate-pulse rounded-[20px]`}></div>
                <div className={`w-[100%] h-[70px] mt-2 bg-gray-300 animate-pulse rounded-[20px]`}></div>
                <div className={`w-[100%] h-[70px] mt-2 bg-gray-300 animate-pulse rounded-[20px]`}></div>
                </div>}
            </div>
          </div>
          <button  onClick={logoutClickHandler} className='bg-gray-300 text-red-600 font-semibold px-5 py-1 rounded-[5px] hover:text-orange-600 hover:scale-105 text-[20px] mt-7'>Log out</button>
        </div>
    </>
  )
}


export default Profile;