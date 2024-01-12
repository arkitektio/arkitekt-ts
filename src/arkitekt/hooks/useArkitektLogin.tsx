import { useFakts } from "@jhnnsrs/fakts";
import { useHerre, useLogin, LoginRequest } from "@jhnnsrs/herre";
import { useCallback, useState } from "react";

export type ArkitektLoginRequest = Partial<LoginRequest> & {
  faktsLokKey: string;
  redirectUri?: string;
};

export const useArkitektLogin = () => {
  const { fakts } = useFakts();
  const { login, ...rest } = useLogin();

  const adaptive_login = useCallback(
    (
      request: ArkitektLoginRequest = {
        faktsLokKey: "lok",
        redirectUri: undefined,
      },
    ) => {
      if (!fakts) {
        throw new Error("Missing fakts");
      }

      let configGroup = fakts[request.faktsLokKey] as
        | { [key: string]: any }
        | undefined;

      if (!configGroup) {
        throw new Error(`Missing fakts.${request.faktsLokKey}`);
      }

      let configGroupKeys = [
        "client_id",
        "client_secret",
        "scopes",
        "base_url",
      ];

      for (let key of configGroupKeys) {
        if (!configGroup[key]) {
          throw new Error(`Missing key ${key} in fakts.${request.faktsLokKey}`);
        }
      }

      return login({
        grant: {
          clientId: configGroup.client_id,
          clientSecret: configGroup.client_secret,
          scopes: configGroup.scopes,
          redirectUri:
            request.redirectUri || window.location.origin + "/callback",
        },
        endpoint: {
          base_url: configGroup.base_url,
          tokenUrl: configGroup.base_url + "/token/",
          userInfoEndpoint: configGroup.base_url + "/userinfo/",
          authUrl: configGroup.base_url + "/authorize/",
        },
        ...request,
      });
    },
    [fakts, login],
  );

  return {
    login: adaptive_login,
    ...rest,
  };
};
