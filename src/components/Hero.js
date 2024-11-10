import React, { useState, useRef, useEffect } from "react";
import ImageOne from "../../public/images/landing/image1.jpg";
import ImageTwo from "../../public/images/landing/image2.jpg";
import ImageThree from "../../public/images/landing/image3.jpg";
import ImageFour from "../../public/images/landing/image4.jpg";
import ImageFive from "../../public/images/landing/image5.jpg";
import ImageSix from "../../public/images/landing/image6.jpg";
import ImageSeven from "../../public/images/landing/image7.jpg";
import Image from "next/image";
import Link from "next/link";
import { IoMdArrowRoundForward } from "react-icons/io";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { ImFacebook2, ImInstagram } from "react-icons/im";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { RiTiktokLine } from "react-icons/ri";
export const sliderData = [
  {
    title: "An Adventure of a lifetime",
    image: ImageOne,
    alt: "Across Nigeria",
  },
  {
  title: "An Adventure of a lifetime",
image: ImageTwo,
    alt: "Across Nigeria",
     },
  {
   title: "An Adventure of a lifetime",
 alt: "Across Nigeria",
    image: ImageThree,
  
  },
  {
   title: "An Adventure of a lifetime",
 alt: "Across Nigeria",
    image: ImageFour,
  },
  {
   title: "An Adventure of a lifetime",
 alt: "Across Nigeria",
    image: ImageFive,
  },
  {
   title: "An Adventure of a lifetime",
 alt: "Across Nigeria",
    image: ImageSix,
  },
  {
   title: "An Adventure of a lifetime",
 alt: "Across Nigeria",
    image: ImageSeven,
  },
];

/* 
${
              index === current
                ? "transform scale-100 opacity-100"
                : "transform scale-150 opacity-50"
            }
            above does not support sliding
${
  index < current
    ? isNext
      ? "-translate-x-full"
      : "translate-x-full"
    : index > current
    ? isNext
      ? "translate-x-full"
      : "-translate-x-full"
    : ""
} 
for slide
*/
export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isNext, setIsNext] = useState(true);
  const length = sliderData.length;
  const timeout = useRef(null);

  useEffect(() => {
    const slide = () => {
      if (isNext) {
        setCurrent(current === length - 1 ? 0 : current + 1);
        setIsNext(true);
      } else {
        setCurrent(current === 0 ? length - 1 : current - 1);
        setIsNext(false);
      }
    };
    timeout.current = setTimeout(slide, 5000);

    return function () {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, length]);
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
    setIsNext(true);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
    setIsNext(false);
  };
  return (
    <div className=" w-screen h-[600px] top-0 left-0 relative columns-1 overflow-hidden mb-4">
      <div className="w-full absolute top-0 mt-0 left-0 bg-gradient-to-r from-gray-950 to-black bg-blend-luminosity
       bg-opacity-75 h-screen">
        {sliderData.map((slides, index) => (
          <div
            className={`absolute flex h-screen w-screen top-0 `}
            key={index}
          >
            {index === current && (<div>
            
              <Image
                    src={slides.image}
                    alt={slides.alt}
                   
                    className="absolute w-full h-full transform ease-out duration-700  flex lg:h-full object-scale-down -top-[36%] md:-top-[36%] mt-0 left-0 overflow-hidden"
                    placeholder="empty"
                  />
             </div>
              
            )}
          </div>
        ))}
      </div>
       <div className=" relative mx-auto flex w-[100px] mt-[50%] md:mt-[50%] h-[100px]">
                      <div className=""> <Image className="mx-auto backdrop-blur-sm  mb-4 shadow-lg" alt="logo" 
                      fill src="/images/logo1.png"/>   </div>     
               
                    <div className="relative text-[8px] w-full p-[2px] lg:text-[12px] mt-28 mx-auto tracking-tighter h-5 primary-button"> <Link href="/reg" > 
                    Register to get Involved
              
                </Link></div></div> 
      <div className="absolute bottom-[40%] lg:bottom-[50%] z-10 left-5 flex">
        {" "}
        <div onClick={prevSlide} className="arrowBtn">
          <IoArrowBack />
        </div></div>
        <div className="absolute bottom-[40%] lg:bottom-[50%] z-10 right-0 lg:right-5 flex">
        <div onClick={nextSlide} className="arrowBtn">
          <IoArrowForward />
        </div> 
      </div>
         <div className="bottom-5 absolute p-5 text-4xl mx-auto flex place-content-evenly content-evenly items-center w-full h-12 justify-center
        hover:text-yellow-800 bg-gray-950 bg-opacity-80"> <ImFacebook2 className="text-blue-800 mr-4" />
         <BsTwitterX  className="text-white mr-4"/>
<ImInstagram className="text-orange-500 mr-4"/> <FaLinkedin className="text-blue-500 mr-4"/> 
<RiTiktokLine className="text-white outline-2 drop-shadow-sm shadow-pink-400 outline-pink-400 mr-4"/></div>
    </div>
  );
}
