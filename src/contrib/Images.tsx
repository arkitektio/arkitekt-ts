import { gql } from "@apollo/client";
import { useDatalayer } from "@jhnnsrs/datalayer";
import { useMikroQuery } from "@jhnnsrs/mikro";

export const Images = () => {
  const { data } = useMikroQuery(gql`
    query {
      representations(limit: 3) {
        id
        name
        shape
      }
    }
  `);

  const { s3resolve } = useDatalayer();

  console.log(s3resolve("test"));
  return (
    <>
      {data?.representations?.map((r: any) => (
        <>{r.name}</>
      ))}
    </>
  );
};
