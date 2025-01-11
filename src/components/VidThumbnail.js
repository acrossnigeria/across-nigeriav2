import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary( {
    cloud: {
        cloudName:'dcxz7qndp'
    }
});


export default function VidThumbnail( { url }) {
    
    const videoId = url.split('/upload/')[1].replace('mp4','jpeg').split('/')[1];
    const thumbnailUrl = cld.image(videoId).setAssetType('video').format('auto:image').toURL().concat('.jpeg');
    console.log(thumbnailUrl)

    return(
        <div className="h-full w-full flex flex-row justify-center items-center border-gray-400 border-1 rounded-[20px]">
            <img className="h-full w-fit p-0" src={thumbnailUrl} width={20} height={20} alt={videoId}/> 
        </div>

    )
};