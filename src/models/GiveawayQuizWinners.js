import mongoose from "mongoose";

const giveawayQuizWinnersSchema = new mongoose.Schema( {
    quizSession: { type: String, required: true },
    winners: { type: Array, required: true }
    }, {
        timestamps:true,
    }
)


const GiveawayQuizWinners = mongoose.models.GiveawayQuizWinners || mongoose.model( 'GiveawayQuizWinners', giveawayQuizWinnersSchema );
export default GiveawayQuizWinners;