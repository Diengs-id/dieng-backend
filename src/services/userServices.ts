import * as UserRepositories from "../repositories/user";
import otpGenerator from "otp-generator";

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

export const sendOTP = async (email: string) => {
  const otp = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  let now = new Date();
  now.setMinutes(now.getMinutes() + 5);
  const expired_at = new Date(now);

  const verificationCode = await UserRepositories.findVerificationCodeByEmail(email);

  let result = {};

  if (!verificationCode) {
    result = await UserRepositories.sendOTP({ email, expired_at, otp });
  } else {
    result = await UserRepositories.updateOTP({ email, expired_at, otp });
  }

  return result;
};
