import { useEffect, useState } from "react";
import Next from "../../../public/images/icon/Next";
import { useRouter } from "next/router";
import CycleLoader from "@/components/CycleLoader";
import { useSession } from "next-auth/react";
import Image from "next/image";
import adIllust from "../../../public/images/illustration/adIllust.svg";
import axios from "axios";
import StepOne from "./components/StepOne";

const Page = () => {
    const router = useRouter();
    const { data:session } = useSession();
    const [ step, setStep ] = useState(1);


    return (
        <div className="pt-[5%] bg-green-800 flex flex-col h-screen">
            <div className="pl-[3%] text-[18px] w-[100%]">
                <button onClick={()=>{router.push('/')}} className="w-fit flex flex-row items-center transition-all duration-500 ease-in-out hover:scale-105 text-white gap-2"><div className="rotate-180"><Next bg={'black'} size={'20px'}/></div>Go back</button>
            </div>
            { step === 1 && <StepOne/>}
        
        </div>
    )
}

export default Page;