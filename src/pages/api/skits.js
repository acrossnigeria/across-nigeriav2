import Skits from "@/models/Skits";
import db from "../../../utils/db";

export default async function handler(req, res) {
    try {
        if (req.method !== 'POST') {
            return res.status(400).send('Bad Request!');
        }

        const {name, title, userId, email, url, description, referencePay, payment } = req.body;

        await db.connect();
        const newSkit = new Skits({
            name,
            title,
            userId,
            email,
            url,
            description,
            referencePay,payment});
        const skit = await newSkit.save();
        await db.disconnect();
        res.status(201).send({
            message: "Congratulations, your Skit has been uploaded!",id:skit._id
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
}
