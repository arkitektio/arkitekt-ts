import { useDatalayer } from "@jhnnsrs/datalayer";
import { useFakts } from "@jhnnsrs/fakts";
import { useMikro } from "@jhnnsrs/mikro";
import React, { useEffect } from "react";
import {
  PresignDocument,
  PresignMutation,
  RequestDocument,
  RequestQuery,
} from "../api/mikro/graphql";

export const DatalayerAutoConfigure: React.FC<{}> = (props) => {
  const { client } = useMikro();
  const { fakts } = useFakts();
  const { configure } = useDatalayer();

  useEffect(() => {
    if (client) {
      configure({
        endpointUrl: fakts.minio.endpoint_url,
        credentialsRetriever: async () => {
          let x = await client.query<RequestQuery>({
            query: RequestDocument,
            variables: {},
          });
          if (!x.data.request) {
            throw Error("No request found");
          }
          return x.data.request;
        },
        presign: async (key: string) => {
          let x = await client.mutate<PresignMutation>({
            mutation: PresignDocument,
            variables: {
              file: key,
            },
          });
          if (!x.data?.presign) {
            throw Error("No request found");
          }
          return x.data.presign;
        },
      });
    }
  }, [client]);

  return <> </>;
};
