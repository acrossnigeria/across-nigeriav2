import Comment from "@/models/Comment";
import db from "../../../../utils/db";

const handler = async (req, res) => {
    if ( req.method === 'POST') {
        const { user, post, text } = req.body;

        try {
            await db.connect();
            const comment = await Comment.create( {user, post, text});
            const commentArray = await Comment.find( { post } ).populate('user', 'name _id');
            await db.disconnect();
            res.status(200).json({ message:'comment added successfully', commentArray});
        } catch ( err ) {
            res.status(500).json({message:'comment was unsuccessfull'})
        }

    } else if ( req.method === 'PATCH') {

    } else if ( req.method === 'GET' ) {
        console.log(req.query);
        const { post } = req.query;
        
        try {
            await db.connect();
            const commentArray = await Comment.find( { post } ).populate('user', 'name').exec();
            await db.disconnect();

            res.status(200).json(commentArray);
        } catch (err) {
            res.status(500).json({ message: 'erro getting comments'})
        }
    }

}

export default handler;