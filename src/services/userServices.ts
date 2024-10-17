import * as UserRepositories from "../repositories/user";

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

// export const sendOTP = async (email : string) => {

// };
