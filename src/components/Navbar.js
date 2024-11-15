import Image from 'next/image';
import React, { useState } from 'react';
import logo from "../../public/images/logo1.png";
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Home from '../../public/images/icon/Home.js';
import Search from '../../public/images/icon/Search';

const Navbar = () => {
  const { status, data: session } = useSession();
  const router=useRouter();
const logoutClickHandler = () => {
        signOut();
        router.push("/login")
      };
      const[open,setOpen]=useState(false)
const toggleMenu=()=>{
  setOpen(!open);}
  return (
    <nav style={{borderBottomLeftRadius:'10px', borderBottomRightRadius:'10px'}} className="bg-gradient-to-br from-green-400 to-green-800 bg-gradient-to-b from-green-500 to-green-950 overflow-hidden  py-4 px-2" onClick={()=>{open&&setOpen(false)}}>
      {/* Logo */}

      <Link href="/" style={{marginBottom:'10px'}} onClick={()=>(router.push("/"))} className="flex items-center justify-center">
        <Image src={logo} alt="Logo"  className="h-15 w-14" />
      </Link>

      <div style={{alignItems:'center', flexDirection:'row', justifyContent:'space-between', padding:'0px 1rem'}} className="flex gap-2">
              {/* Search Bar */}
      <div style={{height:'40px', display:'flex', backgroundColor:'white', padding:'0px 10px', borderRadius:'10px'}} >
        <input
          type="text"
          placeholder="Search..."
          style={{fontSize:'16px'}}
          className=" focus:outline-none"
        />
        <Search/>
      </div>
      {/* Dropdown Button */}
      {status === 'loading' ? (
        <div className="flex w-[fit-content] p-1 h-9 cursor-pointer items-center font-semibold 
        justify-center uppercase text-white border-2 border-green-600 bg-green-600 transition duration-100 rounded-lg text-[10px]
        ease-in-out hover:bg-white hover:text-yellow-600 hover:border-2 hover:border-yellow-600 hover:scale-105 hover:rounded-sm">
          Loading
        </div>
        ) : session?.user ? (
        <div className="relative">
          <div className="flex left-0 py-3 cursor-pointer font-semibold 
          uppercase text-white border-2 border-green-300 bg-green-600 transition duration-100 rounded-lg text-[10px]"
          onClick={toggleMenu}>
            {session.user.name}
          </div>
          {open && (
            <div className="absolute right-0 top-12 flex-1 mr-3 w-16 origin-top-right bg-green-600 text-[8px] lg:text-sm divide-y divide-gray-100 rounded-md shadow-lg ring-1
            ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <div className="py-1 flex" role="none">
                <a onClick={logoutClickHandler} className="text-gray-700 block px-3" role="menuitem">LogOut</a>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div style={{width:'70px', height:'40px'}} className="flex p-1 h-10 cursor-pointer items-center font-semibold 
        justify-center uppercase text-white border-2 border-green-300 bg-green-600 transition duration-100 rounded-lg text-[14px]
        ease-in-out hover:bg-green-900 hover:border-1 hover:scale-105 hover:rounded-sm">
          <Link href="/login" className="p-2 cursor-pointer" legacyBehavior>
            <a>Login</a>
          </Link>
        </div>
      )}

    </div>
      {/* Menus */}
      <div className="mt-4 flex justify-center">
        {/* First Line Menus */}
        <div style={{fontSize:'17.5px'}} className="space-x-4 font-semibold">
          <Link href="/" className="text-white  hover:text-green-500">
            Home
          </Link>
          <Link style={{display:(session?.user?'block':'none')}} href="/profile" className="text-white hover:text-green-500">
            Profile
          </Link>
          <Link href="" className="text-white  hover:text-green-500">
            Our Products
          </Link>
          <Link href="/about" className="text-white hover:text-green-500">
            About
          </Link>
        </div>
      </div>

      <div className="mt-2 flex font-sans font-thin text-[14px] justify-center">
        {/* Second Line Menus */}
        <div className="space-x-1">
          <Link href="/giveaway" className="text-white border rounded p-[2px] hover:bg-green-800">
            Giveaway quizzes
          </Link>
          <Link href="/skitsPage" className="text-white border rounded p-[2px] hover:bg-green-800">
            Skits Across Naija
          </Link>
          <Link href="/shoutout/booking" className="text-white border rounded p-[2px] hover:bg-green-800">
          Shout Out!
          </Link>
          {/* <Link href="" className="text-white border rounded p-[2px] hover:bg-green-800">
            Our products
          </Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
