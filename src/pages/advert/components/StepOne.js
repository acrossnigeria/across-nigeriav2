const StepOne = () => {
    return (
        <div className="md:w-[50%] md:ml-[25%] mt-[25px] w-[100%] px-[3%] flex flex-col justify-center items-center text-center text-white text-[18px]">
            <span style={{lineHeight:'20px'}} className="text-[19px] font-extrabold">Choose advert plan</span>
            <span style={{lineHeight:'20px'}} className="mt-[11px]">Pick your ad level and how long you want it to run.</span>
            <div className="w-[100%] flex flex-col md:flex-row md:gap-0 gap-3 border-1 mt-[20px] border-red-500">
                <div className="md:w-[32%] w-[100%] md:h-[200px] h-[120px] bg-green-700 border-[2.5px] hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer hover:border-white border-green-500 rounded-[7px]"> 
                </div>
                <div className="md:w-[32%] w-[100%] md:h-[200px] h-[120px] bg-green-700 border-[2.5px] hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer hover:border-white border-green-500 rounded-[7px]"> 
                </div>
                <div className="md:w-[32%] w-[100%] md:h-[200px] h-[120px] bg-green-700 border-[2.5px] hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer hover:border-white border-green-500 rounded-[7px]"> 
                </div>
            </div>
        </div>
    )
}

export default StepOne;