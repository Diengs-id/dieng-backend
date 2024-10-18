import { prisma } from "../libs/prisma";
import { VerificationCode } from "@prisma/client";

export const findVerificationCodeByEmail = async (email: string) => {
  return await prisma.verificationCode.findUnique({
    where: {
      email,
    },
  });
};

export const findVerificationCodeOTP = async (data: Pick<VerificationCode, "otp" | "email">) => {
  return await prisma.verificationCode.findFirst({
    where: {
      email: data.email,
      otp: data.otp,
    },
  });
};

export const sendOTP = async (data: Pick<VerificationCode, "email" | "expired_at" | "otp">) => {
  return await prisma.verificationCode.create({
    data: {
      email: data.email,
      otp: data.otp,
      expired_at: data.expired_at,
      is_email_verified: false,
    },
  });
};

export const updateOTP = async (data: Pick<VerificationCode, "email" | "expired_at" | "otp">) => {
  return await prisma.verificationCode.update({
    where: {
      email: data.email,
    },
    data: {
      otp: data.otp,
      expired_at: data.expired_at,
      is_email_verified: false,
    },
  });
};
