import { prisma } from "../libs/prisma";
import { VerificationCode } from "@prisma/client";

export const findUserByEmail = async (email: string) => {
  return await prisma.user.count({
    where: {
      email,
    },
  });
};

export const sendOTP = async (data: VerificationCode) => {
  return await prisma.verificationCode.create({
    data: {
      email: data.email,
      otp: data.otp,
      expired_at: data.expired_at,
      is_email_verified: data.is_email_verified,
    },
  });
};

export const updateOTP = async (data: VerificationCode) => {
  return await prisma.verificationCode.update({
    where: {
      email: data.email,
    },
    data: {
      otp: data.otp,
      expired_at: data.expired_at,
      is_email_verified: data.is_email_verified,
    },
  });
};
