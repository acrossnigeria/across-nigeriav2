import db from "../../../../utils/db";
import SkitAcrossNigeriaVote from "@/models/SkitAcrossNigeriaVote";

const Handler = async (req, res) => {
    if (req.method === 'POST') {
        const { voterEmail, votes, skitId, userId, paymentRef } = req.body;

        if (!voterEmail || !votes || !skitId || !userId || !paymentRef) {
            const missing = []
            missing.push( !votes && "votes", !voterEmail && "voterEmail", !skitId && "skitId", !userId && "userId", !paymentRef && "paymentRef" );
            console.log("Incomplete vote request");
            return res.status(400).json({ message: 'Email, votes, skitId, userId, and paymentRef are required', error:"INCOMPLETE_REQUEST", missing });
        }

        try {
            await db.connect();
            await SkitAcrossNigeriaVote.create( {
                userId: userId,
                skitId: skitId,
                voterEmail: voterEmail,
                votes: votes,
                paymentRef: paymentRef
            });

            let newVotes = 0;
            const voteDocs = await SkitAcrossNigeriaVote.find( { skitId: skitId } );
            voteDocs?.map( (voteDoc) => {
                newVotes += voteDoc?.votes;
            });


            return res.status(200).json({ message: 'Vote successfully recorded', voterEmail, newVotes });
        } catch (error) {
            console.error('Error processing vote:', error);
            return res.status(500).json({ message: 'Internal server error', error:'SERVER_ERROR' });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed', error:"INVALID_METHOD" });
    }
}


export default Handler;