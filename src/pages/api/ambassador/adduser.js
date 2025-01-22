import db from "../../../../utils/db";
import User from "@/models/User";
import Ambassador from "@/models/Ambassador";

const Handler = async (req, res) => {
    if (req.method === 'POST') {
        const { user, currentStatus, isWillingToJoinMeet, orgName, city, why, state, termsAgree } = req.body;
        const checkUser = async () => {
            const isAlreadyApplied = await Ambassador.findOne( { user: user });
            if (isAlreadyApplied) return true;
            else return false;
        }
        try {
            await db.connect();
            const isUserAvailable = checkUser();
            if (isUserAvailable) {
                res.status(200).json( { success: false, error:'Oh, you are an Ambassador already' });
            } else {
               const newAmb = await Ambassador.create( { user, currentStatus, isWillingToJoinMeet, orgName, city, why, state, termsAgree } );
                console.log(newAmb);
                const userData =  await User.findOne( {_id:user });
                console.log(userData);
                const refCode = user.refCode;
                const refLink = `https://acrossnig.com/account/reg?ref=${refCode}`;
                await db.disconnect();
                res.status(200).json( {success:true, refLink })  
            }
            
        } catch(err) {
            console.log(err.message);{ user, currentStatus, isWillingToJoinMeet, orgName, city, why, state, termsAgree }
            res.status(500).json( {error: 'something went wrong'})
        }

    } else {
        res.status(403).json({error:'invalid method'});
    }
}

export default Handler;