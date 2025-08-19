"use client";

import { ShieldCheck, CheckCircle2, Check, ChevronLeft } from "lucide-react";
import Image from "next/image";
import PaystackClick from "@/components/PaystackClick";
import { getSession, useSession } from "next-auth/react";
import HeadComponent from "@/components/HeadComponent";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProcessLoader from "@/components/ui/ProcessLoader";
import axios from "axios";
import ErrorCard from "@/components/ui/ErrorCard";
import Loader from "@/components/Loader";
import Layout from "@/components/Layout";
import ShrimpLoader from "@/components/ui/ShrimpLoader";

export default function Register() {
    const { data: session } = useSession();
    const router = useRouter();

    const [ isProccessing, setIsProcessing ] = useState(false);
    const [ isRegistered, setIsRegistered ] = useState(false);
    const [ checkingUser, setCheckingUser ] = useState(true);

    const [ regError, setRegError ] = useState("Unknown Error, Please contact customer care or any of our social media handles");
    const [ showRegError, setShowRegError ] = useState(false);

    const userEmail = session?.user?.email;
    const userId = session?.user?._id;
    const amount = 5000; // Registration fee in Naira
    const purpose = "Registration for Skits Across Nigeria";


    const handlePaymentSuccess = async (ref) => {
        const data = {
            paymentRef:ref.reference,
            userId
        }
        try {
            setIsProcessing(true);
            const response = await axios.post("/api/skit-across-nigeria/auth", data);
            const regSuccess = response.data?.isRegistered;
            if (regSuccess) {
                setTimeout(() => {
                    setIsRegistered(true);
                    setIsProcessing(false);
                }, 1000);
            } else {
                setShowRegError(true);
                setRegError("Registration Unsuccessfull, please contact any of our customer care.");
            }
        } catch (err) {
            setIsProcessing(false);
            setShowRegError(true);
            setRegError(err.message);
        }
    };


    // check data
    useEffect(()  => {
        const getRegData = async () => {
            try {
                const response = await axios.get(`/api/skit-across-nigeria/auth?userId=${session?.user?._id}`);
                const isRegistered = response.data.isUserRegistered;
                if (isRegistered ) {
                    setIsRegistered(true);
                    setCheckingUser(false);
                } else  {
                    setIsRegistered(false);
                    setCheckingUser(false);
                } 
            } catch (err) {
                console.log("Something went wrong: "+err.message);
            }
    }

    getRegData();
  }, [ session ]);


  return (
        <Layout hideAdvertCard={true} hideFooter={true} hideNav={true}>
        <HeadComponent
            title="Register for Skit Across Nigeria Reality Show"
            desc="Sign up now to join the Skit Across Nigeria Reality Show. Submit your original skit, gain nationwide exposure, and stand a chance to win ₦100,000. Registration is free and open to all Theatre Arts students and skit creators."
            image="https://acrossnig.com/images/skit_across_nigeria.jpg"
            canonical="https://acrossnig.com/images/skit_across_nigeria_skit.jpg"
            url="https://acrossnig.com/skit-across-nigeria/pgs/register"
            keywords="register skit competition, skit contest Nigeria, upload skit, join skit competition, win cash skits, Theatre Arts Nigeria, Nigerian skit challenge, across nigeria registration, free entry skit competition"
        />
        <Loader/>

        { checkingUser ? (
            <div className="w-full h-[90vh] flex flex-col justify-center items-center">
                <ShrimpLoader />
            </div> 
        ):(
            <div className="bg-white h-fit flex flex-col items-center justify-center px-4 font-poppins">
                <div className="w-[125px] self-start mt-2 cursor-pointer md:ml-[3%] hover:bg-gray-300 border border-gray-700 transition-all ease-in-out duration-300 text-gray-700 rounded-[30px] flex items-center justify-center h-[30px]" onClick={()=>{router.back()}}>
                    <ChevronLeft size={'20px'} className="text-gray-700 cursor-pointer"/>
                    Go back
                </div>
                <div className="max-w-xl w-full pb-14 pt-1 mt-1 px-1">

                    <div className="flex flex-row bg-gradient-to-t from-gray-100 rounded-b-[20px] to-transparent h-[210px] items-center justify-between gap-2">
                        <div className="w-[55%] h-full flex flex-col justify-end pl-3 gap-2 pb-3 overflow-hidden">
                            <h1 className="text-2xl pl-4 font-bold text-gray-900 mb-5 mt-5 text-left">
                                Register for Skits Across Nigeria
                            </h1>
                        </div>
                        <div className="w-[40%] h-full overflow-hidden relative">
                            <Image
                            src={"/svg/Success-factors-amico.svg"}
                            alt="Skit Competition Banner"
                            className="h-full w-[40%]"
                            layout="fill"
                            objectFit="contain"
                            />
                        </div>
                    </div>


                    <div className="mb-4 mt-5 space-y-2 px-4">
                        <p className="text-gray-700 text-[15px] flex flex-row items-start gap-2">
                            <CheckCircle2 size={20} className="text-green-600" />
                            One-time Registration Fee: ₦5,000
                        </p>
                        <p className="text-gray-700 text-[15px] flex items-start gap-2">
                            <CheckCircle2 size={20} className="text-green-600" />
                            Upload skits anytime during the 6-month season
                        </p>
                        <p className="text-gray-700 text-[15px] flex items-start gap-2">
                            <CheckCircle2 size={20} className="text-green-600" />
                            Eligible to win up to ₦30 Million & Movie Deal
                        </p>
                    </div>
                    <ErrorCard className={'w-[90%] mx-auto'} showError={showRegError} setShowError={setShowRegError} error={regError}/>

                { !isRegistered ? (
                        <div className="mt-4 w-[90%] mx-auto flex items-center justify-center">
                            { isProccessing ? (
                                <ProcessLoader color={"gray"} size={'35px'}/>
                                ) : (
                                <PaystackClick callBack={handlePaymentSuccess} email={userEmail} purpose={purpose} amount={amount} buttonText={'Pay ₦5,000 and Register'}/> 
                            )}
                        </div>
                ): (
                        <div className="mt-8 w-[90%] mx-auto flex flex-col items-center justify-center">
                            <button onClick={()=>{router.push("/skit-across-nigeria/pgs/video/upload")}} className="h-[45px] w-full text-white bg-green-600 hover:bg-green-700 transition-all duration-200 rounded-[20px]">Upload My Skit</button>
                            <button onClick={()=>{router.push("/skit-across-nigeria/pgs/")}} className="h-[45px] w-full border border-black mt-[10px] hover:bg-gray-400 transition-all duration-200 rounded-[20px]">Explore skits</button>
                        </div>
                )}

                { !isRegistered ? (
                    <div className="mt-[70px] text-sm text-gray-600 text-center">
                        <ShieldCheck className="inline-block w-4 h-4 mr-1 text-green-500" />
                        Secure Payment via Paystack
                    </div>
                ):(
                    <div className="mt-6 text-md text-gray-600 text-center">
                        <Check className="inline-block w-4 h-4 mr-1 text-green-500" />
                        You&apos;re Registered
                    </div>
                )}
            </div>
        </div>
        )}
        </Layout>
  );
}


