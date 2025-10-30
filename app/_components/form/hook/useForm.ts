import React, { useContext, useState } from 'react'
import { buildCategoryIndex } from '~/_components/landing/popular/cats.utils';
import { CategoryContext } from '~/provider/category/categoryContext';
import { mapFormToJobForSend } from '../form.utils';
import { createJob } from '../service/createJob';
import { toast } from 'sonner';
import { useLocation } from 'react-router-dom';
import type { TJobForDisplay } from '~/@types';
import { patchJob } from '../service/updateJob';
import { JobForSendSchema } from '../validation/form.validation';
import  {ZodError} from "zod";

const useForm = () => {
    const { cats } = useContext(CategoryContext);
    const [loading, setLoading] = useState(false);
    const { state } = useLocation();
     const jobFromState = (state?.job ?? null) as TJobForDisplay | null;
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formEl = e.currentTarget; 
        const fd = new FormData(e.currentTarget);

        const categoryIndex = buildCategoryIndex(cats);
        const jobToPost = mapFormToJobForSend(fd, categoryIndex);

        try {
        setLoading(true);
        const valid = JobForSendSchema.parse(jobToPost);
 
        if(jobFromState) {
            await patchJob(jobFromState.id, valid);
            toast.success("job updated successfully");
        } else {
            const resData = await createJob(valid);
            if (resData) {
                formEl.reset();
            }
            toast.success("Job posted successfully");
            }
        }
        catch (err) {
            if(err instanceof ZodError) {
            console.log(err);
            }
            toast.error("Error posting job");
        } 
        finally {
            setLoading(false);
        }
    };
    return { handleSubmit, loading, jobFromState };
}

export default useForm