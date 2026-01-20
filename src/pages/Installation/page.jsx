// Installation/Installation.jsx

import { useState } from "react";
import DataCenterStep from "../steps/DataCenterStep";

import { InstallationProvider } from "../../contexts/InstallationContext";
import HubStep from "../steps/HubStep";

const STEPS = {
  DATACENTER: 0,
  HUB: 1,
};

const Installation = () => {
  const [activeStep, setActiveStep] = useState(STEPS.DATACENTER);

  return (
    <InstallationProvider>
      <div className="h-full w-full p-4">

        {/* Step content */}
        {activeStep === STEPS.DATACENTER && (
          <DataCenterStep onNext={() => setActiveStep(STEPS.HUB)} />
        )}

        {activeStep === STEPS.HUB && (
          <HubStep onBack={() => setActiveStep(STEPS.DATACENTER)} />
        )}

      </div>
    </InstallationProvider>
  );
};

export default Installation;
