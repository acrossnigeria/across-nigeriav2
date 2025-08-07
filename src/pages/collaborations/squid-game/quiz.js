import Layout from "@/components/Layout"
import { useEffect, useState } from "react";
import SG_QuizGame from "./components/QuizGame";
import QuizSubmitted from "./components/QuizSubmitted";
import { useSession } from "next-auth/react";
import VerifyingStageOne from "./components/VerifyPlayer";
import QuizRulesPage from "./components/QuizRulesPage";
import NoAccessPage from "./components/AccessDeniedPage";

const Page = () => {
    const [ verificationState, setVerificationState ] = useState(0);
    const [ entryCode, setEntryCode ] = useState("");
    const { data:session } = useSession();


    return (
            <>
                { verificationState === 0 && <VerifyingStageOne toSubmittedPage={() => { setVerificationState(3) } } setEntryCode={setEntryCode} toAccessDenied={() => { setVerificationState(4)}} toRulesPage={() => ( setVerificationState(1))} userId={session?.user?._id}/> }
                { verificationState === 1 && <QuizRulesPage startQuiz={() => { setVerificationState(2)}}/> }
                { verificationState === 2 && <SG_QuizGame entryCode={entryCode} userId={session.user?._id} toSuccess={() => { setVerificationState(3)}} /> }
                { verificationState === 3 && <QuizSubmitted/>}
                { verificationState === 4 && <NoAccessPage/>}
                
            </>
    )
}

Page.auth = true;
export default Page;