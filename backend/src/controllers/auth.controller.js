import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "../services/token.service.js";
import authService from "../services/auth.service.js";
import { validateSchema } from "../validation/validator.js";
import { loginSchema, registerSchema } from "../validation/auth.js";
import ResponseError from "../middleware/error-handler.js";
import userService from "../services/user.service.js";
import user from "../routes/user.route.js";

const register = async (req, res, next) => {
  try {
    const user = validateSchema(registerSchema, req.body);
    const registeredUser = await authService.register(user);

    const payloadJWT = {
      id: registeredUser._id,
      role: registeredUser.role,
    };
    const accessToken = createAccessToken(payloadJWT);
    const refreshToken = createRefreshToken(payloadJWT);

    res.cookie("token", refreshToken, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), //1d
      httpOnly: true,
      sameSite: "none",
      secure: process.env.NODE_ENV == "production",
    });

    res.status(201).json({
      fullName: registeredUser.fullName,
      email: registeredUser.email,
      role: registeredUser.role,
      accessToken: accessToken,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = validateSchema(loginSchema, req.body);
    const loggedUser = await authService.login(user);

    const payloadJWT = {
      id: loggedUser._id,
      role: loggedUser.role,
    };
    const accessToken = createAccessToken(payloadJWT);
    const refreshToken = createRefreshToken(payloadJWT);

    console.log(payloadJWT);

    res.cookie("token", refreshToken, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), //1d
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      // secure: process.env.NODE_ENV == "production",
    });

    res.status(200).json({
      fullName: loggedUser.fullName,
      email: loggedUser.email,
      role: loggedUser.role,
      accessToken: accessToken,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("token", { path: "/" });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const checkRefreshToken = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new ResponseError(400, "Cookie token is missing");

    const { error, decoded } = verifyRefreshToken(token);
    if (error != null) throw new ResponseError("401", "Invalid jwt token");

    const user = await userService.getUserById(decoded.id);

    const accessToken = createAccessToken({
      id: user.id,
      role: user.role,
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

const usersController = {
  register,
  login,
  logout,
  checkRefreshToken,
};

export default usersController;
