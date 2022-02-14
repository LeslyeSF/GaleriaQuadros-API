import express from 'express';
import { checkout, getData, insertData } from '../controllers/dataControllers.js';
import { orderValidationMiddleware } from '../middlewares/orderValidationMiddleware.js';

const dataRouter = express.Router();

dataRouter.get('/data', getData);
dataRouter.post('/secretRouterInsertData', insertData);
dataRouter.post('/checkout', orderValidationMiddleware, checkout);

export default dataRouter;
