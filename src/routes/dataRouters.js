import express from "express";
import { getData, insertData } from "../controllers/dataControllers.js";

const dataRouter = express.Router();

dataRouter.get("/data", getData);
dataRouter.post("/secretRouterInsertData", insertData);

export default dataRouter;