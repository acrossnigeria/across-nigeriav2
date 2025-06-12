const { default: SquidGameParticipant } = require("@/models/SquidGameParticipant");
const { default: db } = require("../../../../utils/db");


const Handler = async ( req, res ) => {
    try {

        if ( req.method === "POST" ) {

            const { userId, entryCode } = req.body;

            await db.connect();
            const validatedCode = await SquidGameParticipant.findOne( { entryCode: entryCode } );

            if ( validatedCode ) {

                if ( validatedCode.isCodeUsed ) {
                    res.status(409).json( { success:false, error:"ENTRY_CODE_USED", message:"This entry code has already been used." } );
                }

                validatedCode.isCodeUsed = true;
                validatedCode.player = userId;
                await validatedCode.save();
                await db.disconnect();

                res.status(200).json( { success:true, message:'Entry code validated and submitted.' });

            } else {
                await db.disconnect()
                res.status(400).json( { success:false, error:"ENTRY_CODE_INVALID", message:"Code entered is invalid."})
            }

        } else if ( req.method === "GET" ) {

            const { userId } = req.query;

            await db.connect();
            const registeredPlayer = await SquidGameParticipant.findOne( { player:userId } );
            await db.disconnect();

            if ( registeredPlayer ) {
                res.status(200).json( { success:true, isUserSubmitted:true, message:'User submitted entry code already' } );
            } else {
                res.status(200).json( { success:true, isUserSubmitted:false, message:'User has not entry code' } );  
            }

        } else {
            res.status(403).json( { success:false, error:"METHOD_INVALID", message:'Method not allowed '});
        }

    } catch (error) {
        res.status(500).json( { success:false, error:error.message, message:'Server error'});
    }
}

export default Handler;