import mongoose from "mongoose";

const userSecretSchema = new mongoose.Schema({
    email: { required: true, type: String },
    secret: { required: true, type: String }
    },
    {
        timestamps:true,
    }
)

const UserSecret = mongoose.models.UserSecret || mongoose.model('UserSecret', userSecretSchema );

export default UserSecret;