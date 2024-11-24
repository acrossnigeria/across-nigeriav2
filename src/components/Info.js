
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

const Info = ()=>{
    const { status, data: session } = useSession();
  const data={
  paragraph: ` We offer a variety of giveaways, game show and reality shows that
            cater to different tastes and interests. Whether you want to win
            amazing prizes, test your skills and knowledge about Nigeria, or
            watch captivating stories unfold, we have something to entertain and
            put a smile on everyone’s face.`,
  reversed:true
    };
  return (
      <div className="relative h-full wfull  grid grid-cols-1 top-0 border-b-1 pb-4 px-1 border-b-gray">
        
         <div className="flex lg:w-full  w-full font-bold text-6xl 
          right-0 pt-4  text-pretty">
        <span style={{}} className="w-full bg-clip-text bg-gradient-to-tr from-green-700 text-transparent to-green-400 font-extrabold tracking-wider">HOWFA?</span> 
        </div>
            <p className="font-semibold text-left mt-4 text-xl mb-4 text-gray-700">{data.paragraph}</p>
       
          <Link style={{ display:( session?.user? 'none': 'block'), width:'fit-content', padding:'8px 15px', color: "white", fontSize:'18px', borderRadius:'17px', borderBottomRightRadius:'50px'}}
        className="w-full font-bold tracking-wider bg-gradient-to-br from-green-800 to-green-500 hover:opacity-70" href="/account/reg">
          {"Register to get Involved"}
          </Link>
   <div style={{gap:'10px'}} className="text-8xl mt-6 mb-6 mx-auto rounded-md justify-between flex">
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
