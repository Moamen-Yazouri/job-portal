import { useContext, useState } from "react";
import FormHeader from "./FormHeader";
import InputField from "./InputField";
import SelectField from "./SelectField";
import SubmitButton from "./SubmitButton";
import TextAreaField from "./TextAreaField";

import { JOB_CATEGORIES, JOB_TYPES } from "./constants";
import useForm from "./hook/useForm";


function Form() {
  const {
    handleSubmit,
    loading
  } = useForm();

  return (
    <form className="min-h-screen flex flex-col" onSubmit={handleSubmit}>
      <FormHeader title="Create a Job" />

      <div className="flex flex-col flex-grow items-center py-4 px-4">
        <div className="w-full md:w-4/4 lg:w-3/4 rounded-xl shadow-md p-6 border border-gray-200 min-h-[80vh] flex flex-col justify-between bg-white">

          <fieldset disabled={loading} aria-busy={loading} className={loading ? "opacity-60" : ""}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Company Name" placeholder="Name" name="companyName" />
                <InputField label="Company Website" placeholder="Website Link" name="companyWebsite" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <InputField label="Job Title" placeholder="Enter job title" name="jobTitle" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectField label="Job Category" options={JOB_CATEGORIES} name="jobCategory" />
                <SelectField label="Job Type" options={JOB_TYPES} name="jobType" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Job Location" placeholder="Location" name="jobLocation" />
                <InputField label="Salary Range" placeholder="Salary Range" name="salaryRange" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Experience" placeholder="Experience" name="experience" />
                <SelectField label="Featured" options={["Yes", "No"]} name="featured" />
              </div>

              <TextAreaField label="Job Description" placeholder="Job Description" name="jobDescription" />
            </div>

            <div className="mt-6">
              <SubmitButton label={loading ? "Posting..." : "Post Job"} loading={loading} />
            </div>
          </fieldset>
        </div>
      </div>
    </form>
  );
}


export default Form;
