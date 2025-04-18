import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

export default function VidThumbnail( { url, videoId }) {
    const [ thumbnailUrl, setThumbnailUrl ] = useState('');

    const getThumbnail = async () => {
        try {
            const { data } = await axios.get(`/api/cldThumbnail?videoId=${videoId}`);
            setThumbnailUrl(data.thumbnailUrl);
        } catch (error) {
            console.log('error generating png'+ error.message);
        }

    }
    useEffect( () => {
        getThumbnail();
    }, [])
    // const thumbnailUrl = cld.image(videoId).setAssetType('video').format('auto:image').toURL().concat('.jpeg');
    // console.log(thumbnailUrl)

    return(
        <div className="h-full w-full flex flex-row justify-center items-center border-gray-400 border-1 rounded-[5px]">
            <Image 
            className="h-full w-full p-0" 
            width={225}
            height={100}
            src={thumbnailUrl} 
            alt={'thumbnail'}
            unoptimized
            />
        </div>

    )
};