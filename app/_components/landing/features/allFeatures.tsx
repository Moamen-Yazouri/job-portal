import { useContext, useEffect, useState } from "react";
import JobCard from "./featureCard";
import type { IJobFromAPI, TJobForDisplay } from "~/@types";
import { mapJobsToDisplay } from "~/_components/job/utils/resMapper.util";
import FullPageLoader from "~/_components/full-page-loader/fullPageLoader";
import { apiJobs } from "api/api";
import { toast } from "sonner";
import { JobContext } from "~/provider/job/jobContext";

const AllFeatures = () => {
  const [jobs, setAPIJobs] = useState<TJobForDisplay[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const {setJobs} = useContext(JobContext);
  useEffect(() => {
    
    let ignore = false;


    const load = async () => {
      try {
        setLoading(true);

        const { data } = await apiJobs.get<IJobFromAPI[]>(
          "/jobs",
        );
        const features = data.filter(j => j.featured)
        const mapped = mapJobsToDisplay(Array.isArray(features) ? features : []);
        const top5 = mapped.slice(0, 5); 
        if (!ignore) {
          setJobs(mapped);
          setAPIJobs(top5);
        } 
          
      } catch (err) {
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
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      {loading && (
          <FullPageLoader />
        )}
      <div className="max-w-7xl mx-auto">
        <h2 className="font-poppins font-bold text-4xl text-center mb-12 text-gray-900">
          Featured jobs
        </h2>
        
        <div className="flex flex-col gap-5">
          {jobs.map((job, index) => (
            <JobCard
              jobId={job.id}
              key={index}
              companyName={job.company}
              jobTitle={job.title}
              location={job.location}
              jobType={job.type}
              salary={job.salary}
              companyInitial={job.company.charAt(0) || "C"}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllFeatures;