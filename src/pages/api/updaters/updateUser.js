import User from "@/models/User"
import db from "../../../../utils/db"

const Handler = async (req, res) => {
    try {
        if (req.method==='PUT') {
            const { id, bank, bankName, bankAccNo } = req.body;
            await db.connect();
            const user = await User.findByIdAndUpdate( id, { bank, bankName, bankAccNo });
            if (user) {
                res.status(200).json( { success:true, message:'Bank details updated successfully'});
            } else {
                res.status(200).json( { success:false, message:'Something Went wrong when updating info'});
            }
        } else {
            res.status(403).json({success:false, error:'Method not allowed'})
        }
    } catch(err) {
        res.status(500).json( { success:false, error:err.message })
    }
}

export default Handler