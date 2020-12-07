import { AccessDeniedErrorResponse, ErrorResponse, Response, SuccessResponse } from './types';
export declare function isErrorResponse<D>(response: Response<D>): response is ErrorResponse;
export declare function isAccessDeniedErrorResponse(errorResponse: ErrorResponse): errorResponse is AccessDeniedErrorResponse;
export declare function isSuccessResponse<D>(response: Response<D>): response is SuccessResponse<D>;
