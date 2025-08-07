import BearCarousel, { BearSlideImage } from "bear-react-carousel";
import "bear-react-carousel/dist/index.css";
import { useEffect, useState } from "react";
import SlideAdvertNoButton from "./SlideAdvertNoButton";
import SlideAdvertWithButton from "./SLideAdvertWithButton";


const SlideBanner = ( { isLoading, adverts, className }) => {
  const [ isMobile, setIsMobile ]=useState(false);
  const [ bearSlideItemData, setBearSlideItemData ] = useState([]);

  const images = [
    { id: 1, image: "/images/skit_winners.jpg" },
    { id: 2, image: "/images/frontBanner.jpg" },
    { id: 3, image: "/images/ambassador.jpg" },
    { id: 4, image: "/images/landing/gq-banner.JPG" },
    { id: 5, image: "/images/landing/image1.jpg" },
    { id: 6, image: "/images/admid1.jpg" },
    { id: 7, image: "/images/landing/image5.jpg" },
  ];

  function arraysAreEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((val, i) => val === arr2[i]);
  }

  function shuffleArrayUnique(originalArray) {
    if (originalArray?.length <= 1) return [...originalArray]; // Nothing to shuffle
  
    let shuffled;
    do {
      shuffled = [...originalArray];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
    } while (arraysAreEqual(originalArray, shuffled));
  
    return shuffled;
  }
  
  useEffect(()=> {
      if (adverts) {
        const data = adverts?.map((row) => {
          if ( row.contactUsButton.showContactButton ) {
            return {
              key: row.id,
              children: <SlideAdvertWithButton contact={row?.contactUsButton?.contact} imageUrl={row.advertImage}/>
            };
          } else {
            return {
              key: row.id,
              children: <SlideAdvertNoButton imageUrl={row.advertImage}/>
            };
          }
        });

        for ( const item of images ) {
          data?.push( { 
            key:item.id,
            children: <BearSlideImage className="md:rounded-[10px]" imageUrl={item.image} />
          })
        };
        //mixes the advert and banner
        const scrambledData = shuffleArrayUnique(data);

        setBearSlideItemData(scrambledData);
    }
  }, [ isLoading ])

  useEffect(()=>{
    if( /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) && window.matchMedia("(max-width: 600px)").matches ) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
    // console.log(isMobile, navigator.userAgent)
  }, [isMobile]);

  return (
    <div className={`md:rounded-[10px] overflow-hidden mx-auto ${className}`} style={{padding:'0px 0px', marginTop:'5px', display:'flex', flexDirection:'column'}}>
      { isLoading && (
        <div className="w-full md:h-[350px] relative h-[250px] md:rounded-[5px] bg-gray-200 animate-pulse">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/80 to-transparent" />
        </div>
      )}
      { !isLoading && (
        <BearCarousel
          className="md:rounded-[10px]"
          data={bearSlideItemData}
          isEnableLoop
          autoPlayTime={5000}
          isEnableAutoPlay
          isEnablePagination
          height={ isMobile?{ widthRatio: 12, heightRatio:7.5 }:{widthRatio:11, heightRatio:6.5}}
        />
      )}
    </div>
  );
};

export default SlideBanner;
