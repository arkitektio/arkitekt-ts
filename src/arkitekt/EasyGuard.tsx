import { FaktsGuard } from "@jhnnsrs/fakts";
import {
  KonfigureButtonProps,
  KonfigureButtons,
} from "./components/KonfigureButtons";
import { LoginButton, LoginButtonProps } from "./components/LoginButton";
import { HerreGuard } from "@jhnnsrs/herre";
import { AppGuard } from "./AppGuard";

export type EasyGuardProps = {
  loginButtonProps?: LoginButtonProps;
  konfigureButtonProps?: KonfigureButtonProps;
  children: React.ReactNode;
};

export const EasyGuard = ({
  loginButtonProps,
  konfigureButtonProps,
  children,
}: EasyGuardProps) => {
  return (
    <AppGuard fallback={<>App Unkonfigured</>}>
      <FaktsGuard fallback={<KonfigureButtons {...konfigureButtonProps} />}>
        <HerreGuard fallback={<LoginButton {...loginButtonProps} />}>
          {children}
        </HerreGuard>
      </FaktsGuard>
    </AppGuard>
  );
};
