import User from "@/models/User";
import db from "../../../../utils/db";

const handler = async(req,res)=>{
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    // Your existing logic to fetch data from MongoDB

    try{ 
      // checks type of request, if true 
      //if method === get sends back user name and email
        if ( req.method === 'GET' ) {
            const { email, phone } = req.query;
            await db.connect();

            const userWithEmail = await User.findOne({ email });
            // Send the found documents as a response
            if (userWithEmail) {
                await db.disconnect();
                res.status(200).json( { exists: true , message:'User with this email exists already. Login or go to forgot password page to reset your password' } );
            } 

            const userWithPhone = await User.findOne({ phone });
            if (userWithPhone) {
                await db.disconnect();
                res.status(200).json( { exists: true , message:'User with this phone number exists already. Login or go to forgot password page to reset your password' } );
            }

            res.status(200).json({ exists: false, message:'No user with this email or phone number found' });

        } 

    } catch(error){
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

export default handler