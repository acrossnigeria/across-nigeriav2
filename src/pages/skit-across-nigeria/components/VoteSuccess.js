import Button from "@/components/ui/Button";
import { VoteIcon } from "lucide-react";

const VoteSuccess = ( { reset, closeModal, numberOfVotes } ) => {
    return (
        <div className="transition-all ease-in-out duration-300 h-fit leading-tight p-4 pb-6 md:w-[450px] w-[90%] rounded-[5px] flex flex-col justify-center items-center gap-4 bg-white" >
            <div className="flex flex-col max-w-[80%] items-center gap-2">
                <VoteIcon strokeWidth={1} size={100} className="text-green-500" /> 
                <span className="text-[20px] text-center font-medium">Your {numberOfVotes} vote{numberOfVotes>1?'s':''} has been successfully recorded!</span>
                <span className="text-center text-[15px] text-gray-500">Thanks for voting.</span>
            </div>
            <Button className="mt-5 gap-2 w-[80%]" size="md" onClick={reset}>
                <span>Vote Again</span>
            </Button>
            <Button bg={'transparent'} className="border-gray-700 hover:bg-gray-300 w-[80%] border-1" size="md" onClick={closeModal}>
                <span className="text-center text-[15px] text-gray-700">Close</span>
            </Button>
            
        </div>
    )
}

export default VoteSuccess;