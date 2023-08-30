import { DatalayerProvider } from "@jhnnsrs/datalayer";
import { FaktsProvider } from "@jhnnsrs/fakts";
import { HerreProvider } from "@jhnnsrs/herre";
import { MikroProvider } from "@jhnnsrs/mikro";
import {
  PostmanProvider,
  RekuestProvider,
  WidgetRegistryProvider,
} from "@jhnnsrs/rekuest";
import { Manifest } from "./AppContext";
import { AppProvider } from "./AppProvider";

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
            <PostmanProvider>
              <WidgetRegistryProvider>
                <DatalayerProvider>
                  <MikroProvider>{children}</MikroProvider>
                </DatalayerProvider>
              </WidgetRegistryProvider>
            </PostmanProvider>
          </RekuestProvider>
        </HerreProvider>
      </FaktsProvider>
    </AppProvider>
  );
};
