import mongoose from "mongoose";
import { validateSchema } from "../validation/validator.js";
import { linkSchema, referenceSchema } from "../validation/reference.js";
import { idSchema } from "../validation/id.js";
import referenceService from "../services/reference.service.js";
import ResponseError from "../middleware/error-handler.js";
import {
  promptSummarization,
  getVideoIdFromUrl,
  fetchParamsTranscript,
  extractParamsTranscript,
  fetchYoutubeTranscript,
  extractTranscriptText,
} from "../services/transcript.service.js";

const getAllReferences = async (req, res, next) => {
  try {
    let { search, sort, courseId, skip, limit } = req.query;

    const query = {};
    if (search) query.title = { $regex: search, $options: "i" };
    if (mongoose.Types.ObjectId.isValid(courseId)) query.courseId = courseId;
    if (Number(sort) != 1 && Number(sort) != -1) sort = 0;

    const pagination = {};
    if (Number(limit)) pagination.limit = limit;
    if (Number(skip)) pagination.skip = skip;
    const enablePagination = pagination.limit && pagination.skip;

    let listReferences;
    if (enablePagination) {
      listReferences = await referenceService.getAllReferencesWithPagination(
        query,
        sort,
        pagination
      );
    } else {
      listReferences = await referenceService.getAllReferencesWithoutPagination(
        query,
        sort
      );
    }

    res.status(200).json(listReferences);
  } catch (error) {
    next(error);
  }
};

const getAllReferencesCreatedBy = async (req, res, next) => {
  try {
    let { search, sort, courseId, skip, limit } = req.query;
    const { id: userId } = req.token;

    const query = { createdBy: userId };
    if (search) query.title = { $regex: search, $options: "i" };
    if (mongoose.Types.ObjectId.isValid(courseId)) query.courseId = courseId;
    if (Number(sort) != 1 && Number(sort) != -1) sort = 0;

    const pagination = {};
    if (Number(limit)) pagination.limit = limit;
    if (Number(skip)) pagination.skip = skip;
    const enablePagination = pagination.limit && pagination.skip;

    let listReferences;
    if (enablePagination) {
      listReferences = await referenceService.getAllReferencesWithPagination(
        query,
        sort,
        pagination
      );
    } else {
      listReferences = await referenceService.getAllReferencesWithoutPagination(
        query,
        sort
      );
    }

    res.status(200).json(listReferences);
  } catch (error) {
    next(error);
  }
};

const getReferenceById = async (req, res, next) => {
  try {
    const { id: referenceId } = validateSchema(idSchema, req.params);
    const existReference = await referenceService.getReferenceById(referenceId);

    res.status(200).json(existReference);
  } catch (error) {
    next(error);
  }
};

const createReference = async (req, res, next) => {
  try {
    const authorId = req.token.id;
    const reference = validateSchema(referenceSchema, req.body);
    const newReference = await referenceService.createReference(
      authorId,
      reference
    );

    res.status(201).json(newReference);
  } catch (error) {
    next(error);
  }
};

const updateReference = async (req, res, next) => {
  try {
    const { id: referenceId } = validateSchema(idSchema, req.params);
    const reference = validateSchema(referenceSchema, req.body);

    const updatedReference = await referenceService.updateReference(
      referenceId,
      reference
    );

    res.status(200).json(updatedReference);
  } catch (error) {
    next(error);
  }
};

const deleteReference = async (req, res, next) => {
  try {
    const { id: referenceId } = validateSchema(idSchema, req.params);
    await referenceService.deleteReference(referenceId);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const summarizeYoutubeVideo = async (req, res, next) => {
  try {
    const { link } = validateSchema(linkSchema, req.body);

    const videoId = getVideoIdFromUrl(link);
    console.log("Extracted video ID:", videoId);

    const paramsVideo = await fetchParamsTranscript(videoId);
    const params = extractParamsTranscript(paramsVideo);
    console.log("Extracted params ID:", params);

    const transcriptVideo = await fetchYoutubeTranscript(videoId, params);
    const transcript = extractTranscriptText(transcriptVideo);

    const token = process.env.TOKEN_OLLAMA;
    const response = await fetch("https://ollama.com/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        model: "gpt-oss:120b-cloud",
        prompt: promptSummarization(transcript),
        stream: false,
      }),
    });

    if (!response.ok) throw new ResponseError(`API request failed with status`);

    const data = await response.json();
    res.json({ summary: data.response });
  } catch (error) {
    next(error);
  }
};

const referenceController = {
  getAllReferences,
  getAllReferencesCreatedBy,
  getReferenceById,
  createReference,
  updateReference,
  deleteReference,
  summarizeYoutubeVideo,
};

export default referenceController;
