import Image from 'next/image';
import adpt2 from '../../public/images/adpt2.jpg';
import ChangingAdvertBanner from './ChangingAdvertBanner';
import { useEffect, useState } from 'react';
import { BearSlideImage } from 'bear-react-carousel';
import Next from '../../public/images/icon/Next';

const SilverAdvertComponent = ( { isLoading, adverts } ) => {
    const [ scrollAdverts, setScrollAdverts ] = useState([]);
    const [ staticAdvert, setStaticAdvert ] = useState(null);

    useEffect( () => {
        const tempScrollAdverts = [];
        adverts?.map( ( ad ) => {
            if (ad.displayMode === "scroll") {
                tempScrollAdverts.push(ad);
            } 
            if (ad.displayMode === "static") {
                setStaticAdvert(ad)
            } 
        });
        setScrollAdverts(tempScrollAdverts);
    }, [ isLoading, adverts ]);

    function contactOnWhatsApp(phoneNumber) {
        const message = `Hello! I came across your advert on the Across Nigeria platform and I'm interested. I'd love to know more about what you offer. Thank you!`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');
    }
    
    return (
        <>
           { (isLoading) && (
                <div className='h-[200px] md:h-[300px] flex-row flex justify-between md:w-[95%] mx-auto w-[100%] mt-[50px] mb-[50px]'>
                    <div className="h-[100%] relative bg-gray-200 animate-pulse rounded-[5px] w-[48%]">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                    </div> 
                    <div className="h-[100%] relative bg-gray-200 animate-pulse rounded-[5px] w-[48%]">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                    </div>  
                </div>
            )}
            { (!isLoading ) &&  (
                <div className='h-[200px] md:h-[300px] flex-row flex justify-between md:w-[95%] mx-auto w-[100%] mt-[50px] mb-[50px]'>
                    <ChangingAdvertBanner scrollData={scrollAdverts}/>
                    { ( staticAdvert?.contactUsButton?.showContactButton) && (
                            <div className="h-[100%] w-[49.5%] flex flex-col border-1 justify-evenly items-center border-gray-400 bg-gray-200">
                                <BearSlideImage style={{ height:'85%', width:'99%', borderRadius:'0px'}} imageUrl={staticAdvert?.advertImage} />
                                <div className="flex flex-row justify-between md:px-3 w-[98%] h-[12%] items-center">
                                    <span className="md:text-[12px] text-[10px] text-gray-500">Sponsored</span>
                                    <button onClick={()=>{contactOnWhatsApp(staticAdvert?.contactUsButton?.contact)}} className="h-[99%] w-[fit] px-[5px] md:text-[18px] text-[13px] flex flex-row justify-center items-center gap-2 border-1 hover:bg-gray-300 transition-all ease-in-out duration-300 text-gray-500 border-gray-400">
                                        <span>Contact Us</span>
                                        <Next size={'10px'} bg={'gray'}/>
                                    </button>
                                </div>
                            </div>
                        )
                    }
                    { (!( staticAdvert?.contactUsButton?.showContactButton) || !staticAdvert) && (
                            <div className="h-[100%] relative w-[49.5%]">
                                <Image src={staticAdvert?staticAdvert.advertImage:adpt2} alt='advert placement' fill />
                            </div> 
                        )
                    }
                </div>
            )}
        </>

    )
}

export default SilverAdvertComponent;