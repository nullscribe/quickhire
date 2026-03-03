import { jobCategoryEnum } from "../db/schema.js";
import * as z from "zod";

export const getJobsFilterSchema = z.object({
  location: z.string().optional(),
  category: z.enum(jobCategoryEnum.enumValues).optional(),
  limit: z.coerce.number().int().positive().optional(),
  offset: z.coerce.number().int().nonnegative().optional(),
});

export type JobsFilter = z.infer<typeof getJobsFilterSchema>;

export const createJobSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  company: z.string().min(1, "Company is required").max(255),
  location: z.string().min(1, "Location is required").max(255),
  category: z.enum(jobCategoryEnum.enumValues),
  description: z.string().min(1, "Description is required"),
});
