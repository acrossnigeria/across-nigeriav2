import db from "../../../utils/db";
import User from "@/models/User";

const Handler = async (req, res) => {
    try {
        await db.connect();
        await User.updateMany({}, { '$set': { referredBy: 'none'}})
        .then( ()=> console.log('Users updated'))
        .catch( (err) => console.error(err));
        const users = await User.find({ referredBy: 'none'});
        console.log(users);
        res.status(200).json(users)
        await db.disconnect();
    } catch(err) {
        console.log(err.message);
    }
}

export default Handler;