import { Router } from "express";
import * as userController from "../controllers/user";

const usersRouter = Router();

usersRouter.post("/email-validate", userController.emailValidate);
usersRouter.post("/email-send-otp");

export default usersRouter;
