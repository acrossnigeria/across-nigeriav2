import db from "../../../utils/db";
import Notification from "@/models/Notification";

const Handler = async (req, res) => {
    const { type, userId} = req.query;

    if (req.method === 'GET') {
       if ( type === 'size' ) {
         try {
            await db.connect();
            const notificationSize = (await Notification.find( { user: userId })).length;
            await db.disconnect();
            const sizeAndTimestamp = { unread: notificationSize, timestamp: Date.now()/1000 };
            res.status(200).json(sizeAndTimestamp);
         } catch (err) {
            res.status(500).json( { error: err } );
         }
       }
    } else {
        res.status(500).json( { error: 'Invalid method'});
    }
}

export default Handler;