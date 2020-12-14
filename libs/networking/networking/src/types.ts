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

export interface AccessDeniedError extends Error {
  response: {
    extensions: {
      error_code: '401';
    };
  };
}

export interface AccessDeniedErrorResponse extends ErrorResponse {
  error: AccessDeniedError;
}

export type Response<D> = SuccessResponse<D> | ErrorResponse;

export type ResponseSuccessInterceptor<D = unknown> = (
  successResponse: SuccessResponse<D>
) => Promise<void>;
export type ResponseErrorInterceptor = (
  errorResponse: ErrorResponse
) => Promise<void>;

export interface ClientDef {
  gqlRequest: <D = unknown, V = GQLRequestVariables>(
    options: GQLRequestOptions<V>
  ) => Promise<Response<D>>;
  addResponseInterceptor: (
    errorInterceptor?: ResponseErrorInterceptor,
    successInterceptor?: ResponseSuccessInterceptor
  ) => void;
}

export enum Status {
  INITIAL,
  LOADING,
  SUCCESS,
  ERROR,
}
