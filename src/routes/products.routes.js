import {Router} from 'express';
const router=Router();
import { getProducts,getProductById,createProduct,updateProduct,deleteProduct} from '../controllers/products.controller.js';
import {verifyToken,isModerator,isAdmin} from '../middlewares/authToken.js';

router.get('/',getProducts);
router.get('/:id',getProductById);

//Estas rutas como modifican la base de datos son las que deben ser protegidas...
router.post('/',[verifyToken,isModerator],createProduct);
router.put('/:id',[verifyToken,isAdmin],updateProduct);
router.delete('/:id',[verifyToken,isAdmin],deleteProduct);













export default router;