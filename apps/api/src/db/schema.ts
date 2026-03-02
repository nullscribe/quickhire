import { pgTable, serial, text, timestamp, varchar, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const jobCategoryEnum = pgEnum("job_category", [
  "Engineering",
  "Design",
  "Marketing",
  "Sales",
  "Product",
  "Operations",
  "HR",
  "Finance",
  "Customer Support",
  "Data Science",
  "Legal",
  "Other",
]);

export const jobTypeEnum = pgEnum("job_type", [
  "Full-time",
  "Part-time",
  "Contract",
  "Freelance",
  "Internship",
]);

export const experienceLevelEnum = pgEnum("experience_level", [
  "Entry Level",
  "Mid Level",
  "Senior Level",
  "Lead",
  "Executive",
]);

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  category: jobCategoryEnum("category").notNull(),
  description: text("description").notNull(),
  salary: varchar("salary", { length: 100 }),
  jobType: jobTypeEnum("job_type"),
  experience: experienceLevelEnum("experience"),
  skills: text("skills"),
  benefits: text("benefits"),
  requirements: text("requirements"),
  responsibilities: text("responsibilities"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  jobId: serial("job_id")
    .notNull()
    .references(() => jobs.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  resumeLink: text("resume_link").notNull(),
  coverNote: text("cover_note"),
  phone: varchar("phone", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const jobsRelations = relations(jobs, ({ many }) => ({
  applications: many(applications),
}));

export const applicationsRelations = relations(applications, ({ one }) => ({
  job: one(jobs, {
    fields: [applications.jobId],
    references: [jobs.id],
  }),
}));

export type Job = typeof jobs.$inferSelect;
export type NewJob = typeof jobs.$inferInsert;
export type Application = typeof applications.$inferSelect;
export type NewApplication = typeof applications.$inferInsert;
