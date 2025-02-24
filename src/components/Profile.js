import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession, signOut } from 'next-auth/react';
import ProfileIcon from '../../public/images/icon/ProfileIcon';
import GlamorousBG from './GlamorousBg';
import Link from 'next/link';
import BackIcon from '../../public/images/icon/BackIcon';
import AmbassadorIcon from '../../public/images/icon/AmbassadorIcon';
import ExplorerIcon from '../../public/images/icon/ExplorerIcon';
import RefIcon from '../../public/images/icon/RefIcon';
import EmailIcon from '../../public/images/icon/EmailIcon';
import PhoneIcon from '../../public/images/icon/PhoneIcon';
import LinkIcon from '../../public/images/icon/LinkIcon';
import LogoutIcon from '../../public/images/icon/LogoutIcon';
import SettingsIcon from '../../public/images/icon/SettingsIcon';




const Profile = () => {
  const { status, data: session } = useSession();

  const [ isMobile, setIsMobile ] = useState(false);
  const [ email, setEmail ] = useState(session?.user?.email);
  const [ phone, setPhone ] = useState(null);
  const [ fullname, setFullname ] = useState(null);
  const [ refs, setRefs ] = useState(0);
  const [ refCode, setRefCode ] = useState(null);
  const [ isCopied, setIsCopied ] = useState('hidden');
  const [ notifications, setNotifications ] = useState([]);
  const [ isAmbassador, setIsAmbassador ] = useState(false);
  const [ refLink, setRefLink ] = useState(null);

  const getUserData = async () => {
    setEmail(session?.user?.email);
    try {
      const response = await axios.get(`/api/findUser?email=${email}`);
      const profile = response.data;
      setRefs(profile.refs === 0 ? '0':profile.refs);
      setRefCode(profile.refCode);
      setRefLink(`https://acrossnig.com/account/reg?ref=${profile.refCode}`);
      setPhone(profile.phone);
      setFullname(profile.fullname);
      setNotifications(profile.notifications);
      setIsAmbassador(profile.isAmbassador);
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
        <div style={{alignItems:'center'}} className='flex flex-col min-h-[1000px] bg-gray-100'>
          <div className={` md:w-[70%] w-[100%] gap-4 text-left flex flex-col p-0`}>
            <div className='absolute font-extrabold text-[25px] mr-[15px] text-green-600 mt-[10px] self-end text-right'>Profile</div>
            <Link href={'/'} className='h-[40px] absolute ml-[15px] bg-white/60 hover:bg-white rounded-[10px] font-extrabold w-fit self-start px-[20px] py-[14px] mb-[10px] mt-[10px] flex flex-row items-center gap-2' >
              <BackIcon/>
              Go back home
            </Link>
            <div className='w-fit ml-[50%] mt-[75px] h-fit absolute'>
              <ProfileIcon bg={'gray'} size='125px'/>
            </div>
            <GlamorousBG/>
            <div className='flex flex-col left mt-[30px] px-[25px] gap-1'>
              <div> { fullname ? <span className='font-extrabold text-[23px]'>{fullname}</span>: <div className={`w-[140px] h-[15px] bg-gray-300 animate-pulse rounded-[20px]`}></div>}</div>
              <div> { fullname ? ( isAmbassador ? (
                    <div className='flex flex-row text-blue-500 font-bold items-center gap-1'>Ambassador<AmbassadorIcon/></div>
                    ):(
                    <div className='flex text-purple-500 font-bold flex-row items-center gap-1'>Explorer<ExplorerIcon/></div>
                    )
                    ) : <div className={`w-[130px] h-[15px] bg-gray-300 animate-pulse rounded-[20px]`}></div> }</div>
            </div>

            <div className='flex flex-col left mt-[20px] pt-[10px] px-[25px] gap-1 border-t-1 border-t-gray-300 w-[100%]'>
              <div className='flex flex-row gap-2'><EmailIcon/>{ email ? email: <div className={`w-[130px] h-[15px] bg-gray-300 animate-pulse rounded-[20px]`}></div> }</div>
              <div className='flex flex-row gap-2'><PhoneIcon/>+{phone ? phone: <div className={`w-[100px] h-[15px] bg-gray-300 animate-pulse rounded-[20px]`}></div> }</div>
          </div>
          </div>
          <div className={`w-[100%] md:w-[70%] px-[25px] justify-left pt-[10px] mt-[10px] border-t-1 border-t-gray-300 text-left gap-1 flex flex-col p-[5px]`}>
            <div className='flex flex-row gap-2'> <RefIcon/>{refs ? (`Referrals:${refs}`): <div className={`w-[150px] h-[15px] bg-gray-300 animate-pulse rounded-[20px]`}></div> }</div>
            <div className='flex md:flex-row flex-col justify-between items-center'>
              <div className='text-green-500 flex flex-row gap-2'><LinkIcon/>{refLink ? refLink: <div className={`bg-gray-300 animate-pulse rounded-[20px]`}></div> }</div>
              <button onClick={copyRefLink} className='border-1 rounded-[10px] md:w-fit w-[100%] border-gray-600 bg-gray-300 py-1 px-4 hover:opacity-70'>Copy My Referral link<span className={`px-4 bg-green-400 text-green-900 py-1 border-1 absolute ml-[-90px] mt-[30px] border-green-900 ${isCopied}`}>Link copied</span></button>
            </div>
          </div>
          <div className='flex flex-col gap-[15px] md:w-[70%] w-[100%] pl-[25px] justify-left items-start border-t-1 border-t-gray-300 pt-[20px]'>
            <div className='font-bold w-fit text-gray-600 items-center flex flex-row gap-2 hover:text-gray-800 hover:scale-105 text-[15px]'><SettingsIcon/> Edit profile</div>
            <button onClick={logoutClickHandler} className='font-bold w-fit items-center text-red-600 flex flex-row gap-2 hover:text-red-800 hover:scale-105 text-[15px]'><LogoutIcon/>Log out</button>
          </div>
        </div>
    </>
  )
}


export default Profile;