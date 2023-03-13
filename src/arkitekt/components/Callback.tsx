import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useHerre } from "@jhnnsrs/herre";

export interface CallbackProps {
  children?: React.ReactNode;
  autoClose?: boolean;
}

export const Callback: React.FC<CallbackProps> = ({ children, autoClose }) => {
  const [params, setParams] = useSearchParams();
  const { setCode } = useHerre();

  useEffect(() => {
    let code = params.get("code");
    if (code) {
      setCode(code);
      if (autoClose) {
        window.close();
      }
    }
  }, []);

  return <>{children || "Signing in....."}</>;
};
