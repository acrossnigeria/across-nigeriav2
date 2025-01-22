import Link from "next/link";
import FlyStarIcon from "../../public/images/icon/FlyStarIcon";


const AmbassadorInfo = () => {
    return (
        <div className="w-[95%] border-1 border-green-500 pb-3 p-2 mt-[10px] ml-[2.5%] rounded-[13px] flex flex-col">
            <div className="flex flex-row justify-center text-gray-700 items-center gap-2 text-[19px] font-extrabold"><span >Join Our Ambassador Program!</span><FlyStarIcon size='32px'/></div>
            <span className="mt-[5px] text-center text-gray-400 text-[15px]">Become part of something big! Earn rewards, gain exclusive perks, and represent our brand in style.</span>
            <Link href={'/ambassador/apply'}><button className="h-[40px] mt-[10px] cursor-pointer hover:bg-green-700 w-[200px] bg-green-600 text-white rounded-[25px]">Join Now</button></Link>
        </div>
    )
}

export default AmbassadorInfo;