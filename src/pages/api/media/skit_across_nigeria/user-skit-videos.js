import SkitAcrossNigeriaSkit from "@/models/SkitAcrossNigeriaSkit";
import db from "../../../../../utils/db";

const Handler = async ( req, res) => {
    try {
        if (req.method === "GET") {
            const { user } = req.query;
            await db.connect();
            const skits = await SkitAcrossNigeriaSkit.find( { user:user } );
            await db.disconnect();

            res.status(200).json( { success:true, skits } );
        } else {
            res.status(500).json({ success:false, error:'Invalid method not allowed'});
        }
    } catch(error) {
        res.status(500).json({ success:false, error:error.message});
    }
}

export default Handler;