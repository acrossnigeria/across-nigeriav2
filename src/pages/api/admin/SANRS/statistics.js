import RegisteredSACreator from "@/models/RegisteredSACreator";
import db from "../../../../../utils/db";
import SkitAcrossNigeriaSkit from "@/models/SkitAcrossNigeriaSkit";
import { timeAgo } from "../../../../../utils/apiHelpers";
import SkitAcrossNigeriaVote from "@/models/SkitAcrossNigeriaVote";

const Handler = async (req, res) => {
    const nigeriaStates = [
        'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
        'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
        'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
        'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
    ];

    try {
        if ( req.method === "GET" ) {
            await db.connect();
            const registeredParticipants = await RegisteredSACreator.find().populate("user").lean();
            const totalVotes = (await SkitAcrossNigeriaVote.find().lean())?.length;

            const registeredParticipantsData = await Promise.all(registeredParticipants.map(async (participant) => {
                const hasUserSubmitted = await SkitAcrossNigeriaSkit.findOne({ user: participant?.user?._id });
                return {
                    id: participant?.user?._id,
                    fullname: `${participant?.user?.name} ${participant?.user?.surname}`,
                    dp: participant?.user?.profilePicture || null,
                    email: participant?.user?.email,
                    phone: participant?.user?.phone,
                    state: participant?.user?.residence,
                    createdAt: timeAgo(participant?.createdAt),
                    hasSubmitted: !!hasUserSubmitted,
                    skitId: hasUserSubmitted ? hasUserSubmitted?._id : null,
                };
            }));

            const stateDataPrototype = {
                'Abia':0, 'Adamawa':0, 'Akwa Ibom':0, 'Anambra':0, 'Bauchi':0, 'Bayelsa':0, 'Benue':0, 'Borno':0,
                'Cross River':0, 'Delta':0, 'Ebonyi':0, 'Edo':0, 'Ekiti':0, 'Enugu':0, 'FCT':0, 'Gombe':0, 'Imo':0,
                'Jigawa':0, 'Kaduna':0, 'Kano':0, 'Katsina':0, 'Kebbi':0, 'Kogi':0, 'Kwara':0, 'Lagos':0, 'Nasarawa':0,
                'Niger':0, 'Ogun':0, 'Ondo':0, 'Osun':0, 'Oyo':0, 'Plateau':0, 'Rivers':0, 'Sokoto':0, 'Taraba':0, 'Yobe':0, 'Zamfara':0
            };
            
            nigeriaStates.map( state => {
                registeredParticipantsData.map( user => { 
                    let isFromState = user.state === state;
                    if (isFromState) {
                        let oldVal = stateDataPrototype[state];
                        let newVal = oldVal+1;
                        stateDataPrototype[state] = newVal;
                    }
                } )
            })

            await db.disconnect();

            res.status(200).json( { message:"Success", registeredParticipants: registeredParticipantsData, stateData:Object.values(stateDataPrototype), totalVotes, totalSubmitted: registeredParticipantsData.filter(user => user.hasSubmitted).length } );
        } else {
            res.status(405).json({ error: "Method Not Allowed" });
        }
    } catch (error) {
        console.error("Error fetching statistics:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default Handler;