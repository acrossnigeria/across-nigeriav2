import mongoose from "mongoose";

const theaterSkitSchema = new mongoose.Schema({
        title:{ type:String, required: true },
        creator: { type:mongoose.Schema.Types.ObjectId, required:true, ref:"User" },
        url:{ type:String, required:true },
        description:{ type:String, required:true },
        votes:{ type:Array, required:false, default:[] },
        comments:{ type:Array, required:false, default:[] }
    },
    {
        timestamps: true,
    }
    );

const TheaterSkit = mongoose.models.TheaterSkit || mongoose.model('TheaterSkit', theaterSkitSchema);
export default TheaterSkit;