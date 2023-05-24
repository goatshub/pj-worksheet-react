import { useEffect, useState } from "react";
import ProjectInfo from "./components/ProjectInfo";
import Spinner from "./components/Spinner";
import Alert from "./components/Alert";
import PQP from "./components/main/PQP";
import DesignReview from "./components/main/DesignReview";

export const App = () => {
  const [loading, setLoading] = useState(true); //for loading data from server
  const [error, setError] = useState(""); //for error from server
  const [projObject, setProjObject] = useState({}); //project data from server

  /**
   * {Object} projObject
   *
   * {string} projObject.projNo
   * {string} projObject.projName
   * {string} projObject.projStudio
   * {string} projObject.projStatus
   * {string} projObject.currentPhase
   * {string} projObject.projManager
   *
   * {string} projObject.pqpDotColor
   * {Object[]} projObject.pqpSteps
   *    {string} projObject.pqpSteps[].label
   *    {string} projObject.pqpSteps[].phase
   *    {boolean} projObject.pqpSteps[].isAtCurrentPhase
   *    {string} projObject.pqpSteps[].color
   *    {string} projObject.pqpSteps[].link
   * {string} projObject.pqpProjectLink
   * {boolean} projObject.isPqpNotRequired
   *
   * {string} projObject.drPortalLink
   * {string} projObject.drDotColor
   * {Object[]} projObject.drSteps
   *    {string} projObject.drSteps[].label
   *    {string} projObject.drSteps[].phase
   *    {boolean} projObject.drSteps[].isCurrentPhase
   *    {string} projObject.drSteps[].color
   *    {string} [projObject.drSteps[].link]
   *
   * {Object} projObject.isReviewNotRequired
   *    {boolean} isReviewNotRequired.value
   *    {string} isReviewNotRequired.reason
   */

  useEffect(() => {
    google.script.run
      .withSuccessHandler((data) => {
        setProjObject(data);
        setLoading(false);
      })
      .withFailureHandler((error) => {
        setError(error.message);
        setLoading(false);
      })
      .getProjectFromIntegrate("<?=projNo?>", "<?=studio?>");
  }, []);

  return (
    <div>
      {loading ? (
        <div className="grid h-screen place-items-center">
          <Spinner />
        </div>
      ) : error ? (
        <div className="grid h-screen place-items-center">
          <Alert message={error} />
        </div>
      ) : (
        <div className="container max-w-screen-xl mx-auto p-4 mt-4">
          <h1 className="text-4xl font-semibold text-center">
            dwp{" "}
            <span className="font-normal text-gray-500">| Project Status</span>
          </h1>
          <div className="grid grid-cols-1 divide-y divide-gray-400 my-8">
            <ProjectInfo projObject={projObject} />
            <PQP projObject={projObject} />
            <DesignReview projObject={projObject} />
          </div>
        </div>
      )}
    </div>
  );
};
