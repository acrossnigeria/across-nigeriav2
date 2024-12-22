import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary( {
    cloud: {
        cloudName:'dcxz7qndp'
    }
});

export default function TopSkitCard( { exist, votes, strUrl, description, name, position } ) {
    if (strUrl) {
        const videoId = strUrl.split('/upload/')[1].replace('mp4','jpeg').split('/')[1];
        const thumbnailUrl = cld.image(videoId).setAssetType('video').format('auto:image').toURL().concat('.jpeg');

        return (
            <div className='bg-white rounded-[30px] flex flex-row justify-between px-[20px] items-center shadow-md shadow-green-600 w-full md:w-[300px] h-[60px]'>
                <div className='flex flex-row gap-2'>
                {exist? (votes>0 ? (
                    <img width={10} height={10} alt={description} src={thumbnailUrl} className='w-[45px] rounded-full h-[45px]'/>
                    ) : true ) : <div className='w-[45px] h-[45px] flex flex-row items-center justify-center bg-gray-300 text-[30px] font-extrabold text-center rounded-[50%]'>?</div>}
                <div className='flex flex-col'>
                    <span className='text-left px-3 w-[100%] text-[12px] '>{exist?(votes>0 ? (description.slice(0, 25) + '...'):'Position empty'):'Position empty'}</span>
                    <span className='text-left px-3 text-[14px] font-bold text-green-700'>{exist?(votes>0 ? name:'?'):'?'}</span>
                </div>
                </div>
                <span className='text-[35px] text-[#ffd700] font-extrabold'>{position}</span>
            </div>
        )
    }

}