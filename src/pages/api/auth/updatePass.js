import User from "@/models/User";
import bcryptjs from 'bcryptjs'
import db from "../../../../utils/db";


async function handler(req, res) {

  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  };

  const { newPassword, id } = req.body;

  try {
    await db.connect();
    const updatePass = await User.findById(id)
    if (!updatePass) {
      await db.disconnect();
      return res.status(404).json({ message: 'User not found' });
    }

    const password = bcryptjs.hashSync(newPassword);
    const updatedUser = {...updatePass._doc, password, resetCode:null, resetCodeUrl: null };
    const savedUser = await User.findByIdAndUpdate(id, updatedUser, { new: true });
    console.log(savedUser);

    if (!savedUser) {
      await db.disconnect();
      return res.status(500).json({ message: 'Error updating password' });
    }
    await db.disconnect()

    res.send({ message: "password Updated", success: true });
  } catch (error) {

    await db.disconnect();
    res.status(500).json( { success:false, error:error.message || 'Internal Server Error' } );

  }

}

export default handler;