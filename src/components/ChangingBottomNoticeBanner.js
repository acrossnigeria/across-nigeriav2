import Image from 'next/image';
import adflat1 from '../../public/images/adflat1.jpg';
import adflat3 from '../../public/images/adflat3.jpg';
import { useEffect, useState } from 'react';
import { BearSlideImage } from 'bear-react-carousel';
import Next from '../../public/images/icon/Next';

const ChangingBottomNoticeBanner = ( { adverts, isLoading } ) => {
    const [ advertBanners, setAdvertBanners ] = useState([ 
        { advertImage:adflat1, contactUsButton:{ showContactButton:false } },
        { advertImage:adflat3, contactUsButton:{ showContactButton:false } } 
    ])

    function contactOnWhatsApp(phoneNumber) {
        const message = `Hello! I came across your advert on the Across Nigeria platform and I'm interested. I'd love to know more about what you offer. Thank you!`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');
    }

    useEffect(()=> {
        const bannerList = advertBanners;
        console.log(adverts)
        if ( adverts ) {
            adverts?.map( ( ad, index ) => {
                bannerList[index] = ad;
            });
            setAdvertBanners( [ ...bannerList ]);
        }
    }, [ adverts ])

    return (
        <div className='md:h-[220px] h-[120px] flex-row relative flex justify-between md:w-[100%] mx-auto w-[100%] mt-[20px] mb-[70px]'>
            { isLoading && (
                <>
                <div className="h-[100%] bg-green-500/70 animate-pulse relative w-[49%]">
                </div> 
                <div className="h-[100%] bg-green-500/70 animate-pulse relative w-[49%]">
                </div> 
                </>
            )}
            { !isLoading && (
                <>
                {
                    advertBanners.map((ad, index) => {
                        if ( ad?.contactUsButton?.showContactButton) {
                            return (
                                <div key={index} className="h-[100%] w-[49%] flex flex-col border-1 justify-evenly items-center border-gray-400 bg-gray-200">
                                    <BearSlideImage style={{ height:'85%', width:'99%', borderRadius:'0px'}} imageUrl={ad?.advertImage} />
                                    <div className="flex flex-row justify-between md:px-3 w-[98%] h-[12%] items-center">
                                        <span className="md:text-[12px] text-[10px] text-gray-500">Sponsored</span>
                                        <button onClick={()=>{contactOnWhatsApp(ad?.contactUsButton?.contact)}} className="h-[99%] w-[fit] px-[5px] md:text-[18px] text-[13px] flex flex-row justify-center items-center gap-2 border-1 hover:bg-gray-300 transition-all ease-in-out duration-300 text-gray-500 border-gray-400">
                                            <span>Contact Us</span>
                                            <Next size={'10px'} bg={'gray'}/>
                                        </button>
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div key={index} className="h-[100%] relative w-[49%]">
                                    <Image src={ad?.advertImage} alt='advert placement' fill />
                                </div> 
                            )
                        }
                    })
                } 
                </>
            )}
        </div>

    )
}

export default ChangingBottomNoticeBanner;