import type { IJobFromAPI, TJobForDisplay } from "~/@types";

export function mapJobToDisplay(res: IJobFromAPI): TJobForDisplay {
  return {
    id: res.id,
    title: res.title ? res.title : "Untitled",
    company: res.company ?? res.companyName ?? "",
    location: res.location ?? res.jobLocation ?? "",
    type: res.type ?? res.jobType ?? "",
    salary: res.salary ?? res.salaryRange ?? "",
    description: res.description ?? res.jobDescription ?? "",
    requirements: res.requirements ?? [],
    createdAt: res.createdAt ?? "",
    companyWebsite: res.companyWebsite ?? "",
    jobCategory: res.jobCategory ?? "",
    featured: res.featured ?? "",
    experience: res.experience ?? "",
  };
}

export function mapJobsToDisplay(res: IJobFromAPI[]): TJobForDisplay[] {
  return res.map((item) => mapJobToDisplay(item));
}