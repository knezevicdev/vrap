import { ErrorResponse, Response, SuccessResponse } from './types';

export function isErrorResponse<D>(
  response: Response<D>
): response is ErrorResponse {
  return (response as ErrorResponse).error !== undefined;
}

export function isSuccessResponse<D>(
  response: Response<D>
): response is SuccessResponse<D> {
  return (response as SuccessResponse<D>).data !== undefined;
}
