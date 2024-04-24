import mongoose from 'mongoose';

const productSchema=mongoose.Schema(
    {
        name:String,
        category:String,
        price:Number,
        image:String
    },{
        timestamps:true,
        versionKey:false
    }
);



export default mongoose.model('Product',productSchema);