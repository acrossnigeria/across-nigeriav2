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
            router.push('/theater-skit-across-nigeria/pages/add-skit');
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
            <div className="flex flex-col w-[100%] pb-[80px]">
                { showModal && 
                    <div className={`fixed ${nlBgOpacity} transition-all duration-300 ease-in-out backdrop-blur-sm h-screen w-screen flex flex-co items-center justify-center gap-3 bg-black/50 z-[1000] top-0`}>
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
                                <span className="text-[14px]">Oops! You have to Log In or Register</span>
                                <div className="flex mt-[20px] flex-col items-center gap-2">
                                    <button onClick={()=>router.push('/account/reg')} className="h-[40px] px-[20px] text-white bg-green-500 hover:bg-green-700 rounded-[20px]">Register Now</button>
                                    <button onClick={()=>router.push('/account/login')} className="text-gray-600 hover:text-black">Log In</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                <div className={`flex ${isMobile?'flex-col':'flex-row'} rounded-bl-[30px] bg-gradient-to-t from-gray-200 to-white h-[fit-content] justify-center ${isMobile?'':'px-[10%]'} py-[20px]`}>
                    <div className={` border-black ${isMobile?'w-[94%]':'w-[40%]'} self-center flex flex-col h-[fit-content] mb-[15px]`}>
                        <span style={{lineHeight:(isMobile?'28px':'35px')}} className={`font-bold ${isMobile?'text-[25px] text-center':'text-[34px]'} text-pretty bg-gradient-to-bl from-green-400 to-green-700 bg-clip-text text-transparent`}> Across Nigeria Reality Show Presents: The Ultimate Skit Challenge! </span> 
                        <span style={{lineHeight:'24px'}} className={`${isMobile?'text-center text-[20px]':'text-[25px]'} mt-3`} >Showcase your creativity & win up to &#8358;100,000!</span>
                    </div>
                    <div style={{height:(isMobile?'200px':'400px')}} className={`${isMobile?'w-[98%] left-[1%]':'w-[60%]'} mt-[20px] relative`}>
                        <Image className="bg-gray-300" style={{borderRadius:'22px'}} alt='banner' layout="fill" objectFit="fill" src={banner}/>
                    </div> 
                </div>

            <div className="flex flex-col md:w-[50%] w-[94%] mb-[30px] mx-auto">
                <span className="font-bold text-[20px] mt-[30px] mb-[10px] text-center">🎬 Theme: &quot;What Not to Do When Dating in Nigeria&quot;</span>
                <span className="text-center text-[18px]">Think you&apos;ve got the best take on this? Create, upload, and let the world decide!</span>
                <div className="flex flex-col gap-2 bg-gray-200 rounded-[10px] p-2 py-3 mt-[20px] items-start">
                    <span className="font-semibold">✅ Open to Theatre Arts students & skit makers</span>
                    <span className="font-semibold">✅ Participation & Voting are FREE!</span>
                    <span className="font-semibold">✅ 3 minutes max | Original content only</span>
                    <span className="font-semibold">✅ Voters can only vote for ONE skit</span>
                    <button onClick={toUploadPage} className="h-[40px] text-white mt-[20px] px-[30px] bg-green-500 rounded-[25px] mx-auto hover:bg-green-600 hover:scale-105 transition-all duration-250 ease-in-out">Upload Your skit Now!</button>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-2 mb-[20px] md:w-[50%] w-[94%] mx-auto text-center">
                <span className="text-[19px] font-bold">🌟 Got a Favorite? Vote & Support a Skit!</span>
                <span className="text-[15px] text-gray-500">Only ONE vote per user, make it count! Help your favorite creator win BIG!</span>
                { session?.user?.name ? (
                    <button onClick={()=>{router.push('/theater-skit-across-nigeria/pages')}} className="h-[45px] mt-[20px] px-[40px] bg-transparent hover:bg-gray-300 rounded-[25px] mx-auto border-1 border-black hover:scale-105 transition-all duration-250 ease-in-out">Watch Skits</button>
                ):(
                    <button onClick={()=>{router.push('/account/reg')}} className="h-[40px] mt-[20px] px-[30px] bg-transparent hover:bg-gray-300 rounded-[25px] mx-auto border-1 border-black hover:scale-105 transition-all duration-250 ease-in-out">Sign Up To Vote</button>
                )}
            </div>
            <span className="font-bold md:text-[25px] text-[20px] text-center text-pretty bg-gradient-to-bl from-green-400 to-green-700 bg-clip-text text-transparent ">🏆 PRIZES</span>
            <div className="flex md:flex-row flex-col justify-around gap-3 mt-[10px] items-end px-[3%]">
                <div className="md:w-[30%] w-[100%] h-[200px] border-1 flex flex-col gap-3 justify-center items-center border-yellow-400 rounded-[10px]">
                    <span className="font-bold text-[19px] text-pretty bg-gradient-to-bl from-black to-gray-200 bg-clip-text text-transparent">1st Place</span>
                    <Trophy1Icon/>
                    <span className="font-extrabold text-[23px] text-pretty bg-gradient-to-bl from-yellow-400 to-yellow-700 bg-clip-text text-transparent">&#8358;100,000</span>
                </div>
                <div className="md:w-[30%] w-[100%] h-[200px] border-1 flex flex-col gap-3 justify-center items-center border-orange-400 rounded-[10px]">
                    <span className="font-bold text-[19px] text-pretty bg-gradient-to-bl from-black to-gray-200 bg-clip-text text-transparent">2nd Place</span>
                    <Trophy2Icon/>
                    <span className="font-extrabold text-[23px] text-pretty bg-gradient-to-bl from-orange-400 to-orange-700 bg-clip-text text-transparent">&#8358;30,000</span>
                </div>
                <div className="md:w-[30%] w-[100%] h-[200px] border-1 flex flex-col gap-3 justify-center items-center border-green-400 rounded-[10px]">
                    <span className="font-bold text-[19px] text-pretty bg-gradient-to-bl from-black to-gray-200 bg-clip-text text-transparent">3rd Place</span>
                    <Trophy3Icon/>
                    <span className="font-extrabold text-[23px] text-pretty bg-gradient-to-bl from-green-400 to-green-700 bg-clip-text text-transparent">&#8358;20,000</span>
                </div>
            </div>

            <div className="flex flex-col bg-gradient-to-b from-green-900 py-3 rounded-r-[20px] md:rounded-r-[150px] pb-[40px] to-orange-400 mt-[20px] justify-around gap-3 items-start px-[3%]">
                <div className="text-[20px] w-[100%] text-center font-bold text-white">How it works?</div>
                <div className="md:w-[30%] w-[100%] md:h-[50px] h-[80px] mt-[10px] flex flex-col items-start">
                    <span className="font-bold text-[19px] text-pretty text-white">1. Sign Up</span>
                    <span className="text-[15px] ml-3 text-pretty  text-white">Participants & Voters must have an account</span>
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
                <button onClick={toUploadPage} className="h-[40px] text-white mt-[20px] px-[30px] bg-green-500 rounded-[25px] mx-auto hover:bg-green-600 hover:scale-105 transition-all duration-250 ease-in-out">Upload Your skit Now!</button>
            </div>
            <div className="flex flex-col justify-center items-center gap-2 mt-[25px] md:w-[50%] w-[94%] mx-auto text-center">
                <span className="text-[19px] font-bold">🌟 Just want to watch skits!</span>
                <span className="text-[15px] text-gray-500">Get entertained while you support your best skit</span>
                <button onClick={()=>{router.push('/theater-skit-across-nigeria/pages')}} className="h-[45px] mt-[20px] px-[40px] bg-transparent hover:bg-gray-300 rounded-[25px] mx-auto border-1 border-black hover:scale-105 transition-all duration-250 ease-in-out">Watch Skits</button>
            </div>
            </div>
        </Layout>
    )
}

export default Landing;