import { Router } from "express";
import {
  handleCreateJob,
  handleDeleteJob,
  handleGetAllJobs,
  handleGetJobById,
} from "../controllers/jobs.controller.js";

const jobRouter = Router();

jobRouter.get("/", handleGetAllJobs);
jobRouter.get("/:id", handleGetJobById);
jobRouter.post("/", handleCreateJob);
jobRouter.delete("/:id", handleDeleteJob);

export default jobRouter;
