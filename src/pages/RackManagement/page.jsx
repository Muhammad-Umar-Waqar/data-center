// // src/pages/RackManagement/page.jsx
// import "../../styles/pages/management-pages.css";
// import AddRack from "./AddRack";
// import RackList from "./RackList";
// import { useInstallation } from "../../contexts/InstallationContext";

// const RackManagement = () => {
//   const { selectedHub, setSelectedHub, selectedDataCenter } = useInstallation();

//   const handleRackSelect = (rack) => {
//     // optional: track selected rack for editing later
//   };

//   const handleOutsideClick = () => {
//     setSelectedHub(null);
//   };

//   return (
//     <div
//       className="organization-management-container flex bg-white rounded-[20px] w-full h-full"
//       onClick={handleOutsideClick}
//     >
//       <div className="flex flex-col lg:flex-row h-full w-full">

//         <RackList />

//         <div className="hidden lg:block bg-[#E5E7EB]" />

//         <AddRack disabled={!selectedDataCenter || !selectedHub} />

//       </div>
//     </div>
//   );
// };

// export default RackManagement;






// src/pages/RackManagement/page.jsx
import "../../styles/pages/management-pages.css";
import AddRack from "./AddRack";
import RackList from "./RackList";
import { useInstallation } from "../../contexts/InstallationContext";

const RackManagement = () => {
  const { selectedRack, setSelectedRack, selectedDataCenter, selectedHub } = useInstallation();

  const handleRackSelect = (rack) => {
    setSelectedRack(rack); // optional: track selected rack for future editing
  };

  const handleOutsideClick = () => {
    setSelectedRack(null);
  };

  return (
    <div
      className="organization-management-container flex bg-white rounded-[20px] w-full h-full"
      onClick={handleOutsideClick}
    >
      <div className="flex flex-col lg:flex-row h-full w-full">

        {/* Rack List */}
        <RackList
          selectedRack={selectedRack}
          onRackSelect={handleRackSelect}
        />

        <div className="hidden lg:block bg-[#E5E7EB]" />

        {/* Add Rack Form */}
        <AddRack
          disabled={!selectedDataCenter || !selectedHub}
        />

      </div>
    </div>
  );
};

export default RackManagement;
