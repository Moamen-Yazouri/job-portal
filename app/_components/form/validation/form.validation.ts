import { z, ZodType } from "zod";
import type { IJobForSend } from "~/@types";


export const JobForSendSchema = z.object({
  title: z.string().trim().min(2, "Title is too short").max(120),
  company: z.string().trim().min(2, "Company is too short").max(120),
  location: z.string().trim().min(2, "Location is too short").max(120),
  type: z.string().trim().min(1, "Job type is required"), // or replace with makeJobType(JOB_TYPES)
  salary: z.string().trim().min(1, "Salary is required").max(50),
  description: z.string().trim().min(10, "Description is too short").max(5000),
  isFeatured: z.boolean(),
  categoryId: z.number().int().positive("Select a category"),
  companyUrl: z
    .string()
    .trim()
    .transform((s) => (s === "" ? undefined : s))
    .pipe(z.string().url("Company URL must be valid").optional()),
  experience: z
    .string()
    .trim()
    .transform((s) => (s === "" ? undefined : s))
    .optional(),
}) satisfies ZodType<IJobForSend>

