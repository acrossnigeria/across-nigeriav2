import Link from "next/link";
import FlyStarIcon from "../../public/images/icon/FlyStarIcon";
import TrophyIcon from "../../public/images/icon/TrophyIcon";
import axios from "axios";
import { useState, useEffect } from "react";
import Profile from "../../public/images/icon/Profile";
import { useSession } from "next-auth/react";
import PointIcon from "../../public/images/icon/PointIcon";
import LevelIcon from "../../public/images/icon/LevelIcon";
import ReferCountIcon from "../../public/images/icon/ReferCountIcon";
import ShimmerLoader from "./ui/ShimmerLoader";


const AmbassadorInfo = () => {
    const { status, data:session } = useSession();
    const [ data, setData ] = useState([]);
    const [ errorType, setErrorType ] = useState('Unknown error');
    const [ isErrorOccurred, setIsErrorOccurred ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isAmbassador, setIsAmbassador ] = useState(false);
    const [ refs, setRefs ] = useState(0);

    async function getAmbassadors(user) {
        setIsLoading(true);
        try {
            const response = await axios.get(`/api/ambassador/getAmbassadors${user?`?user=${user}`:''}`);
            if (response.data.success) {
                let rem = 4;
                const tempData = [...response.data.list]

                if (tempData.length<rem) {
                    rem = rem - tempData.length;
                    for (let i = 0;i<=rem;i++) {
                        tempData.push({});
                    }
                }
                setData(tempData);
                if (response.data.isAmbassador) {
                    setIsAmbassador(response.data.isAmbassador);
                    setRefs(response.data.refs);
                }
                
            } else {
                setIsErrorOccurred(true);
                setErrorType(`Error of type: ${response.data.error}`);
            }
        } catch (err) {
            setIsErrorOccurred(true);
            setErrorType(`Error of type: ${err.message}`);
        }
        setIsLoading(false);
    }


    useEffect(()=>{
        setTimeout(() => {
            if (session) {
                getAmbassadors(session?.user?._id);
            } else {
                getAmbassadors(false)
            }
        }, 5000);
    }, [ session ])

    return (
        <div className="w-[95%] md:w-[100%] mt-[10px] ml-[2.5%] md:ml-0 gap-[20px] rounded-[13px] flex flex-col">
            { isLoading ? (
                <div className="bg-white p-3 px-4 pb-4 gap-[9px] rounded-[13px] items-center flex flex-col">
                    <ShimmerLoader roundedness={'30px'} height={'30px'} width={'70%'} />
                    <ShimmerLoader className={"mt-3"} roundedness={'20px'} height={'15px'} width={'90%'} />
                    <ShimmerLoader roundedness={'20px'} height={'15px'} width={'90%'} />
                    <ShimmerLoader className={"mt-4"} roundedness={'30px'} height={'40px'} width={'50%'} />
                </div>
            ):( isAmbassador ? (
                    <div className="bg-white p-3 gap-[15px] rounded-[13px] flex flex-col">
                        <span className="text-gray-700 text-center text-[20px] font-semibold">Your ambassador statistics </span>
                        <span className="text-gray-700 text-center text-[18px] ">Welcome back, {session?.user?.name} </span>
                        <div className="w-[100%] flex md:flex-row flex-col items-center justify-around gap-2">
                            <div className="text-center md:w-fit w-[100%] h-[125px] flex flex-col justify-center items-center text-gray-500 text-[15px]">
                                <div className="flex md:flex-row flex-col items-center gap-2 md:text-[14px] text-[25px] font-bold">
                                    <PointIcon/>
                                    <span>Points earned</span>
                                </div>
                                <span className="md:text-[18px] text-[30px] text-green-500">{refs*100}</span>
                            </div>
                            <div className="text-center flex flex-col h-[125px] justify-center items-center text-gray-500 text-[15px]">
                                <div className="flex md:flex-row flex-col items-center gap-2 md:text-[14px] text-[25px] font-bold">
                                    <ReferCountIcon/>
                                    <span>Total referrals</span>
                                </div>
                                <span className="md:text-[18px] text-[30px] text-green-500">{refs}</span>
                            </div>
                        </div>
                        <span></span>
                    </div>
                ): (
                    <div className="bg-white p-3 gap-1 leading-tight rounded-[13px] flex flex-col">
                        <div className="flex flex-row justify-center text-gray-700 items-center gap-2 text-[20px] font-semibold"><span >Join Our Ambassador Program!</span><FlyStarIcon size='33px'/></div>
                        <span className="mt-[5px] text-center text-gray-500 text-[15px]">Become part of something big! Earn rewards, gain exclusive perks, and represent our brand in style.</span>
                        <span className="md:px-[30px] text-center text-gray-500 text-[15px]">Top ambassadors get special rewards and recognition. Represent our brand, earn rewards, and compete for amazing prizes.</span>
                        <Link className="self-center" href={'/ambassador/apply'}><button className="h-[40px] mt-4 cursor-pointer hover:bg-green-700 w-[200px] bg-green-600 text-white rounded-[25px]">Join Now</button></Link>  
                    </div>
                )
            )
            }
            <div className="bg-white p-3 gap-[15px] rounded-[13px] flex flex-col">
                { (isLoading && !isErrorOccurred) ? (
                    <ShimmerLoader className={'mx-auto'} roundedness={'20px'} height={'25px'} width={'70%'}/>
                ):(
                    <div style={{lineHeight:'23px'}} className="flex flex-row justify-center text-gray-700 items-center gap-2 text-[20px] font-semibold">
                        <span >Top 5 Ambassadors Leaderboard</span><TrophyIcon size='28px'/>
                    </div>
                )}
                { (!isLoading && !isErrorOccurred) && (
                    <div className="flex flex-row md:flex-nowrap flex-wrap justify-center items-center gap-2">
                        { data.map( (user, index) => {
                            if ( user.fullname && user.city ) {
                                return (
                                <div className={`flex h-[150px] rounded-[20px] text-[13px] flex-col text-center md:w-[20%] ${index===0?'w-[90%]':'w-[45%]'} justify-center items-center p-[5px] border-1 border-gray-300`} key={data.userId}>
                                    <div className="w-[30px] absolute justify-center items-center rounded-full h-[30px] flex flex-row text-[17px] font-extrabold text-white bg-yellow-400"><span>{index+1}</span></div>
                                    <Profile bg={'gray'} size={'60%'}/>
                                    <span className="text-[11px] font-bold">{user.fullname}</span>
                                    <span>From {user.city.length>(index===0?15:9)?`${user.city.slice(0, index===0?15:9)}...`:user.city}</span>
                                </div>
                                )
                            } else {
                                return (
                                    <div className={`flex h-[150px] bg-gray-300 text-white rounded-[20px] text-[15px] flex-col text-center md:w-[20%] ${index===0?'w-[90%]':'w-[45%]'} justify-center items-center p-[5px]`} key={index}>
                                        <span>Open</span>
                                    </div>
                                )
                            }
                        })}
                    </div>
                )}
                { isLoading && (
                    <div className="flex flex-row md:flex-nowrap flex-wrap justify-center gap-2 items-center w-[100%]">
                        {[0, 0, 0, 0, 0].map( (_, index) => {
                            return (
                                <div className={`flex h-[150px] rounded-[20px] text-[13px] flex-col text-center md:w-[20%] ${index===0?'w-[90%]':'w-[45%]'} justify-center items-center p-[5px] border-1 border-gray-300`} key={index}>
                                    <ShimmerLoader roundedness={'50%'} height={'60%'} width={'60%'}/>
                                    <ShimmerLoader className={'mt-2'} roundedness={'13px'} height={'13px'} width={"65%"}/>
                                    <ShimmerLoader className={'mt-2'} roundedness={'13px'} height={'13px'} width={"85%"}/>
                                </div>
                            )
                        })}
                    </div>                                                   
                )}
                { isErrorOccurred && (
                    <div className="bg-gray-300 text-red-400 animate-pulse rounded-[10px] h-[100px] w-[100%] justify-center items-center">
                        <span>{errorType}</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AmbassadorInfo;