"use client";

import { ShieldCheck, CheckCircle2, Check } from "lucide-react";
import setRealVH from "../../../../utils/setRealVH";
import Image from "next/image";
import banner from "../../../../public/images/saImage2.png";
import HeadComponent from "@/components/HeadComponent";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProcessLoader from "@/components/ui/ProcessLoader";
import axios from "axios";
import ErrorCard from "@/components/ui/ErrorCard";
import 'next-cloudinary/dist/cld-video-player.css';
import CopyLink from "../../../../public/images/icon/CopyLink";
import FbIcon from "../../../../public/images/icon/FbIcon";
import IgIcon from "../../../../public/images/icon/IgIcon";
import WhatappIcon from "../../../../public/images/icon/WhatappIcon";
import { useSession } from "next-auth/react";
import Loader from "@/components/Loader";

export default function Creator( { skitId } ) {
    const { data: session } = useSession();
    const router = useRouter();

    const [ isLoading, setIsLoading ] = useState(true);
    const [ errorLoading, setErrorLoading ] = useState(false);
    const [ data, setData ] = useState(null);
    const [ errorMessage, setErrorMessage ] = useState("Unknown Error");



    const message = '🔥 Check out this amazing skit on Across nigeria Reality Show! 😂🎭 The creator is competing to win cash prizes! 🏆💰 Support them by watching and voting for your favorite skit. Every vote counts! Cast yours now! 🚀✨';
    const skitLink = `https://acrossnig.com/skit-across-nigeria/pgs/video/${data?.skitId}`;
    const encodedMessage = encodeURIComponent(message + ' ' + skitLink);
    const [ shareNotifyBottom, setShareNotifyBottom ] = useState('top-[-50px]');
    const [ shareNotifyOpacity, setShareNotifyOpacity ] = useState('opacity-0');

    setRealVH();
    useEffect( () => {
        const getCreatorData = async () => {
            try {
                const response = await axios.get(`/api/skit-across-nigeria/auth?userId=${session?.user?._id}`);
                const isRegistered = response.data?.isUserRegistered;
                const hasUploaded = response.data?.hasUploaded; 
                if (isRegistered && hasUploaded )  {
                    setData(hasUploaded);
                    setIsLoading(false);
                } else {
                   router.push("/skit-across-nigeria/pgs/register");
                } 
            } catch(err) {
                setErrorMessage(err.message);
                setTimeout(() => {
                    setErrorLoading(true);
                }, 500);
            }
        }

        getCreatorData();
    }, [ session ])
    
    const shareLinks = {
        whatsapp: `https://wa.me/?text=${encodedMessage}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(skitLink)}`,
    };

    const displayShareNotifier = () => {
        setShareNotifyBottom('top-[90px]');
        setShareNotifyOpacity('opacity-100');
        setTimeout(() => {
            setShareNotifyBottom('top-[-50px]');
            setShareNotifyOpacity('opacity-0');
        }, 3000);
    }

    async function copyShareLink() {
        try {
        await navigator.clipboard.writeText(skitLink);
        displayShareNotifier();
        } catch (err) {
        alert('An error occurred when copying ref link: '+ err.message);
        }
    }

    // Set the real viewport height for responsive design
    setRealVH();


  return (
        <>
        <HeadComponent
            title="Register for Skit Across Nigeria"
            desc="Sign up now to join the Skit Across Nigeria Competition. Submit your original skit, gain nationwide exposure, and stand a chance to win ₦100,000. Registration is free and open to all Theatre Arts students and skit creators."
            image="https://acrossnig.com/images/skit_across_nigeria.jpg"
            canonical="https://acrossnig.com/images/skit_across_nigeria_skit.jpg"
            url="https://acrossnig.com/skit-across-nigeria/pgs/register"
            keywords="register skit competition, skit contest Nigeria, upload skit, join skit competition, win cash skits, Theatre Arts Nigeria, Nigerian skit challenge, across nigeria registration, free entry skit competition"
        />
        <Loader/>
        { isLoading ? (
            <div style={{height:`calc(var(--vh, 1vh)*100)`}} className="w-full flex flex-col justify-center items-center">
                <ProcessLoader color={'black'} size={'40px'}/>
                <span>Please wait..</span>
            </div> 
        ):(
            <div style={{height:`calc(var(--vh, 1vh)*100)`}} className="bg-white flex items-center justify-center px-4">
                <div className={`fixed ${shareNotifyBottom} ${shareNotifyOpacity} transition-all text-center ease-in-out duration-500 bg-gray-100 z-[2000] text-gray-600 rounded-[20px] md:w-fit w-[80%] border-1 border-green-500 h-fit p-3`}>
                    <span>Link copied, you can now share it</span>
                </div> 

                <div className="max-w-xl w-full bg-gray-50 flex flex-col rounded-xl shadow-xl border-1 border-gray-300 pb-5 pt-1 px-1">
                    <div className="w-full h-[110px] overflow-hidden relative rounded-xl shadow-lg">
                        <Image
                        src={banner}
                        alt="Skit Competition Banner"
                        layout="fill"
                        objectFit="cover"
                        />
                    </div>
                    <span className="text-xl px-7 font-bold text-gray-900 mt-5 text-center">
                        {data?.userFirstName}
                        Skit Uploaded Successfully!
                    </span>
                    <span className="px-4 text-gray-700 mb-2 text-[15] leading-tight text-center">
                        You&apos;ve uploaded your skit for this month&apos;s Across Nigeria Skit Competition, great job!
                    </span>

                    <div className="mb-4 space-y-2 text-[14px] border-y border-y-gray-200 py-3 px-4">
                        <p className="text-gray-900 font-semibold flex items-center gap-2">
                            🔥 Next Step? Get Votes!
                        </p>
                        <p className="text-gray-600 flex items-center gap-2">
                            Share your skit link far and wide, on WhatsApp, Instagram, TikTok, Twitter, and everywhere else. The more votes you get, the closer you are to winning up to ₦30 Million and a movie deal!
                        </p>
                        <p className="text-gray-600 flex items-center gap-2">
                        📆 Remember: New competitions are held every month. You can upload a new skit next month, so stay creative and ready!
                        </p>
                        <p className="text-gray-600 flex items-center gap-2">
                        🚀 Good luck, we&aposre rooting for you!
                        </p>
                    </div>

                    <div className="mt-2 w-[90%] mx-auto flex flex-col items-center justify-center">
                        <button onClick={()=>{router.push(`/skit-across-nigeria/pgs/video/${data?.skitId}`)}} className="h-[45px] w-full text-white bg-green-600 hover:bg-green-700 transition-all duration-200 rounded-[20px]">View My skit</button>
                    </div>

                    <div className="flex mt-2 flex-row items-center justify-around w-full px-4">
                        <button onClick={copyShareLink} className="text-[14px] hover:scale-105 transition-all duration-400 ease-in-out hover:opacity-75 flex flex-col justify-center items-center gap-1">
                            <div className="w-[40px] flex flex-col text-[10px] justify-center items-center h-[40px] border-1 border-gray-800 rounded-full">
                                <CopyLink size={'30px'}/>
                            </div>
                            <span className="text-[12px]">Copy link</span>
                        </button>
                        <a  href={shareLinks.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[14px] hover:scale-105 transition-all duration-400 ease-in-out hover:opacity-75 flex flex-col justify-center items-center gap-1">
                        <div className="w-[45px] flex flex-col text-[10px] justify-center items-center h-[45px] rounded-full">
                            <WhatappIcon size={'40px'}/>
                            </div>
                            <span className="text-[12px]">Whatsapp</span>
                        </a>
                        <a  href={shareLinks.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[14px] hover:scale-105 transition-all duration-400 ease-in-out hover:opacity-75 flex flex-col justify-center items-center gap-1">
                        <div className="w-[45px] flex flex-col text-[10px] justify-center items-center h-[45px] rounded-full">
                            <FbIcon size={'40px'}/>
                            </div>
                            <span className="text-[12px]">Facebook</span>
                        </a>
                        <button onClick={copyShareLink} className="text-[14px] hover:scale-105 transition-all duration-400 ease-in-out hover:opacity-75 flex flex-col justify-center items-center gap-1">
                        <div className="w-[45px] flex flex-col text-[10px] justify-center items-center h-[45px] rounded-full">
                            <IgIcon size={'40px'}/>
                            </div>
                            <span className="text-[12px]">Instagram</span>
                        </button>
                    </div>

                    <div className="mt-6 text-xs text-gray-600 text-center">
                        <ShieldCheck className="inline-block w-4 h-4 mr-1 text-green-500" />
                        Powered by Entertainment Methodz
                    </div>
                </div>
            </div>
        )}
    </>
  );
}
 

