import QuizShowParticipant from '../../../models/QuizShowParticipant';
import db from '../../../../utils/db';


const Handler = async ( req, res ) => {
    function formatDate(date) {
        const dateObj = new Date(date);
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit'};
        const brokenDateStr = dateObj.toLocaleDateString('en-US', options).split(', ');
        const formatedDate = `${brokenDateStr[0]} ${brokenDateStr[1]} ${brokenDateStr[2]}`
        return formatedDate;
    }
    try {
        if ( req.method === 'GET' ) {
            await db.connect();
            const collection = await QuizShowParticipant.find().populate('user');
            await db.disconnect();
            const participants = [];
            collection.map( (doc)=> {
                const bankInfo = doc.user.bankName?`${doc.user.bankName} ${doc.user.bankAccNo}`:'No info';
                const bankName = doc.user.bank?`${doc.user.bank}`:'No info';
                const data = {
                    fullname:`${doc.user.name.toLowerCase()} ${doc.user.surname.toLowerCase()}`,
                    whatsappPhone:doc.user.phone,
                    email:doc.user.email,
                    regAt:formatDate(doc.createdAt),
                    payRef:doc.paymentRef,
                    status:doc.status,
                    knowledgeOfNigeria:doc.knowledgeOfNigeria,
                    referralSource:doc.referralSource,
                    confidenceInKnowledge:doc.confidenceInKnowledge,
                    bankInfo:bankInfo,
                    bank:bankName,
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