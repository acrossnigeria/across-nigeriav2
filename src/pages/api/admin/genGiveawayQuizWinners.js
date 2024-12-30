import { Elsie_Swash_Caps } from "next/font/google";
import db from "../../../../utils/db";
import Quiz from "@/models/Quiz";

const Handler = async (req, res) => {
    if ( req.method==='GET' ) {
        let counter = 0
        await db.connect();
        const plays = await Quiz.find();
        plays.map( async (play) => {
            play.correctAnswer = true;
            await play.save();
            counter++;
            console.log(`play ${counter} modified and saved`);
        })
        console.log('plays:', plays);
        res.status(200).json( { success: true  });
    } else {
        res.status(503).json( { error: 'Invalid method'} );
    }
    
}

export default Handler;