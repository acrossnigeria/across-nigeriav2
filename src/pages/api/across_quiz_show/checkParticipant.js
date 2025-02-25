import db from "../../../../utils/db";
import QuizShowParticipant from "@/models/QuizShowParticipant";

const Handler = async ( req, res ) => {
    const { userId } = req.query;
    try {
        await db.connect();
        const user = await QuizShowParticipant.findOne({ user:userId });
        await db.disconnect();
        if (user) {
            res.status(200).json( { success:true, isUserFound:true, isUserSelected:user.isSelected } );
        } else {
            res.status(200).json( { success:true, isUserFound:false, isUserSelected:false } );
        }
    } catch(err) {
        res.status(500).json( { success:false, error:err.message } );
    }
}

export default Handler;