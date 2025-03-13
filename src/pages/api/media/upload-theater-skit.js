import db from "../../../../utils/db";
import TheaterSkit from "@/models/TheaterSkit";

const Handler = async ( req, res ) => {
    try {
        if ( req.method === "POST" ) {
            const { userId, vidUrl, email, vidTitle, vidCaption, vidLength } = req.body;
            await db.connect();
            const skitObj = await TheaterSkit.create({ 
                creator:userId, 
                vidUrl, 
                email, 
                vidTitle, 
                vidCaption, 
                vidLength
            });
            await db.disconnect();

            res.status(200).json( { success:true, id:skitObj._id } );
            
        } else {
            res.status(500).json( { success:false, error:error.message } );
        }

    } catch( error ) {
        res.status(500).json( { success:false, error:error.message } );
    }
}

export default Handler;