import SkitAcrossNigeriaSkit from "@/models/SkitAcrossNigeriaSkit";
import db from "../../../../utils/db";

const Handler = async ( req, res ) => {
    try {
        if ( req.method === "GET") {
            const { userId } = req.query;

            await db.connect();
            const skit = await SkitAcrossNigeriaSkit.findOne( { user:userId } ).populate("user");
            
            let creator;
            if (skit) {
                creator = {
                    userFirsName:skit?.user?.name,
                    skitId:skit?._id,
                }
            } else {
                creator = false;
            }

            res.status(200).json( { creator } );
        } else {
            res.status(403).json( { error:"METHOD_NOT_ALLOWED", errorMsg:"This method is not allowed in this API"})
        }
    } catch (err) {
        res.status(500).json( { error:"SERVER_SIDE_ERROR", errorMsg:err.message } );
    }
}

export default Handler;