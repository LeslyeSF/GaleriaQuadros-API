import { Router } from 'express';
import authRouter from './authRouter.js';

const router = new Router();
router.use(authRouter);

export default router;
