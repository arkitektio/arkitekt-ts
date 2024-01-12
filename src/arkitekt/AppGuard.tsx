import React from "react";
import { useApp } from "./AppContext";

export const AppGuard: React.FC<{
  key?: string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}> = ({ key, children, fallback }) => {
  const { manifest } = useApp();

  if (manifest) return <>{children}</>;

  return <>{fallback}</>;
};

export const appGuarded = <T extends {}>(
  Child: React.ComponentType<T>,
  fallback?: React.ReactNode,
) => {
  return (props: T) => (
    <AppGuard fallback={fallback}>
      <Child {...props} />
    </AppGuard>
  );
};
