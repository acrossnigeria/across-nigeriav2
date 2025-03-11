
import Link from "next/link";
import React from "react";
import { SocialIcon } from 'react-social-icons'
import tiktok from "../../public/images/soc_media/icons8-tiktok-188.png";
import youtube from "../../public/images/soc_media/icons8-youtube-188.png";
import linkedin from "../../public/images/soc_media/icons8-linkedin-188.png";
import instagram from "../../public/images/soc_media/icons8-instagram-94.png";
import facebook from "../../public/images/soc_media/icons8-facebook-144.png";
import x from "../../public/images/soc_media/icons8-x-240.png";
import whatsapp  from "../../public/images/soc_media/icons8-whatsapp.gif";
import telegram from "../../public/images/soc_media/icons8-telegram.gif";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import Next from "../../public/images/icon/Next";

const Info = () => {
  const [isMobile, setIsMobile]=useState(false);
  useEffect(()=>{
    if(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)&&window.matchMedia("(max-width: 600px)").matches){
    setIsMobile(true)
  } else{setIsMobile(false)}
// console.log(isMobile, navigator.userAgent)
  },[ isMobile ])

  const { status, data: session } = useSession();
  const data={
      paragraph: ` We offer a variety of giveaways, game show and reality shows that
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
    <div className="relative h-full  grid grid-cols-1 top-0 border-b-1 pb-1 px-3 border-b-gray">
        
      <div className="flex lg:w-full  w-full text-[35px] md:text-[50px] right-0   text-pretty">
        <span className="w-full bg-clip-text bg-gradient-to-tr from-green-600 text-transparent to-green-200 font-bold tracking-wider">HOWFA?</span> 
      </div>
      <p className="text-left text-[17px] mt-[4px] mb-[30px] text-gray-800">{data.paragraph2}</p>
      <Link  href="/account/reg" style={{ display:( session?.user? 'none': 'flex')}} className="w-[100%] md:w-[300px] text-[18px] text-white rounded-[30px] gap-2 h-[45px] flex-row justify-center items-center bg-green-500 hover:bg-green-600">
          <span>
            Register Now
          </span>
          <Next size={'15px'} bg={'white'}/>
      </Link> 
      
      <div style={{gap:'10px'}} className="text-8xl mt-[30px] mb-1 mx-auto rounded-md justify-between flex">
          <Link href=''>
            <Image  quality={100}  className="cursor-pointer" src={facebook} height={20} width={30} alt="facebook"/>
          </Link>
          <Link href='https://www.facebook.com/profile.php?id=61560087734551'> 
            <Image  quality={100}  className="cursor-pointer" src={x} height={20} width={30} alt="tiktok"/>  
          </Link>
          <Link href='https://t.me/+2349040440983'>
            <Image  quality={100}  className="cursor-pointer" src={telegram} height={20} width={30} alt="telegram"/>
          </Link>
          <Link href='https://wa.me/+2349040440983'>
            <Image  quality={100}  className="cursor-pointer" src={whatsapp} height={20} width={30} alt="tiktok"/>
          </Link>
          <Link href="https://www.tiktok.com/@across_nigeria_show">
            <Image  quality={100}  className="cursor-pointer" src={tiktok} height={20} width={30} alt="tiktok"/>
          </Link>
          <Link href='https://www.instagram.com/across_nigeria_reality_show?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='>
            <Image quality={100} className="cursor-pointer"  src={instagram} height={20} width={30} alt="Instagram"/>
          </Link>
          <Link href=''>
            <Image  quality={100} className="cursor-pointer" src={youtube} height={20} width={30} alt="youtube"/>
          </Link>
          <Link href=''>
            <Image  quality={100} className="cursor-pointer" src={linkedin} height={20} width={30} alt="linkedin"/>
          </Link>
            
      </div>
        
    </div>

 
  );
};

export default Info;
