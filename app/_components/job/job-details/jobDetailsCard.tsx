import type { TJobForDisplay } from '~/@types';
interface IProps extends TJobForDisplay {}
const JobDetailsCard = ({
  title,
  company,
  location,
  type,
  salary,
  description,
  requirements,
}: IProps) => {
  return (
      <>
        <div className="mb-6 flex items-center justify-center gap-2 bg-gray-100 p-10">
        <h1 className="text-3xl font-bold text-gray-800">
          {title}<span className="text-[20px] font-bold">({type})</span>
        </h1>
        <h1 className="text-3xl font-bold text-gray-800">- {company}</h1>
      </div><div className="mx-auto p-8 mt-10 shadow-md">

          <div className="flex gap-4 mb-10 items-center justify-center">
            <button className="!bg-white text-black border-2 px-5 py-2 rounded-md text-sm font-medium transition-transform transform hover:scale-105 hover:!bg-[#338573] hover:text-white transition-transform">
              View Company
            </button>
            <button className="bg-green-900 text-white px-5 py-2 rounded-md text-sm font-medium transition-transform transform hover:scale-105 hover:bg-blue-700">
              Apply This Job
            </button>
          </div>

          <p className="text-gray-700 font-medium mb-2">
            Location: <span className="text-gray-500">{location}</span>
          </p>

          <p className="text-gray-700 font-medium mb-2">
            Minimum Qualification: <span className="text-gray-500">Bachelor</span>
          </p>
          <p className="text-gray-700 font-medium mb-2">
            Experience Level: <span className="text-gray-500"> 2 years</span>
          </p>
          <p className="text-gray-700 font-medium mb-2">
            Location: <span className="text-gray-500">{location}</span>
          </p>

          <p className="text-gray-700 font-medium mb-2">
            Application Deadline: <span className="text-gray-500">12/08/2022</span>
          </p>
          <p className="text-gray-700 font-medium  mb-2">
            Salary Range: <span className="text-gray-500 ">{salary}</span>
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">Job Description</h2>
          <p className="text-gray-700 leading-relaxed mb-6">{description}</p>

          {requirements && requirements.length > 0 &&  (
            <>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2 mt-8">Requirements</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
                {requirements?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </>
  )
}

export default JobDetailsCard;