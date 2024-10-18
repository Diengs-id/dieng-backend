import { Router } from "express";
import * as userController from "../controllers/user";

const usersRouter = Router();

usersRouter.post("/email-validate", userController.emailValidate);
usersRouter.post("/email-send-otp", userController.sendOTP);
usersRouter.post("/email-verif-otp", userController.verifOTP);
usersRouter.post("/register", userController.register);

export default usersRouter;
