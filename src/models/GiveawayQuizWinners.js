import mongoose from "mongoose";

const giveawayQuizWinnersSchema = new mongoose.Schema( {
    quizSession: { type: String, required: true },
    winners: { type: Array, required: true }
    }, {
        timestamps:true,
    }
)

if (process.env.NODE_ENV === 'development' ) {
    delete mongoose.models.GiveawayQuizWinners;
}

const GiveawayQuizWinners = mongoose.models.GiveawayQuizWinners || mongoose.model( 'GiveawaQuizWinners', giveawayQuizWinnersSchema );
export default GiveawayQuizWinners;