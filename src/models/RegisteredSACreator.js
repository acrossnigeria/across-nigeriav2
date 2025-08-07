import mongoose from "mongoose";

const RegisteredSACreatorSchema = new mongoose.Schema( {
    user: { type:mongoose.Schema.Types.ObjectId, required:true, ref:"User"},
    paymentRef: { type:String, required:true }
});

const RegisteredSACreator = mongoose.models.RegisteredSACreator || mongoose.model( "RegisteredSACreator", RegisteredSACreatorSchema );

export default RegisteredSACreator;