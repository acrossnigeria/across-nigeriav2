import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User', required:true},
    email:{type:String, required:true},
    referencePay: { type: String, default:"", required:false},
    correctAnswer:{type:Boolean, default:false, required:true},
   },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', quizSchema);
export default Quiz;
