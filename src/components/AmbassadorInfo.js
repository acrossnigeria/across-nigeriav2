import Link from "next/link";
import FlyStarIcon from "../../public/images/icon/FlyStarIcon";
import TrophyIcon from "../../public/images/icon/TrophyIcon";
import GoToIcon from "../../public/images/icon/GoToIcon";
import axios from "axios";
import { useState, useEffect } from "react";
import Profile from "../../public/images/icon/Profile";


const AmbassadorInfo = () => {
    const [ data, setData ] = useState([]);
    const [ errorType, setErrorType ] = useState('Unknown error');
    const [ isErrorOccurred, setIsErrorOccurred ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);

    async function getAmbassadors() {
        setIsLoading(true);
        try {
            const response = await axios.get('/api/ambassador/getAmbassadors');
            if (response.data.success) {
                let rem = 4;
                const tempData = response.data.list;
                if (tempData.length<rem) {
                    rem = rem - tempData.length;
                    for (let i = 0;i<=rem;i++) {
                        tempData.push({});
                    }
                }
                setData(tempData);
                
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
        getAmbassadors();
    }, [])

    return (
        <div className="w-[95%] mt-[10px] ml-[2.5%] gap-[20px] rounded-[13px] flex flex-col">
            <div className="border-1 border-green-500 p-3 gap-[15px] rounded-[13px] flex flex-col">
                <div className="flex flex-row justify-center text-gray-700 items-center gap-2 text-[20px] font-extrabold"><span >Join Our Ambassador Program!</span><FlyStarIcon size='33px'/></div>
                <span className="mt-[5px] text-left text-center text-gray-500 text-[15px]">Become part of something big! Earn rewards, gain exclusive perks, and represent our brand in style.</span>
                <span className="mt-[5px] md:px-[30px] text-lefttext-center text-gray-500 text-[15px]">Top ambassadors get special rewards and recognition. Represent our brand, earn rewards, and compete for amazing prizes.</span>
                <Link className="self-center" href={'/ambassador/apply'}><button className="h-[50px] mt-[10px] cursor-pointer hover:bg-green-700 w-[200px] bg-green-600 text-white rounded-[25px]">Join Now</button></Link>  
            </div>
            <div className="border-1 border-green-500 p-3 gap-[15px] rounded-[13px] flex flex-col">
                <div className="flex flex-row justify-center text-gray-700 items-center gap-2 text-[25px] font-extrabold"><span >Top 5 Ambassadors Leaderboard</span><TrophyIcon size='28px'/></div>
                { (!isLoading && !isErrorOccurred) && (
                    <div className="flex flex-row md:flex-nowrap flex-wrap justify-center items-center gap-2">
                        { data.map( (user, index) => {
                            if ( user.fullname && user.city ) {
                                return (
                                <div className="flex h-[150px] rounded-[20px] text-[15px] flex-col text-center md:w-[20%] w-[45%] justify-center items-center p-[5px] border-1 border-gray-300" key={data.userId}>
                                    <div className="w-[30px] absolute justify-center items-center rounded-full h-[30px] flex flex-row text-[17px] font-extrabold text-white bg-yellow-400"><span>{index+1}</span></div>
                                    <Profile bg={'gray'} size={'80%'}/>
                                    <span>{user.fullname}</span>
                                    <span>From {user.city}</span>
                                </div>)
                            } else {
                                return (
                                    <div className="flex h-[150px] bg-gray-300 text-white text-[20px] rounded-[20px] text-[15px] flex-col text-center md:w-[20%] w-[45%] justify-center items-center p-[5px]" key={index}>
                                        <span>Open</span>
                                    </div>
                                )
                            }
                        })}
                    </div>
                )}
                { isLoading && (
                    <div className="flex flex-row md:flex-nowrap flex-wrap justify-center gap-2 items-center w-[100%]">
                    <div className="bg-gray-200 animate-pulse md:w-[20%] w-[45%] rounded-[20px] h-[150px]"></div>
                    <div className="bg-gray-200 animate-pulse md:w-[20%] w-[45%] rounded-[20px] h-[150px]"></div>
                    <div className="bg-gray-200 animate-pulse md:w-[20%] w-[45%] rounded-[20px] h-[150px]"></div>
                    <div className="bg-gray-200 animate-pulse md:w-[20%] w-[45%] rounded-[20px] h-[150px]"></div>
                    <div className="bg-gray-200 animate-pulse md:w-[20%] w-[45%] rounded-[20px] h-[150px]"></div>
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