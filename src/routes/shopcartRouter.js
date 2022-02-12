import { Router } from 'express';
import * as shopcartController from '../controllers/shopcartController.js';

const router = new Router();

router.post('/shopcart/:id', shopcartController.postNewProductToCart);
router.get('/shopcart', shopcartController.postNewProductToCart);

export default router;
