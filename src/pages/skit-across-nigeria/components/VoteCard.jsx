import TextInputWithIcon from "@/components/ui/TextInputWithIcon";
import { Vote, X } from "lucide-react";
import EmailIcon from "../../../../public/images/icon/EmailIcon";
import PaystackClick from "@/components/PaystackClick";
import InfoText from "@/components/ui/InfoText";
import NumberInputWithIcon from "@/components/ui/NumberInputWithIcon";

const VoteCard = ( { closeModal, handleVote, voterEmail, numberOfVotes, setVoterEmail, setNumberOfVotes } ) => {


    return (
        <div className="transition-all ease-in-out duration-300 h-[500px] leading-tight p-4 pb-6 md:w-[450px] w-[95%] rounded-[20px] flex flex-col justify-start bg-white" >
            <div className="w-full h-fit mb-6 flex flex-row justify-end">
                <X onClick={closeModal} className="cursor-pointer" size={22} />
            </div>
            <span className="text-[20px] text-center font-medium">Vote for this Skit</span>
            <span className="text-center text-[17px] text-gray-500">Your vote helps us determine the best skits in the competition!</span>
            <TextInputWithIcon className={'mt-6'} icon={<EmailIcon/>} placeholder={'Please enter your email address'} label={'Email'} onChange={(e) => { setVoterEmail(e?.target?.value); }} value={voterEmail}/>
            <NumberInputWithIcon className={'mt-4 mb-6'} icon={<Vote strokeWidth={1} className="text-black"/>} label={'Number of votes'} setChange={setNumberOfVotes} value={numberOfVotes}/>
            <PaystackClick buttonText={'Vote Now'} callBack={handleVote} email={voterEmail} amount={numberOfVotes * 100}/>
            <InfoText className={'mt-2'} text={`Each vote costs ₦100`}/>
        </div>
    )
}

export default VoteCard;