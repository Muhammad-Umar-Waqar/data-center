import { createContext, useContext, useState } from "react";

const InstallationContext = createContext();

export const InstallationProvider = ({ children }) => {
  const [selectedDataCenter, setSelectedDataCenter] = useState(null);
  const [selectedHub, setSelectedHub] = useState(null);
  const [selectedRack, setSelectedRack] = useState(null);
  const [selectedAcKit, setSelectedAcKit] = useState(null);

  console.log(selectedDataCenter," + " , selectedHub," + ", selectedRack ," + ",selectedAcKit)

  return (
    <InstallationContext.Provider
      value={{
        selectedDataCenter,
        setSelectedDataCenter,
        selectedHub,
        setSelectedHub,
        selectedRack,
        setSelectedRack,
        selectedAcKit,
        setSelectedAcKit,
      }}
    >
      {children}
    </InstallationContext.Provider>
  );
};

export const useInstallation = () => useContext(InstallationContext);
