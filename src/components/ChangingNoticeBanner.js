import Image from 'next/image';

const ChangingNoticeBanner = ( { banner } ) => {
    return (
        <div className='h-[200px] flex-row flex w-[100%] mt-[30px] mb-[30px]'>
            <div className="h-[100%] relative w-[50%]">
                <Image src={banner} alt='advert placement' fill />
            </div> 
            <div className="h-[100%] relative w-[50%]">
                <Image src={banner} alt='advert placement' fill />
            </div>
        </div>

    )
}

export default ChangingNoticeBanner;