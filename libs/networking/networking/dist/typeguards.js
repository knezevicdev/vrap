"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isErrorResponse = isErrorResponse;
exports.isSuccessResponse = isSuccessResponse;

function isErrorResponse(response) {
  return response.error !== undefined;
}

function isSuccessResponse(response) {
  return response.data !== undefined;
}