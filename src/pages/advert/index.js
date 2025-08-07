import { useEffect, useState } from "react";
import Next from "../../../public/images/icon/Next";
import { useRouter } from "next/router";
import CycleLoader from "@/components/CycleLoader";
import { useSession } from "next-auth/react";
import Image from "next/image";
import adIllust from "../../../public/images/illustration/adIllust.svg";
import axios from "axios";

const Page = () => {
    const router = useRouter();
    const { data:session } = useSession();

    const getStarted = () => {
        router.push('/advert/place');
    }


    return (
        <div className="pt-[2%] bg-gray-100 flex flex-col">
            <div className="pl-[3%] text-[18px] w-[100%]">
                <button onClick={()=>{router.push('/')}} className="w-fit flex flex-row items-center transition-all duration-500 ease-in-out hover:scale-105 gap-2"><div className="rotate-180"><Next bg={'black'} size={'20px'}/></div>Back home</button>
            </div>
            <div className="md:w-[50%] md:ml-[25%] pl-[3%] md:mt-0 mt-[25px] flex flex-col text-center text-[18px] w-[94%]">
                <span style={{lineHeight:'20px'}} className="text-[19px] font-extrabold">Promote Your Brand on Across Nigeria</span>
                <span style={{lineHeight:'20px'}} className="mt-[11px]">Get your image banner in front of thousands of viewers nationwide. </span>
            </div>
            <div  className="flex md:w-[50%] md:ml-[25%] md:flex-row mt-[35px] justify-center items-center flex-col">
                <div className={`relative md:h-[280px] md:w-[50%]  w-[100%] h-[200px]`}>
                    <Image style={{borderRadius:'22px'}} alt='banner' layout="fill" objectFit="fill" src={adIllust}/>
                </div> 
                <div style={{lineHeight:'21px'}} className="h-fit w-[94%] md:w-[50%] flex flex-col justify-center md:text-left text-center md:mt-0 mt-[30px] md:items-start items-center"> 
                    <span className="w-full text-orange-500 text-[17px] font-bold">Choose from affordable</span> 
                    <span className="w-full text-orange-500 text-[17px] font-bold">ad spots that fit your</span> 
                    <span className="bg-orange-500 text-white w-fit p-1 px-3 mt-[5px] text-[17px] font-extrabold rounded-br-[20px] rounded-tl-[20px]">brand and budget.</span>
                    <button onClick={getStarted} className={`bg-green-500 mt-[25px] hover:bg-green-700 hover:scale-105 border-1 h-[45px] md:w-[60%] border-black w-[100%] text-white transition-all duration-500 ease-in-out rounded-[30px]`}>Get started</button>
                </div>
            </div>
            <div className="md:w-[50%] bg-white rounded-[35px] py-[30px] border-[0.5px] border-gray-400 flex flex-col justify-center items-start px-[4%] md:ml-[25%] mt-[80px]">
                <span className="font-extrabold">Adverts types Overview</span>
                <div className="px-[5%] flex flex-col">
                    <div className="mt-[10px] flex flex-col items-start justify-center">
                        <span className="font-bold">1. Diamond Adverts</span>
                        <div className="px-[5%] flex flex-col text-[16px] items-start justify-center">
                            <span>• Top scroll bar visibility</span>
                            <span>• Premium exposure</span>
                            <span>• N1,000/day, N5,000/week, N20,000/month</span>
                        </div>
                    </div>
                    <div className="mt-[10px] flex flex-col items-start justify-center">
                        <span className="font-bold">2. Gold & Silver Adverts</span>
                        <div className="px-[5%] flex flex-col text-[16px] items-start justify-center">
                            <span>• Static & Scrolling options</span>
                            <span>• Mid-page visibility</span>
                            <span>• From N100/day</span>
                        </div>
                    </div>
                    <div className="mt-[10px] flex flex-col items-start justify-center">
                        <span className="font-bold">3. Bronze Adverts</span>
                        <div className="px-[5%] flex flex-col text-[16px] items-start justify-center">
                            <span>• Budget-friendly</span>
                            <span>• Monthly plan only</span>
                            <span>• Static banner slots</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-[40px] md:w-[50%] px-[3%] flex flex-col md:ml-[25%] mb-[70px]">
                <div className="flex flex-col items-start justify-center">
                    <span className="font-extrabold text-green-500">Why advertise with us?</span>
                    <div className="px-[5%] flex flex-col text-[16px] items-start justify-center">
                        <span>• Seen by fast growing nation wide audience.</span>
                        <span>• Easy setup – upload, pay, and go live</span>
                        <span>• Optional call-to-action button on your ad</span>
                        <span>• Affordable pricing from just ₦100/day</span>
                    </div>
                </div>
                <div style={{lineHeight:'21px'}} className="h-fit p-4 pb-[30px] flex bg-gradient-to-br from-green-500 to-orange-500 rounded-[15px] w-[100%] flex-col justify-center md:text-left text-center mt-[30px] md:items-start items-center"> 
                    <span className="w-full text-white text-[17px] font-bold">Choose your advert level, upload your banner, and go live in minutes!</span>  
                    <button onClick={getStarted} className={`bg-transparent border-1 px-[25px] border-white mt-[10px] hover:bg-green-700 hover:scale-105 h-[45px] md:w-[50%] w-fit text-white transition-all duration-500 ease-in-out rounded-[30px]`}>Get started</button>
                </div>
            </div>
        </div>
    )
}
Page.auth = true;
export default Page;