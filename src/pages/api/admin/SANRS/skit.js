import SkitAcrossNigeriaSkit from "@/models/SkitAcrossNigeriaSkit";
import { timeAgo } from "../../../../../utils/apiHelpers";

const Handler = async (req, res) => {
    const { method } = req;

    try {
        if ( req.method === "GET" ) {
            const skit = await SkitAcrossNigeriaSkit.findById(req.query.id);
            const voteDocs = await SkitAcrossNigeriaSkit.find( { skitId: req.query.id });
            if (!skit) {
                return res.status(404).json({ error: "Skit not found" });
            }
            let votes = 0
            voteDocs.forEach(doc => {
                votes += doc.votes;
            });

            const skitData = {
                title: skit.title,
                votes: votes,
                createdAt: timeAgo(skit.createdAt),
                skitUrl: skit.skitUrl,
                phase:'Not set'
            };
            res.status(200).json({ skitData });
        } else {
            res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (err) {
        console.error("Error fetching skit data:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default Handler;
