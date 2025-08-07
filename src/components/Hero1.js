import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import img from "../../public/images/acn_landing.jpg";

const Hero1 = () => {
  return (
    <div className=" top-0  h-screen mx-auto justify-center object-center">
  
      <div className="relative h-screen mx-auto">
        <Image
          src={img}
          alt="Hero Background"
          className='w-screen '
          objectFit="cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Decorative shape */}
      <div className="absolute opacity-30 bottom-1/2 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-green-500"></div>
      <div className="absolute opacity-20 bottom-1/2 left-0 right-0 h-32 bg-green-500 transform -skew-y-6"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <div className="text-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gradient">Discover the latest trends and more...</h1>
                   {/* CTA Button */}
          <Link href="/register" legacyBehavior>
            <a ><span className="inline-block bg-gradient-to-r from-gold-500 via-white
             to-green-500 hover:from-gold-600 hover:via-white hover:to-green-600 text-4xl md:text-6xl border-yellow-600 border-2 
             mb-4 text-gradient font-bold py-2 px-4 mt-4 rounded-full transition duration-300">Join the Trend Now</span></a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero1;
