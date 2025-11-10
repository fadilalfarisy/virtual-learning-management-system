import Joi from "joi";
import { idValidation } from "./id.js";

const youtubeRegex =
  /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[&?=\w-]*)?$/;

const referenceSchema = Joi.object({
  title: Joi.string().trim().required(),
  channel: Joi.string().trim().required(),
  link: Joi.string().trim().pattern(youtubeRegex).required(),
  courseId: Joi.string().trim().custom(idValidation).required(),
  summary: Joi.string().empty("").default("Summarize isn't available"),
});

const referenceIdSchema = Joi.object({
  referenceId: Joi.string().trim().custom(idValidation),
});

const linkSchema = Joi.object({
  link: Joi.string().trim().pattern(youtubeRegex).required(),
});

export { referenceSchema, referenceIdSchema, linkSchema };
