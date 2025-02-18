import Image from 'next/image';
import adpt1 from '../../public/images/adpt1.jpg';
import adpt2 from '../../public/images/adpt2.jpg';

const NoticeBanner = ( { banner } ) => {
    return (
        <div className='h-[200px] md:h-[300px] flex-row flex md:w-[95%] mx-auto w-[100%] mt-[50px] mb-[50px]'>
            <div className="h-[100%] relative w-[50%]">
                <Image src={adpt1} alt='advert placement' fill />
            </div> 
            <div className="h-[100%] relative w-[50%]">
                <Image src={adpt2} alt='advert placement' fill />
            </div>
        </div>

    )
}

export default NoticeBanner;