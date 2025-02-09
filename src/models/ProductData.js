import mongoose from 'mongoose';

const productDataSchema = new mongoose.Schema( {
        name: { type:String, required:true },
        history: { type:Array, default:[]},
    }, {
        timestamps:true
    }
)

const ProductData = mongoose.models.ProductData || mongoose.model( 'ProductData', productDataSchema );

export default ProductData;
