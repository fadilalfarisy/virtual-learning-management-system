import { validateSchema } from "../validation/validator.js";
import userService from "../services/user.service.js";
import { referenceIdSchema } from "../validation/reference.js";

const getBookmarksByUserId = async (req, res, next) => {
  try {
    const { id: userId } = req.token;
    const listBookmarks = await userService.getBookmarksByUserId(userId);
    res.status(200).json(listBookmarks);
  } catch (error) {
    next(error);
  }
};

const addBookmarkToUser = async (req, res, next) => {
  try {
    const { referenceId } = validateSchema(referenceIdSchema, req.body);
    const { id: userId } = req.token;

    const updatedBookmark = await userService.addBookmarkToUser(
      userId,
      referenceId
    );

    res.status(200).json(updatedBookmark);
  } catch (error) {
    next(error);
  }
};

const removeBookmarkFromUser = async (req, res, next) => {
  try {
    const { referenceId } = validateSchema(referenceIdSchema, req.body);
    const { id: userId } = req.token;

    const updatedBookmark = await userService.removeBookmarkFromUser(
      userId,
      referenceId
    );

    res.status(200).json(updatedBookmark);
  } catch (error) {
    next(error);
  }
};

const bookmarkController = {
  getBookmarksByUserId,
  addBookmarkToUser,
  removeBookmarkFromUser,
};

export default bookmarkController;
