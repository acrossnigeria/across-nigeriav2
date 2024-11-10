import mongoose from "mongoose";
const bookingSchema= new mongoose.Schema({
    dateSelected:{type:String, required:true},
    category:{type:String, required:true},
    name:{type:String, required:true},
    mediaUrl:{type:String, required:true},
    shoutOut:{type:String, required:true},
    age:{type:Number, required:false},
},{timestamps:true,});
const Booking=mongoose.models.Booking || mongoose.model('Booking',bookingSchema);
export default Booking;