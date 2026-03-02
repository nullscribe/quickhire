import express from "express";
import morgan from "morgan";

import appRouter from "./routers/index.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api", appRouter);

export default app;
