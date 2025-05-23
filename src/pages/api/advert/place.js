import Advert from "@/models/Advert";
import db from "../../../../utils/db";

const Handler = async ( req, res ) => {
    try {
        if ( req.method === "POST" ) {
            const data = req.body;
            await db.connect();
            await Advert.create( data );
            await db.disconnect();
            res.status(200).json( { success:true, message:'advert has been placed'});
        } else {
            res.status(403).json({ error:'method not allowed'});
        }  
    } catch(err) {
        res.status(500).json( { error:err.message });
    }

}

export default Handler;