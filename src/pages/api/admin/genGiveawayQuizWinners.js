import db from "../../../../utils/db";
import Quiz from "@/models/Quiz";

const Handler = async (req, res) => {
    if ( req.method==='GET' ) { 
        const arr = [0, 5, 18, 3, 9, 7]
        function bubbleSort(arr) {
            for (let i = 0; i < arr.length - 1; i++) {
                for (let j = 0; j < arr.length - 1 - i; j++) {
                    //if the current element is less than the next element swap them
                    if ( arr[j].plays < arr[j + 1].plays ) {
                        //swap using a temparary variable
                        let temp = arr[j].plays;
                        arr[j].plays = arr[j + 1].plays;
                        arr[j + 1].plays = temp;
                    }
                }
            }
            return arr;
        }

        let playersAndPlays = [];
        try {
            await db.connect();
            const plays = await Quiz.find( { correctAnswer: true } ).populate( { path:'userId', select: 'name surname _id phone residence' });
            await db.disconnect();

            plays.map( (play) => {
                let objIndex ;
                let isCreated = playersAndPlays.some( (innerObj, index ) => {
                    if (innerObj.userId === play.userId._id) {
                        objIndex = index;
                        return true
                    } else return false;
                }
            ); // checks if player already exists in playersAndPlays
                if (isCreated) {
                    playersAndPlays[objIndex].plays = playersAndPlays[objIndex].plays+1  // adds the number of plays
                } else {
                    //creates an object for the player and adds it to playersAndPlays object
                    playersAndPlays.push( {
                        fullname: `${play.userId.name} ${play.userId.surname}`,
                        email: play.email,
                        phone: play.userId.phone,
                        plays: 1,
                        residence: play.userId.residence,
                        userId: play.userId._id, 
                    })
                }
            });
            const winners = bubbleSort( playersAndPlays ).slice(0, 100);
            res.status(200).json( { success: true, winners  });
        } catch (err) {
            res.status(500).json( {error:'error occured getting data'})
        }
        
    } else {
        res.status(503).json( { error: 'Invalid method'} );
    }
    
}

export default Handler;