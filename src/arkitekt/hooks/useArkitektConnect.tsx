import { FaktsRequest, useFakts, useLoadFakts } from "@jhnnsrs/fakts";
import { useApp } from "../AppContext";



export const useArkitektConnect = (request: Partial<FaktsRequest> = {
requestedClientType: "website",
requestPublic: true,
retrieveTimeout: 2000,
maxChallengeRetries: 10,
challengeTimeout: 2000,
requestedRedirectURIs: [
    window.location.origin + "/callback"
],  
}) => {

    const {manifest} = useApp();

    const {registeredEndpoints} = useFakts();
    const x = useLoadFakts({
        onProgress: (e) => {
            console.log(e)
        },
        manifest,
        ...request,
    });

    return {
        registeredEndpoints,
        ...x
    }
}