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
import { DocumentNode } from "graphql";

export type DatalayerAutoConfigureProps = {
  requestDocument?: DocumentNode;
  presignDocument?: DocumentNode;
};

export const DatalayerAutoConfigure: React.FC<{}> = ({
  requestDocument = RequestDocument,
  presignDocument = PresignDocument,
}: DatalayerAutoConfigureProps) => {
  const { client } = useMikro();
  const { fakts } = useFakts();
  const { configure } = useDatalayer();

  useEffect(() => {
    let minio = fakts?.minio as { [key: string]: any } | undefined;
    if (client && minio) {
      configure({
        endpointUrl: minio.endpoint_url,
        credentialsRetriever: async () => {
          let x = await client.query<RequestQuery>({
            query: requestDocument,
            variables: {},
          });
          if (!x.data.request) {
            throw Error("No request found");
          }
          return x.data.request;
        },
        presign: async (key: string) => {
          let x = await client.mutate<PresignMutation>({
            mutation: presignDocument,
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
  }, [client, requestDocument, presignDocument, fakts]);

  return <> </>;
};
