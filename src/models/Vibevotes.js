import mongoose from "mongoose";
const vibeVotesSchema= new mongoose.Schema({
    vibeId:{type:String, required:true},
    votes:{type:Number, required:true},
    fileType:{type:String, required:true},
    category:{type:String, required:true},
    },{timestamps:true,});
const VibesVotes=mongoose.models.VibesVotes || mongoose.model('VibesVotes',vibeVotesSchema);
export default VibesVotes;