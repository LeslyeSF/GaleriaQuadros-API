import { Router } from 'express';
import * as shopcartController from '../controllers/shopcartController.js';
import { verifyTokenMiddleware } from '../middlewares/verifyTokenMiddleware.js';

const router = new Router();

router.post('/shopcart/:id', verifyTokenMiddleware, shopcartController.postNewProductToCart);
router.get('/shopcart', verifyTokenMiddleware, shopcartController.getProductsInShoppingCart);
router.delete('/shopcart/:id', shopcartController.removeProductsFromShoppingCart);

export default router;
