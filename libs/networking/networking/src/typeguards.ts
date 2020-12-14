import {
  AccessDeniedErrorResponse,
  ErrorResponse,
  Response,
  SuccessResponse,
} from './types';

export function isErrorResponse<D>(
  response: Response<D>
): response is ErrorResponse {
  return (response as ErrorResponse).error !== undefined;
}

export function isAccessDeniedErrorResponse(
  errorResponse: ErrorResponse
): errorResponse is AccessDeniedErrorResponse {
  const er = errorResponse as AccessDeniedErrorResponse;
  return (
    er.error.response &&
    er.error.response.extensions &&
    er.error.response.extensions.error_code &&
    er.error.response.extensions.error_code === '401'
  );
}

export function isSuccessResponse<D>(
  response: Response<D>
): response is SuccessResponse<D> {
  return (response as SuccessResponse<D>).data !== undefined;
}
