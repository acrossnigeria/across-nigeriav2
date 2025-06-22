
// components/Navbar.js
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logo from "../../public/images/logo1.png";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Search from '../../public/images/icon/Search';
import Profile from "../../public/images/icon/Profile";


const StickyNavbar = ( { notification }) => {
  const { status, data: session } = useSession();


  const submitHandler = (e) => {
    e.preventDefault();
    console.log(query);
  };
 

  return (
    <header id="top" className={`top-0 w-full  z-[9999] overflow-x-hidden px-0`}>
      <nav style={{height:'fit-content', display:'flex', justifyContent:'space-between', paddingTop:'15px', paddingLeft:'4%', paddingRight:'4%', paddingBottom:'10px'}} className={`w-full pt-3 top-0 left-0 right-0 py-0 bg-green-600 text-white px-1`}>
          <div style={{height:'fit-content', display:'flex', justifyContent:'space-between', alignItems:'center', gap:'1.5rem'}}>
            <Link href="/" legacyBehavior>
                <Image src={logo} alt="Logo" className="h-[60px] w-[60px]" placeholder="blur"/>
            </Link>
            <div className="flex flex-row gap-[2rem]">
              <Link href={'/'}>
                  <div className="flex text-[18px] h-full hover:text-green-300 hover:underline">
                    Home
                  </div>
              </Link>
              <Link href={'/giveaway-quiz'}>
                  <div className="flex text-[18px] hover:text-green-300 hover:underline">
                    Giveaway-quiz
                  </div>
              </Link>
              <Link href={'/shoutout'}>
                  <div className="flex text-[18px] hover:text-green-300 hover:underline">
                    Shout-out
                  </div>
              </Link>
              <Link href={'/about'}>
                  <div className="flex text-[18px] hover:text-green-300 hover:underline">
                    About
                  </div>
              </Link>
            </div>
          </div>
            {/* Menu content */}
          <div style={{alignItems:'center'}} className="text-white flex cursor-pointer w-auto gap-[2rem]">
          
            { session?.user ? (
              <div className="relative flex flex-row items-center gap-2">
                {/* <Link href={'/notifications'} className='flex h-[35px] w-[35px] rounded-full justify-center items-center hover:bg-green-800 flex-row'>
                  <NotifyIcon/>
                  <div className={`absolute ml-[23px] mb-[23px] ${notification?(notification.unread === 0?'bg-gray-500':'bg-red-500 animate-pulse'):'bg-gray-500 animate-pulse'} flex flex-row justify-center items-center font-bold rounded-full p-2 h-[23px] text-[13px] w-[23px]`}>{notification?.unread}</div>
                </Link> */}
                <div style={{alignItems:'center'}} className="flex flex-row justify-between gap-2 h-[37px] pl-3 pr-[2px] cursor-pointer  text-white bg-green-800 transition duration-100 rounded-[30px] text-[17px]">
                  <Link className="hover:scale-105" href={'/user/profile'}>{session.user.name}</Link>
                    <div className="hover:scale-105 hover:bg-green-900 rounded-[50%]"><Profile/></div>
                </div>
              </div>
            ) : (
              <div style={{height:'fit-content', display:'flex', justifyContent:'space-between', alignItems:'center', gap:'1rem'}} >
                <div className="flex cursor-pointer text-white w-[80px] transition duration-100 ease-in-out hover:underline" >
                  <Link href="/account/login" className="cursor-pointer" legacyBehavior>
                    <a>Login</a>
                  </Link>
                </div>
                <div className="flex w-[150px] py-2 cursor-pointer items-center justify-center text-white border-1 border-white transition duration-100 rounded-[5px] ease-in-out hover:bg-black/30" >
                  <Link href="/account/reg" className="cursor-pointer" legacyBehavior>
                    <a>Register</a>
                  </Link>
                </div>
              </div>
            )
            }
          </div>
      </nav>
    </header>
  );
};

export default StickyNavbar;
