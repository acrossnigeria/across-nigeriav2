import db from "../../../../utils/db";
import TheaterSkit from "@/models/TheaterSkit";

const Handler = async ( req, res) => {
    try {
        if (req.method === "GET") {

        } else if ( req.method === "POST" ) {

        } else {
            res.status(403).json( { success:false, error:"Invalid method"})
        }
    } catch(err) {
        res.status(500).json( { success:false, error:err.message } );
    };
};

export default Handler;