import { RegisterDTO } from "../dto/user-dto";
import { prisma } from "../libs/prisma";

export const findUserByEmail = async (email: string) => {
  return await prisma.user.count({
    where: {
      email,
    },
  });
};

export const registerUser = async (registerDTO: RegisterDTO) => {
  return await prisma.user.create({
    data: {
      email: registerDTO.email,
      password: registerDTO.password,
      customer: {
        create: {
          customer_name: registerDTO.name,
        },
      },
    },
  });
};
