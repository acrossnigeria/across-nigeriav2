import db from "../../../../utils/db";
import TheaterSkitVote from "@/models/TheaterSkitVote";

const Handler = async ( req, res) => {
    try {
        if (req.method === "POST") {
            const { user, toVote, theaterSkit } = req.body;
            let authorized;
            let hasVotedThisSkit;
            await db.connect();
            if ( toVote ) {
                const newVote = await TheaterSkitVote.create({ user:user, theaterSkit:theaterSkit });
                await newVote.save();
                authorized = true;
                hasVotedThisSkit = true;
            } else {
                await TheaterSkitVote.findOneAndDelete( { user:user, theaterSkit:theaterSkit });
                authorized = true;
                hasVotedThisSkit = false;
            }
             const votes = await TheaterSkitVote.find( { theaterSkit:theaterSkit } );
             await db.disconnect();

             const voteData = { authorized, hasVotedThisSkit, votes:votes.length };
             res.status(200).json( { success:true, voteData })

        } else {
            res.status(403).json( { success:false, error:"Invalid method"})
        }
    } catch(err) {
        res.status(500).json( { success:false, error:err.message } );
    };
};

export default Handler;