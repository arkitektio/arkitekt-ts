import { useState } from "react";
import { AppContext, Manifest } from "./AppContext";

export type AppProviderProps = {
  manifest: Manifest;
  children: React.ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({
  manifest,
  children,
}) => {
  return (
    <AppContext.Provider
      value={{
        manifest,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
