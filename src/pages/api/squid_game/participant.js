import mongoose from "mongoose";
import db from "../../../../utils/db";
import SquidGameQuizData from "@/models/SGQuizData";

const { default: SquidGameParticipant } = require("@/models/SquidGameParticipant");

const Handler = async ( req, res ) => {
    try {
        if ( req.method === "GET" ) {
            const { userId, isVerification } = req.query;
            await db.connect();
            const participant = await SquidGameParticipant.findOne( { player:new mongoose.Types.ObjectId(userId) }).populate( "player", 'name phone surname email references refCode');
            const entryCode = participant ? participant?.entryCode : "NONE_USER";
            let hasParticipated = false;
            if ( entryCode ) {
                const hasUserSubmitted = await SquidGameQuizData.findOne( { entryCode:entryCode });
                hasParticipated = hasUserSubmitted ? true : false;
            }
            await db.disconnect();  
            let userData;
            if ( participant ) {
                if ( isVerification === true || isVerification === 'true' ) {
                    userData = { isQualified:participant?.isQualified, entryCode, hasParticipated };
                } else {
                    userData = { ...participant?.player, isQualified:participant?.isQualified, entryCode, hasParticipated}
                }
            } else {
                userData = { isQualified:false }
            }

            res.status(200).json( { userData } );
        } else if ( req.method === "PATCH" ) {

            const { entryCodes } = req.query;

            await db.connect();
            const updatedEntries = Promise.all(
                    entryCodes?.map( async ( entryCode ) => {
                        const updatedDoc = await SquidGameParticipant.findOneAndUpdate( { entryCode:entryCode }, { isQualified:true } );
                        return updatedDoc;
                    })
            )
            await db.disconnect();

            res.status(200).json( { action:"Entrie updated to qualified successfully", updatedEntries });

        } else if ( req.method === "POST" ) {

            const { entryCode, userId, mark, timeCount } = req.body;

            await db.connect();
            await SquidGameQuizData.create( { entryCode, user:userId, mark, timeCount } );
            await db.disconnect();

            res.status(200).json( { message:"Quiz data submitted successfully", entryCode, } );

        } else {
            res.status(403).json( { error:"INVALID_METHOD", errorMessage:"method not allowed"})
        }
    } catch (err) {
        res.status(500).json( { error:"SERVER_ERROR", errorMessage:err?.message } );
    }

}

export default Handler;