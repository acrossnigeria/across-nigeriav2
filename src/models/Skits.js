import mongoose from "mongoose";
const skitsSchema=new mongoose.Schema({
  name:{type:String, required:false},
    title:{type:String, required: true},
    email:{type:String, required:true},
    url:{type:String, required:true},
    description:{type:String, required:true},
    votes:{type:Number,required:false, default:0},
    payment:{type:Boolean, required:true},
    referencePay: { type: String, default:"", required:false},
},
  {
    timestamps: true,
  });

  const Skits=mongoose.models.Skits || mongoose.model('Skits',skitsSchema);
  export default Skits;