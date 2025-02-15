import User from "@/models/User"
import db from "../../../../utils/db"

const Handler = async (req, res) => {
    try {
        if (req.method==='GET') {
            await db.connect();
            const users = await User.find();
            const docs = []
            users.map( async (user) => {
                if (user.refCode.includes(' ')) {
                    const data = user.refCode.split(' ');
                    const refCode = data[data.length-1];
                    const doc = await User.findById( user._id.toString(), { refCode });
                    docs.push(doc);
                    console.log('success', refCode, doc);
                } else {
                    docs.push( { name:user.name, ref:user.refCode})
                }
            })
            await db.disconnect();
            res.status(200).json( { success:true, docs });

        } else {
            res.status(403).json({success:false, error:'Method not allowed'})
        }
    } catch(err) {
        res.status(500).json( { success:false, error:err.message })
    }
}

export default Handler