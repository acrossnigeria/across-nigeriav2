import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema( {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    type: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    }, {
        timestamps: true,
    }
)

const Notification = mongoose.models.Notification || mongoose.model( 'Notification', notificationSchema );

export default Notification;

