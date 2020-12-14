import { DocumentNode } from 'graphql/language/ast';
export interface GQLRequestVariables {
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
export declare type Response<D> = SuccessResponse<D> | ErrorResponse;
export declare type ResponseSuccessInterceptor<D = unknown> = (successResponse: SuccessResponse<D>) => Promise<void>;
export declare type ResponseErrorInterceptor = (errorResponse: ErrorResponse) => Promise<void>;
export interface ClientDef {
    gqlRequest: <D = unknown, V = GQLRequestVariables>(options: GQLRequestOptions<V>) => Promise<Response<D>>;
    addResponseInterceptor: (errorInterceptor?: ResponseErrorInterceptor, successInterceptor?: ResponseSuccessInterceptor) => void;
}
export declare enum Status {
    INITIAL = 0,
    LOADING = 1,
    SUCCESS = 2,
    ERROR = 3
}
