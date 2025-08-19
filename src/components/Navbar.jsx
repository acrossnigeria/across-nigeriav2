import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Logo from '../../public/images/icon/Logo';
import Profile from '../../public/images/icon/Profile';
import BottomMenu from './BottomMenu';
import { Bell } from 'lucide-react';

const Navbar = ( { hideNav } ) => {
  const { status, data: session } = useSession();
  const router = useRouter();
  const [ open, setOpen ] = useState(false);
  const [ isFixed, setIsFixed ] = useState(false);
  const [ notifications, setNotifications ] = useState(0);

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
    <nav id="top" style={{paddingBottom:'0px'}} className={`bg-green-600 overflow-hidden  py-3`} onClick={()=>{open&&setOpen(false)}}>

      <div style={{alignItems:'center', flexDirection:'row', justifyContent:'space-between'}} className={`flex px-[10px] transition-background ease-in-out ${isFixed?'fixed top-0 z-40 bg-green-600/80 h-[45px] w-[100%]':'pb-[10px]'}`}>
        <div className='flex flex-row justify-between gap-[12px]'>
            {/* Logo */}
          <Link href="/" style={{}} onClick={()=>(router.push("/"))} className="flex items-center justify-center">
            <Logo/>
          </Link>
        </div>
        {status === 'loading' ? (
          <div className=" w-[120px] h-[30px] items-center rounded-full justify-center uppercase text-white  bg-green-500 text-[14px] animate-pulse  ">
          </div>
          ) : session?.user ? (
          <div className="relative flex flex-row items-center gap-3">
            <Link href={'/user/notifications'} className='flex h-[35px] w-[35px] rounded-full justify-center items-center hover:bg-green-800 flex-row'>
              <Bell strokeWidth={1.5} color='white' />
              <div className={`absolute ml-[23px] text-white mb-[23px] ${notifications>0?'bg-red-500':'bg-gray-500'} flex flex-row justify-center items-center rounded-full p-2 h-[21px] text-[11px] w-[21px]`}>{notifications}</div>
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
              <div className="flex w-[100px] h-[30px] cursor-pointer items-center justify-center text-green-900 bg-white hover:bg-gray-200 transition duration-100 rounded-[9px]
              ease-in-out  hover:scale-105">
                Register
              </div>
            </button>
            
          </div>
        )}

    </div>
      <div >
                {/* Menus */}
        <div className={`px-2 pt-1 ${hideNav?'hidden':'flex'} flex-row w-[100%] justify-start gap-2 bg-white overflow-x-scroll`}>
          {/* First Line Menus */}
            <Link href="#products" className="hover:underline px-4 py-1 text-[14px] w-[33%] flex flex-row justify-center items-center text-gray-800">
              Products
            </Link>
            <Link href="/" className="hover:underline px-4 py-1 w-[33%] text-[14px] flex flex-row justify-center items-center text-gray-800">
              Home
            </Link>
            <Link href="/about" className="hover:underline px-4 w-[33%] text-[14px] flex flex-row justify-center items-center py-1 text-gray-800">
              About
            </Link>
        </div>

        <BottomMenu hideNav={hideNav} />
      </div>

    </nav>
    </>
  );
};

export default Navbar;
