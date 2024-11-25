import Image from 'next/image';
import React, { useState } from 'react';
import logo from "../../public/images/logo1.png";
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Search from '../../public/images/icon/Search';
import Money from '../../public/images/icon/Money';
import Video from '../../public/images/icon/Video';
import ShoutMic from '../../public/images/icon/ShoutMic';
import Logo from '../../public/images/icon/Logo';

const Navbar = () => {
  const { status, data: session } = useSession();
  const router=useRouter();
const logoutClickHandler = () => {
        signOut();
        router.push("/account/login");
      };
      const[open,setOpen]=useState(false)
const toggleMenu=()=>{
  setOpen(!open);}
  return (
    <>
    <nav id="top" style={{paddingBottom:'0px'}} className="bg-gradient-to-br from-green-400 to-green-800 bg-gradient-to-b from-green-500 to-green-950 overflow-hidden  py-4" onClick={()=>{open&&setOpen(false)}}>

      <div style={{alignItems:'center', flexDirection:'row', justifyContent:'space-between', padding:'0px 10px', paddingBottom:'10px'}} className="flex border-green-300 border-b-1">
        <div className='flex flex-row justify-between gap-[12px]'>
            {/* Logo */}
          <Link href="/" style={{}} onClick={()=>(router.push("/"))} className="flex items-center justify-center">
            {/* <Image src={logo} alt="Logo"  className="h-[40px] w-[40px]" /> */}
            <Logo/>
          </Link>
              {/* Search Bar */}
          <button onClick={toggleMenu} style={{alignItems:'center'}} className='border-2 h-[40px] border-green-300 rounded-[9px] px-1 flex flex-row justify-center'>
            <Search/>
          </button>
        </div>
        {/* <div style={{height:'40px', width:'50px', display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:'white', borderRadius:'9px'}} >
          {/* <input
            type="text"
            placeholder="Search..."
            style={{fontSize:'16px', borderRadius:'10px'}}
            className=" focus:outline-none"
          /> 
          <Search/>
        </div> */}
        {/* Dropdown Button */}
        {status === 'loading' ? (
          <div className=" w-[120px] h-[35px] items-center font-semibold rounded-full justify-center uppercase text-white  bg-green-500 text-[14px] animate-pulse  ">
          </div>
          ) : session?.user ? (
          <div className="relative">
            <div style={{alignItems:'center'}} className="flex flex-row justify-center h-[40px] px-3 cursor-pointer font-bold  text-white border-b-2 border-green-300 bg-green-800 transition duration-100 rounded-lg text-[16px]"
            onClick={toggleMenu}>
              <Link href={'/user/profile'}>{session.user.name}</Link>

            </div>
            {/* {open && (
              <div className="absolute right-0 top-14 flex-1 mr-3 w-18 origin-top-right bg-green-600 text-[16px] divide-y divide-gray-100 rounded-md shadow-lg ring-1
              ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <div className="py-1 flex" role="none">
                  <a onClick={logoutClickHandler} className="text-gray-700 font-medium block px-3" role="menuitem">LogOut</a>
                </div>
              </div>
            )} */}
          </div>
        ) : (
          <div className='w-[fit-content] flex flex-row gap-2'>
            <div style={{width:'70px', height:'40px'}} className="flex p-1 h-10 cursor-pointer items-center font-semibold 
            justify-center text-green-300 border-2 border-green-300 bg-transparent transition duration-100 rounded-lg text-[15px]
            ease-in-out hover:scale-105 hover:rounded-sm">
              <Link href="/account/reg" className="p-2 cursor-pointer" legacyBehavior>
                <a>Register</a>
              </Link>
            </div>
            <div style={{width:'70px', height:'40px'}} className="flex p-1 h-10 cursor-pointer items-center font-semibold 
            justify-center text-green-800 bg-green-300 transition duration-100 rounded-lg text-[14px]
            ease-in-out hover:bg-green-100  hover:scale-105">
              <Link href="/account/login" className="p-2 cursor-pointer" legacyBehavior>
                <a>Login</a>
              </Link>
            </div>
          </div>
        )}

    </div>
      {/* Menus */}
      <div className="flex mt-2 justify-center gap-5 font-bold">
        {/* First Line Menus */}
          <Link href="/" className="text-white  hover:text-green-500">
            Home
          </Link>
          {/* <Link style={{display:(session?.user?'inline':'none')}} href="/user/profile" className="text-white hover:text-green-500">
            Profile
          </Link> */}
          <Link href="#products" className="text-white  hover:text-green-500">
            Our Products
          </Link>
          <Link href="/about" className="text-white hover:text-green-500">
            About
          </Link>
      </div>

      <div className="mt-2 flex bg-gray-300 flex-row font-sans py-2 font-bold text-[13px] justify-around">
        {/* Second Line Menus */}
          <Link style={{alignItems:'center'}} href="/giveaway" className="text-gray-700 flex flex-row justify-center gap-1  hover:text-white">
            <Money/>
            Giveaway quizzes
          </Link>
          <Link style={{alignItems:'center'}} href="/skitsPage" className="text-gray-700 flex flex-row justify-center gap-1  hover:text-white">
            <Video/>
            Skits Across Naija
          </Link>
          <Link style={{alignItems:'center'}} href="/shoutout/booking" className="text-gray-700 flex flex-row justify-center gap-1  hover:text-white">
            <ShoutMic/>
          Shout Out!
          </Link>
      </div>
    </nav>
    { open && (
    <div className={`mt-2 flex flex-row justify-center gap-3`}>
      <input className='w-[250px] border-2 border-green-800 h-[40px] focus:outline-none px-[10px] rounded-[10px]' type='text'></input>
      <button className='text-green-800 text-[19px] font-semibold h-[40px] px-[10px] border-2 rounded-[10px] border-green-800 hover:text-white hover:bg-green-800 hover:border-none'>Search</button>
    </div>
    )}
    </>
  );
};

export default Navbar;
