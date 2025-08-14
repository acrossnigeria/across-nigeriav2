import RegisteredSACreator from "@/models/RegisteredSACreator";
import db from "../../../../../utils/db";
import SkitAcrossNigeriaSkit from "@/models/SkitAcrossNigeriaSkit";
import SkitAcrossNigeriaVote from "@/models/SkitAcrossNigeriaVote";

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
        const hasVotedAnySkit = await SkitAcrossNigeriaVote.findOne( { user:user } );
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
            const { userId, vidUrl, email, vidCaption, vidLength } = req.body;
            await db.connect();
            const skitObj = await SkitAcrossNigeriaSkit.create({ 
                user:userId, 
                vidUrl, 
                email, 
                vidCaption, 
                vidLength,
            });
            await db.disconnect();
            const date = new Date();
            console.log( `${userId} uploaded a skit ${date.getTime()}` );

            res.status(200).json( { success:true, id:skitObj._id } );
            
        } else if( req.method === 'GET' ) {

            const { type, userId } = req.query;

            if ( type === "single" ) {
                const id = req.query.id;

                await db.connect();
                const video = await SkitAcrossNigeriaSkit.findById(id).populate('user', 'name surname');
                if (!video) {
                    res.status(404).json( { success:false, error:'No video found' } );
                }
                let votes = 0;
                const voteDocs = await SkitAcrossNigeriaVote.find( { skitId:id });
                voteDocs?.map( (voteDoc) => {
                    votes+=voteDoc?.votes;
                });

                await db.disconnect();
                const vidUrl = video?.vidUrl?.replace("mp4", "m3u8").replace("mov", "m3u8");

                const vidData = {
                    vidLength:video?.vidLength, 
                    vidTitle: video?.vidTitle,
                    vidLength:video?.vidLength, 
                    vidCaption:video?.vidCaption,
                    vidUrl,
                    fullname:`${video?.user?.name} ${video?.user?.surname}`,
                    createdAt:timeAgo(video?.createdAt),
                    votes,
                };
                res.status(200).json( { success:true, vidData });
            } else if ( type ==='multi') {

                await db.connect();
                const videos = await SkitAcrossNigeriaSkit.find().populate('user', 'name surname');
                let isRegistered = false;
                if ( userId !=='' ) {
                    const user = await RegisteredSACreator.findOne({ user: userId });
                    isRegistered = !!user;
                }

                const allvideosSort = await Promise.all(
                    videos.map(async (e) => {
                      const vidId = e._id;
                      const voteDocs = await SkitAcrossNigeriaVote.find({ skitId: vidId });
                      let votes = 0;

                      voteDocs?.map( ( voteDoc ) => {
                        votes += voteDoc?.votes;
                      })

                      return {
                        vidLength: e?.vidLength,
                        vidCaption: e?.vidCaption,
                        vidUrl: e?.vidUrl,
                        votes: votes,
                        fullname: `${e?.user.name} ${e?.user.surname}`,
                        id: vidId,
                        createdAt: timeAgo(e?.createdAt),
                      };
                    })
                  );
                  
                await db.disconnect();

                res.status(200).json( { success:true, vidData:allvideosSort, isRegistered })
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