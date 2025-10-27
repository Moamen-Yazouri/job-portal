import { useEffect, useState } from "react";
import type { IJobFromAPI, TJobForDisplay } from "~/@types";
import JobDetailsCard from "./jobDetailsCard";
import { useParams } from "react-router-dom";
import { mapJobToDisplay } from "../utils/resMapper.util";
import FullPageLoader from "~/_components/full-page-loader/fullPageLoader";
import { toast } from "sonner";
import { apiJobs } from "api/api";


function JobDetails() {
  const {id} = useParams();
  const [job, setJob] = useState<TJobForDisplay | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  let ignore = false;

  const load = async () => {
    try {
      setLoading(true);
        const { data } = await apiJobs.get<IJobFromAPI>(
          `/jobs/${id}`
        );

      const dataMapForDisplay = mapJobToDisplay(data);

      if (!ignore) setJob(dataMapForDisplay);
    } catch (err) {
      toast.error("Failed to load job details");
    } finally {
      if (!ignore) setLoading(false);
    }
  };

  load();

  return () => {
    ignore = true;
  };
}, []);


  if (loading)
    return <FullPageLoader />
  if (!job)
    return (
      <p className="text-center text-red-500 mt-16 text-lg">No job found</p>
    );
  
  return (
    <JobDetailsCard {...job}/>
  );
}

export default JobDetails;
