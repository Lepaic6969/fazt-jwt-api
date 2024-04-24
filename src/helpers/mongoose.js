//Aquí se aloja la conección a Mongo Atlas
import mongoose from 'mongoose';
import {config} from 'dotenv'; //Para las variables de entorno
config();

//URL del Mongo Atlas, LA traigo desde las variables de entorno
const MONGODB_URI=process.env.MONGODB_URI;

export const connectToDB=async()=>{
    try{
        await mongoose.connect(MONGODB_URI);
        console.log('Mongo DB Connected')
    }catch(error){
        console.error(error);
    }
   
}