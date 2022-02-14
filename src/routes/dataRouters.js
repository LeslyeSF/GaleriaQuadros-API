import express from 'express';
import { checkout, getData, insertData } from '../controllers/dataControllers.js';

const dataRouter = express.Router();

dataRouter.get('/data', getData);
dataRouter.post('/secretRouterInsertData', insertData);
dataRouter.post('/checkout', checkout);

export default dataRouter;
