import referenceService from "../services/reference.service.js";
import ResponseError from "./error-handler.js";

export const authorizationReference = async (req, res, next) => {
  try {
    const { id: userId } = req.token;
    const { id: referenceId } = req.params;

    const existReference = await referenceService.getReferenceById(referenceId);

    if (existReference.createdBy != userId)
      throw new ResponseError(
        403,
        `Your not allowed to edit reference with id ${userId}`
      );

    next();
  } catch (error) {
    next(error);
  }
};

export const authorizationRole = (role) => {
  return (req, res, next) => {
    try {
      const matchRole = role.includes(req.token.role);
      if (!matchRole) throw new ResponseError(403, "Forbidden");

      next();
    } catch (error) {
      console.log(error);
      res.status(403).json({
        error: "Forbidden",
      });
    }
  };
};
