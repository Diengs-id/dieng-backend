import { User } from "@prisma/client";

export interface ValidateEmailDTO {
  email: string;
}

export type RegisterDTO = Pick<User, "email" | "password"> & { name: string };
