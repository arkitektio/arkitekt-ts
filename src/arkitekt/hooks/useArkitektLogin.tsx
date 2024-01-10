import { useFakts } from "@jhnnsrs/fakts";
import { useHerre } from "@jhnnsrs/herre";
import { useCallback, useState } from "react";


export type ArkitektLoginProps = {
    faktsLokKey?: string,
    redirectUri?: string,
}


export const useArkitektLogin = ({
    faktsLokKey = "lok",
    redirectUri,
}: ArkitektLoginProps = {
    faktsLokKey: "lok",
    redirectUri: undefined,

}) => {
    const { fakts } = useFakts();
    const { login, ...rest } = useHerre();


    const adaptive_login = useCallback(() => {

        if (!fakts) {
            return;
        }

        let configGroup = fakts[faktsLokKey] as {[key: string]: any} | undefined;
        
        if (!configGroup) {
            return;
        }

        if (!configGroup) {
            return;
        }

        let configGroupKeys = ["client_id", "client_secret", "scopes", "base_url"];

        for (let key of configGroupKeys) {
            if (!configGroup[key]) {
                return;
            }
        }


        return login({
            clientId: configGroup.client_id,
            clientSecret:configGroup.client_secret,
            scopes: configGroup.scopes,
            redirectUri: redirectUri || (window.location.origin + "/callback"),
        }, {
            base_url: configGroup.base_url,
            tokenUrl: configGroup.base_url + "/token/",
            userInfoEndpoint: configGroup.base_url + "/userinfo/",
            authUrl: configGroup.base_url + "/authorize/",
        });

        
    }, [fakts, login]);



  return {
    login : adaptive_login,
    ...rest
  }



}