import User from '../models/user.model.js';
import Role from '../models/role.model.js';
import jwt from 'jsonwebtoken';
import {config} from 'dotenv';
config();
//Importo los métodos de encriptar contraseñas y comparar contraseñas
import {encryptPassword,comparePassword} from '../helpers/encript.js';


export const signup=async(req,res)=>{
    const {username,email,password,roles}=req?.body;

    //Valido que me hayan enviado los campos que son obligatorios
    if(!username || !email || !password){
        //400 -> Bad request
        return res.status(400).json({message:'Es obligatorio enviar los campos "username", "email" y "password"'});
    }
    
    try{
    //Aquí debo verificar primero si el usuario ya existe...
        const userFound=await User.findOne({username,email});
        if(userFound){
            //409 -> Conflict
            return res.status(409).json({message:'¡El usuario ya existe!'});
        }
    //Si no existe el usuario pues lo agrego
        const user=new User(
            {
                username,
                email,
                password:await encryptPassword(password)
            }
        );
        
        if(roles){
            let foundRoles=await Role.find({name: {$in:roles}}); //Busca los documentos de la colección Role,
                                            //cuyo nombre coincida con alguno de los nombres del arreglo 'roles'.
            foundRoles= foundRoles.map(role=>role._id); //Dejo sólo los id

            (foundRoles.length>0)?user.roles=foundRoles:
                user.roles=await Role.findOne({name:'user'});
        }else{
            const role=await Role.findOne({name:'user'})
            user.roles=[role._id];
        }

        const newUser=await user.save();

        //Creamos el token...
        const token=jwt.sign({id:newUser._id},process.env.SECRET_JWT,{
            expiresIn:86400 //Este token expira en un día
        });
        //201 -> Created
        res.status(201).json({token});
    }catch(error){
        //500 -> Error interno del servidor
        res.status(500).json({message:error.message});
    }

}
export const signin=async(req,res)=>{
    //Primero debo verificar si me han enviado el email y el password
    const {email,password}=req.body;
    if(!email || !password){
        //401 -> Bad Request
        return res.status(400).json({message:'Debe enviar el email y la contraseña, estos campos son obligatorios.'})
    }
    try{
            //Verifico si el usuario existe
        const userFound=await User.findOne({email});
            //409 -> Conflict
        if(!userFound) return res.status(409).json({message:'El usuario no existe'});

        //Verifico la contraseña
        const matchPassword=await comparePassword(password,userFound.password);
            //401 -> Sin Autorización
        if(!matchPassword) return res.status(401).json({message:'Contaseña incorrecta'});

        //Si llega hasta aquí todo está bien y debo generar el token...
        const token=jwt.sign({id:userFound._id},process.env.SECRET_JWT,{
            expiresIn:86400 //Para que el token dure todo un día
        });
        res.json({token});
    }catch(error){
        //500 -> Error interno del servidor
        res.status(500).json({message:error.message})
    }
    
}