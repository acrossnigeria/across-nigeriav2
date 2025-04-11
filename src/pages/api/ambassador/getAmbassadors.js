import db from "../../../../utils/db";
import Ambassador from "@/models/Ambassador";
import ProductData from "@/models/ProductData";
import User from "@/models/User";

const Handler = async ( req, res ) => {
    res.setHeader("Cache-Control", "no-store, no cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    //bubble sorting function
    function bubbleSort(arr) {
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - 1 - i; j++) {
                //if the current element is less than the next element swap them
                if ( arr[j].refs < arr[j + 1].refs ) {
                    //swap using a temparary variable
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        return arr;
    }

    if ( req.method === 'PATCH' ) {
        try {
            await db.connect();
            const ambassadors = await Ambassador.find().populate('user', 'name phone surname email references refCode');
            let list = [];
            let screeningList = [];
            ambassadors.map( ambassador => {
                let data = { 
                    refs:ambassador?.user?.references,
                    fullname:`${ambassador?.user?.name} ${ambassador?.user?.surname}`,
                    userId:ambassador?.user?._id,
                    status:ambassador?.currentStatus,
                    city:ambassador?.city,
                    orgName:ambassador?.orgName,
                    residence:ambassador?.state,
                    email:ambassador?.user?.email,
                    phone:ambassador?.user?.phone,
                }
                screeningList.push(data);
            })

            // check the list to make sure all ambassadors have more than on ref
            list = bubbleSort(screeningList);
            list = list.slice(0, 5);
            const history = [];
            list.map( user => {
                if ( user.refs >= 1 ) {
                    history.push(user);
                }
            })

            // save refresh top ambassadors data
            let newDoc = await ProductData.findOne( { name:'topAmbassadorsFeb'} ); //check for a history for top ambassadors for a certin month
            if ( newDoc ) {
                newDoc.history = history;
                await newDoc.save();
            } else {
                newDoc = await ProductData.create( { name:'topAmbassadorsFeb', history })
            }
            await db.disconnect();
            res.status(200).json( { success:true, list:newDoc.history } );
        } catch(err) {
            console.log(err.message);
            res.status(500).json( { success: false, error:err.message } );
        }
    } else if ( req.method === 'GET') {
        const user = req.query.user;
        try {
            await db.connect();
            const response = await ProductData.findOne( { name: 'topAmbassadorsFeb'} );
            let isAmbassador;
            let refs;
            if (user) {
                const userData = await Ambassador.find( { user:user } ).populate('user');
                isAmbassador = userData[0]?.user? true:false;
                refs = userData[0]?.user?userData[0]?.user.references:0;
            } else {
                isAmbassador = false;
                refs = 0;
            }
            await db.disconnect();
            const list = response?response:{ history:[] };
            res.status(200).json( { success:true, list:list.history, isAmbassador, refs } );
        } catch(err) {
            console.log(err.message);
            res.status(500).json( { success: false, error:err.message } );
        }
    }
}

export default Handler;