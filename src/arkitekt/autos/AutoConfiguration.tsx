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
} from "./FlussAutoConfgiure";

export const AutoConfiguration = (props: {
  wellKnownEndpoints?: string[];
  rekuest?: RekuestAutoConfigureProps;
  mikro?: MikroAutoConfigureProps;
  fluss?: FlussAutoConfigureProps;
}) => {
  return (
    <>
      <RekuestAutoConfigure {...props.rekuest} />
      <MikroAutoConfigure {...props.mikro} />
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
