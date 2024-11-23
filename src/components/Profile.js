import Layout from '@/components/Layout'
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const Profile = () => {
  const { status, data: session } = useSession();

  const [ isMobile, setIsMobile ] = useState(false);
  const [ email, emailEmail ] = useState('');
  const [ phone, setPhone ] = useState('+0000 000 0000');
  const [ refs, setRefs ] = useState(0);
  const [ refCode, setRefCode ] = useState('...loading');
  const [ refLink, setRefLink ] = useState('...loading');
  const [ isCopied, setIsCopied ] = useState('hidden');

  async function getUserData() {
    try {
      const response = await axios.get('/api/findUser', {params:{ email }});
      const profile = response.data;
      setRefs(profile.refs);
      setRefCode(profile.refCode);
      setRefLink(`https:acrossnig.com/account/reg?ref=${profile.refCode}`);
    } catch( err ) {
      alert('an error occurred, please check your internet connection');
    }

  }

  if ( status !== 'loading') {
    console.log('getting user data');
    getUserData();
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
    // console.log(isMobile, navigator.userAgent)
  },[ isMobile ])

  return (
    <>
        <div style={{alignItems:'center'}} className='mt-[10px] flex flex-col'>
          <div style={{borderRadius:'15px', alignItems:'center'}} className={`${isMobile?'w-[95%]':'w-[70%]'} border-[0.5px] bg-green-100 border-green-800 gap-4 text-left flex flex-row bg-gray-200 p-[15px]`}>
            <div style={{borderRadius:'50%'}} className='w-[60px] h-[60px] bg-gray-800'></div>
            <div className='flex flex-col'>
              <span><span className='font-bold text-gray-500 text-[14px]'>Full name:</span> { status === 'loading'?'...loading':session?.user?.name + session?.user?.surname }</span>
              <span><span className='font-bold text-gray-500 text-[14px]'>Email:</span> { status === 'loading'?'...loading':session?.user?.email } </span>
              <span><span className='font-bold text-gray-500 text-[14px]'>Phone:</span> {phone}</span>
            </div>
          </div>
          <div style={{borderRadius:'25px', alignItems:'center'}} className={`${isMobile?'w-[95%]':'w-[70%]'} border-[0.5px] bg-green-100 border-green-800 mt-[10px] text-left flex flex-col bg-gray-200 p-[5px]`}>
            <span><span className='font-bold text-gray-500 text-[14px]'>Referrals:</span> {refs}</span>
            <span><span className='font-bold text-gray-500 text-[14px]'>Referral code:</span> {refCode}</span>
            <span className='text-[14px] mt-1 mb-2 border-b-1 border-green-950'>{refLink}</span>
            <button onClick={copyRefLink} style={{borderRadius:'10px'}} className='border-1 border-gray-600 bg-gray-300 py-1 px-4 hover:opacity-70'>Copy link<span className={`px-4 bg-green-400 text-green-900 py-1 border-1 absolute ml-[-90px] mt-[30px] border-green-900 ${isCopied}`}>Link copied</span></button>
          </div>
          <div style={{borderRadius:'25px', alignItems:'center'}} className={`${isMobile?'w-[95%]':'w-[70%]'} h-[300px] border-[0.5px] bg-green-100 border-green-800 mt-[10px] text-left flex flex-col bg-gray-200 p-[5px]`}>
            <span className='font-bold text-gray-500 text-[14px] border-b-1 border-green-950'>Your recent activities will appear here.</span>
          </div>
        </div>
    </>
  )
}

export default Profile;