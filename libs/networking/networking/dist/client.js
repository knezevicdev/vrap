"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientImpl = void 0;

var _graphqlRequest = require("graphql-request");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class ClientImpl {
  constructor(options) {
    this.graphQLClient = new _graphqlRequest.GraphQLClient(options.endpoint, {
      timeout: options.timeout
    });
  }

  gqlRequest(options) {
    var _this = this;

    return _asyncToGenerator(function* () {
      _this.graphQLClient.setHeaders(options.headers || undefined);

      try {
        var data = yield _this.graphQLClient.request(options.document, options.variables);
        return {
          data: data
        };
      } catch (error) {
        var status = error.response && error.response.status ? error.response.status : undefined;
        return {
          error,
          status
        };
      }
    })();
  }

}

exports.ClientImpl = ClientImpl;