import { gql } from "@apollo/client";
import { useRekuest, useWidgetRegistry } from "@jhnnsrs/rekuest";
import React, { useEffect } from "react";

export const RekuestWard: React.FC<{
  key?: string;
  fallback?: React.ReactNode;
}> = ({ key, fallback }) => {
  const { client } = useRekuest();
  const { registry } = useWidgetRegistry();

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

      const ward = {
        search: runFunc,
      };

      return registry?.registerWard("rekuest", ward);
    }
  }, [client, registry]);

  return <></>;
};
