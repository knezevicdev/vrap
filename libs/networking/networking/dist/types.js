"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Status = void 0;
var Status;
exports.Status = Status;

(function (Status) {
  Status[Status["INITIAL"] = 0] = "INITIAL";
  Status[Status["LOADING"] = 1] = "LOADING";
  Status[Status["SUCCESS"] = 2] = "SUCCESS";
  Status[Status["ERROR"] = 3] = "ERROR";
})(Status || (exports.Status = Status = {}));