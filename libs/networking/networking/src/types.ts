import { DocumentNode } from 'graphql/language/ast';

export interface GQLRequestVariables {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface GQLRequestOptions<V = GQLRequestVariables> {
  document: string | DocumentNode;
  variables?: V;
  headers?: string[][] | Record<string, string> | Headers;
}

export interface SuccessResponse<D> {
  data: D;
}

export interface ErrorResponse {
  error: Error;
  status?: number;
}

export type Response<D> = SuccessResponse<D> | ErrorResponse;

export interface Client {
  gqlRequest: <D = unknown, V = GQLRequestVariables>(
    options: GQLRequestOptions<V>
  ) => Promise<Response<D>>;
}