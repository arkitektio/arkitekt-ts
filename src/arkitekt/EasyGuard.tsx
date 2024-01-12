import { FaktsGuard } from "@jhnnsrs/fakts";
import { HerreGuard } from "@jhnnsrs/herre";
import { AppGuard } from "./AppGuard";

export type EasyGuardProps = {
  noAppFallback?: React.ReactNode;
  notConnectedFallback?: React.ReactNode;
  notLoggedInFallback?: React.ReactNode;
  children: React.ReactNode;
};

export const EasyGuard = ({
  noAppFallback = "App Unkonfigured",
  notConnectedFallback = "Not Connected",
  notLoggedInFallback = "Not Logged In",
  children,
}: EasyGuardProps) => {
  return (
    <AppGuard fallback={noAppFallback}>
      <FaktsGuard fallback={notConnectedFallback}>
        <HerreGuard fallback={notLoggedInFallback}>{children}</HerreGuard>
      </FaktsGuard>
    </AppGuard>
  );
};
