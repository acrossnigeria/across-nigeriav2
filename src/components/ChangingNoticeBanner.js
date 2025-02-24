import Image from 'next/image';
import adpt1 from '../../public/images/adpt1.jpg';
import adpt2 from '../../public/images/adpt2.jpg';
import { useEffect, useState } from 'react';

const ChangingNoticeBanner = () => {
    const [ banner1State, setBanner1State ] = useState(true);
    const [ banner2State, setBanner2State ] = useState(false);

    const changeBanner = () => {
        setBanner1State(!banner1State);
        setBanner2State(banner1State);
        startTimeOut();
    };
    
    const startTimeOut = () => {
        setTimeout(() => {
            changeBanner();
       }, 7000);
    };

    useEffect(() => {
        startTimeOut();
    }, []);

    return (
        <div className="h-[100%] flex flex-row relative w-[48%]">
            <Image src={adpt2} className={`transition-all duration-[1000] ease-in-out ${banner1State?'opacity-100':'opacity-0'}`} alt='advert placement' fill />
            <Image src={adpt1} className={`absolute transition-all duration-[1000] ease-in-out ${banner2State?'opacity-100':'opacity-0'}`} alt='advert placement' fill />
        </div>
    )
}

export default ChangingNoticeBanner;