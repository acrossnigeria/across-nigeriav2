import db from "../../../../utils/db";
import TheaterSkit from "@/models/TheaterSkit";
import TheaterSkitVote from "@/models/TheaterSkitVote";
import mongoose from "mongoose";

const Handler = async ( req, res ) => {

    const timeAgo = (timestamp) => {
        const now = new Date();
        const past = new Date(timestamp);
        const seconds = Math.floor((now - past) / 1000);
      
        if (seconds < 60) return `${seconds} second${seconds>1?'s':''} ago`;
        
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes} minute${minutes>1?'s':''} ago`;
      
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} hour${hours>1?'s':''} ago`;
      
        const days = Math.floor(hours / 24);
        if (days < 30) return `${days} day${days>1?'s':''} ago`;
      
        const months = Math.floor(days / 30);
        if (months < 12) return `${months} month${months>1?'s':''} ago`;
      
        const years = Math.floor(months / 12);
        return `${years} years ago`;
      }
      

    const getEngagementData = async (user, skitId) => {
        // check is user has voted for the specified skit
        let authorized ;
        let hasVotedThisSkit;
        const hasVotedAnySkit = await TheaterSkitVote.findOne( { user:user } );
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
                    createdAt:timeAgo(video.createdAt)
                };
                res.status(200).json( { success:true, vidData, voteData });
            } else if ( type ==='multi') {

                await db.connect();
                const videos = await TheaterSkit.find().populate('user', 'name surname');

                const allvideosSort = await Promise.all(
                    videos.map(async (e) => {
                      const vidId = e._id;
                      const votes = await TheaterSkitVote.find({ theaterSkit: vidId });
                  
                      return {
                        vidLength: e.vidLength,
                        vidTitle: e.vidTitle,
                        vidCaption: e.vidCaption,
                        vidUrl: e.vidUrl,
                        votes: votes,
                        fullname: `${e.user.name} ${e.user.surname}`,
                        id: vidId,
                        createdAt: timeAgo(e.createdAt),
                      };
                    })
                  );
                  
                await db.disconnect();

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