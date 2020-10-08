'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var regeneratorRuntime = _interopDefault(require('regenerator-runtime'));
var axios = _interopDefault(require('axios'));

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

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var js_cookie = createCommonjsModule(function (module, exports) {

(function (factory) {
  var registeredInModuleLoader;

  {
    module.exports = factory();
    registeredInModuleLoader = true;
  }

  if (!registeredInModuleLoader) {
    var OldCookies = window.Cookies;
    var api = window.Cookies = factory();

    api.noConflict = function () {
      window.Cookies = OldCookies;
      return api;
    };
  }
})(function () {
  function extend() {
    var i = 0;
    var result = {};

    for (; i < arguments.length; i++) {
      var attributes = arguments[i];

      for (var key in attributes) {
        result[key] = attributes[key];
      }
    }

    return result;
  }

  function decode(s) {
    return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
  }

  function init(converter) {
    function api() {}

    function set(key, value, attributes) {
      if (typeof document === 'undefined') {
        return;
      }

      attributes = extend({
        path: '/'
      }, api.defaults, attributes);

      if (typeof attributes.expires === 'number') {
        attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
      } // We're using "expires" because "max-age" is not supported by IE


      attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

      try {
        var result = JSON.stringify(value);

        if (/^[\{\[]/.test(result)) {
          value = result;
        }
      } catch (e) {}

      value = converter.write ? converter.write(value, key) : encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
      key = encodeURIComponent(String(key)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
      var stringifiedAttributes = '';

      for (var attributeName in attributes) {
        if (!attributes[attributeName]) {
          continue;
        }

        stringifiedAttributes += '; ' + attributeName;

        if (attributes[attributeName] === true) {
          continue;
        } // Considers RFC 6265 section 5.2:
        // ...
        // 3.  If the remaining unparsed-attributes contains a %x3B (";")
        //     character:
        // Consume the characters of the unparsed-attributes up to,
        // not including, the first %x3B (";") character.
        // ...


        stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
      }

      return document.cookie = key + '=' + value + stringifiedAttributes;
    }

    function get(key, json) {
      if (typeof document === 'undefined') {
        return;
      }

      var jar = {}; // To prevent the for loop in the first place assign an empty array
      // in case there are no cookies at all.

      var cookies = document.cookie ? document.cookie.split('; ') : [];
      var i = 0;

      for (; i < cookies.length; i++) {
        var parts = cookies[i].split('=');
        var cookie = parts.slice(1).join('=');

        if (!json && cookie.charAt(0) === '"') {
          cookie = cookie.slice(1, -1);
        }

        try {
          var name = decode(parts[0]);
          cookie = (converter.read || converter)(cookie, name) || decode(cookie);

          if (json) {
            try {
              cookie = JSON.parse(cookie);
            } catch (e) {}
          }

          jar[name] = cookie;

          if (key === name) {
            break;
          }
        } catch (e) {}
      }

      return key ? jar[key] : jar;
    }

    api.set = set;

    api.get = function (key) {
      return get(key, false
      /* read as raw */
      );
    };

    api.getJSON = function (key) {
      return get(key, true
      /* read as json */
      );
    };

    api.remove = function (key, attributes) {
      set(key, '', extend(attributes, {
        expires: -1
      }));
    };

    api.defaults = {};
    api.withConverter = init;
    return api;
  }

  return init(function () {});
});
});

// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
// getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
// find the complete implementation of crypto (msCrypto) on IE11.
var getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
  }

  return getRandomValues(rnds8);
}

var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

function validate(uuid) {
  return typeof uuid === 'string' && REGEX.test(uuid);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return stringify(rnds);
}

var CatDataNetworker = /*#__PURE__*/function () {
  function CatDataNetworker(options) {
    classCallCheck(this, CatDataNetworker);

    defineProperty(this, "axiosInstance", void 0);

    defineProperty(this, "basePath", void 0);

    var timeout = options && options.timeout || 1000;
    this.axiosInstance = axios.create({
      timeout: timeout
    }); // By default, hit the same host, e.g. https://vroom.com/cat-data.

    this.basePath = options && options.basePath || '';
  }

  createClass(CatDataNetworker, [{
    key: "getCatData",
    value: function () {
      var _getCatData = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(uuid) {
        var response;
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.axiosInstance.get("".concat(this.basePath, "/cat-data/").concat(uuid).concat(window.location.search));

              case 2:
                response = _context.sent;
                return _context.abrupt("return", response.data);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getCatData(_x) {
        return _getCatData.apply(this, arguments);
      }

      return getCatData;
    }()
  }]);

  return CatDataNetworker;
}();

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var CAT_DATA_EVENT_KEY = 'oncatdata';
var WINDOW_CAT_DATA_KEY = '__CAT_DATA__';

var CatSDK = /*#__PURE__*/function () {
  function CatSDK(options) {
    classCallCheck(this, CatSDK);

    defineProperty(this, "serviceBasePath", void 0);

    this.serviceBasePath = options && options.serviceBasePath ? options.serviceBasePath : '';
  }

  createClass(CatSDK, [{
    key: "initUUID",
    value: function initUUID() {
      // Generate uuid
      var newUUIDValue = v4();
      js_cookie.set('uuid', newUUIDValue, {
        // https://github.com/js-cookie/js-cookie#expires
        // For some reason vroom decided to use 720 days for this cookie.
        expires: 720 // days

      }); // Return the newly defined UUID.

      return newUUIDValue;
    }
  }, {
    key: "getUUID",
    value: function getUUID() {
      var uuidCookieValue = js_cookie.get('uuid');

      if (uuidCookieValue) {
        return uuidCookieValue;
      }

      return this.initUUID();
    }
  }, {
    key: "initCatData",
    value: function () {
      var _initCatData = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
        var catDataNetworker, uuid, sitePhoneNumberCookieValue, catData, sitePhoneNumber, catDataEvent;
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                catDataNetworker = new CatDataNetworker({
                  basePath: this.serviceBasePath
                });
                uuid = this.getUUID();
                sitePhoneNumberCookieValue = js_cookie.get('sitePhoneNumber');
                _context.prev = 3;
                _context.next = 6;
                return catDataNetworker.getCatData(uuid);

              case 6:
                catData = _context.sent;

                if (!sitePhoneNumberCookieValue) {
                  js_cookie.set('sitePhoneNumber', catData.sitePhoneNumber);
                }

                sitePhoneNumber = sitePhoneNumberCookieValue ? sitePhoneNumberCookieValue : catData.sitePhoneNumber;
                window[WINDOW_CAT_DATA_KEY] = _objectSpread(_objectSpread({}, catData), {}, {
                  sitePhoneNumber: sitePhoneNumber
                });
                _context.next = 15;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](3);
                window[WINDOW_CAT_DATA_KEY] = {
                  brand: 'vroom',
                  geo: {
                    city: '',
                    region: '',
                    metroCode: '',
                    postalCode: '',
                    latitude: '',
                    longitude: ''
                  },
                  sitePhoneNumber: sitePhoneNumberCookieValue || '(855)%20524-1300',
                  uuid: uuid
                };

              case 15:
                catDataEvent = new CustomEvent(CAT_DATA_EVENT_KEY, {
                  detail: window[WINDOW_CAT_DATA_KEY]
                });
                window.dispatchEvent(catDataEvent);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 12]]);
      }));

      function initCatData() {
        return _initCatData.apply(this, arguments);
      }

      return initCatData;
    }()
  }, {
    key: "observeCatData",
    value: function observeCatData(listener) {
      window.addEventListener(CAT_DATA_EVENT_KEY, listener);

      if (window[WINDOW_CAT_DATA_KEY]) {
        var _catDataEvent = new CustomEvent(CAT_DATA_EVENT_KEY, {
          detail: window[WINDOW_CAT_DATA_KEY]
        });

        listener(_catDataEvent);
      }
    }
  }, {
    key: "unobserveCatData",
    value: function unobserveCatData(listener) {
      window.removeEventListener(CAT_DATA_EVENT_KEY, listener);
    }
  }]);

  return CatSDK;
}();

exports.CatSDK = CatSDK;
