import express from "express";
import referenceController from "../controllers/reference.controller.js";
import authentication from "../middleware/authentication.js";
import { authorizationReference } from "../middleware/authorization.js";

const reference = express.Router();

reference.get("/", referenceController.getAllReferences);
reference.post("/summarize", referenceController.summarizeYoutubeVideo);

reference.get(
  "/me",
  authentication,
  referenceController.getAllReferencesCreatedBy
);
reference.get("/:id", referenceController.getReferenceById);

reference.post("/", authentication, referenceController.createReference);

reference.put(
  "/:id",
  authentication,
  authorizationReference,
  referenceController.updateReference
);
reference.delete(
  "/:id",
  authentication,
  authorizationReference,
  referenceController.deleteReference
);

export default reference;
