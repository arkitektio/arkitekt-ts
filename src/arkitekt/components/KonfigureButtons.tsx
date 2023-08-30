import { FaktsEndpoint, useFakts } from "@jhnnsrs/fakts";
import { useApp } from "../AppContext";

const defaultButtonClassName =
  "w-full shadow-lg shadow-primary-700/90 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-300 hover:bg-primary-500 md:py-4 md:text-lg md:px-10";
const defaultContainerClassName =
  "mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start gap-2";

export type KonfigureButtonProps = {
  containerClassName?: string;
  buttonClassName?: (e: FaktsEndpoint) => string;
  buttonLabel?: (e: FaktsEndpoint) => React.ReactNode;
  noEndpointsLabel?: React.ReactNode;
};

export const KonfigureButtons = ({
  containerClassName = defaultContainerClassName,
  buttonClassName = (e) => defaultButtonClassName,
  buttonLabel = (e) => `Connect to ${e.name}`,
  noEndpointsLabel = "No endpoints available</>",
}: KonfigureButtonProps) => {
  const { load, registeredEndpoints } = useFakts();
  const { manifest } = useApp();

  return (
    <div className={containerClassName}>
      {registeredEndpoints.length > 0 ? (
        registeredEndpoints.map((e, index) => (
          <button
            key={index}
            type="button"
            onClick={() =>
              load({
                endpoint: e,
                manifest,
              }).catch((e) => {
                alert(e.message);
              })
            }
            className={buttonClassName(e)}
          >
            {buttonLabel(e)}
          </button>
        ))
      ) : (
        <>No endpoints available</>
      )}
    </div>
  );
};
