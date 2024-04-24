import express from 'express';
import morgan from 'morgan';
import {config} from 'dotenv';
config();
import { connectToDB } from './helpers/mongoose.js';
import {createRoles} from './helpers/initialRoles.js';


//Importo mis rutas
import productRouter from '../src/routes/products.routes.js';
import authRouter from '../src/routes/auth.routes.js';
import userRouter from '../src/routes/user.routes.js';

const app=express();

//Utilizo algunos middlewares de terceros
app.use(morgan('dev'));
app.use(express.json());


//Me conecto a la base de datos
connectToDB();
//Genero los roles si es que aún no existen
createRoles();

//Arranco con mis rutas
app.get('/',(req,res)=>{
    res.json({message:'Proyecto JWT con Node y express',autor:'Juan Camilo'})
});
app.use('/products',productRouter);
app.use('/auth',authRouter);
app.use('/users',userRouter);


//Arranco mi servidor
app.listen(process.env.PORT,()=>{
    console.log(`Servidor escuchando en : http://localhost:3000`)
});

