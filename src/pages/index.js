import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import Cards from "@/components/Cards"
import Info from "@/components/Info";
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
import ReviewSlider from "@/components/ReviewSlider";
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
import SkitCompetitionClickCard from "@/components/SkitCompetitionClickCard";
import VideoTestimonialComponent from "@/components/VideoTestimonialComponent";
import GoldAdvertComponent from "@/components/GoldAdvertComponent";
import SilverAdvertComponent from "@/components/SilverAdvertComponent";
import ShowCard from "@/components/ShowCard";


const inter = Inter({ subsets: ["latin"] });

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
    {title:"GIVE AWAY QUIZZES", image:image1,link:"/giveaway-quiz", date:'Live', isOpen:true },
    {title:"ACROSS NIGERIA QUIZ SHOW",image:image12,link:"/across_quiz_show", date:'Live', isOpen:true },
    {title:"KING AND QUEEN ACROSS NIGERIA", image:image3, link:"/soon", date:'2025', isOpen:false },
    {title:"SKITS ACROSS NIGERIA",image:image2,link:"/soon", date:'2025', isOpen:false },
    {title:"NAIJA VIBES", image:image8,link:"/soon", date:'2025', isOpen:false },
    {title:"MYSTERY BOXES",image:image4,link:"/soon", date:'2026', isOpen:false },
    {title:"STATE TREASURE HUNT SHOW",image:image5,link:"/soon", date:'2025', isOpen:false },
    {title:"MEGA CASH OUT",image:image6,link:"/soon", date:'2025', isOpen:false },
    {title:"ACROSS NIGERIA REALITY SHOW",image:image7,link:"/soon", date:'2027', isOpen:false },
    {title:"SHOPPING HUSTLE",image:image9,link:"/soon", date:'2025', isOpen:false },
    {title:"I DON HAMMA",image:image10,link:"/soon", date:'2026', isOpen:false },
    {title:"KNOW YOUR LOCAL GOVERNMENT",image:image11,link:"/soon", date:'2025', isOpen:false },
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
        <Layout title={"Home Page"}>
          <div className="bg-gradient-to-b pt-[5px]">
            <ReviewSlider isLoading={isGettingAdverts} adverts={diamondAdverts}/>
          </div>
          <div className="md:w-[900px] mt-[25px] w-[100%] mx-auto">
            <Info/>

            <div className="mb-[20px] md:text-left text-center mt-[20px]">
                <span style={{lineHeight:'30px'}} className="md:text-[33px] text-[28px] font-semibold">Our Amazing Products.</span>
            </div>

            <div className="flex justify-center items-center md:px-0 px-[3%]">
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-4">
                  { games.map((card)=>(<Cards key={card.title} isOpen={card.isOpen} date={card.date} title={card.title} 
                  link={card.link} image={card.image}/>))}
              </div>
            </div>

            <div className="mb-[20px] md:text-left text-center mt-[20px]">
                <span style={{lineHeight:'30px'}} className="md:text-[33px] text-[28px] font-semibold">Upcoming game show.</span>
            </div>
            <ShowCard/>

            <GoldAdvertComponent isLoading={isGettingAdverts} adverts={goldAdverts}/>

            <div className="mb-[20px] md:text-left text-center mt-[20px]">
                <span style={{lineHeight:'30px'}} className="md:text-[33px] text-[28px] font-semibold">Ongoing Skit Challenge.</span>
            </div>
            <SkitCompetitionClickCard/>

            <div className="mb-[20px] md:text-left text-center mt-[20px]">
                <span style={{lineHeight:'30px'}} className="md:text-[33px] text-[28px] font-semibold">Our Ambassador program.</span>
            </div>
            <div className="mb-[40px]">
              <AmbassadorInfo/>
            </div>
            <div className="mb-[20px] md:text-left text-center mt-[20px]">
                <span style={{lineHeight:'30px'}} className="md:text-[33px] text-[28px] font-semibold">Shout Outs.</span>
            </div>
            <div className="mb-[40px] flex flex-col gap-2 items-center">
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
            <SilverAdvertComponent isLoading={isGettingAdverts} adverts={silverAdverts}/>
            <div className="mb-[20px] md:text-left text-center mt-[30px]">
                <span style={{lineHeight:'30px'}} className="md:text-[33px] text-[28px] font-semibold">Our Testimonials.</span>
            </div>
            <VideoTestimonialComponent/>
          </div>
          <AddAccDetails userId={session?.user?._id} />
        </Layout> 
  );
}
