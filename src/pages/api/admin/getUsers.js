import db from "../../../../utils/db";
import User from "@/models/User";

const Handler = async ( req, res) => {
    if (req.method === 'GET') {
       try {
        await db.connect();
        const data = await User.find().lean();
        const users = data.map( user => {
           let data = { 
            _id: user._id,
            fullname:`${user.name.toLowerCase()} ${user.surname.toLowerCase()}`,
            residence:user.residence, 
            referrals: user.references, 
            email: user.email,
            phone: user.phone,
            joinedAt: user.createdAt,
            dob: user.dob,
            gender: user.gender,
          }
          return data 
        })
        await db.disconnect();

        res.status(200).json( { message: 'success getting users data', users });
       } catch (err) {
        await db.disconnect();
         res.status(500).json( { error: 'An error occured while getting users data from database'}) 
       }
    } else {
        res.status(405).json( {message: 'method not allowed'})
    }
}

export default Handler