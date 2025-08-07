import User from "@/models/User"
import db from "../../../../utils/db";

const Handler = async ( req, res) => {
    const { type, id } = req.query;
    
    try {
        if (req.method==='GET') {
            if ( type === 'CHECKBANKINFO' ) {
                await db.connect();
                const user = await User.findById(id);
                await db.disconnect();
                const bankInfo = user.bankName;
                let isBankInfoAvailable ;
                if ( bankInfo ) {
                    isBankInfoAvailable = true;
                } else {
                    isBankInfoAvailable = false;
                }
                res.status(200).json( { success:true, isBankInfoAvailable } )
            } else if ( type === 'GETBANKINFO' ) {
                await db.connect();
                const user = await User.findById(id);
                await db.disconnect();
                const bankName = user.bankName;
                const bankInfo = {};
                let isBankInfoAvailable;
                if ( bankName ) {
                    isBankInfoAvailable = true;
                    bankInfo.bank = user.bank;
                    bankInfo.bankName = user.bankName;
                    bankInfo.bankAccNo = user.bankAccNo;
                } else {
                    isBankInfoAvailable = false;
                }
                res.status(200).json( { success:true, isBankInfoAvailable, bankInfo } )
            }
        } else {
            res.status(403).json('Method not allowed')
        }  
    } catch(err) {
        res.status(500).json( { success:false, error:err.message})
    }

}

export default Handler;