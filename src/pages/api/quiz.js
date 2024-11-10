import Quiz from "@/models/Quiz";
import db from "../../../utils/db";

async function handler (req,res) {
    if(req.method !=='POST') {
            return;
    }
    const quizDetails=req.body;
    const { name,userId,email, referencePay,correctAnswer}=quizDetails;
      await db.connect();
    const newQuiz= new Quiz ({
        name,userId,email, referencePay,correctAnswer
    })
    const quiz=await newQuiz.save();
    await db.disconnect();

    res.status(201).send({
      message: `Congratulations ${name}!`,})
}

  export default handler;