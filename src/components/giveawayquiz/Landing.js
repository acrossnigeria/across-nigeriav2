import React from 'react'
import { useEffect, useState } from 'react';
import image1 from "../../../public/images/giveaway_quizzes.jpg";
import Link from 'next/link';
import Image from 'next/image';
import AddAccDetails from '../notifiers/AddAccountDetails';
import { useSession } from 'next-auth/react';

function Landing() {
  const [ isMobile, setIsMobile ] = useState(false);

  const { data:session } = useSession();

  useEffect(()=>{
    if(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)&&window.matchMedia("(max-width: 600px)").matches){ 
    setIsMobile(true)
  } else{setIsMobile(false)}
// console.log(isMobile, navigator.userAgent)
  },[ isMobile ])

  return (
    <>
        <div className={`pb-[50px]`}>
            <div className={`border-b-[0.5px] border-green-600 flex ${isMobile?'flex-col':'flex-row'} h-[fit-content] justify-center ${isMobile?'':'px-[10%]'} py-[20px]`}>
                <div className={` border-black ${isMobile?'w-[90%]':'w-[40%]'} self-center flex flex-col h-[fit-content] mb-[15px]`}>
                    <span style={{lineHeight:(isMobile?'25px':'35px')}} className={`font-extrabold ${isMobile?'text-[25px] text-center':'text-[37px]'} text-pretty bg-gradient-to-bl from-green-400 to-green-700 bg-clip-text text-transparent`}>&#8358;1 million naira to be shared by 100 lucky winners with the correct answer. </span> 
                    <span style={{lineHeight:'19px'}} className={`${isMobile?'text-center':'text-[20px]'} text-gray-600 font-bold mt-2`} >Play with &#8358;100 and you could win &#8358;10,000</span>
                </div>
                <div style={{height:(isMobile?'200px':'400px')}} className={`${isMobile?'w-[98%] left-[1%]':'w-[60%]'} relative`}>
                    <Image className="bg-gray-300" style={{borderRadius:'22px'}} alt='banner' layout="fill" objectFit="fill" src={image1}/>
                </div> 
            </div>
            <div id="how" className={`mt-[15px] text-center ${isMobile?'text-[22px] w-[90%] ml-[5%]':'text-[30px] w-[100%]'}`} >
                <span style={{lineHeight:'10px'}} className={` text-green-600 font-bold tracking-wider`}>Welcome to the Ultimate Giveaway Quiz </span> 
            </div>
            <div className={`text-center text-gray-800 mb-[20px] text-[20px] ${isMobile?'w-[90%] ml-[5%]':'w-[60%] mt-4 ml-[20%]'}`}>
                <span>Think you&apos;ve got what it takes to win big? Here&apos;s your chance to play, have fun, and walk away with  cash prizes, Let&apos;s break it down for you</span>
            </div>
            <div className="text-center mt-5" >
                <span className="w-[50%] text-[25px] pb-[5px] border-green-600 text-center text-green-700 font-bold tracking-wider">How to Join the Fun</span> 
            </div>
            <div className={`${isMobile?'w-[90%] ml-[5%]':'w-[60%] ml-[20%]'} mt-[25px]`}>
                <div className="flex flex-row justify-evenly mt-[20px]">
                    <span style={{borderRadius:'50%'}} className="text-[25px] h-[fit-content] bg-gradient-to-br from-yellow-500 to-orange-500 px-[15px] py-[5px] text-white text-center font-extrabold tracking-wider">1</span> 
                    <div style={{borderTopRightRadius:'25px', borderBottomRightRadius:'25px', borderBottomLeftRadius:'25px'}} className={`border-1 border-gray-800 ${isMobile?'w-[70%] text-[17px]':'text-[20px]'} max-w-[600px] text-gray-800 p-[10px]`}>
                        <span>Entry fee? just &#8358;100! That&apos;s right. For just &#8358;100, you can dive into the excitement. Answer the question in the quiz. You can play as much as you like. Each play costs &#8358;100</span>
                    </div>
                </div>
                <div className="flex flex-row justify-evenly mt-[20px]">
                    <div style={{borderTopLeftRadius:'25px', borderBottomLeftRadius:'25px', borderBottomRightRadius:'25px'}} className={`border-1 border-gray-800 ${isMobile?'w-[70%] text-[17px]':'text-[20px]'} max-w-[600px] text-gray-800 p-[10px]`}>
                        <span>At the end of each month, we reveal our lucky winners. The more you play, the higher your chances of winning. each play could bring you closer to victory. will you be the next name in our list?</span>
                    </div>
                    <span style={{borderRadius:'50%'}} className="text-[25px] h-[fit-content] bg-gradient-to-br from-yellow-500 to-orange-500 px-[15px] py-[5px] text-white text-center font-extrabold tracking-wider">2</span> 
                </div>
                <div className="flex flex-row justify-evenly mt-[20px]">
                    <span style={{borderRadius:'50%'}} className="text-[25px] h-[fit-content] bg-gradient-to-br from-yellow-500 to-orange-500 px-[15px] py-[5px] text-white text-center font-extrabold tracking-wider">3</span> 
                    <div style={{borderTopRightRadius:'25px', borderBottomRightRadius:'25px', borderBottomLeftRadius:'25px'}} className={`border-1 border-gray-800 ${isMobile?'w-[70%] text-[17px]':'text-[20px]'} max-w-[600px] text-gray-800 p-[10px]`}>
                        <span>Get ready to win big! A total of 100 winners will share an incredible pot cash prize of 1 million Naira, with each winner taking home &#8358;10,000 Naira in cash! And the best part? Your chance to win starts at just &#8358;100. Remember, the more you play, the better your chance</span>
                    </div>
                </div>
                <div className="mt-[30px] border-t-1 border-green-700 pt-[10px] flex flex-col text-center gap-2">
                    <Link href={'/termsAndCondition'}>
                        <span style={{textDecoration:'underline'}} className="text-center text-blue-700 w-full"> See Terms and conditions</span>
                    </Link>
                    <span>T & C&apos;s apply: By clicking play you agree to the Terms and Conditions</span>
                    <Link href="/giveaway-quiz/quizSession"><button style={{alignSelf:'center', borderRadius:'20px'}} className="bg-green-700 w-[100%] hover:text-green-700 hover:bg-transparent hover:border-2 hover:border-green-700 text-white font-bold py-[7px] text-[25px]">Play</button></Link>
                </div>
            </div>    
           
        </div>
        <AddAccDetails userId={session?.user?._id} />
    </>
  )
}


export default Landing;