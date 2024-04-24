import mongoose from 'mongoose';

const roleSchema=mongoose.Schema(
    {
        name:String

    },{
        versionKey:false
    }
);



export default mongoose.model('Role',roleSchema);