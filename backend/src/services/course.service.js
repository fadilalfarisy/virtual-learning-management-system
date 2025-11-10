import Course from "../models/course.model.js";
import ResponseError from "../middleware/error-handler.js";

const getAllCoursesWithPagination = async (query, sort, pagination) => {
  const totalItems = await getCountCourses(query);
  const courses = await Course.find(query)
    .sort({ course: sort })
    .skip(pagination.skip)
    .limit(pagination.limit);
  const meta = {
    skip: pagination.skip,
    limit: pagination.limit,
    totalItems: totalItems,
    totalPage: Math.ceil(totalItems / pagination.limit),
  };

  return {
    response: courses,
    pagination: meta,
  };
};

const getAllCoursesWithoutPagination = async (query, sort) => {
  const totalItems = await getCountCourses(query);
  const courses = await Course.find(query).sort({ course: sort });
  const meta = {
    skip: 0,
    limit: totalItems,
    totalItems: totalItems,
    totalPage: 0,
  };

  return {
    response: courses,
    pagination: meta,
  };
};

const getCountCourses = async (query) => {
  return await Course.countDocuments(query);
};

const getAllCourses = async (search, semester, sort, skip, limit) => {
  const query = {};
  if (search) query.course = { $regex: search, $options: "i" };
  if (Number(semester)) query.semester = Number(semester);
  if (Number(sort) != 1 && Number(sort) != -1) sort = 0;

  const pagination = {};
  if (Number(limit)) pagination.limit = limit;
  if (Number(skip)) pagination.skip = skip;
  const enablePagination = pagination.limit && pagination.skip;

  let courses;
  let meta;

  const totalItems = await Course.countDocuments(query);
  if (enablePagination) {
    courses = await Course.find(query)
      .sort({ course: Number(sort) })
      .skip(pagination.skip)
      .limit(pagination.limit);

    meta = {
      skip: pagination.skip,
      limit: pagination.limit,
      totalItems: totalItems,
      totalPage: Math.ceil(totalItems / pagination.limit),
    };
  }
  if (!enablePagination) {
    courses = await Course.find(query).sort({ course: Number(sort) });
    meta = {
      skip: 0,
      limit: totalItems,
      totalItems: totalItems,
      totalPage: 0,
    };
  }

  return {
    response: courses,
    pagination: meta,
  };
};

const getCourseById = async (id) => {
  const existCourse = await Course.findById(id);
  if (!existCourse) new ResponseError(404, `Course with id ${id} is not found`);
  return existCourse;
};

const createCourse = async (requestBody) => {
  const { course, semester } = requestBody;

  const newCourse = await Course.create({
    course,
    semester,
  });

  return newCourse;
};

const updateCourse = async (id, requestBody) => {
  const { course, semester } = requestBody;
  const updatedCourse = await Course.updateOne(
    { _id: id },
    {
      course,
      semester,
    },
    { runValidators: true }
  );
  console.log(updatedCourse);

  if (updatedCourse.matchedCount != 1)
    throw new ResponseError(400, `Failed to update course with id ${id}`);

  return updatedCourse;
};

const deleteCourse = async (id) => {
  const deletedCourse = await Course.deleteOne({ _id: id });
  if (deletedCourse.deletedCount == 0)
    throw new ResponseError(400, `Failed to delete course with id ${id}`);

  return deletedCourse;
};

const courseService = {
  getAllCourses,
  getAllCoursesWithPagination,
  getAllCoursesWithoutPagination,
  getCountCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};

export default courseService;
