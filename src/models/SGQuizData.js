import mongoose from "mongoose";

const squidGameQuizDataSchema = new mongoose.Schema( {
    mark: { type:Array, default:null, required:true },
    timeCount: { type:String, required:true },
    entryCode: { type:String, required:true },
    user: { type:mongoose.Schema.Types.ObjectId, required:true, ref:"User" },
})

const SquidGameQuizData = mongoose.models.SquidGameQuizData || mongoose.model('SquidGameQuizData', squidGameQuizDataSchema);
export default SquidGameQuizData;