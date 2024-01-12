import React, { useEffect } from "react";
import { useFakts } from "@jhnnsrs/fakts";
import { useHerre } from "@jhnnsrs/herre";
import { PossibleTypesMap } from "@apollo/client";
import { usePort } from "@jhnnsrs/port";

export type PortAutoConfigureProps = {
  possibleTypes?: PossibleTypesMap;
  key?: string;
};

export const PortAutoConfigure = ({
  possibleTypes,
  key = "port",
}: PortAutoConfigureProps) => {
  const { configure } = usePort();
  const { token } = useHerre();
  const { fakts } = useFakts();

  useEffect(() => {
    let mikro = fakts?.[key] as { [key: string]: any } | undefined;
    if (token && mikro) {
      configure({
        secure: mikro.secure,
        wsEndpointUrl: mikro.ws_endpoint_url,
        endpointUrl: mikro.endpoint_url,
        possibleTypes: possibleTypes,
        retrieveToken: () => token,
      });
    } else {
      configure();
    }
  }, [token, fakts]);

  return <> </>;
};
