import QuizShowParticipant from "@/models/QuizShowParticipant";
import db from "../../../../utils/db";

const Handler = async (req, res) => {
    try {
        if ( req.method === "POST" ) {
            const {
                status,
                whatsappPhone,
                knowledgeOfNigeria,
                referralSource,
                confidenceInKnowledge,
                loveToVisit,
                agreedToTerms,
                user,
                paymentRef,
            } = req.body
            await db.connect();
            const updatedData = await QuizShowParticipant.create({
                status,
                whatsappPhone,
                knowledgeOfNigeria,
                referralSource,
                confidenceInKnowledge,
                loveToVisit,
                introVideoUrl:'none',
                agreedToTerms,
                user,
                payment: true,
                paymentRef,
            } ) 
            await db.disconnect();
            res.status(200).json( { success:true, message: 'user registered successfully' })
        } else {
            res.status(500).json( { success:false, error:"Method not allowed" } );   
        }
    } catch(err) {
        res.status(500).json( { success:false, error:err.message } );
    }
}


export default Handler;