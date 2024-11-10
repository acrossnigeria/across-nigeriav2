import mongoose from "mongoose";
const naijavibesSchema=new mongoose.Schema({
    name:{type:String, required:false},
    title:{type:String, required: true},
    email:{type:String, required:true},
    url:{type:String, required:true},
    fileType:{type:String, required:true},
    category:{type:String, required:true},
    description:{type:String, required:true},
    votes:{type:Number,required:false, default:0},
    payment:{type:Boolean, required:true},
    referencePay: { type: String, default:"", required:false},
},
  {
    timestamps: true,
  });

  const Naijavibes=mongoose.models.Naijavibes || mongoose.model('Naijavibes',naijavibesSchema);
  export default Naijavibes;