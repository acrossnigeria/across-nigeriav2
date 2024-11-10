import User from "../../models/User";
import db from '../../../utils/db';
import { getToken } from 'next-auth/jwt';

const handler = async (req, res) => {
     const user = await getToken({ req });
     console.log(req.query.reg);
     await db.connect();
  if (!user) { 
    return res.status(401).send({ message: 'signin required' });
  }

  const{reference, transaction}=req.body;
   const transact=reference+transaction; 
 
    if (req.method === 'POST') {


    try{ 
         
        const updateUser= await User.findById(user._id)
        updateUser.regPayment=true;
        updateUser.referencePay=transact;
        await updateUser.save();  
        await db.disconnect();   
        return res.status(200).json({ message: 'User updated successfully', updateUser });
   
       } 
       
        catch(error) {
      res.status(500).json({ error: 'Failed to Update new Date' });}
};
}
export default handler 