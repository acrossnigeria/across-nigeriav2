import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import Cards from "@/components/Cards"
import Info from "@/components/Info";
import image1 from "../../public/images/giveaway_quiz.jpg";
import image2 from "../../public/images/skits_across.jpg";
import image3 from "../../public/images/king_queen.jpg";
import image4 from "../../public/images/mystery_box.jpg";
import image5 from "../../public/images/state_treasure.jpg";
import image6 from "../../public/images/mega_cashout.jpg";
import image7 from "../../public/images/across_naija_tv.jpg";
import image8 from "../../public/images/naija_vibes.jpg";
import image9 from "../../public/images/shopping_hustle.jpg";
import image10 from "../../public/images/i_don_hamma.jpg";
import PersonCard from "@/components/ModelCard";
import Image from "next/image";
import ReviewSlider from "@/components/ReviewSlider";
import Testimonials from "@/components/Testimonials";
import Link from "next/link";
import { useState, useEffect } from "react";
import ShoutOutCard from "@/components/ShoutOutCard";
import axios from "axios";
import ReloadIcon from "../../public/images/icon/ReloadIcon";
import CycleLoader from "@/components/CycleLoader";
import RegularShoutout from "@/components/shout-out/RegularShoutout";
import NoShoutOut from "@/components/shout-out/NoShoutOut";



export const games=[
  {title:"GIVE AWAY QUIZZES", image:image1,link:"/giveaway-quiz", date:'Live'},
  {title:"KING AND QUEEN", image:image3, link:"/king-and-queen", date:'January 1st, 2025'},
  {title:"SKITS ACROSS NIGERIA",image:image2,link:"/skitsPage", date:'2025'},
  {title:"NAIJA VIBES", image:image8,link:"/soon", date:'2025'},
  {title:"MYSTERY BOXES",image:image4,link:"/soon", date:'2025'},
  {title:"STATE TREASURE HUNT SHOW",image:image5,link:"/soon", date:'2025'},
  {title:"MEGA CASH OUT",image:image6,link:"/soon", date:'2025'},
  {title:"ACROSS NIGERIA REALITY SHOW",image:image7,link:"/soon", date:'2026'},
  {title:"SHOPPING HUSTLE",image:image9,link:"/soon", date:'2025'},
  {title:"I DON HAMMA",image:image10,link:"/soon", date:'2025'},
]
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [ isMobile, setIsMobile ] =useState(false);
  const [ shoutOut, setShoutOut ] = useState(null);
  const [ networkError, setNetworkError ] = useState(false);

  async function getShoutOuts() {
    try {
      const response = await axios.get('/api/booking/booking');
      setShoutOut(response.data);
      setNetworkError(false);

    } catch( err ) {
      console.log('user not connected to an internet connection')
      setNetworkError(true);
    }
    
  }


  function reloadShoutOut() {
    setNetworkError(false);
    getShoutOuts();
  }

  useEffect( ()=> {
    getShoutOuts();
  }, [])

  useEffect( ()=>{

    if(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)&&window.matchMedia("(max-width: 600px)").matches){
      setIsMobile(true)
    } else{setIsMobile(false)}

    },[ isMobile ])

  return (
        <Layout title={"Home Page"}>
        <div className=" px-3 md:w-[1000px] w-[100%] mx-auto">
          <ReviewSlider/>
           <Info/>
            <p className="grid w-full border-b-1  mx-auto text-center bg-clip-text text-transparent bg-gradient-to-tr from-yellow-200 to-orange-600 ">
              <span style={{lineHeight:'30px'}} id="products" className="flex text-center text-[28px] font-sans font-extrabold mx-auto p-2"> 
                  {"Our amazing products"}
              </span>
            </p>
        <div className="mt-3 grid left-0 grid-cols-1 gap-4 border-b-1 md:grid-cols-2 lg:grid-cols-2 md:gap-6 mx-auto items-center md:max-w-screen-xl px-4 sm:px-3 lg:px-20">
            { games.map((card)=>(<Cards key={card.title} date={card.date} title={card.title} 
            link={card.link} image={card.image}/>))}
        </div>
        
       <div className="mb-[40px] mt-[40px] flex flex-col gap-2 items-center">
            <span className="bg-clip-text text-[30px] font-extrabold text-transparent bg-gradient-to-tr from-green-700 to-green-300">SHOUT OUT</span>
           { networkError ? (
                <div onClick={reloadShoutOut} className="h-[500px] cursor-pointer gap-3 md:w-[700px] w-full flex flex-col justify-center items-center rounded-[20px] bg-gradient-to-b from-gray-200 to-gray-50 border-1 border-gray-400">
                  <span>Network error. Retry?</span>
                  <ReloadIcon/>
                </div>
                ) : ( !shoutOut ? 
                  ( 
                    <div className="h-[500px] md:w-[700px] w-full flex flex-col justify-center items-center rounded-[20px] bg-gradient-to-b from-gray-200 to-gray-50 border-1 border-gray-400">
                      <CycleLoader/>
                    </div>
                  ) : (
                      shoutOut.length === 0? (
                          <NoShoutOut/>
                      ): ( shoutOut.length > 1 ? (
                          <RegularShoutout regulars={shoutOut}/>
                          ) : (
                              <ShoutOutCard shoutOutType={'premium'} details={shoutOut[0]}/>
                          )  
                      )
                  )
                )
            }
           
        </div>

         <div className="h-80 mt-6">
           <p className="grid w-full  mx-auto text-center text-2xl text-green-800 font-sans">
              <span className="flex text-center text-3xl font-sans font-extrabold mx-auto ">
                {"Winners for the Week".toUpperCase()}  
              </span>
            </p>
            <ol className="h-80 pl-8">
              <li>List</li>
              <li>of</li>
              <li>Winners</li>
            </ol>
         </div>
         <div className="">
           <span
        className="w-full mx-auto text-center flex justify-center items-center 
          md:flex-row flex-col mb-6 font-serif font-light text-[35px]
           text-green-800"
      >{"Testimonials".toUpperCase()}
      </span>
        <Testimonials/>
        </div>
      </div>
   
      </Layout> 
  );
}
