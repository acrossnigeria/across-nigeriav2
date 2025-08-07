import mongoose from "mongoose";

const squidGameParticipantSchema = new mongoose.Schema(
    {
        player: { type: mongoose.Schema.Types.ObjectId, default:null, ref:"User" },
        entryCode: { type:String, default:'' },
        isCodeUsed: { type:Boolean, default:false },
        isQualified: { type:Boolean, default:false },
    }, 
    {
        timestamps:true
    }
);

const SquidGameParticipant = mongoose.models.SquidGameParticipant || mongoose.model( "SquidGameParticipant", squidGameParticipantSchema );
export default SquidGameParticipant;