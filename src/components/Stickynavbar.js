
// components/Navbar.js
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logo from "../../public/images/logo1.png";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Search from '../../public/images/icon/Search';
import Profile from "../../public/images/icon/Profile";


const StickyNavbar = ( { notification, page }) => {
  const { status, data: session } = useSession();


 

  return (
    <header id="top" className={`top-0 w-full  z-[9999] overflow-x-hidden px-0`}>
      <nav style={{height:'fit-content', display:'flex', justifyContent:'space-between', paddingTop:'10px', paddingLeft:'4%', paddingRight:'4%', paddingBottom:'10px'}} className={`w-full pt-3 items-center top-0 left-0 right-0 py-0 bg-white font-semibold text-black px-1`}>
          <Link href="/" legacyBehavior>
              <Image src={logo} alt="Logo" className="h-[60px] w-[60px]" placeholder="blur"/>
          </Link>
          <div className="flex border-gray-300 border-1 rounded-[30px] px-9 h-[40px] items-center flex-row gap-[3rem]">
            <Link className={`${page === 1?"border-b-2 border-b-green-600 text-green-600":""} h-full hover:border-b-2 hover:border-b-green-600 transition-all duration-200 px-2 flex flex-row text-[15px] font-semibold hover:text-green-600 justify-center items-center`} href={'/'}>
                <span >Home</span>
            </Link>
            <Link className={`${page === 2?"border-b-2 border-b-green-600":""} h-full hover:border-b-2 hover:border-b-green-600 transition-all duration-200 px-2 flex flex-row text-[15px] font-semibold hover:text-green-600 justify-center items-center`} href={'/giveaway-quiz'}>
                <span >Giveaway-quiz</span>
            </Link>
            <Link className={`${page === 3?"border-b-2 border-b-green-600":""} h-full hover:border-b-2 hover:border-b-green-600 transition-all duration-200 px-2 flex flex-row text-[15px] font-semibold hover:text-green-600 justify-center items-center`} href={'/shoutout'}>
                <span >Shout-out</span> 
            </Link>
            <Link className={`${page === 4?"border-b-2 border-b-green-600":""} h-full hover:border-b-2 hover:border-b-green-600 transition-all duration-200 px-2 flex flex-row text-[15px] font-semibold hover:text-green-600 justify-center items-center`} href={'/about'}>
                <span >About</span>
            </Link>
          </div>
            {/* Menu content */}
          <div style={{alignItems:'center'}} className="text-white flex cursor-pointer w-auto gap-[2rem]">
          
            { session?.user ? (
              <div className="relative flex flex-row items-center gap-2">
                {/* <Link href={'/notifications'} className='flex h-[35px] w-[35px] rounded-full justify-center items-center hover:bg-green-800 flex-row'>
                  <NotifyIcon/>
                  <div className={`absolute ml-[23px] mb-[23px] ${notification?(notification.unread === 0?'bg-gray-500':'bg-red-500 animate-pulse'):'bg-gray-500 animate-pulse'} flex flex-row justify-center items-center font-bold rounded-full p-2 h-[23px] text-[13px] w-[23px]`}>{notification?.unread}</div>
                </Link> */}
                <div style={{alignItems:'center'}} className="flex flex-row border-gray-400 border-1 justify-between items-center gap-2 h-[40px] w-[130px] pl-2 cursor-pointer transition text-black duration-100 rounded-[30px] text-[17px]">
                  <Link className="hover:scale-105" href={'/user/profile'}>{session.user.name}</Link>
                  <Profile bg={'gray'}/>
                </div>
              </div>
            ) : (
              <div style={{height:'fit-content', display:'flex', justifyContent:'space-between', alignItems:'center', gap:'1rem'}}>
                <Link className="flex w-[150px] text-[14px] transition-all duration-200 h-[40px] cursor-pointer items-center justify-center text-black border-1 border-black rounded-[35px] ease-in-out hover:bg-black/30" href="/account/login" >
                  <span>Login</span>
                </Link>
                <Link className="flex w-[150px] text-[14px] transition-all duration-200 h-[40px] cursor-pointer items-center justify-center text-white bg-green-600 rounded-[35px] ease-in-out hover:bg-green-700" href="/account/reg" >
                  <span>Register</span>
                </Link>
              </div>
            )
            }
          </div>
      </nav>
    </header>
  );
};

export default StickyNavbar;
