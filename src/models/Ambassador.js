import mongoose from "mongoose";

const AmbSchema = new mongoose.Schema( {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true },
        currentStatus: { type:String, requirded:true }, 
        isWillingToJoinMeet: { type:Boolean, requirded:true }, 
        orgName:{ type:String, requirded:true }, 
        city:{ type:String, requirded:true }, 
        why:{ type:String, requirded:true },  
        state:{ type:String, requirded:true }, 
        termsAgree: { type:Boolean, requirded:true },  
    }, {
        timestamps:true,
    }
)

const Ambassador = mongoose.models.Ambassador || mongoose.model( 'Ambassador', AmbSchema );

export default Ambassador;
