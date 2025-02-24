import Image from 'next/image';
import adpt1 from '../../public/images/adpt1.jpg';
import ChangingNoticeBanner from './ChangingNoticeBanner';

const NoticeBanner = ( { banner } ) => {
    return (
        <div className='h-[200px] md:h-[300px] flex-row flex justify-between md:w-[95%] mx-auto w-[100%] mt-[50px] mb-[50px]'>
            <div className="h-[100%] relative w-[48%]">
                <Image src={adpt1} alt='advert placement' fill />
            </div> 
            <ChangingNoticeBanner/>
        </div>

    )
}

export default NoticeBanner;