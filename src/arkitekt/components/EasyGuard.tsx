import { DatalayerGuard } from "@jhnnsrs/datalayer";
import { FaktsGuard } from "@jhnnsrs/fakts";
import { HerreGuard } from "@jhnnsrs/herre";
import { MikroGuard } from "@jhnnsrs/mikro";
import { KonfigureForm } from "./KonfigureForm";
import { LoginButton } from "./LoginButton";

export type EasyGuardProps = {
  children: React.ReactNode;
};

export const EasyGuard = ({ children }: EasyGuardProps) => {
  return (
    <FaktsGuard fallback={<KonfigureForm />}>
      <HerreGuard fallback={<LoginButton />}>
        <DatalayerGuard fallback={<> Datalayer not configured</>}>
          <MikroGuard fallback={<> Mikro is not yet configured</>}>
            {children}
          </MikroGuard>
        </DatalayerGuard>
      </HerreGuard>
    </FaktsGuard>
  );
};
