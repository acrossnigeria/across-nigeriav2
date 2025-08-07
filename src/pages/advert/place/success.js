import { useEffect, useState } from "react";
import SuccessIcon from "../../../../public/images/icon/SuccessIcon";
import { useRouter } from "next/router";


const AdSuccess = () => {
    const router = useRouter();

    return (
        <div className="flex flex-col h-screen w-screen text-center items-center justify-center">
            <div className=" flex flex-col justify-center items-center gap-3">
                <SuccessIcon/>
                <span>You Advert has been placed successfully</span>
                <div className="flex flex-col gap-2 mt-[20px]">
                    <button onClick={()=>{router.push('/')}} className="h-[45px] bg-transparent border-1 border-green-900 hover:bg-green-500 transition-all ease-in-out duration-300 rounded-[10px] w-[250px]">Go home</button>
                    <button onClick={()=>{router.push('/advert/place')}} className="h-[45px] bg-green-500 text-white hover:bg-green-700 transition-all duration-300 ease-in-out rounded-[10px] w-[250px]">Place another advert</button>
                </div>
            </div>
        </div>
    )
}

export default AdSuccess;