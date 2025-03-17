import db from "../../../../utils/db";
import TheaterSkit from "@/models/TheaterSkit";
import TheaterSkitVote from "@/models/TheaterSkitVote";
import mongoose from "mongoose";

const Handler = async ( req, res ) => {

    const getEngagementData = async (user, skitId) => {
        // check is user has voted for the specified skit
        let authorized ;
        let hasVotedThisSkit;
        const hasVotedAnySkit = await TheaterSkitVote.findOne( { user:user } )
        if ( hasVotedAnySkit ) {
            if ( hasVotedAnySkit?.theaterSkit?.toString() === skitId  ) {
                authorized = true;
                hasVotedThisSkit = true;
            } else {
                authorized = false;
                hasVotedThisSkit = false;
            }
        } else {
            authorized = true;
            hasVotedThisSkit = false;
        }

        return { authorized, hasVotedThisSkit };
    }

    try {
        if ( req.method === "POST" ) {
            const { userId, vidUrl, email, vidTitle, vidCaption, vidLength } = req.body;
            await db.connect();
            const skitObj = await TheaterSkit.create({ 
                user:userId, 
                vidUrl, 
                email, 
                vidTitle, 
                vidCaption, 
                vidLength
            });
            await db.disconnect();

            res.status(200).json( { success:true, id:skitObj._id } );
            
        } else if( req.method === 'GET' ) {
            const type = req.query.type;
            if ( type === "single" ) {
                const id = req.query.id;
                const user = req.query?.user;
                let voteData;

                await db.connect();
                const video = await TheaterSkit.findById(id).populate('user', 'name surname');
                if (!video) {
                    res.status(404).json( { success:false, error:'No video found' } );
                }
                const votes = await TheaterSkitVote.find( { theaterSkit:id });
                if ( user ) {
                    const { authorized, hasVotedThisSkit, hasVotedDifSkit } = await getEngagementData( user, id );
                    voteData = { authorized, hasVotedThisSkit, hasVotedDifSkit, votes:votes.length };
                } else {
                    voteData = { authorized:false, hasVotedThisSkit:false, votes:votes.length };
                };
                await db.disconnect();
                const vidUrl = video.vidUrl.replace("mp4", "m3u8");

                const vidData = {
                    vidLength:video.vidLength, 
                    vidTitle: video.vidTitle,
                    vidLength:video.vidLength, 
                    vidCaption:video.vidCaption,
                    vidUrl,
                    fullname:`${video.user.name} ${video.user.surname}`,
                };
                res.status(200).json( { success:true, vidData, voteData });
            } else if ( type ==='multi') {

                await db.connect();
                const videos = await TheaterSkit.find().populate('user', 'name surname');
                await db.disconnect();

                const allvideosSort = [];
                videos.map( (e)=> {
                    let data = {
                        vidLength:e.vidLength, 
                        vidTitle: e.vidTitle,
                        vidLength:e.vidLength, 
                        vidCaption:e.vidCaption,
                        vidUrl:e.vidUrl,
                        votes:e.votes,
                        fullname:`${e.user.name} ${e.user.surname}`,
                        id:e._id
                    };
                    allvideosSort.push(data);
                })

                res.status(200).json( { success:true, vidData:allvideosSort })
            }

        } else {
            res.status(500).json( { success:false, error:'failed to run operation'} );
        }

    } catch( error ) {
        res.status(500).json( { success:false, error:error.message } );
        console.log(error);
    }
}

export default Handler;