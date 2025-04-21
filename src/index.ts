import { Router } from "express";
import usersRouter from "./router/users";

const router = Router();

router.get("/", (req, res) => {
  res.send("WELCOME TO ROOT ROUTER DIENGS EXPRESS APP");
});

router.use("/users", usersRouter);

export default router;
