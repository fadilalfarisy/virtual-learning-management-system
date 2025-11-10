import { idSchema } from "../validation/id.js";
import { validateSchema } from "../validation/validator.js";
import { createUserSchema, updateUserSchema } from "../validation/user.js";
import userService from "../services/user.service.js";

const getAllUsers = async (req, res, next) => {
  try {
    const listUsers = await userService.getAllUsers();
    res.status(200).json(listUsers);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id: userId } = validateSchema(idSchema, req.params);
    const user = await userService.getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const user = validateSchema(createUserSchema, req.body);

    const newUser = await userService.createUser(user);

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id: userId } = validateSchema(idSchema, req.params);
    const user = validateSchema(updateUserSchema, req.body);

    const updatedUser = await userService.updateUser(userId, user);

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id: userId } = validateSchema(idSchema, req.params);

    await userService.deleteUser(userId);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const usersController = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

export default usersController;
