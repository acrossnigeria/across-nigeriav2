import banner from '../../public/images/adbanner.jpg';
import Image from 'next/image';

const NoticeBanner = () => {
    return (
        <div className="md:h-[200px] h-[170px] relative w-[100%] mt-[30px] mb-[30px]">
            <Image src={banner} alt='advert placement' fill />
        </div>
    )
}

export default NoticeBanner;