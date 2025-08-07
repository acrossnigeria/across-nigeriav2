import { useRouter } from "next/navigation"

export default function ExitConfirmScreen({ to, cancelFunction }) {
    const router = useRouter();
    return (
        <div className="fixed h-screen w-screen backdrop-blur-sm inset-0 z-50 flex items-center justify-center bg-black/30 bg-opacity-30">
            <div className="flex flex-col md:py-[30px] py-[50px] md:w-fit w-[90%] justify-center items-center rounded-[10px] bg-gray-100 px-[30px] ">
                <span className="font-bold">Are you sure you want to exit?</span>
                <div className="flex mt-[20px] flex-row gap-4">
                    <button onClick={()=>{router.push(to)}} className="text-black bg-gray-300 rounded-full w-32">Yes</button>
                    <button onClick={()=>{cancelFunction()}} className="bg-green-500 w-32 text-white rounded-[30px] px-[10px] py-[10px]">No</button>
                </div>
            </div>
        </div>
    )
}