import mongoose from "mongoose";

const skitAcrossNigeriaVoteSchema = new mongoose.Schema({
        user: { type:mongoose.Schema.Types.ObjectId, ref:'User', required:true },
        theaterSkit: { type:mongoose.Schema.Types.ObjectId, ref:'SkitAcrossNigeriaSkit', required:true },
        votes: { type:Number, required:true },
        paymentRef: { type:String, required:true }
    }, 
    {
        timestamps:true,
    }
    
);

const SkitAcrossNigeriaVote = mongoose.models.SkitAcrossNigeriaVote || mongoose.model('SkitAcrossNigeriaVote', skitAcrossNigeriaVoteSchema );

export default SkitAcrossNigeriaVote;