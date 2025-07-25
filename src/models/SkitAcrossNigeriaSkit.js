import mongoose from "mongoose";

const skitAcrossNigeriaSkitSchema = new mongoose.Schema({
        vidTitle:{ type:String, required: true },
        user: { type:mongoose.Schema.Types.ObjectId, required:true, ref:"User" },
        vidUrl:{ type:String, required:true },
        vidLength:{ type:String, required:true },
        vidCaption:{ type:String, required:false, default:""},
        paymentRef:{ type:String, required:true },
    },
    {
        timestamps: true,
    }
);

const SkitAcrossNigeriaSkit = mongoose.models.SkitAcrossNigeriaSkit || mongoose.model('SkitAcrossNigeriaSkit', skitAcrossNigeriaSkitSchema);

export default SkitAcrossNigeriaSkit;