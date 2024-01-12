import { PossibleTypesMap } from "@apollo/client";
import { useFakts } from "@jhnnsrs/fakts";
import { useFluss } from "@jhnnsrs/fluss";
import { useHerre } from "@jhnnsrs/herre";
import { useEffect } from "react";

export type FlussAutoConfigureProps = {
  possibleTypes?: PossibleTypesMap;
  key?: string;
};

export const FlussAutoConfigure = ({
  possibleTypes,
  key = "fluss",
}: FlussAutoConfigureProps) => {
  const { configure } = useFluss();
  const { token } = useHerre();
  const { fakts } = useFakts();

  useEffect(() => {
    let fluss = fakts?.[key] as { [key: string]: any } | undefined;
    if (token && fluss) {
      configure({
        secure: fluss.secure,
        wsEndpointUrl: fluss.ws_endpoint_url,
        endpointUrl: fluss.endpoint_url,
        possibleTypes: possibleTypes,
        retrieveToken: () => token,
      });
    } else {
      configure();
    }
  }, [token, fakts]);

  return <> </>;
};
