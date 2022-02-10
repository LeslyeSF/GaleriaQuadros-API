import { Router } from 'express';
import productRouter from './productRouter.js';
import shopcartRouter from './shopcartRouter.js';
import authRouter from './authRouter.js';

const router = new Router();

router.use(authRouter);
router.use(productRouter);
router.use(shopcartRouter);

export default router;