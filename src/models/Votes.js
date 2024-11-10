import mongoose from "mongoose";
const skitVotesSchema= new mongoose.Schema({
    skitId:{type:String, required:true},
    votes:{type:Number, required:true},
    
},{timestamps:true,});
const SkitsVotes=mongoose.models.SkitsVotes || mongoose.model('SkitsVotes',skitVotesSchema);
export default SkitsVotes;