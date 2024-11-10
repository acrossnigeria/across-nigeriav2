import User from "@/models/User";
import db from "../../../utils/db";

const handler = async(req,res)=>{
    try{ 
      console.log("inside findUser")
        if (req.method==='GET'){
    const { email } = req.query;
    console.log("GETTING",req.query)
    await db.connect();
    const user= await User.find(
        {email: email});
        console.log(user)
    await db.disconnect();
    // Send the found documents as a response
     if (user.length>0) {
      res.status(200).json({ exists: true ,name:user[0].name, email:user[0].email});
    } else {
      res.status(200).json({ exists: false });
    };}
else if(req.method==='PATCH'){
    
    const{recepient,resetCodeUrl,resetCode}=req.body;
    const resetTime=new Date();

    await db.connect();
    const result=await User.findOne({email:recepient})
     if (!result) {
        await db.disconnect();
        return res.status(404).json({ message: 'User not found' });
      }
      const updatedUser = {...result._doc, resetCode, resetCodeUrl,resetTime}
     const savedUser = await User.findByIdAndUpdate(result._id, updatedUser, { new: true });
      await db.disconnect();
    console.log("RESULT OF FIND", savedUser)
     if (result.nModified === 0) {
      return res.status(404).json({ message: 'User not found or password cannot be reset' });
    }

    res.status(200).json({ message: 'password reset code is set' });
}}
catch(error){
     console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}

}
    export default handler