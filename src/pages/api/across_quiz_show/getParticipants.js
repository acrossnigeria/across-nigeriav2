import QuizShowParticipant from '../../../models/QuizShowParticipant';
import db from '../../../../utils/db';


const Handler = async ( req, res ) => {
    try {
        if ( req.method === 'GET' ) {
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
        } else {
            res.status(500).json( { success:false, error: 'invalid method'})
        }
        
    } catch( err) {
        res.status(500).json( { success:false, error: err.message})
    }
}

export default Handler;