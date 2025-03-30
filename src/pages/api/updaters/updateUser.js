import User from "@/models/User"
import db from "../../../../utils/db"

const Handler = async (req, res) => {
    try {
        if (req.method==='GET') {
            await db.connect();
            const users = await User.find();
            let phoneNumbers = '';
            users.map( async (user) => {
                phoneNumbers = `${phoneNumbers}, +${user.phone}`;
            })
            console.log(phoneNumbers);
            await db.disconnect();
            res.status(200).json( { success:true, phoneNumbers });

        } else {
            res.status(403).json({success:false, error:'Method not allowed'})
        }
    } catch(err) {
        res.status(500).json( { success:false, error:err.message })
    }
}

export default Handler