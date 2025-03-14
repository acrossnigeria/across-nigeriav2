"use client"
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { getError } from "../../../../../utils/error";
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
import { useParams } from "next/navigation";

// Dynamically import ReactPlayer with SSR disabled
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const prototype = {
    email:'aliman2952003@gmail.com',
    description:"The rocks are formed as a result of transportation agents like wind, water and ice which moves loosed weathered rock materials and deposit them in the form of layers called sediments which when subjected to heavy pressure undergo compaction and cementation",
    url: 'https://res.cloudinary.com/dcxz7qndp/video/upload/sp_auto/v1741771808/theater_skit_uploads/zznkbb7idozhpuklmsal.m3u8',
    title: 'Gauss Jordan Elimination & Reduced Row Echelon Form',
    name: 'Aliman ahmed'
}

export default function SkitScreen(props){
  const skit = prototype;
  const router= useRouter();
  const params = router.query;
  const [ isMobile, setIsMobile ] = useState(false);
  const [ descriptionLength, setDescriptionLength ] = useState(40);
  const [ voted, setVoted ] = useState(false);
  const [ voteLoading, setVoteLoading ] = useState(false);
  const [ shareNotifyBottom, setShareNotifyBottom ] = useState('bottom-[-50px]');
  const [ shareNotifyOpacity, setShareNotifyOpacity ] = useState('opacity-0');
  const [ shareLink, setShareLink ] = useState('https//sample');
  const [ data, setData ] = useState(null);
  const [ loadingData, setLoadingData ] = useState(true);
  const [ dataSuccess, setDataSuccess ] = useState(true);
  const [ title, setTitle ] = useState('');


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

    if (!skit){
        return<Layout title="Skit not Found"><div>Skit not found</div></Layout>;
    }

    const modifyTitle = ( str ) => {
        const firstWord = str.slice(0, 1).toUpperCase();
        return `${firstWord}${str.slice(1)}`;
    }

    const getVideoData = async () => {
        try {
            if ( params.id ) {
                setLoadingData(true)
                const response = await axios.get(`/api/media/upload-theater-skit?id=${ params?.id }&type=single`);
                const videoData = response.data.vidData;
                setData(videoData);
                setLoadingData(false);
                setDataSuccess(true);
                setTitle(videoData.vidTitle);
            }
        } catch(error) {
            setLoadingData(false);
            setDataSuccess(false);
            console.log(error.message);
        }
    }
    
    const descriptionView = () => {
        if (descriptionLength===data?.vidCaption.length) {
            setDescriptionLength(120);
        } else {
            setDescriptionLength(data?.vidCaption.length)
        }
    }

    const handleVote = () => {
        setVoteLoading(true);

        setTimeout(() => {
            setVoted(!voted);
            setVoteLoading(false)
        }, 5000);
    }

    const displayShareNotifier = () => {
        setShareNotifyBottom('bottom-[100px]');
        setShareNotifyOpacity('opacity-100');
        setTimeout(() => {
            setShareNotifyBottom('bottom-[-50px]');
            setShareNotifyOpacity('opacity-50');
        }, 3000);
    }

    async function copyShareLink() {
        try {
           await navigator.clipboard.writeText(shareLink);
           displayShareNotifier();
        } catch (err) {
           alert('An error occurred when copying ref link');
        }
     }


    if (!skit) {
    return <Layout title="Skit not Found"><div>Skit not found</div></Layout>;
    }

  return(
        <Layout hideNav={true} title={title}>
          <div className={`flex md:w-[50%] bg-gray-100 mx-auto rounded-[20px] justify-center items-center gap-4 flex-col`}>
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
                                config={{
                                    file: {
                                        attributes: {
                                          // Disable fullscreen by default
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
            <div className={`fixed ${shareNotifyBottom} ${shareNotifyOpacity} transition-all ease-in-out duration-500 bg-gray-100 text-gray-600 rounded-[30px] md:w-fit w-[80%] border-1 border-green-500 h-fit p-3`}>
                <span>Link copied, you can now share it</span>
            </div> 
            <div className={`w-full md:w-[100%] flex flex-col px-[3%] md:px-0 md:pb-[80px] pb-[150px]`}>
                <div className="flex flex-col mb-[10px] gap-1">
                   { loadingData ? (
                        <div className="h-[25px] w-full bg-gray-300 animate-pulse rounded-[7px]"></div>
                   ): (
                        <span style={{lineHeight:'21px'}} className="text-[21px]">{title}</span>
                   )}
                </div>
                { loadingData ? (
                    <>
                        <div className="h-[20px] w-full bg-gray-200 animate-pulse rounded-[7px]"></div>
                        <div className="h-[20px] w-full bg-gray-200 animate-pulse rounded-[7px]"></div>
                        <div className="h-[20px] w-full bg-gray-200 animate-pulse rounded-[7px]"></div>
                    </>
                   ): (
                    <span style={{lineHeight:'20px'}} onClick={descriptionView} className="hover:cursor-pointer text-gray-700">{ data?.vidCaption?.slice(0, descriptionLength) + (descriptionLength!==data?.vidCaption.length?'... See more':'') }</span>
                )}
                <div className="flex flex-row justify-between mt-[10px] items-center">
                    <div className="flex flex-row text-[18px] items-center gap-2">
                        <Profile size={'40px'}/>
                        { loadingData ? (
                            <div className="h-[20px] w-[30%] bg-gray-300 animate-pulse rounded-[7px]"></div>
                        ): (
                            <span>{data?.fullname}</span>
                        )}
                        </div>
                    
                    <button onClick={handleVote} className={`${voted?'text-gray-300 bg-gray-800 hover:bg-gray-900':'text-gray-700 hover:bg-gray-400 bg-gray-300'} w-[130px] flex flex-row gap-2 items-center justify-center h-[40px] rounded-[25px] hover:scale-105`}>
                        { voteLoading?(
                            <CycleLoader size={'20px'}/>
                        ): (
                            voted?<VotedIcon/>:<VoteIcon/>
                        )}
                        <span>{ voted? 'Voted':'Vote' }</span>
                    </button>
                </div>
                <div className="flex flex-row justify-between pb-[5px] pt-[5px] items-center">
                    { loadingData ? (
                        <div className="h-[20px] w-[20%] bg-gray-300 animate-pulse rounded-[7px]"></div>
                    ): (
                        <div className="text-gray-800 text-[16px] font-bold" >• {data?.votes.length} votes •</div>
                    )}
                    <div className="flex flex-row gap-2 w-fit">
                        <button onClick={copyShareLink} className='w-[100px] flex flex-row gap-1 items-center justify-center py-2 rounded-[25px] text-gray-700 hover:scale-105 hover:bg-gray-400'><ShareIcon/> Share</button>
                    </div>
                </div>
                <div className="inline-flex bg-gray-300 rounded-[25px] w-[100%] text-[13px] text-gray-800 p-2 mt-[5px] gap-2 items-center"><ContestIcon />Contesting for Best Drama in Theater Drama Across Nigeria</div>
                <Link href={'/theater-skit-across-nigeria/pages'} className="bg-green-600 rounded-[25px] flex flex-col justify-center items-center py-1 hover:bg-green-800 w-[150px] mt-[20px] text-white">Watch others</Link>
            </div>      
          </div>
     
        </Layout>
  )
}




