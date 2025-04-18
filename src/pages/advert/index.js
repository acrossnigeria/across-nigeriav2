import { useEffect, useState } from "react";
import Next from "../../../public/images/icon/Next";
import { useRouter } from "next/router";
import CycleLoader from "@/components/CycleLoader";
import { useSession } from "next-auth/react";
import Image from "next/image";
import adIllust from "../../../public/images/illustration/adIllust.svg";
import axios from "axios";

const Page = () => {
    const [ isBankInfo, setIsBankInfo ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ updateSuccess, setUpdateSuccess ] = useState(false);
    const [ isSaving, setIsSaving ] = useState(false);
    const [ showUpdateModal, setShowUpdateModal ] = useState(false);
    const [ modalHeight, setModalHeight ] = useState('h-[10%]');
    const [ modalOpacity, setModalOpacity ] = useState('opacity-0');
    const [ modalBlur, setModalBlur ] = useState('backdrop-blur-[0px]');
    
    //form state
    const [ bank, setBank ] = useState('');
    const [ bankName, setBankName ] = useState('');
    const [ bankAccNo, setBankAccNo ] = useState('');

    const router = useRouter();
    const { data:session } = useSession();

    const modal = (type) => {
        if (type==='in') {
            setShowUpdateModal(true);

            setTimeout(() => {
                setModalHeight('h-[85%]');
                setModalOpacity('opacity-[100%]');
                setModalBlur('backdrop-blur-[2px]');
            }, 300);
        } else {
            setModalHeight('h-[10%]');
            setModalOpacity('opacity-0');
            setModalBlur('backdrop-blur-[0px]');

            setTimeout(() => {
                setShowUpdateModal(false);
            }, 500);
        }
    }


    return (
        <div className="pt-[5%] bg-gray-100 flex flex-col">
            <div className="md:w-[50%] md:ml-[25%] ml-[3%] text-[18px] w-[94%]">
                <button onClick={()=>{router.push('/')}} className="w-fit flex flex-row items-center transition-all duration-500 ease-in-out hover:scale-105 gap-2"><div className="rotate-180"><Next bg={'black'} size={'20px'}/></div>Back home</button>
            </div>
            <div className="md:w-[50%] md:ml-[25%] mt-[20px] ml-[3%] flex flex-col text-[18px] w-[94%]">
                <span style={{lineHeight:'20px'}} className="text-[19px] font-extrabold">Promote Your Brand on Across Nigeria</span>
                <span style={{lineHeight:'20px'}} className="mt-[11px]">Get your image banner in front of thousands of viewers nationwide. </span>
            </div>
            <div  className="flex md:w-[50%] md:ml-[25%] md:flex-row mt-[35px] justify-center items-center flex-col">
                <div className={`relative md:h-[280px] md:w-[50%]  w-[100%] h-[200px]`}>
                    <Image style={{borderRadius:'22px'}} alt='banner' layout="fill" objectFit="fill" src={adIllust}/>
                </div> 
                <div style={{lineHeight:'21px'}} className="h-fit w-[94%] md:w-[50%] flex flex-col justify-center md:text-left text-center md:mt-0 mt-[30px] md:items-start items-center"> 
                    <span className="w-full text-orange-500 text-[17px] font-bold">Choose from affordable</span> 
                    <span className="w-full text-orange-500 text-[17px] font-bold">ad spots that fit your</span> 
                    <span className="bg-orange-500 text-white w-fit p-1 px-3 mt-[5px] text-[17px] font-extrabold rounded-br-[20px] rounded-tl-[20px]">brand and budget.</span>
                    <button onClick={()=>{modal('in')}} className={`bg-green-500 mt-[25px] hover:bg-green-700 hover:scale-105 border-1 h-[45px] md:w-[60%] border-black w-[100%] text-white transition-all duration-500 ease-in-out rounded-[30px]`}>Get started</button>
                </div>
            </div>
            <div className="md:w-[50%] bg-white rounded-[35px] py-[30px] border-[0.5px] border-gray-400 flex flex-col justify-center items-start px-[4%] md:ml-[25%] mt-[80px]">
                <span className="font-extrabold">Adverts types Overview</span>
                <div className="px-[5%] flex flex-col">
                    <div className="mt-[10px] flex flex-col items-start justify-center">
                        <span className="font-bold">1. Diamond Adverts</span>
                        <div className="px-[5%] flex flex-col text-[16px] items-start justify-center">
                            <span>• Top scroll bar visibility</span>
                            <span>• Premium exposure</span>
                            <span>• N1,000/day, N5,000/week, N20,000/month</span>
                        </div>
                    </div>
                    <div className="mt-[10px] flex flex-col items-start justify-center">
                        <span className="font-bold">2. Gold & Silver Adverts</span>
                        <div className="px-[5%] flex flex-col text-[16px] items-start justify-center">
                            <span>• Top scroll bar visibility</span>
                            <span>• Premium exposure</span>
                            <span>• N1,000/day, N5,000/week, N20,000/month</span>
                        </div>
                    </div>
                    <div className="mt-[10px] flex flex-col items-start justify-center">
                        <span className="font-bold">3. Bronze Adverts</span>
                        <div className="px-[5%] flex flex-col text-[16px] items-start justify-center">
                            <span>• Top scroll bar visibility</span>
                            <span>• Premium exposure</span>
                            <span>• N1,000/day, N5,000/week, N20,000/month</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-[40px] md:w-[50%] px-[3%] flex flex-col md:ml-[25%] mb-[70px]">
                <div className="flex flex-col items-start justify-center">
                    <span className="font-extrabold text-green-500">Why advertise with us?</span>
                    <div className="px-[5%] flex flex-col text-[16px] items-start justify-center">
                        <span>• Seen by fast growing nation wide audience.</span>
                        <span>• Easy setup – upload, pay, and go live</span>
                        <span>• Optional call-to-action button on your ad</span>
                        <span>• Affordable pricing from just ₦100/day</span>
                    </div>
                </div>
                <div style={{lineHeight:'21px'}} className="h-fit p-4 pb-[30px] flex bg-gradient-to-br from-green-500 to-orange-500 rounded-[15px] w-[100%] flex-col justify-center md:text-left text-center mt-[30px] md:items-start items-center"> 
                    <span className="w-full text-white text-[17px] font-bold">Choose your advert level, upload your banner, and go live in minutes!</span>  
                    <button onClick={()=>{modal('in')}} className={`bg-transparent border-1 px-[25px] border-white mt-[10px] hover:bg-green-700 hover:scale-105 h-[45px] md:w-[50%] w-fit text-white transition-all duration-500 ease-in-out rounded-[30px]`}>Get started</button>
                </div>
            </div>

            { showUpdateModal && 
                <div className={`h-screen w-screen transition-all duration-300 ease-in-out bg-black/10 flex flex-col justify-end ${modalBlur} fixed top-0`}>
                    <div className={`${modalHeight} ${modalOpacity} transition-all overflow-hidden duration-500 ease-in-out w-[100%] rounded-t-[30px] pt-[30px] md:px-[25%] px-[3%] bg-gray-100`}>
                        <div className="mb-[20px]">
                            <button onClick={()=>{modal('out')}} className="w-fit flex flex-row items-center transition-all duration-500 ease-in-out hover:scale-105 gap-2"><div className="rotate-180"><Next bg={'black'} size={'20px'}/></div>Go back</button>
                        </div>
                        <span className="text-[23px] font-bold">Fill In Your Bank Info</span>
                        <div className="mt-[20px] text-[18px]">
                            <div>
                                <label htmlFor="bank">Bank</label>
                                <input 
                                    type="text"
                                    className="h-[48px] mt-[7px] px-3 outline-none w-[100%] bg-gray-200 rounded-[15px] border-1 border-gray-400"
                                    placeholder="Enter bank name.."
                                    value={bank}
                                    onChange={(e)=>{setBank(e.target.value)}}
                                />
                            </div>
                            <div className="mt-[10px]">
                                <label htmlFor="bank">Bank account name</label>
                                <input 
                                    type="text"
                                    className="h-[48px] mt-[7px] px-3 outline-none w-[100%] bg-gray-200 rounded-[15px] border-1 border-gray-400"
                                    placeholder="e.g Johnatan eze"
                                    value={bankName}
                                    onChange={(e)=>{setBankName(e.target.value)}}
                                />
                            </div>
                            <div className="mt-[10px]">
                                <label htmlFor="bank">Account number</label>
                                <input 
                                    type="number"
                                    className="h-[48px] mt-[7px] px-3 outline-none w-[100%] bg-gray-200 rounded-[15px] border-1 border-gray-400"
                                    placeholder="Enter account number.."
                                    value={bankAccNo}
                                    onChange={(e)=>{setBankAccNo(e.target.value)}}
                                />
                            </div>
                            <button 
                                className={`h-[45px] w-[100%] mt-[30px] flex flex-row justify-center items-center text-white bg-green-500 hover:scale-105 hover:bg-green-700 transition-all duration-500 ease-in-out rounded-[30px]`}>
                                {isSaving?(<CycleLoader size={'20px'}/>):(updateSuccess?'Saved':'Save')}
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Page;