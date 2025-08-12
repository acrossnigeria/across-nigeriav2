import Image from "next/image";
import Close from "../../../../public/images/icon/Close";
import setRealVH from "../../../../utils/setRealVH";
import FbIcon from "../../../../public/images/icon/FbIcon";
import IgIcon from "../../../../public/images/icon/IgIcon";
import WhatappIcon from "../../../../public/images/icon/WhatappIcon";
import logo1 from "../../../../public/images/logo1.png";
import { Clipboard } from "lucide-react";

const ShareModal = ( { showModal, closeModal, shareLinks, displayShareNotifier, skitLink }) => {

    async function copyShareLink() {
        try {
        await navigator.clipboard.writeText(skitLink);
        displayShareNotifier();
        } catch (err) {
        alert('An error occurred when copying ref link');
        }
    }

    setRealVH();
    return (
        <>
        { showModal && (
            <div style={{height:`calc(var(--vh, 1vh)*100)`}}  className={`fixed  z-[2000] transition-all duration-300 ease-in-out backdrop-blur-sm w-screen flex flex-co items-center justify-center gap-3 bg-black/50 top-0`}>
            <div className="h-fit flex flex-col justify-center w-[100%] items-center">
                <button onClick={closeModal} className="border-1 text-[14px] flex flex-row gap-2 text-white hover:bg-green-600/50 hover:scale-105 transition-all duration-300 ease-in-out justify-center items-center px-[20px] py-1 rounded-[20px] mb-[20px] border-gray-100">
                    <Close bg={'white'} size={'15px'}/>
                    Close
                </button>
                <div className={`overflow-hidden h-[270px] md:w-[400px] transition-all duration-500 ease-in-out w-[94%] text-center p-3 md:p-5 flex flex-col justify-center items-center bg-gray-100 rounded-[20px]`}>
                    <div className='text-center mb-[35px] flex flex-row justify-center gap-1 items-center'>
                        <Image src={logo1} alt='logo' placeholder='blur' className='h-[27px] w-[32px]' />
                        <div className='flex flex-col justify-center items-start gap-0'>
                            <span className='text-[10px] font-semibold text-green-700'>ACROSS NIGERIA</span>
                            <span className='text-[8px] text-green-500'>REALITY SHOW</span>
                        </div>
                    </div>
                    <span className="text-[14px]">Share it!, Share to friends and families for them to watch and vote.</span>
                    <div className="flex pt-[15px] mt-[15px] flex-row items-center justify-evenly gap-2 border-t-[0.5px] w-full border-t-gray-300">
                        <button onClick={copyShareLink} className="h-[60px] text-[14px] hover:scale-105 transition-all duration-400 ease-in-out hover:opacity-75 flex flex-col justify-center items-center gap-2 ">
                        <div className="w-[35px] flex flex-col justify-center items-center h-[35px] border-1 border-gray-800 rounded-full">
                            <Clipboard color="black" size={'25px'}/>
                            </div>
                            <span className="text-[13px]">Copy link</span>
                        </button>
                        <a  href={shareLinks.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-[60px] text-[14px] hover:scale-105 transition-all duration-400 ease-in-out hover:opacity-75 flex flex-col justify-center items-center gap-2 ">
                            <div className="w-[35px] flex flex-col justify-center items-center h-[35px] rounded-full">
                                <WhatappIcon size={'40px'}/>
                            </div>
                            <span className="text-[13px]">Whatsapp</span>
                        </a>
                        <a  href={shareLinks.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-[60px] text-[14px] hover:scale-105 transition-all duration-400 ease-in-out hover:opacity-75 flex flex-col justify-center items-center gap-2 ">
                            <div className="w-[35px] flex flex-col justify-center items-center h-[35px] rounded-full">
                                <FbIcon size={'40px'}/>
                            </div>
                            <span className="text-[13px]">Facebook</span>
                        </a>
                        <button onClick={copyShareLink} className="h-[60px] text-[14px] hover:scale-105 transition-all duration-400 ease-in-out hover:opacity-75 flex flex-col justify-center items-center gap-2 ">
                            <div className="w-[35px] flex flex-col justify-center items-center h-[35px] rounded-full">
                                <IgIcon size={'40px'}/>
                            </div>
                            <span className="text-[13px]">Instagram</span>
                        </button>
                    </div>
                </div>
            </div>
            </div>
        )}
        </>
    )
}

export default ShareModal;