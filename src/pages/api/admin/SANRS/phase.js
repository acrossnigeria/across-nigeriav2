import SANRS_Winner from "@/models/SANRS_Winner";
import db from "../../../../../utils/db";
import SANRS_Phase from "@/models/SANRS_Phase";

const Handler = async (req, res) => {

    try {
        if (req.method === "GET") {

            await db.connect();

            const phases = await SANRS_Phase.find();
            const phaseData = phases.length > 0 ? await Promise.all(
                phases.map(async (phase) => {
                    const phaseId = phase._id;
                    const topSkits = await SANRS_Winner.find({ phase: phaseId }).sort({ votes: -1 }).limit(2).populate("user skitAcrossNigeriaSkit");

                    const phaseObj = {
                        id: phase._id,
                        month: phase.month,
                        startDate: phase.startDate,
                        endDate: phase.endDate,
                        status: phase.status,
                        upload_enabled: phase.upload_enabled,
                        voting_enabled: phase.voting_enabled,
                        winners_published: phase.winners_published,
                        topSkits: topSkits?.length > 0 ? topSkits.map((skit) => ({
                            id: skit._id,
                            skitId: skit?.skit._id,
                            user: skit.user,
                            position: skit.position,
                            votes: skit.votes,
                        })) : [],
                    };
                    return phaseObj;
                })
            ) : [];

            console.log(phaseData);

            await db.disconnect();

            res.status(200).json(phaseData);
        } else if (req.method === "POST") {
            const newPhase = new SANRS_Phase(req.body);
            await newPhase.save();
            res.status(201).json(newPhase);
        } else {
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }



};

export default Handler;
