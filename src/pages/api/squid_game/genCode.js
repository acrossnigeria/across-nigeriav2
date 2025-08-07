import SquidGameParticipant from "@/models/SquidGameParticipant";
import db from "../../../../utils/db";

const Handler = async ( req, res ) => {
    const generateRandomStr = () => {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let code = '';
        for ( let i = 0; i< 6; i++ ) {
            const randomIndex = Math.floor(Math.random() * letters.length);
            code += letters[randomIndex];
        }
        return code;
    }

    try {
        if ( req.method === "GET" ) {
            // const generatedCodes = [];
            // for ( let i = 1; i<1001; i++ ) {
            //     const randomStr = generateRandomStr();
            //     const indexLength = i.toString().length;
            //     let indexZeros = '';
            //     for ( let j = 0; j < 4-indexLength; j++ ) {
            //         indexZeros += "0";
            //     }
            //     const index = indexZeros + i;
            //     const code = 'SQ' + randomStr + index;
            //     generatedCodes.push( { entryCode:code, isCodeUsed:false } );
            // }
            // await db.connect();
            // const createdCodeDocs = await SquidGameParticipant.insertMany( generatedCodes );
            // console.log(createdCodeDocs);

            await db.connect();
            const modifiedDocs = await SquidGameParticipant.updateMany( {}, { $set: { isQualified:false } } );
            console.log(modifiedDocs)

            res.status(200).json( { success:true, modifiedDocs,  } );
        }
    } catch (err) {
        res.status(500).json( { success:false, error:err.message } );
    };
}

export default Handler;