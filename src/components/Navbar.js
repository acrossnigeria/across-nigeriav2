import Image from 'next/image';
import React, { useState } from 'react';
import logo from "../../public/images/logo1.png";
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

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
    <nav className="bg-gradient-to-br from-green-400 to-green-800 bg-gradient-to-b from-green-500 to-green-950 overflow-hidden  py-4 px-2" onClick={()=>{open&&setOpen(false)}}>
      {/* Logo */}
      <Link href="/" onClick={()=>(router.push("/"))} className="flex items-center justify-center">
        <Image src={logo} alt="Logo"  className="h-8 w-8" />
      </Link>
      <p className='flex items-center text-[10px] justify-center mb-2 font-thin text-white'> Across Nigeria Reality Show</p>
         <div className="flex justify-start">
      {/* Dropdown Button */}
      {status === 'loading' ? (
        <div className="flex w-[fit-content] p-1 h-9 cursor-pointer items-center font-semibold 
        justify-center uppercase text-white border-2 border-green-600 bg-green-600 transition duration-100 rounded-lg text-[10px]
        ease-in-out hover:bg-white hover:text-yellow-600 hover:border-2 hover:border-yellow-600 hover:scale-105 hover:rounded-sm">
          Loading...
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
              <div className="py-2 flex" role="none">
                <a onClick={() => router.push('/profile')} className="text-gray-700 block px-6" role="menuitem">Profile</a>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex w-[fit-content] p-1 h-9 cursor-pointer items-center font-semibold 
        justify-center uppercase text-white border-2 border-green-300 bg-green-600 transition duration-100 rounded-lg text-[10px]
        ease-in-out hover:bg-white hover:text-yellow-600 hover:border-2 hover:border-yellow-600 hover:scale-105 hover:rounded-sm">
          <Link href="/login" className="p-2 cursor-pointer" legacyBehavior>
            <a>Login</a>
          </Link>
        </div>
      )}

      {/* Search Bar */}
      <div className="flex-grow mx-1">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 mx-0 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>
    </div>
      {/* Menus */}
      <div className="mt-4 flex justify-center">
        {/* First Line Menus */}
        <div className="space-x-4">
          <Link href="/" className="text-white  hover:text-green-500">
          Home
          </Link>
          <Link href="/about" className="text-white hover:text-green-500">
            About
          </Link>
          <Link href="" className="text-white  hover:text-green-500">
            Our Products
          </Link>
          <Link href="/profile" className="text-white hover:text-green-500">
            Profile
          </Link>
        </div>
      </div>

      <div className="mt-2 flex font-sans font-thin text-[11px] justify-center">
        {/* Second Line Menus */}
        <div className="space-x-2">
          <Link href="/naijavibes" className="text-white border rounded p-[2px] hover:bg-green-800">
            NaijaVibes
          </Link>
          <Link href="/giveaway" className="text-white border rounded p-[2px] hover:bg-green-800">
            Giveaway
          </Link>
          <Link href="/skitsPage" className="text-white border rounded p-[2px] hover:bg-green-800">
            Skits Across Naija
          </Link>
          <Link href="/shoutout/booking" className="text-white border rounded p-[2px] hover:bg-green-800">
          Shout Out!
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
