import type { Request, Response } from "express";
import jobRepository from "../repository/job.repo.js";
import { createJobSchema, getJobsFilterSchema } from "../types/job.type.js";
import { BadRequestError, NotFoundError } from "../types/error.type.js";

export async function handleGetAllJobs(req: Request, res: Response) {
  const { location, category, limit, offset } = getJobsFilterSchema.parse(req.query);
  const jobsFilter = { location, category, limit, offset };
  const jobs = await jobRepository.getAll(jobsFilter);
  res.json({ data: jobs });
}

export async function handleGetJobById(req: Request, res: Response) {
  const id = Number(req.params["id"]);
  if (isNaN(id)) {
    throw new BadRequestError("Invalid id");
  }
  const job = await jobRepository.getById(id);
  if (job === undefined) {
    throw new NotFoundError(`Job with id=${id} not found`);
  }

  res.json({ data: job });
}

export async function handleCreateJob(req: Request, res: Response) {
  const validatedData = createJobSchema.parse(req.body);
  const newJob = await jobRepository.create(validatedData);

  res.status(201).json({
    message: "Job created successfully",
    data: newJob,
  });
}

export async function handleDeleteJob(req: Request, res: Response) {
  const id = Number(req.params["id"]);
  if (isNaN(id)) {
    throw new BadRequestError("Invalid job id");
  }

  const deletedJob = await jobRepository.delete(id);
  if (deletedJob === undefined) {
    throw new NotFoundError(`Job with id=${id} not found`);
  }

  res.status(204).end();
}
