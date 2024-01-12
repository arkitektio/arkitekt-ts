import React, { useEffect } from "react";
import { useFakts } from "@jhnnsrs/fakts";
import { useHerre } from "@jhnnsrs/herre";
import { PossibleTypesMap } from "@apollo/client";
import { useRekuest } from "@jhnnsrs/rekuest";

export type RekuestAutoConfigureProps = {
  possibleTypes?: PossibleTypesMap;
  key?: string;
};

export const RekuestAutoConfigure = ({
  possibleTypes,
  key = "rekuest",
}: RekuestAutoConfigureProps) => {
  const { configure } = useRekuest();
  const { token } = useHerre();
  const { fakts } = useFakts();

  useEffect(() => {
    let rekuest = fakts?.[key] as { [key: string]: any } | undefined;
    if (token && rekuest) {
      configure({
        secure: rekuest.secure,
        wsEndpointUrl: rekuest.ws_endpoint_url,
        endpointUrl: rekuest.endpoint_url,
        possibleTypes: possibleTypes,
        retrieveToken: () => token,
      });
    } else {
      configure();
    }
  }, [token, fakts]);

  return <> </>;
};
