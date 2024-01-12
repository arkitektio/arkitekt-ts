import { DatalayerProps, DatalayerProvider } from "@jhnnsrs/datalayer";
import {
  FaktsProps,
  FaktsProvider,
  buildFailsafeDemander,
  buildRemoteGrant,
  demandDeviceToken,
  demandRetrieve,
} from "@jhnnsrs/fakts";
import { HerreProps, HerreProvider } from "@jhnnsrs/herre";
import { MikroProps, MikroProvider } from "@jhnnsrs/mikro";
import { FlussProvider, FlussProviderProps } from "@jhnnsrs/fluss";
import {
  PostmanProvider,
  PostmanProviderProps,
  RekuestProps,
  RekuestProvider,
  WidgetRegistryProvider,
  WidgetRegistryProviderProps,
} from "@jhnnsrs/rekuest";
import { Manifest } from "./AppContext";
import { AppProvider } from "./AppProvider";
import { PortProvider, PortProps } from "@jhnnsrs/port";

export type EasyProviderProps = {
  manifest: Manifest;
  children: React.ReactNode;
  faktsProps?: Partial<FaktsProps>;
  herreProps?: Partial<HerreProps>;
  portProps?: Partial<PortProps>;
  rekuestProps?: Partial<RekuestProps>;
  mikroProps?: Partial<MikroProps>;
  flussProps?: Partial<FlussProviderProps>;
  postmanProps?: Partial<PostmanProviderProps>;
  widgetRegistryProps?: Partial<WidgetRegistryProviderProps>;
  datalayerProps?: Partial<DatalayerProps>;
};

export const defaultFaktProps: Partial<FaktsProps> = {
  grant: buildRemoteGrant({
    demand: buildFailsafeDemander(demandRetrieve, demandDeviceToken),
  }),
};

export const defaultHerreProps: Partial<HerreProps> = {};

export const EasyProvider = ({
  manifest,
  children,
  faktsProps = defaultFaktProps,
  herreProps = defaultHerreProps,
  rekuestProps = {},
  mikroProps = {},
  flussProps = {},
  postmanProps = {},
  widgetRegistryProps = {},
  datalayerProps = {},
  portProps = {},
}: EasyProviderProps) => {
  return (
    <AppProvider manifest={manifest}>
      <FaktsProvider {...faktsProps}>
        <HerreProvider {...herreProps}>
          <RekuestProvider {...rekuestProps}>
            <FlussProvider {...flussProps}>
              <PortProvider {...portProps}>
                <PostmanProvider {...postmanProps}>
                  <WidgetRegistryProvider {...widgetRegistryProps}>
                    <DatalayerProvider {...datalayerProps}>
                      <MikroProvider {...mikroProps}>{children}</MikroProvider>
                    </DatalayerProvider>
                  </WidgetRegistryProvider>
                </PostmanProvider>
              </PortProvider>
            </FlussProvider>
          </RekuestProvider>
        </HerreProvider>
      </FaktsProvider>
    </AppProvider>
  );
};
