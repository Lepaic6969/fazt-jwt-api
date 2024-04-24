import {Router} from 'express';
const router=Router();
import {signin,signup} from '../controllers/auth.controller.js';


router.post('/signup',signup);
router.post('/signin',signin);




export default router;