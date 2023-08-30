import { RekuestAutoConfigure } from "./RekuestAutoConfigure";
import { MikroAutoConfigure } from "./MikroAutoConfigure";
import { DatalayerAutoConfigure } from "./DatalayerAutoConfigure";
import { WellKnownDiscovery } from "@jhnnsrs/fakts";
import { MikroGuard } from "@jhnnsrs/mikro";
import { MikroWard } from "../wards/MikroWard";
import { RekuestGuard } from "@jhnnsrs/rekuest";
import { RekuestWard } from "../wards/RekuestWard";
import { PossibleTypesMap } from "@apollo/client";

export const AutoConfiguration = (props: {
  endpoints: string[];
  rekuestPossibleTypes: PossibleTypesMap;
  mikroPossibleTypes: PossibleTypesMap;
}) => {
  return (
    <>
      <RekuestAutoConfigure possibleTypes={props.rekuestPossibleTypes} />
      <MikroAutoConfigure possibleTypes={props.mikroPossibleTypes} />
      <DatalayerAutoConfigure />
      <WellKnownDiscovery endpoints={props.endpoints} />
      <MikroGuard>
        <MikroWard />
      </MikroGuard>
      <RekuestGuard>
        <RekuestWard />
      </RekuestGuard>
    </>
  );
};
