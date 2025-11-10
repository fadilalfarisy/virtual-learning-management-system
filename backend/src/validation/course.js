import Joi from "joi";
import { idValidation } from "./id.js";

const courseSchema = Joi.object({
  course: Joi.string().trim().required(),
  semester: Joi.number().min(1).max(8).required(),
});

export { courseSchema };
