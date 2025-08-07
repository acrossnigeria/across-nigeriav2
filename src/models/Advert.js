import mongoose from "mongoose";

const advertSchema = new mongoose.Schema({
    user: { type:mongoose.Schema.Types.ObjectId, required:true, ref:'User'},
    startDate: { type:String, required:true },
    expiryDate: { type:String, required:true },
    advertImage: { type:String, required:true },
    advertTypeName: { type:String, required:true },
    displayMode: { type:String, required:true },
    contactUsButton: { type:Object, required:true },
    billingType: { type:String, required:true },
    paymentRef: { type:String, required:true },
    }, {
        timestamps:true
    }
)

const Advert = mongoose.models.Advert || mongoose.model("Advert", advertSchema);

export default Advert;