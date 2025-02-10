import QuizShowParticipant from "@/models/QuizShowParticipant";
import db from "../../../../utils/db";

const Handler = async (req, res) => {
    try {

        if (req.method === 'GET') {
            res.status(400).json({ success:false, error:'invalid method'})
        } else if (req.method === 'POST') {
            const {
                status,
                whatsappPhone,
                knowledgeOfNigeria,
                referralSource,
                confidenceInKnowledge,
                loveToVisit,
                introVideoUrl,
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
                introVideoUrl,
                agreedToTerms,
                user,
                payment: true,
                paymentRef,
            } ) 
            await db.disconnect();
            res.status(200).json( { success:true, message: 'user registered successfully' })

        } else if (req.method === 'PUT') {
            res.status(400).json({ success:false, error:'invalid method'})
        } else if (req.method === 'DELETE') {
            res.status(400).json({ success:false, error:'invalid method'})
        } else {
            res.status(400).json({ success:false, error:'invalid method'})
        }

    } catch(err) {
        res.status(500).json({ success:false, error:err.message });
    }
}

export default Handler;