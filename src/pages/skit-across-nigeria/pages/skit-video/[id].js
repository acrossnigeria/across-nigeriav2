"use client"
import Layout from "@/components/Layout";
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
import { ChevronRight, CirclePlus, House, PlayCircle, Share2, UserCircle, Vote } from "lucide-react";
import ProcessLoader from "@/components/ui/ProcessLoader";
import VoteModal from "../../components/VoteModal";
import BottomNav from "../../components/BottomNav";

// Dynamically import ReactPlayer with SSR disabled
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });


export default function SkitScreen(props){

    const router = useRouter();
    const params = router.query;
    const { status, data: session } = useSession();
    const message = '🔥 Check out this amazing skit on [Your Platform Name]! 😂🎭 The creator is competing to win cash prizes! 🏆💰 Support them by watching and voting for your favorite skit. Every vote counts! Cast yours now! 🚀✨';
    const skitLink = `https://acrossnig.com/theater-skit-across-nigeria/pages/skit-video/${params.id}`;
    const encodedMessage = encodeURIComponent(message + ' ' + skitLink);

    const shareLinks = {
        whatsapp: `https://wa.me/?text=${encodedMessage}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(skitLink)}`,
    };

    const [ isMobile, setIsMobile ] = useState(false);
    const [ descriptionLength, setDescriptionLength ] = useState(50);
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


    const modifyTitle = ( str ) => {
        const firstWord = str.slice(0, 1).toUpperCase();
        return `${firstWord}${str.slice(1)}`;
    }

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
        
    const descriptionView = () => {
        if (descriptionLength===data?.vidCaption.length) {
            setDescriptionLength(120);
        } else {
            setDescriptionLength(data?.vidCaption.length)
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
        setIsPlaying(!isPlaying);
    };


    return(
        <>
        { !isClient ? (
            <div className="flex bg-gray-100 items-center gap-2 justify-center h-screen">
                <ProcessLoader color={'black'} size={'35px'} />
                <p>Loading...</p>
            </div>
        ):(
            <div className='w-screen flex flex-col items-center bg-gray-100 min-h-screen'>
                <VoteModal setNewVotes={setSkitVotes} userId={session?.user?._id} skitId={params?.id} userEmail={session?.user?.email} setShowVoteModal={setShowVoteModal} showVoteModal={showVoteModal} />
                <div className={`flex md:w-[50%] bg-gray-100 pb-[100px] mx-auto rounded-[20px] justify-center items-center gap-4 flex-col`}>
                { uploadModal && 
                    <SkitSuccessModal closeFunction={uploadSuccess} bgOpacity={uBgOpacity} modalOpacity={uModalOpacity}/>
                }
                { showModal && 
                    <div className={`fixed ${nlBgOpacity} transition-all duration-300 ease-in-out backdrop-blur-sm h-screen w-screen flex flex-co items-center justify-center gap-3 bg-black/50 z-[1000] top-0`}>
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
                    <div className={`fixed ${ssBgOpacity} transition-all duration-300 ease-in-out backdrop-blur-sm h-screen w-screen flex flex-co items-center justify-center gap-3 bg-black/50 z-[1000] top-0`}>
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
                    <div className='h-screen w-full pt-[30px] flex flex-col gap-10'>
                    <div className='text-red-500 font-light text-center md:w-[30%] w-[90%] mx-auto text-[13px]'>{errorMessage}. please check your internet connection</div>
                        <button onClick={reload} className='flex flex-col justify-center hover:scale-105 transition-all ease-in-out duration-300 hover:opacity-50 items-center gap-3'>
                            <span className=']'>Tap to retry</span>
                            <ReloadIcon/>
                        </button>
                    </div>
                }
                <div className={`h-[460px] md:h-[350px] md:w-[700px] w-screen flex flex-col justify-center item-center md:rounded-[5px] overflow-hidden bg-gray-900 md:mt-[5px]`}>
                    { typeof window !== "undefined" && ( loadingData ? ( 
                            <div className="h-[460px] md:h-[350px] flex flex-col justify-center items-center">
                                <ProcessLoader color={'white'} size={'35px'}/>
                            </div>
                        ) : (
                            ( dataSuccess ? (
                                <div className="h-full w-full flex flex-col justify-center items-center">
                                    <div className="h-[5px] md:w-[700px] w-screen absolute top-0 self-start">
                                        <div style={{width:`${hasProgressed * 100}%`}} className={`transition-width ease-in-out duration-350 h-full bg-green-500`}></div>
                                    </div>
                                    <div onClick={handlePlayer} className={`h-[460px] md:h-[350px] transition-all ease-in-out duration-350 ${isPlaying?"opacity-0":"opacity-100"} md:h-[350px] md:w-[700px] z-50 w-screen items-center justify-center flex flex-col bg-black/30 absolute`}>
                                        <button>
                                            <PlayCircle strokeWidth={1} size={'50px'} className="text-white"/>
                                        </button>
                                    </div>
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
                                        config={{
                                            file: {
                                                attributes: {
                                                disablekb: 1,  // Disable keyboard shortcuts
                                                fullscreen: false,  // Disable fullscreen
                                                }
                                            }
                                        }}
                                        />
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
                <div className={`w-full md:w-[700px] flex flex-col px-[3%] md:px-0 md:pb-[80px] pb-[150px]`}>
                    <div className="flex flex-col mb-2 px-2 gap-1">
                    { loadingData ? (
                            <div className="h-[25px] w-full bg-gray-200 animate-pulse rounded-[5px]"/>
                    ): (
                            <span style={{lineHeight:'21px'}} className="text-[21px] font-bold">{modifyTitle(title)}</span>
                    )}
                    </div>
                    <div className="flex flex-row justify-between border-y-[0.5px] border-gray-300 py-2 items-center">
                        <div className="flex flex-row md:text-[18px] text-[16px] items-center gap-2">
                            <Profile size={'40px'}/>
                            { loadingData ? (
                                <div className="h-[32px] md:w-[120px] w-[50px] bg-gray-200 animate-pulse rounded-[5px]"></div>
                            ): (
                                <div className="flex md:flex-row flex-col leading-tight text-gray-700">
                                    <span className="md:text-[18px] text-[13px] font-bold">{data?.fullname}</span> 
                                    <span className="font-bold text-black" >
                                        • {skitVotes} vote{skitVotes>1? "s":""} 
                                    </span>
                                </div>
                            )}

                        </div>

                        <div className="flex flex-row gap-2 w-fit items-center">
                            { loadingData ? (
                                <div className=" bg-gray-200 h-[35px] animate-pulse rounded-[5px] md:w-[100px] w-[15%]"></div>
                            ):(
                                <button onClick={voteModal} className={`text-green-800 text-[14px] hover:bg-green-500 bg-green-300 md:w-[120px] w-fit px-2 flex flex-row gap-1 items-center justify-center h-[35px] rounded-[5px] hover:scale-105`}>
                                    <Vote className="text-black" size={'18px'} strokeWidth={1} />
                                    <span>Vote</span>
                                </button>
                            )}
                            { loadingData ? (
                                <div className=" bg-gray-200 h-[35px] animate-pulse rounded-[5px] md:w-[100px] w-[15%]"></div>
                            ): (
                                <button onClick={()=>{shareModal('in')}} className="md:w-[130px] text-[14px] w-fit px-2 flex flex-row gap-1 items-center justify-center h-[35px] bg-blue-300 rounded-[5px] text-gray-700 hover:scale-105 hover:bg-blue-400">
                                    <Share2 strokeWidth={1} size={'18px'}/> Share
                                </button>
                            )}
                        </div>
                        
                    </div>

                    { loadingData ? (
                        <div className="h-[32px] w-full bg-gray-200 animate-pulse rounded-[5px]"/>
                    ): (
                        <div className="flex flex-col md:p-3 p-2 bg-gray-200 rounded-[5px] mt-4">
                            <span className="text-black font-semibold text-[14px]">{data?.createdAt}</span>
                            <span onClick={descriptionView} className="hover:cursor-pointer leading-relaxed text-gray-700">
                                { data?.vidCaption.length > 200 ? (
                                    data?.vidCaption?.slice(0, descriptionLength) + (descriptionLength!==data?.vidCaption.length?'...more':'')
                                ) : (
                                    data?.vidCaption
                                )}
                            </span>
                        </div>
                    )}
                    <Link href={'/skit-across-nigeria/pages'} className="bg-green-500 flex flex-row gap-2 justify-center items-center h-[35px] hover:bg-green-800 w-[150px] mt-2 text-white">
                        <span>Watch others</span>
                        <ChevronRight size={'17px'} className="text-white"/>
                    </Link>
                </div> 
                { session?.user?.name && <BottomNav/>  }
            </div>
        
            </div>
        )}
        </>
  )
}




