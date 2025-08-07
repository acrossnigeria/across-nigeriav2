import { useEffect, useState } from "react"
import Close from "../../public/images/icon/Close"
import OptionsIcon from "../../public/images/icon/OptionsIcon"
import ShareSkitModal from "./ShareSkitModal";
import Link from "next/link";
import Image from "next/image";
import DeleteSkitModal from "./DeleteSkitMoal";

const ManageSkitCard = ( { title, caption, votes, vidUrl, id, vidLength }) => {
    const [ showOptions, setShowOptions ] = useState(false);
    const [ optionsHeight, setOptionsHeight ] = useState('h-[0px] opacity-0');

    const [ shareModal, setshareModal ] = useState(false);
    const [ shareModalOpacity, setShareModalOpacity ] = useState('opacity-0');
    const [ shareBgOpacity, setShareBgOpacity ] = useState('opacity-0');

    const [ delModal, setDelModal ] = useState(false);
    const [ delModalOpacity, setDelModalOpacity ] = useState('opacity-0');
    const [ delBgOpacity, setDelBgOpacity ] = useState('opacity-0');

    const [ thumbnailUrl, setThumbnailUrl ] = useState(null);
    const link = `/theater-skit-across-nigeria/pages/skit-video/${id}`;

    const setOptions = ( transition ) => {
        if (transition === 'in') {
            setShowOptions(true);
            setTimeout(() => {
                setOptionsHeight('h-fit opacity-100');
            }, 500);
        } else {
            setOptionsHeight('h-0 opacity-0');
            setTimeout(() => {
                setShowOptions(false); 
            }, 500);
        };
    }

    const setShare = (transition) => {
        if (transition === 'in') {
            setshareModal(true);
            setOptions('out');
            setShareModalOpacity('opacity-100');
            setShareBgOpacity('opacity-100');
        } else {
            setShareModalOpacity('opacity-0');
            setShareBgOpacity('opacity-0')
            setTimeout(() => {
                setshareModal(false);
            }, 500);
        };
    }

    const setDelete = (transition) => {
        if (transition === 'in') {
            setDelModal(true);
            setOptions('out');
            setDelModalOpacity('opacity-100');
            setDelBgOpacity('opacity-100');
        } else {
            setDelModalOpacity('opacity-0');
            setDelBgOpacity('opacity-0')
            setTimeout(() => {
                setDelModal(false);
            }, 500);
        };
    }

    const getThumbnail = async () => {
        const parts = vidUrl.split("/");
        const videoId = `${parts[parts.length-3]}/${parts[parts.length-2]}/${parts[parts.length-1]}`.replace(".mp4", "");
        try {
            const { data } = await axios.get(`/api/cldThumbnail?videoId=${videoId}`);
            setThumbnailUrl(data.thumbnailUrl);
        } catch (error) {
            console.log('error generating png'+ error.message);
        }

    }

    useEffect(() => {
        getThumbnail();
    }, [])

    return (
        <div className="flex flex-row h-[120px] md:h-[150px] gap-2 w-[100%]">
            { shareModal && 
                <ShareSkitModal bgOpacity={shareBgOpacity} modalOpacity={shareModalOpacity} closeFunction={setShare} link={`https://acrossnig.com/theater-skit-across-nigeria/pages/skit-video/${id}`}/>
            }
            { delModal && 
                <DeleteSkitModal bgOpacity={delBgOpacity} modalOpacity={delModalOpacity} closeFunction={setDelete} id={id}/>
            }
            { thumbnailUrl ? (
                <Link className="w-[100%] hover:opacity-85 flex flex-col" href={link}>
                    <Image 
                    className="h-[120px] md:h-[150px] w-[40%] p-0" 
                    width={225}
                    height={100}
                    src={thumbnailUrl} 
                    alt={title}
                    unoptimized
                    />
                    <div className="w-fit h-fit p-2 bg-black/50 text-white text-[13px] absolute mt-[140px] ml-[10px] rounded-[4px]">
                        <span>{vidLength}</span>
                    </div>
                </Link>
            ):(
                <div className="w-[40%] bg-gray-300 animate-pulse rounded-[4px]"></div>
            )}
            <div className="w-[55%] flex flex-row items-start justify-between">
                <div className="flex flex-col gap-1">
                    <Link href={`/theater-skit-across-nigeria/pages/skit-video/${id}`}><span className="text-[15px] font-bold">{title.slice(0, 20)+'...'}</span></Link>
                    <span className="text-[14px] text-gray-600">{caption.slice(0, 20)+'...'}</span>
                    <span className="text-[14px] font-semibold">{votes} Votes</span>
                </div>
                <div  className="flex flex-col w-fit cursor-pointer">
                    <button className="h-fit w-fit" onClick={()=>{setOptions('in')}}>
                        <OptionsIcon/>
                    </button>
                   { showOptions && 
                        <div className={`flex absolute w-[120px] overflow-hidden transition-all ease-in-out duration-500 ${optionsHeight} text-[14px] flex-col ml-[-120px] text-gray-800 mt-[10px] bg-gray-100 shadow-sm border-1 border-gray-300 rounded-[3px]`}>
                            <button onClick={()=>{setOptions('out')}} className="w-fit p-2 self-end z-10 hover:bg-gray-300 rounded-full"><Close size={'10px'} bg={'black'}/></button>
                            <button onClick={()=>{setShare('in')}} className="border-b-1 hover:bg-gray-200 h-[30px] hover:text-black border-b-gray-300">Share</button>
                            <button onClick={()=>{setDelete('in')}} className="hover:bg-gray-200 text-red-500 h-[30px] hover:text-red-600">Delete</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ManageSkitCard