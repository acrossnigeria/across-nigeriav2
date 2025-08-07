import Layout from '@/components/Layout';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Support from '../../../public/images/illustration/Support';
import Link from 'next/link';

function Index() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(()=>{
      if(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)&&window.matchMedia("(max-width: 600px)").matches){
      setIsMobile(true)
    } else{setIsMobile(false)}
  }, [ isMobile ] )

  return (
    <Layout>
      <div>
          <div className={`flex ${isMobile?'flex-col':'flex-row'} border-b-gray-300 border-b-1 h-[fit-content] justify-center ${isMobile?'':'px-[10%]'} py-[20px]`}>
            <div className={` border-black ${isMobile?'w-[90%]':'w-[35%]'} self-center flex flex-col h-[fit-content]`}>
                <span style={{lineHeight:'30px'}}  className={`font-extrabold ${isMobile?'text-[30px] mt-1':'text-[45px]'} text-pretty bg-gradient-to-tr from-green-400 to-green-800 bg-clip-text text-transparent`}>Get Noticed. Be Celebrated.</span> 
                <span className='mt-[10px] text-[18px] font-bold text-gray-600'>Want to be in the spotlight? Grab this opportunity to give or receive the ultimate shoutout! Perfect for celebrating milestones, sharing special messages, or promoting your brand.</span>
                <Link className={`${isMobile?'hidden':''}`} href={'/shoutout/booking '}><button className='bg-green-600 h-[60px] w-[250px] rounded-[30px] font-extrabold text-[25px] text-white mt-2 hover:bg-white border-green-600 hover:text-green-600 hover:border-1'>Book</button></Link>
            </div>
            <div className={`flex flex-row justify-center `}>
                <Support/>
            </div>
            <Link className={`${isMobile?'':'hidden'} mt-2 text-center`} href={'/shoutout/booking'}><button className='bg-green-600 h-[60px] w-[250px] rounded-[30px] font-extrabold text-[25px] text-white mt-2 hover:bg-white border-green-600 hover:text-green-600 hover:border-1'>Book</button></Link> 
          </div>
      </div>
    </Layout>
  );
}

export default Index;
