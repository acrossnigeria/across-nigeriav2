import Layout from "@/components/Layout";
import Image from "next/image";
import banner from "../../../../public/images/skitBanner.jpg";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Trophy1Icon from "../../../../public/images/icon/Trophy1Icon";
import Trophy2Icon from "../../../../public/images/icon/Trophy2Icon";
import Trophy3Icon from "../../../../public/images/icon/Trophy3Icon";
import { useSession } from "next-auth/react";
import logo1 from "../../../../public/images/logo1.png";
import Close from "../../../../public/images/icon/Close";
import Profile from "../../../../public/images/icon/Profile";
import InfoIcon from "../../../../public/images/icon/InfoIcon";

const Winners = () => {
    const [ isMobile, setIsMobile ] = useState(false);
    const router = useRouter();

    return (
        <Layout title={'Across Skit Competition: win money making skits, for all skit makers and theater art students'} hideNav={true}>
            <div className="flex flex-col justify-start w-[100%] pt-[30px] items-center">
                <Trophy1Icon/>
                <div className="text-center md:w-[50%] flex flex-col items-center w-[100%]">
                    <span className="md:text-[45px] text-[35px] font-bold">WINNERS</span>
                    <div className="border-y-1 border-x-1 border-gray-300 mt-[15px] flex flex-col gap-1 w-[100%]">
                        <div className="h-[90px] px-2 flex border-b-1 border-gray-300 flex-row gap-2 justify-start items-center w-[100%]">
                            <Profile size={'70px'} bg={'gray'}/>
                            <div style={{lineHeight:'10px'}} className="flex flex-col gap-2 items-start">
                                <span className="text-[16px] font-bold">ABDULLAHI AKAMO</span>
                                <span className="text-yellow-500 font-bold text-[16px]">&#8358;100,000</span>
                                <span className="text-green-600 font-bold">1st Prize</span>
                            </div>
                        </div>

                        <div className="h-[90px] px-2 flex border-b-1 border-gray-300 flex-row gap-2 justify-start items-center w-[100%]">
                            <Profile size={'70px'} bg={'gray'}/>
                            <div style={{lineHeight:'10px'}} className="flex flex-col gap-2 items-start">
                                <span className="text-[16px] font-bold">VICTOR OJO</span>
                                <span className="text-yellow-500 font-bold text-[16px]">&#8358;30,000</span>
                                <span className="text-green-600 font-bold">2nd Prize</span>
                            </div>
                        </div>

                        <div className="h-[90px] px-2 flex flex-row gap-2 justify-start items-center w-[100%]">
                            <Profile size={'70px'} bg={'gray'}/>
                            <div style={{lineHeight:'10px'}} className="flex flex-col gap-2 items-start">
                                <span className="text-[16px] font-bold">MUHYDEEN OLAIYA</span>
                                <span className="text-yellow-500 font-bold text-[16px]">&#8358;20,000</span>
                                <span className="text-green-600 font-bold">3rd Prize</span>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-[100%] w-[94%] flex flex-row justify-start items-start gap-2 bg-green-200 mt-[20px] h-[fit] py-[10px] p-2">
                        <InfoIcon/>
                        <div className="font-semibold text-left text-green-950 w-[90%]">🎉 Congratulations to our winners! The Skit Challenge may be over, but get ready for something even bigger — 
                            <strong>Skit Across Nigeria</strong> is coming soon with higher cash prizes and even more exposure for skit makers across the country. 
                            If you&apos;ve got talent, creativity, and a camera,  now&apos;s the time to start preparing. <strong>Skit Across Nigeria is your next
                             big stage.</strong> Stay tuned and be ready to bring your best!
                        </div>
                    </div>
                    <button onClick={()=>{router.push('/')}} className="bg-green-600 hover:bg-green-800 flex flex-row justify-center items-center text-white w-[200px] h-[40px] mt-[30px]">Back Home</button>
                </div>
            </div>
        </Layout>
    )
}

export default Winners;