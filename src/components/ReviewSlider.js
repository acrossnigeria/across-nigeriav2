
import BearCarousel, { BearSlideImage } from "bear-react-carousel";
import "bear-react-carousel/dist/index.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const images = [
  { id: 1, image: "/images/landing/image1.jpg" },
  { id: 2, image: "/images/landing/image2.jpg" },
  { id: 3, image: "/images/landing/image3.jpg" },
  { id: 4, image: "/images/landing/image4.jpg" },
  { id: 5, image: "/images/landing/image5.jpg" },
  { id: 6, image: "/images/landing/image6.jpg" },
  { id: 7, image: "/images/landing/image7.jpg" },
];

const bearSlideItemData = images.map((row) => {
  return {
    key: row.id,
    children: <BearSlideImage style={{ borderRadius:'15px', filter:'brightness(70%)'}} imageUrl={row.image} />
  };
});

const CustomBanner = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const[isMobile, setIsMobile]=useState(false);
  useEffect(()=>{
    if(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)&&window.matchMedia("(max-width: 600px)").matches){
 setIsMobile(true)
} else{setIsMobile(false)}
// console.log(isMobile, navigator.userAgent)
  },[isMobile])
  return (
    <div style={{padding:'0px 20px', marginTop:'20px', display:'flex', flexDirection:'column'}}>
      <div style={{ position:'absolute', zIndex:5, margin:( isMobile ? '20px 10px':'180px 30px'),
           maxWidth:'700px', display:'flex', flexDirection:'column',paddingRight:'30px', gap:'10px',
           alignItems:(isMobile?'center':'left'), textAlign:(isMobile?'center':'left') }}
      >
        <span style={{ color: "white", fontSize:( isMobile ? '18px':'22px')}} className="w-full font-bold tracking-wider"> WELCOME { session?session?.user?.name.toUpperCase():" TO ACROSS NIGERIA REALITY TV SHOW"}</span>
        <span style={{ color: "white", fontSize:( isMobile ? '35px':'45px'), lineHeight:( isMobile ? '40px':'50px')}} className="w-full font-extrabold tracking-wider">
          Discover giveaways, games and reality shows
        </span>
        <button onClick={()=> router.push('/reg')} style={{ display:(session? 'none':'block'), backgroundColor: 'rgb(23, 123, 43)', width:'200px', padding:'6px 0px', color: "white", fontSize:( isMobile ? '18px':'22px'), borderRadius:'20px'}}
        className="w-full font-bold tracking-wider hover:opacity-70"
        >
          Join
        </button>
      </div>
      <BearCarousel
        className=""
        data={bearSlideItemData}
        isEnableLoop
        autoPlayTime={3000}
        
        isEnableAutoPlay
        isEnablePagination
        height={ isMobile?{ widthRatio: 12, heightRatio: 13 }:{widthRatio:15, heightRatio:5}}
        //look for logic to make it work differently on pc and phone
      />
    </div>
  );
};

export default CustomBanner;
