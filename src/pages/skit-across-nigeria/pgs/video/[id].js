"use client"
/**
 * Safely sets meta, link, and title tags for SEO and social.
 *
 * @param {Object} config
 * @param {string} config.title - The page title
 * @param {string} config.description - Description meta
 * @param {string} config.keywords - Keywords meta
 * @param {string} config.image - Social share image
 * @param {string} config.url - Canonical page URL
*/

import { useRouter } from "next/router";
import axios from "axios";
import 'next-cloudinary/dist/cld-video-player.css';
import { useState, useEffect } from "react";
import Profile from "../../../../../public/images/icon/Profile";
import Link from "next/link";
import dynamic from 'next/dynamic'; // Import dynamic
import { useSession } from "next-auth/react";
import ReloadIcon from "../../../../../public/images/icon/ReloadIcon";
import Image from "next/image";
import logo1 from "../../../../../public/images/logo1.png";
import Close from "../../../../../public/images/icon/Close";
import CopyLink from "../../../../../public/images/icon/CopyLink";
import FbIcon from "../../../../../public/images/icon/FbIcon";
import IgIcon from "../../../../../public/images/icon/IgIcon";
import WhatappIcon from "../../../../../public/images/icon/WhatappIcon";
import SkitSuccessModal from "@/components/SkitSuccessModal";
import { ChevronLeft, ChevronRight, CirclePlus, EllipsisVertical, Heart, House, MessageSquareText, Pause, Play, PlayCircle, Send, SendHorizonal, SendHorizontalIcon, SendToBack, Share, Share2, UserCircle, Vote } from "lucide-react";
import ProcessLoader from "@/components/ui/ProcessLoader";
import VoteModal from "../../components/VoteModal";
import setRealVH from "../../../../../utils/setRealVH";
import { set } from "lodash";
import { arrangeText, shortenText } from "../../../../../utils/textFormat";
import { data } from "autoprefixer";

// Dynamically import ReactPlayer with SSR disabled
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });


export default function SkitScreen(props) {

    const router = useRouter();
    const params = router.query;
    const { status, data:session } = useSession();
    const message = '🔥 Check out this amazing skit on [Your Platform Name]! 😂🎭 The creator is competing to win cash prizes! 🏆💰 Support them by watching and voting for your favorite skit. Every vote counts! Cast yours now! 🚀✨';
    const skitLink = `https://acrossnig.com/theater-skit-across-nigeria/pages/skit-video/${params.id}`;
    const encodedMessage = encodeURIComponent(message + ' ' + skitLink);

    const shareLinks = {
        whatsapp: `https://wa.me/?text=${encodedMessage}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(skitLink)}`,
    };

    const [ isMobile, setIsMobile ] = useState(false);
    const [ descriptionLength, setDescriptionLength ] = useState(70);
    const [ data, setData ] = useState(null);
    const [ loadingData, setLoadingData ] = useState(true);
    const [ dataSuccess, setDataSuccess ] = useState(true);
    const [ title, setTitle ] = useState('');
    const [ skitVotes, setSkitVotes ] = useState(0);

    const [ errorGettingSkit, setErrorGettingSkit ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');

    const [ nlModalOpacity, setNlModalOpacity ] = useState('opacity-0');
    const [ nlBgOpacity, setNlBgOpacity ] = useState('opacity-0');
    const [ showModal, setShowModal ] = useState(false);

    const [ playerOpacity, setPlayerOpacity ] = useState('opacity-0');

    const [ shareNotifyBottom, setShareNotifyBottom ] = useState('top-[-50px]');
    const [ shareNotifyOpacity, setShareNotifyOpacity ] = useState('opacity-0')

    const [ showShareModal, setShowShareModal ] = useState(false);
    const [ ssModalOpacity, setSsModalOpacity ] = useState('opacity-100');
    const [ ssBgOpacity, setSsBgOpacity ] = useState('opacity-100');

    const [ uploadModal, setUploadModal ] = useState(false);
    const [ uModalOpacity, setUModalOpacity ] = useState('opacity-100');
    const [ uBgOpacity, setUBgOpacity ] = useState('opacity-100');


    // State to track player
    const [ isPlaying, setIsPlaying ] = useState(true);
    const [ hasProgressed, setHasProgressed ] = useState(0);
    const [ isBuffering, setIsBuffering ] = useState(false);

    // state to track modal display
    const [ showVoteModal, setShowVoteModal ] = useState(false);

    // displays voting modal
    const voteModal = () => {  
        setShowVoteModal(!showVoteModal);
        setIsPlaying(false);
    }


    const [isClient, setIsClient] = useState(false); // State to track client-side rendering

    useEffect(() => {
        if (isClient) { // Only run this code after the component is mounted on the client
            const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) && window.matchMedia('(max-width: 600px)').matches;
            setIsMobile(isMobileDevice);
            getVideoData(); // get datas for video
        }
    }, [isClient]);

    useEffect(() => {
        // This will only run on the client
        setIsClient(true); // Update the state to indicate we're on the client
    }, []);


    const getVideoData = async () => {
        async function getData(user) {
            try {
                if ( params.id ) {
                    setLoadingData(true)
                    const response = await axios.get(`/api/media/skit_across_nigeria/skit?id=${ params?.id }&type=single${user?`&user=${user}`:''}`);
                    const videoData = response.data.vidData;
                    setData(videoData);
                    setLoadingData(false);
                    setDataSuccess(true);
                    setTitle(videoData?.vidTitle);
                    setSkitVotes(videoData?.votes);
                    setErrorGettingSkit(false);
                    if (params?.isNew === 'true' || params?.isNew === true) {
                        setUploadModal(true);
                    }
                }
            } catch(error) {
                setLoadingData(false);
                setDataSuccess(false);
                setErrorGettingSkit(true);
                setErrorMessage('Something went wrong, '+error.message)
            }
        }
        if ( session?.user?.name ) {
            const user = session?.user?._id;
            getData(user);
            } else {
                getData(null);
            }
    }
    

    const displayShareNotifier = () => {
        setShareNotifyBottom('top-[120px]');
        setShareNotifyOpacity('opacity-100');
        setTimeout(() => {
            setShareNotifyBottom('top-[-50px]');
            setShareNotifyOpacity('opacity-0');
        }, 3000);
    }

    async function copyShareLink() {
        try {
        await navigator.clipboard.writeText(`https://acrossnig.com/theater-skit-across-nigeria/pages/skit-video/${params?.id}`);
        displayShareNotifier();
        } catch (err) {
        alert('An error occurred when copying ref link');
        }
    }

    const reload = () => {
        setErrorGettingSkit(false);
        getVideoData();
    }

    const notLoggedIn = (transiton) => {
        if (transiton==='in') {
            setShowModal(true);
            setTimeout(() => {
                setNlBgOpacity('opacity-100');
                setNlModalOpacity('opacity-100');
            }, 300);
        } else {
            setNlBgOpacity('opacity-0');
            setNlModalOpacity('opacity-0');
            setTimeout(() => {
                setShowModal(false);
            }, 1000);
        }
    }

    const shareModal = (transiton) => {
        if (transiton==='in') {
            setShowShareModal(true);
            setTimeout(() => {
                setSsBgOpacity('opacity-100');
                setSsModalOpacity('opacity-100');
            }, 300);
        } else {
            setSsBgOpacity('opacity-0');
            setSsModalOpacity('opacity-0');
            setTimeout(() => {
                setShowShareModal(false);
            }, 1000);
        }
    }

    const uploadSuccess = (transiton) => {
        if (transiton==='in') {
            setUploadModal(true);
            setTimeout(() => {
                setUBgOpacity('opacity-100');
                setUModalOpacity('opacity-100');
            }, 300);
        } else {
            setUBgOpacity('opacity-0');
            setUModalOpacity('opacity-0');
            setTimeout(() => {
                setUploadModal(false);
            }, 1000);
        }
    }

    const handlePlayer = () => {
        if ( !isPlaying ) {
            setTimeout(() => {
                setPlayerOpacity('opacity-0');
            }, 1000);
        } else {
            setPlayerOpacity('opacity-100');
        }
        setIsPlaying(!isPlaying);
    };

    
    setRealVH();
    
    useEffect( () => {
        document.addEventListener("DOMContentLoaded", () => {
            configureMeta( 
                `"${data?.vidTitle}" by ${data?.fullname}`,
                `"Watch and vote ${data?.fullname} skit so they can win the skits across nigeria show`,
                "Acrossnig, Across nigeria, Across Nigeria Reality Show, Reality Show, Skit Show, Vote, Skit Challenge, Skit Competition",
                "/images/skitBanner.JPG",
                `https://acrossnig.com/video/${params?.id}`
            );
        })
    }, [ data ]);


    return(
        <>
        { !isClient ? (
            <div style={{height:`calc(var(--vh, 1vh)*100)`}} className="flex bg-gray-100 items-center gap-2 justify-center">
                <ProcessLoader color={'black'} size={'35px'} />
                <p>Loading...</p>
            </div>
        ):(
            <div style={{height:`calc(var(--vh, 1vh)*100)`}}  className='w-screen flex flex-col items-center bg-gray-950'>
                <VoteModal setNewVotes={setSkitVotes} userId={session?.user?._id} skitId={params?.id} userEmail={session?.user?.email} setShowVoteModal={setShowVoteModal} showVoteModal={showVoteModal} />
                <div className={`flex md:w-[50%] mx-auto rounded-[20px] justify-center items-center gap-4 flex-col`}>
                { uploadModal && 
                    <SkitSuccessModal closeFunction={uploadSuccess} bgOpacity={uBgOpacity} modalOpacity={uModalOpacity}/>
                }
                { showModal && 
                    <div style={{height:`calc(var(--vh, 1vh)*100)`}}  className={`fixed ${nlBgOpacity} transition-all duration-300 ease-in-out backdrop-blur-sm w-screen flex flex-co items-center justify-center gap-3 bg-black/50 z-[1000] top-0`}>
                        <div className="h-fit flex flex-col justify-center w-[100%] items-center">
                            <button onClick={()=>{notLoggedIn('out')}} className="border-1 text-[14px] flex flex-row gap-2 text-white hover:bg-green-600/50 hover:scale-105 transition-all duration-300 ease-in-out justify-center items-center px-[20px] py-1 rounded-[20px] mb-[20px] border-gray-100">
                                <Close bg={'white'} size={'15px'}/>
                                Close
                            </button>
                            <div className={`overflow-hidden h-[400px] md:w-[400px] transition-all duration-500 ease-in-out w-[80%] text-center ${nlModalOpacity} p-3 flex flex-col justify-center items-center bg-gray-100 rounded-[5px]`}>
                                <div className='text-center mb-[35px] flex flex-row justify-center gap-1 items-center'>
                                    <Image src={logo1} alt='logo' placeholder='blur' className='h-[30px] w-[35px]' />
                                    <div className='flex flex-col justify-center items-start gap-0'>
                                        <span className='text-[12px] font-semibold text-green-700'>ACROSS NIGERIA</span>
                                        <span className='text-[10px] text-green-500'>REALITY SHOW</span>
                                    </div>
                                </div>
                                <span className="text-[14px]">Oops! You have to Log In or Register</span>
                                <div className="flex mt-[20px] flex-col items-center gap-2">
                                    <button onClick={()=>router.push('/account/reg')} className="h-[40px] px-[20px] text-white bg-green-500 hover:bg-green-700 rounded-[20px]">Register Now</button>
                                    <button onClick={()=>router.push('/account/login')} className="text-gray-600 hover:text-black">Log In</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    }

                { showShareModal && 
                    <div style={{height:`calc(var(--vh, 1vh)*100)`}}  className={`fixed ${ssBgOpacity} transition-all duration-300 ease-in-out backdrop-blur-sm w-screen flex flex-co items-center justify-center gap-3 bg-black/50 z-[1000] top-0`}>
                        <div className="h-fit flex flex-col justify-center w-[100%] items-center">
                            <button onClick={()=>{shareModal('out')}} className="border-1 text-[14px] flex flex-row gap-2 text-white hover:bg-green-600/50 hover:scale-105 transition-all duration-300 ease-in-out justify-center items-center px-[20px] py-1 rounded-[20px] mb-[20px] border-gray-100">
                                <Close bg={'white'} size={'15px'}/>
                                Close
                            </button>
                            <div className={`overflow-hidden h-[240px] md:w-[400px] transition-all duration-500 ease-in-out w-[80%] text-center ${ssModalOpacity} p-3 md:p-5 flex flex-col justify-center items-center bg-gray-100 rounded-[5px]`}>
                                <div className='text-center mb-[35px] flex flex-row justify-center gap-1 items-center'>
                                    <Image src={logo1} alt='logo' placeholder='blur' className='h-[30px] w-[35px]' />
                                    <div className='flex flex-col justify-center items-start gap-0'>
                                        <span className='text-[12px] font-semibold text-green-700'>ACROSS NIGERIA</span>
                                        <span className='text-[10px] text-green-500'>REALITY SHOW</span>
                                    </div>
                                </div>
                                <span className="text-[14px]">Share it!, Share to friends and families for them to watch and vote for you.</span>
                                <div className="flex pt-[15px] mt-[15px] flex-row items-center justify-evenly gap-2 border-t-1 w-full border-t-gray-500">
                                    <button onClick={copyShareLink} className="h-[60px] text-[14px] hover:scale-105 transition-all duration-400 ease-in-out hover:opacity-75 flex flex-col justify-center items-center gap-2 ">
                                    <div className="w-[45px] flex flex-col justify-center items-center h-[45px] border-1 border-gray-800 rounded-full">
                                        <CopyLink size={'40px'}/>
                                        </div>
                                        <span>Copy link</span>
                                    </button>
                                    <a  href={shareLinks.whatsapp}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="h-[60px] text-[14px] hover:scale-105 transition-all duration-400 ease-in-out hover:opacity-75 flex flex-col justify-center items-center gap-2 ">
                                    <div className="w-[45px] flex flex-col justify-center items-center h-[45px] rounded-full">
                                        <WhatappIcon size={'40px'}/>
                                        </div>
                                        <span>Whatsapp</span>
                                    </a>
                                    <a  href={shareLinks.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="h-[60px] text-[14px] hover:scale-105 transition-all duration-400 ease-in-out hover:opacity-75 flex flex-col justify-center items-center gap-2 ">
                                    <div className="w-[45px] flex flex-col justify-center items-center h-[45px] rounded-full">
                                        <FbIcon size={'40px'}/>
                                        </div>
                                        <span>Facebook</span>
                                    </a>
                                    <button onClick={copyShareLink} className="h-[60px] text-[14px] hover:scale-105 transition-all duration-400 ease-in-out hover:opacity-75 flex flex-col justify-center items-center gap-2 ">
                                    <div className="w-[45px] flex flex-col justify-center items-center h-[45px] rounded-full">
                                        <IgIcon size={'40px'}/>
                                        </div>
                                        <span>Instagram</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                { errorGettingSkit && 
                    <div style={{height:`calc(var(--vh, 1vh)*100)`}} className='w-full pt-[30px] flex flex-col justify-center items-center gap-10'>
                        <div className='text-gray-300 font-light text-center md:w-[30%] w-[90%] mx-auto text-[13px]'>Please check your internet connection</div>
                        <button onClick={reload} className='flex text-white flex-col justify-center hover:scale-105 transition-all ease-in-out duration-300 hover:opacity-50 items-center gap-3'>
                            <span className=''>Tap to retry</span>
                            <ReloadIcon size={'50px'} bg={'white'}/>
                        </button>
                    </div>
                }
                <div style={{height:`calc(var(--vh, 1vh)*100)`}} className={` md:max-w-[400px] w-screen flex flex-col justify-center item-center md:rounded-[5px] overflow-hidden bg-black`}>
                    { typeof window !== "undefined" && ( loadingData ? ( 
                            <div className="h-full w-full flex flex-col bg-transparent justify-center items-center">
                                <ProcessLoader color={'white'} size={'35px'}/>
                            </div>
                        ) : (
                            ( dataSuccess ? (
                                <div className="h-full w-full relative flex flex-col justify-center items-center">
                                    <div className="h-[7px] md:max-w-[400px] z-[1000] w-screen absolute top-0 self-start">
                                        <div style={{width:`${hasProgressed * 100}%`}} className={`transition-width ease-in-out duration-350 rounded-r-full h-full bg-green-500`}></div>
                                    </div>
                                    <div style={{height:`calc(var(--vh, 1vh)*100)`}} onClick={handlePlayer} className={`${playerOpacity} cursor-pointer transition-all ease-in-out duration-350 w-full z-50 items-center justify-center flex flex-col bg-transparent absolute`}>
                                        <button className=" w-fit hover:opacity-50 z-[5000] transition-opacity cursor-pointer p-3 bg-black/30 backdrop-blur-sm rounded-full items-center gap-1">
                                            { isPlaying ? <Play fill="white" strokeWidth={1} size={'40px'} className="text-white"/> : <Pause fill="white" strokeWidth={1} size={'40px'} className="text-white"/> }
                                        </button>
                                    </div>
                                    <div className="relative h-full w-full">
                                        <ReactPlayer
                                            url={data?.vidUrl} 
                                            pip={true} 
                                            width={'100%'} 
                                            height={'100%'} 
                                            controls={false}
                                            playsinline={true}
                                            autoPlay={true}
                                            playing={isPlaying}
                                            loop={true}
                                            onProgress={( { played })=>{setHasProgressed(played)}}
                                            onBuffer={() => setIsBuffering(true)}
                                            onBufferEnd={() => setIsBuffering(false)}
                                            onReady={() => setIsPlaying(true)}
                                            config={{
                                                file: {
                                                    attributes: {
                                                    disablekb: 1,  // Disable keyboard shortcuts
                                                    fullscreen: false,  // Disable fullscreen
                                                    }
                                                }
                                            }}
                                            />
                                        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-10 pointer-events-none" />
                                        { isBuffering && (
                                            <div className="absolute top-0 left-0 w-full h-full bg-transparent flex flex-col justify-center items-center z-10 pointer-events-none">
                                                <ProcessLoader color={'gray'} size={'40px'}/>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                ): (
                                <div className="flex flex-col h-full w-full justify-center items-center">
                                        <span>An error occurred</span>
                                </div> 
                                )
                            )
                        )
                    )
                    }
                </div> 
                <div className={`fixed ${shareNotifyBottom} ${shareNotifyOpacity} transition-all text-center ease-in-out duration-500 bg-gray-100 z-[2000] text-gray-600 rounded-[20px] md:w-fit w-[80%] border-1 border-green-500 h-fit p-3`}>
                    <span>Link copied, you can now share it</span>
                </div> 
                <div className={`w-full md:max-w-[400px] absolute z-[1000] bottom-0 text-white flex flex-col md:pl-[2%] pl-[3%] `}>
                    <div className="flex w-[84%] flex-col py-2 pb-[40px] items-center">
                        <div className="flex w-full flex-row md:text-[18px] text-[16px] items-center gap-2">
                            { loadingData ? (
                                <div className="flex flex-row gap-3 items-center">
                                    <div className="bg-gray-800 relative overflow-hidden h-[45px] w-[45px] rounded-full">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                                    </div>
                                    <div className="h-[30px] w-[200px] relative overflow-hidden bg-gray-800 rounded-[15px]">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                                    </div>
                                </div>
                            ): (
                                <div className="flex flex-row gap-2 items-center">
                                    <Profile bg={'#d1d5db'} size={'38px'}/>
                                    <div className="flex flex-col leading-tight justify-center">
                                        <span className="text-[15px] font-normal">{shortenText(data?.fullname, 17)}</span> 
                                        <span className="text-[11px]">Creator</span>
                                    </div>
                                    <button onClick={voteModal} className={`text-black text-[15px] z-[2000] bg-white bg-transparent border-1 border-white px-9 flex flex-row gap-1 items-center justify-center py-1 hover:text-black rounded-[30px] hover:bg-white/50 transition-all duration-300 ease-in-out`}>
                                        <span>Vote</span>
                                    </button>
                                </div>
                            )}

                        </div>

                        <div className="flex flex-col w-full mt-3 mb-1 gap-1">
                            { loadingData ? ( 
                                    <div className="h-[25px] w-full relative overflow-hidden bg-gray-800 rounded-[5px]">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                                    </div>
                            ): (
                                    <span className="text-[17px] leading-tight font-semibold">{shortenText(arrangeText(title), 40)}</span>
                            )}
                        </div>
                        
                    </div>
                </div> 
            </div>

            { !loadingData && (
                <div className={`w-full md:max-w-[400px] absolute bottom-0 text-white h-[40%] items-end pb-[80px] flex flex-row justify-end md:pr-[2%] pr-[3%]`}>
                    <div className="flex flex-col gap-5 z-[1000]">
                        {/* <div className="flex flex-col hover:opacity-50 transition-opacity cursor-pointer items-center w-fit">
                            <Vote size={'30px'} color="white"/>
                            <span className="text-[16px] font-semibold">{skitVotes?skitVotes:0}</span>
                        </div> */}
                        <button onClick={()=>{shareModal('in')}} className="hover:opacity-50 transition-opacity p-3 mb-5 bg-black/50 backdrop-blur-sm rounded-full cursor-pointer w-fit gap-1">
                            <SendHorizontalIcon strokeWidth={1.5} size={'30px'} color="white"/>
                        </button>
                        <button className=" w-fit hover:opacity-50 transition-opacity cursor-pointer p-3 bg-black/50 backdrop-blur-sm rounded-full items-center gap-1">
                            <EllipsisVertical strokeWidth={1.5} size={'30px'} color="white"/>
                        </button>
                    </div>
                </div>
            )}

            <div className={'absolute top-0 left-0 w-full flex z-[1000] flex-row justify-between items-center px-[2.5%] pt-5 py-3 bg-transparent'}>
                <Link href={'/skit-across-nigeria/pages'} className="flex flex-row text-[19px] font-light gap-2 justify-center hover:text-gray-400 items-center w-fit text-white">
                    <ChevronLeft size={'30px'} className="text-white"/>
                    <span>Watch others</span>
                </Link>
            </div>
        
            </div>
        )}
        </>
  )
}






