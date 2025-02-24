import Image from 'next/image';
import adpt1 from '../../public/images/adpt1.jpg';
import adpt2 from '../../public/images/adpt2.jpg';

const ChangingNoticeBanner = () => {
    return (
        <div className="h-[100%] relative w-[48%]">
            <Image src={adpt2} alt='advert placement' fill />
        </div>
    )
}

export default ChangingNoticeBanner;