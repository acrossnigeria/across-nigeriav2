import { useEffect, useState } from "react";
import Next from "../../../public/images/icon/Next";
import { useRouter } from "next/router";
import CycleLoader from "@/components/CycleLoader";
import { useSession } from "next-auth/react";
import Image from "next/image";
import adIllust from "../../../public/images/illustration/adIllust.svg";
import axios from "axios";
import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";

const Page = () => {
    const router = useRouter();
    const { data:session } = useSession();
    const [ step, setStep ] = useState(2);
    
    const [ advertType, setAdvertType ] = useState(0);
    const [ billingType, setBillingType ] = useState('daily');
    const [ duration, setDuration ] = useState(1);
    const [ displayMode, setDisplayMode ] = useState('static');

    const nextScreen = () => {
        if (step<4) {
            setStep(step+1)
        }
    }


    return (
        <div className="pt-[20px] bg-gray-200 flex flex-col h-screen">
            <div className="pl-[3%] text-[18px] w-[100%]">
                <button onClick={()=>{router.push('/')}} className="w-fit flex flex-row items-center transition-all duration-500 ease-in-out hover:scale-105 gap-2"><div className="rotate-180"><Next bg={'black'} size={'20px'}/></div>Go back</button>
            </div>
            { step === 1 && <StepOne nextScreen={nextScreen} selectAdvert={setAdvertType} selectedAdvert={advertType}/>}
            { step === 2 && <StepTwo 
                            duration={duration} 
                            setDuration={setDuration} 
                            billingType={billingType} 
                            setBillingType={setBillingType} 
                            nextScreen={nextScreen}
                            setDisplayMode={setDisplayMode}
                            displayMode={displayMode}
                            advertType={advertType}/>
            }
        
        </div>
    )
}

export default Page;