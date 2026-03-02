import { Router, type NextFunction, type Request, type Response } from "express";
import healthRouter from "./health.router.js";

const apiRouter = Router();

apiRouter.use("/health", healthRouter);

apiRouter.use((_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ error: "Resource not found" });
});

export default apiRouter;
