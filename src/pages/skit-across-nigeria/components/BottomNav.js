import { CirclePlus, House, UserCircle } from "lucide-react";
import Link from "next/link";

const BottomNav = () => {
    return (
        <div className={`flex md:hidden mt-2 fixed bottom-0 w-[100%] z-[1000] text-green-200 text-[13px] bg-green-600 flex-row font-sans h-[45px] pb-1 items-end justify-around`}>
        {/* Second Line Menus */}
            <Link style={{alignItems:'center'}} href="/" className="hover:scale-105 h-full items-center flex flex-col justify-center">
                <House size={'25px'} strokeWidth={1} className="text-white"/>
            </Link>
            <Link style={{alignItems:'center'}} href="/skit-across-nigeria/pages/add-skit" className="h-full bg-green-600 hover:scale-105 items-center flex flex-col justify-center">
                <CirclePlus size={'25px'} strokeWidth={1} className="text-white"/>
            </Link>
            <Link style={{alignItems:'center'}} href="/skit-across-nigeria/pages/creator" className="hover:scale-105 h-full items-center flex flex-col justify-center">
                <UserCircle size={'25px'} strokeWidth={1} className="text-white"/>
            </Link>
        </div> 
    )
};

export default BottomNav;