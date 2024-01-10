import React, { useContext } from "react";

export type Manifest = {
  version: string;
  identifier: string;
  scopes: string[];
};

export type AppContextType = {
  manifest: Manifest;
};

export const AppContext = React.createContext<AppContextType>({
  manifest: {
    version: "0.0.0",
    identifier: "unknown",
    scopes: ["openid"]
  },
});

export const useApp = () => useContext(AppContext);
