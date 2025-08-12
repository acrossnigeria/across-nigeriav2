import { useEffect, useState } from "react";
import axios from "axios";
import VoteCard from "./VoteCard";
import ProcessingCard from "./ProcessingCard";
import VoteSuccess from "./VoteSuccess";

const VoteModal = ({ showVoteModal, setShowVoteModal, userEmail, userId, skitId, handleVoteModal }) => {
    const [ voterEmail, setVoterEmail ] = useState('');
    const [ numberOfVotes, setNumberOfVotes ] = useState(1);
    const [ voteError, setVoteError ] = useState('');
    const [ showTryAgain, setShowTryAgain ] = useState(true);
    const [ recentPaymentRef, setRecentPaymentRef ] = useState(null);

    //card steps
    const [ cardStep, setCardStep ] = useState(0);

    useEffect(()=>{
        if ( userEmail ) {
            setVoterEmail(userEmail)
        }
    }, [ userEmail ]);

    const handleError = (error) => {
        setVoteError( error ? error : 'Unknown error occurred. Please try again later.' );
        setShowTryAgain(true)
    }


    const handleVote = async ( paymentRef ) => {
        if ( paymentRef ) {
            setRecentPaymentRef(paymentRef?.reference);
        }
        console.log("Processing vote with payment reference:", paymentRef);
        const email = voterEmail.trim();
        setCardStep(1);
        setVoteError('');
        setShowTryAgain(false);
        try {
            const data = {
                userId: userId? userId : "NONE_USER_ID",
                skitId: skitId,
                voterEmail: email,
                votes: numberOfVotes,
                paymentRef: paymentRef ? paymentRef?.reference : recentPaymentRef,
            }
            const response = await axios.post('/api/skit-across-nigeria/vote', data);
            if (response.status === 200) {
                setCardStep(2);
            } else {
                if ( !recentPaymentRef ) {
                    setRecentPaymentRef(paymentRef);
                }
                handleError('Failed to cast vote. Please try again later.');
            }
        } catch (error) {
            handleError(`An error occurred while processing your vote: ${error.message}`);
            setRecentPaymentRef(paymentRef);
        } 
    };

    const closeModal = () => {
        setShowVoteModal(false); 
        setCardStep(0); 
        handleVoteModal();
    };
    const reset = () => { setCardStep(0); };

    return (
        <>
        { showVoteModal && (
            <div className={`bg-black/50 backdrop-blur-[1px] absolute z-[3000] flex flex-col justify-center items-center h-full w-full left-0 top-0`} >

                { cardStep === 0 && ( 
                    <VoteCard
                    handleVote={handleVote}
                    closeModal={closeModal} 
                    voterEmail={voterEmail}
                    setVoterEmail={setVoterEmail}
                    numberOfVotes={numberOfVotes}
                    setNumberOfVotes={setNumberOfVotes}
                    />
                )}

                { cardStep === 1 && (
                    <ProcessingCard
                    handleVote={handleVote}
                    showTryAgain={showTryAgain}
                    voteError={voteError}
                    />
                )}

                { cardStep === 2 && (
                    <VoteSuccess
                    reset={reset}
                    closeModal={closeModal}
                    numberOfVotes={numberOfVotes}
                    />
                )}

            </div>
        )}
        </>
    );
}

export default VoteModal;