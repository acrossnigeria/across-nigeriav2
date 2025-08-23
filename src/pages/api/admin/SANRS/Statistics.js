import RegisteredSACreator from "@/models/RegisteredSACreator";
import db from "../../../../../utils/db";
import SkitAcrossNigeriaSkit from "@/models/SkitAcrossNigeriaSkit";

const Handler = async (req, res) => {
    try {
        if ( req.method === "GET" ) {
            await db.connect();
            const registeredParticipants = await RegisteredSACreator.find().populate("user");

            const formattedData = await Promise.all(registeredParticipants.map(async (participant) => {
                const hasUserSubmitted = await SkitAcrossNigeriaSkit.findOne({ user: participant.user._id });
                return {
                    id: participant.user._id,
                    name: participant.user.name,
                    createdAt: participant.createdAt,
                    hasSubmitted: !!hasUserSubmitted
                };
            }));

            res.status(200).json(formattedData);
        } else {
            res.status(405).json({ error: "Method Not Allowed" });
        }
    } catch (error) {
        console.error("Error fetching statistics:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default Handler;