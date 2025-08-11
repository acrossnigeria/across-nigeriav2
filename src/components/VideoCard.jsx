import Link from "next/link";
import Image from "next/image";
import { EllipsisVertical } from "lucide-react";
import Profile from "../../public/images/icon/Profile";
import axios from "axios";
import { useEffect, useState } from "react";

export default function VideoCard( { content, isLandscape }) {
    const [ thumbnailUrl, setThumbnailUrl ] = useState(null);
    const link = `/skit-across-nigeria/pgs/video/${content?.id}?isNew=false`;

    const getThumbnail = async () => {
        const parts = content.vidUrl.split("/");
        const videoId = `${parts[parts.length-3]}/${parts[parts.length-2]}/${parts[parts.length-1]}`.replace(".mp4", "");
        try {
            const { data } = await axios.get(`/api/cldThumbnail?videoId=${videoId}&crop=${isLandscape}`);
            setThumbnailUrl(data.thumbnailUrl);
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
    const title = modifyTitle(content.vidCaption);

    return(
            <div className="flex flex-col items-center h-[300px] py-2 md:w-[350px] w-full">
                { thumbnailUrl ? (
                    <Link className="w-full overflow-hidden transition-all duration-300 ease-in-out hover:opacity-85 flex flex-row justify-end" href={link}>
                        <Image 
                        className="h-[225px] brightness-125 transition-all ease-in-out duration-250 w-full p-0" 
                        width={225}
                        height={100}
                        src={thumbnailUrl} 
                        alt={content?.vidCaption}
                        unoptimized
                        />
                        <div className="w-fit h-fit p-2 px-3 bg-black/30 backdrop-blur-sm text-white text-[13px] absolute mt-[170px] mr-[10px] rounded-[10px]">
                            <span>{content?.vidLength}</span>
                        </div>
                    </Link>
                ):(
                    <Link className="w-full relative overflow-hidden transition-all duration-300 ease-in-out hover:opacity-85 flex flex-row justify-end" href={link}>
                        <div className="h-[225px] relative bg-gray-300 animate-pulse w-full p-0">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                        </div>
                        <div className="w-fit h-fit p-2 bg-black/50 text-white text-[13px] absolute mt-[170px] ml-[10px] rounded-[4px]">
                            <span>{content?.vidLength}</span>
                        </div>
                    </Link>
                )}
                <div className="w-full flex flex-row items-start justify-between gap-2 pt-[10px]">
                    <div className="flex flex-row gap-2 items-start">
                        <Profile bg={'#d1d5db'} size={'45px'}/>
                        <div className="flex flex-col">
                            <div>
                                <Link href={link} style={{lineHeight:'19px'}} className="text-[15px] font-semibold hover:opacity-70 duration-300 transition-all ease-in-out">{title.length>35?title.slice(0, 35).concat('..'):title}</Link>
                            </div>
                            <span style={{lineHeight:'19px'}} className="text-gray-700 text-[14px]">
                                <span >{content?.fullname} </span>
                            </span>
                            <span style={{lineHeight:'19px'}} className="text-gray-600 text-[12px]">
                                {/* <span >{content?.votes} vote{content?.votes>1 ? "s" : ""} • </span> */}
                                <span>{content?.createdAt}</span>
                            </span>
                        </div>
                    </div>
                    <button className="hover:scale-110 w-fit text-black hover:opacity-50">
                        <EllipsisVertical strokeWidth={2} size={'20px'}/>
                    </button>
                   
                </div>
            </div>
 
    )
};

