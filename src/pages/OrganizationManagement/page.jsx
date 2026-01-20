// // export default DataCenterManagement;
// import { useState } from 'react';
// import "../../styles/pages/management-pages.css"
// import AddDataCenter from './AddDataCenter';
// import DataCenterList from './DataCenterList';

// const DataCenterManagement = () => {
//   // const [selectedOrganization, setSelectedOrganization] = useState(null);
//   const [selectedDataCenter, setSelectedDataCenter] = useState(null);

//   const handleDataCenterSelect = (organization) => {
//     setSelectedDataCenter(organization);
//   };

//   const handleOutsideClick = () => {
//     setSelectedDataCenter(null);
//   };

//   return (
//     <div 
//       className="MobileBackgroundChange organization-management-container md:h-full flex bg-white rounded-[20px] w-full h-full"
//       onClick={handleOutsideClick}
//     >
//       <div className="md:p-none p-[1rem]  flex flex-col lg:flex-row gap-2 lg:gap-0 h-full w-full rounded-[20px]  ">
//         <DataCenterList className="ListPage organization-list-section"
//           onDataCenterSelect={handleDataCenterSelect} 
//           selectedDataCenter={selectedDataCenter} 
//         />
//         {/* Center Divider */}
//         <div className="hidden lg:block  bg-[#E5E7EB]"></div>
        
//         {/* <AddOrganization className="AddPage organization-add-section" /> */}
//         <AddDataCenter className="AddPage organization-add-section"  />
//       </div>
//     </div>
//   );
// };

// export default DataCenterManagement;




// import { useState } from 'react';
// import "../../styles/pages/management-pages.css"
// import AddDataCenter from './AddDataCenter';
// import DataCenterList from './DataCenterList';

// const DataCenterManagement = () => {

//   const [selectedDataCenter, setSelectedDataCenter] = useState(null);

//   const handleDataCenterSelect = (organization) => {
//     setSelectedDataCenter(organization);
//   };

//   const handleOutsideClick = () => {
//     setSelectedDataCenter(null);
//   };

//   return (
//     <div 
//       className="MobileBackgroundChange organization-management-container md:h-full flex bg-white rounded-[20px] w-full h-full"
//       onClick={handleOutsideClick}
//     >
//       <div className="md:p-none p-[1rem]  flex flex-col lg:flex-row gap-2 lg:gap-0 h-full w-full rounded-[20px]  ">
//         <DataCenterList className="ListPage organization-list-section"
//           onDataCenterSelect={handleDataCenterSelect} 
//           selectedDataCenter={selectedDataCenter} 
//         />

//         <div className="hidden lg:block  bg-[#E5E7EB]"></div>
        
        
//         <AddDataCenter className="AddPage organization-add-section"  />
//       </div>
//     </div>
//   );
// };

// export default DataCenterManagement;







import "../../styles/pages/management-pages.css";
import AddDataCenter from "./AddDataCenter";
import DataCenterList from "./DataCenterList";
import { useInstallation } from "../../contexts/InstallationContext";


const DataCenterManagement = () => {
  const { selectedDataCenter, setSelectedDataCenter } = useInstallation();

  const handleDataCenterSelect = (dc) => {
    setSelectedDataCenter(dc);
  };

  const handleOutsideClick = () => {
    setSelectedDataCenter(null);
  };

  return (
    <div
      className="organization-management-container flex bg-white rounded-[20px] w-full h-full"
      onClick={handleOutsideClick}
    >
      <div className="flex flex-col lg:flex-row h-full w-full">

        <DataCenterList
          onDataCenterSelect={handleDataCenterSelect}
          selectedDataCenter={selectedDataCenter}
        />

        <div className="hidden lg:block bg-[#E5E7EB]" />

        <AddDataCenter />

      </div>
    </div>
  );
};

export default DataCenterManagement;
