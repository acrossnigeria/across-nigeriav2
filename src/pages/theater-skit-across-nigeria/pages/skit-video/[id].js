"use client"
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import axios from "axios";
import 'next-cloudinary/dist/cld-video-player.css';
import { useState, useEffect } from "react";
import ContestIcon from "../../../../../public/images/icon/ContestIcon";
import Profile from "../../../../../public/images/icon/Profile";
import CycleLoader from "@/components/CycleLoader";
import VotedIcon from "../../../../../public/images/icon/VotedIcon";
import VoteIcon from "../../../../../public/images/icon/VoteIcon";
import ShareIcon from "../../../../../public/images/icon/ShareIcon";
import Link from "next/link";
import dynamic from 'next/dynamic'; // Import dynamic
import { useSession } from "next-auth/react";
import ReloadIcon from "../../../../../public/images/icon/ReloadIcon";
import HomeIcon from "../../../../../public/images/icon/HomeIcon";
import AddIcon from "../../../../../public/images/icon/AddIcon";
import ProfileIcon from "../../../../../public/images/icon/ProfileIcon";
import Image from "next/image";
import logo1 from "../../../../../public/images/logo1.png";
import Close from "../../../../../public/images/icon/Close";
import CopyLink from "../../../../../public/images/icon/CopyLink";
import FbIcon from "../../../../../public/images/icon/FbIcon";
import IgIcon from "../../../../../public/images/icon/IgIcon";
import WhatappIcon from "../../../../../public/images/icon/WhatappIcon";
import SkitSuccessModal from "@/components/SkitSuccessModal";

// Dynamically import ReactPlayer with SSR disabled
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });


export default function SkitScreen(props){

    const router= useRouter();
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
    const [ descriptionLength, setDescriptionLength ] = useState(40);
    const [ voteLoading, setVoteLoading ] = useState(false);
    const [ data, setData ] = useState(null);
    const [ loadingData, setLoadingData ] = useState(true);
    const [ dataSuccess, setDataSuccess ] = useState(true);
    const [ title, setTitle ] = useState('');

    const [ isUserVoted, setIsUserVoted ] = useState({});

    const [ comments, setComments ] = useState([]);
    const [ errorGettingSkit, setErrorGettingSkit ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');

    const [ nlModalOpacity, setNlModalOpacity ] = useState('opacity-0');
    const [ nlBgOpacity, setNlBgOpacity ] = useState('opacity-0');
    const [ showModal, setShowModal ] = useState(false);

    const [ shareNotifyBottom, setShareNotifyBottom ] = useState('top-[-50px]');
    const [ shareNotifyOpacity, setShareNotifyOpacity ] = useState('opacity-0')

    const [ cvOpacity, setCvOpacity ] = useState('opacity-0');
    const [ showCantVote, setShowCantVote ] = useState(false);

    const [ showShareModal, setShowShareModal ] = useState(false);
    const [ ssModalOpacity, setSsModalOpacity ] = useState('opacity-100');
    const [ ssBgOpacity, setSsBgOpacity ] = useState('opacity-100');

    const [ uploadModal, setUploadModal ] = useState(false);
    const [ uModalOpacity, setUModalOpacity ] = useState('opacity-100');
    const [ uBgOpacity, setUBgOpacity ] = useState('opacity-100');


    const [isClient, setIsClient] = useState(false); // State to track client-side rendering

    useEffect(() => {
        // This will only run on the client
        setIsClient(true); // Update the state to indicate we're on the client
    }, []);

    useEffect(() => {
        if (isClient) { // Only run this code after the component is mounted on the client
        const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) && window.matchMedia('(max-width: 600px)').matches;
        setIsMobile(isMobileDevice);
        getVideoData(); // get datas for video
        }
    }, [isClient]); // Run this effect after `isClient` changes to true


    const modifyTitle = ( str ) => {
        const firstWord = str.slice(0, 1).toUpperCase();
        return `${firstWord}${str.slice(1)}`;
    }

    const getVideoData = async () => {
        async function getData(user) {
            try {
                if ( params.id ) {
                    setLoadingData(true)
                    const response = await axios.get(`/api/media/upload-theater-skit?id=${ params?.id }&type=single${user?`&user=${user}`:''}`);
                    const videoData = response.data.vidData;
                    const voteData = response.data.voteData;
                    setIsUserVoted(voteData);
                    setData(videoData);
                    setLoadingData(false);
                    setDataSuccess(true);
                    setTitle(videoData.vidTitle);
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

    const castVote = async () => {
        if ( session?.user?.name ) {
            if ( isUserVoted.authorized ) {
                setVoteLoading(true);
                try {
                    const data = {
                        user:session?.user?._id,
                        toVote:isUserVoted?.hasVotedThisSkit?false:true,
                        theaterSkit:params?.id,
                    }
                    const response = await axios.post('/api/theater-skit/castVote', data);
                    const voteData = response.data.voteData;
                    setIsUserVoted(voteData);
                    setVoteLoading(false);
                } catch(error) {
                    setVoteLoading(false)
                }
            } else {
                ShowCantVoteModal();
            }
        } else {
            notLoggedIn('in');
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

    const ShowCantVoteModal = () => {
        setShowCantVote(true);
        setCvOpacity('opacity-100');
        setTimeout(() => {
            setCvOpacity('opacity-0');
            setTimeout(() => {
                setShowCantVote(false);
            }, 2000);
        }, 5000);
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

  return(
        <Layout hideNav={true} title={title}>
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
            <div className={`${isMobile ? 'h-[245px]' : 'h-[300px]'} w-[100%] bg-gray-900 md:mt-[15px]`}>
                { typeof window !== "undefined" && ( loadingData ? ( 
                        <div className="h-full w-full flex flex-col justify-center items-center">
                            <CycleLoader size={'35px'}/>
                        </div>
                    ) : (
                        ( dataSuccess ? (
                            <ReactPlayer
                                url={data?.vidUrl} 
                                pip={true} 
                                width={'100%'} 
                                height={'100%'} 
                                controls={true}
                                playsinline={true}
                                config={{
                                    file: {
                                        attributes: {
                                          disablekb: 1,  // Disable keyboard shortcuts
                                          fullscreen: false,  // Disable fullscreen
                                        }
                                      }
                                }}
                                 />
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
            <div className={`w-full md:w-[100%] flex flex-col px-[3%] md:px-0 md:pb-[80px] pb-[150px]`}>
                <div className="flex flex-col mb-[10px] gap-1">
                   { loadingData ? (
                        <div className="h-[25px] w-full bg-gray-300 animate-pulse rounded-[7px]"></div>
                   ): (
                        <span style={{lineHeight:'21px'}} className="text-[21px]">{modifyTitle(title)}</span>
                   )}
                </div>
                { loadingData ? (
                    <>
                        <div className="h-[20px] w-full bg-gray-200 animate-pulse rounded-[7px]"></div>
                        <div className="h-[20px] w-full bg-gray-200 animate-pulse rounded-[7px] mt-1"></div>
                        <div className="h-[20px] w-full bg-gray-200 animate-pulse rounded-[7px] mt-1"></div>
                    </>
                   ): (
                    <span style={{lineHeight:'20px'}} onClick={descriptionView} className="hover:cursor-pointer text-gray-700">{ data?.vidCaption?.slice(0, descriptionLength) + (descriptionLength!==data?.vidCaption.length?'... See more':'') }</span>
                )}
                <div className="flex flex-row justify-start mt-[10px] items-center">
                    <div className="flex flex-row text-[18px] items-center gap-2">
                        <Profile size={'40px'}/>
                        { loadingData ? (
                            <div className="h-[20px] w-[100px] bg-gray-300 animate-pulse rounded-[7px]"></div>
                        ): (
                            <span>{data?.fullname}</span>
                        )}
                    </div>
                    
                </div>
                <div className="flex flex-row justify-between gap-3 w-[100%] pb-[5px] pt-[5px] items-center">
                    { loadingData ? (
                        <div className="h-[35px] md:w-[180px] w-[40%] bg-gray-300 animate-pulse rounded-[25px]"></div>
                    ): (
                        <div className="text-gray-800 bg-gray-300 md:w-[180px] w-[40%] h-[35px] flex flex-col justify-center items-center rounded-[25px] text-[14px] font-semibold" >{isUserVoted?.votes} votes</div>
                    )}
                    <div className="flex flex-row gap-3 md:w-fit w-[60%] items-center">
                        { loadingData ? (
                            <div className=" bg-gray-300 h-[35px] animate-pulse rounded-[25px] md:w-[130px] w-[48%] mt-[5px]"></div>
                        ):(
                            <button onClick={castVote} className={`${isUserVoted?.hasVotedThisSkit?'text-gray-300 bg-gray-800 hover:bg-gray-900':'text-gray-700 hover:bg-gray-400 bg-gray-300'} md:w-[130px] w-[48%] flex flex-row gap-2 items-center justify-center h-[35px] rounded-[25px] hover:scale-105`}>
                                { showCantVote && 
                                    <div className={`absolute ${cvOpacity} transition-all ease-in-out duration-500 text-[14px] p-2 flex flex-row justify-center items-center h-[80px] w-[150px] mt-[-80px] bg-black/40 text-[white] rounded-t-[20px] rounded-bl-[20px] ml-[-230px]`}>
                                        <span>Oops! You can&apos;t vote for more than one Skit</span>{}
                                    </div>
                                }
                                { voteLoading?(
                                    <CycleLoader size={'20px'}/>
                                ): (
                                    isUserVoted?.hasVotedThisSkit?<VotedIcon/>:<VoteIcon/>
                                )}
                                <span>{ isUserVoted?.hasVotedThisSkit? 'Voted':'Vote' }</span>
                            </button>
                        )}
                        { loadingData ? (
                            <div className=" bg-gray-300 h-[35px] animate-pulse rounded-[25px] md:w-[130px] w-[48%] mt-[5px]"></div>
                        ): (
                            <button onClick={()=>{shareModal('in')}} className='md:w-[130px] w-[48%] flex flex-row gap-1 items-center justify-center h-[35px] bg-gray-300 rounded-[25px] text-gray-700 font-bold hover:scale-105 hover:bg-gray-400'><ShareIcon size={'20px'}/> Share</button>
                        )}
                    </div>
                </div>
                { loadingData ? (
                    <div className=" bg-gray-300 rounded-[25px] w-[100%] animate-pulse mt-[5px] h-[20px]"></div>
                ):(
                    <div className="inline-flex border-b-1 border-b-green-500 rounded-[25px] w-[100%] text-[13px] text-gray-800 p-2 mt-[5px] gap-2 items-center"><ContestIcon />Contesting for Best Skit</div>
                )}
                <Link href={'/theater-skit-across-nigeria/pages'} className="bg-green-600 rounded-[25px] flex flex-col justify-center items-center py-1 hover:bg-green-800 w-[150px] mt-[20px] text-white">Watch others</Link>
            </div> 
            <div className={`flex mt-2 fixed bottom-0 rounded-t-[5px] w-[100%] z-[1000] bg-green-600 flex-row font-sans h-[50px] pb-1 items-end justify-around`}>
            {/* Second Line Menus */}
                <Link style={{alignItems:'center'}} href="/" className="text-green-200 text-[13px] hover:scale-105 items-center flex flex-col justify-center">
                <HomeIcon bg={'#bbf7d0'} size={'22px'}/>
                Home
                </Link>
                <Link style={{alignItems:'center'}} href="/theater-skit-across-nigeria/pages/add-skit" className="text-green-200 text-[13px] pt-2 px-2 rounded-full bg-green-600 hover:scale-105 items-center flex flex-col justify-center">
                <AddIcon bg={'#bbf7d0'} size={'30px'}/>
                Add Skit 
                </Link>
                <Link style={{alignItems:'center'}} href="//theater-skit-across-nigeria/pages/creator" className="text-green-200 text-[13px] hover:scale-105 items-center flex flex-col justify-center">
                <ProfileIcon size={'22px'}/>
                you
                </Link>
            </div>     
          </div>
     
        </Layout>
  )
}




