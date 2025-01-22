import db from "../../../../utils/db";
import User from "@/models/User";

const Handler = async (req, res) => {
    if (req.method === 'POST') {
        const { currentStatus, isWillingToJoinMeet, orgName, city, why, state, termsAgree } = req.body;

    } 
}

export default Handler;