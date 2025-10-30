import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { TJobForDisplay } from "~/@types";
import { formatDate } from "../utils/formate.util";
import { apiJobs } from "api/api";
import { toast } from "sonner";

interface IProps {
  items: TJobForDisplay[];
}
const deleteJob = async (id: string) => {
  try {
    await apiJobs.delete(`/jobs/${id}`);
    toast.success("Job deleted successfully");
  } catch (err) {
    toast.error("Error deleting job");
  }
}
export function JobTable({ items }: IProps) {
  console.log(items)
  return (
    <div className="px-20 my-6">
      <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="px-6 py-3 text-sm font-semibold text-gray-700 text-center">
                Title
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700 text-center">
                Job Type
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700 text-center">
                Posted Date
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700 text-center">
                Application Deadline
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-700 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {items.length > 0 ? (
              items.map((job, idx) => (
                <tr
                  key={`${job.title}-${idx}`}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-900 text-center">
                    {job.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {job.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-center">
                    {formatDate(job.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-sm text-black text-center">
                    Full Time
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-3">
                      <Link
                        to={`/jobs/${job.id}`}
                        className="bg-transparent p-1.5 text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center"
                        aria-label="View job"
                        title="View"
                      >
                        <Eye className="h-5 w-5" />
                      </Link>

                      <Link
                        to={`/jobs/create-job`}
                        state={{job}}
                        className="bg-transparent p-1.5 text-green-600 hover:text-green-800 transition-colors inline-flex items-center"
                        aria-label="Edit job"
                        title="Edit"
                      >
                        <Pencil className="h-5 w-5" />
                      </Link>

                      <button
                        className="!bg-transparent p-1.5 text-red-600 hover:text-red-800 transition-colors"
                        aria-label="Delete job"
                        title="Delete"
                        onClick={() => deleteJob(job.id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="px-6 py-12 text-center text-gray-500 h-screen"
                  colSpan={5}
                >
                  <div className="flex flex-col items-center justify-center">
                    <svg
                      className="h-12 w-12 text-gray-400 mb-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                    <p className="text-sm font-medium">No jobs found</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Start by adding a new job posting
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}