import { apiJobs } from "api/api";
import type { IJobForSend, IJobFromAPI } from "~/@types";

export async function patchJob(
  id: string,
  payload: Partial<IJobForSend>
): Promise<IJobFromAPI> {
  const { data } = await apiJobs.put<IJobFromAPI>(`/jobs/${id}`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
}