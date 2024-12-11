import db from "../../../../utils/db";
import Booking from "@/models/Booking";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { user, post} = req.body;
        try {
            await db.connect();

            const doc = await Booking.findById(post);
            const newLikes = doc.Likes;
            newLikes.push(user);
            doc.Likes = newLikes;
            await doc.save();

            await db.disconnect();

            res.status(200).json({ message: 'like added', newLikes: doc.Likes});
        } catch(err) {
            console.log(`Error: ${err.message}`);
            res.status(500).json({ message: 'error adding like'});
        }

    } else if (req.method === 'PATCH') {
        const { user, post} = req.body;
        try {
            await db.connect();

            const doc = await Booking.findById(post);
            const copyLikes = doc.Likes;
            const newLikes = copyLikes.filter( like => like !== user );
            doc.Likes = newLikes;
            await doc.save();

            await db.disconnect();

            res.status(200).json({ message: 'like removed', newLikes: doc.Likes});
        } catch(err) {
            console.log(`Error: ${err.message}`);
            res.status(500).json({ message: 'error removing like'});
        }
    }
}

export default handler;