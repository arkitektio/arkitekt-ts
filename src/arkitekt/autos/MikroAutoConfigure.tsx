import React, { useEffect } from "react";
import { useFakts } from "@jhnnsrs/fakts";
import { useHerre } from "@jhnnsrs/herre";
import { useMikro } from "@jhnnsrs/mikro";
import { PossibleTypesMap } from "@apollo/client";

export type MikroAutoConfigureProps = {
  possibleTypes?: PossibleTypesMap;
};

export const MikroAutoConfigure = (props: MikroAutoConfigureProps) => {
  const { configure } = useMikro();
  const { token } = useHerre();
  const { fakts } = useFakts();

  useEffect(() => {
    if (token && fakts.mikro) {
      configure({
        secure: fakts.mikro.secure,
        wsEndpointUrl: fakts.mikro.ws_endpoint_url,
        endpointUrl: fakts.mikro.endpoint_url,
        possibleTypes: props.possibleTypes,
        retrieveToken: () => token,
      });
    }
  }, [token, fakts]);

  return <> </>;
};
