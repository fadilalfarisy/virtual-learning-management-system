import Joi from "joi";

const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;

const registerSchema = Joi.object({
  fullName: Joi.string().trim().required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(5).regex(pattern).required().messages({
    "string.pattern.base":
      "Password must contain at least one character upper case, lower case, number, and special character",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().required(),
});

export { registerSchema, loginSchema };
