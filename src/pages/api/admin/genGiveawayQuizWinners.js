import db from "../../../../utils/db";
import Quiz from "@/models/Quiz";

const Handler = async (req, res) => {
    if ( req.method==='GET' ) {

        const arr = [ 2, 7, 4, 1, 6 ];
        const sorted = [];
        for ( let i = 0; i<arr.length ; i++) {
            let a = arr[i];
            let b = arr[i+1];
            console.log(a, b)
        }


        const playersAndPlays = {}
        // await db.connect();
        // const plays = await Quiz.find( { correctAnswer: true } ).populate( { path:'userId', select: 'name surname _id phone residence' });
        // plays.map( (play) => {
        //     let isCreated = Object.values(playersAndPlays).some( innerObj => innerObj.userId === play.userId._id); // checks if player already exists in playersAndPlays
        //     if (isCreated) {
        //         playersAndPlays[play.userId._id].plays = playersAndPlays[play.userId._id].plays+1  // adds the number of plays
        //     } else {
        //         //creates an object for the player and adds it to playersAndPlays object
        //         playersAndPlays[play.userId._id] = {
        //             fullname: `${play.userId.name} ${play.userId.surname}`,
        //             email: play.email,
        //             phone: play.userId.phone,
        //             plays: 1,
        //             residence: play.userId.residence,
        //             userId: play.userId._id, 
        //         }
        //     }
        // })
        // console.log('plays:', playersAndPlays);
        res.status(200).json( { success: true  });
    } else {
        res.status(503).json( { error: 'Invalid method'} );
    }
    
}

export default Handler;