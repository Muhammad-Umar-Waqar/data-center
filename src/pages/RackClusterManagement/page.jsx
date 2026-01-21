// src/pages/RackClusterManagement/page.jsx
import "../../styles/pages/management-pages.css";
import AddRackCluster from "./AddRackCluster";
import RackClusterList from "./RackClusterList";
import { useInstallation } from "../../contexts/InstallationContext";

const RackClusterManagement = () => {
  const { selectedAcKit, setSelectedAcKit } = useInstallation();

  const handleClusterSelect = (cluster) => {
    setSelectedAcKit(cluster);
  };

  const handleOutsideClick = () => {
    setSelectedAcKit(null);
  };

  return (
    <div
      className="organization-management-container flex bg-white rounded-[20px] w-full h-full"
      onClick={handleOutsideClick}
    >
      <div className="flex flex-col lg:flex-row h-full w-full">

        <RackClusterList
          selectedCluster={selectedAcKit}
          onClusterSelect={handleClusterSelect}
        />

        <div className="hidden lg:block bg-[#E5E7EB]" />

        <AddRackCluster />

      </div>
    </div>
  );
};

export default RackClusterManagement;
