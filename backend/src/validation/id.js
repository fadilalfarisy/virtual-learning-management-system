import mongoose from "mongoose";
import Joi from "joi";

const idValidation = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value))
    return helpers.message("Invalid id");
  return value;
};

const idSchema = Joi.object({
  id: Joi.string().trim().custom(idValidation),
});

export { idValidation, idSchema };
