import BearCarousel, { BearSlideImage } from "bear-react-carousel";
import "bear-react-carousel/dist/index.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const images = [
  { id: 2, image: "/images/skitBanner.jpg" },
  { id: 3, image: "/images/ambassador.jpg" },
  { id: 4, image: "/images/adbanner.jpg" },
  { id: 5, image: "/images/landing/gq-banner.JPG" },
  { id: 6, image: "/images/landing/image1.jpg" },
  { id: 7, image: "/images/admid1.jpg" },
  { id: 8, image: "/images/landing/image5.jpg" },
  { id: 9, image: "/images/landing/image6.jpg" },
  { id: 10, image: "/images/admid2.jpg" },
];

const bearSlideItemData = images.map((row) => {
  return {
    key: row.id,
    children: <BearSlideImage style={{ borderRadius:'0px'}} imageUrl={row.image} />
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
    <div className="rounded-[0px] md:w-[900px] w-[100%] mx-auto" style={{padding:'0px 0px', marginTop:'5px', display:'flex', flexDirection:'column'}}>
      <BearCarousel
        className="rounded-[0px]"
        data={bearSlideItemData}
        isEnableLoop
        autoPlayTime={5000}
        isEnableAutoPlay
        isEnablePagination
        height={ isMobile?{ widthRatio: 12, heightRatio:6.8 }:{widthRatio:11, heightRatio:4}}
        //look for logic to make it work differently on pc and phone
      />
    </div>
  );
};

export default CustomBanner;
