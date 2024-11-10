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
import flameimg from "../../public/images/flame2.png"
import Image from "next/image";
import ReviewSlider from "@/components/ReviewSlider";
import Testimonials from "@/components/Testimonials";
import Link from "next/link";



export const games=[
{title:"GIVE AWAY QUIZZES",
image:image1,link:"/giveaway"},
{title:"SKITS ACROSS NIGERIA",image:image2,link:"/skitsPage"},
{title:"NAIJA VIBES", image:image8,link:"/naijavibes"},
{title:"KING AND QUEEN",image:image3,link:"/soon"},
{title:"MYSTERY BOXES",image:image4,link:"/soon"},
{title:"STATE TREASURE HUNT SHOW",image:image5,link:"/soon"},
{title:"MEGA CASH OUT",image:image6,link:"/soon"},
{title:"ACROSS NIGERIA REALITY SHOW",image:image7,link:"/soon"},
{title:"SHOPPING HUSTLE",image:image9,link:"/soon"},
{title:"I DON HAMMA",image:image10,link:"/soon"},
]
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
        <Layout title={"Home Page"}>
        <ReviewSlider/>
        <div className="md:px-36 px-5">
           <Info/>
            <p className="grid w-full  mx-auto text-center text-2xl text-green-800 ">
              <span className="flex text-center text-3xl font-sans font-extrabold mx-auto p-4">
                 <Image quality={10} src={flameimg} height={5} width={20} alt="hot"/> 
                  {"Our Amazing Products".toUpperCase()}
                 <Image quality={10} src={flameimg} height={5} width={20} alt="hot"/>
              </span>
            </p>
        <div className=" mt-6 grid left-0 grid-cols-2 gap-4 border-b-1 border-b-gray-500 md:grid-cols-2 lg:grid-cols-3 md:gap-4 mx-auto items-center md:max-w-screen-xl px-4 sm:px-3 lg:px-20">
            { games.map((card)=>(<Cards key={card.title} title={card.title} 
            link={card.link} image={card.image}/>))}
        </div>
        
       <div className="mb-4">
          <p className="w-full mx-auto text-center flex justify-center items-center 
          md:flex-row flex-col sm:mb-16 mb-1 mt-8 font-poppins text-3xl font-sans font-extrabold
           text-green-800 ">{"Shout Out".toUpperCase()}</p>
      <PersonCard name="Amina Yusuf" age={23} occupation="Dancer" imageUrl="/images/model/model2.jpg"/>
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
           <h2
        className="w-full mx-auto text-center flex justify-center items-center 
          md:flex-row flex-col sm:mb-16 mb-6 font-poppins font-semibold xs:text-[48px] text-[40px]
           text-green-800 xs:leading-[76.8px] leading-[66.8px]"
      >{"Testimonials".toUpperCase()}
      </h2>
        <Testimonials/>
        </div>
      </div>
   
      </Layout>
  );
}
