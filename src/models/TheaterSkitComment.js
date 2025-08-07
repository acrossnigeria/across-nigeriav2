import mongoose, { Schema } from "mongoose";

const theaterSkitCommentSchema = new mongoose.Schema( {
        theaterSkit: { type: mongoose.Schema.Types.ObjectId, ref: 'TheaterSkit', required: true},
        text: { type: String, required: true},
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        likes: { type: Array, required: false, default: []}
    },
    {
        timestamps: true,
    }
)

const TheaterSkitComment = mongoose.models.TheaterSkitComment || mongoose.model('TheaterSkitComment', theaterSkitCommentSchema);

export default TheaterSkitComment;