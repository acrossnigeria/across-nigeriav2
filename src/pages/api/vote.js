import Skits from "@/models/Skits";
import db from "../../../utils/db";
import SkitsVotes from "@/models/Votes";
const handler =async(req,res)=>{
    const data=req.body;
    console.log(data)
    const {id, amount}=data;
    await db.connect();
    const skits= await Skits.findById(id);
    const voting=skits.votes;
    const votes=voting+amount;
    skits.votes=votes;
    await skits.save();
    console.log("number of votes is:", skits.votes)
    const newVotes= await new SkitsVotes({skitId:id, votes:amount})
    const vote= await newVotes.save();
    await db.disconnect();
    res.send( vote);
};
export default handler;