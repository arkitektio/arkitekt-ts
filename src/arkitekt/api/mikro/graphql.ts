import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type PresignMutationVariables = Exact<{
  file: string;
}>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};

export type PresignMutation = {
  __typename?: "Mutation";
  presign?: {
    __typename?: "Presigned";
    bucket: string;
    fields: {
      __typename?: "PresignedFields";
      xAmzDate: string;
      xAmzAlgorithm: string;
      xAmzSignature: string;
      xAmzCredential: string;
      key: string;
      policy: string;
    };
  } | null;
};

export type RequestQueryVariables = Exact<{ [key: string]: never }>;

export type RequestQuery = {
  __typename?: "Query";
  request?: {
    __typename?: "Credentials";
    accessKey: string;
    secretKey: string;
    status: string;
    sessionToken: string;
  } | null;
};

export const PresignDocument = gql`
  mutation Presign($file: String!) {
    presign(file: $file) {
      bucket
      fields {
        xAmzDate
        xAmzAlgorithm
        xAmzSignature
        xAmzCredential
        key
        policy
      }
    }
  }
`;
export type PresignMutationFn = Apollo.MutationFunction<
  PresignMutation,
  PresignMutationVariables
>;

/**
 * __usePresignMutation__
 *
 * To run a mutation, you first call `usePresignMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePresignMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [presignMutation, { data, loading, error }] = usePresignMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function usePresignMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PresignMutation,
    PresignMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<PresignMutation, PresignMutationVariables>(
    PresignDocument,
    options
  );
}
export type PresignMutationHookResult = ReturnType<typeof usePresignMutation>;
export type PresignMutationResult = Apollo.MutationResult<PresignMutation>;
export type PresignMutationOptions = Apollo.BaseMutationOptions<
  PresignMutation,
  PresignMutationVariables
>;
export const RequestDocument = gql`
  query Request {
    request {
      accessKey
      secretKey
      status
      sessionToken
    }
  }
`;

/**
 * __useRequestQuery__
 *
 * To run a query within a React component, call `useRequestQuery` and pass it any options that fit your needs.
 * When your component renders, `useRequestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRequestQuery({
 *   variables: {
 *   },
 * });
 */
export function useRequestQuery(
  baseOptions?: Apollo.QueryHookOptions<RequestQuery, RequestQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<RequestQuery, RequestQueryVariables>(
    RequestDocument,
    options
  );
}
export function useRequestLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<RequestQuery, RequestQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<RequestQuery, RequestQueryVariables>(
    RequestDocument,
    options
  );
}
export type RequestQueryHookResult = ReturnType<typeof useRequestQuery>;
export type RequestLazyQueryHookResult = ReturnType<typeof useRequestLazyQuery>;
export type RequestQueryResult = Apollo.QueryResult<
  RequestQuery,
  RequestQueryVariables
>;
