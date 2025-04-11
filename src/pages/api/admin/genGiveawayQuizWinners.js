import db from "../../../../utils/db";
import Quiz from "@/models/Quiz";
import GiveawayQuizWinners from "@/models/GiveawayQuizWinners";
import ProductData from "@/models/ProductData";

const Handler = async (req, res) => {
    const query = req.query;
    function convertToMonthYear(timestamp) {
        const date = new Date(timestamp);
        const options = { month: 'short' }; // e.g. 'Jan', 'Feb', etc.
        const month = new Intl.DateTimeFormat('en-US', options).format(date);
        const year = date.getFullYear();
        return `${month}${year}`;
      }

    if ( req.method==='GET' ) {
        if ( query.type === 'generateWinners' ) {
            const session = query.quizSession;
            console.log(session);
            console.log('generating winners');
            const arr = [0, 5, 18, 3, 9, 7]
            function bubbleSort(arr) {
                for (let i = 0; i < arr.length - 1; i++) {
                    for (let j = 0; j < arr.length - 1 - i; j++) {
                        //if the current element is less than the next element swap them
                        if ( arr[j].plays < arr[j + 1].plays ) {
                            //swap using a temparary variable
                            let temp = arr[j];
                            arr[j] = arr[j + 1];
                            arr[j + 1] = temp;
                        }
                    }
                }
                return arr;
            }

            let playersAndPlays = [];
            try {
                await db.connect();
                const plays = await Quiz.find( { correctAnswer: false } ).populate( { path:'userId', select: 'name surname _id phone residence bank bankAccNo bankName' });
                await db.disconnect();
                let dataStr = '';

                plays.map( (play) => {
                    const session = convertToMonthYear(play.createdAt);
                    console.log(session);
                    if (session === 'April2025' || session === 'Feb2025' || session === 'March2025') {
                        let objIndex ;
                        let isCreated = playersAndPlays.some( (innerObj, index ) => {
                                    if (innerObj?.userId === play?.userId?._id) {
                                        objIndex = index;
                                        return true
                                    } else return false;
                                }
                            ); // checks if player already exists in playersAndPlays
                        if (isCreated) {
                            playersAndPlays[objIndex].plays = playersAndPlays[objIndex].plays+1  // adds the number of plays
                        } else {
                            //creates an object for the player and adds it to playersAndPlays object
                            const detail = {
                                fullname: `${play?.userId?.name} ${play?.userId?.surname}`,
                                email: play?.email,
                                phone: play?.userId?.phone,
                                plays: 1,
                                residence: play?.userId?.residence,
                                userId: play?.userId?._id, 
                                bank: play?.userId?.bank,
                                bankAccNo: play?.userId?.bankAccNo, 
                                bankName: play?.userId?.bankName,
                            }
                            playersAndPlays.push(detail);
                        }
                    }

                });
                const winners = bubbleSort( playersAndPlays ).slice(0, 23); //sorts the players in descending order and selects 100 players from the top;
                winners.map( ( detail )=> {
                    dataStr = `${dataStr}, (${detail.fullname}, ${detail.email}, ${detail.residence}, ${detail.bankAccNo}, ${detail.bankName}, ${detail.bank})`;
                })
                console.log(dataStr);
                res.status(200).json( { success: true, winners  });
            } catch (err) {
                res.status(500).json( {error:err.message});
            }

        }  else if ( query.type === 'getWinners' ) {

            console.log(`getting saved users for${query?.quizSession}`);
            try {
                await db.connect();
                const data = await GiveawayQuizWinners.findOne( { quizSession: query?.quizSession });
                await db.disconnect();
                if (data) {
                    res.status(200).json( { available: true, winners: data});
                } else {
                    res.status(200).json( { available: false, winners: data});
                }
            } catch(err) {
                res.status(500).json( { error: 'something went wrong while getting data'})
            }
        }
        else if ( query.type === 'getHistory' ) {
            try {
                await db.connect();
                const data = await ProductData.findOne( { name: 'giveawayQuiz' } );
                let history;
                if (data) {
                    history = data.history;
                } else {
                    await ProductData.create( { name:'giveawayQuiz' } );
                    history = [];
                }
                await db.disconnect();
                res.status(200).json( { history });
            } catch (err) {
                res.status(500).json( { error: 'something went wrong while getting data'})  
            }
        }
        
    }
    else if ( req.method === 'POST' ) {
        const data = req.body;
        if ( query.type === 'saveWinners' ) {
            try {
                await db.connect();
                const isSaved = await GiveawayQuizWinners.create( data );
                await db.disconnect();
                if ( isSaved ) {
                    console.log('saved data successfully')
                    res.status(200).json( { success: true });
                } else {
                    res.status(400).json( { error: 'Something went wrong when saving data'});
                }
            } catch(err) {
                res.status(400).json( { error: 'Something went wrong when saving data'});     
            }           
        }
 
    }
    else {
        res.status(503).json( { error: 'Invalid method'} );
    }
    
}

export default Handler;