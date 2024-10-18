import * as VerificationCodeRepositories from "../repositories/verificationCode";
import * as UserRepositories from "../repositories/user";
import otpGenerator from "otp-generator";
import { RegisterDTO } from "../dto/user-dto";
import bcrypt from "bcrypt";

export const emailValidate = async (email: string) => {
  const userInDatabase = await UserRepositories.findUserByEmail(email);

  if (userInDatabase === 1) {
    throw {
      status: 400,
      message: "email has been registered",
    };
  }

  return true;
};

export const emailVerifOTP = async ({ email, otp }: { email: string; otp: string }) => {
  const verifOTP = await VerificationCodeRepositories.findVerificationCodeOTP({ email, otp });

  if (!verifOTP || verifOTP.expired_at! < new Date()) {
    throw {
      status: 400,
      message: "OTP is invalid or has expired",
    };
  }

  return true;
};

export const sendOTP = async (email: string) => {
  const otp = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  let now = new Date();
  now.setMinutes(now.getMinutes() + 5);
  const expired_at = new Date(now);

  const verificationCode = await VerificationCodeRepositories.findVerificationCodeByEmail(email);

  let result = {};

  if (!verificationCode) {
    result = await VerificationCodeRepositories.sendOTP({ email, expired_at, otp });
  } else {
    result = await VerificationCodeRepositories.updateOTP({ email, expired_at, otp });
  }

  return result;
};

export const register = async (registerDTO: RegisterDTO) => {
  const hashedPassword = await bcrypt.hash(registerDTO.password!, 10);

  const createUser = await UserRepositories.registerUser({
    ...registerDTO,
    password: hashedPassword,
  });

  return createUser;
};
