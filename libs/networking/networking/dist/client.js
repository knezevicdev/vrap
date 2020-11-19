"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Client = void 0;

var _graphqlRequest = require("graphql-request");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class Client {
  constructor(options) {
    this.graphQLClient = new _graphqlRequest.GraphQLClient(options.endpoint, {
      timeout: options.timeout
    });
  }
  /**
   * Allow to intercept data or error to perform others actions
   * @param errorInterceptor function it will receive the error object
   * @param responseInterceptor optional Function
   */


  addResponseInterceptor(errorInterceptor, responseInterceptor) {
    if (typeof errorInterceptor === 'function') {
      this.errorInterceptor = errorInterceptor;
    }

    if (typeof responseInterceptor === 'function') {
      this.responseInterceptor = responseInterceptor;
    }
  }

  gqlRequest(options) {
    var _this = this;

    return _asyncToGenerator(function* () {
      _this.graphQLClient.setHeaders(options.headers || undefined);

      try {
        var _data = yield _this.graphQLClient.request(options.document, options.variables);

        if (typeof _this.responseInterceptor === 'function') {
          yield _this.responseInterceptor(_data);
        }

        return {
          data: _data
        };
      } catch (error) {
        if (typeof _this.errorInterceptor === 'function') {
          yield _this.errorInterceptor(error);
        }

        var status = error.response && error.response.status ? error.response.status : undefined;
        return {
          error,
          status
        };
      }
    })();
  }

}

exports.Client = Client;