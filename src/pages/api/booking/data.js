import db from "../../../../utils/db";
import Booking from "@/models/Booking";

const handler = async (req, res) => {
    if (req.method==='GET') {
        const { type } = req.query;
        try {
            await db.connect();
            const bookingsData = await Booking.find({ category: type });
            await db.disconnect();
            res.status(200).json(bookingsData);
        } catch (err) {
           console.log(`Error: ${err.message}`);
            res.status(500).json( { message: 'error retreiving data'});
        }
    }
}

export default handler;