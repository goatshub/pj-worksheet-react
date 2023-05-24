import Badge from "../Badge";
import ProjectStepper from "../ProjectStepper";

const PQP = ({ projObject = {} }) => {
  return (
    <div className="px-1 py-3">
      <div className="flex justify-between">
        <div className="flex">
          <h1 className="text-xl font-bold ">PQP</h1>

          <a
            href={projObject?.pqpProjectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg mx-2 py-0.5 px-2 drop-shadow-sm bg-blue-100 hover:ring-2 hover:cursor-pointer text-blue-800 dark:text-blue-600 hover:underline"
          >
            pqp project form
          </a>
        </div>
        <div className="flex gap-2 content-center">
          <span className="text-gray-500">Project status: </span>
          <Badge
            color={projObject?.pqpDotColor}
            message={projObject?.pqpDotColor}
          />
        </div>
      </div>
      {projObject?.isPqpNotRequired ? (
        <div className="text-center my-2">PQP is not required.</div>
      ) : (
        <ProjectStepper
          currentPhase={projObject?.currentPhase}
          steps={projObject?.pqpSteps}
        />
      )}
    </div>
  );
};
export default PQP;
