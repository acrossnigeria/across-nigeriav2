import { PlayCircle } from "lucide-react";
import Link from "next/link";

const ManageSkitButton = ( { isRegistered } ) => {
    return (
        <div className={`flex mt-2 fixed flex-row justify-end md:pr-[10%] pr-[3%] bottom-0 w-full pb-[40px] pt-[10px]`}>
        {/* Second Line Menus */}
            <Link style={{alignItems:'center'}} href="/skit-across-nigeria/pgs/creator" className="hover:scale-105 shadow-xl transition-all duration-300 ease-in-out w-fit px-[30px] md:px-0 md:w-[200px] h-[45px] rounded-[30px] bg-gradient-to-r from-green-500 to-green-800 items-center gap-2  flex flex-row justify-center">
                <span className="text-white text-[14px]">Manage My Skit</span>
                <PlayCircle size={'25px'} strokeWidth={1} className="text-white"/>
            </Link>
        </div> 
    )
};

export default ManageSkitButton;