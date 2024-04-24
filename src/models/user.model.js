import mongoose from 'mongoose';

const userSchema=mongoose.Schema(
    {
        username:{
            type:String,
            unique:true
        },
        email:{
            type:String,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        roles:[ //Roles es un arreglo con ides.
            {   
                type:mongoose.Schema.Types.ObjectId
            }
        ]

    },{
        timestamps:true,
        versionKey:false
    }
);



export default mongoose.model('User',userSchema);