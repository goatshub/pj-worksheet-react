import Badge from "../Badge";
import ProjectStepper from "../ProjectStepper";

const DesignReview = ({ projObject = {} }) => {
  return (
    <div className="px-1 py-3">
      <div className="flex justify-between">
        <div className="flex">
          <h1 className="text-xl font-bold ">Design Review</h1>
          {projObject.drPortalLink && (
            <a
              href={projObject.drPortalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg mx-2 py-0.5 px-2 drop-shadow-sm bg-blue-100 hover:ring-2 hover:cursor-pointer text-blue-800 dark:text-blue-600 hover:underline"
            >
              Design Portal
            </a>
          )}
          <a
            href="https://script.google.com/a/macros/dwp.com/s/AKfycbykM4eDfBy-T9oWmmi-iZK0rmWh3VkWgb6jf7K_KoYfdaR-rPyM/exec"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg mx-2 py-0.5 px-2 drop-shadow-sm bg-blue-100 hover:ring-2 hover:cursor-pointer text-blue-800 dark:text-blue-600 hover:underline"
          >
            booking form
          </a>
          <span className="text-gray-500 mx-2">
            Required phases: A, C1, C2, C3, D
          </span>
        </div>

        <div className="flex gap-2 content-center">
          <span className="text-gray-500">Project status: </span>
          <Badge
            color={projObject?.drDotColor}
            message={projObject?.drDotColor}
          />
        </div>
      </div>
      {projObject?.isReviewNotRequired?.value ? (
        <div className="text-center my-2 md:px-5">
          Project design review is not required. <br />
          <b>Reason:</b> {projObject?.isReviewNotRequired.reason}
        </div>
      ) : (
        <ProjectStepper
          currentPhase={projObject?.currentPhase}
          steps={projObject?.drSteps}
        />
      )}
    </div>
  );
};
export default DesignReview;
