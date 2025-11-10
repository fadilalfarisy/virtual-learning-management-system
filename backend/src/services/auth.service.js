import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import ResponseError from "../middleware/error-handler.js";

const register = async (requestBody) => {
  const { fullName, email, password } = requestBody;

  const registeredUser = await User.findOne({ email });
  if (registeredUser) throw new ResponseError(400, "Email was already used");

  const newUser = await User.create({
    fullName,
    email,
    password,
  });

  return newUser;
};

const login = async (requestBody) => {
  const { email, password } = requestBody;

  console.log("login");

  const existUser = await User.findOne({ email });
  if (!existUser)
    throw new ResponseError(404, "Email or password is incorrect");

  const matchPassword = await bcryptjs.compare(password, existUser.password);
  if (!matchPassword)
    throw new ResponseError(404, "Email or password is incorrect");

  return existUser;
};

const authService = {
  register,
  login,
};

export default authService;
