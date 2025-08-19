import { Hourglass, Lock, X } from "lucide-react";
import InfoText from "@/components/ui/InfoText";

const NoVoteCard = ( { closeModal } ) => {


    return (
        <div className="transition-all ease-in-out duration-300 h-[500px] leading-tight p-4 pb-1 md:w-[450px] w-[95%] rounded-[20px] flex flex-col justify-start bg-white" >
            <div className="w-full h-fit mb-4 flex flex-row justify-end">
                <X onClick={closeModal} className="cursor-pointer" size={22} />
            </div>
            <span className="text-[20px] text-center font-medium">Voting Not Open Yet</span>
            <div className="flex-grow w-full flex flex-col justify-center item-center gap-2 px-6">
                <Lock size={70} className=" self-center" strokeWidth={1.5} color="green"/>
                <span className="text-center text-[17px] text-gray-600">Voting will open September 1, 2025.</span>
                <span className="text-center text-[17px] text-gray-600">Please check back!</span>
            </div>
            <InfoText className={'mb-4'} text={`You can't vote until September 1st`}/>
        </div>
    )
}

export default NoVoteCard;