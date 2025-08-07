import db from "../../../../utils/db";
import Advert from "@/models/Advert";

const Handler = async ( req, res ) => {
    function isAdvertActive(startDateStr, expiryDateStr) {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize time to midnight

        const startDate = new Date(startDateStr);
        const expiryDate = new Date(expiryDateStr);

        return today >= startDate && today < expiryDate;
    }

    try {
        if ( req.method === "GET" ) {
            await db.connect();
            const allAdVerts = await Advert.find( { advertTypeName:"Bronze" } );
            await db.disconnect();
            const liveBronzeAdverts = allAdVerts.filter(ad => isAdvertActive(ad?.startDate, ad?.expiryDate));
            console.log(liveBronzeAdverts);
            
            res.status(200).json({ success:true, liveBronzeAdverts });
        } else {
            res.status(500).json( { success:false, msg:'Invalid request method' });
        }
    } catch (err) {
        res.status(500).json( { error:err.message, msg:'Something went wrong', success:false } );
    }
}

export default Handler;