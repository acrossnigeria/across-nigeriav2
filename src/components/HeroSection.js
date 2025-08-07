
import Link from "next/link";
import React from "react";
import tiktok from "../../public/images/soc_media/tiktok-logo-logo-svgrepo-com.svg";
import youtube from "../../public/images/soc_media/youtube-svgrepo-com.svg";
import instagram from "../../public/images/soc_media/instagram-svgrepo-com.svg";
import facebook from "../../public/images/soc_media/facebook-svgrepo-com.svg";
import x from "../../public/images/soc_media/icons8-x-240.png";
import whatsapp  from "../../public/images/soc_media/whatsapp-svgrepo-com.svg";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import SlideBanner from "./SlideBanner";

const HeroSection = ( { isLoading, adverts }) => {
  const [isMobile, setIsMobile]=useState(false);
  useEffect(()=>{
    if(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)&&window.matchMedia("(max-width: 600px)").matches){
    setIsMobile(true)
  } else{setIsMobile(false)}
// console.log(isMobile, navigator.userAgent)
  },[ isMobile ])

  const { status, data: session } = useSession();
  const data={
      paragraph: `Across Nigeria Reality Show offer's a variety of giveaways, game show and reality shows that
                cater to different tastes and interests. Whether you want to win
                amazing prizes, test your skills and knowledge about Nigeria, or
                watch captivating stories unfold, we have something to entertain and
                put a smile on everyone’s face.`,
      paragraph2: `We provide a wide range of giveaways, game shows, and reality shows
                designed to suit diverse tastes and interests. Whether you're looking 
                to win incredible prizes, challenge your knowledge and skills about
                Nigeria, or enjoy captivating stories, we have something to entertain 
                and bring joy to everyone`,
      reversed:true
    };
  return (
    <div className="relative md:h-[85vh] md:border-t-1 bg-gradient-to-b from-white to-gray-200 md:border-gray-200 md:px-[5%] md:gap-[2.5%] md:py-[4%] pb-[5%] flex md:flex-row flex-col-reverse top-0  border-b-gray">
      <div className="md:w-[38%] p-3 flex flex-col md:text-left text-center md:mt-0 mt-5 items-start h-full">
        <span className="w-full text-green-600 leading-tight md:text-5xl text-3xl font-bold md:font-semibold ">Adventure of a lifetime</span> 
        <p className="md:text-[16px] text-[17px] mt-3 leading-tight text-gray-800">{data.paragraph2}</p>
        <Link  href="/account/reg" style={{ display:( session?.user? 'none': 'flex')}} className="w-[100%] md:mt-5 mt-6 md:w-[300px] text-[18px] text-white rounded-[30px] gap-2 h-[45px] flex-row transition-all duration-200 justify-center items-center bg-green-500 hover:bg-green-700">
            <span> Register Now </span>
        </Link>
        
        <div style={{gap:'10px'}} className=" border-1 flex-col gap-2 bg-gray-100 rounded-[10px] shadow-md md:w-[300px] w-[100%] border-gray-300 p-3 mt-6 md:justify-start justify-center items-center flex">
            <span className="text-gray-900 text-[20px]">Follow us</span>
            <div className="flex flex-row gap-2">
              <Link href=''>
                <Image  quality={100}  className="cursor-pointer" src={facebook} height={20} width={35} alt="facebook"/>
              </Link>
              <Link href='https://www.facebook.com/profile.php?id=61560087734551'> 
                <Image  quality={100}  className="cursor-pointer" src={x} height={20} width={35} alt="tiktok"/>  
              </Link>
              <Link href='https://wa.me/+2349040440983'>
                <Image  quality={100}  className="cursor-pointer" src={whatsapp} height={20} width={35} alt="tiktok"/>
              </Link>
              <Link href="https://www.tiktok.com/@across_nigeria_show">
                <Image  quality={100}  className="cursor-pointer" src={tiktok} height={20} width={35} alt="tiktok"/>
              </Link>
              <Link href='https://www.instagram.com/across_nigeria_reality_show?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='>
                <Image quality={100} className="cursor-pointer"  src={instagram} height={20} width={35} alt="Instagram"/>
              </Link>
              <Link href=''>
                <Image  quality={100} className="cursor-pointer" src={youtube} height={20} width={35} alt="youtube"/>
              </Link> 
            </div>    
        </div>
      </div>

      <div className="md:w-[60%]">
        <SlideBanner className={'w-full'} isLoading={isLoading} adverts={adverts} />
      </div>
        
    </div>

 
  );
};

export default HeroSection;
