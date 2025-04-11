import db from "../../../../utils/db";
import User from "@/models/User";
import Ambassador from "@/models/Ambassador";

const Handler = async (req, res) => {
    if (req.method === 'POST') {
        const { user, currentStatus, isWillingToJoinMeet, orgName, city, why, state, termsAgree } = req.body;
        try {
            await db.connect();
            const isUserAvailable = await Ambassador.findOne( { user: user });
            if (isUserAvailable) {
                await db.disconnect();
                res.status(200).json( { success: false, error:'Oh, you are an Ambassador already' });
            } else {
                const newAmb = await Ambassador.create( { user, currentStatus, isWillingToJoinMeet, orgName, city, why, state, termsAgree } );
                const userData =  await User.findOne( {_id:user });
                const refCode = user.refCode;
                const refLink = `https://acrossnig.com/account/reg?ref=${refCode}`;
                await db.disconnect();
                res.status(200).json( {success:true, refLink })  
            }
            
        } catch(err) {
            console.log(err.message);
            await db.disconnect();
            res.status(500).json( {error: 'something went wrong'})
        }

    } else if ( req.method === 'GET') {

        try {
            await db.connect();
            const ambassadors = await Ambassador.find().populate('user', 'name phone references surname email refCode');
            await db.disconnect();
            let screeningList = [];
            ambassadors.map( ambassador => {
                let data = { 
                    fullname:`${ambassador?.user?.name} ${ambassador?.user?.surname}`,
                    status:ambassador?.currentStatus,
                    city:ambassador?.city,
                    orgName:ambassador?.orgName,
                    residence:ambassador?.state,
                    email:ambassador?.user?.email,
                    phone:ambassador?.user?.phone,
                    joinedAt:ambassador?.createdAt,
                    refs:ambassador?.user?.references,
                }
                screeningList.push(data);
            }) 
            res.status(200).json( {success:true, list:screeningList})
        } catch(err) {
            console.log(err.message);
            res.status(400).json( { success:false, error:err.message } )
        }

    } else {
        await db.disconnect();
        res.status(403).json({error:'invalid method'});
    }
}

export default Handler;