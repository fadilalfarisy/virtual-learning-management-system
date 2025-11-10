import courseService from "../services/course.service.js";
import { courseSchema } from "../validation/course.js";
import { validateSchema } from "../validation/validator.js";
import { idSchema } from "../validation/id.js";

const getAllCourses = async (req, res, next) => {
  try {
    let { search, semester, sort, skip, limit } = req.query;

    const query = {};
    if (search) query.course = { $regex: search, $options: "i" };
    if (Number(semester)) query.semester = Number(semester);
    if (Number(sort) != 1 && Number(sort) != -1) sort = 0;

    const pagination = {};
    if (Number(limit)) pagination.limit = limit;
    if (Number(skip)) pagination.skip = skip;
    const enablePagination = pagination.limit && pagination.skip;

    let listCourses;
    if (enablePagination) {
      listCourses = await courseService.getAllCoursesWithPagination(
        query,
        Number(sort),
        pagination
      );
    } else {
      console.log("without pagination");
      listCourses = await courseService.getAllCoursesWithoutPagination(
        query,
        Number(sort)
      );
    }

    res.status(200).json(listCourses);
  } catch (error) {
    next(error);
  }
};

const getCourseById = async (req, res, next) => {
  try {
    console.log(req.params);
    const { id: courseId } = validateSchema(idSchema, req.params);
    const existCourse = await courseService.getCourseById(courseId);
    res.status(200).json(existCourse);
  } catch (error) {
    next(error);
  }
};

const createCourse = async (req, res, next) => {
  try {
    const course = validateSchema(courseSchema, req.body);
    const newCourse = await courseService.createCourse(course);

    res.status(201).json(newCourse);
  } catch (error) {
    next(error);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const { id: courseId } = validateSchema(idSchema, req.params);
    const course = validateSchema(courseSchema, req.body);
    const updatedCourse = await courseService.updateCourse(courseId, course);

    res.status(200).json(updatedCourse);
  } catch (error) {
    next(error);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const { id: courseId } = validateSchema(idSchema, req.params);
    await courseService.deleteCourse(courseId);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const courseController = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};

export default courseController;
