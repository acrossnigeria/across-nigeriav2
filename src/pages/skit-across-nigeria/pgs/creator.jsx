"use client";

import { ChevronLeft, ShieldCheck } from "lucide-react";
import setRealVH from "../../../../utils/setRealVH";
import Image from "next/image";
import HeadComponent from "@/components/HeadComponent";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import 'next-cloudinary/dist/cld-video-player.css';
import CopyLink from "../../../../public/images/icon/CopyLink";
import FbIcon from "../../../../public/images/icon/FbIcon";
import IgIcon from "../../../../public/images/icon/IgIcon";
import WhatappIcon from "../../../../public/images/icon/WhatappIcon";
import { useSession } from "next-auth/react";
import Loader from "@/components/Loader";
import Layout from "@/components/Layout";
import ShrimpLoader from "@/components/ui/ShrimpLoader";

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


  return (
        <Layout hideAdvertCard={true} hideFooter={true} hideNav={true}>
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
            <div className="w-full flex flex-col h-[90vh] justify-center items-center">
                <ShrimpLoader />
            </div> 
        ):(
            <div className="flex items-center justify-center flex-col pt-[10px] font-poppins pb-[50px] px-2">
                <div className={`fixed ${shareNotifyBottom} ${shareNotifyOpacity} transition-all text-center ease-in-out duration-500 z-[2000] bg-white text-gray-600 rounded-[20px] md:w-fit w-[80%] h-fit p-3`}>
                    <span>Link copied, you can now share it</span>
                </div> 

                <div className="w-[125px] self-start cursor-pointer md:ml-[3%] hover:bg-gray-300 border border-gray-700 transition-all ease-in-out duration-300 text-gray-700 rounded-[30px] flex items-center justify-center h-[30px]" onClick={()=>{router.back()}}>
                    <ChevronLeft size={'20px'} className="text-gray-700 cursor-pointer"/>
                    Go back
                </div>

                <div className="max-w-xl w-full flex flex-col pb-2 pt-1 px-1">

                    <div className="flex flex-row bg-gradient-to-t from-gray-100 rounded-b-[20px] to-transparent h-[210px] items-center justify-between gap-2">
                        <div className="w-[55%] h-full flex flex-col justify-end pl-3 gap-2 pb-3 overflow-hidden">
                            <span className="md:text-lg text-[18px] font-bold leading-tight text-green-600 mt-4 text-left">
                                {session?.user?.name + " "}
                                your skit was submitted successfully!
                            </span>
                            <span className="text-gray-700 mb-2 text-[16px] leading-tight text-left">
                                You&apos;ve uploaded your skit for this month&apos;s Skits Across Nigeria Reality Show, great job!
                            </span>
                        </div>
                        <div className="w-[40%] h-full overflow-hidden relative">
                            <Image
                            src={"/svg/Film-rolls-bro.svg"}
                            alt="Skit Competition Banner"
                            className="h-full w-[40%]"
                            layout="fill"
                            objectFit="contain"
                            />
                        </div>
                    </div>

                    <div className="mb-4 space-y-2 text-[15px] border-y border-y-gray-200 py-3 md:px-4 px-3">
                        <p className="text-gray-900 text-[16px] font-semibold flex items-center gap-2">
                            🔥 Next Step? Get Votes!
                        </p>
                        <p className="text-gray-600 flex items-center gap-2">
                            Share your skit link far and wide, on WhatsApp, Instagram, TikTok, Twitter, and everywhere else. The more votes you get, the closer you are to winning up to ₦30 Million and a movie deal!
                        </p>
                        <p className="text-gray-600 flex items-center gap-2">
                        📆 Remember: New competitions are held every month. You can upload a new skit next month, so stay creative and ready!
                        </p>
                        <p className="text-gray-600 text-[15px] flex items-center gap-2">
                        🚀 Good luck, we&apos;re rooting for you!
                        </p>
                    </div>

                    <div className="mt-2 w-[90%] mx-auto flex flex-col items-center justify-center">
                        <button onClick={()=>{router.push(`/skit-across-nigeria/pgs/video/${data?.skitId}`)}} className="h-[40px] w-full text-white bg-green-600 hover:bg-green-700 transition-all duration-200 rounded-[20px]">View my skit</button>
                    </div>

                    <div className="flex my-4 flex-row items-center justify-around w-full md:w-[80%] mx-auto px-4">
                        <button onClick={copyShareLink} className="text-[14px] hover:scale-105 transition-all duration-400 ease-in-out hover:opacity-75 flex flex-col justify-center items-center gap-1">
                            <div className="w-[35px] flex flex-col text-[10px] justify-center items-center h-[35px] border-1 border-gray-800 rounded-full">
                                <CopyLink size={'25px'}/>
                            </div>
                            <span className="text-[12px]">Copy link</span>
                        </button>
                        <a  href={shareLinks.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[14px] hover:scale-105 transition-all duration-400 ease-in-out hover:opacity-75 flex flex-col justify-center items-center gap-1">
                        <div className="w-[35px] flex flex-col text-[10px] justify-center items-center h-[35px] rounded-full">
                            <WhatappIcon size={'40px'}/>
                            </div>
                            <span className="text-[12px]">Whatsapp</span>
                        </a>
                        <a  href={shareLinks.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[14px] hover:scale-105 transition-all duration-400 ease-in-out hover:opacity-75 flex flex-col justify-center items-center gap-1">
                        <div className="w-[35px] flex flex-col text-[10px] justify-center items-center h-[35px] rounded-full">
                            <FbIcon size={'40px'}/>
                            </div>
                            <span className="text-[12px]">Facebook</span>
                        </a>
                        <button onClick={copyShareLink} className="text-[14px] hover:scale-105 transition-all duration-400 ease-in-out hover:opacity-75 flex flex-col justify-center items-center gap-1">
                        <div className="w-[35px] flex flex-col text-[10px] justify-center items-center h-[35px] rounded-full">
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
    </Layout>
  );
}
 

