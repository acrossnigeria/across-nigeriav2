import Link from "next/link";
import AnIcon from "./graphics/AnIcon";
import Profile from "../../../public/images/icon/Profile";
import { useSession } from "next-auth/react";
import UsersIcon from "./graphics/UsersIcon";
import RandomIcon from "./graphics/RandomIcon";
import { useEffect, useState } from "react";
import HamIcon from "./graphics/HamIcon";
import Close from "../../../public/images/icon/Close";

const Container = ( { children } ) => {
    const { data: session } = useSession();
    const [ isMobile, setIsMobile ] = useState(false);
    const [ isHamOpen, setIsHamOpen ] = useState(false);

    useEffect(()=>{
      if(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)&&window.matchMedia("(max-width: 600px)").matches){
      setIsMobile(true)
    } else{setIsMobile(false)}
    // console.log(isMobile, navigator.userAgent)
    },[ isMobile ])

    return (
        <div className="bg-gray-800 text-[#b4bedf]">
            <div className={`${isMobile?'px-[3%]':'px-[5%]'} flex h-[70px] flex-row justify-between items-center border-b-[#b4bedf] border-b-1`}>
                <span className="text-[25px] font-extrabold">ADMIN</span>
                <div style={{alignItems:'center'}} className="flex w-fit flex-row justify-between gap-2 h-[40px] pl-3 pr-[2px] cursor-pointer transition duration-100 text-[16px]">
                    <Link href={'/user/profile'}>Welcome, alimam</Link>
                    <Profile bg={'#b4bedf'}/>
                    <button onClick={()=>{setIsHamOpen(!isHamOpen)}} className={`${isMobile?'':'hidden'} ml-1 p-3 rounded-full hover:bg-gray-900`}>
                        {isHamOpen?<Close bg={"#b4bedf"}/>:<HamIcon/>}
                    </button>
                </div>
            </div>
           <main className="flex-row flex justify-between items-start">
            <div className={`${isMobile?`${isHamOpen?'':'hidden'} absolute top-[70px] right-0`:''} bg-gray-800 w-[250px] pl-[14px] text-[13px] pt-[15px] flex flex-col gap-2 h-screen`}>
                <Link href={'/admin/registered-users'}><button className="flex p-2 rounded-tl-[30px] rounded-bl-[30px] w-[100%] hover:border-b-1 hover:border-b-[#b4bedf] hover:bg-gray-900 transition-background duration-1000 flex-row items-center gap-2"><UsersIcon/> Users</button></Link>
                <Link href={'/admin/dashboard'}><button className="flex p-2 rounded-tl-[30px] rounded-bl-[30px] w-[100%] hover:border-b-1 hover:border-b-[#b4bedf] hover:bg-gray-900 transition-background duration-1000 flex-row items-center gap-2"><AnIcon/>Dashboard</button></Link>
                <Link href={'/admin/giveaway-quiz-random-selector'}><button className="flex p-2 rounded-tl-[30px] rounded-bl-[30px] w-[100%] hover:border-b-1 hover:border-b-[#b4bedf] hover:bg-gray-900 transition-background duration-1000 flex-row items-center gap-2"><RandomIcon/>GQ Random selector</button></Link>
            </div>
            <div className="w-[100%] h-screen bg-gray-200 text-gray-700">
                {children}
            </div>
            </main>
        </div>
    )
}

export default Container;