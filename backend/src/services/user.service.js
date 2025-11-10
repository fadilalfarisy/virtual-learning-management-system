import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import ResponseError from "../middleware/error-handler.js";

const getAllUsers = async () => {
  const listUsers = await User.find({});
  return listUsers;
};

const getUserById = async (id) => {
  const existUser = await User.findById(id).select("-password");
  if (!existUser)
    throw new ResponseError(404, `User with id ${id} is not found`);
  return existUser;
};

const createUser = async (requestBody) => {
  const { fullName, email, password, role } = requestBody;

  const existUser = await User.findOne({ email });
  if (existUser) throw new ResponseError(400, "Email was already used");

  const newUser = await User.create({
    fullName,
    email,
    password,
    role,
  });

  return newUser;
};

const updateUser = async (id, requestBody) => {
  const { fullName, email, password, role, status } = requestBody;

  const updateData = {
    fullName,
    email,
    role,
    status,
  };

  if (password) {
    const salt = await bcryptjs.genSalt(10);
    updateData.password = await bcryptjs.hash(password, salt);
  }

  const updatedUser = await User.updateOne(
    { _id: id },
    { $set: updateData },
    { runValidators: true }
  );

  if (updatedUser.matchedCount != 1)
    throw new ResponseError(400, `Failed to update user with id ${id}`);

  return updatedUser;
};

const deleteUser = async (id) => {
  const deletedUser = await User.deleteOne({ _id: id });
  if (deletedUser.deletedCount == 0)
    throw new ResponseError(400, `Failed to delete user with id ${id}`);
};

const getCountUsers = async (query) => {
  return await User.countDocuments(query);
};

const getBookmarksByUserId = async (id) => {
  const existUser = await User.findById(id)
    .select("bookmarks")
    .populate({
      path: "bookmarks",
      populate: [
        {
          path: "courseId",
          select: "course",
        },
        {
          path: "createdBy",
          select: "fullName",
        },
      ],
    });
  if (!existUser)
    throw new ResponseError(404, `Bookmark user with id ${id} is not found`);
  return existUser;
};

const addBookmarkToUser = async (userId, referenceId) => {
  const updatedBookmark = await User.updateOne(
    { _id: userId },
    { $addToSet: { bookmarks: referenceId } }
  );
  console.log(updatedBookmark);
  if (updatedBookmark.matchedCount != 1)
    throw new ResponseError(400, `Failed to add bookmark user`);
  return updatedBookmark;
};

const removeBookmarkFromUser = async (userId, referenceId) => {
  const updatedBookmark = await User.updateOne(
    { _id: userId },
    { $pull: { bookmarks: referenceId } }
  );
  if (updatedBookmark.matchedCount != 1)
    throw new ResponseError(400, `Failed to remove bookmark user`);
  return updatedBookmark;
};

const userService = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getCountUsers,

  getBookmarksByUserId,
  addBookmarkToUser,
  removeBookmarkFromUser,
};

export default userService;
