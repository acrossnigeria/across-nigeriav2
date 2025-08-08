import RegisteredSACreator from "@/models/RegisteredSACreator";
import db from "../../../../utils/db";
import SkitAcrossNigeriaSkit from "@/models/SkitAcrossNigeriaSkit";

const Handler = async ( req, res ) => {
    try {
        if (req.method === "GET") {
            const { userId } = req.query;

            await db.connect();
            const user = await RegisteredSACreator.findOne( { user:userId } );
            const skit = await SkitAcrossNigeriaSkit.findOne( { user:userId } ).populate("user");
            await db.disconnect();

            const resObj = { 
                isUserRegistered:user?true:false, 
                hasUploaded:skit? {
                    userFirsName:skit?.user?.name,
                    skitId:skit?._id,
                }:false,
            } ;

            res.status(200).json( resObj );
        } else if ( req.method === "POST" ) {
            const { userId, paymentRef } = req.body;
            console.log( `user with id:${userId} just registered for skit across nigeria, payRef:${paymentRef}` )

            await db.connect();
            const regDoc = await RegisteredSACreator.create( { user:userId, paymentRef } );
            await db.disconnect();

            res.status(200).json( { isRegistered:regDoc?true:false } )

        } else {
            res.status(403).json( { error:"METHOD_NOT_ALLOWED", errorMsg:"Method is not allowed" });
        }
    } catch (err) {
        res.status(500).json( { error:"UNKNOWN_SERVER_SIDE_ERROR", errorMsg:err.message })
    }
}

export default Handler;