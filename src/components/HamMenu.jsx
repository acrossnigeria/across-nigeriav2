import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Profile from "../../public/images/icon/Profile";
import setRealVH from "../../utils/setRealVH";
import Link from "next/link";

const HamMenu = () => {
    setRealVH();
    return (
        <div style={{height:`calc(var(--vh, 1vh)*100)`}} className={`w-full fixed z-[5000] flex flex-row left-0 top-0 bg-black/50 backdrop-blur-sm`}>
            <div className={`w-[70%] h-full flex flex-col bg-white rounded-r-[15px] pt-[10px] overflow-hidden`}>
                <X className="self-end mr-2" strokeWidth={1} color="gray" size={'35px'}/>
                <div className="w-full flex flex-row items-center justify-between gap-2 h-[200px] px-4 border-b-[0.5px] border-gray-300">
                    <div className="flex flex-col">
                        <Profile bg={'gray'} className='ml-auto' size={'100px'}/>
                        <span className="font-bold">Alimam Ahmed</span>
                    </div>
                    <button>
                        <ChevronRight color="gray" size={'30px'}/>
                    </button>
                </div>
                <div className={`h-fit pt-[20px]`}>
                    <span href="#products" className="pl-4 text-gray-400 py-2 text-[19px] text-left w-full">
                        Pages
                    </span>
                    <button href="#products" className="pl-6 py-2 text-[17px] mb-2 text-left w-full mx-auto hover:bg-gray-100">
                        Home
                    </button>
                    <button href="#products" className="pl-6 py-2 text-[17px] mb-2 text-left w-full mx-auto hover:bg-gray-100">
                        Products
                    </button>
                    <button href="#products" className="pl-6 py-2 text-[17px] mb-2 text-left w-full mx-auto hover:bg-gray-100">
                        About
                    </button>

                    <span href="#products" className="pl-4 text-gray-400 py-2 mt-[30px] text-[19px] text-left w-full">
                        Pages
                    </span>
                    <button href="#products" className="pl-6 py-2 text-[17px] mb-2 text-left w-full mx-auto hover:bg-gray-100">
                        Home
                    </button>
                    <button href="#products" className="pl-6 py-2 text-[17px] mb-2 text-left w-full mx-auto hover:bg-gray-100">
                        Products
                    </button>
                    <button href="#products" className="pl-6 py-2 text-[17px] mb-2 text-left w-full mx-auto hover:bg-gray-100">
                        About
                    </button>
                    {/* <Link href="/" className="hover:underline px-4 py-1 w-[33%] text-[14px] flex flex-row justify-center items-center text-gray-800">
                        Home
                    </Link>
                    <Link href="/about" className="hover:underline px-4 w-[33%] text-[14px] flex flex-row justify-center items-center py-1 text-gray-800">
                        About
                    </Link> */}
                </div> 
            </div>
        </div>
    )
}

export default HamMenu;