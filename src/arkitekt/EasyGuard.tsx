import { FaktsGuard } from "@jhnnsrs/fakts";
import {
  ConnectButtons,
  ConnectButtonsProps,
} from "./components/ConnectButtons";
import { LoginButton, LoginButtonProps } from "./components/LoginButton";
import { HerreGuard } from "@jhnnsrs/herre";
import { AppGuard } from "./AppGuard";

export type EasyGuardProps = {
  noAppFallback?: React.ReactNode;
  loginButtonProps?: LoginButtonProps;
  connectButtonProps?: ConnectButtonsProps;
  children: React.ReactNode;
};

export const EasyGuard = ({
  noAppFallback = "App Unkonfigured",
  loginButtonProps,
  connectButtonProps,
  children,
}: EasyGuardProps) => {
  return (
    <AppGuard fallback={noAppFallback}>
      <FaktsGuard fallback={<ConnectButtons {...connectButtonProps} />}>
        <HerreGuard fallback={<LoginButton {...loginButtonProps} />}>
          {children}
        </HerreGuard>
      </FaktsGuard>
    </AppGuard>
  );
};
