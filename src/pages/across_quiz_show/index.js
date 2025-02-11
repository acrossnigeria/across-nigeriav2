import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FileIcon from "../../../public/images/icon/FileIcon";
import Upload from "../../../public/images/icon/Upload";
import DeleteIcon from "../../../public/images/icon/DeleteIcon";
import Link from "next/link";
import ImgIcon from "../../../public/images/icon/ImgIcon";
import CycleLoader from "@/components/CycleLoader";
import VidThumbnail from "@/components/VidThumbnail";
import Close from "../../../public/images/icon/Close";
import SuccessIcon from "../../../public/images/icon/SuccessIcon";
import UploadLoader from "@/components/UploadLoader";
import ExitConfirmScreen from "@/components/ExitConfirmScreen";
import { getSession } from "next-auth/react";
import Layout from "@/components/Layout";
import image1 from "../../../public/images/across_quiz_show.jpg";
import Image from "next/image";
import Next from "../../../public/images/icon/Next";

// export async function  getServerSideProps(context) {
//     const session = await getSession(context);
//     const userId = session?.user?._id??false;
//       const response = await axios.get(`http://localhost:3000/api/across_quiz_show/handler?type=CHECKUSER&userId=${userId}`);
//       const isUserRegistered = response.data.isUserFound;
//       const isUserSelected = response.data.isUserSelected;
//       const data = { isUserRegistered, isUserSelected }

//       if ( isUserRegistered ) {
//         return { props: { ...data } }
//       } else {
//         return { props: { ...data } }
//       }
   
// } 

const Index = ( { isUserRegistered, isUserSelected }) => {
  const [ isMobile, setIsMobile ] = useState(false);
  useEffect(()=>{
    if(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)&&window.matchMedia("(max-width: 600px)").matches){ 
    setIsMobile(true)
  } else{setIsMobile(false)}
// console.log(isMobile, navigator.userAgent)
  },[ isMobile ])
  return (
    <Layout>
        <div className={`pb-[50px] bg-white`}>
            <div className={`flex ${isMobile?'flex-col':'flex-row'} border-b-1 border-b-green-700 rounded-bl-[30px] bg-gradient-to-t from-gray-200 to-white h-[fit-content] justify-center ${isMobile?'':'px-[10%]'} py-[20px]`}>
                <div className={` border-black ${isMobile?'w-[94%]':'w-[40%]'} self-center flex flex-col h-[fit-content] mb-[15px]`}>
                    <span style={{lineHeight:(isMobile?'28px':'35px')}} className={`font-bold ${isMobile?'text-[25px] text-center':'text-[37px]'} text-pretty bg-gradient-to-bl from-green-400 to-green-700 bg-clip-text text-transparent`}>Nigeria&apos;s Ultimate Quiz Challenge! Win Up to &#8358;50,000! </span> 
                    <span style={{lineHeight:'24px'}} className={`${isMobile?'text-center text-[20px]':'text-[23px]'} text-gray-600 mt-3`} >Think you know Nigeria? Prove it! Answer 10 questions, win &#8358;5,000 per correct answer!</span>
                </div>
                <div style={{height:(isMobile?'200px':'400px')}} className={`${isMobile?'w-[98%] left-[1%]':'w-[60%]'} mt-[20px] relative`}>
                    <Image className="bg-gray-300" style={{borderRadius:'22px'}} alt='banner' layout="fill" objectFit="fill" src={image1}/>
                </div> 
            </div> 
            <div className="md:flex-row flex-col flex md:w-[100%] py-[3%] md:px-[50px] px-[3%] rounded-r-[70px] bg-gray-200 mt-[20px]">
              <div className="flex flex-col md:w-[50%] w-[100%]">
                <button className="md:text-[25px] text-[20px] text-green-500 items-center flex flex-row gap-2 hover:text-green-800 hover:scale-105 ">Register Now for &#8358;1000 <Next bg={'black'} size={'15px'}/></button> 
                <span className="font-light text-[17px]">Make it big and bright</span>
              </div>
              <div className="flex flex-col md:items-center items-end md:w-[50%] md:mt-0 mt-2 w-[85%]">
                <span className="md:text-[20px] text-[18px]">Next Quiz Show Begins In</span>
                <div className="md:text-[30px] text-[25px] text-gray-700">
                  <span>00 : </span>
                  <span>00 : </span>
                  <span>00</span>
                </div>
              </div> 
            </div>
      
        </div>
    </Layout>
  )
}

Index.auth = true;
export default Index;