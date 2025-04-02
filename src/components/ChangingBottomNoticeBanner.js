import Image from 'next/image';
import adflat1 from '../../public/images/adflat1.jpg';
import adflat3 from '../../public/images/adflat3.jpg';

const ChangingBottomNoticeBanner = () => {
    return (
        <div className='md:h-[100px] h-[60px] flex-row flex justify-between md:w-[100%] mx-auto w-[100%] mt-[20px] mb-[70px]'>
            <div className="h-[100%] relative w-[49%]">
                <Image src={adflat1} alt='advert placement' fill />
            </div> 
            <div className="h-[100%] relative w-[49%]">
                <Image src={adflat3} alt='advert placement' fill />
            </div> 
        </div>

    )
}

export default ChangingBottomNoticeBanner;