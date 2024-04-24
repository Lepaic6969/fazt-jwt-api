import {Router} from 'express';
const router=Router();
import { createUser } from '../controllers/user.controller.js';
import {verifyToken,isAdmin} from '../middlewares/authToken.js';
import { checkRolesExisted } from '../middlewares/verifyRolesAdmin.js';

//Esta ruta es para que el admin pueda crear usuarios
router.post('/',[verifyToken,isAdmin,checkRolesExisted],createUser);













export default router;