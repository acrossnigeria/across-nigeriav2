const { useRouter } = require("next/router")

const SkitCompetitionClickCard = () => {
    
    const router = useRouter();

    return (
        <div className="flex flex-col md:w-[100%] w-[94%] mx-auto md:h-[300px] h-[390px] border-[0.5px] border-green-600 p-3 rounded-[8px] justify-center items-center bg-gradient-to-b from-white to-gray-200 gap-2">
            <span className="bg-clip-text text-center text-transparent text-[20px] font-extrabold bg-gradient-to-b from-red-500 to-yellow-400">ACROSS NIGERIA SKIT CHALLENGE</span>
            <div className="text-center text-[17px] md:w-[60%] w-[80%] font-bold">🏆 Join the Ultimate Skit Challenge & Win Big! 🎭. 🎬 Are You Ready to Shine?</div>
            <div className="md:w-[70%] w-[90%] text-center">Think you&apos;ve got what it takes to create the funniest, most creative skit? Across Nigeria Reality Show is giving you the chance to showcase your talent and win up to &#8358;100,000</div>
            <span className="text-[16px] text-center text-red-500">Ended - Skit Across Nigeria is coming sonn!</span>
            <button onClick={()=>{router.push('/theater-skit-across-nigeria/pages/winners')}} className="w-[200px] h-[40px] mt-[10px] text-white bg-green-500 hover:bg-green-600 hover:scale-105 transition-all ease-in-out duration-250 rounded-[25px]">See the winners</button>
        </div>
    )
}

export default SkitCompetitionClickCard;