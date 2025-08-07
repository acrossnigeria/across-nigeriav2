import Layout from '@/components/Layout';
import React, { useEffect, useState } from 'react';
import image1 from '../../../public/images/king_and_queen.jpg';
import axios from 'axios';
import Image from 'next/image';

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
          <div className={`border-b-[0.5px] border-green-600 flex ${isMobile?'flex-col':'flex-row'} h-[fit-content] justify-center ${isMobile?'':'px-[10%]'} py-[20px]`}>
            <div className={` border-black ${isMobile?'w-[90%]':'w-[40%]'} self-center flex flex-col h-[fit-content]`}>
                <span style={{lineHeight:(isMobile?'30px':'45px')}} className={`font-extrabold ${isMobile?'text-[30px] text-center':'text-[45px]'} text-pretty text-yellow-400`}>
                <span className="text-orange-600">A <span className='bg-gradient-to-tr to-orange-600 from-yellow-300 bg-clip-text text-transparent'>King</span> & <span className='bg-gradient-to-tr from-orange-600 to-yellow-300 bg-clip-text text-transparent'>Queen</span> will emerge victorious,</span> each winning up to <span className="bg-gradient-to-tr from-green-400 to-green-800 bg-clip-text text-transparent">₦40 Million</span> & SUV!</span> 
            </div>
            <div style={{height:(isMobile?'200px':'400px')}} className={`${isMobile?'w-[98%] left-[1%]':'w-[60%]'} relative`}>
                <Image className="bg-gray-300" style={{borderRadius:'22px'}} alt='banner' layout="fill" objectFit="fill" src={image1}/>
            </div> 
          </div>
      </div>
    </Layout>
  );
}

export default Index;
