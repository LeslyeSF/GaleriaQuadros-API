import { Router } from 'express';
import * as productController from '../controllers/productController.js';

const router = new Router();

router.get('/products/:id', productController.getProductById);

export default router;
