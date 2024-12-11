import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema( {
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true},
    text: { type: String, required: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    },
    {
        timestamps: true,
    }
)

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);

export default Comment;