import { pgTable, serial, text, timestamp, varchar, pgEnum, customType } from "drizzle-orm/pg-core";
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

const citext = customType<{ data: string }>({
  dataType() {
    return "citext";
  },
});

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  category: jobCategoryEnum("category").notNull(),
  description: text("description").notNull(),
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

export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  email: citext("email").notNull().unique(),
  passwordDigest: varchar("password_digest", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type SelectJob = typeof jobs.$inferSelect;
export type InsertJob = typeof jobs.$inferInsert;
export type SelectApplication = typeof applications.$inferSelect;
export type InsertApplication = typeof applications.$inferInsert;
export type JobCategoryType = (typeof jobCategoryEnum.enumValues)[number];
