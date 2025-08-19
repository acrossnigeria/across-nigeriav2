import mongoose from "mongoose";

const SANRS_PhaseSchema = new mongoose.Schema({
    month: { type: String, required: true },
    endDate: { type: Date, required: true },
    startDate: { type: Date, required: false },
    status: { type: String, enum: ['upcoming', 'active', 'completed'], default: 'upcoming' },
    upload_enabled: { type: Boolean, default: false },
    voting_enabled: { type: Boolean, default: false },
    winners_published: { type: Boolean, default: false },
    },
    {
        timestamps: true
    }

);

const SANRS_Phase = mongoose.model("SANRS_Phase", SANRS_PhaseSchema);

export default SANRS_Phase;
