import Joi from "joi";

export const emailValidateSchema = Joi.object({
  email: Joi.string().email().required(),
});
