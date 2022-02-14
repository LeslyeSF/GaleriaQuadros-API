import { Router } from 'express';
import * as shopcartController from '../controllers/shopcartController.js';
import { auth } from '../middlewares/auth.js';

const router = new Router();

router.post('/shopcart/:id', auth, shopcartController.postNewProductToCart);
router.get('/shopcart', auth, shopcartController.getProductsInShoppingCart);
router.delete('/shopcart/:id', auth, shopcartController.removeProductsFromShoppingCart);

export default router;
