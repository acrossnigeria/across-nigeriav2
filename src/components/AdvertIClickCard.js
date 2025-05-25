import { useRouter } from "next/router"

const AdvertClickCard = () => {
    const router = useRouter();
    return (
        <div style={{lineHeight:'21px'}} className="h-[200px] p-4 py-[20px] md:ml-[15%] flex bg-gradient-to-br from-green-500 to-orange-500 rounded-t-[15px] md:w-[70%] w-[100%] flex-col justify-center md:text-left text-center md:items-start items-center"> 
            <span className="w-full text-white text-left text-[20px] font-bold">Advert Placement Now Available</span> 
            <span className="text-white mt-[10px] text-left">We are pleased to inform you that you can now place advertisements on our platform to promote your products or services to a broader audience.</span> 
            <button onClick={()=>{router.push('/advert')}} className={`bg-transparent border-1 px-[25px] border-white mt-[10px] hover:bg-white/20 hover:scale-[101%] h-[45px] md:w-[50%] w-fit text-white transition-all duration-500 ease-in-out rounded-[30px]`}>Get started</button>
        </div>
    )
}

export default AdvertClickCard