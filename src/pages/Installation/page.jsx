// // Installation/Installation.jsx

// import { useState } from "react";
// import DataCenterStep from "../steps/DataCenterStep";

// import { InstallationProvider } from "../../contexts/InstallationContext";
// import HubStep from "../steps/HubStep";
// import RackStep from "../steps/RackStep";
// import AcKitSteps from "../steps/AcKitStep";
// import RackClusterStep from "../steps/RackClusterStep";

// const STEPS = {
//   DATACENTER: 0,
//   HUB: 1,
//   RACK: 2,
//   ACKIT: 3,
//   RACKCLUSTER: 4,
// };

// const Installation = () => {
//   const [activeStep, setActiveStep] = useState(STEPS.DATACENTER);

//   return (
//     <InstallationProvider>
//       <div className="h-full w-full p-4">

//         {/* Step content */}
//         {activeStep === STEPS.DATACENTER && (
//           <DataCenterStep
//            onNext={() => setActiveStep(STEPS.HUB)} 
//            onBack={() => setActiveStep(STEPS.DATACENTER)}
//            />
//         )}

//         {activeStep === STEPS.HUB && (
//           <HubStep 
//           onBack={() => setActiveStep(STEPS.DATACENTER)}
//            onNext={() => setActiveStep(STEPS.RACK)} 
//           />
//         )}
     
//         {activeStep === STEPS.RACK && (
//           <RackStep
//           onNext={() => setActiveStep(STEPS.ACKIT)} 
//           onBack={() => setActiveStep(STEPS.HUB)} />
//         )}
      
//         {activeStep === STEPS.ACKIT && (
//           <AcKitSteps
//           onNext={() => setActiveStep(STEPS.RACKCLUSTER)} 
//           onBack={() => setActiveStep(STEPS.RACK)} />
//         )}
        
//         {activeStep === STEPS.RACKCLUSTER && (
//           <RackClusterStep
//           onBack={() => setActiveStep(STEPS.ACKIT)} />
//         )}
        
//       </div>
//     </InstallationProvider>
//   );
// };

// export default Installation;






// // src/pages/Installation/Installation.jsx  (or wherever your Installation component is)
// import { useState } from "react";
// import InstallationStepper from "../../components/InstallationStepper"; // <-- import
// import DataCenterStep from "../steps/DataCenterStep";
// import HubStep from "../steps/HubStep";
// import RackStep from "../steps/RackStep";
// import AcKitSteps from "../steps/AcKitStep";
// import RackClusterStep from "../steps/RackClusterStep";
// import { InstallationProvider } from "../../contexts/InstallationContext";

// const STEPS = {
//   DATACENTER: 0,
//   HUB: 1,
//   RACK: 2,
//   ACKIT: 3,
//   RACKCLUSTER: 4,
// };

// const labels = ["Data Center", "Hub", "Rack", "AC Kit", "Rack Cluster"];

// const Installation = () => {
//   const [activeStep, setActiveStep] = useState(STEPS.DATACENTER);

//   return (
//     <InstallationProvider>
//       <div className="h-[66vh] md:h-[88vh] w-full  p-4">
//         {/* Stepper */}
//         <InstallationStepper
//           steps={labels}
//           activeStep={activeStep}
//           onStepClick={(idx) => {
//             // allow going back only (prevent skipping ahead)
//             if (idx <= activeStep) setActiveStep(idx);
//           }}
//         />

//         {/* Step content */}
//         {activeStep === STEPS.DATACENTER && (
//           <DataCenterStep
//             onNext={() => setActiveStep(STEPS.HUB)}
//             onBack={() => setActiveStep(STEPS.DATACENTER)}
//           />
//         )}

//         {activeStep === STEPS.HUB && (
//           <HubStep
//             onBack={() => setActiveStep(STEPS.DATACENTER)}
//             onNext={() => setActiveStep(STEPS.RACK)}
//           />
//         )}

//         {activeStep === STEPS.RACK && (
//           <RackStep
//             onNext={() => setActiveStep(STEPS.ACKIT)}
//             onBack={() => setActiveStep(STEPS.HUB)}
//           />
//         )}

//         {activeStep === STEPS.ACKIT && (
//           <AcKitSteps
//             onNext={() => setActiveStep(STEPS.RACKCLUSTER)}
//             onBack={() => setActiveStep(STEPS.RACK)}
//           />
//         )}


//         {activeStep === STEPS.RACKCLUSTER && (
//           <RackClusterStep
//             onBack={() => setActiveStep(STEPS.ACKIT)}
//             onFinish={() => {
//               // final action after creating/selecting a rack cluster
//               // you might want to close the modal, redirect, or show a summary
//               console.log("Installation finished (rack cluster selected).");
//               // optional: reset installation context or navigate away
//             }} />
//         )}
//         {/* {activeStep === STEPS.RACKCLUSTER && (
//           <RackClusterStep onBack={() => setActiveStep(STEPS.ACKIT)} />
//         )} */}

        
//       </div>
//     </InstallationProvider>
//   );
// };

// export default Installation;



// // trying one more thing to acheive max height on list properly
// // src/pages/Installation/Installation.jsx  (or wherever your Installation component is)
// import { useState } from "react";
// import InstallationStepper from "../../components/InstallationStepper"; // <-- import
// import DataCenterStep from "../steps/DataCenterStep";
// import HubStep from "../steps/HubStep";
// import RackStep from "../steps/RackStep";
// import AcKitSteps from "../steps/AcKitStep";
// import RackClusterStep from "../steps/RackClusterStep";
// import { InstallationProvider } from "../../contexts/InstallationContext";

// const STEPS = {
//   DATACENTER: 0,
//   HUB: 1,
//   RACK: 2,
//   ACKIT: 3,
//   RACKCLUSTER: 4,
// };

// const labels = ["Data Center", "Hub", "Rack", "AC Kit", "Rack Cluster"];

// const Installation = () => {
//   const [activeStep, setActiveStep] = useState(STEPS.DATACENTER);

//   return (
//     <InstallationProvider>
//       <div className=" w-full p-4 ">
//         {/* Stepper */}
//         <InstallationStepper
//           steps={labels}
//           activeStep={activeStep}
//           onStepClick={(idx) => {
//             // allow going back only (prevent skipping ahead)
//             if (idx <= activeStep) setActiveStep(idx);
//           }}
//         />
//         <div className="h-[60vh]">
        
    
//         {/* Step content */}
//         {activeStep === STEPS.DATACENTER && (
//           <DataCenterStep
//             onNext={() => setActiveStep(STEPS.HUB)}
//             onBack={() => setActiveStep(STEPS.DATACENTER)}
//           />
//         )}

//         {activeStep === STEPS.HUB && (
//           <HubStep
//             onBack={() => setActiveStep(STEPS.DATACENTER)}
//             onNext={() => setActiveStep(STEPS.RACK)}
//           />
//         )}

//         {activeStep === STEPS.RACK && (
//           <RackStep
//             onNext={() => setActiveStep(STEPS.ACKIT)}
//             onBack={() => setActiveStep(STEPS.HUB)}
//           />
//         )}

//         {activeStep === STEPS.ACKIT && (
//           <AcKitSteps
//             onNext={() => setActiveStep(STEPS.RACKCLUSTER)}
//             onBack={() => setActiveStep(STEPS.RACK)}
//           />
//         )}


//         {activeStep === STEPS.RACKCLUSTER && (
//           <RackClusterStep
//             onBack={() => setActiveStep(STEPS.ACKIT)}
//             onFinish={() => {
//               // final action after creating/selecting a rack cluster
//               // you might want to close the modal, redirect, or show a summary
//               console.log("Installation finished (rack cluster selected).");
//               // optional: reset installation context or navigate away
//             }} />
//         )}
//         {/* {activeStep === STEPS.RACKCLUSTER && (
//           <RackClusterStep onBack={() => setActiveStep(STEPS.ACKIT)} />
//         )} */}

//             </div>
//       </div>
//     </InstallationProvider>
//   );
// };

// export default Installation;


// Trying to fix the height
// trying one more thing to acheive max height on list properly
// src/pages/Installation/Installation.jsx  (or wherever your Installation component is)
import { useState } from "react";
import InstallationStepper from "../../components/InstallationStepper"; // <-- import
import DataCenterStep from "../steps/DataCenterStep";
import HubStep from "../steps/HubStep";
import RackStep from "../steps/RackStep";
import AcKitSteps from "../steps/AcKitStep";
import RackClusterStep from "../steps/RackClusterStep";
import { InstallationProvider } from "../../contexts/InstallationContext";

const STEPS = {
  DATACENTER: 0,
  HUB: 1,
  RACK: 2,
  ACKIT: 3,
  RACKCLUSTER: 4,
};

const labels = ["Data Center", "Hub", "Rack", "AC Kit", "Rack Cluster"];

const Installation = () => {
  const [activeStep, setActiveStep] = useState(STEPS.DATACENTER);

  return (
    <InstallationProvider>
      {/* root container fills parent (App) */}
      <div className=" h-[85vh] w-full p-4 flex flex-col h-full">
        <InstallationStepper
          steps={labels}
          activeStep={activeStep}
          onStepClick={(idx) => { if (idx <= activeStep) setActiveStep(idx); }}
        />

        {/* content area takes remaining height (100vh - 15vh) */}
        {/* <div className="flex-1  overflow-hidden"> */}
        <div className="flex-1  flex flex-col mt-2 min-h-0">
          {/* make the active step a full-height flex column */}
          <div className="h-full">
            {activeStep === STEPS.DATACENTER && (
              <DataCenterStep onNext={() => setActiveStep(STEPS.HUB)} onBack={() => setActiveStep(STEPS.DATACENTER)} />
            )}
            {activeStep === STEPS.HUB && (
              <HubStep onBack={() => setActiveStep(STEPS.DATACENTER)} onNext={() => setActiveStep(STEPS.RACK)} />
            )}
            {activeStep === STEPS.RACK && (
              <RackStep onNext={() => setActiveStep(STEPS.ACKIT)} onBack={() => setActiveStep(STEPS.HUB)} />
            )}
            {activeStep === STEPS.ACKIT && (
              <AcKitSteps onNext={() => setActiveStep(STEPS.RACKCLUSTER)} onBack={() => setActiveStep(STEPS.RACK)} />
            )}
            {activeStep === STEPS.RACKCLUSTER && (
              <RackClusterStep onBack={() => setActiveStep(STEPS.ACKIT)} />
            )}
          </div>
        </div>
      </div>
    </InstallationProvider>
  );
};


export default Installation;
