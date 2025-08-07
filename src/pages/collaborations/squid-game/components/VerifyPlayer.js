import React, { useEffect, useState } from "react";
import { Loader2, ShieldCheck, MessageCircleHeart, TriangleAlert, Check } from "lucide-react";
import ProcessLoader from "@/components/ui/ProcessLoader";
import axios from "axios";

export default function VerifyingStageOne( { toRulesPage, userId, toAccessDenied, setEntryCode, toSubmittedPage } ) {
    const [ checkError, setCheckError ] = useState("Unknown");
    const [ showCheckError, setShowCheckError ] = useState(false);
    const [ isProcessing, setIsProcessing ] = useState(true);
    const [ isPassed, setIsPassed ] = useState(true);
    const [ hasParticipated, setHasParticipated ] = useState(false);

    const checkStatus = async() => {
        setCheckError("Unknwon");
        setShowCheckError(false);
        setIsProcessing(true);
        try {
            const response = await axios.get(`/api/squid_game/participant?userId=${userId}&isVerification=${true}`);
            if ( response.status === 200 ) {
                const isQualified = response.data?.userData?.isQualified;
                setEntryCode(response.data?.userData?.entryCode);
                const hasParticipated = response.data?.userData?.hasParticipated;
                if ( isQualified ) {
                    handleIsPassed(hasParticipated);
                } else { 
                    handleNotPassed();
                 }
            }
        } catch (err) {
            handleCheckError(err.message)
        }
    };

    const handleCheckError = (errorMsg) => {
        setCheckError(errorMsg);
        setShowCheckError(true);
    }

    const handleIsPassed = ( hasParticipated ) => {
        setIsPassed(true);
        setIsProcessing(false)
        setTimeout(() => {
            if (hasParticipated) {
                toSubmittedPage();
            } else {
                toRulesPage();
            }
        }, 2700);
    }

    const handleNotPassed = () => {
        setIsPassed(false);
        setIsProcessing(false)
        setTimeout(() => {
            toAccessDenied();
        }, 2700);
    }

    useEffect( () => {
        const runCheck = () => { checkStatus() };
        runCheck();
    }, [])

    
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
        <div className="flex items-center gap-3 mb-6">
            <ShieldCheck size={32} className="text-green-500 animate-pulse" />
            <h1 className="text-2xl font-bold">Verifying Access</h1>
        </div>

        <p className="text-gray-300 text-center max-w-md mb-4">
            Hold on tight! We&apos;re checking if you&apos;ve successfully completed 
            <span className="text-white font-semibold"> Stage 1 (WhatsApp Challenge)</span> to unlock the Squid Game quiz.
        </p>

        { showCheckError ? (
            <div className="flex flex-col items-center gap-2 mt-6">
                <TriangleAlert color={"red"} size={'27px'}/>
                <span className="text-sm text-gray-400">{checkError}</span>
                <button onClick={checkStatus} className="py-2 w-[80%] mt-3 bg-gray-300 hover:bg-gray-500 border-gray-700">Retry</button>
            </div>
        ):(  isProcessing ? (
                <div className="flex items-center gap-2 mt-6">
                    <ProcessLoader color={"white"} size={'27px'}/>
                    <span className="text-sm text-gray-400">Checking status...</span>
                </div>
            ):( isPassed ? (
                    <div className="flex items-center gap-2 mt-6">
                        <Check size={"27px"} className="text-green-500" />
                        <span className="text-sm text-gray-400">Successfully verified</span>
                    </div>
                ):(
                    <div className="flex items-center gap-2 mt-6">
                        <TriangleAlert size={"27px"} className="text-red-500" />
                        <span className="text-sm text-gray-400">Access denied</span>
                    </div>
                )

            )  
        )}

        <div className="mt-10 flex items-center gap-2 text-sm text-gray-400">
            <MessageCircleHeart size={16} className="text-pink-400" />
            <span>Powered by Across Nigeria Reality show</span>
        </div>
        </div>
    );
}
