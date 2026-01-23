// src/components/InstallationStepper.jsx
import React from "react";
import { Check } from "lucide-react";

/**
 * InstallationStepper
 * props:
 *  - steps: array of labels, e.g. ["Data Center","Hub","Rack","AC Kit","Rack Cluster"]
 *  - activeStep: number (0-based)
 *  - onStepClick: optional function(index) -> called when user clicks a step that's <= activeStep (navigate back)
 */
export default function InstallationStepper({ steps = [], activeStep = 0, onStepClick }) {
  return (
    <div className="w-full mb-3 h-[10vh] md:h-[12vh] ">
      {/* container with horizontal scroll on small screens */}
      <div className="overflow-y-hidden overflow-x-auto  ">
        <div className="flex items-center w-full   sm:min-w-0 px-2 sm:px-0">
          {steps.map((label, idx) => {
            const completed = idx < activeStep;
            const current = idx === activeStep;

            return (
              <React.Fragment key={label + idx}>
                {/* step item */}
                <div className="flex flex-col items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof onStepClick === "function" && idx <= activeStep) onStepClick(idx);
                    }}
                    aria-current={current ? "step" : undefined}
                    aria-label={`Step ${idx + 1}: ${label}`}
                    className={`flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full
                      ${completed ? "bg-blue-600 text-white" : current ? "bg-white border-2 border-blue-600 text-blue-700" : "bg-white border border-gray-300 text-gray-600"}
                      transition-shadow shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    title={label}
                  >
                    {completed ? (
                      <Check size={15} className="pointer-events-none" />
                    ) : (
                      <span className="font-semibold select-none">{idx + 1}</span>
                    )}
                  </button>

                  {/* label (hidden on tiny screens) */}
                  <div className=" hidden md:block">
                    <div className={`text-xs  ${current ? "text-blue-700 font-semibold" : "text-gray-600"}`}>
                      {label}
                    </div>
                  </div>
                </div>

                {/* connector (skip after last) */}
                {idx !== steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-3 sm:mx-4 rounded-full w-full ${idx < activeStep ? "bg-blue-600" : "bg-gray-200"}`}
                    style={{ MaxWidth: 20}}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* mobile compact labels underneath — shows current step label on xs */}
      <div className="mt-2 md:hidden text-center">
        <div className="text-sm font-medium text-blue-700">{steps[activeStep]}</div>
        <div className="text-xs text-gray-500">{`${activeStep + 1} of ${steps.length}`}</div>
      </div>
    </div>
  );
}
