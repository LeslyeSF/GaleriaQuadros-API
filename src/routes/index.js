import { Router } from 'express';
import productRouter from './productRouter.js';
import shopcartRouter from './shopcartRouter.js';

const router = new Router();

router.use(productRouter);
router.use(shopcartRouter);

export default router;
