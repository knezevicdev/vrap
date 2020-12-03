"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddressType = exports.ErrorType = exports.Role = exports.DeviceType = void 0;

/** All built-in and custom scalars, mapped to their actual values */
var DeviceType;
exports.DeviceType = DeviceType;

(function (DeviceType) {
  DeviceType["Email"] = "EMAIL";
  DeviceType["Fcm"] = "FCM";
  DeviceType["Apns"] = "APNS";
})(DeviceType || (exports.DeviceType = DeviceType = {}));

var Role;
exports.Role = Role;

(function (Role) {
  Role["VroomUser"] = "VROOM_USER";
})(Role || (exports.Role = Role = {}));

var ErrorType;
exports.ErrorType = ErrorType;

(function (ErrorType) {
  ErrorType["BadRequest"] = "BadRequest";
  ErrorType["ServerFailure"] = "ServerFailure";
  ErrorType["DealOutOfSync"] = "DealOutOfSync";
})(ErrorType || (exports.ErrorType = ErrorType = {}));

var AddressType;
exports.AddressType = AddressType;

(function (AddressType) {
  AddressType["Registration"] = "REGISTRATION";
  AddressType["Delivery"] = "DELIVERY";
  AddressType["Billing"] = "BILLING";
})(AddressType || (exports.AddressType = AddressType = {}));