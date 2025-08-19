import mongoose from "mongoose";

const SANRS_WinnerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    phase: { type: mongoose.Schema.Types.ObjectId, ref: 'SANRS_Phase', required: true },
    skit: { type: mongoose.Schema.Types.ObjectId, ref: 'SkitAcrossNigeriaSkit', required: true },
    position: { type: Number, required: true },
    votes: { type: Number, required: true },
}, {
    timestamps: true
});

const SANRS_Winner = mongoose.model("SANRS_Winner", SANRS_WinnerSchema);

export default SANRS_Winner;
