
import BearCarousel, { BearSlideImage } from "bear-react-carousel";
import "bear-react-carousel/dist/index.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const images = [
  { id: 1, image: "/images/landing/new year web banner.jpg" },
  { id: 2, image: "/images/landing/image1.jpg" },
  { id: 3, image: "/images/landing/image3.jpg" },
  { id: 4, image: "/images/landing/image4.jpg" },
  { id: 5, image: "/images/landing/image5.jpg" },
  { id: 6, image: "/images/landing/image6.jpg" },
  { id: 7, image: "/images/landing/image7.jpg" },
];

const bearSlideItemData = images.map((row) => {
  return {
    key: row.id,
    children: <BearSlideImage style={{}} imageUrl={row.image} />
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
    <div style={{padding:'0px 10px', marginTop:'10px', display:'flex', flexDirection:'column'}}>
      <BearCarousel
        className="rounded-none"
        data={bearSlideItemData}
        isEnableLoop
        autoPlayTime={5000}
        renderNav={()=>null}
        isEnableAutoPlay
        isEnablePagination
        height={ isMobile?{ widthRatio: 12, heightRatio:5 }:{widthRatio:12, heightRatio:4.5}}
        //look for logic to make it work differently on pc and phone
      />
    </div>
  );
};

export default CustomBanner;
