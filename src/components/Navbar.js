import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import logo from "../../public/images/logo1.png";
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Search from '../../public/images/icon/Search';
import Money from '../../public/images/icon/Money';
import Video from '../../public/images/icon/Video';
import ShoutMic from '../../public/images/icon/ShoutMic';
import Logo from '../../public/images/icon/Logo';
import Profile from '../../public/images/icon/Profile';
import Login from '../../public/images/icon/Login';
import NotifyIcon from '../../public/images/icon/NotifyIcon';

const Navbar = ( { hideNav } ) => {
  const { status, data: session } = useSession();
  const router = useRouter();
  const [ open, setOpen ] = useState(false);
  const [ isFixed, setIsFixed ] = useState(false);

  const logoutClickHandler = () => {
    signOut();
    router.push("/account/login");
  };

  const toggleMenu=()=>{
    setOpen(!open);
  }

  useEffect( () => {
    const handleScroll = () => {
      if ( hideNav ) {
        setIsFixed(false);
      } else {
        const scrollThreshold = 140;
        setIsFixed(window.scrollY >= scrollThreshold);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  return (
    <>
    <nav id="top" style={{paddingBottom:'0px'}} className={`bg-green-600 overflow-hidden  py-2`} onClick={()=>{open&&setOpen(false)}}>

      <div style={{alignItems:'center', flexDirection:'row', justifyContent:'space-between'}} className={`flex px-[10px] transition-background ease-in-out ${isFixed?'fixed top-0 z-40 bg-green-600/80 h-[45px] w-[100%]':'pb-[10px]'}`}>
        <div className='flex flex-row justify-between gap-[12px]'>
            {/* Logo */}
          <Link href="/" style={{}} onClick={()=>(router.push("/"))} className="flex items-center justify-center">
            <Logo/>
          </Link>
              {/* Search Bar */}
          <div onClick={toggleMenu} style={{alignItems:'center'}} className='h-[30px] px-1 flex flex-row justify-center'>
            <Search/>
          </div>
        </div>
        {status === 'loading' ? (
          <div className=" w-[120px] h-[30px] items-center rounded-full justify-center uppercase text-white  bg-green-500 text-[14px] animate-pulse  ">
          </div>
          ) : session?.user ? (
          <div className="relative flex flex-row items-center gap-3">
            <Link href={'/notifications'} className='flex h-[35px] w-[35px] rounded-full justify-center items-center hover:bg-green-800 flex-row'>
              <NotifyIcon/>
              <div className={`absolute ml-[23px] text-white mb-[23px] bg-red-500 flex flex-row justify-center items-center rounded-full p-2 h-[21px] text-[11px] w-[21px]`}>3</div>
            </Link>
            <div style={{alignItems:'center'}} className="flex flex-row justify-between gap-2 h-[30px] px-[10px] cursor-pointer  text-white bg-gradient-to-br from-green-500 to-yellow-400 transition duration-100 rounded-[30px] text-[16px]">
              <Link href={'/user/profile'}>{session.user.name}</Link>
               <Profile size={'25px'}/>
            </div>
          </div>
        ) : (
          <div className='w-[fit-content] flex flex-row gap-2'>
            <div className="flex px-[10px] h-[40px] cursor-pointer items-center 
            justify-center text-white bg-transparent transition duration-100 rounded-[40px]
            ease-in-out hover:scale-105">
              <Link href="/account/login" className="cursor-pointer" legacyBehavior>
                <a>Login</a>
              </Link>
            </div>
            <button onClick={()=>{router.push("/account/reg")}} className="cursor-pointer" >
              <div className="flex w-[100px] h-[30px] cursor-pointer items-center 
              justify-center text-green-900 bg-white hover:bg-gray-200 transition duration-100 rounded-[25px]
              ease-in-out  hover:scale-105">
                Register
              </div>
            </button>
            
          </div>
        )}

    </div>
      <div >
                {/* Menus */}
        <div className={`px-2 pt-1 ${hideNav?'hidden':'flex'} flex-row w-[100%] justify-start gap-2 bg-gray-100 overflow-x-scroll`}>
          {/* First Line Menus */}
            <Link href="#products" className="rounded-[15px] px-4 py-1 text-[14px] w-[33%] flex flex-row justify-center items-center bg-gray-200 text-gray-500">
              Products
            </Link>
            <Link href="/" className="rounded-[15px] px-4 py-1 w-[33%] text-[14px] flex flex-row justify-center items-center bg-gray-200 text-gray-500">
              Home
            </Link>
            <Link href="/about" className="rounded-[15px] px-4 w-[33%] text-[14px] flex flex-row justify-center items-center py-1 bg-gray-200 text-gray-500">
              About
            </Link>
        </div>

        <div className={`${hideNav?'hidden':'flex'} mt-2 fixed bottom-0 rounded-t-[5px] w-[100%] z-[1000] bg-green-600 flex-row font-sans h-[50px] items-center justify-around`}>
          {/* Second Line Menus */}
            <Link style={{alignItems:'center'}} href="/giveaway-quiz" className="text-green-200 text-[12px] hover:scale-105 items-center flex flex-col justify-center">
              <Money/>
              Giveaway Quiz
            </Link>
            <Link style={{alignItems:'center'}} href="/soon" className="text-green-200 text-[12px] hover:scale-105 items-center flex flex-col justify-center">
              <Video/>
              Skits Across Naija
            </Link>
            <Link style={{alignItems:'center'}} href="/shoutout" className="text-green-200 text-[12px] hover:scale-105 items-center flex flex-col justify-center">
              <ShoutMic/>
            Shout Out
            </Link>
        </div>
      </div>

    </nav>
    { open && (
    <div className={`mt-2 flex flex-row justify-center gap-3`}>
      <input className='w-[250px] border-[2px] border-green-800 h-[40px] focus:outline-none px-[10px] rounded-[10px]' type='text'></input>
      <button className='text-green-800 text-[18px] h-[40px] px-[10px] border-2 rounded-[10px] border-green-800 hover:text-white hover:bg-green-800 hover:border-none'>Search</button>
    </div>
    )}
    </>
  );
};

export default Navbar;
