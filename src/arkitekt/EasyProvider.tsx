import { DatalayerProvider } from "@jhnnsrs/datalayer";
import { FaktsProvider } from "@jhnnsrs/fakts";
import { HerreProvider } from "@jhnnsrs/herre";
import { MikroProvider } from "@jhnnsrs/mikro";
import { FlussProvider } from "@jhnnsrs/fluss";
import {
  PostmanProvider,
  RekuestProvider,
  WidgetRegistryProvider,
} from "@jhnnsrs/rekuest";
import { Manifest } from "./AppContext";
import { AppProvider } from "./AppProvider";
import { PortProvider } from "@jhnnsrs/port";

export type EasyProviderProps = {
  manifest: Manifest;
  children: React.ReactNode;
};

export const EasyProvider = ({ manifest, children }: EasyProviderProps) => {
  return (
    <AppProvider manifest={manifest}>
      <FaktsProvider>
        <HerreProvider>
          <RekuestProvider>
            <FlussProvider>
              <PostmanProvider>
                <WidgetRegistryProvider>
                  <DatalayerProvider>
                    <MikroProvider>
                      <PortProvider>{children}</PortProvider>
                    </MikroProvider>
                  </DatalayerProvider>
                </WidgetRegistryProvider>
              </PostmanProvider>
            </FlussProvider>
          </RekuestProvider>
        </HerreProvider>
      </FaktsProvider>
    </AppProvider>
  );
};
