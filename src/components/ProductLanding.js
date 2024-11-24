import Image from "next/image";
import image1 from "../../public/images/giveaway_quiz.jpg";
import { useState, useEffect } from "react";
import { Link } from "@nextui-org/react";

export default function ProductLanding( { startGame, isPlay }) {
    const[isMobile, setIsMobile]=useState(false);
    function play() {
        startGame('');
        console.log(isPlay);
    }
    useEffect(()=>{
      if(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)&&window.matchMedia("(max-width: 600px)").matches){
      setIsMobile(true)
    } else{setIsMobile(false)}
  // console.log(isMobile, navigator.userAgent)
    },[ isMobile ])

    return (
        <div className={`pb-[50px] ${isPlay===''?'hidden':''}`}>
            <div style={{borderBottomLeftRadius:'25px', borderBottomRightRadius:'25px'}} className={`border-b-[0.5px] border-green-500 flex ${isMobile?'flex-col':'flex-row'} h-[fit-content] justify-center ${isMobile?'':'px-[10%]'} py-[20px]`}>
                <div style={{alignSelf:'center', height:'fit-content'}} className={` border-black ${isMobile?'w-[90%]':'w-[40%]'} h-[300px] flex flex-col`}>
                    <span style={{lineHeight:(isMobile?'30px':'50px')}} className={`font-extrabold ${isMobile?'text-[30px] text-center':'text-[50px]'} text-pretty text-yellow-400`}>Upto 100,000&#8358; up for grabs! <span className="text-orange-600">& more</span></span> 
                    <a style={{marginTop:(isMobile?'20px':'35px'), marginBottom:(isMobile?'10px':'0px'), alignSelf:(isMobile?'center':'left'), borderRadius:'25px'}} className={`text-white bg-purple-900 w-[fit-content] px-[20px] py-[2px] ${isMobile?'text-[20px]':'text-[25px]'} font-semibold`} href="#how" >Explore</a>
                </div>
                <div style={{height:(isMobile?'280px':'400px')}} className={`${isMobile?'w-[90%] left-[5%]':'w-[60%]'} relative`}>
                    <Image className="bg-gray-300" style={{borderRadius:'22px'}} alt='banner' layout="fill" objectFit="fill" src={image1}/>
                </div> 
            </div>
            <div id="how" className="text-center mt-10" >
                <span style={{lineHeight:'30px'}} className={`w-[100%] text-green-600 ${isMobile?'text-[25px]':'text-[30px]'} text-center font-extrabold tracking-wider`}>Welcome to the Ultimate Giveaway Quiz 🎉</span> 
            </div>
            <div style={{borderRadius:'15px'}} className={` mt-4 text-gray-500 text-[20px] ${isMobile?'w-[90%] ml-[5%] text-center':'w-[60%] ml-[20%]'} p-[15px]`}>
                <span>Think you&apos;ve got what it takes to win big? Here&apos;s your chance to play, have fun, and walk away with incredible prizes, Let&apos;s break it down for you</span>
            </div>
            <div className="text-center mt-5" >
                <span style={{lineHeight:'25px'}} className="w-[50%] text-[25px] text-center text-purple-800 font-bold tracking-wider">How to Join the Fun</span> 
            </div>
            <div className={`${isMobile?'w-[90%] ml-[5%]':'w-[60%] ml-[20%]'} mt-[25px]`}>
                <div className="flex flex-row justify-evenly mt-[20px]">
                    <span style={{borderRadius:'50%'}} className="text-[25px] h-[fit-content] bg-yellow-400 px-[15px] py-[5px] text-white text-center font-extrabold tracking-wider">1</span> 
                    <div style={{borderTopRightRadius:'15px', borderBottomRightRadius:'15px', borderBottomLeftRadius:'15px'}} className={`bg-gray-100 ${isMobile?'w-[70%] text-[17px]':'text-[20px]'} max-w-[600px] text-purple-800 p-[10px]`}>
                        <span>Entry fee? just 100&#8358;! That&apos;s right. For just 100&#8358;, you can dive into the excitement. Answer a single question in each quiz. you can play as much as you like. each play costs 100&#8358;</span>
                    </div>
                </div>
                <div className="flex flex-row justify-evenly mt-[20px]">
                    <div style={{borderTopLeftRadius:'15px', borderBottomLeftRadius:'15px', borderBottomRightRadius:'15px'}} className={`bg-gray-100 ${isMobile?'w-[70%] text-[17px]':'text-[20px]'} max-w-[600px] text-purple-800 p-[10px]`}>
                        <span>At the end of each month, we reveal our lucky winners. The more you play, the higher your chances of winning. each play could bring you closer to victory. will you be the next name in our list?</span>
                    </div>
                    <span style={{borderRadius:'50%'}} className="text-[25px] h-[fit-content] bg-yellow-400 px-[15px] py-[5px] text-white text-center font-extrabold tracking-wider">2</span> 
                </div>
                <div className="flex flex-row justify-evenly mt-[20px]">
                    <span style={{borderRadius:'50%'}} className="text-[25px] h-[fit-content] bg-yellow-400 px-[15px] py-[5px] text-white text-center font-extrabold tracking-wider">3</span> 
                    <div style={{borderTopRightRadius:'15px', borderBottomRightRadius:'15px', borderBottomLeftRadius:'15px'}} className={`bg-gray-100 ${isMobile?'w-[70%] text-[17px]':'text-[20px]'} max-w-[600px] text-purple-800 p-[10px]`}>
                        <span>Winners can claim up to one million naira in cash prizes! Yes, you heard that right. A chance to win big for just 100 naira. Remember More plays = Better Odds</span>
                    </div>
                </div>
                <div className="mt-[30px] border-t-1 border-green-300 pt-[10px] flex flex-col text-center gap-2">
                    <Link href={'/termsAndCondition'}>
                        <span style={{textDecoration:'underline'}} className="text-center text-blue-700 w-full"> See Terms and conditions</span>
                    </Link>
                    <span>T & C&apos;s apply: By clicking play you agree to the Terms and Conditions</span>
                    <button onClick={play} style={{alignSelf:'center', borderRadius:'20px'}} className="bg-purple-800 transition duration-100 w-[fit-content] px-[50px] hover:text-gray-200 hover:bg-purple-950 text-white font-bold py-[2px] text-[25px]"><a href="#top">Play</a></button>
                </div>
            </div>
            
           
        </div>
    )
}