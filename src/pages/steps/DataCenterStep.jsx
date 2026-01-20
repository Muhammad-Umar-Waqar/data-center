// /DataCenterStep.jsx



import { useInstallation } from "../../contexts/InstallationContext";
import DataCenterManagement from "../OrganizationManagement/page";

const DataCenterStep = ({ onNext }) => {
  const { selectedDataCenter } = useInstallation();

  return (
    <div className="h-full flex flex-col">

      {/* Your existing page */}
      <div className="flex-1">
        <DataCenterManagement />
      </div>

      {/* Footer */}
      <div className="p-4 border-t flex justify-end">
        <button
          onClick={onNext}
          disabled={!selectedDataCenter}
          className={`px-6 py-2 rounded-md text-white ${
            selectedDataCenter
              ? "bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Next → Hubs
        </button>
      </div>
    </div>
  );
};

export default DataCenterStep;
