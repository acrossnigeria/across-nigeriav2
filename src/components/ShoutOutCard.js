import { useState, useEffect } from "react";
import image from '../../public/images/model/model1.jpg';
import Image from "next/image";


export default function ShoutOutCard() {

    const[isMobile, setIsMobile]=useState(false);
    useEffect(()=>{
      if(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)&&window.matchMedia("(max-width: 600px)").matches){
      setIsMobile(true)
    } else{setIsMobile(false)}
  // console.log(isMobile, navigator.userAgent)
    },[ isMobile ])

    return (
        <div className="h-[fit-content] py-[25px] px-[10px] w-[100%] bg-gradient-to-br hidden rounded-[5px] from-green-600 to-green-400">
            {/* <div className={`border-2 flex flex-row justify-center bg-clip-border border-yellow-400 ${isMobile?'h-[700px]':'h-[500px]'}`}>
                <div style={{alignItems:'center'}} className={`border-2 gap-3 flex justify-center bg-clip-border border-yellow-400 ${isMobile?'h-[725px] mt-[-16px] px-1 flex-col':'h-[530px] mt-[-17px] flex-row'} w-[95%]`}>
                    <div className={`${isMobile?'h-[50%] w-[97%]':'h-[470px] w-[340px]'} relative`}>
                        <Image placeholder="blur" className="rounded-[6px]" alt="shoutoutpic" layout="fill" objectFit="fill" src={image}></Image>
                    </div>
                    <div className={`${isMobile?'h-[fit-content] gap-2 max-h-[300px] w-[97%]':'h-[470px] w-[340px]'} p-2 flex justify-between flex-col rounded-[6px] bg-green-50`}>
                        <div className="flex flex-col">
                            <span className="text-[19px] font-bold text-green-900">A beauty & more </span>
                            <span className="text-[18px] italic">Shouting out to this beautifull model and also to say a happy birthday to her. </span>    
                        </div>
                        <span className="font-bold text-[16px] text-gray-500">
                            By Chris hameed
                        </span>
                     
                    </div>
                </div>
            </div> */}
          
        </div>
    )
}