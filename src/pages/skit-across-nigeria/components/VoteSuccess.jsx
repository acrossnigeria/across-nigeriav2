import Button from "@/components/ui/Button";
import { VoteIcon } from "lucide-react";

const VoteSuccess = ( { reset, closeModal, numberOfVotes } ) => {
    return (
        <div className="transition-all ease-in-out duration-300 h-[500px] leading-tight p-4 pb-6 md:w-[450px] w-[95%] rounded-[20px] flex flex-col justify-center items-center gap-4 bg-white" >
            <div className="flex flex-col max-w-[80%] items-center gap-2">
                <VoteIcon strokeWidth={1} size={100} className="text-green-500" /> 
                <span className="text-[20px] text-center font-medium">Your {numberOfVotes} vote{numberOfVotes>1?'s':''} has been successfully recorded!</span>
                <span className="text-center text-[15px] text-gray-500">Thanks for voting.</span>
            </div>
            <button className="mt-[70px] h-[45px] rounded-[20px] text-white bg-green-600 hover:bg-green-700 transition-all duration-200 gap-2 w-[80%]" size="md" onClick={reset}>
                <span>Vote Again</span>
            </button>
            <button bg={'transparent'} className="border-gray-700 h-[45px] rounded-[20px] transition-all duration-200 hover:bg-gray-300 w-[80%] border-1" size="md" onClick={closeModal}>
                <span className="text-center text-[15px] text-gray-700">Close</span>
            </button>
            
        </div>
    )
}

export default VoteSuccess;