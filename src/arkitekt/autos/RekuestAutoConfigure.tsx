import React, { useEffect } from "react";
import { useFakts } from "@jhnnsrs/fakts";
import { useHerre } from "@jhnnsrs/herre";
import { PossibleTypesMap } from "@apollo/client";
import { useRekuest } from "@jhnnsrs/rekuest";

export type RekuestAutoConfigureProps = {
  possibleTypes?: PossibleTypesMap;
};

export const RekuestAutoConfigure = (props: RekuestAutoConfigureProps) => {
  const { configure } = useRekuest();
  const { token } = useHerre();
  const { fakts } = useFakts();

  useEffect(() => {
    if (token && fakts.rekuest) {
      configure({
        secure: fakts.rekuest.secure,
        wsEndpointUrl: fakts.rekuest.ws_endpoint_url,
        endpointUrl: fakts.rekuest.endpoint_url,
        possibleTypes: props.possibleTypes,
        retrieveToken: () => token,
      });
    }
  }, [token, fakts]);

  return <> </>;
};
