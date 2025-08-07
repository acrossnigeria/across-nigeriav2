
import { useState } from "react";
import Close from "../../public/images/icon/Close";
import CopyLink from "../../public/images/icon/CopyLink";
import FbIcon from "../../public/images/icon/FbIcon";
import IgIcon from "../../public/images/icon/IgIcon";
import WhatappIcon from "../../public/images/icon/WhatappIcon";
import logo1 from "../../public/images/logo1.png";
import Image from "next/image";
import CycleLoader from "./CycleLoader";

const DeleteSkitModal = ( { id, bgOpacity, modalOpacity, closeFunction } ) => {
    const [ isDeleting, setIsDeleting ] = useState(false);
    const deleteSkit = () => {
        setIsDeleting(true);
        setTimeout(() => {
            setIsDeleting(false);
        }, 5000);
    }

    return (
        <div className={`fixed ${bgOpacity} transition-all duration-300 ease-in-out backdrop-blur-sm h-screen w-screen flex flex-col items-center justify-center gap-3 bg-black/50 z-[1000] top-0 left-0`}>
            <div className="h-fit flex flex-col justify-center w-[100%] items-center">
                <button onClick={()=>{closeFunction('out')}} className="border-1 text-[14px] flex flex-row gap-2 text-white hover:bg-green-600/50 hover:scale-105 transition-all duration-300 ease-in-out justify-center items-center px-[20px] py-1 rounded-[20px] mb-[20px] border-gray-100">
                    <Close bg={'white'} size={'15px'}/>
                    Close
                </button>
                <div className={`overflow-hidden h-[220px] md:w-[300px] transition-all duration-500 ease-in-out w-[80%] text-center ${modalOpacity} p-3 md:p-5 flex flex-col justify-center items-center bg-gray-100 rounded-[5px]`}>
                    <div className='text-center mb-[35px] flex flex-row justify-center gap-1 items-center'>
                        <Image src={logo1} alt='logo' placeholder='blur' className='h-[30px] w-[35px]' />
                        <div className='flex flex-col justify-center items-start gap-0'>
                            <span className='text-[12px] font-semibold text-green-700'>ACROSS NIGERIA</span>
                            <span className='text-[10px] text-green-500'>REALITY SHOW</span>
                        </div>
                    </div>
                    <span className="text-[14px]">Are you sure you want to delete this skit?</span>
                    <div className="flex pt-[15px] mt-[10px] flex-row items-center justify-evenly gap-2 ">
                        <button onClick={deleteSkit} className="h-[35px] rounded-[10px] flex flex-row items-center justify-center text-white hover:bg-red-600 gap-2 w-[130px] text-[14px] bg-red-500 ">
                            { isDeleting && 
                                <CycleLoader size={'15px'}/>
                            }
                            <span>Delet{isDeleting?'ing...':'e'}</span>
                        </button>
                        <button onClick={closeFunction} className="h-[35px] text-[14px] hover:bg-gray-300 bg-transparent border-1 border-green-500 rounded-[10px] w-[120px] ">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DeleteSkitModal;