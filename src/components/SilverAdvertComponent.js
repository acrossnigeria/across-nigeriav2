import Image from 'next/image';
import adpt2 from '../../public/images/adpt2.jpg';
import ChangingAdvertBanner from './ChangingAdvertBanner';
import { useEffect, useState } from 'react';

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
    
    return (
        <>
           { (isLoading) && (
                <div className='h-[200px] md:h-[300px] flex-row flex justify-between md:w-[95%] mx-auto w-[100%] mt-[50px] mb-[50px]'>
                    <div className="h-[100%] bg-gray-400 animate-pulse rounded-[5px] w-[48%]"></div> 
                    <div className="h-[100%] bg-gray-400 animate-pulse rounded-[5px] w-[48%]"></div> 
                </div>
            )}
            { (!isLoading ) &&  (
                <div className='h-[200px] md:h-[300px] flex-row flex justify-between md:w-[95%] mx-auto w-[100%] mt-[50px] mb-[50px]'>
                    <ChangingAdvertBanner scrollData={scrollAdverts}/>
                    <div className="h-[100%] relative w-[48%]">
                        <Image src={staticAdvert?staticAdvert.advertImage:adpt2} alt='advert placement' fill />
                    </div> 
                </div>
            )}
        </>

    )
}

export default SilverAdvertComponent;