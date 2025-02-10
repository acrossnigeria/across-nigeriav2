import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema({
    status:{ type:String, default:'temp_data' },
    whatsappPhone:{ type:String, default:'temp_data' },
    knowledgeOfNigeria:{ type:String, default:'temp_data' },
    referralSource:{ type:String, default:'temp_data' },
    confidenceInKnowledge:{ type:String, default:'temp_data' },
    loveToVisit:{ type:String, default:'temp_data' },
    introVideoUrl:{ type:String, default:'temp_data' },
    agreedToTerms:{ type:Boolean, default:false },
    user:{ type:mongoose.Schema.Types.ObjectId, ref:'User' },
    payment:{ type:Boolean, default:false },
    isSelected:{ type:Boolean, default:false },
    paymentRef:{ type:String, default:'temp_data'}
    },
    {
        timestamps:true,
    }
)

const QuizShowParticipant = mongoose.models.QuizShowParticipant || mongoose.model( 'QuizShowParticipant', participantSchema );

export default QuizShowParticipant;