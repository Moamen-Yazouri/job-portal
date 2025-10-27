import { apiJobs } from "api/api";
import type { IJobForSend, IJobFromAPI } from "~/@types";



export async function createJob(payload: IJobForSend): Promise<IJobFromAPI> {
  const { data } = await apiJobs.post<IJobFromAPI>("/jobs", payload, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
}