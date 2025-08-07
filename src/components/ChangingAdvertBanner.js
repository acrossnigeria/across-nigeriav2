import BearCarousel, { BearSlideImage } from "bear-react-carousel";
import "bear-react-carousel/dist/index.css";
import { useEffect, useState } from "react";
import SlideAdvertWithButton from './SLideAdvertWithButton';
import SlideAdvertNoButton from './SlideAdvertNoButton';


const ChangingAdvertBanner = ( { scrollData }) => {
  const [ isMobile, setIsMobile ] = useState(false);
  const [ bearSlideItemData, setBearSlideItemData ] = useState([]);

  const images = [
    { id: 1, image: '/images/adpt1.jpg' },
    { id: 2, image: '/images/adpt1.jpg' },
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
    let data;
    if (scrollData?.length > 0) {
      data = scrollData?.map((row) => {
        if ( row.contactUsButton.showContactButton ) {
          return {
            key: row.id,
            children: <SlideAdvertWithButton contact={row?.contactUsButton?.contact} style={{ borderRadius:'0px'}} imageUrl={row.advertImage}/>
          };
        } else {
          return {
            key: row.id,
            children: <SlideAdvertNoButton style={{ borderRadius:'0px'}} imageUrl={row.advertImage}/>
          };
        }
      });
    } else {
      data = [];
    }

    if ( data?.length < 10 ) {
      for ( const item of images ) {
        data?.push( { 
          key:item.id,
          children: <BearSlideImage style={{ borderRadius:'0px'}} imageUrl={item.image} />
        })
      };
    }
    //mixes the advert and banner

    const scrambledData = shuffleArrayUnique(data);

    setBearSlideItemData(scrambledData);
  }, [ ])

  useEffect(()=>{
    if( /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) && window.matchMedia("(max-width: 600px)").matches ) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
    // console.log(isMobile, navigator.userAgent)
  }, [ isMobile ]);

  return (
    <div className="rounded-[0px] h-[100%] w-[49%] mx-auto" style={{padding:'0px 0px', display:'flex', flexDirection:'column'}}>
        <BearCarousel
          className="rounded-[0px]"
          data={bearSlideItemData}
          isEnableLoop
          autoPlayTime={5000}
          isEnableAutoPlay
          isEnablePagination
          height={ isMobile?{ widthRatio: 12, heightRatio:13.5 }:{widthRatio:11, heightRatio:8}}
        />
    </div>
  );
};

export default ChangingAdvertBanner;
