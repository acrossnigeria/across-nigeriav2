import InfoText from "@/components/ui/InfoText";
import ProcessLoader from "@/components/ui/ProcessLoader";

const ProcessingCard = ( { handleVote, showTryAgain, voteError }) => {
    return (
        <div className="h-[500px] leading-tight p-4 pb-6 md:w-[450px] w-[95%] rounded-[20px] flex flex-col justify-center items-center gap-4 bg-white" >
            { !showTryAgain ? (
                <>
                <div className="flex flex-row items-center gap-3">
                    <ProcessLoader size={'25px'} />
                    <span className="text-[20px] text-center font-medium">Processing your vote...</span>
                </div>
                <InfoText className={'mt-5'} text={'Please wait while we process your vote.'}/>
                </>
            ) : (
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <span className="text-red-600 text-[16px] max-w-[70%] text-center">{voteError}</span>
                    <button onClick={handleVote} className="border-gray-400 mt-4 border-1 rounded-[3px] bg-gray-200 hover:bg-gray-300 w-[70%] h-[38px]">Try again</button>
                </div>
            )
            }
        </div>
    )
}

export default ProcessingCard;