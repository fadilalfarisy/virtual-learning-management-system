import { verifyAccessToken } from "../services/token.service.js";
import ResponseError from "./error-handler.js";

const authentication = (req, res, next) => {
  try {
    let accessToken = req.headers.authorization;
    if (!accessToken) throw new ResponseError(401, "Missing token");
    accessToken = accessToken.split(" ")[1];

    const { error, decoded } = verifyAccessToken(accessToken);
    if (error) throw new ResponseError(401, "Invalid or expired token");

    req.token = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

export default authentication;
