import { NextFunction, Request, Response } from "express";
import * as userServices from "../services/userServices";
import { ValidateResponse } from "../types/succes-response";

export async function emailValidate(req: Request, res: Response, next: NextFunction) {
  try {
    const email = req.body.email;
    const isValidate = await userServices.emailValidate(email);

    const response: ValidateResponse = {
      validate: isValidate,
      message: "success email validate",
    };
    res.json(response);
  } catch (error) {
    res.status(400).json(error);
  }
}
