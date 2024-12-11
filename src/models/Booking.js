import mongoose from "mongoose";
const bookingSchema= new mongoose.Schema( {
        dateSelected: {type:String, required:false },
        category: {type:String, required:false },
        name: {type:String, required:false },
        mediaUrl: {type:String, required:true },
        shoutOut: {type:String, required:false },
        age: {type:Number, required:false },
        finalized: { type: Boolean, default: false },
        Likes: { type: Array, default:[]},
        user:{ type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    },
    {
        timestamps:true,
    }
);

const Booking = mongoose.models.Booking || mongoose.model('Booking',bookingSchema);
export default Booking;