import { ErrorResponse, Response, SuccessResponse } from './types';
export declare function isErrorResponse<D>(response: Response<D>): response is ErrorResponse;
export declare function isSuccessResponse<D>(response: Response<D>): response is SuccessResponse<D>;
