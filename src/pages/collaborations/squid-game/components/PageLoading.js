import Button from "@/components/ui/Button";

export default function PageLoading( { errorOcurred, reload, errorMessage } ) {

  return (
    <div className="h-screen bg-transparent flex flex-col items-center justify-start md:px-0 px-3 pt-[15px] pb-[50px]">
        {/* Hero Section */}
        { !errorOcurred && (
            <div className="max-w-6xl md:w-[600px] w-full bg-white rounded-[7px] shadow-xl border border-gray-200 overflow-hidden flex flex-col">
                
                {/* Flyer Image */}
                <div className="relative md:h-[250px] bg-gray-400 animate-pulse h-[180px] flex flex-col">
                <div className='absolute md:h-[250px] h-[180px] w-full bg-gradient-to-b from-transparent to-black/50'></div>
                </div>

                {/* Game Info */}
                <div className="p-6 flex flex-col justify-center">
                    <div className="text-gray-700 mb-6 font-medium h-[40px] bg-gray-400 animate-pulse"></div>
                
                    <div className="text-gray-700 mb-2 font-medium h-[15px] bg-gray-400 animate-pulse"></div>
                    <div className="text-gray-700 mb-2 font-medium h-[15px] bg-gray-400 animate-pulse"></div>
                    <div className="text-gray-700 mb-2 font-medium h-[15px] bg-gray-400 animate-pulse"></div>
                    <div className="text-gray-700 mb-6 font-medium h-[15px] bg-gray-400 animate-pulse"></div>

                    <div className="text-gray-700 mb-2 font-medium h-[15px] bg-gray-400 animate-pulse"></div>
                    <div className="text-gray-700 mb-2 font-medium h-[15px] bg-gray-400 animate-pulse"></div>
                    <div className="text-gray-700 mb-2 font-medium h-[15px] bg-gray-400 animate-pulse"></div>
                    <div className="text-gray-700 mb-6 font-medium h-[15px] bg-gray-400 animate-pulse"></div>

                    <div className="text-gray-700 mb-2 font-medium h-[25px] bg-gray-400 animate-pulse"></div>
                </div>
            </div>
        )
        }

        { errorOcurred && (
            <div className="max-w-6xl md:w-[600px] w-full bg-white rounded-[7px] p-4 shadow-xl border border-gray-200 overflow-hidden flex flex-col">
                <span className="text-center text-red-500 font-light w-[100%]">{ errorMessage }</span>
                <Button className="mt-4" size={'md'} onClick={reload}>Refresh page</Button>
            </div>
        )}
    </div>
  );
}
