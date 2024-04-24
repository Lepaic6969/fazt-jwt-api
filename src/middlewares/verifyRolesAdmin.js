//Este es un middleware para verificar si los roles que me envían si existen, este middleware sólo lo va a
//ejecutar la ruta de user, que es la que el admin usa para crear nuevos usuarios
import Role from '../models/role.model.js';

 export const checkRolesExisted=async(req,res,next)=>{
    const roleNames = (await Role.find()).map(rol=>rol.name);
    const {roles}=req.body;
    if(!roles){
        return res.status(400).json({message:'Usted es el admin, es su obligación definir los roles de los usuarios que crea'});
    }
   
    for(let i=0;i<roles.length;i++){
    //Si alguno de los roles que me envían no existe en nuestra api, termine todo y comunique al cliente del error
        if(!roleNames.includes(roles[i])){
            //400 -> Bad Request
            return res.status(400).json({message:`El rol ${roles[i]} no es válido`});
        }
    }

    next();
 }