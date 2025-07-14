import mongoose from "mongoose";
import db from "../../../../utils/db";
import SquidGameQuizData from "@/models/SGQuizData";
import { Phone } from "lucide-react";
import User from "@/models/User";

const { default: SquidGameParticipant } = require("@/models/SquidGameParticipant");

const Handler = async ( req, res ) => {

    // function that returns number of occurrence of a value in an array
    const countOccurrence = (arr, value) => {
        const occurrence = arr.reduce( (count, item) => item === value ? count + 1 : count, 0 );
        return occurrence;
    }

    function bubbleSort(arr) {
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - 1 - i; j++) {
                //if the current element is less than the next element swap them
                if ( arr[j].timeCount > arr[j + 1].timeCount ) {
                    //swap using a temparary variable
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        return arr;
    }

    try {
        if ( req.method === "GET" ) {
            const { userId, isVerification } = req.query;
            await db.connect();
            const participant = await SquidGameParticipant.findOne( { player:new mongoose.Types.ObjectId(userId) }).populate( "player", 'name phone surname email references refCode');
            const entryCode = participant ? participant?.entryCode : "NONE_USER";
            let hasParticipated = false;
            if ( entryCode ) {
                const hasUserSubmitted = await SquidGameQuizData.findOne( { entryCode:entryCode });
                hasParticipated = hasUserSubmitted ? true : false;
            }
            await db.disconnect();  
            let userData;
            if ( participant ) {
                if ( isVerification === true || isVerification === 'true' ) {
                    userData = { isQualified:participant?.isQualified, entryCode, hasParticipated };
                } else {
                    userData = { ...participant?.player, isQualified:participant?.isQualified, entryCode, hasParticipated}
                }
            } else {
                userData = { isQualified:false }
            }

            res.status(200).json( { userData } );
        } else if ( req.method === "PATCH" ) {
            await db.connect();
            const quizData = await SquidGameQuizData.find();
            const data = await Promise.all(
            quizData.map(async ({ entryCode, mark, user, timeCount }) => {
                if (countOccurrence(mark, true) > 3) {
                const userData = await User.findOne({ _id: user });
                const docData = { entryCode, phone: userData?.phone, timeCount:Number(timeCount) };
                return docData;
                }
                return null; // mark non-matching entries as null
            })
            );

            // Filter out null values
            const filteredData = data.filter(Boolean);

            // Sort the filtered data (you must define bubbleSort to work with it)
            const sortedData = bubbleSort(filteredData)?.splice(0, 20)
            console.log(sortedData)
            console.log(`${sortedData.length} docs got more than 2 questions correct`);
            await db.disconnect();

            res.status(200).json( { sortedData, length:sortedData.length });

        } else if ( req.method === "POST" ) {

            const { entryCode, userId, mark, timeCount } = req.body;

            await db.connect();
            await SquidGameQuizData.create( { entryCode, user:userId, mark, timeCount } );
            await db.disconnect();

            res.status(200).json( { message:"Quiz data submitted successfully", entryCode, } );

        } else {
            res.status(403).json( { error:"INVALID_METHOD", errorMessage:"method not allowed"})
        }
    } catch (err) {
        res.status(500).json( { error:"SERVER_ERROR", errorMessage:err?.message } );
    }

}

export default Handler;