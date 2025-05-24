import { Cloudinary } from "@cloudinary/url-gen";
import Image from "next/image";

const cld = new Cloudinary( {
    cloud: {
        cloudName:'dcxz7qndp'
    }
});

export default function TopSkitCard( { exist, votes, strUrl, description, creator, position } ) {
        // const videoId = strUrl.split('/upload/')[1].replace('mp4','jpeg').split('/')[1];
        // const thumbnailUrl = cld.image(videoId).setAssetType('video').format('auto:image').toURL().concat('.jpeg');

        return (
            <div className='bg-white rounded-[20px] shadow-lg shadow-black/50 flex flex-row justify-between px-[20px] items-center  w-full md:w-[300px] h-[45px]'>
                <div className='flex flex-row gap-2'>
                {exist? (
                    <Image 
                        alt={description} 
                        src={sampleThumbnail} 
                        className='w-[30px] rounded-full h-[30px]'
                        unoptimized
                    />
                    ) : <div className='w-[30px] h-[30px] flex flex-row items-center justify-center bg-gray-300 text-[25px] font-extrabold text-center rounded-[50%]'>?</div>}
                <div className='flex flex-col items-start justify-center h-[30px]'>
                    <span className='text-left px-3 w-[100%] text-[14px]'>{exist ? (description.slice(0, 22).toLowerCase() + '...'):'Position empty'}</span>
                    <span className='text-left px-3 text-gray-600 text-[13px]'>{exist? creator:'?'}</span>
                </div>
                </div>
                <span className='text-[20px] text-[#ffd700] font-extrabold'>{position}</span>
            </div>
        )

}