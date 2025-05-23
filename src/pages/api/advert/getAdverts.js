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
            const allAdVerts = await Advert.find();
            await db.disconnect();
            const liveAdverts = allAdVerts.filter(ad => isAdvertActive(ad?.startDate, ad?.expiryDate));

            const diamondAdverts = liveAdverts.filter(ad=> ad?.advertTypeName === 'Diamond');
            const silverAdverts = liveAdverts.filter(ad=> ad?.advertTypeName === 'Silver');
            const goldAdverts = liveAdverts.filter(ad=> ad?.advertTypeName === 'Gold');

            const activeAdverts = { diamondAdverts, silverAdverts, goldAdverts };
            
            res.status(200).json({ success:true, activeAdverts })
        } else {
            res.status(500).json('Invalid request method');
        }
    } catch (err) {
        res.status(500).json( { error:err.message, msg:'Something went wrong' } );
    }
}

export default Handler;