import Joi from "joi";
import { registerSchema } from "./auth.js";

const roleEnum = {
  admin: "ADMIN",
  contributor: "CONTRIBUTOR",
};

const createUserSchema = registerSchema.keys({
  role: Joi.string().valid(...Object.values(roleEnum)),
});

const updateUserSchema = createUserSchema
  .fork(["password"], (schema) => schema.optional().allow(""))
  .keys({
    status: Joi.boolean().required(),
  });

export { createUserSchema, updateUserSchema };
