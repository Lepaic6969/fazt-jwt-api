//Este archivo tiene métodos que se encargan de verificar el token y los roles para dar permisos
// hacia las rutas de la api.
import jwt from 'jsonwebtoken';
import {config} from 'dotenv';
config();
import User from '../models/user.model.js';
import Role from '../models/role.model.js';

export const verifyToken=async(req,res,next)=>{
    const token=req.headers['x-access-token'];

    //403 -> Forbidden(Prohibido)
    if(!token) return res.status(403).json({message:'No envió el token.'})
    try{
            //Si me ha enviado el token debo verificarlo
        const decoded=jwt.verify(token,process.env.SECRET_JWT); //Este me decodifica el id con el que había armado el token
        const user=await User.findById(decoded.id,{password:0}); //Para que no me traiga la contraseña
        //404 -> Not Found
        if(!user) return res.status(404).json({message:'El token no es válido, el usuario no existe.'});

        req.userId=decoded.id; //Guardamos el id del usuario para poder usarlo en los siguientes middlewares
        next();
    }catch(error){
        //500 -> Error interno del servidor
        res.status(500).json({message:error.message});
    }    
}

export const isModerator=async(req,res,next)=>{
    const user=await User.findById(req.userId);
    const roles=await Role.find({_id:{$in:user.roles}}); //Busca todos los documentos de la colección Role
                        //Que coincidan con los elementos del arreglo de ids de roles del usuario encontrado.
    for(let i=0;i<roles.length;i++){
        if(roles[i].name==='moderator'){
            return next();
        }
    }

    //Si llega hasta aquí quiere decir que no es un moderador
    //401 -> No autorizado
    res.status(401).json({message:'Esta acción sólo la puede realizar un moderador.'});



}
export const isAdmin=async(req,res,next)=>{
    const user=await User.findById(req.userId);
    const roles=await Role.find({_id:{$in:user.roles}}); //Busca todos los documentos de la colección Role
                        //Que coincidan con los elementos del arreglo de ids de roles del usuario encontrado.
    for(let i=0;i<roles.length;i++){
        if(roles[i].name==='admin'){
            return next();
        }
    }

    //Si llega hasta aquí quiere decir que no es un admin
    //401 -> No autorizado
    res.status(401).json({message:'Esta acción sólo la puede realizar un admin.'});

}