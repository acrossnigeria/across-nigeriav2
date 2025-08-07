import React from "react";
import { menuData } from "./Stickynavbar";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";

const Menucomp = ({ isOpen, toggle }) => {
  const menus = menuData;
  return (
    <div
      className={`fixed transform ease-out duration-700 text-yellow-400 scrollbar-hide opacity-100 w-full object-cover overscroll-none h-screen bg-zinc-800 grid items-center 
      ${isOpen ? "top-0" : "-top-full"
      }  ${isOpen ? "z-[9999]" : "-z-50"} left-0`}
    >
      <div
        onClick={toggle}
        className="text-white text-2xl font-thin absolute top-4 right-5 bg-transparent outline-none cursor-pointer transition duration-500 hover:scale-150"
      >
        <FaTimes />
      </div>
      <div className="flex-wrap">
        <div className="grid grid-cols-1 text-2xl text-clampsize grid-rows-4 text-left pl-16  mx-auto transition ease-in-out duration-1000 mb-16 ">
          {menus.map((menu, index) => (
            <div key={index} className="row-span-1  mb-7">
              <Link
                className="w-1/4 text-left hover:underline no-underline hover:underline-offset-4 transition ease-in-out duration-500 hover:text-white  "
                href={menu.link}
              >
                {menu.title}
              </Link>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <div className="flex primary-button  w-fit h-fit border-0 cursor-pointer items-center font-semibold justify-center p-0 uppercase text-white bg-black transition duration-700 ease-in-out hover:bg-white hover:text-black">
            <Link href="/registr">Register to Get Involved</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menucomp;
