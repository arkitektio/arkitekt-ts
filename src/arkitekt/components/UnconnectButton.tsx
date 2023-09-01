import { useFakts } from "@jhnnsrs/fakts";
import { useHerre } from "@jhnnsrs/herre";
import { CancelablePromise } from "cancelable-promise";
import { useState } from "react";

const defaultClassName =
  "w-full shadow-lg shadow-primary-300/60 flex items-center justify-center px-8 py-3 border text-base font-medium rounded-md dark:text-white text-back-700 border-primary-400 bg-primary-300 hover:bg-primary-400 md:py-4 md:text-lg md:px-10";

export type UnconnectButtonProps = {
  className?: string;
  children?: React.ReactNode;
};

export const UnconnectButton = ({
  className = defaultClassName,
  children = "Disconnect",
}: UnconnectButtonProps) => {
  const { fakts, setFakts } = useFakts();
  const [future, setFuture] = useState<CancelablePromise | null>(null);
  const { logout } = useHerre();

  return (
    <>
      <button type="button" onClick={() => setFakts(null)}>
        {children}
      </button>
    </>
  );
};
