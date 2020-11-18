"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isErrorResponse(response) {
    return response.error !== undefined;
}
exports.isErrorResponse = isErrorResponse;
function isSuccessResponse(response) {
    return response.data !== undefined;
}
exports.isSuccessResponse = isSuccessResponse;
//# sourceMappingURL=typeguards.js.map