import mongoose from "mongoose";

const theaterSkitVoteSchema = new mongoose.Schema({
    user: { type:mongoose.Schema.Types.ObjectId, ref:'User', required:true },
    theaterSkit: { type:mongoose.Schema.Types.ObjectId, ref:'TheaterSkit', required:true },
    }, 
    {
        timestamps:true,
    }
    
);

const TheaterSkitVote = mongoose.models.TheaterSkitVote || mongoose.model('TheaterSkitVote', theaterSkitVoteSchema );

export default TheaterSkitVote;