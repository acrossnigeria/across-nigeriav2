const { useRouter } = require("next/router")

const SkitCompetitionClickCard = () => {
    
    const router = useRouter();

    return (
        <div className="flex flex-col md:w-[100%] w-[94%] mx-auto md:h-[300px] h-[350px] p-3 rounded-[8px] justify-center items-center bg-gradient-to-b from-white to-gray-200 gap-3">
            <span className="bg-clip-text text-center text-transparent text-[20px] font-bold bg-gradient-to-b from-green-400 to-green-600">🏆 Join the Ultimate Skit Challenge & Win Big! 🎭</span>
            <div className="font-semibold">🎬 Are You Ready to Shine?</div>
            <div className="md:w-[70%] w-[90%] text-center">Think you&apos;ve got what it takes to create the funniest, most creative skit? Across Nigeria Reality Show is giving you the chance to showcase your talent and win up to &#8358;100,000</div>
            <span className="text-[14px] text-center text-red-500">Competitions ends on the april 31st</span>
            <button onClick={()=>{router.push('/theater-skit-across-nigeria/pages/landing')}} className="px-[30px] h-[40px] mt-[10px] text-white bg-green-500 hover:bg-green-600 hover:scale-105 transition-all ease-in-out duration-250 rounded-[25px]">Enter The Competition</button>
        </div>
    )
}

export default SkitCompetitionClickCard;