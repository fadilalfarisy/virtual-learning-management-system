import courseService from "../services/course.service.js";
import referenceService from "../services/reference.service.js";
import userService from "../services/user.service.js";

const getInfoDashboard = async (req, res, next) => {
  try {
    const totalReferences = await referenceService.getCountReferences({});
    const totalUsers = await userService.getCountUsers({});
    const totalCourses = await courseService.getCountCourses({});
    res.status(200).json({
      totalReferences,
      totalCourses,
      totalUsers,
    });
  } catch (error) {
    next(error);
  }
};

export const infoController = {
  getInfoDashboard,
};
