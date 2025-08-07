import User from "@/models/User";
import db from "../../../utils/db";
import Ambassador from "@/models/Ambassador";

const handler = async(req,res)=>{
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    // Your existing logic to fetch data from MongoDB

    try{ 

      console.log("inside findUser")

      // checks type of request, if true 
      //if method === get sends back user name and email
      if (req.method==='GET') {
      const { email } = req.query;
      console.log("GETTING",req.query);
      await db.connect();
      const user = await User.findOne({ email });
      // Send the found documents as a response
      if (user) {
        const isUserAmbassador = await Ambassador.findOne( { user:user._id });
        await db.disconnect();
        const fullname = `${user.name} ${user.surname}`;
        const notifications = [];
        res.status(200).json( { exists: true , isAmbassador:isUserAmbassador?true:false, fullname, email:user.email, refCode:user.refCode, refs:user.references, phone:user.phone, notifications } );
      } else {
        await db.disconnect();
        res.status(200).json({ exists: false });
      };

      // if patch, updates the user reset code URL, reset code and a reset time
      } else if (req.method==='PATCH') {

        const{recepient,resetCodeUrl,resetCode}=req.body;
        const resetTime = new Date();

        await db.connect();
        const result = await User.findOne({email:recepient});

        // no result was found sends back a response 404 user no found
        if (!result) {
          await db.disconnect();
          return res.status(404).json({ message: 'User not found' });
        }
        
        // updates the user resetCode, resetCodeUrl and resetTime
        const updatedUser = { ...result._doc, resetCode, resetCodeUrl, resetTime };
        const savedUser = await User.findByIdAndUpdate(result._id, updatedUser, { new: true });
        await db.disconnect();
        console.log("RESULT OF FIND", savedUser)

        if (savedUser?.nModified === 0) {
          return res.status(404).json({ message: 'User not found or password cannot be reset' });
        }

        res.status(200).json({ message: 'password reset code is set' });
      }

    } catch(error){
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

export default handler