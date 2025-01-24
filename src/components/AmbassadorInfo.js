import Link from "next/link";
import FlyStarIcon from "../../public/images/icon/FlyStarIcon";
import TrophyIcon from "../../public/images/icon/TrophyIcon";
import GoToIcon from "../../public/images/icon/GoToIcon";


const AmbassadorInfo = () => {
    return (
        <div className="w-[95%] border-1 border-green-500 pb-3 p-2 mt-[10px] ml-[2.5%] rounded-[13px] flex flex-col">
            <div className="flex flex-row justify-center text-gray-700 items-center gap-2 text-[20px] font-extrabold"><span >Join Our Ambassador Program!</span><FlyStarIcon size='33px'/></div>
            <span className="mt-[5px] text-left md:text-center text-gray-500 text-[15px]">Become part of something big! Earn rewards, gain exclusive perks, and represent our brand in style.</span>
            <Link className="self-center" href={'/ambassador/apply'}><button className="h-[40px] mt-[10px] cursor-pointer hover:bg-green-700 w-[200px] bg-green-600 text-white rounded-[25px]">Join Now</button></Link>
            <div className="flex flex-row justify-center text-gray-700 items-center gap-2 text-[17px] mt-[30px] font-extrabold"><span >Climb the Leaderboard</span><TrophyIcon size='28px'/></div>
            <span className="mt-[5px] md:px-[30px] text-left md:text-center text-gray-500 text-[15px]">Top ambassadors get special rewards and recognition. Represent our brand, earn rewards, and compete for amazing prizes.</span>
            <Link href={'/ambassador/dashboard'} className="flex self-center items-center hover:text-green-500 border-b-2 rounded-[25px] px-[15px] py-[7px] border-b-green-500 mb-[10px] flex-row gap-3 font-extrabold mt-[20px] text-[15px]"><span>View Top Ambassadors</span><GoToIcon size='20px'/></Link>
        </div>
    )
}

export default AmbassadorInfo;