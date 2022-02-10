import { Router } from 'express';
import * as shopcartController from '../controllers/shopcartController.js';

const router = new Router();

router.post('/addtocart/:id', shopcartController.postNewProductToCart);

export default router;
