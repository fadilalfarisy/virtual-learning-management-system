import Reference from "../models/reference.model.js";
import ResponseError from "../middleware/error-handler.js";
import courseService from "./course.service.js";
import userService from "./user.service.js";

const getAllReferencesWithPagination = async (query, sort, pagination) => {
  const totalItems = await getCountReferences(query);
  const references = await Reference.find(query)
    .populate("courseId", "course semester")
    .populate("createdBy", "fullName")
    .sort({ title: Number(sort) })
    .skip(pagination.skip)
    .limit(pagination.limit);

  const meta = {
    skip: pagination.skip,
    limit: pagination.limit,
    totalItems: totalItems,
    totalPage: Math.ceil(totalItems / pagination.limit),
  };

  return {
    response: references,
    pagination: meta,
  };
};

const getAllReferencesWithoutPagination = async (query, sort) => {
  const totalItems = await getCountReferences(query);
  const references = await Reference.find(query)
    .populate("courseId", "course semester")
    .populate("createdBy", "fullName")
    .sort({ title: Number(sort) });
  const meta = {
    skip: 0,
    limit: totalItems,
    totalItems: totalItems,
    totalPage: 0,
  };

  return {
    response: references,
    pagination: meta,
  };
};

const getCountReferences = async (query) => {
  return await Reference.countDocuments(query);
};

const getReferenceById = async (id) => {
  const existReference = await Reference.findById(id).populate("courseId");
  if (!existReference)
    throw new ResponseError(404, `Reference with id ${id} is not found`);
  return existReference;
};

const createReference = async (authorId, requestBody) => {
  const { title, link, channel, courseId, summary } = requestBody;

  await courseService.getCourseById(courseId);
  await userService.getUserById(authorId);

  const newReference = await Reference.create({
    title,
    link,
    channel,
    courseId,
    createdBy: authorId,
    summary,
  });

  return newReference;
};

const updateReference = async (id, requestBody) => {
  const { title, channel, link, courseId, summary } = requestBody;

  await courseService.getCourseById(courseId);
  const updatedReference = await Reference.updateOne(
    { _id: id },
    {
      $set: {
        title,
        channel,
        link,
        courseId,
        summary,
      },
    },

    { runValidators: true }
  );

  if (updatedReference.matchedCount != 1)
    throw new ResponseError(400, `Failed to update reference with id ${id}`);

  return updatedReference;
};

const deleteReference = async (id) => {
  const deletedReference = await Reference.deleteOne({ _id: id });
  if (deletedReference.deletedCount == 0)
    throw new ResponseError(400, `Failed to delete reference with id ${id}`);

  return deletedReference;
};

const referenceService = {
  getAllReferencesWithPagination,
  getAllReferencesWithoutPagination,
  getCountReferences,
  getReferenceById,
  createReference,
  updateReference,
  deleteReference,
};

export default referenceService;
