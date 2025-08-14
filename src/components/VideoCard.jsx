import Link from "next/link";
import Image from "next/image";
import { EllipsisVertical, LinkIcon, MessageCircleWarning } from "lucide-react";
import Profile from "../../public/images/icon/Profile";
import axios from "axios";
import { useEffect, useState } from "react";
import ShimmerLoader from "./ui/ShimmerLoader";

export default function VideoCard( { content }) {
    const [ thumbnailUrl, setThumbnailUrl ] = useState(null);
    const link = `/skit-across-nigeria/pgs/video/${content?.id}`;
    const [ showOptions, setShowOptions ] = useState(false);
    const [ shareNotifyBottom, setShareNotifyBottom ] = useState('top-[-50px]');
    const [ shareNotifyOpacity, setShareNotifyOpacity ] = useState('opacity-0');

    const handleOptionsToggle = () => {
        setShowOptions(!showOptions);
        if (!showOptions) {
            setTimeout(() => {
                setShowOptions(false);
            }, 3000);
        }
    }

    const getThumbnail = async () => {
        const parts = content.vidUrl.split("/");
        const videoId = `${parts[parts.length-3]}/${parts[parts.length-2]}/${parts[parts.length-1]}`.replace(".mp4", "");
        try {
            const { data } = await axios.get(`/api/cldThumbnail?videoId=${videoId}&crop=${false}`);
            setThumbnailUrl(data.thumbnailUrl);
        } catch (error) {
            console.log('error generating png'+ error.message);
        }

    }

    useEffect( () => {
        getThumbnail();
    }, [])

    const modifyTitle = ( str ) => {
        const firstWord = str.slice(0, 1).toUpperCase();
        return `${firstWord}${str.slice(1)}`;
    }
    const title = modifyTitle(content.vidCaption);

    const displayShareNotifier = () => {
        setShareNotifyBottom('top-[90px]');
        setShareNotifyOpacity('opacity-100');
        setTimeout(() => {
            setShareNotifyBottom('top-[-50px]');
            setShareNotifyOpacity('opacity-0');
        }, 3000);
    }

    async function handleCopyLink() {
        try {
            await navigator.clipboard.writeText(`https://acrossnig.com/${link}`);
            displayShareNotifier();
        } catch (err) {
        alert('An error occurred when copying ref link: '+ err.message);
        }
    }

    return(
            <div className="flex flex-col items-center font-poppins py-2 md:px-0 px-2 md:w-[350px] w-[100%]">
                <div className={`fixed ${shareNotifyBottom} ${shareNotifyOpacity} transition-all text-[14px] text-center ease-in-out duration-500 z-[2000] bg-white text-gray-600 rounded-[10px] md:w-fit w-[80%] h-fit p-3`}>
                    <span>Link copied, you can now share it</span>
                </div> 
                { thumbnailUrl ? (
                    <Link className="w-full overflow-hidden transition-all duration-300 ease-in-out hover:opacity-85 flex flex-row justify-end" href={link}>
                        <Image 
                        className="h-[400px] rounded-[10px] transition-all ease-in-out duration-250 w-full p-0" 
                        width={225}
                        height={100}
                        src={thumbnailUrl} 
                        alt={content?.vidCaption}
                        unoptimized
                        />
                        <div className="w-fit h-fit p-2 px-3 bg-black/30 backdrop-blur-sm text-white text-[13px] absolute mt-[350px] mr-[10px] rounded-[10px]">
                            <span>{content?.vidLength}</span>
                        </div>
                    </Link>
                ):(
                    <ShimmerLoader className={'w-full'} roundedness={'10px'} width={'100%'} height={'400px'}/>
                )}
                <div className="w-full flex flex-row items-start justify-between gap-2 pt-[15px]">
                    <div className="flex flex-row gap-2 items-start">
                        <Profile bg={'#d1d5db'} size={'45px'}/>
                        <div className="flex flex-col">
                            <div>
                                <Link href={link} style={{lineHeight:'19px'}} className="text-[15px] font-bold hover:opacity-70 duration-300 transition-all ease-in-out">{title.length>35?title.slice(0, 35).concat('..'):title}</Link>
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
                    <button className="w-fit text-black ">
                        <EllipsisVertical className="hover:opacity-50" onClick={handleOptionsToggle} strokeWidth={2} size={'20px'}/>
                        { showOptions && (
                            <div className="flex flex-col border ml-[-195px] rounded-l-[5px] rounded-br-[5px] rounded-tr-0 bg-gray-50 shadow-xl border-gray-300 w-[200px] h-fit absolute">
                                <button onClick={handleCopyLink} className="px-3 py-2 hover:bg-gray-100 transition-all duration-300 ease-in-out flex flex-row items-center gap-2">
                                    <LinkIcon size={'15px'} className="text-gray-800"/>
                                    <span className="text-gray-800 text-[14px]">Copy link</span>
                                </button>
                                <button className="px-3 py-2 hover:bg-gray-100 transition-all duration-300 ease-in-out flex flex-row items-center gap-2">
                                    <MessageCircleWarning size={'15px'} className="text-red-500"/>
                                    <span className="text-red-500 text-[14px]">Report</span>
                                </button>
                            </div>
                        )}
                    </button>
                </div>
            </div>
 
    )
};

