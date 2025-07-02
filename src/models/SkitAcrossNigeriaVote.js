import mongoose from "mongoose";

const skitAcrossNigeriaVoteSchema = new mongoose.Schema({
        userId: { type:String, required:true },
        skitId: { type:mongoose.Schema.Types.ObjectId, ref:'SkitAcrossNigeriaSkit', required:true },
        voterEmail: { type:String, required:true },
        votes: { type:Number, required:true },
        paymentRef: { type:String, required:true }
    }, 
    {
        timestamps:true,
    }
    
);

const SkitAcrossNigeriaVote = mongoose.models.SkitAcrossNigeriaVote || mongoose.model('SkitAcrossNigeriaVote', skitAcrossNigeriaVoteSchema );

export default SkitAcrossNigeriaVote;