import { and, desc, eq, SQL } from "drizzle-orm";
import db from "../db/index.js";
import { jobs, type InsertJob, type SelectJob } from "../db/schema.js";
import type { JobsFilter } from "../types/job.type.js";

class JobRepository {
  async getAll(filters: JobsFilter): Promise<SelectJob[]> {
    let sqlFilters: SQL[] = [];

    if (filters.location) sqlFilters.push(eq(jobs.location, filters.location));
    if (filters.category) sqlFilters.push(eq(jobs.category, filters.category));

    const result: SelectJob[] = await db.query.jobs.findMany({
      where: sqlFilters.length > 0 ? and(...sqlFilters) : undefined,
      limit: filters.limit,
      offset: filters.offset,
      orderBy: desc(jobs.createdAt),
    });

    return result;
  }

  async getById(id: number): Promise<SelectJob | undefined> {
    const job = await db.query.jobs.findFirst({
      where: eq(jobs.id, id),
    });

    return job;
  }

  async create(dto: InsertJob): Promise<SelectJob | undefined> {
    const [job] = await db.insert(jobs).values(dto).returning();
    return job;
  }

  async delete(id: number): Promise<SelectJob | undefined> {
    const [deletedJob] = await db.delete(jobs).where(eq(jobs.id, id)).returning();
    return deletedJob;
  }
}

const jobRepository = new JobRepository();
export default jobRepository;
