import { useEffect, useMemo, useState } from "react";
import { mapJobsToDisplay } from "../utils/resMapper.util";
import type { IJobFromAPI, TJobForDisplay } from "~/@types";
import { JobTable } from "./jobsTable";
import FullPageLoader from "../../full-page-loader/fullPageLoader";
import { toast } from "sonner";
import { apiJobs } from "api/api";
import { useLocation } from "react-router-dom";
import { normalizeDisplayName } from "~/_components/landing/popular/cats.utils";


const JobList = () => {
  const [jobs, setJobs] = useState<TJobForDisplay[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  //   const { state } = useLocation();
  // const cat = (state?.cat ?? null) as string | null;

  
  // const rows = useMemo(() => {
  //   if (!cat) return jobs;
      
  //   return jobs.filter((job) => {
  //     console.log(job.jobCategory)
  //     return normalizeDisplayName(job.jobCategory || "") === cat 
  //   }
  //   );
  // }, [jobs, cat]);
  useEffect(() => {

    let ignore = false;

    const load = async () => {
      try {
        setLoading(true);

        const {data} = await apiJobs.get<IJobFromAPI[]>(
          "/jobs",
        );
        
        const mapped = mapJobsToDisplay(Array.isArray(data) ? data : []);
        if (!ignore) setJobs(mapped);

      } catch (err: unknown) {
          toast.error(`Failed to load jobs`);      
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    load();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="relative">
      {loading && (
        <FullPageLoader />
      )}

      <div className="text-center p-10 text-4xl bg-gray-100 text-black text-bold">My Job List</div>

      <JobTable items={jobs} />
    </div>
  );
};

export default JobList;
