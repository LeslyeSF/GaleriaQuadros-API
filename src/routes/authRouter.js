import { Router } from "express";
import { logIn, signUp } from "../controllers/authController.js";
import { logInValidationMiddleware } from "../middlewares/auth.js";
import { userValidationMiddleware } from "../middlewares/user.js";

const authRouter = Router();
authRouter.post("/signup", userValidationMiddleware, signUp);
authRouter.post("/login", logInValidationMiddleware, logIn);
export default authRouter;