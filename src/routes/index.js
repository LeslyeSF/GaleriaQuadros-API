import { Router } from 'express';
import dataRouter from './dataRouters.js';

const router = new Router();
router.use(dataRouter);
export default router;
