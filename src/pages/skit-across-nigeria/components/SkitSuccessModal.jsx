import logo1 from "../../../../public/images/logo1.png";
import Image from "next/image";
import 'next-cloudinary/dist/cld-video-player.css';
import CopyLink from "../../../../public/images/icon/CopyLink";
import FbIcon from "../../../../public/images/icon/FbIcon";
import IgIcon from "../../../../public/images/icon/IgIcon";
import WhatappIcon from "../../../../public/images/icon/WhatappIcon";
import { useState } from "react";
import setRealVH from "../../../../../utils/setRealVH";

const SkitSuccessModal = ( { closeFunction, bgOpacity, modalOpacity, skitLink } ) => {
    const message = '🔥 Check out this amazing skit on Across nigeria Reality Show! 😂🎭 The creator is competing to win cash prizes! 🏆💰 Support them by watching and voting for your favorite skit. Every vote counts! Cast yours now! 🚀✨';
    const encodedMessage = encodeURIComponent(message + ' ' + skitLink);
    const [ shareNotifyBottom, setShareNotifyBottom ] = useState('top-[-50px]');
    const [ shareNotifyOpacity, setShareNotifyOpacity ] = useState('opacity-0');

    setRealVH();
    
    const shareLinks = {
        whatsapp: `https://wa.me/?text=${encodedMessage}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(skitLink)}`,
    };

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
        await navigator.clipboard.writeText(skitLink);
        displayShareNotifier();
        } catch (err) {
        alert('An error occurred when copying ref link: '+ err.message);
        }
    }

    
    return (
        <div style={{height:`calc(var(--vh, 1vh)*100)`}} className={`fixed ${bgOpacity} transition-all duration-300 z-[2000] ease-in-out backdrop-blur-sm w-screen flex flex-col items-center justify-center gap-3 bg-black/50 top-0 left-0`}>
            <div className={`fixed ${shareNotifyBottom} ${shareNotifyOpacity} transition-all text-center ease-in-out duration-500 bg-gray-100 z-[2000] text-gray-600 rounded-[20px] md:w-fit w-[80%] border-1 border-green-500 h-fit p-3`}>
                <span>Link copied, you can now share it</span>
            </div> 
            <div className="h-fit flex flex-col justify-center w-[100%] items-center">
                <button onClick={()=>{closeFunction('out')}} className="border-1 text-[15px] flex flex-row gap-2 text-white hover:bg-green-600/50 hover:scale-105 transition-all duration-300 ease-in-out justify-center items-center px-[30px] py-2 rounded-[20px] mb-[20px] border-gray-100">
                    View my skit
                </button>
                <div className={`overflow-hidden h-[300px] md:w-[400px] transition-all duration-500 ease-in-out w-[80%] text-center ${modalOpacity} p-3 md:p-5 flex flex-col justify-center items-center bg-gray-100 rounded-[5px]`}>
                    <div className='text-center mb-[25px] flex flex-row justify-center gap-1 items-center'>
                        <Image src={logo1} alt='logo' placeholder='blur' className='h-[30px] w-[35px]' />
                        <div className='flex flex-col justify-center items-start gap-0'>
                            <span className='text-[12px] font-semibold text-green-700'>ACROSS NIGERIA</span>
                            <span className='text-[10px] text-green-500'>REALITY SHOW</span>
                        </div>
                    </div>
                    <span className="text-[17px]">🎉 Your skit has been successfully uploaded! 🚀🔥 Share your skit, gather votes, and claim your prize! Don&apos;t wait <br></br> <span className="font-bold">spread the word now!🎤</span></span>

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
    )
};

export default SkitSuccessModal;