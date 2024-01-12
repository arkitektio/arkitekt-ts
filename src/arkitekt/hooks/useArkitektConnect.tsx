import { FaktsRequest, useLoadFakts } from "@jhnnsrs/fakts";
import { useApp } from "../AppContext";
import { useCallback } from "react";

export const useArkitektConnect = () => {
  const { manifest } = useApp();

  const { load, ...x } = useLoadFakts();

  const adaptive_load = useCallback(
    (request: Partial<FaktsRequest> = {}) => {
      if (!request.manifest) {
        request.manifest = manifest;
      }

      if (!request.manifest.scopes) {
        throw new Error("No scopes specified in manifest");
      }

      if (
        request.requestedClientType == "website" &&
        (!request.requestedRedirectURIs ||
          request.requestedRedirectURIs.length === 0)
      ) {
        request.requestedRedirectURIs = [window.location.origin + "/callback"];
      }
      return load(request as FaktsRequest);
    },
    [load]
  );

  return {
    ...x,
    load: adaptive_load,
  };
};
