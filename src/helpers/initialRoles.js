//Este archivo es el encargado de crear los roles de mi aplicación una vez cargue la misma...
import Role from '../models/role.model.js';

export const createRoles=async()=>{
    try{
        const count=await Role.estimatedDocumentCount();
        if(count>0) return; //Si ya hay roles deje quieto todo
        
        //Si no hay roles en la base de datos, los crea
        const roles=await Promise.all([
            new Role({name:'user'}).save(),
            new Role({name:'moderator'}).save(),
            new Role({name:'admin'}).save()
        ]);
        console.log(roles);
    }catch(error){
        console.log(error);
    }





}