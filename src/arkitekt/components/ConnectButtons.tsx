import { FaktsEndpoint, useFakts } from "@jhnnsrs/fakts";
import { useApp } from "../AppContext";

const defaultButtonClassName =
  "w-full shadow-lg shadow-primary-700/90 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-300 hover:bg-primary-500 md:py-4 md:text-lg md:px-10";
const defaultContainerClassName =
  "mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start gap-2";

export type ConnectButtonsProps = {
  containerClassName?: string;
  onError?: (e: Error) => void;
  buttonClassName?: ((e: FaktsEndpoint) => string) | string;
  buttonLabel?: (e: FaktsEndpoint) => React.ReactNode;
  noEndpointsFallback?: React.ReactNode;
};

export const ConnectButtons = ({
  containerClassName = defaultContainerClassName,
  onError = (e) => alert(e.message),
  buttonClassName = (e) => defaultButtonClassName,
  buttonLabel = (e) => `Connect to ${e.name}`,
  noEndpointsFallback = "No endpoints available",
}: ConnectButtonsProps) => {
  const { load, registeredEndpoints } = useFakts();
  const { manifest } = useApp();

  const buttonClassNameFunc =
    typeof buttonClassName === "function"
      ? buttonClassName
      : () => buttonClassName;

  return (
    <div className={containerClassName}>
      {registeredEndpoints.length > 0
        ? registeredEndpoints.map((e, index) => (
            <button
              key={index}
              type="button"
              onClick={() =>
                load({
                  endpoint: e,
                  manifest,
                }).catch((e) => {
                  onError(e);
                })
              }
              className={buttonClassNameFunc(e)}
            >
              {buttonLabel(e)}
            </button>
          ))
        : noEndpointsFallback}
    </div>
  );
};
