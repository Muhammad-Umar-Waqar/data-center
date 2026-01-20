import { createContext, useContext, useState } from "react";

const InstallationContext = createContext();

export const InstallationProvider = ({ children }) => {
  const [selectedDataCenter, setSelectedDataCenter] = useState(null);
  const [selectedHub, setSelectedHub] = useState(null);

  return (
    <InstallationContext.Provider
      value={{
        selectedDataCenter,
        setSelectedDataCenter,
        selectedHub,
        setSelectedHub,
      }}
    >
      {children}
    </InstallationContext.Provider>
  );
};

export const useInstallation = () => useContext(InstallationContext);
