import ShimmerLoader from "./ui/ShimmerLoader";

export default function VideoCardLoader() {
    return(
            <div className="flex flex-col items-center md:px-0 px-2 py-2 md:w-[350px] w-full">
                <ShimmerLoader roundedness={'10px'} width={'100%'} height={'400px'}/>
                <div className="w-full flex flex-row items-start justify-between gap-2 pt-[10px] px-2">
                    <div className="flex flex-row gap-2 items-start">
                        <ShimmerLoader roundedness={'50%'} width={'45px'} height={'45px'}/>
                        <div className="flex flex-col gap-1">
                            <ShimmerLoader roundedness={'20px'} width={'150px'} height={'20px'}/>
                            <ShimmerLoader roundedness={'20px'} width={'120px'} height={'15px'}/>
                        </div>
                    </div>
                </div>
            </div>
 
    )
};

