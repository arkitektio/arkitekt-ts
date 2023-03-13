import { Manifest } from "./AppContext";
import { AppProvider } from "./AppProvider";
import { FaktsProvider } from "@jhnnsrs/fakts";
import { HerreProvider } from "@jhnnsrs/herre";
import { MikroProvider } from "@jhnnsrs/mikro";
import { MikroAutoConfigure } from "./autos/MikroAutoConfigure";
import { DatalayerProvider } from "@jhnnsrs/datalayer";
import { DatalayerAutoConfigure } from "./autos/DatalayerAutoConfigure";

export type EasyProviderProps = {
  manifest: Manifest;
  children: React.ReactNode;
};

export const EasyProvider = ({ manifest, children }: EasyProviderProps) => {
  return (
    <AppProvider manifest={manifest}>
      <FaktsProvider>
        <HerreProvider>
          <DatalayerProvider>
            <MikroProvider>
              <MikroAutoConfigure />
              <DatalayerAutoConfigure />

              {children}
            </MikroProvider>
          </DatalayerProvider>
        </HerreProvider>
      </FaktsProvider>
    </AppProvider>
  );
};
