import Naijavibes from "@/models/Naijavibes";
import db from "../../../../utils/db";
const handler = async(req,res)=>{
    try{ 
        if (req.method==='GET'){
    const { fileType, subcategory } = req.query;
    console.log(fileType,subcategory)
    await db.connect();
    const photoVibes= await Naijavibes.find(
        {fileType:fileType,
      category: subcategory
    });
    await db.disconnect();

    // Send the found documents as a response
    res.status(200).json(photoVibes);}}
catch(error){
     console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}

}
    export default handler