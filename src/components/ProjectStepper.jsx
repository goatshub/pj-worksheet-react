import * as React from "react";
import ChevronRightIcon from "../icons/ChevronRightIcon";
import MapPinIcon from "../icons/MapPinIcon";
import Tooltip from "./Tooltip";
import LinkedChildren from "./LinkedChildren";

const ProjectStepper = ({ currentPhase, steps = [] }) => {
  if (currentPhase === "")
    return <div className="text-center my-3">No project current phase</div>;
  if (steps.length === 0)
    return <div className="text-center my-3">No recorded data</div>;
  return (
    <div className="w-full h-36 overflow-x-auto">
      <div className="w-fit flex p-1">
        {steps.map((step, i) => {
          let dotColor = `${step.color}Dot`;
          return (
            <React.Fragment key={i}>
              {i > 0 && (
                <ChevronRightIcon className="h-6 w-6 text-gray-500 my-10" />
              )}
              <div className="w-16 flex flex-col items-center">
                <div className="h-10">
                  {step.isAtCurrentPhase && (
                    <Tooltip message="Current Phase">
                      <MapPinIcon className="h-7 w-7 text-gray-500" />
                    </Tooltip>
                  )}
                </div>
                <Tooltip message={step.tooltip}>
                  <LinkedChildren
                    to={step.link}
                    className={`font-bold text-neutral-200 rounded-full flex items-center justify-center font-mono hover:scale-110 circleSize ${dotColor}`}
                  >
                    <span className="text-sm">{step.phase}</span>
                  </LinkedChildren>
                </Tooltip>
                <div className="wrap text-center my-2 text-slate-500 leading-4">
                  {step.label.includes(" - ")
                    ? step.label.split(" ")[1]
                    : step.label}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectStepper;
