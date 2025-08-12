import Link from "next/link";
import OptionsIcon from "../../public/images/icon/OptionsIcon";

export default function VideoCardLoader() {
    return(
            <div className="flex flex-col items-center h-[300px] md:w-[350px] w-full">
                <div className="h-[225px] bg-gray-300 w-full p-0 relative overflow-hidden" >
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                </div>
                <div className="w-full flex flex-row items-start justify-between gap-2 pt-[10px] px-2">
                    <div className="flex flex-row gap-2 items-start">
                        <div className="h-[45px] w-[45px] rounded-full overflow-hidden relative bg-gray-300 animate-pulse">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="h-[20px] w-[150px] md:w-[200px] rounded-[20px] bg-gray-200 overflow-hidden relative">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                            </div>
                            <div className="h-[15px] w-[100px] md:w-[170px] rounded-[20px] bg-gray-200 overflow-hidden relative">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
 
    )
};

