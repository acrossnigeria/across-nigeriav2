
// components/Navbar.js
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import logo from "../../public/images/logo1.png";
import SearchIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Search from '../../public/images/icon/Search';



export const menuData = [
  { title: "About", link: "/about" },
  { title: "Skits", link: "/skitsPage" },
  { title: "Contact-Us", link: "/contact" },
];
const StickyNavbar = () => {
  const { status, data: session } = useSession();

  const[open,setOpen]=useState(false)
const toggleMenu=()=>{
  setOpen(!open);}
  const router=useRouter();
  const [query, setQuery] = useState("");

  const logoutClickHandler = () => {
  
  signOut({ callbackUrl: `/account/login` });
  
  };


  const submitHandler = (e) => {
    e.preventDefault();
    console.log(query);
  };
 

  return (
    <header id="top" className={`top-0 w-full  z-[9999] overflow-x-hidden px-0`}>
      <nav style={{height:'fit-content', display:'flex', justifyContent:'space-between', paddingTop:'15px', paddingLeft:'4%', paddingRight:'4%', paddingBottom:'10px', borderBottomLeftRadius:'10px', borderBottomRightRadius:'10px'}} className={`w-full pt-3 top-0 left-0 right-0 py-0 bg-green-600 text-white px-1`}>
          <div style={{height:'fit-content', display:'flex', justifyContent:'space-between', alignItems:'center', gap:'1.5rem'}}>
            <Link href="/" legacyBehavior>
                <Image src={logo} alt="Logo" className="h-[60px] w-[60px]" placeholder="blur"/>
            </Link>
            <div className="flex flex-row gap-[2rem]">
              <Link href={'/'}>
                  <div className="flex font-mono text-[17px] font-extrabold hover:text-green-400">
                    Home
                  </div>
              </Link>
               { session?.user? (<Link href={'/user/profile'}>
                                      <div className="flex font-mono text-[17px] font-extrabold hover:text-green-400">
                                        Profile
                                      </div>
                                  </Link>):('') }
              <Link href={'/giveaway'}>
                  <div className="flex font-mono text-[17px] font-extrabold hover:text-green-400">
                    Giveaway-quiz
                  </div>
              </Link>
              <Link href={'/shoutout/booking'}>
                  <div className="flex font-mono text-[17px] font-extrabold hover:text-green-400">
                    Shout-out
                  </div>
              </Link>
              <Link href={'/about'}>
                  <div className="flex font-mono text-[17px] font-extrabold hover:text-green-400">
                    About
                  </div>
              </Link>
            </div>
          </div>
            {/* Menu content */}
          <div style={{alignItems:'center'}} className="text-white flex cursor-pointer w-auto gap-[2rem]">
            <div className="bg-gray-50" style={{height:'35px', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0px 10px', borderRadius:'15px'}} >
                <input type="text"placeholder="Search..."
                  style={{fontSize:'16px', borderRadius:'10px', background:'transparent'}}
                  className=" focus:outline-none text-green-800"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)} />
                <Search/>
              </div>
          
            { session?.user ? (
              <div className={`flex-1 top-0 w-[fit-content] p-1 h-9 cursor-pointer items-center font-semibold justify-center uppercase text-white border-2 border-green-600  transition duration-100  rounded-lg text-[10px]`}>
                <div className="flex justify-center w-full" onClick={toggleMenu}>{session.user.name}</div>
                  { open && (
                    <div className="fixed block top-12 flex-1 mr-3 w-16 origin-top-right bg-green-600 text-[8px] lg:text-sm divide-y divide-gray-100 rounded-md shadow-lg ring-1ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      <div className="py-1 flex" role="none">
                        <a onClick={logoutClickHandler} className="text-gray-700 block px-3" role="menuitem">LogOut</a>
                      </div>
                      <div className="py-2 flex" role="none">
                        <a onClick={()=>(router.push("/user/profile"))} className="text-gray-700 block px-6 " role="menuitem">Profile</a>
                      </div>
                    </div>) }
              </div>
            ) : (
              <div style={{height:'fit-content', display:'flex', justifyContent:'space-between', alignItems:'center', gap:'1rem'}} >
                <div className="flex  w-[100px] px-4 py-2 cursor-pointer items-center font-bold justify-center uppercase text-white transition duration-100  rounded-lg text-[12px]
                ease-in-out hover:scale-125" >
                  <Link href="/account/reg" className="cursor-pointer" legacyBehavior>
                    <a>Register</a>
                  </Link>
                </div>
                <div className="flex  w-[100px] px-4 py-2 cursor-pointer items-center font-bold justify-center uppercase text-white  bg-yellow-400 transition duration-100  rounded-[30px] text-[12px]
                ease-in-out hover:border-white hover:py-1 hover:bg-transparent hover:border-2" >
                  <Link href="/account/login" className="cursor-pointer" legacyBehavior>
                    <a>Login</a>
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
