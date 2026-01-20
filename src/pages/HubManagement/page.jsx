// src/pages/HubManagement/page.jsx
import "../../styles/pages/management-pages.css";
import AddHub from "./AddHub";
import HubList from "./HubList";
import { useInstallation } from "../../contexts/InstallationContext";

const HubManagement = () => {
  const { selectedHub, setSelectedHub, selectedDataCenter } = useInstallation();

  const handleHubSelect = (hub) => {
    setSelectedHub(hub);
  };

  const handleOutsideClick = () => {
    setSelectedHub(null);
  };

  return (
    <div
      className="organization-management-container flex bg-white rounded-[20px] w-full h-full"
      onClick={handleOutsideClick}
    >
      <div className="flex flex-col lg:flex-row h-full w-full">

        <HubList
          selectedHub={selectedHub}
          onHubSelect={handleHubSelect}
        />

        <div className="hidden lg:block bg-[#E5E7EB]" />

        <AddHub disabled={!selectedDataCenter} />

      </div>
    </div>
  );
};

export default HubManagement;
