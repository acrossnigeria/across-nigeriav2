import db from "../../../../utils/db";
import TheaterSkit from "@/models/TheaterSkit";

const Handler = async ( req, res ) => {
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
            const { id, type } = req.query;
            if ( type === "single" ) {

                await db.connect();
                const video = await TheaterSkit.findById(id).populate('user', 'name surname');
                await db.disconnect();
                const vidUrl = video.vidUrl.replace("mp4", "m3u8");

                const vidData = {
                    vidLength:video.vidLength, 
                    vidTitle: video.vidTitle,
                    vidLength:video.vidLength, 
                    vidCaption:video.vidCaption,
                    vidUrl,
                    fullname:`${video.user.name} ${video.user.surname}`,
                    votes:video.votes,
                };
                res.status(200).json( { success:true, vidData });
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