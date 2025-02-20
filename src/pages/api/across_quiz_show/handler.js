import QuizShowParticipant from "@/models/QuizShowParticipant";
import db from "../../../../utils/db";

const Handler = async (req, res) => {
    function formatDate(date) {
        const dateObj = new Date(date);
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit'};
        const brokenDateStr = dateObj.toLocaleDateString('en-US', options).split(', ');
        const formatedDate = `${brokenDateStr[0]} ${brokenDateStr[1]} ${brokenDateStr[2]}`
        return formatedDate;
    }
    try {

        if (req.method === 'GET') {
            const type = req.query.type;
            if ( type === 'CHECKUSER' ) {
                const userId =  req.query.userId;
                await db.connect();
                const user = await QuizShowParticipant.findOne({ user:userId });
                await db.disconnect();
                if (user) {
                    res.status(200).json( { success:true, isUserFound:true, isUserSelected:user.isSelected } );
                } else {
                    res.status(200).json( { success:true, isUserFound:false, isUserSelected:false } );
                }

            } else if ( type === 'GETPARTICIPANTS' ) {
                await db.connect();
                const collection = await QuizShowParticipant.find().populate('user');
                await db.disconnect();
                const participants = [];
                collection.map( (doc)=> {
                    const data = {
                        fullname:`${doc.user.name} ${doc.user.surname}`,
                        whatsappPhone:doc.user.phone,
                        email:doc.user.email,
                        regAt:formatDate(doc.createdAt),
                        payRef:doc.paymentRef,
                        status:doc.status,
                        knowledgeOfNigeria:doc.knowledgeOfNigeria,
                        referralSource:doc.referralSource,
                        confidenceInKnowledge:doc.confidenceInKnowledge,
                        loveToVisit:doc.loveToVisit,
                        introVideoUrl:doc.introVideoUrl,
                    }
                    participants.push(data);
                })
                res.status(200).json( { success:true, participants } );
            }
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