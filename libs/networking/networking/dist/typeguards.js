"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isErrorResponse = isErrorResponse;
exports.isAccessDeniedErrorResponse = isAccessDeniedErrorResponse;
exports.isSuccessResponse = isSuccessResponse;

function isErrorResponse(response) {
  return response.error !== undefined;
}

function isAccessDeniedErrorResponse(errorResponse) {
  var er = errorResponse;
  return er.error.response && er.error.response.extensions && er.error.response.extensions.error_code && er.error.response.extensions.error_code === '401';
}

function isSuccessResponse(response) {
  return response.data !== undefined;
}