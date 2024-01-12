import React, { useEffect } from "react";
import { useFakts } from "@jhnnsrs/fakts";
import { useHerre } from "@jhnnsrs/herre";
import { useMikro } from "@jhnnsrs/mikro";
import { PossibleTypesMap } from "@apollo/client";

export type MikroAutoConfigureProps = {
  possibleTypes?: PossibleTypesMap;
  key?: string;
};

export const MikroAutoConfigure = ({
  possibleTypes,
  key = "mikro",
}: MikroAutoConfigureProps) => {
  const { configure } = useMikro();
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
