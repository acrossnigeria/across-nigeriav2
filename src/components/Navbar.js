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

const Navbar = () => {
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
      const scrollThreshold = 140;
      setIsFixed(window.scrollY >= scrollThreshold);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  return (
    <>
    <nav id="top" style={{paddingBottom:'0px'}} className={`bg-green-600 overflow-hidden  py-3`} onClick={()=>{open&&setOpen(false)}}>

      <div style={{alignItems:'center', flexDirection:'row', justifyContent:'space-between'}} className={`flex px-[10px] transition-background ease-in-out ${isFixed?'fixed top-0 z-40 bg-green-600/80 h-[45px] w-[100%]':'pb-[10px]'}`}>
        <div className='flex flex-row justify-between gap-[12px]'>
            {/* Logo */}
          <Link href="/" style={{}} onClick={()=>(router.push("/"))} className="flex items-center justify-center">
            {/* <Image src={logo} alt="Logo"  className="h-[40px] w-[40px]" /> */}
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
          <div className="relative flex flex-row items-center gap-2">
            {/* <Link href={'/notifications'} className='flex h-[35px] w-[35px] rounded-full justify-center items-center hover:bg-green-800 flex-row'>
              <NotifyIcon/>
              <div className={`absolute ml-[23px] text-white mb-[23px] bg-red-500 flex flex-row justify-center items-center rounded-full p-2 h-[23px] text-[13px] w-[23px]`}>1</div>
            </Link> */}
            <div style={{alignItems:'center'}} className="flex flex-row justify-between gap-2 h-[35px] px-[25px] pr-[2px] cursor-pointer  text-white bg-gradient-to-br from-green-500 to-yellow-400 transition duration-100 rounded-[30px] text-[16px]">
              <Link href={'/user/profile'}>{session.user.name}</Link>
               <Profile size={'30px'}/>
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
        <div className={` flex py-1 justify-center text-[18px] gap-5`}>
          {/* First Line Menus */}
            <Link href="#products" className="text-white px-3 py-1  hover:scale(105%)">
              Products
            </Link>
            <Link href="/" className="text-white px-3 py-1  hover:scale(105%)">
              Home
            </Link>
            <Link href="/about" className="text-white px-3 py-1 hover:scale(105%)">
              About
            </Link>
        </div>

        <div className="mt-2 fixed bottom-0 rounded-t-[5px] w-[100%] flex z-[1000] bg-green-600 flex-row font-sans h-[57px] items-center text-[14px] justify-around">
          {/* Second Line Menus */}
            <Link style={{alignItems:'center'}} href="/giveaway-quiz" className="text-green-200 px-1 rounded-[15px] hover:bg-green-800 py-1 flex flex-col justify-center">
              <Money/>
              Giveaway Quiz
            </Link>
            <Link style={{alignItems:'center'}} href="/soon" className="text-green-200 px-1 rounded-[15px] hover:bg-green-800 flex py-1 flex-col justify-center">
              <Video/>
              Skits Across Naija
            </Link>
            <Link style={{alignItems:'center'}} href="/shoutout" className="text-green-200 px-1 rounded-[15px] hover:bg-green-800 py-1 flex flex-col justify-center">
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
