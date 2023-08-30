import { gql } from "@apollo/client";
import { useDatalayer } from "@jhnnsrs/datalayer";
import { useMikro, withMikro } from "@jhnnsrs/mikro";
import { useWidgetRegistry } from "@jhnnsrs/rekuest";
import React, { useEffect } from "react";

export const MikroWard: React.FC<{
  key?: string;
  fallback?: React.ReactNode;
}> = ({ key, fallback }) => {
  const { client } = useMikro();
  const { registry } = useWidgetRegistry();
  const { s3resolve } = useDatalayer();

  useEffect(() => {
    if (client) {
      const runFunc = async (options: { query: string; variables: any }) => {
        let document = gql(options.query);
        let result = await client.query({
          query: document,
          variables: options.variables,
        });

        if (result.errors) {
          throw new Error(result.errors[0].message);
        }

        if (result.data.options) {
          let options = result.data.options;
          return options;
        }

        throw new Error("No options found");
      };

      return registry?.registerWard("mikro", {
        search: runFunc,
      });
    }
  }, [client, registry]);

  return <></>;
};
