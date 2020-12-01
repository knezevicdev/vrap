"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.determineWhitelabel = exports.Brand = void 0;
var Brand;
exports.Brand = Brand;

(function (Brand) {
  Brand["VROOM"] = "vroom";
  Brand["SANTANDER"] = "santander";
  Brand["TDA"] = "tda";
})(Brand || (exports.Brand = Brand = {}));

var determineWhitelabel = ctx => {
  var brand = Brand.VROOM;
  var headerBrandKey = 'x-brand';
  var brandHeader = ctx.req && ctx.req.headers[headerBrandKey];
  var queryBrand = ctx.query.brand;
  var whitelabel = brandHeader || queryBrand; // check header/query/cached brand val exists in enum and is valid

  if (Object.values(Brand).includes(whitelabel)) brand = whitelabel;
  return brand;
};

exports.determineWhitelabel = determineWhitelabel;