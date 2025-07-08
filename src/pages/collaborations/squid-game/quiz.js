import Layout from "@/components/Layout"
import { useState } from "react";
import SG_QuizGame from "./components/QuizGame";
import VerifyPlayer from "./components/VerifyPlayer";
import QuizSubmitted from "./components/QuizSubmitted";

const Page = () => {
    const [ verificationState, setVerificationState ] = useState(1);

    return (
            <>
                { verificationState === 0 && <VerifyPlayer/> }
                { verificationState === 1 && <SG_QuizGame toSuccess={() => { setVerificationState(2)}} /> }
                { verificationState === 2 && <QuizSubmitted/>}
                
            </>
    )
}

export default Page;