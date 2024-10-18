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

export async function sendOTP(req: Request, res: Response) {
  try {
    const email = req.body.email;
    const response = await userServices.sendOTP(email);
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function verifOTP(req: Request, res: Response) {
  try {
    const email = req.body.email;
    const otp = req.body.otp;
    const response = await userServices.emailVerifOTP({ email, otp });
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function register(req: Request, res: Response) {
  try {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    const createUser = await userServices.register({ email, name, password });
    res.json(createUser);
  } catch (error) {
    res.status(500).json(error);
  }
}
