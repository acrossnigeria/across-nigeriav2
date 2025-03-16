import Link from "next/link";
import { Cloudinary } from "@cloudinary/url-gen";
import Image from "next/image";
import OptionsIcon from "../../public/images/icon/OptionsIcon";
import Profile from "../../public/images/icon/Profile";
import axios from "axios";
import { useEffect, useState } from "react";

// const cld = new Cloudinary( {
//     cloud: {
//         cloudName:'dcxz7qndp'
//     }
// });

export default function VideoCard( { content }) {
    const [ thumbnailUrl, setThumbnailUrl ] = useState('');
    const link = `/theater-skit-across-nigeria/pages/skit-video/${content?.id}?isNew=false`;

    const getThumbnail = async () => {
        const parts = content.vidUrl.split("/");
        const videoId = `${parts[parts.length-3]}/${parts[parts.length-2]}/${parts[parts.length-1]}`.replace(".mp4", "");
        try {
            const { data } = await axios.get(`/api/cldThumbnail?videoId=${videoId}`);
            setThumbnailUrl(data.thumbnailUrl);
            console.log(data.thumbnailUrl)
        } catch (error) {
            console.log('error generating png'+ error.message);
        }

    }

    useEffect( () => {
        getThumbnail();
    }, [])

    console.log(thumbnailUrl);
    // const thumbnailUrl = cld.image(videoId).setAssetType('video').format('auto:image').toURL().concat('.jpeg');
    // console.log(thumbnailUrl)

    const modifyTitle = ( str ) => {
        const firstWord = str.slice(0, 1).toUpperCase();
        return `${firstWord}${str.slice(1)}`;
    }
    const title = modifyTitle(content.vidTitle);

    return(
            <div className="flex flex-col items-center h-[300px] md:w-[350px] w-full">
                <Link className="w-[100%] hover:opacity-85 flex flex-col" href={link}>
                    <Image 
                    className="h-[225px] w-full p-0" 
                    width={225}
                    height={100}
                    src={thumbnailUrl} 
                    alt={content?.vidTitle}
                    unoptimized
                    />
                    <div className="w-fit h-fit p-2 bg-black/50 text-white text-[13px] absolute mt-[180px] ml-[10px] rounded-[4px]">
                        <span>{content?.vidLength}</span>
                    </div>
                </Link>
                <div className="w-full flex flex-row items-start justify-between gap-2 pt-[10px] px-2">
                    <div className="flex flex-row gap-2 items-start">
                        <Profile size={'45px'}/>
                        <div className="flex flex-col">
                            <div>
                                <Link href={link} style={{lineHeight:'19px'}} className="text-[15px] font-semibold hover:opacity-70 duration-300 transition-all ease-in-out">{title.length>35?title.slice(0, 35).concat('..'):title}</Link>
                            </div>
                            <span style={{lineHeight:'19px'}} className="text-gray-700 text-[14px]">
                                <span >{content?.fullname} • </span>
                                <span>{content?.votes.length} votes • </span>
                                <span>4 days ago</span>
                            </span>
                        </div>
                    </div>
                    <button className="hover:scale-110 hover:opacity-50"><OptionsIcon/></button>
                   
                </div>
            </div>
 
    )
};

