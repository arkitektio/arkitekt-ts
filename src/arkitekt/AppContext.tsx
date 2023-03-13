import React, { useContext } from "react";

export type Manifest = {
  version: string;
  identifier: string;
};

export type AppContextType = {
  manifest: Manifest;
};

export const AppContext = React.createContext<AppContextType>({
  manifest: {
    version: "0.0.0",
    identifier: "unknown",
  },
});

export const useApp = () => useContext(AppContext);
