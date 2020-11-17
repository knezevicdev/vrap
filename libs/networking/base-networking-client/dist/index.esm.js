import regeneratorRuntime from 'regenerator-runtime';
import { GraphQLClient } from 'graphql-request';

var regenerator = regeneratorRuntime;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var asyncToGenerator = _asyncToGenerator;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck;

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var createClass = _createClass;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var defineProperty = _defineProperty;

var ClientImpl = /*#__PURE__*/function () {
  function ClientImpl(options) {
    classCallCheck(this, ClientImpl);

    defineProperty(this, "graphQLClient", void 0);

    this.graphQLClient = new GraphQLClient(options.endpoint, {
      timeout: options.timeout
    });
  }

  createClass(ClientImpl, [{
    key: "gqlRequest",
    value: function () {
      var _gqlRequest = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(options) {
        var data, status;
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.graphQLClient.setHeaders(options.headers || undefined);
                _context.prev = 1;
                _context.next = 4;
                return this.graphQLClient.request(options.document, options.variables);

              case 4:
                data = _context.sent;
                return _context.abrupt("return", {
                  data: data
                });

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);
                status = _context.t0.response && _context.t0.response.status ? _context.t0.response.status : undefined;
                return _context.abrupt("return", {
                  error: _context.t0,
                  status: status
                });

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 8]]);
      }));

      function gqlRequest(_x) {
        return _gqlRequest.apply(this, arguments);
      }

      return gqlRequest;
    }()
  }]);

  return ClientImpl;
}();

export { ClientImpl };
//# sourceMappingURL=index.esm.js.map
