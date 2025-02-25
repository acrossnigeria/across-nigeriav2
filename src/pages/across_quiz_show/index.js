import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Layout from "@/components/Layout";
import image1 from "../../../public/images/across_quiz_show.jpg";
import Image from "next/image";
import Next from "../../../public/images/icon/Next";
import registerIllustration from "../../../public/images/illustration/register.svg";
import flagillust from "../../../public/images/illustration/flagged.svg";
import answerIllus from "../../../public/images/illustration/answer.svg";
import winnerIllus from "../../../public/images/illustration/winner.svg";
import FaqCard from "@/components/FaqCard";
import CountDownTimer from "./CountDownTimer";
import AddAccDetails from "@/components/notifiers/AddAccountDetails";


const faq = [
  {
      q:'How do i register?',
      a:'Click the Register Now button, fill the form and pay 1000 naira to enter '
  },
  {
      q:'When will the quiz take place?',
      a:'The quiz happens between the 22nd and 25th of every month. The next one is on february 22!'
  },
  {
      q:'How do i get my winnings?',
      a:'Winners receive their prize via bank transfer!. make sure to update your bank details in your account'
  },
]

export async function  getServerSideProps(context) {
    const session = await getSession(context);
    const userId = session?.user?._id??false;
    const username = session?.user?.name;
    let response;
    let isUserRegistered;
    let isUserSelected;
    let data;
    if (userId) {
      response = await axios.get(`https://acrossnig.com/api/across_quiz_show/handler?type=CHECKUSER&userId=${userId}`);
      isUserRegistered = response.data.isUserFound;
      isUserSelected = response.data.isUserSelected;
      data = { isUserRegistered, isUserSelected, username, userId  };
      if ( isUserRegistered ) {
        return { props: { ...data } }
      } else {
        return { props: { ...data } }
      }
    } else {
      return {
        redirect: {
            destination: '/unauthorized',
            permanent: false,
        }
      };
    }
    
} 

const Index = ( { isUserRegistered, isUserSelected, username, userId }) => {
  const [ isMobile, setIsMobile ] = useState(false);
  const router = useRouter();

  useEffect(()=>{
    if(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)&&window.matchMedia("(max-width: 600px)").matches){ 
    setIsMobile(true)
  } else{setIsMobile(false)}
// console.log(isMobile, navigator.userAgent)
  },[ isMobile ])

  const toReg = () => {
    router.push('/across_quiz_show/reg');
  }
  return (
    <Layout bg='white'>
        <div className={`pb-[50px] bg-white`}>
            <div className={`flex ${isMobile?'flex-col':'flex-row'} rounded-bl-[30px] bg-gradient-to-t from-gray-200 to-white h-[fit-content] justify-center ${isMobile?'':'px-[10%]'} py-[20px]`}>
                <div className={` border-black ${isMobile?'w-[94%]':'w-[40%]'} self-center flex flex-col h-[fit-content] mb-[15px]`}>
                    <span style={{lineHeight:(isMobile?'28px':'35px')}} className={`font-bold ${isMobile?'text-[25px] text-center':'text-[37px]'} text-pretty bg-gradient-to-bl from-green-400 to-green-700 bg-clip-text text-transparent`}>Nigeria&apos;s Ultimate Quiz Challenge! play and Win BIG! </span> 
                    <span style={{lineHeight:'24px'}} className={`${isMobile?'text-center text-[20px]':'text-[25px]'} mt-3`} >Think you know Nigeria? Answer as many questions in 1 minute. win &#8358;5,000 per correct answer!!</span>
                </div>
                <div style={{height:(isMobile?'200px':'400px')}} className={`${isMobile?'w-[98%] left-[1%]':'w-[60%]'} mt-[20px] relative`}>
                    <Image className="bg-gray-300" style={{borderRadius:'22px'}} alt='banner' layout="fill" objectFit="fill" src={image1}/>
                </div> 
            </div> 
            <div className="md:flex-row flex-col flex w-[96%] ml-[2%] py-[3%] md:px-[50px] px-[3%] rounded-r-[70px] bg-gradient-to-l from-gray-200 to-white mt-[50px]">
              <div className="flex flex-col md:w-[50%] w-[100%]">
                <button onClick={!isUserRegistered && toReg } className={`md:text-[25px] ${isUserRegistered?'text-[18px]':'text-[20px] items-center'} text-green-500 flex flex-row gap-2 hover:text-green-800`} >
                  {isUserRegistered?`${username>10?`${username.slice(0, 10)}..`:username} You're Registered`:'Register Now with 1,000 Naira'}
                  { !isUserRegistered && <Next bg={'black'} size={'15px'}/> }
                </button> 
                <span className="font-light text-[17px]">{isUserRegistered?(isUserSelected?'You Have been selected':'Selection Pending'):'Make it big and bright'}</span>
              </div>
              <div className="flex flex-col md:items-center items-end md:w-[50%] md:mt-0 mt-2 w-[85%]">
                <span className="md:text-[20px] text-[18px]">Next Quiz Show Begins In</span>
                <CountDownTimer/>
              </div> 
            </div>
            <div className="text-[29px] md:text-[40px] mx-auto text-center mt-[40px]">How It Works?</div>
            <div className="mt-[10px] py-5 px-[2%]">
              <div className="flex md:flex-row items-center rounded-l-[50px] py-[20px] bg-gradient-to-r from-gray-200 to-white justify-center flex-col">
                <div className="flex flex-col md:w-[35%] w-[90%] gap-2">
                  <span className="md:text-[25px] text-[20px] md:text-left text-center font-bold">Step 1. Register with &#8358;1,000 </span>
                  <span className="md:text-[25px] md:text-left text-center text-[18px]">Click on Register now to register for the show by paying &#8358;1000. Register now to secure your spot!</span>
                </div>
                <div style={{height:(isMobile?'200px':'250px')}} className={`${isMobile?'w-[70%] left-[1%]':'w-[35%]'} mt-[20px] relative`}>
                    <Image style={{borderRadius:'22px'}} alt='banner' layout="fill" objectFit="fill" src={registerIllustration}/>
                </div> 
              </div>

              <div className="flex md:flex-row mt-[30px] items-center rounded-r-[50px] py-[20px] bg-gradient-to-l from-gray-200 to-white justify-center flex-col">
                <div className="flex flex-col md:w-[35%] w-[90%] gap-2">
                  <span className="md:text-[25px] text-[20px] md:text-left text-center font-bold">Step 2.Registration and Introduction </span>
                  <span className="md:text-[25px] md:text-left text-center text-[18px]">Fill the form, Upload an introduction video stating your name, age, location, occupation, and why you&apos;re participating. Upload the video.</span>
                </div>
                <div style={{height:(isMobile?'200px':'250px')}} className={`${isMobile?'w-[70%] left-[1%]':'w-[35%]'} mt-[20px] relative`}>
                    <Image style={{borderRadius:'22px'}} alt='banner' layout="fill" objectFit="fill" src={flagillust}/>
                </div> 
              </div>

              <div className="flex md:flex-row mt-[30px] items-center rounded-l-[50px] py-[20px] bg-gradient-to-r from-gray-200 to-white justify-center flex-col">
                <div className="flex flex-col md:w-[35%] w-[90%] gap-2">
                  <span className="md:text-[25px] text-[20px] md:text-left text-center font-bold">Step 3. Participation and Winning </span>
                  <span className="md:text-[25px] md:text-left text-center text-[18px]">Answer as many questions as possible within 1 minute to win &#8358;5,000 per correct answer. ( &#8358;10,000 for JOKER question )</span>
                </div>
                <div style={{height:(isMobile?'200px':'250px')}} className={`${isMobile?'w-[70%] left-[1%]':'w-[35%]'} mt-[20px] relative`}>
                    <Image style={{borderRadius:'22px'}} alt='banner' layout="fill" objectFit="fill" src={answerIllus}/>
                </div> 
              </div>

              <div className="flex md:flex-row mt-[30px] items-center rounded-r-[50px] py-[20px] bg-gradient-to-l from-gray-200 to-white justify-center flex-col">
                <div className="flex flex-col md:w-[35%] w-[90%] gap-2">
                  <span className="md:text-[25px] text-[20px] md:text-left text-center font-bold">Step 4. Testimonial and Payment </span>
                  <span className="md:text-[25px] md:text-left text-center text-[18px]">After the show, send a testimonial with your name, winnings, experience, and rating of the show. Your cash prize will be paid via bank transfer upon receipt of your testimonial.</span>
                </div>
                <div style={{height:(isMobile?'200px':'250px')}} className={`${isMobile?'w-[70%] left-[1%]':'w-[35%]'} mt-[20px] relative`}>
                    <Image style={{borderRadius:'22px'}} alt='banner' layout="fill" objectFit="fill" src={winnerIllus}/>
                </div> 
              </div>
              { !isUserRegistered && <button onClick={toReg} className="bg-green-500 hover:bg-green-700 hover:scale-95 md:w-[50%] md:ml-[25%] ml-[7%] w-[86%] h-[55px] rounded-[30px] mx-auto mt-[20px] text-white text-[20px]">Register Now</button> }
            </div>

            <div className="rounded-[15px] border-green-600 mt-[35px] flex flex-col border-[2px] md:w-[50%] md:ml-[25%] w-[94%] ml-[3%] p-3">
              <div className="mb-[10px] flex flex-col text-[25px]">Why Join?</div>
              <span className="">&#9755; <span className="font-bold">Cash Rewards! </span> Win money just for answering questions!</span>
              <span className="">&#9755; <span className="font-bold">Learn & Have Fun! </span> Discover amazing facts about Nigeria!</span>
              <span className="">&#9755; <span className="font-bold">Happens Every Month! </span> Missed this one? Join the next!</span>
            </div>
        </div>
        <FaqCard data={faq}/>
        <AddAccDetails userId={userId} />
    </Layout>
  )
}

Index.auth = true;
export default Index;