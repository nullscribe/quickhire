import { Router, type NextFunction, type Request, type Response } from "express";
import healthRouter from "./health.router.js";
import jobRouter from "./job.router.js";
import { NotFoundError } from "../types/error.type.js";

const apiRouter = Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/jobs", jobRouter);

apiRouter.use((_req: Request, _res: Response, next: NextFunction) => {
  next(new NotFoundError("Resource not found"));
});

export default apiRouter;
