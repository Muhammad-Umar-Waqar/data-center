// Installation/Installation.jsx

import { useState } from "react";
import DataCenterStep from "../steps/DataCenterStep";

import { InstallationProvider } from "../../contexts/InstallationContext";
import HubStep from "../steps/HubStep";
import RackStep from "../steps/RackStep";
import AcKitSteps from "../steps/AcKitStep";
import RackClusterStep from "../steps/RackClusterStep";

const STEPS = {
  DATACENTER: 0,
  HUB: 1,
  RACK: 2,
  ACKIT: 3,
  RACKCLUSTER: 4,
};

const Installation = () => {
  const [activeStep, setActiveStep] = useState(STEPS.DATACENTER);

  return (
    <InstallationProvider>
      <div className="h-full w-full p-4">

        {/* Step content */}
        {activeStep === STEPS.DATACENTER && (
          <DataCenterStep
           onNext={() => setActiveStep(STEPS.HUB)} 
           onBack={() => setActiveStep(STEPS.DATACENTER)}
           />
        )}

        {activeStep === STEPS.HUB && (
          <HubStep 
          onBack={() => setActiveStep(STEPS.DATACENTER)}
           onNext={() => setActiveStep(STEPS.RACK)} 
          />
        )}
     
        {activeStep === STEPS.RACK && (
          <RackStep
          onNext={() => setActiveStep(STEPS.ACKIT)} 
          onBack={() => setActiveStep(STEPS.HUB)} />
        )}
      
        {activeStep === STEPS.ACKIT && (
          <AcKitSteps
          onNext={() => setActiveStep(STEPS.RACKCLUSTER)} 
          onBack={() => setActiveStep(STEPS.RACK)} />
        )}
        
        {activeStep === STEPS.RACKCLUSTER && (
          <RackClusterStep
          onBack={() => setActiveStep(STEPS.ACKIT)} />
        )}
        
      </div>
    </InstallationProvider>
  );
};

export default Installation;


