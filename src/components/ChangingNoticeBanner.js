import Image from 'next/image';
import adpt1 from '../../public/images/adpt1.jpg';
import adpt2 from '../../public/images/adpt2.jpg';
import { useEffect, useState } from 'react';

const ChangingNoticeBanner = () => {
    const [currentImage, setCurrentImage] = useState(adpt1);
    const [ imageOpacity, setImageOpacity ] = useState('opacity-100');
    const images = [adpt1, adpt2]; 
    const changeInterval = 10000;
  
    useEffect(() => {
        const intervalId = setInterval(() => {
            setImageOpacity('opacity-0');
            setCurrentImage(prevImage => {
            const currentIndex = images.indexOf(prevImage);
            const nextIndex = (currentIndex + 1) % images.length;
            return images[nextIndex];
            });
            setTimeout(() => {
                setImageOpacity('opacity-100');
            }, 500);
        }, changeInterval);
  
        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [images, changeInterval]);
  
  

    return (
        <div className={`h-[100%] flex flex-row relative w-[48%] ${imageOpacity} transition-all ease-in-out duration-200`}>
            <Image src={currentImage}  alt='advert placement' fill />
            {/* <Image src={adpt1} className={`absolute ${banner2State?'opacity-100':'opacity-0'}`} alt='advert placement' fill /> */}
        </div>
    )
}

export default ChangingNoticeBanner;