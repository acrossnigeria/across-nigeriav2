import mongoose from "mongoose";

const skitAcrossNigeriaSkitSchema = new mongoose.Schema({
        vidTitle:{ type:String, required: true },
        user: { type:mongoose.Schema.Types.ObjectId, required:true, ref:"User" },
        vidUrl:{ type:String, required:true },
        vidLength:{ type:String, required:true },
        votes:{ type:Array, required:false, default:[] },
        comments:{ type:Array, required:false, default:[] },
        vidCaption:{ type:String, required:false, default:""}
    },
    {
        timestamps: true,
    }
);

const SkitAcrossNigeriaSkit = mongoose.models.SkitAcrossNigeriaSkit || mongoose.model('SkitAcrossNigeriaSkit', skitAcrossNigeriaSkitSchema);

export default SkitAcrossNigeriaSkit;