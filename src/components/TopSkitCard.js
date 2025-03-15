import { Cloudinary } from "@cloudinary/url-gen";
import sampleThumbnail from "../../public/images/sample.PNG";
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
            <div className='bg-white rounded-[30px] flex flex-row justify-between px-[20px] items-center shadow-md shadow-green-600 w-full md:w-[300px] h-[60px]'>
                <div className='flex flex-row gap-2'>
                {exist? (
                    <Image 
                        alt={description} 
                        src={sampleThumbnail} 
                        className='w-[45px] rounded-full h-[45px]'
                        unoptimized
                    />
                    ) : <div className='w-[45px] h-[45px] flex flex-row items-center justify-center bg-gray-300 text-[30px] font-extrabold text-center rounded-[50%]'>?</div>}
                <div className='flex flex-col'>
                    <span className='text-left px-3 w-[100%] md:text-[14px] font-semibold '>{exist ? (description.slice(0, 22) + '...'):'Position empty'}</span>
                    <span className='text-left px-3 text-green-700 md:text-[14px]'>{exist? creator:'?'}</span>
                </div>
                </div>
                <span className='text-[35px] text-[#ffd700] font-extrabold'>{position}</span>
            </div>
        )

}