import ResponseError from "../middleware/error-handler.js";

const validateSchema = (schema, request) => {
  const { value, error } = schema.validate(request, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (error) throw new ResponseError(400, error.message);
  return value;
};

export { validateSchema };
