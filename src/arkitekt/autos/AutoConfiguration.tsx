import {
  RekuestAutoConfigure,
  RekuestAutoConfigureProps,
} from "./RekuestAutoConfigure";
import {
  MikroAutoConfigure,
  MikroAutoConfigureProps,
} from "./MikroAutoConfigure";
import { DatalayerAutoConfigure } from "./DatalayerAutoConfigure";
import { WellKnownDiscovery } from "@jhnnsrs/fakts";
import { MikroGuard } from "@jhnnsrs/mikro";
import { MikroWard } from "../wards/MikroWard";
import { RekuestGuard } from "@jhnnsrs/rekuest";
import { RekuestWard } from "../wards/RekuestWard";
import {
  FlussAutoConfigure,
  FlussAutoConfigureProps,
} from "./FlussAutoConfigure";
import { PortAutoConfigure, PortAutoConfigureProps } from "./PortAutoConfigure";

export const AutoConfiguration = (props: {
  wellKnownEndpoints?: string[];
  rekuest?: RekuestAutoConfigureProps;
  mikro?: MikroAutoConfigureProps;
  fluss?: FlussAutoConfigureProps;
  port?: PortAutoConfigureProps;
}) => {
  return (
    <>
      <RekuestAutoConfigure {...props.rekuest} />
      <MikroAutoConfigure {...props.mikro} />
      <PortAutoConfigure {...props.port} />
      <FlussAutoConfigure {...props.fluss} />
      <DatalayerAutoConfigure />
      {props.wellKnownEndpoints && (
        <WellKnownDiscovery endpoints={props.wellKnownEndpoints} />
      )}
      <MikroGuard fallback={<></>}>
        <MikroWard />
      </MikroGuard>
      <RekuestGuard fallback={<></>}>
        <RekuestWard />
      </RekuestGuard>
    </>
  );
};
