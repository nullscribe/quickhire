import { Router } from "express";
import { healthCheckHandler } from "../controllers/health.controller.js";

const healthRouter = Router();

healthRouter.get("/", healthCheckHandler);

export default healthRouter;
