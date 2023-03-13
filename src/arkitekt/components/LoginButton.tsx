import { useFakts } from "@jhnnsrs/fakts";
import { useHerre } from "@jhnnsrs/herre";

export type LoginButtonProps = {
  className?: string;
  redirectRoute?: string;
};

export const LoginButton = ({
  redirectRoute = "/callback",
  ...props
}: LoginButtonProps) => {
  const { fakts, setFakts } = useFakts();

  const { login, isAuthenticating } = useHerre();

  if (!fakts) {
    return <>No fakts yet</>;
  }

  return (
    <>
      {fakts.lok ? (
        <button
          type="button"
          onClick={() =>
            login(
              {
                clientId: fakts.lok.client_id,
                clientSecret: fakts.lok.client_secret,
                scopes: fakts.lok.scopes,
                redirectUri: window.location.origin + redirectRoute,
              },
              {
                base_url: fakts.lok.base_url,
                tokenUrl: fakts.lok.base_url + "/token/",
                userInfoEndpoint: fakts.lok.base_url + "/userinfo/",
                authUrl: fakts.lok.base_url + "/authorize/",
              }
            )
          }
          {...props}
        >
          {isAuthenticating ? "Logging in..." : "Login"}
        </button>
      ) : (
        <>
          {" "}
          This server does not support authentication
          <button type="button" onClick={() => setFakts(null)}>
            {" "}
            Reset{" "}
          </button>
        </>
      )}
    </>
  );
};
