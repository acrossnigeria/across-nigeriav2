import Image from 'next/image';
import adpt2 from '../../public/images/adpt2.jpg';
import ChangingNoticeBanner from './ChangingNoticeBanner';

const AdBanner1 = ( { banner } ) => {
    return (
        <div className='h-[200px] md:h-[300px] flex-row flex justify-between md:w-[95%] mx-auto w-[100%] mt-[50px] mb-[50px]'>
            <div className="h-[100%] relative w-[48%]">
                <Image src={adpt2} alt='advert placement' fill />
            </div> 
            <ChangingNoticeBanner/>
        </div>

    )
}

export default AdBanner1;