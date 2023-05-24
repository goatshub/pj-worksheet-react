const ProjectInfo = ({ projObject }) => {
  const {
    projNo,
    projName,
    projStatus,
    projStudio,
    projManager,
    currentPhase,
  } = projObject;
  return (
    <div className="px-1 py-3">
      <h1 className="text-xl font-bold ">Project Information</h1>
      <div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-200">
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 md:grid-cols-5">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Project Number
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 md:col-span-1 sm:mt-0">
                {projNo}
              </dd>
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Project Name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 md:col-span-2">
                {projName}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 md:grid-cols-5">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Studio
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-0 sm:col-span-2 md:col-span-1">
                {projStudio}
              </dd>
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Project Manager
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 md:col-span-2">
                {projManager}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 md:grid-cols-5">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Status
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-0 sm:col-span-2 md:col-span-1">
                {projStatus}
              </dd>
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Current Phase
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 md:col-span-2">
                {currentPhase}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};
export default ProjectInfo;
