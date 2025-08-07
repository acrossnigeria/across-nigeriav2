import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession, signOut } from 'next-auth/react';
import ProfileIcon from '../../../public/images/icon/ProfileIcon';
import Link from 'next/link';
import AmbassadorIcon from '../../../public/images/icon/AmbassadorIcon';
import ExplorerIcon from '../../../public/images/icon/ExplorerIcon';
import RefIcon from '../../../public/images/icon/RefIcon';
import EmailIcon from '../../../public/images/icon/EmailIcon';
import PhoneIcon from '../../../public/images/icon/PhoneIcon';
import LinkIcon from '../../../public/images/icon/LinkIcon';
import LogoutIcon from '../../../public/images/icon/LogoutIcon';
import SettingsIcon from '../../../public/images/icon/SettingsIcon';
import ChevronIcon from '../../../public/images/icon/ChevronIcon';
import ArrowIcon from '../../../public/images/icon/ArrowIcon';
import Next from '../../../public/images/icon/Next';




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

  const [ showUpdateModal, setShowUpdateModal ] = useState(false);
  const [ modalHeight, setModalHeight ] = useState('h-[10%]');
  const [ modalOpacity, setModalOpacity ] = useState('opacity-0');
  const [ modalBlur, setModalBlur ] = useState('backdrop-blur-[0px]');

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

  return (
    <>
        <div style={{alignItems:'center'}} className='flex flex-col min-h-[1000px] bg-gray-100'>
          <div className={` md:w-[70%] w-[100%] gap-2 text-left flex flex-col p-0`}>
            <Link href={'/'} className='h-[40px] ml-[5%] font-semibold w-fit self-start mt-[10px] flex flex-row items-center gap-2' >
              <ArrowIcon/>
              Back home
            </Link>
            <div className='w-[100%] justify-center items-center flex flex-col gap-2 h-fit'>
              <ProfileIcon bg={'gray'} size='125px'/>
              <div className='flex flex-col justify-center items-center'>
                <div> { fullname ? <span className='font-extrabold text-[23px]'>{fullname}</span>: <div className={`w-[140px] h-[25px] bg-gray-300 animate-pulse rounded-[20px]`}></div>}</div>
                <div> { fullname ? ( isAmbassador ? (
                      <div className='flex flex-row text-orange-500 font-bold justify-center items-center gap-1'>Ambassador<AmbassadorIcon/></div>
                      ):(
                      <div className='flex text-purple-500 font-bold flex-row justify-center items-center gap-1'>Explorer<ExplorerIcon/></div>
                      )
                      ) : <div className={`w-[120px] h-[20px] mt-[5px] bg-gray-300 animate-pulse rounded-[20px]`}></div> }
                </div>
              </div>
            </div>

            <div className='flex flex-col left mt-[10px] py-[10px] px-[25px] gap-3 w-[100%]'>
              <div className='flex flex-row items-center px-[5%] gap-2'><EmailIcon/>{ email ? email: <div className={`w-[130px] h-[20px] bg-gray-300 animate-pulse rounded-[20px]`}></div> }</div>
              <div className='flex flex-row items-center px-[5%] gap-2'><PhoneIcon/>+{phone ? phone: <div className={`w-[100px] h-[20px] bg-gray-300 animate-pulse rounded-[20px]`}></div> }</div>
            </div>
          </div>
          <div className='flex flex-col gap-[15px] md:w-[70%] w-[90%] justify-left items-start border-t-1 border-t-gray-300 pt-[20px]'>
            <button className='h-[50px] rounded-[25px] hover:shadow-md hover:shadow-black/20 hover:scale-105 transition-all ease-in-out duration-300 flex flex-row justify-between items-center px-[5%] bg-gray-300 w-[100%] text-[15px]'>
              <div className='flex flex-row items-center w-fit gap-3'>
                <SettingsIcon/>
                <span>Edit profile</span>
              </div>
              <ChevronIcon/>
            </button>

            <button onClick={()=>{modal('in')}} className='h-[50px] rounded-[25px] hover:shadow-md hover:shadow-black/20 hover:scale-105 transition-all ease-in-out duration-300 flex flex-row justify-between items-center px-[5%] bg-gray-300 w-[100%] text-[15px]'>
              <div className='flex flex-row items-center w-fit gap-3'>
                <RefIcon/>
                <span>Referrals</span>
              </div>
              <ChevronIcon/>
            </button>

            <button onClick={logoutClickHandler} className='h-[50px] rounded-[25px] hover:shadow-md hover:shadow-black/20 hover:scale-105 transition-all ease-in-out duration-300 flex flex-row justify-between items-center px-[5%] bg-gray-300 w-[100%] text-[15px]'>
              <div className='flex flex-row items-center w-fit gap-3'>
                <LogoutIcon/>
                <span>Logout</span>
              </div>
            </button>
          </div>

            { showUpdateModal && 
              <div className={`h-screen w-screen transition-all duration-300 ease-in-out bg-black/10 flex flex-col justify-end ${modalBlur} fixed top-0`}>
                  <div className={`${modalHeight} ${modalOpacity} transition-all overflow-hidden px-[5%] duration-500 ease-in-out w-[100%] rounded-t-[30px] pt-[30px] md:px-[25%] bg-gray-100`}>
                    <div className="mb-[20px]">
                        <button onClick={()=>{modal('out')}} className="w-fit flex flex-row items-center transition-all duration-500 ease-in-out hover:scale-105 gap-2"><div className="rotate-180"><Next bg={'black'} size={'20px'}/></div>Go back</button>
                    </div>
                    <span className="font-bold">Refer a friend and earn rewards</span>
                      <div className="mt-[15px] flex flex-col gap-3">
                        <div className='flex flex-row items-center gap-2'> <RefIcon/>{refs ? (`Referrals:${refs}`): <div className={`w-[150px] h-[20px] bg-gray-300 animate-pulse rounded-[20px]`}></div> }</div>
                        <div className='text-green-500 flex flex-row gap-2'><LinkIcon/>{refLink ? refLink: <div className={`bg-gray-300 animate-pulse rounded-[20px]`}></div> }</div>
                        <button onClick={copyRefLink} className='border-1 rounded-[25px] h-[45px] w-[100%] border-gray-600 bg-gray-300 py-1 px-4 hover:opacity-70'>Copy referral link<span className={`px-4 bg-green-400 text-green-900 py-1 border-1 absolute ml-[-90px] mt-[30px] border-green-900 ${isCopied}`}>Link copied</span></button>
                      </div>
                  </div>
              </div>
            }
        </div>
    </>
  )
}

Profile.auth = true;

export default Profile;