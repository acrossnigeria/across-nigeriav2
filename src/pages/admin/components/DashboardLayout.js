import Link from "next/link";
import AnIcon from "./graphics/AnIcon";
import Profile from "../../../public/images/icon/Profile";
import UsersIcon from "./graphics/UsersIcon";
import RandomIcon from "./graphics/RandomIcon";
import { useEffect, useState } from "react";
import HamIcon from "./graphics/HamIcon";
import Close from "../../../public/images/icon/Close";

const Container = ( { children, admin, page } ) => {
    const [ isMobile, setIsMobile ] = useState(false);
    const [ isHamOpen, setIsHamOpen ] = useState(false);

    useEffect(()=>{
      if(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)&&window.matchMedia("(max-width: 600px)").matches){
      setIsMobile(true)
    } else{setIsMobile(false)}
    // console.log(isMobile, navigator.userAgent)
    },[ isMobile ])

    return (
        <div className="bg-gray-800 text-white">
            <div className={`${isMobile?'px-[3%]':'px-[5%]'} flex h-[50px] flex-row justify-between items-center border-b-[#b4bedf] border-b-1`}>
                <span className="text-[22px] font-extrabold">ADMIN</span>
                <div style={{alignItems:'center'}} className="flex w-fit flex-row justify-between gap-2 h-[40px] pl-3 pr-[2px] cursor-pointer transition duration-100 text-[16px]">
                    <Link href={'/user/profile'}>Welcome, {admin?.name}</Link>
                    <Profile bg={'#b4bedf'}/>
                    <button onClick={()=>{setIsHamOpen(!isHamOpen)}} className={`${isMobile?'':'hidden'} ml-1 p-3 rounded-full hover:bg-gray-900`}>
                        {isHamOpen?<Close bg={"#b4bedf"}/>:<HamIcon/>}
                    </button>
                </div>
            </div>
           <main className="flex-row flex justify-between items-start">
            <div className={`${isMobile?`${isHamOpen?'':'hidden'} w-[80%] z-[5000] absolute top-[51px] right-0`:'w-[200px]'} text-[12px] bg-gray-800 pt-[15px] flex flex-col gap-2 h-screen`}>
                <Link href={'/admin/registered-users'}><button className={`${page==='users'?'bg-red-600':''} flex p-2 w-[100%] pl-3 hover:border-b-1 hover:border-b-[#b4bedf] hover:bg-gray-900 transition-background duration-1000 flex-row items-center gap-2`}><UsersIcon/> Users</button></Link>
                <Link href={'/admin'}><button className={`${page==='dashboard'?'bg-red-600':''} flex p-2 w-[100%] pl-3 hover:border-b-1 hover:border-b-[#b4bedf] hover:bg-gray-900 transition-background duration-1000 flex-row items-center gap-2`}><AnIcon/>Dashboard</button></Link>
                <Link href={'/admin/gqrs'}><button className={`${page==='gqrs'?'bg-red-600':''} flex p-2 w-[100%] pl-3 hover:border-b-1 hover:border-b-[#b4bedf] hover:bg-gray-900 transition-background duration-1000 flex-row items-center gap-2`}><RandomIcon/>GQ Random selector</button></Link>
                <Link href={'/admin/ambassador-stats'}><button className={`${page==='amb'?'bg-red-600':''} flex p-2 w-[100%] pl-3 hover:border-b-1 hover:border-b-[#b4bedf] hover:bg-gray-900 transition-background duration-1000 flex-row items-center gap-2`}><RandomIcon/>Ambassador Stats</button></Link>
                <Link href={'/admin/quiz_show_stats'}><button className={`${page==='qs'?'bg-red-600':''} flex p-2 w-[100%] pl-3 hover:border-b-1 hover:border-b-[#b4bedf] hover:bg-gray-900 transition-background duration-1000 flex-row items-center gap-2`}><RandomIcon/>Quiz show Stats</button></Link>
            </div>
            <div className="w-[100%] h-fit min-h-screen overflow-y-scroll bg-gray-200 text-gray-700">
                {children}
            </div>
            </main>
        </div>
    )
}

export default Container;