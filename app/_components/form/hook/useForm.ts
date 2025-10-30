import React, { useContext, useState } from "react";
import { buildCategoryIndex } from "~/_components/landing/popular/cats.utils";
import { CategoryContext } from "~/provider/category/categoryContext";
import { mapFormToJobForSend } from "../form.utils";
import { createJob } from "../service/createJob";
import { patchJob } from "../service/updateJob";
import { JobForSendSchema } from "../validation/form.validation";
import type { TJobForDisplay } from "~/@types";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { ZodError } from "zod";

type FieldErrors = Record<string, string>;

const useForm = () => {
  const { cats } = useContext(CategoryContext);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const { state } = useLocation();
  const jobFromState = (state?.job ?? null) as TJobForDisplay | null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const fd = new FormData(formEl);

    const categoryIndex = buildCategoryIndex(cats);
    const jobToPost = mapFormToJobForSend(fd, categoryIndex);

    try {
      setLoading(true);
      setErrors({}); // clear old errors

      const valid = JobForSendSchema.parse(jobToPost);

      if (jobFromState) {
        await patchJob(jobFromState.id, valid);
        toast.success("Job updated successfully");
      } else {
        const resData = await createJob(valid);
        if (resData) formEl.reset();
        toast.success("Job posted successfully");
      }
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: FieldErrors = {};
        for (const issue of err.issues) {
          const key = issue.path?.[0]?.toString() ?? "form";
          if (!fieldErrors[key]) fieldErrors[key] = issue.message;
        }
        
        toast.error(Object.values(fieldErrors).join("\n"));
      } else {
        toast.error("Error posting job");
      }
    } finally {
      setLoading(false);
    }
  };


  return { handleSubmit, loading, jobFromState };
};

export default useForm;
