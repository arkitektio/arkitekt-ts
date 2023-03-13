import {
  buildFaktsRetrieveGrant,
  introspectBeacon,
  useFakts,
} from "@jhnnsrs/fakts";
import { useRef } from "react";
import { useApp } from "../AppContext";

export type KonfigureFormProps = {
  inputPlaceholder?: string;
  inputClassName?: string;
  buttonClassName?: string;
  buttonLabel?: string;
};

export const KonfigureForm = ({
  inputPlaceholder = "Your host",
  inputClassName,
  buttonClassName,
  buttonLabel = "Connect",
}: KonfigureFormProps) => {
  const { manifest } = useApp();
  const { fakts, load } = useFakts();
  const ref = useRef<HTMLInputElement>(null);

  const retrieveWellKnown = async (host: string) => {
    let endpoint = await introspectBeacon({ url: host });

    let x = await load(
      buildFaktsRetrieveGrant(
        endpoint,
        manifest.version,
        manifest.identifier,
        "deprecated"
      )
    );

    console.log(x);
  };

  return (
    <>
      <input
        type="input"
        name="host"
        placeholder={inputPlaceholder}
        ref={ref}
        className={inputClassName}
      />
      <button
        type="button"
        onClick={() => {
          ref.current && retrieveWellKnown(ref.current.value);
        }}
      >
        {buttonLabel}
      </button>
    </>
  );
};
