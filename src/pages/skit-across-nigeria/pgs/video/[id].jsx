"use client"
import { useRouter } from "next/router";
import axios from "axios";
import 'next-cloudinary/dist/cld-video-player.css';
import { useState, useEffect } from "react";
import Profile from "../../../../../public/images/icon/Profile";
import Link from "next/link";
import dynamic from 'next/dynamic'; // Import dynamic
import { useSession } from "next-auth/react";
import ReloadIcon from "../../../../../public/images/icon/ReloadIcon";
import { ChevronLeft, EllipsisVertical, Pause, Play, SendHorizontalIcon } from "lucide-react";
import ProcessLoader from "@/components/ui/ProcessLoader";
import VoteModal from "../../components/VoteModal";
import setRealVH from "../../../../../utils/setRealVH";
import { arrangeText, shortenText } from "../../../../../utils/textFormat";
import HeadComponent from "@/components/HeadComponent";
import ShareModal from "../../components/ShareModal";

// Dynamically import ReactPlayer with SSR disabled
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });


export default function SkitScreen() {

    const router = useRouter();
    const { id } = router.query || {};
    const { data:session } = useSession();
    const message = '🔥 Check out this amazing skit on Across Nigeria Reality Show! 😂🎭 The creator is competing to win cash prizes! 🏆💰 Support them by watching and voting for your favorite skit. Every vote counts! Cast yours now! 🚀✨';
    const skitLink = `https://acrossnig.com/skit-across-nigeria/pgs/video/video/${id}`;
    const encodedMessage = encodeURIComponent(message + ' ' + skitLink);

    const shareLinks = {
        whatsapp: `https://wa.me/?text=${encodedMessage}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(skitLink)}`,
    };

    const [ data, setData ] = useState(null);
    const [ loadingData, setLoadingData ] = useState(true);
    const [ dataSuccess, setDataSuccess ] = useState(true);
    const [ caption, setCaption ] = useState('');

    const [ errorGettingSkit, setErrorGettingSkit ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');

    const [ playerOpacity, setPlayerOpacity ] = useState('opacity-0');

    const [ shareNotifyBottom, setShareNotifyBottom ] = useState('top-[-50px]');
    const [ shareNotifyOpacity, setShareNotifyOpacity ] = useState('opacity-0');

    const [ showShareModal, setShowShareModal ] = useState(false);

    // State to track player
    const [ isPlaying, setIsPlaying ] = useState(true);
    const [ hasProgressed, setHasProgressed ] = useState(0);
    const [ isBuffering, setIsBuffering ] = useState(false);

    // state to track modal display
    const [ showVoteModal, setShowVoteModal ] = useState(false);

     // State to track client-side rendering
    const [isClient, setIsClient] = useState(false);

    // displays voting modal
    const voteModal = () => {  
        setShowVoteModal(!showVoteModal);
        handlePlayer();
    }

    useEffect(() => {
        if ( !router.isReady ) return;
        console.log(id)

        if ( isClient && id ) { // Only run this code after the component is mounted on the client
            getVideoData(); // get datas for video
        }
    }, [ isClient, id, router.isReady ]);

    useEffect(() => {
        // This will only run on the client
        setIsClient(true); // Update the state to indicate we're on the client
    }, []);


    const getVideoData = async () => {
        async function getData(user) {
            try {
                if ( id ) {
                    setLoadingData(true)
                    const response = await axios.get(`/api/media/skit_across_nigeria/skit?id=${ id }&type=single${user?`&user=${user}`:''}`);
                    const videoData = response.data.vidData;
                    setData(videoData);
                    setLoadingData(false);
                    setDataSuccess(true);
                    setCaption(videoData?.vidCaption);
                    setErrorGettingSkit(false);
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
        setShareNotifyBottom('top-[70px]');
        setShareNotifyOpacity('opacity-100');
        setTimeout(() => {
            setShareNotifyBottom('top-[-50px]');
            setShareNotifyOpacity('opacity-0');
        }, 3000);
    }

    const reload = () => {
        setErrorGettingSkit(false);
        getVideoData();
    }


    const shareModal = (transiton) => {
        if (transiton==='in') {
            setShowShareModal(true);
        } else {
            setShowShareModal(false);
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

    return(
        <>
        <HeadComponent
        title={`Watch & Vote this Skit video`}
        desc={`Watch and vote for this skit in the Skit Across Nigeria Reality Show. Support amazing talents and win exciting prizes!`}
        image="https://acrossnig.com/images/skit_across_nigeria_skit.jpg"
        canonical={`https://acrossnig.com/skit-across-nigeria/pgs/`}
        url={`https://acrossnig.com/skit-across-nigeria/pgs`}
        keywords="Nigeria skit competition, win cash for skits, vote skit Nigeria, entertainment Nigeria, Across Nigeria show, talent show Nigeria, best Nigerian skits, online skit challenge"
        />
        { !isClient ? (
            <div style={{height:`calc(var(--vh, 1vh)*100)`}} className="flex bg-gray-100 items-center gap-2 justify-center">
                <ProcessLoader color={'black'} size={'35px'} />
                <p>Loading...</p>
            </div>
        ):(
            <div style={{height:`calc(var(--vh, 1vh)*100)`}}  className='w-screen flex flex-col items-center bg-gray-950'>
                <VoteModal userId={session?.user?._id} skitId={id} userEmail={session?.user?.email} handleVoteModal={voteModal} setShowVoteModal={setShowVoteModal} showVoteModal={showVoteModal} />
                <div className={`flex md:w-[50%] mx-auto rounded-[20px] justify-center items-center gap-4 flex-col`}>
                <ShareModal skitLink={skitLink} displayShareNotifier={displayShareNotifier} closeModal={()=>{shareModal('out')}} shareLinks={shareLinks} showModal={showShareModal}/>

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
                    { isClient && ( loadingData ? ( 
                            <div className="h-full w-full flex flex-col bg-transparent justify-center items-center">
                                <ProcessLoader color={'white'} size={'40px'}/>
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
                <div className={`fixed ${shareNotifyBottom} ${shareNotifyOpacity} text-[13px] transition-all text-center ease-in-out duration-500 bg-gray-100 z-[2000] text-gray-600 rounded-[20px] md:w-fit w-[80%] h-fit p-2`}>
                    <span>Link copied, you can now share it</span>
                </div> 
                <div className={`w-full md:max-w-[400px] absolute z-[1000] bottom-0 text-white flex flex-col md:pl-[2%] pl-[3%] `}>
                    <div className="flex w-[84%] flex-col py-2 pb-[28px] items-center">
                        <div className="flex w-full flex-row md:text-[18px] text-[16px] items-center gap-2">
                            { loadingData ? (
                                <div className="flex flex-row gap-3 items-center">
                                    <div className="bg-gray-800 relative overflow-hidden h-[38px] w-[38px] rounded-full">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                                    </div>
                                    <div className="h-[38px] w-[200px] relative overflow-hidden bg-gray-800 rounded-[30px]">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                                    </div>
                                </div>
                            ): (
                                <div className="flex flex-row gap-2 items-center">
                                    <Profile bg={'#d1d5db'} size={'38px'}/>
                                    <div className="flex flex-col leading-tight justify-center">
                                        <span className="text-[14px] font-light">{shortenText(data?.fullname, 15)}</span> 
                                        <span className="text-[10px] font-light">Creator</span>
                                    </div>
                                    <button onClick={voteModal} className={`text-black text-[15px] z-[2000] bg-white bg-transparent border-1 border-white px-7 flex flex-row gap-1 items-center justify-center py-1 hover:text-black rounded-[30px] hover:bg-white/50 transition-all duration-300 ease-in-out`}>
                                        <span>Vote</span>
                                    </button>
                                </div>
                            )}

                        </div>

                        <div className="flex flex-col w-full mt-3 mb-1 gap-1">
                            { loadingData ? ( 
                                    <div className="h-[25px] w-[90%] relative overflow-hidden bg-gray-800 rounded-[30px]">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                                    </div>
                            ): (
                                    <span className="text-[17px] leading-tight font-semibold">{shortenText(arrangeText(caption), 35)}</span>
                            )}
                        </div>
                        
                    </div>
                </div> 
            </div>

            { !loadingData && (
                <div className={`w-full md:max-w-[400px] absolute bottom-0 text-white h-[40%] items-end pb-[28px] flex flex-row justify-end md:pr-[2%] pr-[3%]`}>
                    <div className="flex flex-col gap-5 z-[1000]">
                        <button onClick={()=>{shareModal('in')}} className="hover:opacity-50 transition-opacity p-2 mb-5 backdrop-blur-sm rounded-full cursor-pointer w-fit gap-1">
                            <SendHorizontalIcon strokeWidth={1.8} size={'27px'} color="white"/>
                        </button>
                        <button className=" w-fit hover:opacity-50 transition-opacity cursor-pointer p-2 backdrop-blur-sm rounded-full items-center gap-1">
                            <EllipsisVertical strokeWidth={1.8} size={'27px'} color="white"/>
                        </button>
                    </div>
                </div>
            )}

            <div className={'absolute top-0 left-0 w-full flex z-[1000] flex-row justify-between items-center px-[2.5%] pt-5 py-3 bg-transparent'}>
                <Link href={'/skit-across-nigeria/pgs/'} className="flex flex-row text-[19px] font-light gap-2 justify-center hover:text-gray-400 items-center w-fit text-white">
                    <ChevronLeft size={'30px'} className="text-white"/>
                    <span>Watch others</span>
                </Link>
            </div>
        
            </div>
        )}
        </>
  )
}






