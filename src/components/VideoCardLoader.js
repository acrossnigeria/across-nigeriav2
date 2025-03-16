import Link from "next/link";
import OptionsIcon from "../../public/images/icon/OptionsIcon";

export default function VideoCardLoader() {
    return(
            <div className="flex flex-col items-center h-[300px] md:w-[350px] w-full">
                    <div className="h-[225px] bg-gray-300 animate-pulse w-full p-0" ></div>
                <div className="w-full flex flex-row items-start justify-between gap-2 pt-[10px] px-2">
                    <div className="flex flex-row gap-2 items-start">
                        <div className="h-[45px] w-[45px] rounded-full bg-gray-300 animate-pulse"></div>
                        <div className="flex flex-col gap-1">
                            <div className="h-[20px] w-[150px] md:w-[200px] rounded-[20px] bg-gray-300 animate-pulse"></div>
                            <div className="h-[15px] w-[100px] md:w-[170px] rounded-[20px] bg-gray-300 animate-pulse"></div>
                        </div>
                    </div>
                    <button className="hover:scale-110 hover:opacity-50"><OptionsIcon/></button>
                   
                </div>
            </div>
 
    )
};

