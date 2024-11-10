import User from "@/models/User";
import bcryptjs from 'bcryptjs'
import db from "../../../utils/db";
async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(400).send({ message: `${req.method} not supported` });
  }

  const {newPassword, id}=req.body
  await db.connect();
  const updatePass= await User.findById(id)
  if (!updatePass) {
        await db.disconnect();
        return res.status(404).json({ message: 'User not found' });
      }
 const password= bcryptjs.hashSync(newPassword);
  const updatedUser = {...updatePass._doc, password}
  const savedUser = await User.findByIdAndUpdate(id, updatedUser, { new: true });
  await db.disconnect()
  console.log(savedUser)
  res.send({
    message: "password Updated",
  });

}

export default handler;