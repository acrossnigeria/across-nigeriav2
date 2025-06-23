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

const Landing = () => {
    const [ isMobile, setIsMobile ] = useState(false);
    const router = useRouter();
    const { status, data:session } = useSession();

    const [ nlModalOpacity, setNlModalOpacity ] = useState('opacity-0');
    const [ nlBgOpacity, setNlBgOpacity ] = useState('opacity-0');
    const [ showModal, setShowModal ] = useState(false);
    
    useEffect(()=>{
        if(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)&&window.matchMedia("(max-width: 600px)").matches){ 
            setIsMobile(true)
        } else{setIsMobile(false)}
    // console.log(isMobile, navigator.userAgent)
      }, [ isMobile ])

    const toUploadPage = () => {
        if (session?.user?.name) {
            router.push('/skit-across-nigeria/pages/add-skit');
        } else {
            notLoggedIn('in');
        }
    }

    const notLoggedIn = (transiton) => {
        if (transiton==='in') {
            setShowModal(true);
            setTimeout(() => {
                setNlBgOpacity('opacity-100');
                setNlModalOpacity('opacity-100');
            }, 300);
        } else {
            setNlBgOpacity('opacity-0');
            setNlModalOpacity('opacity-0');
            setTimeout(() => {
                setShowModal(false);
            }, 1000);
        }
    }

    return (
        <Layout title={'Across Skit Competition: win money making skits, for all skit makers and theater art students'} hideNav={true}>
            <div className="flex flex-col md:max-w-[750px] w-[95%]  border-1 bg-white shadow-lg shadow-green-900 mt-2 mx-auto pb-[80px]">
                { showModal && 
                    <div className={`fixed left-0 ${nlBgOpacity} transition-all duration-300 ease-in-out backdrop-blur-sm h-screen w-screen flex flex-co items-center justify-center gap-3 bg-black/50 z-[1000] top-0`}>
                        <div className="h-fit flex flex-col justify-center w-[100%] items-center">
                            <button onClick={()=>{notLoggedIn('out')}} className="border-1 text-[14px] flex flex-row gap-2 text-white hover:bg-green-600/50 hover:scale-105 transition-all duration-300 ease-in-out justify-center items-center px-[20px] py-1 rounded-[20px] mb-[20px] border-gray-100">
                                <Close bg={'white'} size={'15px'}/>
                                Close
                            </button>
                            <div className={`overflow-hidden h-[400px] md:w-[400px] transition-all duration-500 ease-in-out w-[80%] text-center ${nlModalOpacity} p-3 flex flex-col justify-center items-center bg-gray-100 rounded-[5px]`}>
                                <div className='text-center mb-[35px] flex flex-row justify-center gap-1 items-center'>
                                    <Image src={logo1} alt='logo' placeholder='blur' className='h-[30px] w-[35px]' />
                                    <div className='flex flex-col justify-center items-start gap-0'>
                                        <span className='text-[12px] font-semibold text-green-700'>ACROSS NIGERIA</span>
                                        <span className='text-[10px] text-green-500'>REALITY SHOW</span>
                                    </div>
                                </div>
                                <span >Oops! You have to Log In or Register</span>
                                <div className="flex mt-[20px] flex-col items-center gap-3">
                                    <button onClick={()=>router.push('/account/reg?redirect=/skit-across-nigeria/pages/add-skit')} className="h-[40px] w-[200px] text-white bg-green-500 hover:bg-green-700 rounded-[5px]">Register Now</button>
                                    <button onClick={()=>router.push('/account/login?redirect=/skit-across-nigeria/pages/add-skit')} className="border-1 h-[40px] hover:bg-black/20 rounded-[5px] w-[200px] border-gray-500">Log In</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                <div className={`flex flex-col bg-green-100/50 pb-5 h-[fit-content] justify-center`}>
                    <div className={`w-[100%] md:h-[250px] h-[180px] relative`}>
                        <Image className="bg-gray-300" alt='banner' layout="fill" objectFit="fill" src={banner}/>
                    </div> 
                    <div className={` border-black mx-3 mt-4 leading-tight self-center flex flex-col h-[fit-content]`}>
                        <span  className={`font-extrabold text-[28px] leading-tight text-center text-pretty bg-gradient-to-bl from-green-400 to-green-700 bg-clip-text text-transparent`}> Skit Across Nigeria 1.0 </span> 
                        <span className={`text-[20px] text-gray-600 text-center mt-1`} >Showcase your creativity & win up to &#8358;100,000!</span>
                    </div>
                </div>

            <div className="flex flex-col md:w-[50%] w-[94%] mb-7 mx-auto">
                <span className="font-bold text-[20px] leading-tight mt-[30px] mb-[10px] text-center">🎬 Theme: &quot;What Not to Do When Dating in Nigeria&quot;</span>
                <span className="text-center text-gray-600 leading-tight text-[18px]">Think you&apos;ve got the best take on this? Create, upload, and let the world decide!</span>
                <div className="flex flex-col gap-2 bg-gray-200 rounded-[5px] px-3 py-3 mt-5 mb-5 items-start">
                    <span className="font-semibold">✅ Open to everyone</span>
                    <span className="font-semibold">💰 Participation fee: ₦5,000 </span>
                    <span className="font-semibold">🗳️ Voting costs ₦100 per vote</span>
                    <span className="font-semibold">🌍 Anyone can vote — users & non-users alike</span>
                    <span className="font-semibold">🔁 Voters can cast as many votes as they want</span>
                    <button onClick={toUploadPage} className="h-[40px] mt-4 text-white px-[30px] bg-green-500 rounded-[5px] mx-auto hover:bg-green-600 hover:scale-105 transition-all duration-250 ease-in-out">Upload Your skit Now!</button>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-2 mb-7 md:w-[50%] w-[94%] mx-auto text-center">
                <span className="font-bold">Got a Favorite? Vote & Support a Skit!</span>
                <span className="text-gray-600">The more you vote, the closer they get to winning — ₦100 per vote, unlimited voting!</span>
                <button onClick={()=>{router.push('/skit-across-nigeria/pages')}} className="h-[45px] mt-[20px] w-[190px] bg-transparent hover:bg-gray-300 rounded-[5px] mx-auto border-1 border-black hover:scale-105 transition-all duration-250 ease-in-out">Watch Skits</button>
            </div>
            <span className="font-extrabold text-[30px] text-center text-pretty bg-gradient-to-bl from-green-400 to-green-700 bg-clip-text text-transparent ">PRIZES</span>
            <div className="flex md:flex-row flex-col justify-around gap-3 mt-[10px] mb-5 items-end px-[3%]">
                <div className="md:w-[30%] w-[100%] h-[200px] border-1 flex flex-col gap-3 justify-center items-center border-yellow-400 rounded-[5px]">
                    <span className="font-bold text-[19px] text-pretty bg-gradient-to-bl from-black to-gray-200 bg-clip-text text-transparent">1st Place</span>
                    <Trophy1Icon/>
                    <span className="font-extrabold text-[23px] text-pretty bg-gradient-to-bl from-yellow-400 to-yellow-700 bg-clip-text text-transparent">&#8358;100,000</span>
                </div>
                <div className="md:w-[30%] w-[100%] h-[200px] border-1 flex flex-col gap-3 justify-center items-center border-orange-400 rounded-[5px]">
                    <span className="font-bold text-[19px] text-pretty bg-gradient-to-bl from-black to-gray-200 bg-clip-text text-transparent">2nd Place</span>
                    <Trophy2Icon/>
                    <span className="font-extrabold text-[23px] text-pretty bg-gradient-to-bl from-orange-400 to-orange-700 bg-clip-text text-transparent">&#8358;30,000</span>
                </div>
                <div className="md:w-[30%] w-[100%] h-[200px] border-1 flex flex-col gap-3 justify-center items-center border-green-400 rounded-[5px]">
                    <span className="font-bold text-[19px] text-pretty bg-gradient-to-bl from-black to-gray-200 bg-clip-text text-transparent">3rd Place</span>
                    <Trophy3Icon/>
                    <span className="font-extrabold text-[23px] text-pretty bg-gradient-to-bl from-green-400 to-green-700 bg-clip-text text-transparent">&#8358;20,000</span>
                </div>
            </div>

            <div className="flex flex-col bg-gradient-to-b from-green-900 py-3 rounded-r-[20px] md:rounded-r-[150px] pb-[40px] to-orange-400 mt-[20px] justify-around gap-3 items-start px-[3%]">
                <div className="text-[20px] w-[100%] text-center font-bold text-white">How it works?</div>
                <div className="md:w-[30%] w-[100%] md:h-[50px] h-[80px] mt-[10px] flex flex-col items-start">
                    <span className="font-bold text-[19px] text-pretty text-white">1. Sign Up</span>
                    <span className="text-[15px] ml-3 text-pretty  text-white">Participants must have an account</span>
                </div>
                <div className="md:w-[30%] w-[100%] md:h-[50px] h-[80px] flex flex-col items-start">
                    <span className="font-bold text-[19px] text-pretty text-white">2. Create & upload</span>
                    <span className="text-[15px] ml-3 text-pretty  text-white">Submit your best skit.</span>
                </div>
                <div className="md:w-[30%] w-[100%] md:h-[50px] h-[80px] flex flex-col items-start">
                    <span className="font-bold text-[19px] text-pretty text-white">3. Share your skit</span>
                    <span className="text-[15px] ml-3 text-pretty  text-white">The more votes, the higher your chances</span>
                </div>
                <div className="md:w-[30%] w-[100%] md:h-[50px] h-[80px] flex flex-col items-start">
                    <span className="font-bold text-[19px] text-pretty text-white">4. Win big!</span>
                    <span className="text-[15px] ml-3 text-pretty  text-white">The skit with the most votes wins the grand prize!</span>
                </div>
                <button onClick={toUploadPage} className="h-[40px] text-white mt-5 w-[200px] bg-green-500 rounded-[5px] mx-auto hover:bg-green-600 hover:scale-105 transition-all duration-250 ease-in-out">Upload Your skit Now!</button>
            </div>
            <div className="flex flex-col justify-center items-center gap-2 mt-[25px] md:w-[50%] w-[90%] mx-auto text-center">
                <span className="text-[19px] font-bold">🌟 Just want to watch skits!</span>
                <span className="text-[15px] text-gray-500">Get entertained while you support your best skit</span>
                <button onClick={()=>{router.push('/skit-across-nigeria/pages')}} className="h-[45px] mt-5 w-[200px] bg-transparent hover:bg-gray-300 rounded-[5px] mx-auto border-1 border-black hover:scale-105 transition-all duration-250 ease-in-out">Watch Skits</button>
            </div>
            </div>
        </Layout>
    )
}

export default Landing;