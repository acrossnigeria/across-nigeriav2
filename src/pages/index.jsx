import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import image1 from "../../public/images/giveaway_quizzes.jpg";
import image2 from "../../public/images/skit_across_nigeria.jpg";
import image3 from "../../public/images/king_and_queen.jpg";
import image4 from "../../public/images/mystery_box.jpg";
import image5 from "../../public/images/state_treasure_hunt.jpg";
import image6 from "../../public/images/mega_cashout.jpg";
import image7 from "../../public/images/across_reality_show.jpg";
import image8 from "../../public/images/naija_vibes.jpg"
import image9 from "../../public/images/shopping_hustle.jpg";
import image10 from "../../public/images/i_don_hamma.jpg";
import image11 from "../../public/images/know_your_local_government.jpg";
import image12 from "../../public/images/across_quiz_show.jpg";
import { useState, useEffect } from "react";
import ShoutOutCard from "@/components/ShoutOutCard";
import axios from "axios";
import ReloadIcon from "../../public/images/icon/ReloadIcon";
import CycleLoader from "@/components/CycleLoader";
import RegularShoutout from "@/components/shout-out/RegularShoutout";
import NoShoutOut from "@/components/shout-out/NoShoutOut";
import AmbassadorInfo from "@/components/AmbassadorInfo";
import AddAccDetails from "@/components/notifiers/AddAccountDetails";
import { useSession } from "next-auth/react";
import GoldAdvertComponent from "@/components/GoldAdvertComponent";
import SilverAdvertComponent from "@/components/SilverAdvertComponent";
import ShowCard from "@/components/ShowCard";
import TestimonialVideoCarousel from "@/components/TestimonialVideoCarousel";
import ProductCard from "@/components/ProductCard";
import HeroSection from "@/components/HeroSection";
import sqImage from "../../public/images/squid-game.jpg";
import tsImage from "../../public/images/recentSkitCard.jpg";
import HeadComponent from "@/components/HeadComponent";


export default function Home() {
  const [ isMobile, setIsMobile ] =useState(false);
  const [ shoutOut, setShoutOut ] = useState(null);
  const [ networkError, setNetworkError ] = useState(false);
  const { data:session } = useSession();

  const [ isGettingAdverts, setIsGettingAverts ] = useState(true);
  const [ diamondAdverts, setDiamondAdverts ] = useState([]);
  const [ goldAdverts, setGoldAdverts ] = useState([]);
  const [ silverAdverts, setSilverAdverts ] = useState([]);
  const [ getAdvertRetryCounts, setGetAdvertRetryCounts ] = useState(0);

  const games = [
    {title:"SKITS ACROSS NIGERIA REALITY SHOW",image:image2,link:"/skit-across-nigeria/pgs/landing", date:'Skit upload opens 20th August 2025', isOpen:true },
    {title:"GIVE AWAY QUIZZES", image:image1,link:"/giveaway-quiz", date:'Coming Soon', isOpen:false },
    {title:"ACROSS NIGERIA QUIZ SHOW",image:image12,link:"/across_quiz_show", date:'Coming Soon', isOpen:false },
    {title:"KING AND QUEEN ACROSS NIGERIA", image:image3, link:"/soon", date:'2026', isOpen:false },
    {title:"NAIJA VIBES", image:image8,link:"/soon", date:'2026', isOpen:false },
    {title:"MYSTERY BOXES",image:image4,link:"/soon", date:'2026', isOpen:false },
    {title:"STATE TREASURE HUNT SHOW",image:image5,link:"/soon", date:'2026', isOpen:false },
    {title:"MEGA CASH OUT",image:image6,link:"/soon", date:'2026', isOpen:false },
    {title:"ACROSS NIGERIA REALITY SHOW",image:image7,link:"/soon", date:'2027', isOpen:false },
    {title:"SHOPPING HUSTLE",image:image9,link:"/soon", date:'2026', isOpen:false },
    {title:"I DON HAMMA",image:image10,link:"/soon", date:'2026', isOpen:false },
    {title:"KNOW YOUR LOCAL GOVERNMENT",image:image11,link:"/soon", date:'2026', isOpen:false },
  ]

  const recentsContent = [
    { 
      header:"Squid Game 2.0",
      subHeader:"A Battle of Wit, Speed, and Naira!",
      image:sqImage,
      pg:`We brought the heat with our own Nigerian twist on the global sensation—Squid Game 2.0! 
      Participants competed in a series of thrilling challenges, from mind games to high-stakes physical tasks
      , with real cash prizes at stake. It was intense. It was wild. It was unforgettable.`,
      button: {
        hasButton:false,
      },
      txtThemeColor:"text-pink-500",
      bgThemeColor:"bg-pink-500"
    },
    { 
      header:"Theatre Skit: Across Nigeria",
      subHeader:"Creativity Meets Culture, Stage by Stage",
      image:tsImage,
      pg:`In this competition, Theatre Arts students and skit creators across Nigeria showcased their acting and 
      storytelling talents under one bold theme: "What Not to Do When Dating in Nigeria."
        Originality, humor, and depth ruled the stage, with our audience voting to crown the most captivating skit.`,
      button: {
        hasButton:true,
        text:"See Winners",
        link:"'/theater-skit-across-nigeria/pages/winners'"
      },
      txtThemeColor:"text-green-600",
      bgThemeColor:"bg-green-600"
    }
  ]

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

  const getAdverts = async () => {
    try {
      setIsGettingAverts(true);
      const response = await axios.get('/api/advert/getAdverts');
      const data = response.data.activeAdverts;
      setDiamondAdverts(data.diamondAdverts);
      setSilverAdverts(data.silverAdverts);
      setGoldAdverts(data.goldAdverts);
      setIsGettingAverts(false);
    } catch(err) {
      if ( getAdvertRetryCounts < 3 ) {
        setTimeout(() => {
          setGetAdvertRetryCounts(getAdvertRetryCounts+1);
        }, 2000);
      } else {
        console.log('Three retry to get advert failed, reload page')
      }
    }
  }

  useEffect( () => {
    getAdverts();
  }, [ getAdvertRetryCounts ])


  function reloadShoutOut() {
    setNetworkError(false);
    getShoutOuts();
  }

  useEffect( ()=> {
    getShoutOuts();
  }, [])

  useEffect( () => {

    if(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)&&window.matchMedia("(max-width: 600px)").matches){
      setIsMobile(true)
    } else{setIsMobile(false)}

  },[ isMobile ])


  return (
        <Layout page={1}>
          <HeadComponent/>
          <div className="bg-gradient-to-b">
            <HeroSection isLoading={isGettingAdverts} adverts={diamondAdverts} />
          </div>
          <div className="w-[100%] mx-auto">
            <div className="pt-[30px] w-full pb-[170px] bg-gradient-to-b from-green-800 to-gray-900">
              <div className="mb-[25px] md:text-left flex flex-col leading-tight items-center justify-center text-center">
                  <span className="md:text-[20px] text-[28px] text-yellow-400 font-semibold">Our</span>
                  <span className="md:text-[33px] text-[28px] text-white font-semibold">Amazing Products</span>
              </div>

              <div className="flex justify-center w-full items-center">
                <div className="grid grid-cols-1 md:w-fit w-[90%] md:grid-cols-3 justify-center items-center md:gap-x-[20px] gap-y-[160px]">
                    { games.map((card)=>(<ProductCard key={card.title} isOpen={card.isOpen} date={card.date} title={card.title} 
                    link={card.link} image={card.image}/>))}
                </div>
              </div>
            </div>
            
            <div className="max-w-[900px] mx-auto">
              <GoldAdvertComponent isLoading={isGettingAdverts} adverts={goldAdverts}/>
            </div>
            
            <div className="to-gray-200 bg-gradient-to-b from-white border-t-1 border-t-gray-300 rounded-[10px] flex flex-col gap-4 mx-auto pt-[30px] pb-[50px]">
              <div className="mb-[20px] md:text-left flex flex-col leading-tight items-center justify-center text-center">
                  <span className="md:text-[20px] text-[28px] text-green-500 font-semibold">Past</span>
                  <span className="md:text-[33px] text-[28px] font-semibold">Game Shows & Competitions</span>
              </div>
              <div className="flex flex-col justify-center w-full items-center gap-[20px] max-w-[900px] mx-auto">
                { recentsContent.map((content, index) => (
                  <ShowCard key={index} content={content}/>
                ))}
              </div>
            </div>

            <div className={`pt-[30px] pb-[50px] bg-[url('/svg/Hexagon.svg')] `}>
              <div className="mb-[20px] md:text-left flex flex-col leading-tight items-center justify-center text-center mt-[20px]">
                  <span className="md:text-[20px] text-[28px] text-green-500 font-semibold">Our</span>
                  <span className="md:text-[33px] text-[28px] text-white font-semibold">Ambassadors Program</span>
              </div>
              <div className="mb-[40px] max-w-[900px] mx-auto">
                <AmbassadorInfo/>
              </div>
            </div>
            <div className="mb-[20px] md:text-left flex flex-col leading-tight items-center justify-center text-center mt-[20px]">
                <span className="md:text-[20px] text-[28px] text-green-500 font-semibold">Special</span>
                <span className="md:text-[33px] text-[28px] font-semibold">Shout Outs</span>
            </div>
            <div className="mb-[40px] flex flex-col max-w-[900px] mx-auto gap-2 pt-[30px] pb-[50px] items-center">
                { networkError ? (
                      <div onClick={reloadShoutOut} className="h-[500px] cursor-pointer gap-3 md:w-[100%] w-[100%] flex flex-col justify-center items-center rounded-[20px] bg-gradient-to-b from-gray-200 to-gray-50 border-1 border-gray-400">
                        <span>Network error. Retry?</span>
                        <ReloadIcon/>
                      </div>
                      ) : ( !shoutOut ? 
                        ( 
                          <div className="h-[500px] md:w-[700px] w-[95%] flex flex-col justify-center items-center rounded-[20px] bg-gradient-to-b from-gray-200 to-gray-50 border-1 border-gray-400">
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

            <div className="max-w-[900px] mx-auto">
              <SilverAdvertComponent isLoading={isGettingAdverts} adverts={silverAdverts}/>
            </div>
            <div className="max-w-[900px] mx-auto">
              <div className="mb-[20px] md:text-left flex flex-col leading-tight items-center justify-center text-center mt-[20px]">
                  <span className="md:text-[20px] text-[28px] text-green-500 font-semibold">Our</span>
                  <span className="md:text-[33px] text-[28px] font-semibold">Testimonials</span>
              </div>
              {/* <VideoTestimonialComponent/> */}
              <div className="mb-[40px]">
                <TestimonialVideoCarousel/> 
              </div>
            </div>
          </div>
          {/* <AddAccDetails userId={session?.user?._id} /> */}
        </Layout> 
  );
}


