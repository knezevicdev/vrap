'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Box = _interopDefault(require('@material-ui/core/Box'));
var React = require('react');
var React__default = _interopDefault(React);
var styles = require('@material-ui/core/styles');
var Toolbar = _interopDefault(require('@material-ui/core/Toolbar'));
var ui = require('@vroom-web/ui');
var analyticsIntegration = require('@vroom-web/analytics-integration');
var catSdk = require('@vroom-web/cat-sdk');
var useMediaQuery = _interopDefault(require('@material-ui/core/useMediaQuery'));
var Tooltip = _interopDefault(require('@material-ui/core/Tooltip'));
var Drawer = _interopDefault(require('@material-ui/core/Drawer'));
var IconButton = _interopDefault(require('@material-ui/core/IconButton'));
var Collapse = _interopDefault(require('@material-ui/core/Collapse'));
var dealsV2Networking = require('@vroom-web/deals-v2-networking');
var Divider = _interopDefault(require('@material-ui/core/Divider'));
var ClickAwayListener = _interopDefault(require('@material-ui/core/ClickAwayListener'));
var withStyles = _interopDefault(require('@material-ui/core/styles/withStyles'));
var SvgIcon = _interopDefault(require('@material-ui/core/SvgIcon'));

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

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

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

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function () {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _initializerDefineProperty(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object.keys(descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object.defineProperty(target, property, desc);
    desc = null;
  }

  return desc;
}

var Bar = styles.styled(Toolbar)(function (_ref) {
  var _ref2;

  var theme = _ref.theme;
  return _ref2 = {
    backgroundColor: theme.palette.background.paper,
    borderBottom: "1px solid ".concat(theme.palette.grey[400]),
    boxShadow: "0 1px 4px 0 rgba(51, 51, 51, 0.1)"
  }, _defineProperty(_ref2, theme.breakpoints.up('md'), {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  }), _defineProperty(_ref2, "position", 'sticky'), _defineProperty(_ref2, "top", 0), _defineProperty(_ref2, "zIndex", theme.zIndex.appBar), _ref2;
});

var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;

var hexTable = function () {
  var array = [];

  for (var i = 0; i < 256; ++i) {
    array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
  }

  return array;
}();

var compactQueue = function compactQueue(queue) {
  while (queue.length > 1) {
    var item = queue.pop();
    var obj = item.obj[item.prop];

    if (isArray(obj)) {
      var compacted = [];

      for (var j = 0; j < obj.length; ++j) {
        if (typeof obj[j] !== 'undefined') {
          compacted.push(obj[j]);
        }
      }

      item.obj[item.prop] = compacted;
    }
  }
};

var arrayToObject = function arrayToObject(source, options) {
  var obj = options && options.plainObjects ? Object.create(null) : {};

  for (var i = 0; i < source.length; ++i) {
    if (typeof source[i] !== 'undefined') {
      obj[i] = source[i];
    }
  }

  return obj;
};

var merge = function merge(target, source, options) {
  /* eslint no-param-reassign: 0 */
  if (!source) {
    return target;
  }

  if (typeof source !== 'object') {
    if (isArray(target)) {
      target.push(source);
    } else if (target && typeof target === 'object') {
      if (options && (options.plainObjects || options.allowPrototypes) || !has.call(Object.prototype, source)) {
        target[source] = true;
      }
    } else {
      return [target, source];
    }

    return target;
  }

  if (!target || typeof target !== 'object') {
    return [target].concat(source);
  }

  var mergeTarget = target;

  if (isArray(target) && !isArray(source)) {
    mergeTarget = arrayToObject(target, options);
  }

  if (isArray(target) && isArray(source)) {
    source.forEach(function (item, i) {
      if (has.call(target, i)) {
        var targetItem = target[i];

        if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
          target[i] = merge(targetItem, item, options);
        } else {
          target.push(item);
        }
      } else {
        target[i] = item;
      }
    });
    return target;
  }

  return Object.keys(source).reduce(function (acc, key) {
    var value = source[key];

    if (has.call(acc, key)) {
      acc[key] = merge(acc[key], value, options);
    } else {
      acc[key] = value;
    }

    return acc;
  }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
  return Object.keys(source).reduce(function (acc, key) {
    acc[key] = source[key];
    return acc;
  }, target);
};

var decode = function (str, decoder, charset) {
  var strWithoutPlus = str.replace(/\+/g, ' ');

  if (charset === 'iso-8859-1') {
    // unescape never throws, no try...catch needed:
    return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
  } // utf-8


  try {
    return decodeURIComponent(strWithoutPlus);
  } catch (e) {
    return strWithoutPlus;
  }
};

var encode = function encode(str, defaultEncoder, charset) {
  // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
  // It has been adapted here for stricter adherence to RFC 3986
  if (str.length === 0) {
    return str;
  }

  var string = str;

  if (typeof str === 'symbol') {
    string = Symbol.prototype.toString.call(str);
  } else if (typeof str !== 'string') {
    string = String(str);
  }

  if (charset === 'iso-8859-1') {
    return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
      return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
    });
  }

  var out = '';

  for (var i = 0; i < string.length; ++i) {
    var c = string.charCodeAt(i);

    if (c === 0x2D // -
    || c === 0x2E // .
    || c === 0x5F // _
    || c === 0x7E // ~
    || c >= 0x30 && c <= 0x39 // 0-9
    || c >= 0x41 && c <= 0x5A // a-z
    || c >= 0x61 && c <= 0x7A // A-Z
    ) {
        out += string.charAt(i);
        continue;
      }

    if (c < 0x80) {
      out = out + hexTable[c];
      continue;
    }

    if (c < 0x800) {
      out = out + (hexTable[0xC0 | c >> 6] + hexTable[0x80 | c & 0x3F]);
      continue;
    }

    if (c < 0xD800 || c >= 0xE000) {
      out = out + (hexTable[0xE0 | c >> 12] + hexTable[0x80 | c >> 6 & 0x3F] + hexTable[0x80 | c & 0x3F]);
      continue;
    }

    i += 1;
    c = 0x10000 + ((c & 0x3FF) << 10 | string.charCodeAt(i) & 0x3FF);
    out += hexTable[0xF0 | c >> 18] + hexTable[0x80 | c >> 12 & 0x3F] + hexTable[0x80 | c >> 6 & 0x3F] + hexTable[0x80 | c & 0x3F];
  }

  return out;
};

var compact = function compact(value) {
  var queue = [{
    obj: {
      o: value
    },
    prop: 'o'
  }];
  var refs = [];

  for (var i = 0; i < queue.length; ++i) {
    var item = queue[i];
    var obj = item.obj[item.prop];
    var keys = Object.keys(obj);

    for (var j = 0; j < keys.length; ++j) {
      var key = keys[j];
      var val = obj[key];

      if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
        queue.push({
          obj: obj,
          prop: key
        });
        refs.push(val);
      }
    }
  }

  compactQueue(queue);
  return value;
};

var isRegExp = function isRegExp(obj) {
  return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer = function isBuffer(obj) {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

var combine = function combine(a, b) {
  return [].concat(a, b);
};

var maybeMap = function maybeMap(val, fn) {
  if (isArray(val)) {
    var mapped = [];

    for (var i = 0; i < val.length; i += 1) {
      mapped.push(fn(val[i]));
    }

    return mapped;
  }

  return fn(val);
};

var utils = {
  arrayToObject: arrayToObject,
  assign: assign,
  combine: combine,
  compact: compact,
  decode: decode,
  encode: encode,
  isBuffer: isBuffer,
  isRegExp: isRegExp,
  maybeMap: maybeMap,
  merge: merge
};

var replace = String.prototype.replace;
var percentTwenties = /%20/g;



var Format = {
  RFC1738: 'RFC1738',
  RFC3986: 'RFC3986'
};
var formats = utils.assign({
  'default': Format.RFC3986,
  formatters: {
    RFC1738: function (value) {
      return replace.call(value, percentTwenties, '+');
    },
    RFC3986: function (value) {
      return String(value);
    }
  }
}, Format);

var has$1 = Object.prototype.hasOwnProperty;
var arrayPrefixGenerators = {
  brackets: function brackets(prefix) {
    return prefix + '[]';
  },
  comma: 'comma',
  indices: function indices(prefix, key) {
    return prefix + '[' + key + ']';
  },
  repeat: function repeat(prefix) {
    return prefix;
  }
};
var isArray$1 = Array.isArray;
var push = Array.prototype.push;

var pushToArray = function (arr, valueOrArray) {
  push.apply(arr, isArray$1(valueOrArray) ? valueOrArray : [valueOrArray]);
};

var toISO = Date.prototype.toISOString;
var defaultFormat = formats['default'];
var defaults = {
  addQueryPrefix: false,
  allowDots: false,
  charset: 'utf-8',
  charsetSentinel: false,
  delimiter: '&',
  encode: true,
  encoder: utils.encode,
  encodeValuesOnly: false,
  format: defaultFormat,
  formatter: formats.formatters[defaultFormat],
  // deprecated
  indices: false,
  serializeDate: function serializeDate(date) {
    return toISO.call(date);
  },
  skipNulls: false,
  strictNullHandling: false
};

var isNonNullishPrimitive = function isNonNullishPrimitive(v) {
  return typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean' || typeof v === 'symbol' || typeof v === 'bigint';
};

var stringify = function stringify(object, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly, charset) {
  var obj = object;

  if (typeof filter === 'function') {
    obj = filter(prefix, obj);
  } else if (obj instanceof Date) {
    obj = serializeDate(obj);
  } else if (generateArrayPrefix === 'comma' && isArray$1(obj)) {
    obj = utils.maybeMap(obj, function (value) {
      if (value instanceof Date) {
        return serializeDate(value);
      }

      return value;
    }).join(',');
  }

  if (obj === null) {
    if (strictNullHandling) {
      return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, 'key') : prefix;
    }

    obj = '';
  }

  if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
    if (encoder) {
      var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, 'key');
      return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset, 'value'))];
    }

    return [formatter(prefix) + '=' + formatter(String(obj))];
  }

  var values = [];

  if (typeof obj === 'undefined') {
    return values;
  }

  var objKeys;

  if (isArray$1(filter)) {
    objKeys = filter;
  } else {
    var keys = Object.keys(obj);
    objKeys = sort ? keys.sort(sort) : keys;
  }

  for (var i = 0; i < objKeys.length; ++i) {
    var key = objKeys[i];
    var value = obj[key];

    if (skipNulls && value === null) {
      continue;
    }

    var keyPrefix = isArray$1(obj) ? typeof generateArrayPrefix === 'function' ? generateArrayPrefix(prefix, key) : prefix : prefix + (allowDots ? '.' + key : '[' + key + ']');
    pushToArray(values, stringify(value, keyPrefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly, charset));
  }

  return values;
};

var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
  if (!opts) {
    return defaults;
  }

  if (opts.encoder !== null && opts.encoder !== undefined && typeof opts.encoder !== 'function') {
    throw new TypeError('Encoder has to be a function.');
  }

  var charset = opts.charset || defaults.charset;

  if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
    throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
  }

  var format = formats['default'];

  if (typeof opts.format !== 'undefined') {
    if (!has$1.call(formats.formatters, opts.format)) {
      throw new TypeError('Unknown format option provided.');
    }

    format = opts.format;
  }

  var formatter = formats.formatters[format];
  var filter = defaults.filter;

  if (typeof opts.filter === 'function' || isArray$1(opts.filter)) {
    filter = opts.filter;
  }

  return {
    addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
    allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
    charset: charset,
    charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
    delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
    encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
    encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
    encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
    filter: filter,
    formatter: formatter,
    serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
    skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
    sort: typeof opts.sort === 'function' ? opts.sort : null,
    strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
  };
};

var stringify_1 = function (object, opts) {
  var obj = object;
  var options = normalizeStringifyOptions(opts);
  var objKeys;
  var filter;

  if (typeof options.filter === 'function') {
    filter = options.filter;
    obj = filter('', obj);
  } else if (isArray$1(options.filter)) {
    filter = options.filter;
    objKeys = filter;
  }

  var keys = [];

  if (typeof obj !== 'object' || obj === null) {
    return '';
  }

  var arrayFormat;

  if (opts && opts.arrayFormat in arrayPrefixGenerators) {
    arrayFormat = opts.arrayFormat;
  } else if (opts && 'indices' in opts) {
    arrayFormat = opts.indices ? 'indices' : 'repeat';
  } else {
    arrayFormat = 'indices';
  }

  var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

  if (!objKeys) {
    objKeys = Object.keys(obj);
  }

  if (options.sort) {
    objKeys.sort(options.sort);
  }

  for (var i = 0; i < objKeys.length; ++i) {
    var key = objKeys[i];

    if (options.skipNulls && obj[key] === null) {
      continue;
    }

    pushToArray(keys, stringify(obj[key], key, generateArrayPrefix, options.strictNullHandling, options.skipNulls, options.encode ? options.encoder : null, options.filter, options.sort, options.allowDots, options.serializeDate, options.formatter, options.encodeValuesOnly, options.charset));
  }

  var joined = keys.join(options.delimiter);
  var prefix = options.addQueryPrefix === true ? '?' : '';

  if (options.charsetSentinel) {
    if (options.charset === 'iso-8859-1') {
      // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
      prefix += 'utf8=%26%2310003%3B&';
    } else {
      // encodeURIComponent('✓')
      prefix += 'utf8=%E2%9C%93&';
    }
  }

  return joined.length > 0 ? prefix + joined : '';
};

var has$2 = Object.prototype.hasOwnProperty;
var isArray$2 = Array.isArray;
var defaults$1 = {
  allowDots: false,
  allowPrototypes: false,
  arrayLimit: 20,
  charset: 'utf-8',
  charsetSentinel: false,
  comma: false,
  decoder: utils.decode,
  delimiter: '&',
  depth: 5,
  ignoreQueryPrefix: false,
  interpretNumericEntities: false,
  parameterLimit: 1000,
  parseArrays: true,
  plainObjects: false,
  strictNullHandling: false
};

var interpretNumericEntities = function (str) {
  return str.replace(/&#(\d+);/g, function ($0, numberStr) {
    return String.fromCharCode(parseInt(numberStr, 10));
  });
};

var parseArrayValue = function (val, options) {
  if (val && typeof val === 'string' && options.comma && val.indexOf(',') > -1) {
    return val.split(',');
  }

  return val;
}; // This is what browsers will submit when the ✓ character occurs in an
// application/x-www-form-urlencoded body and the encoding of the page containing
// the form is iso-8859-1, or when the submitted form has an accept-charset
// attribute of iso-8859-1. Presumably also with other charsets that do not contain
// the ✓ character, such as us-ascii.


var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')
// These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.

var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

var parseValues = function parseQueryStringValues(str, options) {
  var obj = {};
  var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
  var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
  var parts = cleanStr.split(options.delimiter, limit);
  var skipIndex = -1; // Keep track of where the utf8 sentinel was found

  var i;
  var charset = options.charset;

  if (options.charsetSentinel) {
    for (i = 0; i < parts.length; ++i) {
      if (parts[i].indexOf('utf8=') === 0) {
        if (parts[i] === charsetSentinel) {
          charset = 'utf-8';
        } else if (parts[i] === isoSentinel) {
          charset = 'iso-8859-1';
        }

        skipIndex = i;
        i = parts.length; // The eslint settings do not allow break;
      }
    }
  }

  for (i = 0; i < parts.length; ++i) {
    if (i === skipIndex) {
      continue;
    }

    var part = parts[i];
    var bracketEqualsPos = part.indexOf(']=');
    var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;
    var key, val;

    if (pos === -1) {
      key = options.decoder(part, defaults$1.decoder, charset, 'key');
      val = options.strictNullHandling ? null : '';
    } else {
      key = options.decoder(part.slice(0, pos), defaults$1.decoder, charset, 'key');
      val = utils.maybeMap(parseArrayValue(part.slice(pos + 1), options), function (encodedVal) {
        return options.decoder(encodedVal, defaults$1.decoder, charset, 'value');
      });
    }

    if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
      val = interpretNumericEntities(val);
    }

    if (part.indexOf('[]=') > -1) {
      val = isArray$2(val) ? [val] : val;
    }

    if (has$2.call(obj, key)) {
      obj[key] = utils.combine(obj[key], val);
    } else {
      obj[key] = val;
    }
  }

  return obj;
};

var parseObject = function (chain, val, options, valuesParsed) {
  var leaf = valuesParsed ? val : parseArrayValue(val, options);

  for (var i = chain.length - 1; i >= 0; --i) {
    var obj;
    var root = chain[i];

    if (root === '[]' && options.parseArrays) {
      obj = [].concat(leaf);
    } else {
      obj = options.plainObjects ? Object.create(null) : {};
      var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
      var index = parseInt(cleanRoot, 10);

      if (!options.parseArrays && cleanRoot === '') {
        obj = {
          0: leaf
        };
      } else if (!isNaN(index) && root !== cleanRoot && String(index) === cleanRoot && index >= 0 && options.parseArrays && index <= options.arrayLimit) {
        obj = [];
        obj[index] = leaf;
      } else {
        obj[cleanRoot] = leaf;
      }
    }

    leaf = obj; // eslint-disable-line no-param-reassign
  }

  return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
  if (!givenKey) {
    return;
  } // Transform dot notation to bracket notation


  var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey; // The regex chunks

  var brackets = /(\[[^[\]]*])/;
  var child = /(\[[^[\]]*])/g; // Get the parent

  var segment = options.depth > 0 && brackets.exec(key);
  var parent = segment ? key.slice(0, segment.index) : key; // Stash the parent if it exists

  var keys = [];

  if (parent) {
    // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
    if (!options.plainObjects && has$2.call(Object.prototype, parent)) {
      if (!options.allowPrototypes) {
        return;
      }
    }

    keys.push(parent);
  } // Loop through children appending to the array until we hit depth


  var i = 0;

  while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
    i += 1;

    if (!options.plainObjects && has$2.call(Object.prototype, segment[1].slice(1, -1))) {
      if (!options.allowPrototypes) {
        return;
      }
    }

    keys.push(segment[1]);
  } // If there's a remainder, just add whatever is left


  if (segment) {
    keys.push('[' + key.slice(segment.index) + ']');
  }

  return parseObject(keys, val, options, valuesParsed);
};

var normalizeParseOptions = function normalizeParseOptions(opts) {
  if (!opts) {
    return defaults$1;
  }

  if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
    throw new TypeError('Decoder has to be a function.');
  }

  if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
    throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
  }

  var charset = typeof opts.charset === 'undefined' ? defaults$1.charset : opts.charset;
  return {
    allowDots: typeof opts.allowDots === 'undefined' ? defaults$1.allowDots : !!opts.allowDots,
    allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults$1.allowPrototypes,
    arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults$1.arrayLimit,
    charset: charset,
    charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults$1.charsetSentinel,
    comma: typeof opts.comma === 'boolean' ? opts.comma : defaults$1.comma,
    decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults$1.decoder,
    delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults$1.delimiter,
    // eslint-disable-next-line no-implicit-coercion, no-extra-parens
    depth: typeof opts.depth === 'number' || opts.depth === false ? +opts.depth : defaults$1.depth,
    ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
    interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults$1.interpretNumericEntities,
    parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults$1.parameterLimit,
    parseArrays: opts.parseArrays !== false,
    plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults$1.plainObjects,
    strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults$1.strictNullHandling
  };
};

var parse = function (str, opts) {
  var options = normalizeParseOptions(opts);

  if (str === '' || str === null || typeof str === 'undefined') {
    return options.plainObjects ? Object.create(null) : {};
  }

  var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
  var obj = options.plainObjects ? Object.create(null) : {}; // Iterate over the keys and setup the new object

  var keys = Object.keys(tempObj);

  for (var i = 0; i < keys.length; ++i) {
    var key = keys[i];
    var newObj = parseKeys(key, tempObj[key], options, typeof str === 'string');
    obj = utils.merge(obj, newObj, options);
  }

  return utils.compact(obj);
};

var lib = {
  formats: formats,
  parse: parse,
  stringify: stringify_1
};
var lib_2 = lib.parse;
var lib_3 = lib.stringify;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _ref = /*#__PURE__*/React.createElement("path", {
  d: "M44.847 1l-1.384 7.547h-2.851c-2.683 0-3.774 1.342-4.151 3.522L34.7 22.342h-7.003l2.6-14.843h-3.983l1.09-6.122H37.97l-.755 4.025C38.64 2.006 41.744 1 44.638 1h.209zM0 7.5l1.09-6.123h10.05l-.477 14.604 6.709-14.604h7.87L14.634 22.342H3.983V7.5zm56.215 9.182c-2.474 0-4.025-1.97-4.025-4.487 0-2.725 1.72-5.158 4.444-5.158 2.475 0 4.026 1.972 4.026 4.487 0 2.725-1.719 5.158-4.445 5.158M57.012 1C49.59 1 45.23 6.41 45.23 12.531c0 6.331 4.738 10.19 10.61 10.19 7.42 0 11.782-5.41 11.782-11.532C67.621 4.857 62.882 1 57.012 1m23.781 15.682c-2.475 0-4.025-1.97-4.025-4.487 0-2.725 1.718-5.158 4.444-5.158 2.474 0 4.025 1.972 4.025 4.487 0 2.725-1.718 5.158-4.444 5.158M81.589 1c-7.421 0-11.782 5.41-11.782 11.531 0 6.331 4.738 10.19 10.608 10.19 7.422 0 11.782-5.41 11.782-11.532C92.197 4.857 87.46 1 81.589 1m35.675 8.218c1.217-.922 2.642-1.803 4.026-1.803 1.467 0 2.137 1.174 1.844 2.893l-2.138 12.034h7.045l2.221-12.957C131.313 3.222 127.328 1 123.763 1c-2.684 0-5.325 1.174-7.212 3.27-.965-2.474-3.103-3.27-5.115-3.27-2.475 0-4.822 1.006-6.75 3.144l.502-2.767H94.621L93.531 7.5h3.983l-2.6 14.843h7.004l2.305-13.124c1.216-.922 2.642-1.803 4.026-1.803 1.468 0 2.139 1.174 1.846 2.893l-2.14 12.034h7.002l2.308-13.124z",
  fill: "currentColor",
  fillRule: "evenodd"
});

function SvgLogo(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 131 23"
  }, props), _ref);
}

var StyledAnchor = styles.styled('a')(function () {
  return {
    color: 'inherit',
    display: 'inline-flex'
  };
});
var StyledLogoSvg = styles.styled(SvgLogo)(function (_ref) {
  var theme = _ref.theme;
  return _defineProperty({
    width: '104px',
    height: '17px'
  }, theme.breakpoints.up('md'), {
    width: '116px',
    height: '20px'
  });
});

var Logo = function Logo(_ref3) {
  var viewModel = _ref3.viewModel;

  // FIT-566
  // As a stopgap, the we persist certain query params across navigation.
  // This is so that vlassic attribution works until we build a better system.
  var _useState = React.useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      queryString = _useState2[0],
      setQueryString = _useState2[1];

  React.useEffect(function () {
    var query = lib_2(window.location.search, {
      ignoreQueryPrefix: true
    });

    var picked = function (_ref4) {
      var gclid = _ref4.gclid,
          subid = _ref4.subid,
          utm_source = _ref4.utm_source,
          utm_medium = _ref4.utm_medium,
          utm_campaign = _ref4.utm_campaign,
          utm_term = _ref4.utm_term,
          utm_content = _ref4.utm_content,
          utm_keyword = _ref4.utm_keyword,
          utm_subsource = _ref4.utm_subsource,
          utm_site = _ref4.utm_site;
      return {
        gclid: gclid,
        subid: subid,
        utm_source: utm_source,
        utm_medium: utm_medium,
        utm_campaign: utm_campaign,
        utm_term: utm_term,
        utm_content: utm_content,
        utm_keyword: utm_keyword,
        utm_subsource: utm_subsource,
        utm_site: utm_site
      };
    }(query);

    var newQueryString = lib_3(picked, {
      addQueryPrefix: true
    });
    setQueryString(newQueryString);
  }, []);

  var handleClick = function handleClick(event) {
    viewModel.handleLogoClick(event);
  };

  return /*#__PURE__*/React__default.createElement(StyledAnchor, {
    className: viewModel.className,
    href: "".concat(viewModel.href).concat(queryString),
    onClick: handleClick
  }, /*#__PURE__*/React__default.createElement(StyledLogoSvg, null), /*#__PURE__*/React__default.createElement(ui.Typography, {
    variant: "srOnly"
  }, "Home"));
};

var AnalyticsHandler = /*#__PURE__*/function (_BaseAnalyticsHandler) {
  _inherits(AnalyticsHandler, _BaseAnalyticsHandler);

  var _super = _createSuper(AnalyticsHandler);

  function AnalyticsHandler() {
    _classCallCheck(this, AnalyticsHandler);

    return _super.apply(this, arguments);
  }

  _createClass(AnalyticsHandler, [{
    key: "trackBuyClicked",
    value: function trackBuyClicked() {
      var event = 'Buy Clicked';
      var properties = {
        category: 'Main Navigation'
      };
      this.track(event, properties);
    }
  }, {
    key: "trackHomeClicked",
    value: function trackHomeClicked() {
      var event = 'Home Clicked';
      var properties = {
        category: 'Main Navigation'
      };
      this.track(event, properties);
    }
  }, {
    key: "trackSellTradeClicked",
    value: function trackSellTradeClicked() {
      var event = 'Sell/Trade Clicked';
      var properties = {
        category: 'Main Navigation'
      };
      this.track(event, properties);
    }
  }, {
    key: "trackFinanceClicked",
    value: function trackFinanceClicked() {
      var event = 'Finance Clicked';
      var properties = {
        category: 'Main Navigation'
      };
      this.track(event, properties);
    }
  }, {
    key: "trackAboutUsClicked",
    value: function trackAboutUsClicked() {
      var event = 'About Us Clicked';
      var properties = {
        category: 'Main Navigation',
        label: 'About'
      };
      this.track(event, properties);
    }
  }, {
    key: "trackVroomProtectionClicked",
    value: function trackVroomProtectionClicked() {
      var event = 'Vroom Protection Clicked';
      var properties = {
        category: 'Main Navigation',
        label: 'About'
      };
      this.track(event, properties);
    }
  }, {
    key: "trackHowItWorksClicked",
    value: function trackHowItWorksClicked() {
      var event = 'How It Works Clicked';
      var properties = {
        category: 'Main Navigation',
        label: 'About'
      };
      this.track(event, properties);
    }
  }, {
    key: "trackCustomerReviewsClicked",
    value: function trackCustomerReviewsClicked() {
      var event = 'Customer Reviews Clicked';
      var properties = {
        category: 'Main Navigation',
        label: 'About'
      };
      this.track(event, properties);
    }
  }, {
    key: "trackInvestorRelationsClicked",
    value: function trackInvestorRelationsClicked() {
      var event = 'Investor Relations Clicked';
      var properties = {
        category: 'Main Navigation',
        label: 'About'
      };
      this.track(event, properties);
    }
  }, {
    key: "trackFAQClicked",
    value: function trackFAQClicked() {
      var event = 'FAQ Clicked';
      var properties = {
        category: 'Main Navigation',
        label: 'Contact'
      };
      this.track(event, properties);
    }
  }, {
    key: "trackPhoneClicked",
    value: function trackPhoneClicked() {
      var event = 'Phone Clicked';
      var properties = {
        category: 'Main Navigation',
        label: 'Contact'
      };
      this.track(event, properties);
    }
  }, {
    key: "trackContactUsClicked",
    value: function trackContactUsClicked() {
      var event = 'Contact Us Clicked';
      var properties = {
        category: 'Main Navigation',
        label: 'Contact'
      };
      this.track(event, properties);
    }
  }, {
    key: "trackLoginClicked",
    value: function trackLoginClicked() {
      var event = 'Login Clicked';
      var properties = {
        category: 'Main Navigation',
        label: 'Account'
      };
      this.track(event, properties);
    }
  }, {
    key: "trackRegisterClicked",
    value: function trackRegisterClicked() {
      var event = 'Register Clicked';
      var properties = {
        category: 'Main Navigation',
        label: 'Account'
      };
      this.track(event, properties);
    }
  }, {
    key: "trackProfileClicked",
    value: function trackProfileClicked() {
      var event = 'Profile Clicked';
      var properties = {
        category: 'Main Navigation',
        label: 'Account'
      };
      this.track(event, properties);
    }
  }, {
    key: "trackFavoritesClicked",
    value: function trackFavoritesClicked() {
      var event = 'Favorites Clicked';
      var properties = {
        category: 'Main Navigation',
        label: 'Account'
      };
      this.track(event, properties);
    }
  }, {
    key: "trackTransactionsClicked",
    value: function trackTransactionsClicked() {
      var event = 'Transactions Clicked';
      var properties = {
        category: 'Main Navigation',
        label: 'Account'
      };
      this.track(event, properties);
    }
  }, {
    key: "trackAddressesClicked",
    value: function trackAddressesClicked() {
      var event = 'Addresses Clicked';
      var properties = {
        category: 'Main Navigation',
        label: 'Account'
      };
      this.track(event, properties);
    }
  }, {
    key: "trackTransactionResumeClicked",
    value: function trackTransactionResumeClicked() {
      var event = 'Transaction Resume Clicked';
      var properties = {
        category: 'Main Navigation',
        label: 'Account'
      };
      this.track(event, properties);
    }
  }, {
    key: "trackSignOutClicked",
    value: function trackSignOutClicked() {
      var event = 'Sign Out Clicked';
      var properties = {
        category: 'Main Navigation',
        label: 'Account'
      };
      this.track(event, properties);
    }
  }, {
    key: "trackFavoritesHeartClicked",
    value: function trackFavoritesHeartClicked() {
      var event = 'Favorites Clicked';
      var properties = {
        category: 'Main Navigation'
      };
      this.track(event, properties);
    }
  }]);

  return AnalyticsHandler;
}(analyticsIntegration.AnalyticsHandler);

var LogoViewModel = /*#__PURE__*/function () {
  function LogoViewModel(propsFromProvider) {
    _classCallCheck(this, LogoViewModel);

    _defineProperty(this, "analyticsHandler", void 0);

    _defineProperty(this, "onClick", void 0);

    _defineProperty(this, "className", void 0);

    _defineProperty(this, "href", void 0);

    this.analyticsHandler = new AnalyticsHandler();
    this.className = propsFromProvider.className;
    this.href = propsFromProvider.href || '/';
    this.onClick = propsFromProvider.onClick;
  }

  _createClass(LogoViewModel, [{
    key: "handleLogoClick",
    value: function handleLogoClick(event) {
      this.analyticsHandler.trackHomeClicked();

      if (this.onClick) {
        this.onClick(event);
      }
    }
  }]);

  return LogoViewModel;
}();

var Logo$1 = function Logo$1(_ref) {
  var className = _ref.className,
      href = _ref.href,
      onClick = _ref.onClick;
  var viewModel = new LogoViewModel({
    className: className,
    href: href,
    onClick: onClick
  });
  return /*#__PURE__*/React__default.createElement(Logo, {
    viewModel: viewModel
  });
};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

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

/**
 * The code was extracted from:
 * https://github.com/davidchambers/Base64.js
 */
var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function InvalidCharacterError(message) {
  this.message = message;
}

InvalidCharacterError.prototype = new Error();
InvalidCharacterError.prototype.name = 'InvalidCharacterError';

function polyfill(input) {
  var str = String(input).replace(/=+$/, '');

  if (str.length % 4 == 1) {
    throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
  }

  for ( // initialize result and counters
  var bc = 0, bs, buffer, idx = 0, output = ''; // get next character
  buffer = str.charAt(idx++); // character found in table? initialize bit storage and add its ascii value;
  ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, // and if not first of each 4 characters,
  // convert the first 8 bits to one ascii character
  bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
    // try to find character in table (0-63, not found => -1)
    buffer = chars.indexOf(buffer);
  }

  return output;
}

var atob = typeof window !== 'undefined' && window.atob && window.atob.bind(window) || polyfill;

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).replace(/(.)/g, function (m, p) {
    var code = p.charCodeAt(0).toString(16).toUpperCase();

    if (code.length < 2) {
      code = '0' + code;
    }

    return '%' + code;
  }));
}

var base64_url_decode = function (str) {
  var output = str.replace(/-/g, "+").replace(/_/g, "/");

  switch (output.length % 4) {
    case 0:
      break;

    case 2:
      output += "==";
      break;

    case 3:
      output += "=";
      break;

    default:
      throw "Illegal base64url string!";
  }

  try {
    return b64DecodeUnicode(output);
  } catch (err) {
    return atob(output);
  }
};

function InvalidTokenError(message) {
  this.message = message;
}

InvalidTokenError.prototype = new Error();
InvalidTokenError.prototype.name = 'InvalidTokenError';

var lib$1 = function (token, options) {
  if (typeof token !== 'string') {
    throw new InvalidTokenError('Invalid token specified');
  }

  options = options || {};
  var pos = options.header === true ? 0 : 1;

  try {
    return JSON.parse(base64_url_decode(token.split('.')[pos]));
  } catch (e) {
    throw new InvalidTokenError('Invalid token specified: ' + e.message);
  }
};

var InvalidTokenError_1 = InvalidTokenError;
lib$1.InvalidTokenError = InvalidTokenError_1;

/** MobX - (c) Michel Weststrate 2015 - 2020 - MIT Licensed */

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function () {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

function __values(o) {
  var m = typeof Symbol === "function" && o[Symbol.iterator],
      i = 0;
  if (m) return m.call(o);
  return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
}

function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));

  return ar;
}

var OBFUSCATED_ERROR = "An invariant failed, however the error is obfuscated because this is a production build.";
var EMPTY_ARRAY = [];
Object.freeze(EMPTY_ARRAY);
var EMPTY_OBJECT = {};
Object.freeze(EMPTY_OBJECT);

function getNextId() {
  return ++globalState.mobxGuid;
}

function fail(message) {
  invariant(false, message);
  throw "X"; // unreachable
}

function invariant(check, message) {
  if (!check) throw new Error("[mobx] " + (message || OBFUSCATED_ERROR));
}
/**
 * Makes sure that the provided function is invoked at most once.
 */


function once(func) {
  var invoked = false;
  return function () {
    if (invoked) return;
    invoked = true;
    return func.apply(this, arguments);
  };
}

var noop = function () {};

function unique(list) {
  var res = [];
  list.forEach(function (item) {
    if (res.indexOf(item) === -1) res.push(item);
  });
  return res;
}

function isObject(value) {
  return value !== null && typeof value === "object";
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") return false;
  var proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

function addHiddenProp(object, propName, value) {
  Object.defineProperty(object, propName, {
    enumerable: false,
    writable: true,
    configurable: true,
    value: value
  });
}

function addHiddenFinalProp(object, propName, value) {
  Object.defineProperty(object, propName, {
    enumerable: false,
    writable: false,
    configurable: true,
    value: value
  });
}

function isPropertyConfigurable(object, prop) {
  var descriptor = Object.getOwnPropertyDescriptor(object, prop);
  return !descriptor || descriptor.configurable !== false && descriptor.writable !== false;
}

function assertPropertyConfigurable(object, prop) {
  if (process.env.NODE_ENV !== "production" && !isPropertyConfigurable(object, prop)) fail("Cannot make property '" + prop.toString() + "' observable, it is not configurable and writable in the target object");
}

function createInstanceofPredicate(name, clazz) {
  var propName = "isMobX" + name;
  clazz.prototype[propName] = true;
  return function (x) {
    return isObject(x) && x[propName] === true;
  };
}

function isES6Map(thing) {
  return thing instanceof Map;
}

function isES6Set(thing) {
  return thing instanceof Set;
}
/**
 * Returns the following: own keys, prototype keys & own symbol keys, if they are enumerable.
 */


function getPlainObjectKeys(object) {
  var enumerables = new Set();

  for (var key in object) enumerables.add(key); // *all* enumerables


  Object.getOwnPropertySymbols(object).forEach(function (k) {
    if (Object.getOwnPropertyDescriptor(object, k).enumerable) enumerables.add(k);
  }); // *own* symbols
  // Note: this implementation is missing enumerable, inherited, symbolic property names! That would however pretty expensive to add,
  // as there is no efficient iterator that returns *all* properties

  return Array.from(enumerables);
}

function stringifyKey(key) {
  if (key && key.toString) return key.toString();else return new String(key).toString();
}

function getMapLikeKeys(map) {
  if (isPlainObject(map)) return Object.keys(map);
  if (Array.isArray(map)) return map.map(function (_a) {
    var _b = __read(_a, 1),
        key = _b[0];

    return key;
  });
  if (isES6Map(map) || isObservableMap(map)) return Array.from(map.keys());
  return fail("Cannot get keys from '" + map + "'");
}

function toPrimitive(value) {
  return value === null ? null : typeof value === "object" ? "" + value : value;
}

var $mobx = Symbol("mobx administration");

var Atom =
/** @class */
function () {
  /**
   * Create a new atom. For debugging purposes it is recommended to give it a name.
   * The onBecomeObserved and onBecomeUnobserved callbacks can be used for resource management.
   */
  function Atom(name) {
    if (name === void 0) {
      name = "Atom@" + getNextId();
    }

    this.name = name;
    this.isPendingUnobservation = false; // for effective unobserving. BaseAtom has true, for extra optimization, so its onBecomeUnobserved never gets called, because it's not needed

    this.isBeingObserved = false;
    this.observers = new Set();
    this.diffValue = 0;
    this.lastAccessedBy = 0;
    this.lowestObserverState = IDerivationState.NOT_TRACKING;
  }

  Atom.prototype.onBecomeObserved = function () {
    if (this.onBecomeObservedListeners) {
      this.onBecomeObservedListeners.forEach(function (listener) {
        return listener();
      });
    }
  };

  Atom.prototype.onBecomeUnobserved = function () {
    if (this.onBecomeUnobservedListeners) {
      this.onBecomeUnobservedListeners.forEach(function (listener) {
        return listener();
      });
    }
  };
  /**
   * Invoke this method to notify mobx that your atom has been used somehow.
   * Returns true if there is currently a reactive context.
   */


  Atom.prototype.reportObserved = function () {
    return reportObserved(this);
  };
  /**
   * Invoke this method _after_ this method has changed to signal mobx that all its observers should invalidate.
   */


  Atom.prototype.reportChanged = function () {
    startBatch();
    propagateChanged(this);
    endBatch();
  };

  Atom.prototype.toString = function () {
    return this.name;
  };

  return Atom;
}();

var isAtom = createInstanceofPredicate("Atom", Atom);

function createAtom(name, onBecomeObservedHandler, onBecomeUnobservedHandler) {
  if (onBecomeObservedHandler === void 0) {
    onBecomeObservedHandler = noop;
  }

  if (onBecomeUnobservedHandler === void 0) {
    onBecomeUnobservedHandler = noop;
  }

  var atom = new Atom(name); // default `noop` listener will not initialize the hook Set

  if (onBecomeObservedHandler !== noop) {
    onBecomeObserved(atom, onBecomeObservedHandler);
  }

  if (onBecomeUnobservedHandler !== noop) {
    onBecomeUnobserved(atom, onBecomeUnobservedHandler);
  }

  return atom;
}

function identityComparer(a, b) {
  return a === b;
}

function structuralComparer(a, b) {
  return deepEqual(a, b);
}

function shallowComparer(a, b) {
  return deepEqual(a, b, 1);
}

function defaultComparer(a, b) {
  return Object.is(a, b);
}

var comparer = {
  identity: identityComparer,
  structural: structuralComparer,
  default: defaultComparer,
  shallow: shallowComparer
};
var mobxDidRunLazyInitializersSymbol = Symbol("mobx did run lazy initializers");
var mobxPendingDecorators = Symbol("mobx pending decorators");
var enumerableDescriptorCache = {};
var nonEnumerableDescriptorCache = {};

function createPropertyInitializerDescriptor(prop, enumerable) {
  var cache = enumerable ? enumerableDescriptorCache : nonEnumerableDescriptorCache;
  return cache[prop] || (cache[prop] = {
    configurable: true,
    enumerable: enumerable,
    get: function () {
      initializeInstance(this);
      return this[prop];
    },
    set: function (value) {
      initializeInstance(this);
      this[prop] = value;
    }
  });
}

function initializeInstance(target) {
  var e_1, _a;

  if (target[mobxDidRunLazyInitializersSymbol] === true) return;
  var decorators = target[mobxPendingDecorators];

  if (decorators) {
    addHiddenProp(target, mobxDidRunLazyInitializersSymbol, true); // Build property key array from both strings and symbols

    var keys = __spread(Object.getOwnPropertySymbols(decorators), Object.keys(decorators));

    try {
      for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
        var key = keys_1_1.value;
        var d = decorators[key];
        d.propertyCreator(target, d.prop, d.descriptor, d.decoratorTarget, d.decoratorArguments);
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
  }
}

function createPropDecorator(propertyInitiallyEnumerable, propertyCreator) {
  return function decoratorFactory() {
    var decoratorArguments;

    var decorator = function decorate(target, prop, descriptor, applyImmediately // This is a special parameter to signal the direct application of a decorator, allow extendObservable to skip the entire type decoration part,
    // as the instance to apply the decorator to equals the target
    ) {
      if (applyImmediately === true) {
        propertyCreator(target, prop, descriptor, target, decoratorArguments);
        return null;
      }

      if (process.env.NODE_ENV !== "production" && !quacksLikeADecorator(arguments)) fail("This function is a decorator, but it wasn't invoked like a decorator");

      if (!Object.prototype.hasOwnProperty.call(target, mobxPendingDecorators)) {
        var inheritedDecorators = target[mobxPendingDecorators];
        addHiddenProp(target, mobxPendingDecorators, __assign({}, inheritedDecorators));
      }

      target[mobxPendingDecorators][prop] = {
        prop: prop,
        propertyCreator: propertyCreator,
        descriptor: descriptor,
        decoratorTarget: target,
        decoratorArguments: decoratorArguments
      };
      return createPropertyInitializerDescriptor(prop, propertyInitiallyEnumerable);
    };

    if (quacksLikeADecorator(arguments)) {
      // @decorator
      decoratorArguments = EMPTY_ARRAY;
      return decorator.apply(null, arguments);
    } else {
      // @decorator(args)
      decoratorArguments = Array.prototype.slice.call(arguments);
      return decorator;
    }
  };
}

function quacksLikeADecorator(args) {
  return (args.length === 2 || args.length === 3) && (typeof args[1] === "string" || typeof args[1] === "symbol") || args.length === 4 && args[3] === true;
}

function deepEnhancer(v, _, name) {
  // it is an observable already, done
  if (isObservable(v)) return v; // something that can be converted and mutated?

  if (Array.isArray(v)) return observable.array(v, {
    name: name
  });
  if (isPlainObject(v)) return observable.object(v, undefined, {
    name: name
  });
  if (isES6Map(v)) return observable.map(v, {
    name: name
  });
  if (isES6Set(v)) return observable.set(v, {
    name: name
  });
  return v;
}

function shallowEnhancer(v, _, name) {
  if (v === undefined || v === null) return v;
  if (isObservableObject(v) || isObservableArray(v) || isObservableMap(v) || isObservableSet(v)) return v;
  if (Array.isArray(v)) return observable.array(v, {
    name: name,
    deep: false
  });
  if (isPlainObject(v)) return observable.object(v, undefined, {
    name: name,
    deep: false
  });
  if (isES6Map(v)) return observable.map(v, {
    name: name,
    deep: false
  });
  if (isES6Set(v)) return observable.set(v, {
    name: name,
    deep: false
  });
  return fail(process.env.NODE_ENV !== "production" && "The shallow modifier / decorator can only used in combination with arrays, objects, maps and sets");
}

function referenceEnhancer(newValue) {
  // never turn into an observable
  return newValue;
}

function refStructEnhancer(v, oldValue, name) {
  if (process.env.NODE_ENV !== "production" && isObservable(v)) throw "observable.struct should not be used with observable values";
  if (deepEqual(v, oldValue)) return oldValue;
  return v;
}

function createDecoratorForEnhancer(enhancer) {
  invariant(enhancer);
  var decorator = createPropDecorator(true, function (target, propertyName, descriptor, _decoratorTarget, decoratorArgs) {
    if (process.env.NODE_ENV !== "production") {
      invariant(!descriptor || !descriptor.get, "@observable cannot be used on getter (property \"" + stringifyKey(propertyName) + "\"), use @computed instead.");
    }

    var initialValue = descriptor ? descriptor.initializer ? descriptor.initializer.call(target) : descriptor.value : undefined;
    asObservableObject(target).addObservableProp(propertyName, initialValue, enhancer);
  });
  var res = // Extra process checks, as this happens during module initialization
  typeof process !== "undefined" && process.env && process.env.NODE_ENV !== "production" ? function observableDecorator() {
    // This wrapper function is just to detect illegal decorator invocations, deprecate in a next version
    // and simply return the created prop decorator
    if (arguments.length < 2) return fail("Incorrect decorator invocation. @observable decorator doesn't expect any arguments");
    return decorator.apply(null, arguments);
  } : decorator;
  res.enhancer = enhancer;
  return res;
} // Predefined bags of create observable options, to avoid allocating temporarily option objects
// in the majority of cases


var defaultCreateObservableOptions = {
  deep: true,
  name: undefined,
  defaultDecorator: undefined,
  proxy: true
};
Object.freeze(defaultCreateObservableOptions);

function assertValidOption(key) {
  if (!/^(deep|name|equals|defaultDecorator|proxy)$/.test(key)) fail("invalid option for (extend)observable: " + key);
}

function asCreateObservableOptions(thing) {
  if (thing === null || thing === undefined) return defaultCreateObservableOptions;
  if (typeof thing === "string") return {
    name: thing,
    deep: true,
    proxy: true
  };

  if (process.env.NODE_ENV !== "production") {
    if (typeof thing !== "object") return fail("expected options object");
    Object.keys(thing).forEach(assertValidOption);
  }

  return thing;
}

var deepDecorator = createDecoratorForEnhancer(deepEnhancer);
var shallowDecorator = createDecoratorForEnhancer(shallowEnhancer);
var refDecorator = createDecoratorForEnhancer(referenceEnhancer);
var refStructDecorator = createDecoratorForEnhancer(refStructEnhancer);

function getEnhancerFromOptions(options) {
  return options.defaultDecorator ? options.defaultDecorator.enhancer : options.deep === false ? referenceEnhancer : deepEnhancer;
}
/**
 * Turns an object, array or function into a reactive structure.
 * @param v the value which should become observable.
 */


function createObservable(v, arg2, arg3) {
  // @observable someProp;
  if (typeof arguments[1] === "string" || typeof arguments[1] === "symbol") {
    return deepDecorator.apply(null, arguments);
  } // it is an observable already, done


  if (isObservable(v)) return v; // something that can be converted and mutated?

  var res = isPlainObject(v) ? observable.object(v, arg2, arg3) : Array.isArray(v) ? observable.array(v, arg2) : isES6Map(v) ? observable.map(v, arg2) : isES6Set(v) ? observable.set(v, arg2) : v; // this value could be converted to a new observable data structure, return it

  if (res !== v) return res; // otherwise, just box it

  fail(process.env.NODE_ENV !== "production" && "The provided value could not be converted into an observable. If you want just create an observable reference to the object use 'observable.box(value)'");
}

var observableFactories = {
  box: function (value, options) {
    if (arguments.length > 2) incorrectlyUsedAsDecorator("box");
    var o = asCreateObservableOptions(options);
    return new ObservableValue(value, getEnhancerFromOptions(o), o.name, true, o.equals);
  },
  array: function (initialValues, options) {
    if (arguments.length > 2) incorrectlyUsedAsDecorator("array");
    var o = asCreateObservableOptions(options);
    return createObservableArray(initialValues, getEnhancerFromOptions(o), o.name);
  },
  map: function (initialValues, options) {
    if (arguments.length > 2) incorrectlyUsedAsDecorator("map");
    var o = asCreateObservableOptions(options);
    return new ObservableMap(initialValues, getEnhancerFromOptions(o), o.name);
  },
  set: function (initialValues, options) {
    if (arguments.length > 2) incorrectlyUsedAsDecorator("set");
    var o = asCreateObservableOptions(options);
    return new ObservableSet(initialValues, getEnhancerFromOptions(o), o.name);
  },
  object: function (props, decorators, options) {
    if (typeof arguments[1] === "string") incorrectlyUsedAsDecorator("object");
    var o = asCreateObservableOptions(options);

    if (o.proxy === false) {
      return extendObservable({}, props, decorators, o);
    } else {
      var defaultDecorator = getDefaultDecoratorFromObjectOptions(o);
      var base = extendObservable({}, undefined, undefined, o);
      var proxy = createDynamicObservableObject(base);
      extendObservableObjectWithProperties(proxy, props, decorators, defaultDecorator);
      return proxy;
    }
  },
  ref: refDecorator,
  shallow: shallowDecorator,
  deep: deepDecorator,
  struct: refStructDecorator
};
var observable = createObservable; // weird trick to keep our typings nicely with our funcs, and still extend the observable function

Object.keys(observableFactories).forEach(function (name) {
  return observable[name] = observableFactories[name];
});

function incorrectlyUsedAsDecorator(methodName) {
  fail( // process.env.NODE_ENV !== "production" &&
  "Expected one or two arguments to observable." + methodName + ". Did you accidentally try to use observable." + methodName + " as decorator?");
}

var computedDecorator = createPropDecorator(false, function (instance, propertyName, descriptor, decoratorTarget, decoratorArgs) {
  var get = descriptor.get,
      set = descriptor.set; // initialValue is the descriptor for get / set props
  // Optimization: faster on decorator target or instance? Assuming target
  // Optimization: find out if declaring on instance isn't just faster. (also makes the property descriptor simpler). But, more memory usage..
  // Forcing instance now, fixes hot reloadig issues on React Native:

  var options = decoratorArgs[0] || {};
  asObservableObject(instance).addComputedProp(instance, propertyName, __assign({
    get: get,
    set: set,
    context: instance
  }, options));
});
var computedStructDecorator = computedDecorator({
  equals: comparer.structural
});
/**
 * Decorator for class properties: @computed get value() { return expr; }.
 * For legacy purposes also invokable as ES5 observable created: `computed(() => expr)`;
 */

var computed = function computed(arg1, arg2, arg3) {
  if (typeof arg2 === "string") {
    // @computed
    return computedDecorator.apply(null, arguments);
  }

  if (arg1 !== null && typeof arg1 === "object" && arguments.length === 1) {
    // @computed({ options })
    return computedDecorator.apply(null, arguments);
  } // computed(expr, options?)


  if (process.env.NODE_ENV !== "production") {
    invariant(typeof arg1 === "function", "First argument to `computed` should be an expression.");
    invariant(arguments.length < 3, "Computed takes one or two arguments if used as function");
  }

  var opts = typeof arg2 === "object" ? arg2 : {};
  opts.get = arg1;
  opts.set = typeof arg2 === "function" ? arg2 : opts.set;
  opts.name = opts.name || arg1.name || "";
  /* for generated name */

  return new ComputedValue(opts);
};

computed.struct = computedStructDecorator;
var IDerivationState;

(function (IDerivationState) {
  // before being run or (outside batch and not being observed)
  // at this point derivation is not holding any data about dependency tree
  IDerivationState[IDerivationState["NOT_TRACKING"] = -1] = "NOT_TRACKING"; // no shallow dependency changed since last computation
  // won't recalculate derivation
  // this is what makes mobx fast

  IDerivationState[IDerivationState["UP_TO_DATE"] = 0] = "UP_TO_DATE"; // some deep dependency changed, but don't know if shallow dependency changed
  // will require to check first if UP_TO_DATE or POSSIBLY_STALE
  // currently only ComputedValue will propagate POSSIBLY_STALE
  //
  // having this state is second big optimization:
  // don't have to recompute on every dependency change, but only when it's needed

  IDerivationState[IDerivationState["POSSIBLY_STALE"] = 1] = "POSSIBLY_STALE"; // A shallow dependency has changed since last computation and the derivation
  // will need to recompute when it's needed next.

  IDerivationState[IDerivationState["STALE"] = 2] = "STALE";
})(IDerivationState || (IDerivationState = {}));

var TraceMode;

(function (TraceMode) {
  TraceMode[TraceMode["NONE"] = 0] = "NONE";
  TraceMode[TraceMode["LOG"] = 1] = "LOG";
  TraceMode[TraceMode["BREAK"] = 2] = "BREAK";
})(TraceMode || (TraceMode = {}));

var CaughtException =
/** @class */
function () {
  function CaughtException(cause) {
    this.cause = cause; // Empty
  }

  return CaughtException;
}();

function isCaughtException(e) {
  return e instanceof CaughtException;
}
/**
 * Finds out whether any dependency of the derivation has actually changed.
 * If dependenciesState is 1 then it will recalculate dependencies,
 * if any dependency changed it will propagate it by changing dependenciesState to 2.
 *
 * By iterating over the dependencies in the same order that they were reported and
 * stopping on the first change, all the recalculations are only called for ComputedValues
 * that will be tracked by derivation. That is because we assume that if the first x
 * dependencies of the derivation doesn't change then the derivation should run the same way
 * up until accessing x-th dependency.
 */


function shouldCompute(derivation) {
  switch (derivation.dependenciesState) {
    case IDerivationState.UP_TO_DATE:
      return false;

    case IDerivationState.NOT_TRACKING:
    case IDerivationState.STALE:
      return true;

    case IDerivationState.POSSIBLY_STALE:
      {
        // state propagation can occur outside of action/reactive context #2195
        var prevAllowStateReads = allowStateReadsStart(true);
        var prevUntracked = untrackedStart(); // no need for those computeds to be reported, they will be picked up in trackDerivedFunction.

        var obs = derivation.observing,
            l = obs.length;

        for (var i = 0; i < l; i++) {
          var obj = obs[i];

          if (isComputedValue(obj)) {
            if (globalState.disableErrorBoundaries) {
              obj.get();
            } else {
              try {
                obj.get();
              } catch (e) {
                // we are not interested in the value *or* exception at this moment, but if there is one, notify all
                untrackedEnd(prevUntracked);
                allowStateReadsEnd(prevAllowStateReads);
                return true;
              }
            } // if ComputedValue `obj` actually changed it will be computed and propagated to its observers.
            // and `derivation` is an observer of `obj`
            // invariantShouldCompute(derivation)


            if (derivation.dependenciesState === IDerivationState.STALE) {
              untrackedEnd(prevUntracked);
              allowStateReadsEnd(prevAllowStateReads);
              return true;
            }
          }
        }

        changeDependenciesStateTo0(derivation);
        untrackedEnd(prevUntracked);
        allowStateReadsEnd(prevAllowStateReads);
        return false;
      }
  }
} // function invariantShouldCompute(derivation: IDerivation) {

function checkIfStateModificationsAreAllowed(atom) {
  var hasObservers = atom.observers.size > 0; // Should never be possible to change an observed observable from inside computed, see #798

  if (globalState.computationDepth > 0 && hasObservers) fail(process.env.NODE_ENV !== "production" && "Computed values are not allowed to cause side effects by changing observables that are already being observed. Tried to modify: " + atom.name); // Should not be possible to change observed state outside strict mode, except during initialization, see #563

  if (!globalState.allowStateChanges && (hasObservers || globalState.enforceActions === "strict")) fail(process.env.NODE_ENV !== "production" && (globalState.enforceActions ? "Since strict-mode is enabled, changing observed observable values outside actions is not allowed. Please wrap the code in an `action` if this change is intended. Tried to modify: " : "Side effects like changing state are not allowed at this point. Are you trying to modify state from, for example, the render function of a React component? Tried to modify: ") + atom.name);
}

function checkIfStateReadsAreAllowed(observable) {
  if (process.env.NODE_ENV !== "production" && !globalState.allowStateReads && globalState.observableRequiresReaction) {
    console.warn("[mobx] Observable " + observable.name + " being read outside a reactive context");
  }
}
/**
 * Executes the provided function `f` and tracks which observables are being accessed.
 * The tracking information is stored on the `derivation` object and the derivation is registered
 * as observer of any of the accessed observables.
 */


function trackDerivedFunction(derivation, f, context) {
  var prevAllowStateReads = allowStateReadsStart(true); // pre allocate array allocation + room for variation in deps
  // array will be trimmed by bindDependencies

  changeDependenciesStateTo0(derivation);
  derivation.newObserving = new Array(derivation.observing.length + 100);
  derivation.unboundDepsCount = 0;
  derivation.runId = ++globalState.runId;
  var prevTracking = globalState.trackingDerivation;
  globalState.trackingDerivation = derivation;
  var result;

  if (globalState.disableErrorBoundaries === true) {
    result = f.call(context);
  } else {
    try {
      result = f.call(context);
    } catch (e) {
      result = new CaughtException(e);
    }
  }

  globalState.trackingDerivation = prevTracking;
  bindDependencies(derivation);
  warnAboutDerivationWithoutDependencies(derivation);
  allowStateReadsEnd(prevAllowStateReads);
  return result;
}

function warnAboutDerivationWithoutDependencies(derivation) {
  if (process.env.NODE_ENV === "production") return;
  if (derivation.observing.length !== 0) return;

  if (globalState.reactionRequiresObservable || derivation.requiresObservable) {
    console.warn("[mobx] Derivation " + derivation.name + " is created/updated without reading any observable value");
  }
}
/**
 * diffs newObserving with observing.
 * update observing to be newObserving with unique observables
 * notify observers that become observed/unobserved
 */


function bindDependencies(derivation) {
  // invariant(derivation.dependenciesState !== IDerivationState.NOT_TRACKING, "INTERNAL ERROR bindDependencies expects derivation.dependenciesState !== -1");
  var prevObserving = derivation.observing;
  var observing = derivation.observing = derivation.newObserving;
  var lowestNewObservingDerivationState = IDerivationState.UP_TO_DATE; // Go through all new observables and check diffValue: (this list can contain duplicates):
  //   0: first occurrence, change to 1 and keep it
  //   1: extra occurrence, drop it

  var i0 = 0,
      l = derivation.unboundDepsCount;

  for (var i = 0; i < l; i++) {
    var dep = observing[i];

    if (dep.diffValue === 0) {
      dep.diffValue = 1;
      if (i0 !== i) observing[i0] = dep;
      i0++;
    } // Upcast is 'safe' here, because if dep is IObservable, `dependenciesState` will be undefined,
    // not hitting the condition


    if (dep.dependenciesState > lowestNewObservingDerivationState) {
      lowestNewObservingDerivationState = dep.dependenciesState;
    }
  }

  observing.length = i0;
  derivation.newObserving = null; // newObserving shouldn't be needed outside tracking (statement moved down to work around FF bug, see #614)
  // Go through all old observables and check diffValue: (it is unique after last bindDependencies)
  //   0: it's not in new observables, unobserve it
  //   1: it keeps being observed, don't want to notify it. change to 0

  l = prevObserving.length;

  while (l--) {
    var dep = prevObserving[l];

    if (dep.diffValue === 0) {
      removeObserver(dep, derivation);
    }

    dep.diffValue = 0;
  } // Go through all new observables and check diffValue: (now it should be unique)
  //   0: it was set to 0 in last loop. don't need to do anything.
  //   1: it wasn't observed, let's observe it. set back to 0


  while (i0--) {
    var dep = observing[i0];

    if (dep.diffValue === 1) {
      dep.diffValue = 0;
      addObserver(dep, derivation);
    }
  } // Some new observed derivations may become stale during this derivation computation
  // so they have had no chance to propagate staleness (#916)


  if (lowestNewObservingDerivationState !== IDerivationState.UP_TO_DATE) {
    derivation.dependenciesState = lowestNewObservingDerivationState;
    derivation.onBecomeStale();
  }
}

function clearObserving(derivation) {
  // invariant(globalState.inBatch > 0, "INTERNAL ERROR clearObserving should be called only inside batch");
  var obs = derivation.observing;
  derivation.observing = [];
  var i = obs.length;

  while (i--) removeObserver(obs[i], derivation);

  derivation.dependenciesState = IDerivationState.NOT_TRACKING;
}

function untracked(action) {
  var prev = untrackedStart();

  try {
    return action();
  } finally {
    untrackedEnd(prev);
  }
}

function untrackedStart() {
  var prev = globalState.trackingDerivation;
  globalState.trackingDerivation = null;
  return prev;
}

function untrackedEnd(prev) {
  globalState.trackingDerivation = prev;
}

function allowStateReadsStart(allowStateReads) {
  var prev = globalState.allowStateReads;
  globalState.allowStateReads = allowStateReads;
  return prev;
}

function allowStateReadsEnd(prev) {
  globalState.allowStateReads = prev;
}
/**
 * needed to keep `lowestObserverState` correct. when changing from (2 or 1) to 0
 *
 */


function changeDependenciesStateTo0(derivation) {
  if (derivation.dependenciesState === IDerivationState.UP_TO_DATE) return;
  derivation.dependenciesState = IDerivationState.UP_TO_DATE;
  var obs = derivation.observing;
  var i = obs.length;

  while (i--) obs[i].lowestObserverState = IDerivationState.UP_TO_DATE;
} // we don't use globalState for these in order to avoid possible issues with multiple
// mobx versions


var currentActionId = 0;
var nextActionId = 1;
var functionNameDescriptor = Object.getOwnPropertyDescriptor(function () {}, "name");
var isFunctionNameConfigurable = functionNameDescriptor && functionNameDescriptor.configurable;

function createAction(actionName, fn, ref) {
  if (process.env.NODE_ENV !== "production") {
    invariant(typeof fn === "function", "`action` can only be invoked on functions");
    if (typeof actionName !== "string" || !actionName) fail("actions should have valid names, got: '" + actionName + "'");
  }

  var res = function () {
    return executeAction(actionName, fn, ref || this, arguments);
  };

  res.isMobxAction = true;

  if (process.env.NODE_ENV !== "production") {
    if (isFunctionNameConfigurable) {
      Object.defineProperty(res, "name", {
        value: actionName
      });
    }
  }

  return res;
}

function executeAction(actionName, fn, scope, args) {
  var runInfo = _startAction(actionName, scope, args);

  try {
    return fn.apply(scope, args);
  } catch (err) {
    runInfo.error = err;
    throw err;
  } finally {
    _endAction(runInfo);
  }
}

function _startAction(actionName, scope, args) {
  var notifySpy = isSpyEnabled() && !!actionName;
  var startTime = 0;

  if (notifySpy && process.env.NODE_ENV !== "production") {
    startTime = Date.now();
    var l = args && args.length || 0;
    var flattendArgs = new Array(l);
    if (l > 0) for (var i = 0; i < l; i++) flattendArgs[i] = args[i];
    spyReportStart({
      type: "action",
      name: actionName,
      object: scope,
      arguments: flattendArgs
    });
  }

  var prevDerivation = untrackedStart();
  startBatch();
  var prevAllowStateChanges = allowStateChangesStart(true);
  var prevAllowStateReads = allowStateReadsStart(true);
  var runInfo = {
    prevDerivation: prevDerivation,
    prevAllowStateChanges: prevAllowStateChanges,
    prevAllowStateReads: prevAllowStateReads,
    notifySpy: notifySpy,
    startTime: startTime,
    actionId: nextActionId++,
    parentActionId: currentActionId
  };
  currentActionId = runInfo.actionId;
  return runInfo;
}

function _endAction(runInfo) {
  if (currentActionId !== runInfo.actionId) {
    fail("invalid action stack. did you forget to finish an action?");
  }

  currentActionId = runInfo.parentActionId;

  if (runInfo.error !== undefined) {
    globalState.suppressReactionErrors = true;
  }

  allowStateChangesEnd(runInfo.prevAllowStateChanges);
  allowStateReadsEnd(runInfo.prevAllowStateReads);
  endBatch();
  untrackedEnd(runInfo.prevDerivation);

  if (runInfo.notifySpy && process.env.NODE_ENV !== "production") {
    spyReportEnd({
      time: Date.now() - runInfo.startTime
    });
  }

  globalState.suppressReactionErrors = false;
}

function allowStateChanges(allowStateChanges, func) {
  var prev = allowStateChangesStart(allowStateChanges);
  var res;

  try {
    res = func();
  } finally {
    allowStateChangesEnd(prev);
  }

  return res;
}

function allowStateChangesStart(allowStateChanges) {
  var prev = globalState.allowStateChanges;
  globalState.allowStateChanges = allowStateChanges;
  return prev;
}

function allowStateChangesEnd(prev) {
  globalState.allowStateChanges = prev;
}

var ObservableValue =
/** @class */
function (_super) {
  __extends(ObservableValue, _super);

  function ObservableValue(value, enhancer, name, notifySpy, equals) {
    if (name === void 0) {
      name = "ObservableValue@" + getNextId();
    }

    if (notifySpy === void 0) {
      notifySpy = true;
    }

    if (equals === void 0) {
      equals = comparer.default;
    }

    var _this = _super.call(this, name) || this;

    _this.enhancer = enhancer;
    _this.name = name;
    _this.equals = equals;
    _this.hasUnreportedChange = false;
    _this.value = enhancer(value, undefined, name);

    if (notifySpy && isSpyEnabled() && process.env.NODE_ENV !== "production") {
      // only notify spy if this is a stand-alone observable
      spyReport({
        type: "create",
        name: _this.name,
        newValue: "" + _this.value
      });
    }

    return _this;
  }

  ObservableValue.prototype.dehanceValue = function (value) {
    if (this.dehancer !== undefined) return this.dehancer(value);
    return value;
  };

  ObservableValue.prototype.set = function (newValue) {
    var oldValue = this.value;
    newValue = this.prepareNewValue(newValue);

    if (newValue !== globalState.UNCHANGED) {
      var notifySpy = isSpyEnabled();

      if (notifySpy && process.env.NODE_ENV !== "production") {
        spyReportStart({
          type: "update",
          name: this.name,
          newValue: newValue,
          oldValue: oldValue
        });
      }

      this.setNewValue(newValue);
      if (notifySpy && process.env.NODE_ENV !== "production") spyReportEnd();
    }
  };

  ObservableValue.prototype.prepareNewValue = function (newValue) {
    checkIfStateModificationsAreAllowed(this);

    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        object: this,
        type: "update",
        newValue: newValue
      });
      if (!change) return globalState.UNCHANGED;
      newValue = change.newValue;
    } // apply modifier


    newValue = this.enhancer(newValue, this.value, this.name);
    return this.equals(this.value, newValue) ? globalState.UNCHANGED : newValue;
  };

  ObservableValue.prototype.setNewValue = function (newValue) {
    var oldValue = this.value;
    this.value = newValue;
    this.reportChanged();

    if (hasListeners(this)) {
      notifyListeners(this, {
        type: "update",
        object: this,
        newValue: newValue,
        oldValue: oldValue
      });
    }
  };

  ObservableValue.prototype.get = function () {
    this.reportObserved();
    return this.dehanceValue(this.value);
  };

  ObservableValue.prototype.intercept = function (handler) {
    return registerInterceptor(this, handler);
  };

  ObservableValue.prototype.observe = function (listener, fireImmediately) {
    if (fireImmediately) listener({
      object: this,
      type: "update",
      newValue: this.value,
      oldValue: undefined
    });
    return registerListener(this, listener);
  };

  ObservableValue.prototype.toJSON = function () {
    return this.get();
  };

  ObservableValue.prototype.toString = function () {
    return this.name + "[" + this.value + "]";
  };

  ObservableValue.prototype.valueOf = function () {
    return toPrimitive(this.get());
  };

  ObservableValue.prototype[Symbol.toPrimitive] = function () {
    return this.valueOf();
  };

  return ObservableValue;
}(Atom);

var isObservableValue = createInstanceofPredicate("ObservableValue", ObservableValue);
/**
 * A node in the state dependency root that observes other nodes, and can be observed itself.
 *
 * ComputedValue will remember the result of the computation for the duration of the batch, or
 * while being observed.
 *
 * During this time it will recompute only when one of its direct dependencies changed,
 * but only when it is being accessed with `ComputedValue.get()`.
 *
 * Implementation description:
 * 1. First time it's being accessed it will compute and remember result
 *    give back remembered result until 2. happens
 * 2. First time any deep dependency change, propagate POSSIBLY_STALE to all observers, wait for 3.
 * 3. When it's being accessed, recompute if any shallow dependency changed.
 *    if result changed: propagate STALE to all observers, that were POSSIBLY_STALE from the last step.
 *    go to step 2. either way
 *
 * If at any point it's outside batch and it isn't observed: reset everything and go to 1.
 */

var ComputedValue =
/** @class */
function () {
  /**
   * Create a new computed value based on a function expression.
   *
   * The `name` property is for debug purposes only.
   *
   * The `equals` property specifies the comparer function to use to determine if a newly produced
   * value differs from the previous value. Two comparers are provided in the library; `defaultComparer`
   * compares based on identity comparison (===), and `structualComparer` deeply compares the structure.
   * Structural comparison can be convenient if you always produce a new aggregated object and
   * don't want to notify observers if it is structurally the same.
   * This is useful for working with vectors, mouse coordinates etc.
   */
  function ComputedValue(options) {
    this.dependenciesState = IDerivationState.NOT_TRACKING;
    this.observing = []; // nodes we are looking at. Our value depends on these nodes

    this.newObserving = null; // during tracking it's an array with new observed observers

    this.isBeingObserved = false;
    this.isPendingUnobservation = false;
    this.observers = new Set();
    this.diffValue = 0;
    this.runId = 0;
    this.lastAccessedBy = 0;
    this.lowestObserverState = IDerivationState.UP_TO_DATE;
    this.unboundDepsCount = 0;
    this.__mapid = "#" + getNextId();
    this.value = new CaughtException(null);
    this.isComputing = false; // to check for cycles

    this.isRunningSetter = false;
    this.isTracing = TraceMode.NONE;
    invariant(options.get, "missing option for computed: get");
    this.derivation = options.get;
    this.name = options.name || "ComputedValue@" + getNextId();
    if (options.set) this.setter = createAction(this.name + "-setter", options.set);
    this.equals = options.equals || (options.compareStructural || options.struct ? comparer.structural : comparer.default);
    this.scope = options.context;
    this.requiresReaction = !!options.requiresReaction;
    this.keepAlive = !!options.keepAlive;
  }

  ComputedValue.prototype.onBecomeStale = function () {
    propagateMaybeChanged(this);
  };

  ComputedValue.prototype.onBecomeObserved = function () {
    if (this.onBecomeObservedListeners) {
      this.onBecomeObservedListeners.forEach(function (listener) {
        return listener();
      });
    }
  };

  ComputedValue.prototype.onBecomeUnobserved = function () {
    if (this.onBecomeUnobservedListeners) {
      this.onBecomeUnobservedListeners.forEach(function (listener) {
        return listener();
      });
    }
  };
  /**
   * Returns the current value of this computed value.
   * Will evaluate its computation first if needed.
   */


  ComputedValue.prototype.get = function () {
    if (this.isComputing) fail("Cycle detected in computation " + this.name + ": " + this.derivation);

    if (globalState.inBatch === 0 && this.observers.size === 0 && !this.keepAlive) {
      if (shouldCompute(this)) {
        this.warnAboutUntrackedRead();
        startBatch(); // See perf test 'computed memoization'

        this.value = this.computeValue(false);
        endBatch();
      }
    } else {
      reportObserved(this);
      if (shouldCompute(this)) if (this.trackAndCompute()) propagateChangeConfirmed(this);
    }

    var result = this.value;
    if (isCaughtException(result)) throw result.cause;
    return result;
  };

  ComputedValue.prototype.peek = function () {
    var res = this.computeValue(false);
    if (isCaughtException(res)) throw res.cause;
    return res;
  };

  ComputedValue.prototype.set = function (value) {
    if (this.setter) {
      invariant(!this.isRunningSetter, "The setter of computed value '" + this.name + "' is trying to update itself. Did you intend to update an _observable_ value, instead of the computed property?");
      this.isRunningSetter = true;

      try {
        this.setter.call(this.scope, value);
      } finally {
        this.isRunningSetter = false;
      }
    } else invariant(false, process.env.NODE_ENV !== "production" && "[ComputedValue '" + this.name + "'] It is not possible to assign a new value to a computed value.");
  };

  ComputedValue.prototype.trackAndCompute = function () {
    if (isSpyEnabled() && process.env.NODE_ENV !== "production") {
      spyReport({
        object: this.scope,
        type: "compute",
        name: this.name
      });
    }

    var oldValue = this.value;
    var wasSuspended =
    /* see #1208 */
    this.dependenciesState === IDerivationState.NOT_TRACKING;
    var newValue = this.computeValue(true);
    var changed = wasSuspended || isCaughtException(oldValue) || isCaughtException(newValue) || !this.equals(oldValue, newValue);

    if (changed) {
      this.value = newValue;
    }

    return changed;
  };

  ComputedValue.prototype.computeValue = function (track) {
    this.isComputing = true;
    globalState.computationDepth++;
    var res;

    if (track) {
      res = trackDerivedFunction(this, this.derivation, this.scope);
    } else {
      if (globalState.disableErrorBoundaries === true) {
        res = this.derivation.call(this.scope);
      } else {
        try {
          res = this.derivation.call(this.scope);
        } catch (e) {
          res = new CaughtException(e);
        }
      }
    }

    globalState.computationDepth--;
    this.isComputing = false;
    return res;
  };

  ComputedValue.prototype.suspend = function () {
    if (!this.keepAlive) {
      clearObserving(this);
      this.value = undefined; // don't hold on to computed value!
    }
  };

  ComputedValue.prototype.observe = function (listener, fireImmediately) {
    var _this = this;

    var firstTime = true;
    var prevValue = undefined;
    return autorun(function () {
      var newValue = _this.get();

      if (!firstTime || fireImmediately) {
        var prevU = untrackedStart();
        listener({
          type: "update",
          object: _this,
          newValue: newValue,
          oldValue: prevValue
        });
        untrackedEnd(prevU);
      }

      firstTime = false;
      prevValue = newValue;
    });
  };

  ComputedValue.prototype.warnAboutUntrackedRead = function () {
    if (process.env.NODE_ENV === "production") return;

    if (this.requiresReaction === true) {
      fail("[mobx] Computed value " + this.name + " is read outside a reactive context");
    }

    if (this.isTracing !== TraceMode.NONE) {
      console.log("[mobx.trace] '" + this.name + "' is being read outside a reactive context. Doing a full recompute");
    }

    if (globalState.computedRequiresReaction) {
      console.warn("[mobx] Computed value " + this.name + " is being read outside a reactive context. Doing a full recompute");
    }
  };

  ComputedValue.prototype.toJSON = function () {
    return this.get();
  };

  ComputedValue.prototype.toString = function () {
    return this.name + "[" + this.derivation.toString() + "]";
  };

  ComputedValue.prototype.valueOf = function () {
    return toPrimitive(this.get());
  };

  ComputedValue.prototype[Symbol.toPrimitive] = function () {
    return this.valueOf();
  };

  return ComputedValue;
}();

var isComputedValue = createInstanceofPredicate("ComputedValue", ComputedValue);

var MobXGlobals =
/** @class */
function () {
  function MobXGlobals() {
    /**
     * MobXGlobals version.
     * MobX compatiblity with other versions loaded in memory as long as this version matches.
     * It indicates that the global state still stores similar information
     *
     * N.B: this version is unrelated to the package version of MobX, and is only the version of the
     * internal state storage of MobX, and can be the same across many different package versions
     */
    this.version = 5;
    /**
     * globally unique token to signal unchanged
     */

    this.UNCHANGED = {};
    /**
     * Currently running derivation
     */

    this.trackingDerivation = null;
    /**
     * Are we running a computation currently? (not a reaction)
     */

    this.computationDepth = 0;
    /**
     * Each time a derivation is tracked, it is assigned a unique run-id
     */

    this.runId = 0;
    /**
     * 'guid' for general purpose. Will be persisted amongst resets.
     */

    this.mobxGuid = 0;
    /**
     * Are we in a batch block? (and how many of them)
     */

    this.inBatch = 0;
    /**
     * Observables that don't have observers anymore, and are about to be
     * suspended, unless somebody else accesses it in the same batch
     *
     * @type {IObservable[]}
     */

    this.pendingUnobservations = [];
    /**
     * List of scheduled, not yet executed, reactions.
     */

    this.pendingReactions = [];
    /**
     * Are we currently processing reactions?
     */

    this.isRunningReactions = false;
    /**
     * Is it allowed to change observables at this point?
     * In general, MobX doesn't allow that when running computations and React.render.
     * To ensure that those functions stay pure.
     */

    this.allowStateChanges = true;
    /**
     * Is it allowed to read observables at this point?
     * Used to hold the state needed for `observableRequiresReaction`
     */

    this.allowStateReads = true;
    /**
     * If strict mode is enabled, state changes are by default not allowed
     */

    this.enforceActions = false;
    /**
     * Spy callbacks
     */

    this.spyListeners = [];
    /**
     * Globally attached error handlers that react specifically to errors in reactions
     */

    this.globalReactionErrorHandlers = [];
    /**
     * Warn if computed values are accessed outside a reactive context
     */

    this.computedRequiresReaction = false;
    /**
     * (Experimental)
     * Warn if you try to create to derivation / reactive context without accessing any observable.
     */

    this.reactionRequiresObservable = false;
    /**
     * (Experimental)
     * Warn if observables are accessed outside a reactive context
     */

    this.observableRequiresReaction = false;
    /**
     * Allows overwriting of computed properties, useful in tests but not prod as it can cause
     * memory leaks. See https://github.com/mobxjs/mobx/issues/1867
     */

    this.computedConfigurable = false;
    /*
     * Don't catch and rethrow exceptions. This is useful for inspecting the state of
     * the stack when an exception occurs while debugging.
     */

    this.disableErrorBoundaries = false;
    /*
     * If true, we are already handling an exception in an action. Any errors in reactions should be suppressed, as
     * they are not the cause, see: https://github.com/mobxjs/mobx/issues/1836
     */

    this.suppressReactionErrors = false;
  }

  return MobXGlobals;
}();

var mockGlobal = {};

function getGlobal() {
  if (typeof window !== "undefined") {
    return window;
  }

  if (typeof global !== "undefined") {
    return global;
  }

  if (typeof self !== "undefined") {
    return self;
  }

  return mockGlobal;
}

var canMergeGlobalState = true;

var globalState = function () {
  var global = getGlobal();
  if (global.__mobxInstanceCount > 0 && !global.__mobxGlobals) canMergeGlobalState = false;
  if (global.__mobxGlobals && global.__mobxGlobals.version !== new MobXGlobals().version) canMergeGlobalState = false;

  if (!canMergeGlobalState) {
    setTimeout(function () {
      {
        fail("There are multiple, different versions of MobX active. Make sure MobX is loaded only once or use `configure({ isolateGlobalState: true })`");
      }
    }, 1);
    return new MobXGlobals();
  } else if (global.__mobxGlobals) {
    global.__mobxInstanceCount += 1;
    if (!global.__mobxGlobals.UNCHANGED) global.__mobxGlobals.UNCHANGED = {}; // make merge backward compatible

    return global.__mobxGlobals;
  } else {
    global.__mobxInstanceCount = 1;
    return global.__mobxGlobals = new MobXGlobals();
  }
}();
//     const list = observable.observers
//     const map = observable.observersIndexes
//     const l = list.length
//     for (let i = 0; i < l; i++) {
//         const id = list[i].__mapid
//         if (i) {
//             invariant(map[id] === i, "INTERNAL ERROR maps derivation.__mapid to index in list") // for performance
//         } else {
//             invariant(!(id in map), "INTERNAL ERROR observer on index 0 shouldn't be held in map.") // for performance
//         }
//     }
//     invariant(
//         list.length === 0 || Object.keys(map).length === list.length - 1,
//         "INTERNAL ERROR there is no junk in map"
//     )
// }


function addObserver(observable, node) {
  // invariant(node.dependenciesState !== -1, "INTERNAL ERROR, can add only dependenciesState !== -1");
  // invariant(observable._observers.indexOf(node) === -1, "INTERNAL ERROR add already added node");
  // invariantObservers(observable);
  observable.observers.add(node);
  if (observable.lowestObserverState > node.dependenciesState) observable.lowestObserverState = node.dependenciesState; // invariantObservers(observable);
  // invariant(observable._observers.indexOf(node) !== -1, "INTERNAL ERROR didn't add node");
}

function removeObserver(observable, node) {
  // invariant(globalState.inBatch > 0, "INTERNAL ERROR, remove should be called only inside batch");
  // invariant(observable._observers.indexOf(node) !== -1, "INTERNAL ERROR remove already removed node");
  // invariantObservers(observable);
  observable.observers.delete(node);

  if (observable.observers.size === 0) {
    // deleting last observer
    queueForUnobservation(observable);
  } // invariantObservers(observable);
  // invariant(observable._observers.indexOf(node) === -1, "INTERNAL ERROR remove already removed node2");

}

function queueForUnobservation(observable) {
  if (observable.isPendingUnobservation === false) {
    // invariant(observable._observers.length === 0, "INTERNAL ERROR, should only queue for unobservation unobserved observables");
    observable.isPendingUnobservation = true;
    globalState.pendingUnobservations.push(observable);
  }
}
/**
 * Batch starts a transaction, at least for purposes of memoizing ComputedValues when nothing else does.
 * During a batch `onBecomeUnobserved` will be called at most once per observable.
 * Avoids unnecessary recalculations.
 */


function startBatch() {
  globalState.inBatch++;
}

function endBatch() {
  if (--globalState.inBatch === 0) {
    runReactions(); // the batch is actually about to finish, all unobserving should happen here.

    var list = globalState.pendingUnobservations;

    for (var i = 0; i < list.length; i++) {
      var observable = list[i];
      observable.isPendingUnobservation = false;

      if (observable.observers.size === 0) {
        if (observable.isBeingObserved) {
          // if this observable had reactive observers, trigger the hooks
          observable.isBeingObserved = false;
          observable.onBecomeUnobserved();
        }

        if (observable instanceof ComputedValue) {
          // computed values are automatically teared down when the last observer leaves
          // this process happens recursively, this computed might be the last observabe of another, etc..
          observable.suspend();
        }
      }
    }

    globalState.pendingUnobservations = [];
  }
}

function reportObserved(observable) {
  checkIfStateReadsAreAllowed(observable);
  var derivation = globalState.trackingDerivation;

  if (derivation !== null) {
    /**
     * Simple optimization, give each derivation run an unique id (runId)
     * Check if last time this observable was accessed the same runId is used
     * if this is the case, the relation is already known
     */
    if (derivation.runId !== observable.lastAccessedBy) {
      observable.lastAccessedBy = derivation.runId; // Tried storing newObserving, or observing, or both as Set, but performance didn't come close...

      derivation.newObserving[derivation.unboundDepsCount++] = observable;

      if (!observable.isBeingObserved) {
        observable.isBeingObserved = true;
        observable.onBecomeObserved();
      }
    }

    return true;
  } else if (observable.observers.size === 0 && globalState.inBatch > 0) {
    queueForUnobservation(observable);
  }

  return false;
} // function invariantLOS(observable: IObservable, msg: string) {
//     // it's expensive so better not run it in produciton. but temporarily helpful for testing
//     const min = getObservers(observable).reduce((a, b) => Math.min(a, b.dependenciesState), 2)
//     if (min >= observable.lowestObserverState) return // <- the only assumption about `lowestObserverState`
//     throw new Error(
//         "lowestObserverState is wrong for " +
//             msg +
//             " because " +
//             min +
//             " < " +
//             observable.lowestObserverState
//     )
// }

/**
 * NOTE: current propagation mechanism will in case of self reruning autoruns behave unexpectedly
 * It will propagate changes to observers from previous run
 * It's hard or maybe impossible (with reasonable perf) to get it right with current approach
 * Hopefully self reruning autoruns aren't a feature people should depend on
 * Also most basic use cases should be ok
 */
// Called by Atom when its value changes


function propagateChanged(observable) {
  // invariantLOS(observable, "changed start");
  if (observable.lowestObserverState === IDerivationState.STALE) return;
  observable.lowestObserverState = IDerivationState.STALE; // Ideally we use for..of here, but the downcompiled version is really slow...

  observable.observers.forEach(function (d) {
    if (d.dependenciesState === IDerivationState.UP_TO_DATE) {
      if (d.isTracing !== TraceMode.NONE) {
        logTraceInfo(d, observable);
      }

      d.onBecomeStale();
    }

    d.dependenciesState = IDerivationState.STALE;
  }); // invariantLOS(observable, "changed end");
} // Called by ComputedValue when it recalculate and its value changed


function propagateChangeConfirmed(observable) {
  // invariantLOS(observable, "confirmed start");
  if (observable.lowestObserverState === IDerivationState.STALE) return;
  observable.lowestObserverState = IDerivationState.STALE;
  observable.observers.forEach(function (d) {
    if (d.dependenciesState === IDerivationState.POSSIBLY_STALE) d.dependenciesState = IDerivationState.STALE;else if (d.dependenciesState === IDerivationState.UP_TO_DATE // this happens during computing of `d`, just keep lowestObserverState up to date.
    ) observable.lowestObserverState = IDerivationState.UP_TO_DATE;
  }); // invariantLOS(observable, "confirmed end");
} // Used by computed when its dependency changed, but we don't wan't to immediately recompute.


function propagateMaybeChanged(observable) {
  // invariantLOS(observable, "maybe start");
  if (observable.lowestObserverState !== IDerivationState.UP_TO_DATE) return;
  observable.lowestObserverState = IDerivationState.POSSIBLY_STALE;
  observable.observers.forEach(function (d) {
    if (d.dependenciesState === IDerivationState.UP_TO_DATE) {
      d.dependenciesState = IDerivationState.POSSIBLY_STALE;

      if (d.isTracing !== TraceMode.NONE) {
        logTraceInfo(d, observable);
      }

      d.onBecomeStale();
    }
  }); // invariantLOS(observable, "maybe end");
}

function logTraceInfo(derivation, observable) {
  console.log("[mobx.trace] '" + derivation.name + "' is invalidated due to a change in: '" + observable.name + "'");

  if (derivation.isTracing === TraceMode.BREAK) {
    var lines = [];
    printDepTree(getDependencyTree(derivation), lines, 1); // prettier-ignore

    new Function("debugger;\n/*\nTracing '" + derivation.name + "'\n\nYou are entering this break point because derivation '" + derivation.name + "' is being traced and '" + observable.name + "' is now forcing it to update.\nJust follow the stacktrace you should now see in the devtools to see precisely what piece of your code is causing this update\nThe stackframe you are looking for is at least ~6-8 stack-frames up.\n\n" + (derivation instanceof ComputedValue ? derivation.derivation.toString().replace(/[*]\//g, "/") : "") + "\n\nThe dependencies for this derivation are:\n\n" + lines.join("\n") + "\n*/\n    ")();
  }
}

function printDepTree(tree, lines, depth) {
  if (lines.length >= 1000) {
    lines.push("(and many more)");
    return;
  }

  lines.push("" + new Array(depth).join("\t") + tree.name); // MWE: not the fastest, but the easiest way :)

  if (tree.dependencies) tree.dependencies.forEach(function (child) {
    return printDepTree(child, lines, depth + 1);
  });
}

var Reaction =
/** @class */
function () {
  function Reaction(name, onInvalidate, errorHandler, requiresObservable) {
    if (name === void 0) {
      name = "Reaction@" + getNextId();
    }

    if (requiresObservable === void 0) {
      requiresObservable = false;
    }

    this.name = name;
    this.onInvalidate = onInvalidate;
    this.errorHandler = errorHandler;
    this.requiresObservable = requiresObservable;
    this.observing = []; // nodes we are looking at. Our value depends on these nodes

    this.newObserving = [];
    this.dependenciesState = IDerivationState.NOT_TRACKING;
    this.diffValue = 0;
    this.runId = 0;
    this.unboundDepsCount = 0;
    this.__mapid = "#" + getNextId();
    this.isDisposed = false;
    this._isScheduled = false;
    this._isTrackPending = false;
    this._isRunning = false;
    this.isTracing = TraceMode.NONE;
  }

  Reaction.prototype.onBecomeStale = function () {
    this.schedule();
  };

  Reaction.prototype.schedule = function () {
    if (!this._isScheduled) {
      this._isScheduled = true;
      globalState.pendingReactions.push(this);
      runReactions();
    }
  };

  Reaction.prototype.isScheduled = function () {
    return this._isScheduled;
  };
  /**
   * internal, use schedule() if you intend to kick off a reaction
   */


  Reaction.prototype.runReaction = function () {
    if (!this.isDisposed) {
      startBatch();
      this._isScheduled = false;

      if (shouldCompute(this)) {
        this._isTrackPending = true;

        try {
          this.onInvalidate();

          if (this._isTrackPending && isSpyEnabled() && process.env.NODE_ENV !== "production") {
            // onInvalidate didn't trigger track right away..
            spyReport({
              name: this.name,
              type: "scheduled-reaction"
            });
          }
        } catch (e) {
          this.reportExceptionInDerivation(e);
        }
      }

      endBatch();
    }
  };

  Reaction.prototype.track = function (fn) {
    if (this.isDisposed) {
      return; // console.warn("Reaction already disposed") // Note: Not a warning / error in mobx 4 either
    }

    startBatch();
    var notify = isSpyEnabled();
    var startTime;

    if (notify && process.env.NODE_ENV !== "production") {
      startTime = Date.now();
      spyReportStart({
        name: this.name,
        type: "reaction"
      });
    }

    this._isRunning = true;
    var result = trackDerivedFunction(this, fn, undefined);
    this._isRunning = false;
    this._isTrackPending = false;

    if (this.isDisposed) {
      // disposed during last run. Clean up everything that was bound after the dispose call.
      clearObserving(this);
    }

    if (isCaughtException(result)) this.reportExceptionInDerivation(result.cause);

    if (notify && process.env.NODE_ENV !== "production") {
      spyReportEnd({
        time: Date.now() - startTime
      });
    }

    endBatch();
  };

  Reaction.prototype.reportExceptionInDerivation = function (error) {
    var _this = this;

    if (this.errorHandler) {
      this.errorHandler(error, this);
      return;
    }

    if (globalState.disableErrorBoundaries) throw error;
    var message = "[mobx] Encountered an uncaught exception that was thrown by a reaction or observer component, in: '" + this + "'";

    if (globalState.suppressReactionErrors) {
      console.warn("[mobx] (error in reaction '" + this.name + "' suppressed, fix error of causing action below)"); // prettier-ignore
    } else {
      console.error(message, error);
      /** If debugging brought you here, please, read the above message :-). Tnx! */
    }

    if (isSpyEnabled()) {
      spyReport({
        type: "error",
        name: this.name,
        message: message,
        error: "" + error
      });
    }

    globalState.globalReactionErrorHandlers.forEach(function (f) {
      return f(error, _this);
    });
  };

  Reaction.prototype.dispose = function () {
    if (!this.isDisposed) {
      this.isDisposed = true;

      if (!this._isRunning) {
        // if disposed while running, clean up later. Maybe not optimal, but rare case
        startBatch();
        clearObserving(this);
        endBatch();
      }
    }
  };

  Reaction.prototype.getDisposer = function () {
    var r = this.dispose.bind(this);
    r[$mobx] = this;
    return r;
  };

  Reaction.prototype.toString = function () {
    return "Reaction[" + this.name + "]";
  };

  Reaction.prototype.trace = function (enterBreakPoint) {
    if (enterBreakPoint === void 0) {
      enterBreakPoint = false;
    }

    trace(this, enterBreakPoint);
  };

  return Reaction;
}();
/**
 * Magic number alert!
 * Defines within how many times a reaction is allowed to re-trigger itself
 * until it is assumed that this is gonna be a never ending loop...
 */


var MAX_REACTION_ITERATIONS = 100;

var reactionScheduler = function (f) {
  return f();
};

function runReactions() {
  // Trampolining, if runReactions are already running, new reactions will be picked up
  if (globalState.inBatch > 0 || globalState.isRunningReactions) return;
  reactionScheduler(runReactionsHelper);
}

function runReactionsHelper() {
  globalState.isRunningReactions = true;
  var allReactions = globalState.pendingReactions;
  var iterations = 0; // While running reactions, new reactions might be triggered.
  // Hence we work with two variables and check whether
  // we converge to no remaining reactions after a while.

  while (allReactions.length > 0) {
    if (++iterations === MAX_REACTION_ITERATIONS) {
      console.error("Reaction doesn't converge to a stable state after " + MAX_REACTION_ITERATIONS + " iterations." + (" Probably there is a cycle in the reactive function: " + allReactions[0]));
      allReactions.splice(0); // clear reactions
    }

    var remainingReactions = allReactions.splice(0);

    for (var i = 0, l = remainingReactions.length; i < l; i++) remainingReactions[i].runReaction();
  }

  globalState.isRunningReactions = false;
}

var isReaction = createInstanceofPredicate("Reaction", Reaction);

function isSpyEnabled() {
  return process.env.NODE_ENV !== "production" && !!globalState.spyListeners.length;
}

function spyReport(event) {
  if (process.env.NODE_ENV === "production") return; // dead code elimination can do the rest

  if (!globalState.spyListeners.length) return;
  var listeners = globalState.spyListeners;

  for (var i = 0, l = listeners.length; i < l; i++) listeners[i](event);
}

function spyReportStart(event) {
  if (process.env.NODE_ENV === "production") return;

  var change = __assign(__assign({}, event), {
    spyReportStart: true
  });

  spyReport(change);
}

var END_EVENT = {
  spyReportEnd: true
};

function spyReportEnd(change) {
  if (process.env.NODE_ENV === "production") return;
  if (change) spyReport(__assign(__assign({}, change), {
    spyReportEnd: true
  }));else spyReport(END_EVENT);
}

function spy(listener) {
  if (process.env.NODE_ENV === "production") {
    console.warn("[mobx.spy] Is a no-op in production builds");
    return function () {};
  } else {
    globalState.spyListeners.push(listener);
    return once(function () {
      globalState.spyListeners = globalState.spyListeners.filter(function (l) {
        return l !== listener;
      });
    });
  }
}

function dontReassignFields() {
  fail(process.env.NODE_ENV !== "production" && "@action fields are not reassignable");
}

function namedActionDecorator(name) {
  return function (target, prop, descriptor) {
    if (descriptor) {
      if (process.env.NODE_ENV !== "production" && descriptor.get !== undefined) {
        return fail("@action cannot be used with getters");
      } // babel / typescript
      // @action method() { }


      if (descriptor.value) {
        // typescript
        return {
          value: createAction(name, descriptor.value),
          enumerable: false,
          configurable: true,
          writable: true // for typescript, this must be writable, otherwise it cannot inherit :/ (see inheritable actions test)

        };
      } // babel only: @action method = () => {}


      var initializer_1 = descriptor.initializer;
      return {
        enumerable: false,
        configurable: true,
        writable: true,
        initializer: function () {
          // N.B: we can't immediately invoke initializer; this would be wrong
          return createAction(name, initializer_1.call(this));
        }
      };
    } // bound instance methods


    return actionFieldDecorator(name).apply(this, arguments);
  };
}

function actionFieldDecorator(name) {
  // Simple property that writes on first invocation to the current instance
  return function (target, prop, descriptor) {
    Object.defineProperty(target, prop, {
      configurable: true,
      enumerable: false,
      get: function () {
        return undefined;
      },
      set: function (value) {
        addHiddenProp(this, prop, action(name, value));
      }
    });
  };
}

function boundActionDecorator(target, propertyName, descriptor, applyToInstance) {
  if (applyToInstance === true) {
    defineBoundAction(target, propertyName, descriptor.value);
    return null;
  }

  if (descriptor) {
    // if (descriptor.value)
    // Typescript / Babel: @action.bound method() { }
    // also: babel @action.bound method = () => {}
    return {
      configurable: true,
      enumerable: false,
      get: function () {
        defineBoundAction(this, propertyName, descriptor.value || descriptor.initializer.call(this));
        return this[propertyName];
      },
      set: dontReassignFields
    };
  } // field decorator Typescript @action.bound method = () => {}


  return {
    enumerable: false,
    configurable: true,
    set: function (v) {
      defineBoundAction(this, propertyName, v);
    },
    get: function () {
      return undefined;
    }
  };
}

var action = function action(arg1, arg2, arg3, arg4) {
  // action(fn() {})
  if (arguments.length === 1 && typeof arg1 === "function") return createAction(arg1.name || "<unnamed action>", arg1); // action("name", fn() {})

  if (arguments.length === 2 && typeof arg2 === "function") return createAction(arg1, arg2); // @action("name") fn() {}

  if (arguments.length === 1 && typeof arg1 === "string") return namedActionDecorator(arg1); // @action fn() {}

  if (arg4 === true) {
    // apply to instance immediately
    addHiddenProp(arg1, arg2, createAction(arg1.name || arg2, arg3.value, this));
  } else {
    return namedActionDecorator(arg2).apply(null, arguments);
  }
};

action.bound = boundActionDecorator;

function runInAction(arg1, arg2) {
  var actionName = typeof arg1 === "string" ? arg1 : arg1.name || "<unnamed action>";
  var fn = typeof arg1 === "function" ? arg1 : arg2;

  if (process.env.NODE_ENV !== "production") {
    invariant(typeof fn === "function" && fn.length === 0, "`runInAction` expects a function without arguments");
    if (typeof actionName !== "string" || !actionName) fail("actions should have valid names, got: '" + actionName + "'");
  }

  return executeAction(actionName, fn, this, undefined);
}

function isAction(thing) {
  return typeof thing === "function" && thing.isMobxAction === true;
}

function defineBoundAction(target, propertyName, fn) {
  addHiddenProp(target, propertyName, createAction(propertyName, fn.bind(target)));
}
/**
 * Creates a named reactive view and keeps it alive, so that the view is always
 * updated if one of the dependencies changes, even when the view is not further used by something else.
 * @param view The reactive view
 * @returns disposer function, which can be used to stop the view from being updated in the future.
 */


function autorun(view, opts) {
  if (opts === void 0) {
    opts = EMPTY_OBJECT;
  }

  if (process.env.NODE_ENV !== "production") {
    invariant(typeof view === "function", "Autorun expects a function as first argument");
    invariant(isAction(view) === false, "Autorun does not accept actions since actions are untrackable");
  }

  var name = opts && opts.name || view.name || "Autorun@" + getNextId();
  var runSync = !opts.scheduler && !opts.delay;
  var reaction;

  if (runSync) {
    // normal autorun
    reaction = new Reaction(name, function () {
      this.track(reactionRunner);
    }, opts.onError, opts.requiresObservable);
  } else {
    var scheduler_1 = createSchedulerFromOptions(opts); // debounced autorun

    var isScheduled_1 = false;
    reaction = new Reaction(name, function () {
      if (!isScheduled_1) {
        isScheduled_1 = true;
        scheduler_1(function () {
          isScheduled_1 = false;
          if (!reaction.isDisposed) reaction.track(reactionRunner);
        });
      }
    }, opts.onError, opts.requiresObservable);
  }

  function reactionRunner() {
    view(reaction);
  }

  reaction.schedule();
  return reaction.getDisposer();
}

var run = function (f) {
  return f();
};

function createSchedulerFromOptions(opts) {
  return opts.scheduler ? opts.scheduler : opts.delay ? function (f) {
    return setTimeout(f, opts.delay);
  } : run;
}

function onBecomeObserved(thing, arg2, arg3) {
  return interceptHook("onBecomeObserved", thing, arg2, arg3);
}

function onBecomeUnobserved(thing, arg2, arg3) {
  return interceptHook("onBecomeUnobserved", thing, arg2, arg3);
}

function interceptHook(hook, thing, arg2, arg3) {
  var atom = typeof arg3 === "function" ? getAtom(thing, arg2) : getAtom(thing);
  var cb = typeof arg3 === "function" ? arg3 : arg2;
  var listenersKey = hook + "Listeners";

  if (atom[listenersKey]) {
    atom[listenersKey].add(cb);
  } else {
    atom[listenersKey] = new Set([cb]);
  }

  var orig = atom[hook];
  if (typeof orig !== "function") return fail(process.env.NODE_ENV !== "production" && "Not an atom that can be (un)observed");
  return function () {
    var hookListeners = atom[listenersKey];

    if (hookListeners) {
      hookListeners.delete(cb);

      if (hookListeners.size === 0) {
        delete atom[listenersKey];
      }
    }
  };
}

function extendObservable(target, properties, decorators, options) {
  if (process.env.NODE_ENV !== "production") {
    invariant(arguments.length >= 2 && arguments.length <= 4, "'extendObservable' expected 2-4 arguments");
    invariant(typeof target === "object", "'extendObservable' expects an object as first argument");
    invariant(!isObservableMap(target), "'extendObservable' should not be used on maps, use map.merge instead");
  }

  options = asCreateObservableOptions(options);
  var defaultDecorator = getDefaultDecoratorFromObjectOptions(options);
  initializeInstance(target); // Fixes #1740

  asObservableObject(target, options.name, defaultDecorator.enhancer); // make sure object is observable, even without initial props

  if (properties) extendObservableObjectWithProperties(target, properties, decorators, defaultDecorator);
  return target;
}

function getDefaultDecoratorFromObjectOptions(options) {
  return options.defaultDecorator || (options.deep === false ? refDecorator : deepDecorator);
}

function extendObservableObjectWithProperties(target, properties, decorators, defaultDecorator) {
  var e_1, _a, e_2, _b;

  if (process.env.NODE_ENV !== "production") {
    invariant(!isObservable(properties), "Extending an object with another observable (object) is not supported. Please construct an explicit propertymap, using `toJS` if need. See issue #540");

    if (decorators) {
      var keys = getPlainObjectKeys(decorators);

      try {
        for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
          var key = keys_1_1.value;
          if (!(key in properties)) fail("Trying to declare a decorator for unspecified property '" + stringifyKey(key) + "'");
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
    }
  }

  startBatch();

  try {
    var keys = getPlainObjectKeys(properties);

    try {
      for (var keys_2 = __values(keys), keys_2_1 = keys_2.next(); !keys_2_1.done; keys_2_1 = keys_2.next()) {
        var key = keys_2_1.value;
        var descriptor = Object.getOwnPropertyDescriptor(properties, key);

        if (process.env.NODE_ENV !== "production") {
          if (!isPlainObject(properties)) fail("'extendObservabe' only accepts plain objects as second argument");
          if (isComputed(descriptor.value)) fail("Passing a 'computed' as initial property value is no longer supported by extendObservable. Use a getter or decorator instead");
        }

        var decorator = decorators && key in decorators ? decorators[key] : descriptor.get ? computedDecorator : defaultDecorator;
        if (process.env.NODE_ENV !== "production" && typeof decorator !== "function") fail("Not a valid decorator for '" + stringifyKey(key) + "', got: " + decorator);
        var resultDescriptor = decorator(target, key, descriptor, true);
        if (resultDescriptor // otherwise, assume already applied, due to `applyToInstance`
        ) Object.defineProperty(target, key, resultDescriptor);
      }
    } catch (e_2_1) {
      e_2 = {
        error: e_2_1
      };
    } finally {
      try {
        if (keys_2_1 && !keys_2_1.done && (_b = keys_2.return)) _b.call(keys_2);
      } finally {
        if (e_2) throw e_2.error;
      }
    }
  } finally {
    endBatch();
  }
}

function getDependencyTree(thing, property) {
  return nodeToDependencyTree(getAtom(thing, property));
}

function nodeToDependencyTree(node) {
  var result = {
    name: node.name
  };
  if (node.observing && node.observing.length > 0) result.dependencies = unique(node.observing).map(nodeToDependencyTree);
  return result;
}

function _isComputed(value, property) {
  if (value === null || value === undefined) return false;

  if (property !== undefined) {
    if (isObservableObject(value) === false) return false;
    if (!value[$mobx].values.has(property)) return false;
    var atom = getAtom(value, property);
    return isComputedValue(atom);
  }

  return isComputedValue(value);
}

function isComputed(value) {
  if (arguments.length > 1) return fail(process.env.NODE_ENV !== "production" && "isComputed expects only 1 argument. Use isObservableProp to inspect the observability of a property");
  return _isComputed(value);
}

function _isObservable(value, property) {
  if (value === null || value === undefined) return false;

  if (property !== undefined) {
    if (process.env.NODE_ENV !== "production" && (isObservableMap(value) || isObservableArray(value))) return fail("isObservable(object, propertyName) is not supported for arrays and maps. Use map.has or array.length instead.");

    if (isObservableObject(value)) {
      return value[$mobx].values.has(property);
    }

    return false;
  } // For first check, see #701


  return isObservableObject(value) || !!value[$mobx] || isAtom(value) || isReaction(value) || isComputedValue(value);
}

function isObservable(value) {
  if (arguments.length !== 1) fail(process.env.NODE_ENV !== "production" && "isObservable expects only 1 argument. Use isObservableProp to inspect the observability of a property");
  return _isObservable(value);
}

function set(obj, key, value) {
  if (arguments.length === 2 && !isObservableSet(obj)) {
    startBatch();
    var values_1 = key;

    try {
      for (var key_1 in values_1) set(obj, key_1, values_1[key_1]);
    } finally {
      endBatch();
    }

    return;
  }

  if (isObservableObject(obj)) {
    var adm = obj[$mobx];
    var existingObservable = adm.values.get(key);

    if (existingObservable) {
      adm.write(key, value);
    } else {
      adm.addObservableProp(key, value, adm.defaultEnhancer);
    }
  } else if (isObservableMap(obj)) {
    obj.set(key, value);
  } else if (isObservableSet(obj)) {
    obj.add(key);
  } else if (isObservableArray(obj)) {
    if (typeof key !== "number") key = parseInt(key, 10);
    invariant(key >= 0, "Not a valid index: '" + key + "'");
    startBatch();
    if (key >= obj.length) obj.length = key + 1;
    obj[key] = value;
    endBatch();
  } else {
    return fail(process.env.NODE_ENV !== "production" && "'set()' can only be used on observable objects, arrays and maps");
  }
}

function trace() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  var enterBreakPoint = false;
  if (typeof args[args.length - 1] === "boolean") enterBreakPoint = args.pop();
  var derivation = getAtomFromArgs(args);

  if (!derivation) {
    return fail(process.env.NODE_ENV !== "production" && "'trace(break?)' can only be used inside a tracked computed value or a Reaction. Consider passing in the computed value or reaction explicitly");
  }

  if (derivation.isTracing === TraceMode.NONE) {
    console.log("[mobx.trace] '" + derivation.name + "' tracing enabled");
  }

  derivation.isTracing = enterBreakPoint ? TraceMode.BREAK : TraceMode.LOG;
}

function getAtomFromArgs(args) {
  switch (args.length) {
    case 0:
      return globalState.trackingDerivation;

    case 1:
      return getAtom(args[0]);

    case 2:
      return getAtom(args[0], args[1]);
  }
}
/**
 * During a transaction no views are updated until the end of the transaction.
 * The transaction will be run synchronously nonetheless.
 *
 * @param action a function that updates some reactive state
 * @returns any value that was returned by the 'action' parameter.
 */


function transaction(action, thisArg) {
  if (thisArg === void 0) {
    thisArg = undefined;
  }

  startBatch();

  try {
    return action.apply(thisArg);
  } finally {
    endBatch();
  }
}

function getAdm(target) {
  return target[$mobx];
}

function isPropertyKey(val) {
  return typeof val === "string" || typeof val === "number" || typeof val === "symbol";
} // Optimization: we don't need the intermediate objects and could have a completely custom administration for DynamicObjects,
// and skip either the internal values map, or the base object with its property descriptors!


var objectProxyTraps = {
  has: function (target, name) {
    if (name === $mobx || name === "constructor" || name === mobxDidRunLazyInitializersSymbol) return true;
    var adm = getAdm(target); // MWE: should `in` operator be reactive? If not, below code path will be faster / more memory efficient
    // TODO: check performance stats!
    // if (adm.values.get(name as string)) return true

    if (isPropertyKey(name)) return adm.has(name);
    return name in target;
  },
  get: function (target, name) {
    if (name === $mobx || name === "constructor" || name === mobxDidRunLazyInitializersSymbol) return target[name];
    var adm = getAdm(target);
    var observable = adm.values.get(name);

    if (observable instanceof Atom) {
      var result = observable.get();

      if (result === undefined) {
        // This fixes #1796, because deleting a prop that has an
        // undefined value won't retrigger a observer (no visible effect),
        // the autorun wouldn't subscribe to future key changes (see also next comment)
        adm.has(name);
      }

      return result;
    } // make sure we start listening to future keys
    // note that we only do this here for optimization


    if (isPropertyKey(name)) adm.has(name);
    return target[name];
  },
  set: function (target, name, value) {
    if (!isPropertyKey(name)) return false;
    set(target, name, value);
    return true;
  },
  deleteProperty: function (target, name) {
    if (!isPropertyKey(name)) return false;
    var adm = getAdm(target);
    adm.remove(name);
    return true;
  },
  ownKeys: function (target) {
    var adm = getAdm(target);
    adm.keysAtom.reportObserved();
    return Reflect.ownKeys(target);
  },
  preventExtensions: function (target) {
    fail("Dynamic observable objects cannot be frozen");
    return false;
  }
};

function createDynamicObservableObject(base) {
  var proxy = new Proxy(base, objectProxyTraps);
  base[$mobx].proxy = proxy;
  return proxy;
}

function hasInterceptors(interceptable) {
  return interceptable.interceptors !== undefined && interceptable.interceptors.length > 0;
}

function registerInterceptor(interceptable, handler) {
  var interceptors = interceptable.interceptors || (interceptable.interceptors = []);
  interceptors.push(handler);
  return once(function () {
    var idx = interceptors.indexOf(handler);
    if (idx !== -1) interceptors.splice(idx, 1);
  });
}

function interceptChange(interceptable, change) {
  var prevU = untrackedStart();

  try {
    // Interceptor can modify the array, copy it to avoid concurrent modification, see #1950
    var interceptors = __spread(interceptable.interceptors || []);

    for (var i = 0, l = interceptors.length; i < l; i++) {
      change = interceptors[i](change);
      invariant(!change || change.type, "Intercept handlers should return nothing or a change object");
      if (!change) break;
    }

    return change;
  } finally {
    untrackedEnd(prevU);
  }
}

function hasListeners(listenable) {
  return listenable.changeListeners !== undefined && listenable.changeListeners.length > 0;
}

function registerListener(listenable, handler) {
  var listeners = listenable.changeListeners || (listenable.changeListeners = []);
  listeners.push(handler);
  return once(function () {
    var idx = listeners.indexOf(handler);
    if (idx !== -1) listeners.splice(idx, 1);
  });
}

function notifyListeners(listenable, change) {
  var prevU = untrackedStart();
  var listeners = listenable.changeListeners;
  if (!listeners) return;
  listeners = listeners.slice();

  for (var i = 0, l = listeners.length; i < l; i++) {
    listeners[i](change);
  }

  untrackedEnd(prevU);
}

var MAX_SPLICE_SIZE = 10000; // See e.g. https://github.com/mobxjs/mobx/issues/859

var arrayTraps = {
  get: function (target, name) {
    if (name === $mobx) return target[$mobx];
    if (name === "length") return target[$mobx].getArrayLength();

    if (typeof name === "number") {
      return arrayExtensions.get.call(target, name);
    }

    if (typeof name === "string" && !isNaN(name)) {
      return arrayExtensions.get.call(target, parseInt(name));
    }

    if (arrayExtensions.hasOwnProperty(name)) {
      return arrayExtensions[name];
    }

    return target[name];
  },
  set: function (target, name, value) {
    if (name === "length") {
      target[$mobx].setArrayLength(value);
    }

    if (typeof name === "number") {
      arrayExtensions.set.call(target, name, value);
    }

    if (typeof name === "symbol" || isNaN(name)) {
      target[name] = value;
    } else {
      // numeric string
      arrayExtensions.set.call(target, parseInt(name), value);
    }

    return true;
  },
  preventExtensions: function (target) {
    fail("Observable arrays cannot be frozen");
    return false;
  }
};

function createObservableArray(initialValues, enhancer, name, owned) {
  if (name === void 0) {
    name = "ObservableArray@" + getNextId();
  }

  if (owned === void 0) {
    owned = false;
  }

  var adm = new ObservableArrayAdministration(name, enhancer, owned);
  addHiddenFinalProp(adm.values, $mobx, adm);
  var proxy = new Proxy(adm.values, arrayTraps);
  adm.proxy = proxy;

  if (initialValues && initialValues.length) {
    var prev = allowStateChangesStart(true);
    adm.spliceWithArray(0, 0, initialValues);
    allowStateChangesEnd(prev);
  }

  return proxy;
}

var ObservableArrayAdministration =
/** @class */
function () {
  function ObservableArrayAdministration(name, enhancer, owned) {
    this.owned = owned;
    this.values = [];
    this.proxy = undefined;
    this.lastKnownLength = 0;
    this.atom = new Atom(name || "ObservableArray@" + getNextId());

    this.enhancer = function (newV, oldV) {
      return enhancer(newV, oldV, name + "[..]");
    };
  }

  ObservableArrayAdministration.prototype.dehanceValue = function (value) {
    if (this.dehancer !== undefined) return this.dehancer(value);
    return value;
  };

  ObservableArrayAdministration.prototype.dehanceValues = function (values) {
    if (this.dehancer !== undefined && values.length > 0) return values.map(this.dehancer);
    return values;
  };

  ObservableArrayAdministration.prototype.intercept = function (handler) {
    return registerInterceptor(this, handler);
  };

  ObservableArrayAdministration.prototype.observe = function (listener, fireImmediately) {
    if (fireImmediately === void 0) {
      fireImmediately = false;
    }

    if (fireImmediately) {
      listener({
        object: this.proxy,
        type: "splice",
        index: 0,
        added: this.values.slice(),
        addedCount: this.values.length,
        removed: [],
        removedCount: 0
      });
    }

    return registerListener(this, listener);
  };

  ObservableArrayAdministration.prototype.getArrayLength = function () {
    this.atom.reportObserved();
    return this.values.length;
  };

  ObservableArrayAdministration.prototype.setArrayLength = function (newLength) {
    if (typeof newLength !== "number" || newLength < 0) throw new Error("[mobx.array] Out of range: " + newLength);
    var currentLength = this.values.length;
    if (newLength === currentLength) return;else if (newLength > currentLength) {
      var newItems = new Array(newLength - currentLength);

      for (var i = 0; i < newLength - currentLength; i++) newItems[i] = undefined; // No Array.fill everywhere...


      this.spliceWithArray(currentLength, 0, newItems);
    } else this.spliceWithArray(newLength, currentLength - newLength);
  };

  ObservableArrayAdministration.prototype.updateArrayLength = function (oldLength, delta) {
    if (oldLength !== this.lastKnownLength) throw new Error("[mobx] Modification exception: the internal structure of an observable array was changed.");
    this.lastKnownLength += delta;
  };

  ObservableArrayAdministration.prototype.spliceWithArray = function (index, deleteCount, newItems) {
    var _this = this;

    checkIfStateModificationsAreAllowed(this.atom);
    var length = this.values.length;
    if (index === undefined) index = 0;else if (index > length) index = length;else if (index < 0) index = Math.max(0, length + index);
    if (arguments.length === 1) deleteCount = length - index;else if (deleteCount === undefined || deleteCount === null) deleteCount = 0;else deleteCount = Math.max(0, Math.min(deleteCount, length - index));
    if (newItems === undefined) newItems = EMPTY_ARRAY;

    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        object: this.proxy,
        type: "splice",
        index: index,
        removedCount: deleteCount,
        added: newItems
      });
      if (!change) return EMPTY_ARRAY;
      deleteCount = change.removedCount;
      newItems = change.added;
    }

    newItems = newItems.length === 0 ? newItems : newItems.map(function (v) {
      return _this.enhancer(v, undefined);
    });

    if (process.env.NODE_ENV !== "production") {
      var lengthDelta = newItems.length - deleteCount;
      this.updateArrayLength(length, lengthDelta); // checks if internal array wasn't modified
    }

    var res = this.spliceItemsIntoValues(index, deleteCount, newItems);
    if (deleteCount !== 0 || newItems.length !== 0) this.notifyArraySplice(index, newItems, res);
    return this.dehanceValues(res);
  };

  ObservableArrayAdministration.prototype.spliceItemsIntoValues = function (index, deleteCount, newItems) {
    var _a;

    if (newItems.length < MAX_SPLICE_SIZE) {
      return (_a = this.values).splice.apply(_a, __spread([index, deleteCount], newItems));
    } else {
      var res = this.values.slice(index, index + deleteCount);
      this.values = this.values.slice(0, index).concat(newItems, this.values.slice(index + deleteCount));
      return res;
    }
  };

  ObservableArrayAdministration.prototype.notifyArrayChildUpdate = function (index, newValue, oldValue) {
    var notifySpy = !this.owned && isSpyEnabled();
    var notify = hasListeners(this);
    var change = notify || notifySpy ? {
      object: this.proxy,
      type: "update",
      index: index,
      newValue: newValue,
      oldValue: oldValue
    } : null; // The reason why this is on right hand side here (and not above), is this way the uglifier will drop it, but it won't
    // cause any runtime overhead in development mode without NODE_ENV set, unless spying is enabled

    if (notifySpy && process.env.NODE_ENV !== "production") spyReportStart(__assign(__assign({}, change), {
      name: this.atom.name
    }));
    this.atom.reportChanged();
    if (notify) notifyListeners(this, change);
    if (notifySpy && process.env.NODE_ENV !== "production") spyReportEnd();
  };

  ObservableArrayAdministration.prototype.notifyArraySplice = function (index, added, removed) {
    var notifySpy = !this.owned && isSpyEnabled();
    var notify = hasListeners(this);
    var change = notify || notifySpy ? {
      object: this.proxy,
      type: "splice",
      index: index,
      removed: removed,
      added: added,
      removedCount: removed.length,
      addedCount: added.length
    } : null;
    if (notifySpy && process.env.NODE_ENV !== "production") spyReportStart(__assign(__assign({}, change), {
      name: this.atom.name
    }));
    this.atom.reportChanged(); // conform: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/observe

    if (notify) notifyListeners(this, change);
    if (notifySpy && process.env.NODE_ENV !== "production") spyReportEnd();
  };

  return ObservableArrayAdministration;
}();

var arrayExtensions = {
  intercept: function (handler) {
    return this[$mobx].intercept(handler);
  },
  observe: function (listener, fireImmediately) {
    if (fireImmediately === void 0) {
      fireImmediately = false;
    }

    var adm = this[$mobx];
    return adm.observe(listener, fireImmediately);
  },
  clear: function () {
    return this.splice(0);
  },
  replace: function (newItems) {
    var adm = this[$mobx];
    return adm.spliceWithArray(0, adm.values.length, newItems);
  },

  /**
   * Converts this array back to a (shallow) javascript structure.
   * For a deep clone use mobx.toJS
   */
  toJS: function () {
    return this.slice();
  },
  toJSON: function () {
    // Used by JSON.stringify
    return this.toJS();
  },

  /*
   * functions that do alter the internal structure of the array, (based on lib.es6.d.ts)
   * since these functions alter the inner structure of the array, the have side effects.
   * Because the have side effects, they should not be used in computed function,
   * and for that reason the do not call dependencyState.notifyObserved
   */
  splice: function (index, deleteCount) {
    var newItems = [];

    for (var _i = 2; _i < arguments.length; _i++) {
      newItems[_i - 2] = arguments[_i];
    }

    var adm = this[$mobx];

    switch (arguments.length) {
      case 0:
        return [];

      case 1:
        return adm.spliceWithArray(index);

      case 2:
        return adm.spliceWithArray(index, deleteCount);
    }

    return adm.spliceWithArray(index, deleteCount, newItems);
  },
  spliceWithArray: function (index, deleteCount, newItems) {
    var adm = this[$mobx];
    return adm.spliceWithArray(index, deleteCount, newItems);
  },
  push: function () {
    var items = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      items[_i] = arguments[_i];
    }

    var adm = this[$mobx];
    adm.spliceWithArray(adm.values.length, 0, items);
    return adm.values.length;
  },
  pop: function () {
    return this.splice(Math.max(this[$mobx].values.length - 1, 0), 1)[0];
  },
  shift: function () {
    return this.splice(0, 1)[0];
  },
  unshift: function () {
    var items = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      items[_i] = arguments[_i];
    }

    var adm = this[$mobx];
    adm.spliceWithArray(0, 0, items);
    return adm.values.length;
  },
  reverse: function () {
    // reverse by default mutates in place before returning the result
    // which makes it both a 'derivation' and a 'mutation'.
    // so we deviate from the default and just make it an dervitation
    if (process.env.NODE_ENV !== "production") {
      console.warn("[mobx] `observableArray.reverse()` will not update the array in place. Use `observableArray.slice().reverse()` to suppress this warning and perform the operation on a copy, or `observableArray.replace(observableArray.slice().reverse())` to reverse & update in place");
    }

    var clone = this.slice();
    return clone.reverse.apply(clone, arguments);
  },
  sort: function (compareFn) {
    // sort by default mutates in place before returning the result
    // which goes against all good practices. Let's not change the array in place!
    if (process.env.NODE_ENV !== "production") {
      console.warn("[mobx] `observableArray.sort()` will not update the array in place. Use `observableArray.slice().sort()` to suppress this warning and perform the operation on a copy, or `observableArray.replace(observableArray.slice().sort())` to sort & update in place");
    }

    var clone = this.slice();
    return clone.sort.apply(clone, arguments);
  },
  remove: function (value) {
    var adm = this[$mobx];
    var idx = adm.dehanceValues(adm.values).indexOf(value);

    if (idx > -1) {
      this.splice(idx, 1);
      return true;
    }

    return false;
  },
  get: function (index) {
    var adm = this[$mobx];

    if (adm) {
      if (index < adm.values.length) {
        adm.atom.reportObserved();
        return adm.dehanceValue(adm.values[index]);
      }

      console.warn("[mobx.array] Attempt to read an array index (" + index + ") that is out of bounds (" + adm.values.length + "). Please check length first. Out of bound indices will not be tracked by MobX");
    }

    return undefined;
  },
  set: function (index, newValue) {
    var adm = this[$mobx];
    var values = adm.values;

    if (index < values.length) {
      // update at index in range
      checkIfStateModificationsAreAllowed(adm.atom);
      var oldValue = values[index];

      if (hasInterceptors(adm)) {
        var change = interceptChange(adm, {
          type: "update",
          object: adm.proxy,
          index: index,
          newValue: newValue
        });
        if (!change) return;
        newValue = change.newValue;
      }

      newValue = adm.enhancer(newValue, oldValue);
      var changed = newValue !== oldValue;

      if (changed) {
        values[index] = newValue;
        adm.notifyArrayChildUpdate(index, newValue, oldValue);
      }
    } else if (index === values.length) {
      // add a new item
      adm.spliceWithArray(index, 0, [newValue]);
    } else {
      // out of bounds
      throw new Error("[mobx.array] Index out of bounds, " + index + " is larger than " + values.length);
    }
  }
};
["concat", "every", "filter", "forEach", "indexOf", "join", "lastIndexOf", "map", "reduce", "reduceRight", "slice", "some", "toString", "toLocaleString"].forEach(function (funcName) {
  arrayExtensions[funcName] = function () {
    var adm = this[$mobx];
    adm.atom.reportObserved();
    var res = adm.dehanceValues(adm.values);
    return res[funcName].apply(res, arguments);
  };
});
var isObservableArrayAdministration = createInstanceofPredicate("ObservableArrayAdministration", ObservableArrayAdministration);

function isObservableArray(thing) {
  return isObject(thing) && isObservableArrayAdministration(thing[$mobx]);
}

var _a;

var ObservableMapMarker = {}; // just extend Map? See also https://gist.github.com/nestharus/13b4d74f2ef4a2f4357dbd3fc23c1e54
// But: https://github.com/mobxjs/mobx/issues/1556

var ObservableMap =
/** @class */
function () {
  function ObservableMap(initialData, enhancer, name) {
    if (enhancer === void 0) {
      enhancer = deepEnhancer;
    }

    if (name === void 0) {
      name = "ObservableMap@" + getNextId();
    }

    this.enhancer = enhancer;
    this.name = name;
    this[_a] = ObservableMapMarker;
    this._keysAtom = createAtom(this.name + ".keys()");
    this[Symbol.toStringTag] = "Map";

    if (typeof Map !== "function") {
      throw new Error("mobx.map requires Map polyfill for the current browser. Check babel-polyfill or core-js/es6/map.js");
    }

    this._data = new Map();
    this._hasMap = new Map();
    this.merge(initialData);
  }

  ObservableMap.prototype._has = function (key) {
    return this._data.has(key);
  };

  ObservableMap.prototype.has = function (key) {
    var _this = this;

    if (!globalState.trackingDerivation) return this._has(key);

    var entry = this._hasMap.get(key);

    if (!entry) {
      // todo: replace with atom (breaking change)
      var newEntry = entry = new ObservableValue(this._has(key), referenceEnhancer, this.name + "." + stringifyKey(key) + "?", false);

      this._hasMap.set(key, newEntry);

      onBecomeUnobserved(newEntry, function () {
        return _this._hasMap.delete(key);
      });
    }

    return entry.get();
  };

  ObservableMap.prototype.set = function (key, value) {
    var hasKey = this._has(key);

    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        type: hasKey ? "update" : "add",
        object: this,
        newValue: value,
        name: key
      });
      if (!change) return this;
      value = change.newValue;
    }

    if (hasKey) {
      this._updateValue(key, value);
    } else {
      this._addValue(key, value);
    }

    return this;
  };

  ObservableMap.prototype.delete = function (key) {
    var _this = this;

    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        type: "delete",
        object: this,
        name: key
      });
      if (!change) return false;
    }

    if (this._has(key)) {
      var notifySpy = isSpyEnabled();
      var notify = hasListeners(this);
      var change = notify || notifySpy ? {
        type: "delete",
        object: this,
        oldValue: this._data.get(key).value,
        name: key
      } : null;
      if (notifySpy && process.env.NODE_ENV !== "production") spyReportStart(__assign(__assign({}, change), {
        name: this.name,
        key: key
      }));
      transaction(function () {
        _this._keysAtom.reportChanged();

        _this._updateHasMapEntry(key, false);

        var observable = _this._data.get(key);

        observable.setNewValue(undefined);

        _this._data.delete(key);
      });
      if (notify) notifyListeners(this, change);
      if (notifySpy && process.env.NODE_ENV !== "production") spyReportEnd();
      return true;
    }

    return false;
  };

  ObservableMap.prototype._updateHasMapEntry = function (key, value) {
    var entry = this._hasMap.get(key);

    if (entry) {
      entry.setNewValue(value);
    }
  };

  ObservableMap.prototype._updateValue = function (key, newValue) {
    var observable = this._data.get(key);

    newValue = observable.prepareNewValue(newValue);

    if (newValue !== globalState.UNCHANGED) {
      var notifySpy = isSpyEnabled();
      var notify = hasListeners(this);
      var change = notify || notifySpy ? {
        type: "update",
        object: this,
        oldValue: observable.value,
        name: key,
        newValue: newValue
      } : null;
      if (notifySpy && process.env.NODE_ENV !== "production") spyReportStart(__assign(__assign({}, change), {
        name: this.name,
        key: key
      }));
      observable.setNewValue(newValue);
      if (notify) notifyListeners(this, change);
      if (notifySpy && process.env.NODE_ENV !== "production") spyReportEnd();
    }
  };

  ObservableMap.prototype._addValue = function (key, newValue) {
    var _this = this;

    checkIfStateModificationsAreAllowed(this._keysAtom);
    transaction(function () {
      var observable = new ObservableValue(newValue, _this.enhancer, _this.name + "." + stringifyKey(key), false);

      _this._data.set(key, observable);

      newValue = observable.value; // value might have been changed

      _this._updateHasMapEntry(key, true);

      _this._keysAtom.reportChanged();
    });
    var notifySpy = isSpyEnabled();
    var notify = hasListeners(this);
    var change = notify || notifySpy ? {
      type: "add",
      object: this,
      name: key,
      newValue: newValue
    } : null;
    if (notifySpy && process.env.NODE_ENV !== "production") spyReportStart(__assign(__assign({}, change), {
      name: this.name,
      key: key
    }));
    if (notify) notifyListeners(this, change);
    if (notifySpy && process.env.NODE_ENV !== "production") spyReportEnd();
  };

  ObservableMap.prototype.get = function (key) {
    if (this.has(key)) return this.dehanceValue(this._data.get(key).get());
    return this.dehanceValue(undefined);
  };

  ObservableMap.prototype.dehanceValue = function (value) {
    if (this.dehancer !== undefined) {
      return this.dehancer(value);
    }

    return value;
  };

  ObservableMap.prototype.keys = function () {
    this._keysAtom.reportObserved();

    return this._data.keys();
  };

  ObservableMap.prototype.values = function () {
    var self = this;
    var nextIndex = 0;
    var keys = Array.from(this.keys());
    return makeIterable({
      next: function () {
        return nextIndex < keys.length ? {
          value: self.get(keys[nextIndex++]),
          done: false
        } : {
          done: true
        };
      }
    });
  };

  ObservableMap.prototype.entries = function () {
    var self = this;
    var nextIndex = 0;
    var keys = Array.from(this.keys());
    return makeIterable({
      next: function () {
        if (nextIndex < keys.length) {
          var key = keys[nextIndex++];
          return {
            value: [key, self.get(key)],
            done: false
          };
        }

        return {
          done: true
        };
      }
    });
  };

  ObservableMap.prototype[(_a = $mobx, Symbol.iterator)] = function () {
    return this.entries();
  };

  ObservableMap.prototype.forEach = function (callback, thisArg) {
    var e_1, _b;

    try {
      for (var _c = __values(this), _d = _c.next(); !_d.done; _d = _c.next()) {
        var _e = __read(_d.value, 2),
            key = _e[0],
            value = _e[1];

        callback.call(thisArg, value, key, this);
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
  };
  /** Merge another object into this object, returns this. */


  ObservableMap.prototype.merge = function (other) {
    var _this = this;

    if (isObservableMap(other)) {
      other = other.toJS();
    }

    transaction(function () {
      if (isPlainObject(other)) getPlainObjectKeys(other).forEach(function (key) {
        return _this.set(key, other[key]);
      });else if (Array.isArray(other)) other.forEach(function (_b) {
        var _c = __read(_b, 2),
            key = _c[0],
            value = _c[1];

        return _this.set(key, value);
      });else if (isES6Map(other)) {
        if (other.constructor !== Map) fail("Cannot initialize from classes that inherit from Map: " + other.constructor.name); // prettier-ignore

        other.forEach(function (value, key) {
          return _this.set(key, value);
        });
      } else if (other !== null && other !== undefined) fail("Cannot initialize map from " + other);
    });
    return this;
  };

  ObservableMap.prototype.clear = function () {
    var _this = this;

    transaction(function () {
      untracked(function () {
        var e_2, _b;

        try {
          for (var _c = __values(_this.keys()), _d = _c.next(); !_d.done; _d = _c.next()) {
            var key = _d.value;

            _this.delete(key);
          }
        } catch (e_2_1) {
          e_2 = {
            error: e_2_1
          };
        } finally {
          try {
            if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
          } finally {
            if (e_2) throw e_2.error;
          }
        }
      });
    });
  };

  ObservableMap.prototype.replace = function (values) {
    var _this = this;

    transaction(function () {
      // grab all the keys that are present in the new map but not present in the current map
      // and delete them from the map, then merge the new map
      // this will cause reactions only on changed values
      var newKeys = getMapLikeKeys(values);
      var oldKeys = Array.from(_this.keys());
      var missingKeys = oldKeys.filter(function (k) {
        return newKeys.indexOf(k) === -1;
      });
      missingKeys.forEach(function (k) {
        return _this.delete(k);
      });

      _this.merge(values);
    });
    return this;
  };

  Object.defineProperty(ObservableMap.prototype, "size", {
    get: function () {
      this._keysAtom.reportObserved();

      return this._data.size;
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Returns a plain object that represents this map.
   * Note that all the keys being stringified.
   * If there are duplicating keys after converting them to strings, behaviour is undetermined.
   */

  ObservableMap.prototype.toPOJO = function () {
    var e_3, _b;

    var res = {};

    try {
      for (var _c = __values(this), _d = _c.next(); !_d.done; _d = _c.next()) {
        var _e = __read(_d.value, 2),
            key = _e[0],
            value = _e[1]; // We lie about symbol key types due to https://github.com/Microsoft/TypeScript/issues/1863


        res[typeof key === "symbol" ? key : stringifyKey(key)] = value;
      }
    } catch (e_3_1) {
      e_3 = {
        error: e_3_1
      };
    } finally {
      try {
        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
      } finally {
        if (e_3) throw e_3.error;
      }
    }

    return res;
  };
  /**
   * Returns a shallow non observable object clone of this map.
   * Note that the values migth still be observable. For a deep clone use mobx.toJS.
   */


  ObservableMap.prototype.toJS = function () {
    return new Map(this);
  };

  ObservableMap.prototype.toJSON = function () {
    // Used by JSON.stringify
    return this.toPOJO();
  };

  ObservableMap.prototype.toString = function () {
    var _this = this;

    return this.name + "[{ " + Array.from(this.keys()).map(function (key) {
      return stringifyKey(key) + ": " + ("" + _this.get(key));
    }).join(", ") + " }]";
  };
  /**
   * Observes this object. Triggers for the events 'add', 'update' and 'delete'.
   * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
   * for callback details
   */


  ObservableMap.prototype.observe = function (listener, fireImmediately) {
    process.env.NODE_ENV !== "production" && invariant(fireImmediately !== true, "`observe` doesn't support fireImmediately=true in combination with maps.");
    return registerListener(this, listener);
  };

  ObservableMap.prototype.intercept = function (handler) {
    return registerInterceptor(this, handler);
  };

  return ObservableMap;
}();
/* 'var' fixes small-build issue */


var isObservableMap = createInstanceofPredicate("ObservableMap", ObservableMap);

var _a$1;

var ObservableSetMarker = {};

var ObservableSet =
/** @class */
function () {
  function ObservableSet(initialData, enhancer, name) {
    if (enhancer === void 0) {
      enhancer = deepEnhancer;
    }

    if (name === void 0) {
      name = "ObservableSet@" + getNextId();
    }

    this.name = name;
    this[_a$1] = ObservableSetMarker;
    this._data = new Set();
    this._atom = createAtom(this.name);
    this[Symbol.toStringTag] = "Set";

    if (typeof Set !== "function") {
      throw new Error("mobx.set requires Set polyfill for the current browser. Check babel-polyfill or core-js/es6/set.js");
    }

    this.enhancer = function (newV, oldV) {
      return enhancer(newV, oldV, name);
    };

    if (initialData) {
      this.replace(initialData);
    }
  }

  ObservableSet.prototype.dehanceValue = function (value) {
    if (this.dehancer !== undefined) {
      return this.dehancer(value);
    }

    return value;
  };

  ObservableSet.prototype.clear = function () {
    var _this = this;

    transaction(function () {
      untracked(function () {
        var e_1, _b;

        try {
          for (var _c = __values(_this._data.values()), _d = _c.next(); !_d.done; _d = _c.next()) {
            var value = _d.value;

            _this.delete(value);
          }
        } catch (e_1_1) {
          e_1 = {
            error: e_1_1
          };
        } finally {
          try {
            if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
      });
    });
  };

  ObservableSet.prototype.forEach = function (callbackFn, thisArg) {
    var e_2, _b;

    try {
      for (var _c = __values(this), _d = _c.next(); !_d.done; _d = _c.next()) {
        var value = _d.value;
        callbackFn.call(thisArg, value, value, this);
      }
    } catch (e_2_1) {
      e_2 = {
        error: e_2_1
      };
    } finally {
      try {
        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
      } finally {
        if (e_2) throw e_2.error;
      }
    }
  };

  Object.defineProperty(ObservableSet.prototype, "size", {
    get: function () {
      this._atom.reportObserved();

      return this._data.size;
    },
    enumerable: true,
    configurable: true
  });

  ObservableSet.prototype.add = function (value) {
    var _this = this;

    checkIfStateModificationsAreAllowed(this._atom);

    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        type: "add",
        object: this,
        newValue: value
      });
      if (!change) return this; // TODO: ideally, value = change.value would be done here, so that values can be
      // changed by interceptor. Same applies for other Set and Map api's.
    }

    if (!this.has(value)) {
      transaction(function () {
        _this._data.add(_this.enhancer(value, undefined));

        _this._atom.reportChanged();
      });
      var notifySpy = isSpyEnabled();
      var notify = hasListeners(this);
      var change = notify || notifySpy ? {
        type: "add",
        object: this,
        newValue: value
      } : null;
      if (notifySpy && process.env.NODE_ENV !== "production") spyReportStart(change);
      if (notify) notifyListeners(this, change);
      if (notifySpy && process.env.NODE_ENV !== "production") spyReportEnd();
    }

    return this;
  };

  ObservableSet.prototype.delete = function (value) {
    var _this = this;

    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        type: "delete",
        object: this,
        oldValue: value
      });
      if (!change) return false;
    }

    if (this.has(value)) {
      var notifySpy = isSpyEnabled();
      var notify = hasListeners(this);
      var change = notify || notifySpy ? {
        type: "delete",
        object: this,
        oldValue: value
      } : null;
      if (notifySpy && process.env.NODE_ENV !== "production") spyReportStart(__assign(__assign({}, change), {
        name: this.name
      }));
      transaction(function () {
        _this._atom.reportChanged();

        _this._data.delete(value);
      });
      if (notify) notifyListeners(this, change);
      if (notifySpy && process.env.NODE_ENV !== "production") spyReportEnd();
      return true;
    }

    return false;
  };

  ObservableSet.prototype.has = function (value) {
    this._atom.reportObserved();

    return this._data.has(this.dehanceValue(value));
  };

  ObservableSet.prototype.entries = function () {
    var nextIndex = 0;
    var keys = Array.from(this.keys());
    var values = Array.from(this.values());
    return makeIterable({
      next: function () {
        var index = nextIndex;
        nextIndex += 1;
        return index < values.length ? {
          value: [keys[index], values[index]],
          done: false
        } : {
          done: true
        };
      }
    });
  };

  ObservableSet.prototype.keys = function () {
    return this.values();
  };

  ObservableSet.prototype.values = function () {
    this._atom.reportObserved();

    var self = this;
    var nextIndex = 0;
    var observableValues = Array.from(this._data.values());
    return makeIterable({
      next: function () {
        return nextIndex < observableValues.length ? {
          value: self.dehanceValue(observableValues[nextIndex++]),
          done: false
        } : {
          done: true
        };
      }
    });
  };

  ObservableSet.prototype.replace = function (other) {
    var _this = this;

    if (isObservableSet(other)) {
      other = other.toJS();
    }

    transaction(function () {
      if (Array.isArray(other)) {
        _this.clear();

        other.forEach(function (value) {
          return _this.add(value);
        });
      } else if (isES6Set(other)) {
        _this.clear();

        other.forEach(function (value) {
          return _this.add(value);
        });
      } else if (other !== null && other !== undefined) {
        fail("Cannot initialize set from " + other);
      }
    });
    return this;
  };

  ObservableSet.prototype.observe = function (listener, fireImmediately) {
    // TODO 'fireImmediately' can be true?
    process.env.NODE_ENV !== "production" && invariant(fireImmediately !== true, "`observe` doesn't support fireImmediately=true in combination with sets.");
    return registerListener(this, listener);
  };

  ObservableSet.prototype.intercept = function (handler) {
    return registerInterceptor(this, handler);
  };

  ObservableSet.prototype.toJS = function () {
    return new Set(this);
  };

  ObservableSet.prototype.toString = function () {
    return this.name + "[ " + Array.from(this).join(", ") + " ]";
  };

  ObservableSet.prototype[(_a$1 = $mobx, Symbol.iterator)] = function () {
    return this.values();
  };

  return ObservableSet;
}();

var isObservableSet = createInstanceofPredicate("ObservableSet", ObservableSet);

var ObservableObjectAdministration =
/** @class */
function () {
  function ObservableObjectAdministration(target, values, name, defaultEnhancer) {
    if (values === void 0) {
      values = new Map();
    }

    this.target = target;
    this.values = values;
    this.name = name;
    this.defaultEnhancer = defaultEnhancer;
    this.keysAtom = new Atom(name + ".keys");
  }

  ObservableObjectAdministration.prototype.read = function (key) {
    return this.values.get(key).get();
  };

  ObservableObjectAdministration.prototype.write = function (key, newValue) {
    var instance = this.target;
    var observable = this.values.get(key);

    if (observable instanceof ComputedValue) {
      observable.set(newValue);
      return;
    } // intercept


    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        type: "update",
        object: this.proxy || instance,
        name: key,
        newValue: newValue
      });
      if (!change) return;
      newValue = change.newValue;
    }

    newValue = observable.prepareNewValue(newValue); // notify spy & observers

    if (newValue !== globalState.UNCHANGED) {
      var notify = hasListeners(this);
      var notifySpy = isSpyEnabled();
      var change = notify || notifySpy ? {
        type: "update",
        object: this.proxy || instance,
        oldValue: observable.value,
        name: key,
        newValue: newValue
      } : null;
      if (notifySpy && process.env.NODE_ENV !== "production") spyReportStart(__assign(__assign({}, change), {
        name: this.name,
        key: key
      }));
      observable.setNewValue(newValue);
      if (notify) notifyListeners(this, change);
      if (notifySpy && process.env.NODE_ENV !== "production") spyReportEnd();
    }
  };

  ObservableObjectAdministration.prototype.has = function (key) {
    var map = this.pendingKeys || (this.pendingKeys = new Map());
    var entry = map.get(key);
    if (entry) return entry.get();else {
      var exists = !!this.values.get(key); // Possible optimization: Don't have a separate map for non existing keys,
      // but store them in the values map instead, using a special symbol to denote "not existing"

      entry = new ObservableValue(exists, referenceEnhancer, this.name + "." + stringifyKey(key) + "?", false);
      map.set(key, entry);
      return entry.get(); // read to subscribe
    }
  };

  ObservableObjectAdministration.prototype.addObservableProp = function (propName, newValue, enhancer) {
    if (enhancer === void 0) {
      enhancer = this.defaultEnhancer;
    }

    var target = this.target;
    assertPropertyConfigurable(target, propName);

    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        object: this.proxy || target,
        name: propName,
        type: "add",
        newValue: newValue
      });
      if (!change) return;
      newValue = change.newValue;
    }

    var observable = new ObservableValue(newValue, enhancer, this.name + "." + stringifyKey(propName), false);
    this.values.set(propName, observable);
    newValue = observable.value; // observableValue might have changed it

    Object.defineProperty(target, propName, generateObservablePropConfig(propName));
    this.notifyPropertyAddition(propName, newValue);
  };

  ObservableObjectAdministration.prototype.addComputedProp = function (propertyOwner, // where is the property declared?
  propName, options) {
    var target = this.target;
    options.name = options.name || this.name + "." + stringifyKey(propName);
    this.values.set(propName, new ComputedValue(options));
    if (propertyOwner === target || isPropertyConfigurable(propertyOwner, propName)) Object.defineProperty(propertyOwner, propName, generateComputedPropConfig(propName));
  };

  ObservableObjectAdministration.prototype.remove = function (key) {
    if (!this.values.has(key)) return;
    var target = this.target;

    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        object: this.proxy || target,
        name: key,
        type: "remove"
      });
      if (!change) return;
    }

    try {
      startBatch();
      var notify = hasListeners(this);
      var notifySpy = isSpyEnabled();
      var oldObservable = this.values.get(key);
      var oldValue = oldObservable && oldObservable.get();
      oldObservable && oldObservable.set(undefined); // notify key and keyset listeners

      this.keysAtom.reportChanged();
      this.values.delete(key);

      if (this.pendingKeys) {
        var entry = this.pendingKeys.get(key);
        if (entry) entry.set(false);
      } // delete the prop


      delete this.target[key];
      var change = notify || notifySpy ? {
        type: "remove",
        object: this.proxy || target,
        oldValue: oldValue,
        name: key
      } : null;
      if (notifySpy && process.env.NODE_ENV !== "production") spyReportStart(__assign(__assign({}, change), {
        name: this.name,
        key: key
      }));
      if (notify) notifyListeners(this, change);
      if (notifySpy && process.env.NODE_ENV !== "production") spyReportEnd();
    } finally {
      endBatch();
    }
  };

  ObservableObjectAdministration.prototype.illegalAccess = function (owner, propName) {
    /**
     * This happens if a property is accessed through the prototype chain, but the property was
     * declared directly as own property on the prototype.
     *
     * E.g.:
     * class A {
     * }
     * extendObservable(A.prototype, { x: 1 })
     *
     * classB extens A {
     * }
     * console.log(new B().x)
     *
     * It is unclear whether the property should be considered 'static' or inherited.
     * Either use `console.log(A.x)`
     * or: decorate(A, { x: observable })
     *
     * When using decorate, the property will always be redeclared as own property on the actual instance
     */
    console.warn("Property '" + propName + "' of '" + owner + "' was accessed through the prototype chain. Use 'decorate' instead to declare the prop or access it statically through it's owner");
  };
  /**
   * Observes this object. Triggers for the events 'add', 'update' and 'delete'.
   * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
   * for callback details
   */


  ObservableObjectAdministration.prototype.observe = function (callback, fireImmediately) {
    process.env.NODE_ENV !== "production" && invariant(fireImmediately !== true, "`observe` doesn't support the fire immediately property for observable objects.");
    return registerListener(this, callback);
  };

  ObservableObjectAdministration.prototype.intercept = function (handler) {
    return registerInterceptor(this, handler);
  };

  ObservableObjectAdministration.prototype.notifyPropertyAddition = function (key, newValue) {
    var notify = hasListeners(this);
    var notifySpy = isSpyEnabled();
    var change = notify || notifySpy ? {
      type: "add",
      object: this.proxy || this.target,
      name: key,
      newValue: newValue
    } : null;
    if (notifySpy && process.env.NODE_ENV !== "production") spyReportStart(__assign(__assign({}, change), {
      name: this.name,
      key: key
    }));
    if (notify) notifyListeners(this, change);
    if (notifySpy && process.env.NODE_ENV !== "production") spyReportEnd();

    if (this.pendingKeys) {
      var entry = this.pendingKeys.get(key);
      if (entry) entry.set(true);
    }

    this.keysAtom.reportChanged();
  };

  ObservableObjectAdministration.prototype.getKeys = function () {
    var e_1, _a;

    this.keysAtom.reportObserved(); // return Reflect.ownKeys(this.values) as any

    var res = [];

    try {
      for (var _b = __values(this.values), _c = _b.next(); !_c.done; _c = _b.next()) {
        var _d = __read(_c.value, 2),
            key = _d[0],
            value = _d[1];

        if (value instanceof ObservableValue) res.push(key);
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_1) throw e_1.error;
      }
    }

    return res;
  };

  return ObservableObjectAdministration;
}();

function asObservableObject(target, name, defaultEnhancer) {
  if (name === void 0) {
    name = "";
  }

  if (defaultEnhancer === void 0) {
    defaultEnhancer = deepEnhancer;
  }

  if (Object.prototype.hasOwnProperty.call(target, $mobx)) return target[$mobx];
  process.env.NODE_ENV !== "production" && invariant(Object.isExtensible(target), "Cannot make the designated object observable; it is not extensible");
  if (!isPlainObject(target)) name = (target.constructor.name || "ObservableObject") + "@" + getNextId();
  if (!name) name = "ObservableObject@" + getNextId();
  var adm = new ObservableObjectAdministration(target, new Map(), stringifyKey(name), defaultEnhancer);
  addHiddenProp(target, $mobx, adm);
  return adm;
}

var observablePropertyConfigs = Object.create(null);
var computedPropertyConfigs = Object.create(null);

function generateObservablePropConfig(propName) {
  return observablePropertyConfigs[propName] || (observablePropertyConfigs[propName] = {
    configurable: true,
    enumerable: true,
    get: function () {
      return this[$mobx].read(propName);
    },
    set: function (v) {
      this[$mobx].write(propName, v);
    }
  });
}

function getAdministrationForComputedPropOwner(owner) {
  var adm = owner[$mobx];

  if (!adm) {
    // because computed props are declared on proty,
    // the current instance might not have been initialized yet
    initializeInstance(owner);
    return owner[$mobx];
  }

  return adm;
}

function generateComputedPropConfig(propName) {
  return computedPropertyConfigs[propName] || (computedPropertyConfigs[propName] = {
    configurable: globalState.computedConfigurable,
    enumerable: false,
    get: function () {
      return getAdministrationForComputedPropOwner(this).read(propName);
    },
    set: function (v) {
      getAdministrationForComputedPropOwner(this).write(propName, v);
    }
  });
}

var isObservableObjectAdministration = createInstanceofPredicate("ObservableObjectAdministration", ObservableObjectAdministration);

function isObservableObject(thing) {
  if (isObject(thing)) {
    // Initializers run lazily when transpiling to babel, so make sure they are run...
    initializeInstance(thing);
    return isObservableObjectAdministration(thing[$mobx]);
  }

  return false;
}

function getAtom(thing, property) {
  if (typeof thing === "object" && thing !== null) {
    if (isObservableArray(thing)) {
      if (property !== undefined) fail(process.env.NODE_ENV !== "production" && "It is not possible to get index atoms from arrays");
      return thing[$mobx].atom;
    }

    if (isObservableSet(thing)) {
      return thing[$mobx];
    }

    if (isObservableMap(thing)) {
      var anyThing = thing;
      if (property === undefined) return anyThing._keysAtom;

      var observable = anyThing._data.get(property) || anyThing._hasMap.get(property);

      if (!observable) fail(process.env.NODE_ENV !== "production" && "the entry '" + property + "' does not exist in the observable map '" + getDebugName(thing) + "'");
      return observable;
    } // Initializers run lazily when transpiling to babel, so make sure they are run...


    initializeInstance(thing);
    if (property && !thing[$mobx]) thing[property]; // See #1072

    if (isObservableObject(thing)) {
      if (!property) return fail(process.env.NODE_ENV !== "production" && "please specify a property");
      var observable = thing[$mobx].values.get(property);
      if (!observable) fail(process.env.NODE_ENV !== "production" && "no observable property '" + property + "' found on the observable object '" + getDebugName(thing) + "'");
      return observable;
    }

    if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) {
      return thing;
    }
  } else if (typeof thing === "function") {
    if (isReaction(thing[$mobx])) {
      // disposer function
      return thing[$mobx];
    }
  }

  return fail(process.env.NODE_ENV !== "production" && "Cannot obtain atom from " + thing);
}

function getAdministration(thing, property) {
  if (!thing) fail("Expecting some object");
  if (property !== undefined) return getAdministration(getAtom(thing, property));
  if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) return thing;
  if (isObservableMap(thing) || isObservableSet(thing)) return thing; // Initializers run lazily when transpiling to babel, so make sure they are run...

  initializeInstance(thing);
  if (thing[$mobx]) return thing[$mobx];
  fail(process.env.NODE_ENV !== "production" && "Cannot obtain administration from " + thing);
}

function getDebugName(thing, property) {
  var named;
  if (property !== undefined) named = getAtom(thing, property);else if (isObservableObject(thing) || isObservableMap(thing) || isObservableSet(thing)) named = getAdministration(thing);else named = getAtom(thing); // valid for arrays as well

  return named.name;
}

var toString = Object.prototype.toString;

function deepEqual(a, b, depth) {
  if (depth === void 0) {
    depth = -1;
  }

  return eq(a, b, depth);
} // Copied from https://github.com/jashkenas/underscore/blob/5c237a7c682fb68fd5378203f0bf22dce1624854/underscore.js#L1186-L1289
// Internal recursive comparison function for `isEqual`.


function eq(a, b, depth, aStack, bStack) {
  // Identical objects are equal. `0 === -0`, but they aren't identical.
  // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
  if (a === b) return a !== 0 || 1 / a === 1 / b; // `null` or `undefined` only equal to itself (strict comparison).

  if (a == null || b == null) return false; // `NaN`s are equivalent, but non-reflexive.

  if (a !== a) return b !== b; // Exhaust primitive checks

  var type = typeof a;
  if (type !== "function" && type !== "object" && typeof b != "object") return false; // Compare `[[Class]]` names.

  var className = toString.call(a);
  if (className !== toString.call(b)) return false;

  switch (className) {
    // Strings, numbers, regular expressions, dates, and booleans are compared by value.
    case "[object RegExp]": // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')

    case "[object String]":
      // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
      // equivalent to `new String("5")`.
      return "" + a === "" + b;

    case "[object Number]":
      // `NaN`s are equivalent, but non-reflexive.
      // Object(NaN) is equivalent to NaN.
      if (+a !== +a) return +b !== +b; // An `egal` comparison is performed for other numeric values.

      return +a === 0 ? 1 / +a === 1 / b : +a === +b;

    case "[object Date]":
    case "[object Boolean]":
      // Coerce dates and booleans to numeric primitive values. Dates are compared by their
      // millisecond representations. Note that invalid dates with millisecond representations
      // of `NaN` are not equivalent.
      return +a === +b;

    case "[object Symbol]":
      return typeof Symbol !== "undefined" && Symbol.valueOf.call(a) === Symbol.valueOf.call(b);

    case "[object Map]":
    case "[object Set]":
      // Maps and Sets are unwrapped to arrays of entry-pairs, adding an incidental level.
      // Hide this extra level by increasing the depth.
      if (depth >= 0) {
        depth++;
      }

      break;
  } // Unwrap any wrapped objects.


  a = unwrap(a);
  b = unwrap(b);
  var areArrays = className === "[object Array]";

  if (!areArrays) {
    if (typeof a != "object" || typeof b != "object") return false; // Objects with different constructors are not equivalent, but `Object`s or `Array`s
    // from different frames are.

    var aCtor = a.constructor,
        bCtor = b.constructor;

    if (aCtor !== bCtor && !(typeof aCtor === "function" && aCtor instanceof aCtor && typeof bCtor === "function" && bCtor instanceof bCtor) && "constructor" in a && "constructor" in b) {
      return false;
    }
  }

  if (depth === 0) {
    return false;
  } else if (depth < 0) {
    depth = -1;
  } // Assume equality for cyclic structures. The algorithm for detecting cyclic
  // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
  // Initializing stack of traversed objects.
  // It's done here since we only need them for objects and arrays comparison.


  aStack = aStack || [];
  bStack = bStack || [];
  var length = aStack.length;

  while (length--) {
    // Linear search. Performance is inversely proportional to the number of
    // unique nested structures.
    if (aStack[length] === a) return bStack[length] === b;
  } // Add the first object to the stack of traversed objects.


  aStack.push(a);
  bStack.push(b); // Recursively compare objects and arrays.

  if (areArrays) {
    // Compare array lengths to determine if a deep comparison is necessary.
    length = a.length;
    if (length !== b.length) return false; // Deep compare the contents, ignoring non-numeric properties.

    while (length--) {
      if (!eq(a[length], b[length], depth - 1, aStack, bStack)) return false;
    }
  } else {
    // Deep compare objects.
    var keys = Object.keys(a);
    var key = void 0;
    length = keys.length; // Ensure that both objects contain the same number of properties before comparing deep equality.

    if (Object.keys(b).length !== length) return false;

    while (length--) {
      // Deep compare each member
      key = keys[length];
      if (!(has$1$1(b, key) && eq(a[key], b[key], depth - 1, aStack, bStack))) return false;
    }
  } // Remove the first object from the stack of traversed objects.


  aStack.pop();
  bStack.pop();
  return true;
}

function unwrap(a) {
  if (isObservableArray(a)) return a.slice();
  if (isES6Map(a) || isObservableMap(a)) return Array.from(a.entries());
  if (isES6Set(a) || isObservableSet(a)) return Array.from(a.entries());
  return a;
}

function has$1$1(a, key) {
  return Object.prototype.hasOwnProperty.call(a, key);
}

function makeIterable(iterator) {
  iterator[Symbol.iterator] = getSelf;
  return iterator;
}

function getSelf() {
  return this;
}
/*
The only reason for this file to exist is pure horror:
Without it rollup can make the bundling fail at any point in time; when it rolls up the files in the wrong order
it will cause undefined errors (for example because super classes or local variables not being hoisted).
With this file that will still happen,
but at least in this file we can magically reorder the imports with trial and error until the build succeeds again.
*/

/**
 * (c) Michel Weststrate 2015 - 2018
 * MIT Licensed
 *
 * Welcome to the mobx sources! To get an global overview of how MobX internally works,
 * this is a good place to start:
 * https://medium.com/@mweststrate/becoming-fully-reactive-an-in-depth-explanation-of-mobservable-55995262a254#.xvbh6qd74
 *
 * Source folders:
 * ===============
 *
 * - api/     Most of the public static methods exposed by the module can be found here.
 * - core/    Implementation of the MobX algorithm; atoms, derivations, reactions, dependency trees, optimizations. Cool stuff can be found here.
 * - types/   All the magic that is need to have observable objects, arrays and values is in this folder. Including the modifiers like `asFlat`.
 * - utils/   Utility stuff.
 *
 */


if (typeof Proxy === "undefined" || typeof Symbol === "undefined") {
  throw new Error("[mobx] MobX 5+ requires Proxy and Symbol objects. If your environment doesn't support Symbol or Proxy objects, please downgrade to MobX 4. For React Native Android, consider upgrading JSCore.");
}

try {
  // define process.env if needed
  // if this is not a production build in the first place
  // (in which case the expression below would be substituted with 'production')
  process.env.NODE_ENV;
} catch (e) {
  var g = getGlobal();
  if (typeof process === "undefined") g.process = {};
  g.process.env = {};
}

(function () {
  function testCodeMinification() {}

  if (testCodeMinification.name !== "testCodeMinification" && process.env.NODE_ENV !== "production" && typeof process !== 'undefined' && process.env.IGNORE_MOBX_MINIFY_WARNING !== "true") {
    // trick so it doesn't get replaced
    var varName = ["process", "env", "NODE_ENV"].join(".");
    console.warn("[mobx] you are running a minified build, but '" + varName + "' was not set to 'production' in your bundler. This results in an unnecessarily large and slow bundle");
  }
})();

if (typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === "object") {
  // See: https://github.com/andykog/mobx-devtools/
  __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({
    spy: spy,
    extras: {
      getDebugName: getDebugName
    },
    $mobx: $mobx
  });
}

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _class2, _temp;
var HeaderNavStore = (_class = (_temp = _class2 = /*#__PURE__*/function () {
  function HeaderNavStore() {
    var _this = this;

    _classCallCheck(this, HeaderNavStore);

    _defineProperty(this, "catSDK", new catSdk.CatSDK());

    _initializerDefineProperty(this, "catData", _descriptor, this);

    _initializerDefineProperty(this, "loggedIn", _descriptor2, this);

    _initializerDefineProperty(this, "name", _descriptor3, this);

    _initializerDefineProperty(this, "queryString", _descriptor4, this);

    _initializerDefineProperty(this, "initQueryStringClientSide", _descriptor5, this);

    _initializerDefineProperty(this, "initAuthTokenClientSide", _descriptor6, this);

    _initializerDefineProperty(this, "setCatData", _descriptor7, this);

    _defineProperty(this, "catDataEventListener", function (catDataEvent) {
      _this.setCatData(catDataEvent.detail);
    });

    _defineProperty(this, "initClientSide", function () {
      _this.initQueryStringClientSide();

      _this.initAuthTokenClientSide();

      _this.catSDK.observeCatData(_this.catDataEventListener);
    });

    _defineProperty(this, "tearDownClientSide", function () {
      _this.catSDK.unobserveCatData(_this.catDataEventListener);
    });

    _initializerDefineProperty(this, "signOut", _descriptor8, this);
  }

  _createClass(HeaderNavStore, [{
    key: "phoneNumber",
    get: function get() {
      if (!this.catData) {
        return undefined;
      }

      return this.catData.sitePhoneNumber;
    }
  }]);

  return HeaderNavStore;
}(), _defineProperty(_class2, "authTokenCookieName", 'authToken'), _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "catData", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class.prototype, "phoneNumber", [computed], Object.getOwnPropertyDescriptor(_class.prototype, "phoneNumber"), _class.prototype), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "loggedIn", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "name", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "queryString", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "initQueryStringClientSide", [action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this2 = this;

    return function () {
      var query = lib_2(window.location.search, {
        ignoreQueryPrefix: true
      });

      var picked = function (_ref) {
        var gclid = _ref.gclid,
            subid = _ref.subid,
            utm_source = _ref.utm_source,
            utm_medium = _ref.utm_medium,
            utm_campaign = _ref.utm_campaign,
            utm_term = _ref.utm_term,
            utm_content = _ref.utm_content,
            utm_keyword = _ref.utm_keyword,
            utm_subsource = _ref.utm_subsource,
            utm_site = _ref.utm_site;
        return {
          gclid: gclid,
          subid: subid,
          utm_source: utm_source,
          utm_medium: utm_medium,
          utm_campaign: utm_campaign,
          utm_term: utm_term,
          utm_content: utm_content,
          utm_keyword: utm_keyword,
          utm_subsource: utm_subsource,
          utm_site: utm_site
        };
      }(query);

      _this2.queryString = lib_3(picked, {
        addQueryPrefix: true
      });
    };
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "initAuthTokenClientSide", [action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this3 = this;

    return function () {
      try {
        // https://github.com/js-cookie/js-cookie/blob/master/SERVER_SIDE.md#express
        var authTokenWithExpressPrefix = js_cookie.get(HeaderNavStore.authTokenCookieName);

        if (!authTokenWithExpressPrefix) {
          _this3.loggedIn = false;
          return;
        }

        var authToken = JSON.parse(authTokenWithExpressPrefix.slice(2));

        var _jwtDecode = lib$1(authToken.accessToken),
            expirationTimestamp = _jwtDecode.exp;

        var loggedIn = expirationTimestamp > new Date().getTime() / 1000;
        _this3.loggedIn = loggedIn; // FIT-488
        // This is a stopgap until the authToken cookie realiably includes "idToken" data.
        // We will set the "name" field if "idToken" is defined, otherwise gracefully fail.

        try {
          var _jwtDecode2 = lib$1(authToken.idToken),
              name = _jwtDecode2.name;

          _this3.name = name;
        } catch (_unused) {
          _this3.name = undefined;
        }
      } catch (_unused2) {
        _this3.loggedIn = false;
      }
    };
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "setCatData", [action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function (catData) {
      _this4.catData = catData;
    };
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "signOut", [action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function () {
      js_cookie.remove('authToken'); // FIT-468.
      // The vroom-com application persists its redux state using session storage.
      // In order to make sure sign outs are registered by the vroom-com app,
      // we need to clear the persisted data here.
      // When we get to a point where we've fully ported off vroom-com,
      // this line can be reassesed and likely removed.

      sessionStorage.removeItem('persist:root');
      _this5.loggedIn = false;
    };
  }
})), _class);

if (!React.useState) {
  throw new Error("mobx-react-lite requires React with Hooks support");
}

if (!spy) {
  throw new Error("mobx-react-lite requires mobx at least version 4 to be available");
}

function _extends$1() {
  _extends$1 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$1.apply(this, arguments);
}

function useForceUpdate() {
  var _useState = React.useState(0),
      setTick = _useState[1];

  var update = React.useCallback(function () {
    setTick(function (tick) {
      return tick + 1;
    });
  }, []);
  return update;
}

function getSymbol(name) {
  if (typeof Symbol === "function") {
    return Symbol.for(name);
  }

  return "__$mobx-react " + name + "__";
}

var mockGlobal$1 = {};

function getGlobal$1() {
  if (typeof window !== "undefined") {
    return window;
  }

  if (typeof global !== "undefined") {
    return global;
  }

  if (typeof self !== "undefined") {
    return self;
  }

  return mockGlobal$1;
}

var observerBatchingConfiguredSymbol = /*#__PURE__*/getSymbol("observerBatching");

var isObserverBatched = function isObserverBatched() {
  return getGlobal$1()[observerBatchingConfiguredSymbol];
};

function printDebugValue(v) {
  return getDependencyTree(v);
}

function createTrackingData(reaction) {
  var trackingData = {
    cleanAt: Date.now() + CLEANUP_LEAKED_REACTIONS_AFTER_MILLIS,
    reaction: reaction
  };
  return trackingData;
}
/**
 * The minimum time before we'll clean up a Reaction created in a render
 * for a component that hasn't managed to run its effects. This needs to
 * be big enough to ensure that a component won't turn up and have its
 * effects run without being re-rendered.
 */


var CLEANUP_LEAKED_REACTIONS_AFTER_MILLIS = 10000;
/**
 * The frequency with which we'll check for leaked reactions.
 */

var CLEANUP_TIMER_LOOP_MILLIS = 10000;
/**
 * Reactions created by components that have yet to be fully mounted.
 */

var uncommittedReactionRefs = /*#__PURE__*/new Set();
/**
 * Latest 'uncommitted reactions' cleanup timer handle.
 */

var reactionCleanupHandle;

function ensureCleanupTimerRunning() {
  if (reactionCleanupHandle === undefined) {
    reactionCleanupHandle = setTimeout(cleanUncommittedReactions, CLEANUP_TIMER_LOOP_MILLIS);
  }
}

function scheduleCleanupOfReactionIfLeaked(ref) {
  uncommittedReactionRefs.add(ref);
  ensureCleanupTimerRunning();
}

function recordReactionAsCommitted(reactionRef) {
  uncommittedReactionRefs.delete(reactionRef);
}
/**
 * Run by the cleanup timer to dispose any outstanding reactions
 */


function cleanUncommittedReactions() {
  reactionCleanupHandle = undefined; // Loop through all the candidate leaked reactions; those older
  // than CLEANUP_LEAKED_REACTIONS_AFTER_MILLIS get tidied.

  var now = Date.now();

  for (var _iterator = uncommittedReactionRefs, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var ref = _ref;
    var tracking = ref.current;

    if (tracking) {
      if (now >= tracking.cleanAt) {
        // It's time to tidy up this leaked reaction.
        tracking.reaction.dispose();
        ref.current = null;
        uncommittedReactionRefs.delete(ref);
      }
    }
  }

  if (uncommittedReactionRefs.size > 0) {
    // We've just finished a round of cleanups but there are still
    // some leak candidates outstanding.
    ensureCleanupTimerRunning();
  }
}

var EMPTY_OBJECT$1 = {};

function observerComponentNameFor(baseComponentName) {
  return "observer" + baseComponentName;
}

var warnedAboutBatching = false;

function useObserver(fn, baseComponentName, options) {
  if (baseComponentName === void 0) {
    baseComponentName = "observed";
  }

  if (options === void 0) {
    options = EMPTY_OBJECT$1;
  }

  if (process.env.NODE_ENV !== "production" && !warnedAboutBatching && !isObserverBatched()) {
    console.warn("[MobX] You haven't configured observer batching which might result in unexpected behavior in some cases. See more at https://github.com/mobxjs/mobx-react-lite/#observer-batching");
    warnedAboutBatching = true;
  }

  var wantedForceUpdateHook = options.useForceUpdate || useForceUpdate;
  var forceUpdate = wantedForceUpdateHook(); // StrictMode/ConcurrentMode/Suspense may mean that our component is
  // rendered and abandoned multiple times, so we need to track leaked
  // Reactions.

  var reactionTrackingRef = React__default.useRef(null);

  if (!reactionTrackingRef.current) {
    // First render for this component (or first time since a previous
    // reaction from an abandoned render was disposed).
    var newReaction = new Reaction(observerComponentNameFor(baseComponentName), function () {
      // Observable has changed, meaning we want to re-render
      // BUT if we're a component that hasn't yet got to the useEffect()
      // stage, we might be a component that _started_ to render, but
      // got dropped, and we don't want to make state changes then.
      // (It triggers warnings in StrictMode, for a start.)
      if (trackingData.mounted) {
        // We have reached useEffect(), so we're mounted, and can trigger an update
        forceUpdate();
      } else {
        // We haven't yet reached useEffect(), so we'll need to trigger a re-render
        // when (and if) useEffect() arrives.  The easiest way to do that is just to
        // drop our current reaction and allow useEffect() to recreate it.
        newReaction.dispose();
        reactionTrackingRef.current = null;
      }
    });
    var trackingData = createTrackingData(newReaction);
    reactionTrackingRef.current = trackingData;
    scheduleCleanupOfReactionIfLeaked(reactionTrackingRef);
  }

  var reaction = reactionTrackingRef.current.reaction;
  React__default.useDebugValue(reaction, printDebugValue);
  React__default.useEffect(function () {
    // Called on first mount only
    recordReactionAsCommitted(reactionTrackingRef);

    if (reactionTrackingRef.current) {
      // Great. We've already got our reaction from our render;
      // all we need to do is to record that it's now mounted,
      // to allow future observable changes to trigger re-renders
      reactionTrackingRef.current.mounted = true;
    } else {
      // The reaction we set up in our render has been disposed.
      // This is either due to bad timings of renderings, e.g. our
      // component was paused for a _very_ long time, and our
      // reaction got cleaned up, or we got a observable change
      // between render and useEffect
      // Re-create the reaction
      reactionTrackingRef.current = {
        reaction: new Reaction(observerComponentNameFor(baseComponentName), function () {
          // We've definitely already been mounted at this point
          forceUpdate();
        }),
        cleanAt: Infinity
      };
      forceUpdate();
    }

    return function () {
      reactionTrackingRef.current.reaction.dispose();
      reactionTrackingRef.current = null;
    };
  }, []); // render the original component, but have the
  // reaction track the observables, so that rendering
  // can be invalidated (see above) once a dependency changes

  var rendering;
  var exception;
  reaction.track(function () {
    try {
      rendering = fn();
    } catch (e) {
      exception = e;
    }
  });

  if (exception) {
    throw exception; // re-throw any exceptions catched during rendering
  }

  return rendering;
}

function observer(baseComponent, options) {

  var realOptions = _extends$1({
    forwardRef: false
  }, options);

  var baseComponentName = baseComponent.displayName || baseComponent.name;

  var wrappedComponent = function wrappedComponent(props, ref) {
    return useObserver(function () {
      return baseComponent(props, ref);
    }, baseComponentName);
  };

  wrappedComponent.displayName = baseComponentName; // memo; we are not intested in deep updates
  // in props; we assume that if deep objects are changed,
  // this is in observables, which would have been tracked anyway

  var memoComponent;

  if (realOptions.forwardRef) {
    // we have to use forwardRef here because:
    // 1. it cannot go before memo, only after it
    // 2. forwardRef converts the function into an actual component, so we can't let the baseComponent do it
    //    since it wouldn't be a callable function anymore
    memoComponent = React.memo(React.forwardRef(wrappedComponent));
  } else {
    memoComponent = React.memo(wrappedComponent);
  }

  copyStaticProperties(baseComponent, memoComponent);
  memoComponent.displayName = baseComponentName;
  return memoComponent;
} // based on https://github.com/mridgway/hoist-non-react-statics/blob/master/src/index.js


var hoistBlackList = {
  $$typeof: true,
  render: true,
  compare: true,
  type: true
};

function copyStaticProperties(base, target) {
  Object.keys(base).forEach(function (key) {
    if (!hoistBlackList[key]) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(base, key));
    }
  });
}

function ObserverComponent(_ref) {
  var children = _ref.children,
      render = _ref.render;
  var component = children || render;

  if (typeof component !== "function") {
    return null;
  }

  return useObserver(component);
}

ObserverComponent.propTypes = {
  children: ObserverPropsCheck,
  render: ObserverPropsCheck
};
ObserverComponent.displayName = "Observer";

function ObserverPropsCheck(props, key, componentName, location, propFullName) {
  var extraKey = key === "children" ? "render" : "children";
  var hasProp = typeof props[key] === "function";
  var hasExtraProp = typeof props[extraKey] === "function";

  if (hasProp && hasExtraProp) {
    return new Error("MobX Observer: Do not use children and render in the same time in`" + componentName);
  }

  if (hasProp || hasExtraProp) {
    return null;
  }

  return new Error("Invalid prop `" + propFullName + "` of type `" + typeof props[key] + "` supplied to" + " `" + componentName + "`, expected `function`.");
}

var symbolId = 0;

function createSymbol(name) {
  if (typeof Symbol === "function") {
    return Symbol(name);
  }

  var symbol = "__$mobx-react " + name + " (" + symbolId + ")";
  symbolId++;
  return symbol;
}

var createdSymbols = {};

function newSymbol(name) {
  if (!createdSymbols[name]) {
    createdSymbols[name] = createSymbol(name);
  }

  return createdSymbols[name];
}

function shallowEqual(objA, objB) {
  //From: https://github.com/facebook/fbjs/blob/c69904a511b900266935168223063dd8772dfc40/packages/fbjs/src/core/shallowEqual.js
  if (is(objA, objB)) return true;

  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  for (var i = 0; i < keysA.length; i++) {
    if (!Object.hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

function is(x, y) {
  // From: https://github.com/facebook/fbjs/blob/c69904a511b900266935168223063dd8772dfc40/packages/fbjs/src/core/shallowEqual.js
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
} // based on https://github.com/mridgway/hoist-non-react-statics/blob/master/src/index.js
/**
 * Helper to set `prop` to `this` as non-enumerable (hidden prop)
 * @param target
 * @param prop
 * @param value
 */


function setHiddenProp(target, prop, value) {
  if (!Object.hasOwnProperty.call(target, prop)) {
    Object.defineProperty(target, prop, {
      enumerable: false,
      configurable: true,
      writable: true,
      value: value
    });
  } else {
    target[prop] = value;
  }
}
/**
 * Utilities for patching componentWillUnmount, to make sure @disposeOnUnmount works correctly icm with user defined hooks
 * and the handler provided by mobx-react
 */


var mobxMixins = /*#__PURE__*/newSymbol("patchMixins");
var mobxPatchedDefinition = /*#__PURE__*/newSymbol("patchedDefinition");

function getMixins(target, methodName) {
  var mixins = target[mobxMixins] = target[mobxMixins] || {};
  var methodMixins = mixins[methodName] = mixins[methodName] || {};
  methodMixins.locks = methodMixins.locks || 0;
  methodMixins.methods = methodMixins.methods || [];
  return methodMixins;
}

function wrapper(realMethod, mixins) {
  var _this = this;

  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  } // locks are used to ensure that mixins are invoked only once per invocation, even on recursive calls


  mixins.locks++;

  try {
    var retVal;

    if (realMethod !== undefined && realMethod !== null) {
      retVal = realMethod.apply(this, args);
    }

    return retVal;
  } finally {
    mixins.locks--;

    if (mixins.locks === 0) {
      mixins.methods.forEach(function (mx) {
        mx.apply(_this, args);
      });
    }
  }
}

function wrapFunction(realMethod, mixins) {
  var fn = function fn() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    wrapper.call.apply(wrapper, [this, realMethod, mixins].concat(args));
  };

  return fn;
}

function patch(target, methodName, mixinMethod) {
  var mixins = getMixins(target, methodName);

  if (mixins.methods.indexOf(mixinMethod) < 0) {
    mixins.methods.push(mixinMethod);
  }

  var oldDefinition = Object.getOwnPropertyDescriptor(target, methodName);

  if (oldDefinition && oldDefinition[mobxPatchedDefinition]) {
    // already patched definition, do not repatch
    return;
  }

  var originalMethod = target[methodName];
  var newDefinition = createDefinition(target, methodName, oldDefinition ? oldDefinition.enumerable : undefined, mixins, originalMethod);
  Object.defineProperty(target, methodName, newDefinition);
}

function createDefinition(target, methodName, enumerable, mixins, originalMethod) {
  var _ref;

  var wrappedFunc = wrapFunction(originalMethod, mixins);
  return _ref = {}, _ref[mobxPatchedDefinition] = true, _ref.get = function get() {
    return wrappedFunc;
  }, _ref.set = function set(value) {
    if (this === target) {
      wrappedFunc = wrapFunction(value, mixins);
    } else {
      // when it is an instance of the prototype/a child prototype patch that particular case again separately
      // since we need to store separate values depending on wether it is the actual instance, the prototype, etc
      // e.g. the method for super might not be the same as the method for the prototype which might be not the same
      // as the method for the instance
      var newDefinition = createDefinition(this, methodName, enumerable, mixins, value);
      Object.defineProperty(this, methodName, newDefinition);
    }
  }, _ref.configurable = true, _ref.enumerable = enumerable, _ref;
}

var mobxAdminProperty = $mobx || "$mobx";
var mobxIsUnmounted = /*#__PURE__*/newSymbol("isUnmounted");
var skipRenderKey = /*#__PURE__*/newSymbol("skipRender");
var isForcingUpdateKey = /*#__PURE__*/newSymbol("isForcingUpdate");

function makeClassComponentObserver(componentClass) {
  var target = componentClass.prototype;
  if (target.componentWillReact) throw new Error("The componentWillReact life-cycle event is no longer supported");

  if (componentClass["__proto__"] !== React.PureComponent) {
    if (!target.shouldComponentUpdate) target.shouldComponentUpdate = observerSCU;else if (target.shouldComponentUpdate !== observerSCU) // n.b. unequal check, instead of existence check, as @observer might be on superclass as well
      throw new Error("It is not allowed to use shouldComponentUpdate in observer based components.");
  } // this.props and this.state are made observable, just to make sure @computed fields that
  // are defined inside the component, and which rely on state or props, re-compute if state or props change
  // (otherwise the computed wouldn't update and become stale on props change, since props are not observable)
  // However, this solution is not without it's own problems: https://github.com/mobxjs/mobx-react/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3Aobservable-props-or-not+


  makeObservableProp(target, "props");
  makeObservableProp(target, "state");
  var baseRender = target.render;

  target.render = function () {
    return makeComponentReactive.call(this, baseRender);
  };

  patch(target, "componentWillUnmount", function () {

    if (this.render[mobxAdminProperty]) {
      this.render[mobxAdminProperty].dispose();
    } else if (process.env.NODE_ENV !== "production") {
      var displayName = getDisplayName(this);
      console.warn("The render function for an observer component (" + displayName + ") was modified after MobX attached. This is not supported, since the new function can't be triggered by MobX.");
    }

    this[mobxIsUnmounted] = true;
  });
  return componentClass;
} // Generates a friendly name for debugging


function getDisplayName(comp) {
  return comp.displayName || comp.name || comp.constructor && (comp.constructor.displayName || comp.constructor.name) || "<component>";
}

function makeComponentReactive(render) {
  var _this = this;
  /**
   * If props are shallowly modified, react will render anyway,
   * so atom.reportChanged() should not result in yet another re-render
   */

  setHiddenProp(this, skipRenderKey, false);
  /**
   * forceUpdate will re-assign this.props. We don't want that to cause a loop,
   * so detect these changes
   */

  setHiddenProp(this, isForcingUpdateKey, false);
  var initialName = getDisplayName(this);
  var baseRender = render.bind(this);
  var isRenderingPending = false;
  var reaction = new Reaction(initialName + ".render()", function () {
    if (!isRenderingPending) {
      // N.B. Getting here *before mounting* means that a component constructor has side effects (see the relevant test in misc.js)
      // This unidiomatic React usage but React will correctly warn about this so we continue as usual
      // See #85 / Pull #44
      isRenderingPending = true;

      if (_this[mobxIsUnmounted] !== true) {
        var hasError = true;

        try {
          setHiddenProp(_this, isForcingUpdateKey, true);
          if (!_this[skipRenderKey]) React.Component.prototype.forceUpdate.call(_this);
          hasError = false;
        } finally {
          setHiddenProp(_this, isForcingUpdateKey, false);
          if (hasError) reaction.dispose();
        }
      }
    }
  });
  reaction["reactComponent"] = this;
  reactiveRender[mobxAdminProperty] = reaction;
  this.render = reactiveRender;

  function reactiveRender() {
    isRenderingPending = false;
    var exception = undefined;
    var rendering = undefined;
    reaction.track(function () {
      try {
        rendering = allowStateChanges(false, baseRender);
      } catch (e) {
        exception = e;
      }
    });

    if (exception) {
      throw exception;
    }

    return rendering;
  }

  return reactiveRender.call(this);
}

function observerSCU(nextProps, nextState) {


  if (this.state !== nextState) {
    return true;
  } // update if props are shallowly not equal, inspired by PureRenderMixin
  // we could return just 'false' here, and avoid the `skipRender` checks etc
  // however, it is nicer if lifecycle events are triggered like usually,
  // so we return true here if props are shallowly modified.


  return !shallowEqual(this.props, nextProps);
}

function makeObservableProp(target, propName) {
  var valueHolderKey = newSymbol("reactProp_" + propName + "_valueHolder");
  var atomHolderKey = newSymbol("reactProp_" + propName + "_atomHolder");

  function getAtom() {
    if (!this[atomHolderKey]) {
      setHiddenProp(this, atomHolderKey, createAtom("reactive " + propName));
    }

    return this[atomHolderKey];
  }

  Object.defineProperty(target, propName, {
    configurable: true,
    enumerable: true,
    get: function get() {
      var prevReadState = false;

      if (allowStateReadsStart && allowStateReadsEnd) {
        prevReadState = allowStateReadsStart(true);
      }

      getAtom.call(this).reportObserved();

      if (allowStateReadsStart && allowStateReadsEnd) {
        allowStateReadsEnd(prevReadState);
      }

      return this[valueHolderKey];
    },
    set: function set(v) {
      if (!this[isForcingUpdateKey] && !shallowEqual(this[valueHolderKey], v)) {
        setHiddenProp(this, valueHolderKey, v);
        setHiddenProp(this, skipRenderKey, true);
        getAtom.call(this).reportChanged();
        setHiddenProp(this, skipRenderKey, false);
      } else {
        setHiddenProp(this, valueHolderKey, v);
      }
    }
  });
}

var hasSymbol = typeof Symbol === "function" && Symbol.for; // Using react-is had some issues (and operates on elements, not on types), see #608 / #609

var ReactForwardRefSymbol = hasSymbol ? /*#__PURE__*/Symbol.for("react.forward_ref") : typeof React.forwardRef === "function" && /*#__PURE__*/React.forwardRef(function (props) {
  return null;
})["$$typeof"];
var ReactMemoSymbol = hasSymbol ? /*#__PURE__*/Symbol.for("react.memo") : typeof React.memo === "function" && /*#__PURE__*/React.memo(function (props) {
  return null;
})["$$typeof"];
/**
 * Observer function / decorator
 */

function observer$1(component) {
  if (component["isMobxInjector"] === true) {
    console.warn("Mobx observer: You are trying to use 'observer' on a component that already has 'inject'. Please apply 'observer' before applying 'inject'");
  }

  if (ReactMemoSymbol && component["$$typeof"] === ReactMemoSymbol) {
    throw new Error("Mobx observer: You are trying to use 'observer' on a function component wrapped in either another observer or 'React.memo'. The observer already applies 'React.memo' for you.");
  } // Unwrap forward refs into `<Observer>` component
  // we need to unwrap the render, because it is the inner render that needs to be tracked,
  // not the ForwardRef HoC


  if (ReactForwardRefSymbol && component["$$typeof"] === ReactForwardRefSymbol) {
    var baseRender = component["render"];
    if (typeof baseRender !== "function") throw new Error("render property of ForwardRef was not a function");
    return React.forwardRef(function ObserverForwardRef() {
      var args = arguments;
      return React.createElement(ObserverComponent, null, function () {
        return baseRender.apply(undefined, args);
      });
    });
  } // Function component


  if (typeof component === "function" && (!component.prototype || !component.prototype.render) && !component["isReactClass"] && !Object.prototype.isPrototypeOf.call(React.Component, component)) {
    return observer(component);
  }

  return makeClassComponentObserver(component);
}
if (!React.Component) throw new Error("mobx-react requires React to be available");
if (!observable) throw new Error("mobx-react requires mobx to be available");

function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }

var _ref$1 = /*#__PURE__*/React.createElement("path", {
  fill: "currentColor",
  fillRule: "evenodd",
  d: "M11.84 0L6.232 5.605.7.068 0 .766 6.233 7 12.537.697z"
});

function SvgArrow(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$2({
    viewBox: "0 0 13 7"
  }, props), _ref$1);
}

var LabelAndArrow = styles.styled('span')(function () {
  return {
    display: 'flex',
    alignItems: 'baseline',
    '& > svg:not(.dropdown-arrow)': {
      alignSelf: 'center',
      width: '16px',
      height: '16px',
      marginRight: '4px'
    }
  };
});
var StyledArrowSvg = styles.styled(SvgArrow)(function (_ref) {
  var theme = _ref.theme;
  return {
    width: '8px',
    height: '8px',
    marginLeft: '4px',
    color: theme.palette.grey[800]
  };
});
var StyledSpan = styles.styled('span')(function (_ref2) {
  var theme = _ref2.theme;
  return {
    cursor: 'default',
    display: 'inline-flex',
    flexDirection: 'column',
    position: 'relative',
    '&:after': {
      content: '""',
      display: 'flex',
      width: '0px',
      height: '2px',
      margin: 'auto',
      marginTop: '4px',
      background: theme.palette.primary.main,
      transition: 'width 250ms ease, background-color 250ms ease'
    },
    '&:hover:after': {
      width: '100%'
    }
  };
});
var StyledTooltip = styles.withStyles(function (theme) {
  return {
    arrow: {
      color: theme.palette.background.paper,
      '&::before': {
        position: 'absolute',
        top: '0',
        color: theme.palette.grey[400]
      },
      '&::after': {
        position: 'absolute',
        top: '1px',
        borderColor: "transparent transparent ".concat(theme.palette.background.paper, " transparent"),
        borderWidth: '0 1em 1em 1em',
        width: '0',
        height: '0',
        margin: 'auto',
        content: '""',
        display: 'block',
        borderStyle: 'solid'
      }
    },
    tooltip: {
      borderRadius: '0px',
      backgroundColor: theme.palette.background.paper,
      border: "1px solid ".concat(theme.palette.grey[400]),
      padding: theme.spacing(3),
      '& > a:not(:first-child)': {
        marginTop: theme.spacing(2)
      }
    }
  };
})(Tooltip);
var StyledAnchor$1 = styles.styled('a')(function (_ref3) {
  var theme = _ref3.theme;
  return {
    display: 'flex',
    alignItems: 'baseline',
    color: theme.palette.grey[600],
    textDecoration: 'none',
    '&:visited': {
      color: theme.palette.grey[600],
      textDecoration: 'none'
    },
    '&:hover': {
      color: theme.palette.primary.main,
      textDecoration: 'underline'
    },
    '&:active': {
      color: theme.palette.grey[600],
      textDecoration: 'none'
    },
    '& > svg': {
      width: '12px',
      height: '12px',
      marginRight: '4px',
      color: theme.palette.primary.main
    }
  };
});

var DropdownView = function DropdownView(_ref4) {
  var IconComponent = _ref4.IconComponent,
      label = _ref4.label,
      links = _ref4.links;
  var linksJsx = links.map(function (link) {
    var href = link.href,
        IconComponent = link.IconComponent,
        label = link.label,
        onClick = link.onClick;
    return /*#__PURE__*/React__default.createElement(StyledAnchor$1, {
      key: label,
      href: href,
      onClick: onClick
    }, IconComponent && /*#__PURE__*/React__default.createElement(IconComponent, null), /*#__PURE__*/React__default.createElement(ui.Typography, {
      variant: "button"
    }, label));
  });
  return /*#__PURE__*/React__default.createElement(StyledTooltip, {
    arrow: true,
    interactive: true,
    placement: "bottom" // TODO: figure out how to keep tooltip mounted correctly.
    // This allows bots to more easily crawl the site,
    // but it does cause the dropdown to pop if you hover over the HIDDEN dropdown.
    // PopperProps={{
    //   keepMounted: true,
    // }}
    ,
    title: linksJsx // "title" is oddly named, it means the tooltip content.

  }, /*#__PURE__*/React__default.createElement(StyledSpan, null, /*#__PURE__*/React__default.createElement(LabelAndArrow, null, IconComponent && /*#__PURE__*/React__default.createElement(IconComponent, null), /*#__PURE__*/React__default.createElement(ui.Typography, {
    letterSpacing: "1.25px",
    variant: "button",
    fontWeight: "fontWeightSemibold"
  }, label), /*#__PURE__*/React__default.createElement(StyledArrowSvg, {
    className: "dropdown-arrow"
  }))));
};

var StyledAnchor$2 = styles.styled('a')(function (_ref) {
  var theme = _ref.theme;
  return {
    display: 'inline-flex',
    flexDirection: 'column',
    position: 'relative',
    color: 'inherit',
    textDecoration: 'none',
    '&:visited': {
      color: 'inherit',
      textDecoration: 'none'
    },
    '&:hover': {
      color: 'inherit',
      textDecoration: 'none'
    },
    '&:active': {
      color: 'inherit',
      textDecoration: 'none'
    },
    '&:after': {
      content: '""',
      display: 'flex',
      width: '0px',
      height: '2px',
      margin: 'auto',
      marginTop: '4px',
      background: theme.palette.primary.main,
      transition: 'width 250ms ease, background-color 250ms ease'
    },
    '&:hover:after': {
      width: '100%'
    }
  };
});
var IconAndLabel = styles.styled('div')(function () {
  return {
    display: 'flex',
    alignItems: 'baseline',
    '& > svg': {
      alignSelf: 'center',
      width: '16px',
      height: '16px'
    },
    '& > :not(:first-child)': {
      marginLeft: '4px'
    }
  };
});

var LinkView = function LinkView(_ref2) {
  var href = _ref2.href,
      IconComponent = _ref2.IconComponent,
      label = _ref2.label,
      onClick = _ref2.onClick;
  return /*#__PURE__*/React__default.createElement(StyledAnchor$2, {
    href: href,
    onClick: onClick
  }, /*#__PURE__*/React__default.createElement(IconAndLabel, null, IconComponent && /*#__PURE__*/React__default.createElement(IconComponent, null), label && /*#__PURE__*/React__default.createElement(ui.Typography, {
    letterSpacing: "1.25px",
    variant: "button",
    fontWeight: "fontWeightSemibold"
  }, label)));
};

var StyledDiv = styles.styled('div')(function (_ref) {
  var theme = _ref.theme;
  return {
    display: 'inline-flex',
    '& > *:not(:first-child)': {
      marginLeft: theme.spacing(3)
    }
  };
});

var DesktopView = function DesktopView(_ref2) {
  var links = _ref2.links;

  if (!links) {
    return null;
  }

  var linksJsx = links.map(function (link, index) {
    if (link.type === 'link') {
      var _ref3 = link,
          href = _ref3.href,
          IconComponent = _ref3.IconComponent,
          label = _ref3.label,
          onClick = _ref3.onClick;
      return /*#__PURE__*/React__default.createElement(LinkView, {
        key: index,
        href: href,
        IconComponent: IconComponent,
        label: label,
        onClick: onClick
      });
    } else if (link.type === 'dropdown') {
      var _ref4 = link,
          _IconComponent = _ref4.IconComponent,
          _label = _ref4.label,
          _links = _ref4.links;
      return /*#__PURE__*/React__default.createElement(DropdownView, {
        key: index,
        IconComponent: _IconComponent,
        label: _label,
        links: _links
      });
    }

    return null;
  });
  return /*#__PURE__*/React__default.createElement(StyledDiv, null, linksJsx);
};

function _extends$3() { _extends$3 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$3.apply(this, arguments); }

var _ref$2 = /*#__PURE__*/React.createElement("path", {
  d: "M13.688 15.438v2.083H.666v-2.084h13.02zm3.905-7.552v2.083H.667V7.886h16.926zM21.5.333v2.084H.667V.333H21.5z",
  fill: "currentColor",
  fillRule: "evenodd"
});

function SvgHamburger(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$3({
    viewBox: "0 0 22 18"
  }, props), _ref$2);
}

var StyledDiv$1 = styles.styled('div')(function (_ref) {
  var theme = _ref.theme;
  return {
    padding: theme.spacing(2),
    borderBottom: "1px solid ".concat(theme.palette.grey[300]),
    cursor: 'pointer'
  };
});
var IconLabelAndArrow = styles.styled('span')(function () {
  return {
    display: 'flex',
    alignItems: 'baseline',
    '& > svg:not(.dropdown-arrow)': {
      alignSelf: 'center',
      width: '16px',
      height: '16px',
      marginRight: '4px'
    },
    '& > svg.dropdown-arrow': {
      marginLeft: 'auto'
    }
  };
});
var StyledArrowSvg$1 = styles.styled(SvgArrow)(function (_ref2) {
  var theme = _ref2.theme;
  return {
    width: '12px',
    height: '12px',
    marginLeft: '4px',
    color: theme.palette.grey[800]
  };
});
var StyledAnchor$3 = styles.styled('a')(function (_ref3) {
  var theme = _ref3.theme;
  return {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'baseline',
    color: theme.palette.grey[600],
    textDecoration: 'none',
    '&:visited': {
      color: theme.palette.grey[600],
      textDecoration: 'none'
    },
    '&:hover': {
      color: theme.palette.primary.main,
      textDecoration: 'underline'
    },
    '&:active': {
      color: theme.palette.grey[600],
      textDecoration: 'none'
    },
    '& > svg': {
      width: '12px',
      height: '12px',
      marginRight: '4px',
      color: theme.palette.primary.main
    }
  };
});

var DropdownView$1 = function DropdownView(_ref4) {
  var IconComponent = _ref4.IconComponent,
      label = _ref4.label,
      links = _ref4.links;

  var _React$useState = React__default.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      expanded = _React$useState2[0],
      setExpaned = _React$useState2[1];

  var handleClick = function handleClick() {
    setExpaned(!expanded);
  };

  var linksJsx = links.map(function (link) {
    var href = link.href,
        IconComponent = link.IconComponent,
        label = link.label,
        onClick = link.onClick;
    return /*#__PURE__*/React__default.createElement(StyledAnchor$3, {
      key: label,
      href: href,
      onClick: onClick
    }, IconComponent && /*#__PURE__*/React__default.createElement(IconComponent, null), /*#__PURE__*/React__default.createElement(ui.Typography, {
      variant: "button"
    }, label));
  });
  return /*#__PURE__*/React__default.createElement(StyledDiv$1, {
    onClick: handleClick
  }, /*#__PURE__*/React__default.createElement(IconLabelAndArrow, null, IconComponent && /*#__PURE__*/React__default.createElement(IconComponent, null), /*#__PURE__*/React__default.createElement(ui.Typography, {
    letterSpacing: "1.25px",
    variant: "button",
    fontWeight: "fontWeightSemibold"
  }, label), /*#__PURE__*/React__default.createElement(StyledArrowSvg$1, {
    className: "dropdown-arrow",
    style: {
      transform: expanded ? 'rotate(180deg)' : 'none'
    }
  })), /*#__PURE__*/React__default.createElement(Collapse, {
    "in": expanded
  }, linksJsx));
};

var StyledAnchor$4 = styles.styled('a')(function (_ref) {
  var theme = _ref.theme;
  return {
    padding: theme.spacing(2),
    borderBottom: "1px solid ".concat(theme.palette.grey[300]),
    // TODO: style based on the MUI theme.
    color: 'inherit',
    textDecoration: 'none',
    display: 'flex',
    '&:visited': {
      color: 'inherit',
      textDecoration: 'none'
    },
    '&:hover': {
      color: theme.palette.primary.main,
      textDecoration: 'none'
    },
    '&:active': {
      color: 'inherit',
      textDecoration: 'none'
    }
  };
});

var LinkView$1 = function LinkView(_ref2) {
  var href = _ref2.href,
      IconComponent = _ref2.IconComponent,
      label = _ref2.label,
      onClick = _ref2.onClick;
  return /*#__PURE__*/React__default.createElement(StyledAnchor$4, {
    href: href,
    onClick: onClick
  }, IconComponent && /*#__PURE__*/React__default.createElement(IconComponent, null), /*#__PURE__*/React__default.createElement(ui.Typography, {
    letterSpacing: "1.25px",
    variant: "button",
    fontWeight: "fontWeightSemibold"
  }, label));
};

var DrawerContentView = function DrawerContentView(_ref) {
  var links = _ref.links;

  if (!links) {
    return null;
  }

  var linksJsx = links.map(function (link) {
    if (link.type === 'link') {
      var _ref2 = link,
          href = _ref2.href,
          IconComponent = _ref2.IconComponent,
          label = _ref2.label,
          onClick = _ref2.onClick;
      return /*#__PURE__*/React__default.createElement(LinkView$1, {
        key: label,
        href: href,
        IconComponent: IconComponent,
        label: label,
        onClick: onClick
      });
    } else if (link.type === 'dropdown') {
      var _ref3 = link,
          _IconComponent = _ref3.IconComponent,
          _label = _ref3.label,
          _links = _ref3.links;
      return /*#__PURE__*/React__default.createElement(DropdownView$1, {
        key: _label,
        IconComponent: _IconComponent,
        label: _label,
        links: _links
      });
    }

    return null;
  });
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, linksJsx);
};

var StyledHamburgerSvg = styles.styled(SvgHamburger)(function (_ref) {
  var theme = _ref.theme;
  return {
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    color: theme.palette.secondary.main
  };
});
var StyledDrawer = styles.withStyles(function () {
  return {
    paper: {
      minWidth: '250px'
    }
  };
})(Drawer);

var MobileView = function MobileView(_ref2) {
  var _ref2$anchor = _ref2.anchor,
      anchor = _ref2$anchor === void 0 ? 'right' : _ref2$anchor,
      links = _ref2.links,
      onClose = _ref2.onClose,
      onOpen = _ref2.onOpen,
      open = _ref2.open;

  var _React$useState = React__default.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      uncontrolledOpen = _React$useState2[0],
      setUncontrolledOpen = _React$useState2[1];

  var handleMenuIconClick = function handleMenuIconClick() {
    setUncontrolledOpen(true);

    if (onOpen) {
      onOpen();
    }
  };

  var handleDrawerClose = function handleDrawerClose() {
    setUncontrolledOpen(false);

    if (onClose) {
      onClose();
    }
  };

  var actualOpen = open ? open : uncontrolledOpen;
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(IconButton, {
    onClick: handleMenuIconClick
  }, /*#__PURE__*/React__default.createElement(StyledHamburgerSvg, null)), /*#__PURE__*/React__default.createElement(StyledDrawer, {
    anchor: anchor,
    onClose: handleDrawerClose,
    open: actualOpen
  }, /*#__PURE__*/React__default.createElement(DrawerContentView, {
    links: links
  })));
};

var Nav = function Nav(_ref) {
  var desktopLinks = _ref.desktopLinks,
      mobileAnchor = _ref.mobileAnchor,
      mobileLinks = _ref.mobileLinks,
      mobileOpen = _ref.mobileOpen,
      onMobileOpen = _ref.onMobileOpen,
      onMobileClose = _ref.onMobileClose;
  var theme = styles.useTheme();
  var mdUp = useMediaQuery(theme.breakpoints.up('md'));

  if (mdUp) {
    return /*#__PURE__*/React__default.createElement(DesktopView, {
      links: desktopLinks
    });
  }

  return /*#__PURE__*/React__default.createElement(MobileView, {
    anchor: mobileAnchor,
    links: mobileLinks,
    open: mobileOpen,
    onOpen: onMobileOpen,
    onClose: onMobileClose
  });
};

var HeaderNav = function HeaderNav(_ref) {
  var viewModel = _ref.viewModel;
  return /*#__PURE__*/React__default.createElement(Nav, {
    desktopLinks: viewModel.desktopLinks(),
    mobileLinks: viewModel.mobileLinks()
  });
};

var View = observer$1(HeaderNav);

// This file is a workaround for a bug in web browsers' "native"
// ES6 importing system which is uncapable of importing "*.json" files.
// https://github.com/catamphetamine/libphonenumber-js/issues/239
var metadata = {
  "version": "1.7.51",
  "country_calling_codes": {
    "1": ["US", "AG", "AI", "AS", "BB", "BM", "BS", "CA", "DM", "DO", "GD", "GU", "JM", "KN", "KY", "LC", "MP", "MS", "PR", "SX", "TC", "TT", "VC", "VG", "VI"],
    "7": ["RU", "KZ"],
    "20": ["EG"],
    "27": ["ZA"],
    "30": ["GR"],
    "31": ["NL"],
    "32": ["BE"],
    "33": ["FR"],
    "34": ["ES"],
    "36": ["HU"],
    "39": ["IT", "VA"],
    "40": ["RO"],
    "41": ["CH"],
    "43": ["AT"],
    "44": ["GB", "GG", "IM", "JE"],
    "45": ["DK"],
    "46": ["SE"],
    "47": ["NO", "SJ"],
    "48": ["PL"],
    "49": ["DE"],
    "51": ["PE"],
    "52": ["MX"],
    "53": ["CU"],
    "54": ["AR"],
    "55": ["BR"],
    "56": ["CL"],
    "57": ["CO"],
    "58": ["VE"],
    "60": ["MY"],
    "61": ["AU", "CC", "CX"],
    "62": ["ID"],
    "63": ["PH"],
    "64": ["NZ"],
    "65": ["SG"],
    "66": ["TH"],
    "81": ["JP"],
    "82": ["KR"],
    "84": ["VN"],
    "86": ["CN"],
    "90": ["TR"],
    "91": ["IN"],
    "92": ["PK"],
    "93": ["AF"],
    "94": ["LK"],
    "95": ["MM"],
    "98": ["IR"],
    "211": ["SS"],
    "212": ["MA", "EH"],
    "213": ["DZ"],
    "216": ["TN"],
    "218": ["LY"],
    "220": ["GM"],
    "221": ["SN"],
    "222": ["MR"],
    "223": ["ML"],
    "224": ["GN"],
    "225": ["CI"],
    "226": ["BF"],
    "227": ["NE"],
    "228": ["TG"],
    "229": ["BJ"],
    "230": ["MU"],
    "231": ["LR"],
    "232": ["SL"],
    "233": ["GH"],
    "234": ["NG"],
    "235": ["TD"],
    "236": ["CF"],
    "237": ["CM"],
    "238": ["CV"],
    "239": ["ST"],
    "240": ["GQ"],
    "241": ["GA"],
    "242": ["CG"],
    "243": ["CD"],
    "244": ["AO"],
    "245": ["GW"],
    "246": ["IO"],
    "247": ["AC"],
    "248": ["SC"],
    "249": ["SD"],
    "250": ["RW"],
    "251": ["ET"],
    "252": ["SO"],
    "253": ["DJ"],
    "254": ["KE"],
    "255": ["TZ"],
    "256": ["UG"],
    "257": ["BI"],
    "258": ["MZ"],
    "260": ["ZM"],
    "261": ["MG"],
    "262": ["RE", "YT"],
    "263": ["ZW"],
    "264": ["NA"],
    "265": ["MW"],
    "266": ["LS"],
    "267": ["BW"],
    "268": ["SZ"],
    "269": ["KM"],
    "290": ["SH", "TA"],
    "291": ["ER"],
    "297": ["AW"],
    "298": ["FO"],
    "299": ["GL"],
    "350": ["GI"],
    "351": ["PT"],
    "352": ["LU"],
    "353": ["IE"],
    "354": ["IS"],
    "355": ["AL"],
    "356": ["MT"],
    "357": ["CY"],
    "358": ["FI", "AX"],
    "359": ["BG"],
    "370": ["LT"],
    "371": ["LV"],
    "372": ["EE"],
    "373": ["MD"],
    "374": ["AM"],
    "375": ["BY"],
    "376": ["AD"],
    "377": ["MC"],
    "378": ["SM"],
    "380": ["UA"],
    "381": ["RS"],
    "382": ["ME"],
    "383": ["XK"],
    "385": ["HR"],
    "386": ["SI"],
    "387": ["BA"],
    "389": ["MK"],
    "420": ["CZ"],
    "421": ["SK"],
    "423": ["LI"],
    "500": ["FK"],
    "501": ["BZ"],
    "502": ["GT"],
    "503": ["SV"],
    "504": ["HN"],
    "505": ["NI"],
    "506": ["CR"],
    "507": ["PA"],
    "508": ["PM"],
    "509": ["HT"],
    "590": ["GP", "BL", "MF"],
    "591": ["BO"],
    "592": ["GY"],
    "593": ["EC"],
    "594": ["GF"],
    "595": ["PY"],
    "596": ["MQ"],
    "597": ["SR"],
    "598": ["UY"],
    "599": ["CW", "BQ"],
    "670": ["TL"],
    "672": ["NF"],
    "673": ["BN"],
    "674": ["NR"],
    "675": ["PG"],
    "676": ["TO"],
    "677": ["SB"],
    "678": ["VU"],
    "679": ["FJ"],
    "680": ["PW"],
    "681": ["WF"],
    "682": ["CK"],
    "683": ["NU"],
    "685": ["WS"],
    "686": ["KI"],
    "687": ["NC"],
    "688": ["TV"],
    "689": ["PF"],
    "690": ["TK"],
    "691": ["FM"],
    "692": ["MH"],
    "850": ["KP"],
    "852": ["HK"],
    "853": ["MO"],
    "855": ["KH"],
    "856": ["LA"],
    "880": ["BD"],
    "886": ["TW"],
    "960": ["MV"],
    "961": ["LB"],
    "962": ["JO"],
    "963": ["SY"],
    "964": ["IQ"],
    "965": ["KW"],
    "966": ["SA"],
    "967": ["YE"],
    "968": ["OM"],
    "970": ["PS"],
    "971": ["AE"],
    "972": ["IL"],
    "973": ["BH"],
    "974": ["QA"],
    "975": ["BT"],
    "976": ["MN"],
    "977": ["NP"],
    "992": ["TJ"],
    "993": ["TM"],
    "994": ["AZ"],
    "995": ["GE"],
    "996": ["KG"],
    "998": ["UZ"]
  },
  "countries": {
    "AC": ["247", "00", "(?:[01589]\\d|[46])\\d{4}", [5, 6]],
    "AD": ["376", "00", "(?:1|6\\d)\\d{7}|[135-9]\\d{5}", [6, 8, 9], [["(\\d{3})(\\d{3})", "$1 $2", ["[135-9]"]], ["(\\d{4})(\\d{4})", "$1 $2", ["1"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6"]]]],
    "AE": ["971", "00", "(?:[4-7]\\d|9[0-689])\\d{7}|800\\d{2,9}|[2-4679]\\d{7}", [5, 6, 7, 8, 9, 10, 11, 12], [["(\\d{3})(\\d{2,9})", "$1 $2", ["60|8"]], ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[236]|[479][2-8]"], "0$1"], ["(\\d{3})(\\d)(\\d{5})", "$1 $2 $3", ["[479]"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["5"], "0$1"]], "0"],
    "AF": ["93", "00", "[2-7]\\d{8}", [9], [["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-7]"], "0$1"]], "0"],
    "AG": ["1", "011", "(?:268|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([457]\\d{6})$", "268$1", 0, "268"],
    "AI": ["1", "011", "(?:264|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([2457]\\d{6})$", "264$1", 0, "264"],
    "AL": ["355", "00", "(?:700\\d\\d|900)\\d{3}|8\\d{5,7}|(?:[2-5]|6\\d)\\d{7}", [6, 7, 8, 9], [["(\\d{3})(\\d{3,4})", "$1 $2", ["80|9"], "0$1"], ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["4[2-6]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2358][2-5]|4"], "0$1"], ["(\\d{3})(\\d{5})", "$1 $2", ["[23578]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["6"], "0$1"]], "0"],
    "AM": ["374", "00", "(?:[1-489]\\d|55|60|77)\\d{6}", [8], [["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[89]0"], "0 $1"], ["(\\d{3})(\\d{5})", "$1 $2", ["2|3[12]"], "(0$1)"], ["(\\d{2})(\\d{6})", "$1 $2", ["1|47"], "(0$1)"], ["(\\d{2})(\\d{6})", "$1 $2", ["[3-9]"], "0$1"]], "0"],
    "AO": ["244", "00", "[29]\\d{8}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[29]"]]]],
    "AR": ["54", "00", "11\\d{8}|(?:[2368]|9\\d)\\d{9}", [10, 11], [["(\\d{4})(\\d{2})(\\d{4})", "$1 $2-$3", ["2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9])", "2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8]))|2(?:2[24-9]|3[1-59]|47)", "2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5[56][46]|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]", "2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|58|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|54(?:4|5[13-7]|6[89])|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:454|85[56])[46]|3(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"], "0$1", 1], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2-$3", ["1"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["[68]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2-$3", ["[23]"], "0$1", 1], ["(\\d)(\\d{4})(\\d{2})(\\d{4})", "$2 15-$3-$4", ["9(?:2[2-469]|3[3-578])", "9(?:2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9]))", "9(?:2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8])))|92(?:2[24-9]|3[1-59]|47)", "9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5(?:[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]", "9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|5(?:4(?:4|5[13-7]|6[89])|[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"], "0$1", 0, "$1 $2 $3-$4"], ["(\\d)(\\d{2})(\\d{4})(\\d{4})", "$2 15-$3-$4", ["91"], "0$1", 0, "$1 $2 $3-$4"], ["(\\d)(\\d{3})(\\d{3})(\\d{4})", "$2 15-$3-$4", ["9"], "0$1", 0, "$1 $2 $3-$4"]], "0", 0, "0?(?:(11|2(?:2(?:02?|[13]|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:02?|1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|[67])|4(?:7[3-578]|9)|6(?:[0136]|2[24-6]|4[6-8]?|5[15-8])|80|9(?:0[1-3]|[19]|2\\d|3[1-6]|4[02568]?|5[2-4]|6[2-46]|72?|8[23]?))|3(?:3(?:2[79]|6|8[2578])|4(?:0[0-24-9]|[12]|3[5-8]?|4[24-7]|5[4-68]?|6[02-9]|7[126]|8[2379]?|9[1-36-8])|5(?:1|2[1245]|3[237]?|4[1-46-9]|6[2-4]|7[1-6]|8[2-5]?)|6[24]|7(?:[069]|1[1568]|2[15]|3[145]|4[13]|5[14-8]|7[2-57]|8[126])|8(?:[01]|2[15-7]|3[2578]?|4[13-6]|5[4-8]?|6[1-357-9]|7[36-8]?|8[5-8]?|9[124])))15)?", "9$1"],
    "AS": ["1", "011", "(?:[58]\\d\\d|684|900)\\d{7}", [10], 0, "1", 0, "1|([267]\\d{6})$", "684$1", 0, "684"],
    "AT": ["43", "00", "1\\d{3,12}|2\\d{6,12}|43(?:(?:0\\d|5[02-9])\\d{3,9}|2\\d{4,5}|[3467]\\d{4}|8\\d{4,6}|9\\d{4,7})|5\\d{4,12}|8\\d{7,12}|9\\d{8,12}|(?:[367]\\d|4[0-24-9])\\d{4,11}", [4, 5, 6, 7, 8, 9, 10, 11, 12, 13], [["(\\d)(\\d{3,12})", "$1 $2", ["1(?:11|[2-9])"], "0$1"], ["(\\d{3})(\\d{2})", "$1 $2", ["517"], "0$1"], ["(\\d{2})(\\d{3,5})", "$1 $2", ["5[079]"], "0$1"], ["(\\d{3})(\\d{3,10})", "$1 $2", ["(?:31|4)6|51|6(?:5[0-3579]|[6-9])|7(?:20|32|8)|[89]"], "0$1"], ["(\\d{4})(\\d{3,9})", "$1 $2", ["[2-467]|5[2-6]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["5"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4,7})", "$1 $2 $3", ["5"], "0$1"]], "0"],
    "AU": ["61", "001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011", "1(?:[0-79]\\d{7,8}|8[0-24-9]\\d{7})|(?:[2-478]\\d\\d|550)\\d{6}|1\\d{4,7}", [5, 6, 7, 8, 9, 10], [["(\\d{2})(\\d{3,4})", "$1 $2", ["16"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2,4})", "$1 $2 $3", ["16"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["14|[45]"], "0$1"], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["[2378]"], "(0$1)"], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1(?:30|[89])"]]], "0", 0, "0|(183[12])", 0, 0, 0, [["(?:[237]\\d{5}|8(?:51(?:0(?:0[03-9]|[1247]\\d|3[2-9]|5[0-8]|6[1-9]|8[0-6])|1(?:1[69]|[23]\\d|4[0-4]))|(?:[6-8]\\d{3}|9(?:[02-9]\\d\\d|1(?:[0-57-9]\\d|6[0135-9])))\\d))\\d{3}", [9]], ["4(?:83[0-38]|93[01])\\d{5}|4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[06-9]|7[02-9]|8[0-2457-9]|9[0-27-9])\\d{6}", [9]], ["180(?:0\\d{3}|2)\\d{3}", [7, 10]], ["190[0-26]\\d{6}", [10]], 0, 0, 0, ["16\\d{3,7}", [5, 6, 7, 8, 9]], ["(?:14(?:5(?:1[0458]|[23][458])|71\\d)|550\\d\\d)\\d{4}", [9]], ["13(?:00\\d{3}|45[0-4])\\d{3}|13\\d{4}", [6, 8, 10]]], "0011"],
    "AW": ["297", "00", "(?:[25-79]\\d\\d|800)\\d{4}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[25-9]"]]]],
    "AX": ["358", "00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))", "2\\d{4,9}|35\\d{4,5}|(?:60\\d\\d|800)\\d{4,6}|7\\d{5,11}|(?:[14]\\d|3[0-46-9]|50)\\d{4,8}", [5, 6, 7, 8, 9, 10, 11, 12], 0, "0", 0, 0, 0, 0, "18", 0, "00"],
    "AZ": ["994", "00", "365\\d{6}|(?:[124579]\\d|60|88)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["90"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[28]|2|365|46", "1[28]|2|365|46", "1[28]|2|365(?:[0-46-9]|5[0-35-9])|46"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[13-9]"], "0$1"]], "0"],
    "BA": ["387", "00", "6\\d{8}|(?:[35689]\\d|49|70)\\d{6}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["6[1-3]|[7-9]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2-$3", ["[3-5]|6[56]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["6"], "0$1"]], "0"],
    "BB": ["1", "011", "(?:246|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([2-9]\\d{6})$", "246$1", 0, "246"],
    "BD": ["880", "00", "1\\d{9}|2\\d{7,8}|88\\d{4,6}|(?:8[0-79]|9\\d)\\d{4,8}|(?:[346]\\d|[57])\\d{5,8}", [6, 7, 8, 9, 10], [["(\\d{2})(\\d{4,6})", "$1-$2", ["31[5-8]|[459]1"], "0$1"], ["(\\d{3})(\\d{3,7})", "$1-$2", ["3(?:[67]|8[013-9])|4(?:6[168]|7|[89][18])|5(?:6[128]|9)|6(?:28|4[14]|5)|7[2-589]|8(?:0[014-9]|[12])|9[358]|(?:3[2-5]|4[235]|5[2-578]|6[0389]|76|8[3-7]|9[24])1|(?:44|66)[01346-9]"], "0$1"], ["(\\d{4})(\\d{3,6})", "$1-$2", ["[13-9]"], "0$1"], ["(\\d)(\\d{7,8})", "$1-$2", ["2"], "0$1"]], "0"],
    "BE": ["32", "00", "4\\d{8}|[1-9]\\d{7}", [8, 9], [["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["(?:80|9)0"], "0$1"], ["(\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[239]|4[23]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[15-8]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["4"], "0$1"]], "0"],
    "BF": ["226", "00", "[025-7]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[025-7]"]]]],
    "BG": ["359", "00", "[2-7]\\d{6,7}|[89]\\d{6,8}|2\\d{5}", [6, 7, 8, 9], [["(\\d)(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["2"], "0$1"], ["(\\d{3})(\\d{4})", "$1 $2", ["43[1-6]|70[1-9]"], "0$1"], ["(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["[356]|4[124-7]|7[1-9]|8[1-6]|9[1-7]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["(?:70|8)0"], "0$1"], ["(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3", ["43[1-7]|7"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[48]|9[08]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "0$1"]], "0"],
    "BH": ["973", "00", "[136-9]\\d{7}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[13679]|8[047]"]]]],
    "BI": ["257", "00", "(?:[267]\\d|31)\\d{6}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2367]"]]]],
    "BJ": ["229", "00", "(?:[2689]\\d|51)\\d{6}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[25689]"]]]],
    "BL": ["590", "00", "(?:590|69\\d|976)\\d{6}", [9], 0, "0", 0, 0, 0, 0, 0, [["590(?:2[7-9]|5[12]|87)\\d{4}"], ["69(?:0\\d\\d|1(?:2[29]|3[0-5]))\\d{4}"], 0, 0, 0, 0, 0, 0, ["976[01]\\d{5}"]]],
    "BM": ["1", "011", "(?:441|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([2-8]\\d{6})$", "441$1", 0, "441"],
    "BN": ["673", "00", "[2-578]\\d{6}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-578]"]]]],
    "BO": ["591", "00(?:1\\d)?", "(?:[2-467]\\d\\d|8001)\\d{5}", [8, 9], [["(\\d)(\\d{7})", "$1 $2", ["[23]|4[46]"]], ["(\\d{8})", "$1", ["[67]"]], ["(\\d{3})(\\d{2})(\\d{4})", "$1 $2 $3", ["8"]]], "0", 0, "0(1\\d)?"],
    "BQ": ["599", "00", "(?:[34]1|7\\d)\\d{5}", [7], 0, 0, 0, 0, 0, 0, "[347]"],
    "BR": ["55", "00(?:1[245]|2[1-35]|31|4[13]|[56]5|99)", "(?:[1-46-9]\\d\\d|5(?:[0-46-9]\\d|5[0-24679]))\\d{8}|[1-9]\\d{9}|[3589]\\d{8}|[34]\\d{7}", [8, 9, 10, 11], [["(\\d{4})(\\d{4})", "$1-$2", ["300|4(?:0[02]|37)", "4(?:02|37)0|[34]00"]], ["(\\d{3})(\\d{2,3})(\\d{4})", "$1 $2 $3", ["(?:[358]|90)0"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2-$3", ["(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-57]"], "($1)"], ["(\\d{2})(\\d{5})(\\d{4})", "$1 $2-$3", ["[16][1-9]|[2-57-9]"], "($1)"]], "0", 0, "0(?:(1[245]|2[1-35]|31|4[13]|[56]5|99)(\\d{10,11}))?", "$2"],
    "BS": ["1", "011", "(?:242|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([3-8]\\d{6})$", "242$1", 0, "242"],
    "BT": ["975", "00", "[17]\\d{7}|[2-8]\\d{6}", [7, 8], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-68]|7[246]"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[67]|7"]]]],
    "BW": ["267", "00", "90\\d{5}|(?:[2-6]|7\\d)\\d{6}", [7, 8], [["(\\d{2})(\\d{5})", "$1 $2", ["90"]], ["(\\d{3})(\\d{4})", "$1 $2", ["[2-6]"]], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["7"]]]],
    "BY": ["375", "810", "(?:[12]\\d|33|44|902)\\d{7}|8(?:0[0-79]\\d{5,7}|[1-7]\\d{9})|8(?:1[0-489]|[5-79]\\d)\\d{7}|8[1-79]\\d{6,7}|8[0-79]\\d{5}|8\\d{5}", [6, 7, 8, 9, 10, 11], [["(\\d{3})(\\d{3})", "$1 $2", ["800"], "8 $1"], ["(\\d{3})(\\d{2})(\\d{2,4})", "$1 $2 $3", ["800"], "8 $1"], ["(\\d{4})(\\d{2})(\\d{3})", "$1 $2-$3", ["1(?:5[169]|6[3-5]|7[179])|2(?:1[35]|2[34]|3[3-5])", "1(?:5[169]|6(?:3[1-3]|4|5[125])|7(?:1[3-9]|7[0-24-6]|9[2-7]))|2(?:1[35]|2[34]|3[3-5])"], "8 0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["1(?:[56]|7[467])|2[1-3]"], "8 0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[1-4]"], "8 0$1"], ["(\\d{3})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["[89]"], "8 $1"]], "8", 0, "0|80?", 0, 0, 0, 0, "8~10"],
    "BZ": ["501", "00", "(?:0800\\d|[2-8])\\d{6}", [7, 11], [["(\\d{3})(\\d{4})", "$1-$2", ["[2-8]"]], ["(\\d)(\\d{3})(\\d{4})(\\d{3})", "$1-$2-$3-$4", ["0"]]]],
    "CA": ["1", "011", "(?:[2-8]\\d|90)\\d{8}", [10], 0, "1", 0, 0, 0, 0, 0, [["(?:2(?:04|[23]6|[48]9|50)|3(?:06|43|6[57])|4(?:03|1[68]|3[178]|50)|5(?:06|1[49]|48|79|8[17])|6(?:04|13|39|47|72)|7(?:0[59]|78|8[02])|8(?:[06]7|19|25|73)|90[25])[2-9]\\d{6}"], [""], ["8(?:00|33|44|55|66|77|88)[2-9]\\d{6}"], ["900[2-9]\\d{6}"], ["52(?:35(?:[02-46-9]\\d|1[02-9]|5[0-46-9])|45(?:[034]\\d|1[02-9]|2[024-9]|5[0-46-9]))\\d{4}|52(?:3[2-46-9]|4[2-4])(?:[02-9]\\d|1[02-9])\\d{4}|(?:5(?:00|2[12]|33|44|66|77|88)|622)[2-9]\\d{6}"], 0, 0, 0, ["600[2-9]\\d{6}"]]],
    "CC": ["61", "001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011", "1(?:[0-79]\\d|8[0-24-9])\\d{7}|(?:[148]\\d\\d|550)\\d{6}|1\\d{5,7}", [6, 7, 8, 9, 10], 0, "0", 0, "0|([59]\\d{7})$", "8$1", 0, 0, [["8(?:51(?:0(?:02|31|60)|118)|91(?:0(?:1[0-2]|29)|1(?:[28]2|50|79)|2(?:10|64)|3(?:[06]8|22)|4[29]8|62\\d|70[23]|959))\\d{3}", [9]], ["4(?:83[0-38]|93[01])\\d{5}|4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[06-9]|7[02-9]|8[0-2457-9]|9[0-27-9])\\d{6}", [9]], ["180(?:0\\d{3}|2)\\d{3}", [7, 10]], ["190[0-26]\\d{6}", [10]], 0, 0, 0, 0, ["(?:14(?:5(?:1[0458]|[23][458])|71\\d)|550\\d\\d)\\d{4}", [9]], ["13(?:00\\d{3}|45[0-4])\\d{3}|13\\d{4}", [6, 8, 10]]], "0011"],
    "CD": ["243", "00", "[189]\\d{8}|[1-68]\\d{6}", [7, 9], [["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["88"], "0$1"], ["(\\d{2})(\\d{5})", "$1 $2", ["[1-6]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[89]"], "0$1"]], "0"],
    "CF": ["236", "00", "(?:[27]\\d{3}|8776)\\d{4}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[278]"]]]],
    "CG": ["242", "00", "222\\d{6}|(?:0\\d|80)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["801"]], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["8"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[02]"]]]],
    "CH": ["41", "00", "8\\d{11}|[2-9]\\d{8}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8[047]|90"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-79]|81"], "0$1"], ["(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["8"], "0$1"]], "0"],
    "CI": ["225", "00", "[02-9]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[02-9]"]]]],
    "CK": ["682", "00", "[2-578]\\d{4}", [5], [["(\\d{2})(\\d{3})", "$1 $2", ["[2-578]"]]]],
    "CL": ["56", "(?:0|1(?:1[0-69]|2[02-5]|5[13-58]|69|7[0167]|8[018]))0", "12300\\d{6}|6\\d{9,10}|[2-9]\\d{8}", [9, 10, 11], [["(\\d{5})(\\d{4})", "$1 $2", ["219", "2196"], "($1)"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["44"]], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2[1-3]"], "($1)"], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["9[2-9]"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["3[2-5]|[47]|5[1-3578]|6[13-57]|8(?:0[1-9]|[1-9])"], "($1)"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["60|8"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]], ["(\\d{3})(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["60"]]]],
    "CM": ["237", "00", "(?:[26]\\d\\d|88)\\d{6}", [8, 9], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["88"]], ["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["[26]"]]]],
    "CN": ["86", "00|1(?:[12]\\d|79)\\d\\d00", "1[127]\\d{8,9}|2\\d{9}(?:\\d{2})?|[12]\\d{6,7}|86\\d{6}|(?:1[03-689]\\d|6)\\d{7,9}|(?:[3-579]\\d|8[0-57-9])\\d{6,9}", [7, 8, 9, 10, 11, 12], [["(\\d{2})(\\d{5,6})", "$1 $2", ["(?:10|2[0-57-9])[19]", "(?:10|2[0-57-9])(?:10|9[56])", "(?:10|2[0-57-9])(?:100|9[56])"], "0$1"], ["(\\d{3})(\\d{5,6})", "$1 $2", ["3(?:[157]|35|49|9[1-68])|4(?:[17]|2[179]|6[47-9]|8[23])|5(?:[1357]|2[37]|4[36]|6[1-46]|80)|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])|(?:4[35]|59|85)[1-9]", "(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))[19]", "85[23](?:10|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:10|9[56])", "85[23](?:100|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:100|9[56])"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["(?:4|80)0"]], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["10|2(?:[02-57-9]|1[1-9])", "10|2(?:[02-57-9]|1[1-9])", "10[0-79]|2(?:[02-57-9]|1[1-79])|(?:10|21)8(?:0[1-9]|[1-9])"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["3(?:[3-59]|7[02-68])|4(?:[26-8]|3[3-9]|5[2-9])|5(?:3[03-9]|[468]|7[028]|9[2-46-9])|6|7(?:[0-247]|3[04-9]|5[0-4689]|6[2368])|8(?:[1-358]|9[1-7])|9(?:[013479]|5[1-5])|(?:[34]1|55|79|87)[02-9]"], "0$1", 1], ["(\\d{3})(\\d{7,8})", "$1 $2", ["9"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["80"], "0$1", 1], ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["[3-578]"], "0$1", 1], ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["1[3-9]"]], ["(\\d{2})(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["[12]"], "0$1", 1]], "0", 0, "0|(1(?:[12]\\d|79)\\d\\d)", 0, 0, 0, 0, "00"],
    "CO": ["57", "00(?:4(?:[14]4|56)|[579])", "(?:1\\d|3)\\d{9}|[124-8]\\d{7}", [8, 10, 11], [["(\\d)(\\d{7})", "$1 $2", ["[14][2-9]|[25-8]"], "($1)"], ["(\\d{3})(\\d{7})", "$1 $2", ["3"]], ["(\\d)(\\d{3})(\\d{7})", "$1-$2-$3", ["1"], "0$1", 0, "$1 $2 $3"]], "0", 0, "0([3579]|4(?:[14]4|56))?"],
    "CR": ["506", "00", "(?:8\\d|90)\\d{8}|(?:[24-8]\\d{3}|3005)\\d{4}", [8, 10], [["(\\d{4})(\\d{4})", "$1 $2", ["[2-7]|8[3-9]"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["[89]"]]], 0, 0, "(19(?:0[0-2468]|1[09]|20|66|77|99))"],
    "CU": ["53", "119", "[27]\\d{6,7}|[34]\\d{5,7}|(?:5|8\\d\\d)\\d{7}", [6, 7, 8, 10], [["(\\d{2})(\\d{4,6})", "$1 $2", ["2[1-4]|[34]"], "(0$1)"], ["(\\d)(\\d{6,7})", "$1 $2", ["7"], "(0$1)"], ["(\\d)(\\d{7})", "$1 $2", ["5"], "0$1"], ["(\\d{3})(\\d{7})", "$1 $2", ["8"], "0$1"]], "0"],
    "CV": ["238", "0", "(?:[2-59]\\d\\d|800)\\d{4}", [7], [["(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[2-589]"]]]],
    "CW": ["599", "00", "(?:[34]1|60|(?:7|9\\d)\\d)\\d{5}", [7, 8], [["(\\d{3})(\\d{4})", "$1 $2", ["[3467]"]], ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["9[4-8]"]]], 0, 0, 0, 0, 0, "[69]"],
    "CX": ["61", "001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011", "1(?:[0-79]\\d|8[0-24-9])\\d{7}|(?:[148]\\d\\d|550)\\d{6}|1\\d{5,7}", [6, 7, 8, 9, 10], 0, "0", 0, "0|([59]\\d{7})$", "8$1", 0, 0, [["8(?:51(?:0(?:01|30|59)|117)|91(?:00[6-9]|1(?:[28]1|49|78)|2(?:09|63)|3(?:12|26|75)|4(?:56|97)|64\\d|7(?:0[01]|1[0-2])|958))\\d{3}", [9]], ["4(?:83[0-38]|93[01])\\d{5}|4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[06-9]|7[02-9]|8[0-2457-9]|9[0-27-9])\\d{6}", [9]], ["180(?:0\\d{3}|2)\\d{3}", [7, 10]], ["190[0-26]\\d{6}", [10]], 0, 0, 0, 0, ["(?:14(?:5(?:1[0458]|[23][458])|71\\d)|550\\d\\d)\\d{4}", [9]], ["13(?:00\\d{3}|45[0-4])\\d{3}|13\\d{4}", [6, 8, 10]]], "0011"],
    "CY": ["357", "00", "(?:[279]\\d|[58]0)\\d{6}", [8], [["(\\d{2})(\\d{6})", "$1 $2", ["[257-9]"]]]],
    "CZ": ["420", "00", "(?:[2-578]\\d|60)\\d{7}|9\\d{8,11}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-8]|9[015-7]"]], ["(\\d{2})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9"]], ["(\\d{3})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9"]]]],
    "DE": ["49", "00", "[2579]\\d{5,14}|49(?:[05]\\d{10}|[46][1-8]\\d{4,9})|49(?:[0-25]\\d|3[1-689]|7[1-7])\\d{4,8}|49(?:[0-2579]\\d|[34][1-9]|6[0-8])\\d{3}|49\\d{3,4}|(?:1|[368]\\d|4[0-8])\\d{3,13}", [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], [["(\\d{2})(\\d{3,13})", "$1 $2", ["3[02]|40|[68]9"], "0$1"], ["(\\d{3})(\\d{3,12})", "$1 $2", ["2(?:0[1-389]|1[124]|2[18]|3[14])|3(?:[35-9][15]|4[015])|906|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1", "2(?:0[1-389]|12[0-8])|3(?:[35-9][15]|4[015])|906|2(?:[13][14]|2[18])|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1"], "0$1"], ["(\\d{4})(\\d{2,11})", "$1 $2", ["[24-6]|3(?:[3569][02-46-9]|4[2-4679]|7[2-467]|8[2-46-8])|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]", "[24-6]|3(?:3(?:0[1-467]|2[127-9]|3[124578]|7[1257-9]|8[1256]|9[145])|4(?:2[135]|4[13578]|9[1346])|5(?:0[14]|2[1-3589]|6[1-4]|7[13468]|8[13568])|6(?:2[1-489]|3[124-6]|6[13]|7[12579]|8[1-356]|9[135])|7(?:2[1-7]|4[145]|6[1-5]|7[1-4])|8(?:21|3[1468]|6|7[1467]|8[136])|9(?:0[12479]|2[1358]|4[134679]|6[1-9]|7[136]|8[147]|9[1468]))|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]|3[68]4[1347]|3(?:47|60)[1356]|3(?:3[46]|46|5[49])[1246]|3[4579]3[1357]"], "0$1"], ["(\\d{3})(\\d{4})", "$1 $2", ["138"], "0$1"], ["(\\d{5})(\\d{2,10})", "$1 $2", ["3"], "0$1"], ["(\\d{3})(\\d{5,11})", "$1 $2", ["181"], "0$1"], ["(\\d{3})(\\d)(\\d{4,10})", "$1 $2 $3", ["1(?:3|80)|9"], "0$1"], ["(\\d{3})(\\d{7,8})", "$1 $2", ["1[67]"], "0$1"], ["(\\d{3})(\\d{7,12})", "$1 $2", ["8"], "0$1"], ["(\\d{5})(\\d{6})", "$1 $2", ["185", "1850", "18500"], "0$1"], ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["7"], "0$1"], ["(\\d{4})(\\d{7})", "$1 $2", ["18[68]"], "0$1"], ["(\\d{5})(\\d{6})", "$1 $2", ["15[0568]"], "0$1"], ["(\\d{4})(\\d{7})", "$1 $2", ["15[1279]"], "0$1"], ["(\\d{3})(\\d{8})", "$1 $2", ["18"], "0$1"], ["(\\d{3})(\\d{2})(\\d{7,8})", "$1 $2 $3", ["1(?:6[023]|7)"], "0$1"], ["(\\d{4})(\\d{2})(\\d{7})", "$1 $2 $3", ["15[279]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{8})", "$1 $2 $3", ["15"], "0$1"]], "0"],
    "DJ": ["253", "00", "(?:2\\d|77)\\d{6}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[27]"]]]],
    "DK": ["45", "00", "[2-9]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-9]"]]]],
    "DM": ["1", "011", "(?:[58]\\d\\d|767|900)\\d{7}", [10], 0, "1", 0, "1|([2-7]\\d{6})$", "767$1", 0, "767"],
    "DO": ["1", "011", "(?:[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, 0, 0, 0, "8[024]9"],
    "DZ": ["213", "00", "(?:[1-4]|[5-79]\\d|80)\\d{7}", [8, 9], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[1-4]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["9"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-8]"], "0$1"]], "0"],
    "EC": ["593", "00", "1\\d{9,10}|(?:[2-7]|9\\d)\\d{7}", [8, 9, 10, 11], [["(\\d)(\\d{3})(\\d{4})", "$1 $2-$3", ["[2-7]"], "(0$1)", 0, "$1-$2-$3"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["9"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1"]]], "0"],
    "EE": ["372", "00", "8\\d{9}|[4578]\\d{7}|(?:[3-8]\\d|90)\\d{5}", [7, 8, 10], [["(\\d{3})(\\d{4})", "$1 $2", ["[369]|4[3-8]|5(?:[0-2]|5[0-478]|6[45])|7[1-9]|88", "[369]|4[3-8]|5(?:[02]|1(?:[0-8]|95)|5[0-478]|6(?:4[0-4]|5[1-589]))|7[1-9]|88"]], ["(\\d{4})(\\d{3,4})", "$1 $2", ["[45]|8(?:00|[1-49])", "[45]|8(?:00[1-9]|[1-49])"]], ["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["7"]], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]]]],
    "EG": ["20", "00", "[189]\\d{8,9}|[24-6]\\d{8}|[135]\\d{7}", [8, 9, 10], [["(\\d)(\\d{7,8})", "$1 $2", ["[23]"], "0$1"], ["(\\d{2})(\\d{6,7})", "$1 $2", ["1[35]|[4-6]|8[2468]|9[235-7]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[189]"], "0$1"]], "0"],
    "EH": ["212", "00", "[5-8]\\d{8}", [9], 0, "0", 0, 0, 0, 0, "528[89]"],
    "ER": ["291", "00", "[178]\\d{6}", [7], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[178]"], "0$1"]], "0"],
    "ES": ["34", "00", "(?:51|[6-9]\\d)\\d{7}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[89]00"]], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-9]"]]]],
    "ET": ["251", "00", "(?:11|[2-59]\\d)\\d{7}", [9], [["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-59]"], "0$1"]], "0"],
    "FI": ["358", "00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))", "[1-35689]\\d{4}|7\\d{10,11}|(?:[124-7]\\d|3[0-46-9])\\d{8}|[1-9]\\d{5,8}", [5, 6, 7, 8, 9, 10, 11, 12], [["(\\d)(\\d{4,9})", "$1 $2", ["[2568][1-8]|3(?:0[1-9]|[1-9])|9"], "0$1"], ["(\\d{3})(\\d{3,7})", "$1 $2", ["[12]00|[368]|70[07-9]"], "0$1"], ["(\\d{2})(\\d{4,8})", "$1 $2", ["[1245]|7[135]"], "0$1"], ["(\\d{2})(\\d{6,10})", "$1 $2", ["7"], "0$1"]], "0", 0, 0, 0, 0, "1[03-79]|[2-9]", 0, "00"],
    "FJ": ["679", "0(?:0|52)", "45\\d{5}|(?:0800\\d|[235-9])\\d{6}", [7, 11], [["(\\d{3})(\\d{4})", "$1 $2", ["[235-9]|45"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["0"]]], 0, 0, 0, 0, 0, 0, 0, "00"],
    "FK": ["500", "00", "[2-7]\\d{4}", [5]],
    "FM": ["691", "00", "(?:[39]\\d\\d|820)\\d{4}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[389]"]]]],
    "FO": ["298", "00", "(?:[2-8]\\d|90)\\d{4}", [6], [["(\\d{6})", "$1", ["[2-9]"]]], 0, 0, "(10(?:01|[12]0|88))"],
    "FR": ["33", "00", "[1-9]\\d{8}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0 $1"], ["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["[1-79]"], "0$1"]], "0"],
    "GA": ["241", "00", "(?:[067]\\d|11)\\d{6}|[2-7]\\d{6}", [7, 8], [["(\\d)(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-7]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["11|[67]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["0"]]], 0, 0, "0(11\\d{6}|6[256]\\d{6}|7[47]\\d{6})", "$1"],
    "GB": ["44", "00", "[1-357-9]\\d{9}|[18]\\d{8}|8\\d{6}", [7, 9, 10], [["(\\d{3})(\\d{4})", "$1 $2", ["800", "8001", "80011", "800111", "8001111"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["845", "8454", "84546", "845464"], "0$1"], ["(\\d{3})(\\d{6})", "$1 $2", ["800"], "0$1"], ["(\\d{5})(\\d{4,5})", "$1 $2", ["1(?:38|5[23]|69|76|94)", "1(?:(?:38|69)7|5(?:24|39)|768|946)", "1(?:3873|5(?:242|39[4-6])|(?:697|768)[347]|9467)"], "0$1"], ["(\\d{4})(\\d{5,6})", "$1 $2", ["1(?:[2-69][02-9]|[78])"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["[25]|7(?:0|6[02-9])", "[25]|7(?:0|6(?:[03-9]|2[356]))"], "0$1"], ["(\\d{4})(\\d{6})", "$1 $2", ["7"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1389]"], "0$1"]], "0", 0, 0, 0, 0, 0, [["(?:1(?:1(?:3(?:[0-58]\\d\\d|73[03])|(?:4[0-5]|5[0-26-9]|6[0-4]|[78][0-49])\\d\\d)|2(?:(?:0[024-9]|2[3-9]|3[3-79]|4[1-689]|[58][02-9]|6[0-47-9]|7[013-9]|9\\d)\\d\\d|1(?:[0-7]\\d\\d|8(?:0\\d|20)))|(?:3(?:0\\d|1[0-8]|[25][02-9]|3[02-579]|[468][0-46-9]|7[1-35-79]|9[2-578])|4(?:0[03-9]|[137]\\d|[28][02-57-9]|4[02-69]|5[0-8]|[69][0-79])|5(?:0[1-35-9]|[16]\\d|2[024-9]|3[015689]|4[02-9]|5[03-9]|7[0-35-9]|8[0-468]|9[0-57-9])|6(?:0[034689]|1\\d|2[0-35689]|[38][013-9]|4[1-467]|5[0-69]|6[13-9]|7[0-8]|9[0-24578])|7(?:0[0246-9]|2\\d|3[0236-8]|4[03-9]|5[0-46-9]|6[013-9]|7[0-35-9]|8[024-9]|9[02-9])|8(?:0[35-9]|2[1-57-9]|3[02-578]|4[0-578]|5[124-9]|6[2-69]|7\\d|8[02-9]|9[02569])|9(?:0[02-589]|[18]\\d|2[02-689]|3[1-57-9]|4[2-9]|5[0-579]|6[2-47-9]|7[0-24578]|9[2-57]))\\d\\d)|2(?:0[013478]|3[0189]|4[017]|8[0-46-9]|9[0-2])\\d{3})\\d{4}|1(?:2(?:0(?:46[1-4]|87[2-9])|545[1-79]|76(?:2\\d|3[1-8]|6[1-6])|9(?:7(?:2[0-4]|3[2-5])|8(?:2[2-8]|7[0-47-9]|8[3-5])))|3(?:6(?:38[2-5]|47[23])|8(?:47[04-9]|64[0157-9]))|4(?:044[1-7]|20(?:2[23]|8\\d)|6(?:0(?:30|5[2-57]|6[1-8]|7[2-8])|140)|8(?:052|87[1-3]))|5(?:2(?:4(?:3[2-79]|6\\d)|76\\d)|6(?:26[06-9]|686))|6(?:06(?:4\\d|7[4-79])|295[5-7]|35[34]\\d|47(?:24|61)|59(?:5[08]|6[67]|74)|9(?:55[0-4]|77[23]))|7(?:26(?:6[13-9]|7[0-7])|(?:442|688)\\d|50(?:2[0-3]|[3-68]2|76))|8(?:27[56]\\d|37(?:5[2-5]|8[239])|843[2-58])|9(?:0(?:0(?:6[1-8]|85)|52\\d)|3583|4(?:66[1-8]|9(?:2[01]|81))|63(?:23|3[1-4])|9561))\\d{3}", [9, 10]], ["7(?:457[0-57-9]|700[01]|911[028])\\d{5}|7(?:[1-3]\\d\\d|4(?:[0-46-9]\\d|5[0-689])|5(?:0[0-8]|[13-9]\\d|2[0-35-9])|7(?:0[1-9]|[1-7]\\d|8[02-9]|9[0-689])|8(?:[014-9]\\d|[23][0-8])|9(?:[024-9]\\d|1[02-9]|3[0-689]))\\d{6}", [10]], ["80[08]\\d{7}|800\\d{6}|8001111"], ["(?:8(?:4[2-5]|7[0-3])|9(?:[01]\\d|8[2-49]))\\d{7}|845464\\d", [7, 10]], ["70\\d{8}", [10]], 0, ["(?:3[0347]|55)\\d{8}", [10]], ["76(?:0[0-2]|2[356]|34|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}", [10]], ["56\\d{8}", [10]]], 0, " x"],
    "GD": ["1", "011", "(?:473|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([2-9]\\d{6})$", "473$1", 0, "473"],
    "GE": ["995", "00", "(?:[3-57]\\d\\d|800)\\d{6}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["70"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["32"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[57]"]], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[348]"], "0$1"]], "0"],
    "GF": ["594", "00", "(?:[56]94|976)\\d{6}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[569]"], "0$1"]], "0"],
    "GG": ["44", "00", "(?:1481|[357-9]\\d{3})\\d{6}|8\\d{6}(?:\\d{2})?", [7, 9, 10], 0, "0", 0, "0|([25-9]\\d{5})$", "1481$1", 0, 0, [["1481[25-9]\\d{5}", [10]], ["7(?:(?:781|839)\\d|911[17])\\d{5}", [10]], ["80[08]\\d{7}|800\\d{6}|8001111"], ["(?:8(?:4[2-5]|7[0-3])|9(?:[01]\\d|8[0-3]))\\d{7}|845464\\d", [7, 10]], ["70\\d{8}", [10]], 0, ["(?:3[0347]|55)\\d{8}", [10]], ["76(?:0[0-2]|2[356]|34|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}", [10]], ["56\\d{8}", [10]]]],
    "GH": ["233", "00", "(?:[235]\\d{3}|800)\\d{5}", [8, 9], [["(\\d{3})(\\d{5})", "$1 $2", ["8"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[235]"], "0$1"]], "0"],
    "GI": ["350", "00", "[256]\\d{7}", [8], [["(\\d{3})(\\d{5})", "$1 $2", ["2"]]]],
    "GL": ["299", "00", "(?:19|[2-689]\\d)\\d{4}", [6], [["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["19|[2-689]"]]]],
    "GM": ["220", "00", "[2-9]\\d{6}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-9]"]]]],
    "GN": ["224", "00", "722\\d{6}|(?:3|6\\d)\\d{7}", [8, 9], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["3"]], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[67]"]]]],
    "GP": ["590", "00", "(?:590|69\\d|976)\\d{6}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[569]"], "0$1"]], "0", 0, 0, 0, 0, 0, [["590(?:0[1-68]|1[0-2]|2[0-68]|3[1289]|4[0-24-9]|5[3-579]|6[0189]|7[08]|8[0-689]|9\\d)\\d{4}"], ["69(?:0\\d\\d|1(?:2[29]|3[0-5]))\\d{4}"], 0, 0, 0, 0, 0, 0, ["976[01]\\d{5}"]]],
    "GQ": ["240", "00", "222\\d{6}|(?:3\\d|55|[89]0)\\d{7}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[235]"]], ["(\\d{3})(\\d{6})", "$1 $2", ["[89]"]]]],
    "GR": ["30", "00", "5005000\\d{3}|(?:[2689]\\d|70)\\d{8}", [10], [["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["21|7"]], ["(\\d{4})(\\d{6})", "$1 $2", ["2(?:2|3[2-57-9]|4[2-469]|5[2-59]|6[2-9]|7[2-69]|8[2-49])|5"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2689]"]]]],
    "GT": ["502", "00", "(?:1\\d{3}|[2-7])\\d{7}", [8, 11], [["(\\d{4})(\\d{4})", "$1 $2", ["[2-7]"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]]]],
    "GU": ["1", "011", "(?:[58]\\d\\d|671|900)\\d{7}", [10], 0, "1", 0, "1|([3-9]\\d{6})$", "671$1", 0, "671"],
    "GW": ["245", "00", "[49]\\d{8}|4\\d{6}", [7, 9], [["(\\d{3})(\\d{4})", "$1 $2", ["40"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[49]"]]]],
    "GY": ["592", "001", "(?:862\\d|9008)\\d{3}|(?:[2-46]\\d|77)\\d{5}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-46-9]"]]]],
    "HK": ["852", "00(?:30|5[09]|[126-9]?)", "8[0-46-9]\\d{6,7}|9\\d{4}(?:\\d(?:\\d(?:\\d{4})?)?)?|(?:[235-79]\\d|46)\\d{6}", [5, 6, 7, 8, 9, 11], [["(\\d{3})(\\d{2,5})", "$1 $2", ["900", "9003"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[2-7]|8[1-4]|9(?:0[1-9]|[1-8])"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]], ["(\\d{3})(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9"]]], 0, 0, 0, 0, 0, 0, 0, "00"],
    "HN": ["504", "00", "8\\d{10}|[237-9]\\d{7}", [8, 11], [["(\\d{4})(\\d{4})", "$1-$2", ["[237-9]"]]]],
    "HR": ["385", "00", "(?:[24-69]\\d|3[0-79])\\d{7}|80\\d{5,7}|[1-79]\\d{7}|6\\d{5,6}", [6, 7, 8, 9], [["(\\d{2})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["6[01]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["8"], "0$1"], ["(\\d)(\\d{4})(\\d{3})", "$1 $2 $3", ["1"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[67]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["9"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-5]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"], "0$1"]], "0"],
    "HT": ["509", "00", "[2-489]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["[2-489]"]]]],
    "HU": ["36", "00", "[2357]\\d{8}|[1-9]\\d{7}", [8, 9], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "(06 $1)"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[27][2-9]|3[2-7]|4[24-9]|5[2-79]|6|8[2-57-9]|9[2-69]"], "(06 $1)"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-57-9]"], "06 $1"]], "06"],
    "ID": ["62", "00[189]", "(?:(?:007803|8\\d{4})\\d|[1-36])\\d{6}|[1-9]\\d{8,10}|[2-9]\\d{7}", [7, 8, 9, 10, 11, 12, 13], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["15"]], ["(\\d{2})(\\d{5,9})", "$1 $2", ["2[124]|[36]1"], "(0$1)"], ["(\\d{3})(\\d{5,7})", "$1 $2", ["800"], "0$1"], ["(\\d{3})(\\d{5,8})", "$1 $2", ["[2-79]"], "(0$1)"], ["(\\d{3})(\\d{3,4})(\\d{3})", "$1-$2-$3", ["8[1-35-9]"], "0$1"], ["(\\d{3})(\\d{6,8})", "$1 $2", ["1"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["804"], "0$1"], ["(\\d{3})(\\d)(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["80"], "0$1"], ["(\\d{3})(\\d{4})(\\d{4,5})", "$1-$2-$3", ["8"], "0$1"]], "0"],
    "IE": ["353", "00", "(?:1\\d|[2569])\\d{6,8}|4\\d{6,9}|7\\d{8}|8\\d{8,9}", [7, 8, 9, 10], [["(\\d{2})(\\d{5})", "$1 $2", ["2[24-9]|47|58|6[237-9]|9[35-9]"], "(0$1)"], ["(\\d{3})(\\d{5})", "$1 $2", ["[45]0"], "(0$1)"], ["(\\d)(\\d{3,4})(\\d{4})", "$1 $2 $3", ["1"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2569]|4[1-69]|7[14]"], "(0$1)"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["70"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["81"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[78]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["4"], "(0$1)"], ["(\\d{2})(\\d)(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["8"], "0$1"]], "0"],
    "IL": ["972", "0(?:0|1[2-9])", "1\\d{6}(?:\\d{3,5})?|[57]\\d{8}|[1-489]\\d{7}", [7, 8, 9, 10, 11, 12], [["(\\d{4})(\\d{3})", "$1-$2", ["125"]], ["(\\d{4})(\\d{2})(\\d{2})", "$1-$2-$3", ["121"]], ["(\\d)(\\d{3})(\\d{4})", "$1-$2-$3", ["[2-489]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["[57]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3})", "$1-$2-$3", ["12"]], ["(\\d{4})(\\d{6})", "$1-$2", ["159"]], ["(\\d)(\\d{3})(\\d{3})(\\d{3})", "$1-$2-$3-$4", ["1[7-9]"]], ["(\\d{3})(\\d{1,2})(\\d{3})(\\d{4})", "$1-$2 $3-$4", ["15"]]], "0"],
    "IM": ["44", "00", "1624\\d{6}|(?:[3578]\\d|90)\\d{8}", [10], 0, "0", 0, "0|([5-8]\\d{5})$", "1624$1", 0, "74576|(?:16|7[56])24"],
    "IN": ["91", "00", "(?:000800|[2-9]\\d\\d)\\d{7}|1\\d{7,12}", [8, 9, 10, 11, 12, 13], [["(\\d{8})", "$1", ["5(?:0|2[23]|3[03]|[67]1|88)", "5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|888)", "5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|8888)"], 0, 1], ["(\\d{4})(\\d{4,5})", "$1 $2", ["180", "1800"], 0, 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["140"], 0, 1], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["11|2[02]|33|4[04]|79[1-7]|80[2-46]", "11|2[02]|33|4[04]|79(?:[1-6]|7[19])|80(?:[2-4]|6[0-589])", "11|2[02]|33|4[04]|79(?:[124-6]|3(?:[02-9]|1[0-24-9])|7(?:1|9[1-6]))|80(?:[2-4]|6[0-589])"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["1(?:2[0-249]|3[0-25]|4[145]|[68]|7[1257])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|5[12]|[78]1)|6(?:12|[2-4]1|5[17]|6[13]|80)|7(?:12|3[134]|4[47]|61|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91)|(?:43|59|75)[15]|(?:1[59]|29|67|72)[14]", "1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|674|7(?:(?:2[14]|3[34]|5[15])[2-6]|61[346]|88[0-8])|8(?:70[2-6]|84[235-7]|91[3-7])|(?:1(?:29|60|8[06])|261|552|6(?:12|[2-47]1|5[17]|6[13]|80)|7(?:12|31|4[47])|8(?:16|2[014]|3[126]|6[136]|7[78]|83))[2-7]", "1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|6(?:12(?:[2-6]|7[0-8])|74[2-7])|7(?:(?:2[14]|5[15])[2-6]|3171|61[346]|88(?:[2-7]|82))|8(?:70[2-6]|84(?:[2356]|7[19])|91(?:[3-6]|7[19]))|73[134][2-6]|(?:74[47]|8(?:16|2[014]|3[126]|6[136]|7[78]|83))(?:[2-6]|7[19])|(?:1(?:29|60|8[06])|261|552|6(?:[2-4]1|5[17]|6[13]|7(?:1|4[0189])|80)|7(?:12|88[01]))[2-7]"], "0$1", 1], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2[2457-9]|3[2-5]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1[013-9]|28|3[129]|4[1-35689]|5[29]|6[02-5]|70)|807", "1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2(?:[2457]|84|95)|3(?:[2-4]|55)|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1(?:[013-8]|9[6-9])|28[6-8]|3(?:17|2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4|5[0-367])|70[13-7])|807[19]", "1(?:[2-479]|5(?:[0236-9]|5[013-9]))|[2-5]|6(?:2(?:84|95)|355|83)|73179|807(?:1|9[1-3])|(?:1552|6(?:1[1358]|2[2457]|3[2-4]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[124-6])\\d|7(?:1(?:[013-8]\\d|9[6-9])|28[6-8]|3(?:2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]\\d|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4\\d|5[0-367])|70[13-7]))[2-7]"], "0$1", 1], ["(\\d{5})(\\d{5})", "$1 $2", ["[6-9]"], "0$1", 1], ["(\\d{4})(\\d{2,4})(\\d{4})", "$1 $2 $3", ["1(?:6|8[06])", "1(?:6|8[06]0)"], 0, 1], ["(\\d{4})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["18"], 0, 1]], "0"],
    "IO": ["246", "00", "3\\d{6}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["3"]]]],
    "IQ": ["964", "00", "(?:1|7\\d\\d)\\d{7}|[2-6]\\d{7,8}", [8, 9, 10], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-6]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"]], "0"],
    "IR": ["98", "00", "[1-9]\\d{9}|(?:[1-8]\\d\\d|9)\\d{3,4}", [4, 5, 6, 7, 10], [["(\\d{4,5})", "$1", ["96"], "0$1"], ["(\\d{2})(\\d{4,5})", "$1 $2", ["(?:1[137]|2[13-68]|3[1458]|4[145]|5[1468]|6[16]|7[1467]|8[13467])[12689]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["9"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["[1-8]"], "0$1"]], "0"],
    "IS": ["354", "00|1(?:0(?:01|[12]0)|100)", "(?:38\\d|[4-9])\\d{6}", [7, 9], [["(\\d{3})(\\d{4})", "$1 $2", ["[4-9]"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["3"]]], 0, 0, 0, 0, 0, 0, 0, "00"],
    "IT": ["39", "00", "0\\d{5,10}|3[0-8]\\d{7,10}|55\\d{8}|8\\d{5}(?:\\d{2,4})?|(?:1\\d|39)\\d{7,8}", [6, 7, 8, 9, 10, 11], [["(\\d{2})(\\d{4,6})", "$1 $2", ["0[26]"]], ["(\\d{3})(\\d{3,6})", "$1 $2", ["0[13-57-9][0159]|8(?:03|4[17]|9[245])", "0[13-57-9][0159]|8(?:03|4[17]|9(?:2|[45][0-4]))"]], ["(\\d{4})(\\d{2,6})", "$1 $2", ["0(?:[13-579][2-46-8]|8[236-8])"]], ["(\\d{4})(\\d{4})", "$1 $2", ["894"]], ["(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["0[26]|5"]], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1[4679]|[38]"]], ["(\\d{3})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["0[13-57-9][0159]"]], ["(\\d{2})(\\d{4})(\\d{5})", "$1 $2 $3", ["0[26]"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["0"]], ["(\\d{3})(\\d{4})(\\d{4,5})", "$1 $2 $3", ["3"]]], 0, 0, 0, 0, 0, 0, [["0669[0-79]\\d{1,6}|0(?:1(?:[0159]\\d|[27][1-5]|31|4[1-4]|6[1356]|8[2-57])|2\\d\\d|3(?:[0159]\\d|2[1-4]|3[12]|[48][1-6]|6[2-59]|7[1-7])|4(?:[0159]\\d|[23][1-9]|4[245]|6[1-5]|7[1-4]|81)|5(?:[0159]\\d|2[1-5]|3[2-6]|4[1-79]|6[4-6]|7[1-578]|8[3-8])|6(?:[0-57-9]\\d|6[0-8])|7(?:[0159]\\d|2[12]|3[1-7]|4[2-46]|6[13569]|7[13-6]|8[1-59])|8(?:[0159]\\d|2[3-578]|3[1-356]|[6-8][1-5])|9(?:[0159]\\d|[238][1-5]|4[12]|6[1-8]|7[1-6]))\\d{2,7}"], ["3[1-9]\\d{8}|3[2-9]\\d{7}", [9, 10]], ["80(?:0\\d{3}|3)\\d{3}", [6, 9]], ["(?:0878\\d\\d|89(?:2|4[5-9]\\d))\\d{3}|89[45][0-4]\\d\\d|(?:1(?:44|6[346])|89(?:5[5-9]|9))\\d{6}", [6, 8, 9, 10]], ["1(?:78\\d|99)\\d{6}", [9, 10]], 0, 0, 0, ["55\\d{8}", [10]], ["84(?:[08]\\d{3}|[17])\\d{3}", [6, 9]]]],
    "JE": ["44", "00", "1534\\d{6}|(?:[3578]\\d|90)\\d{8}", [10], 0, "0", 0, "0|([0-24-8]\\d{5})$", "1534$1", 0, 0, [["1534[0-24-8]\\d{5}"], ["7(?:(?:(?:50|82)9|937)\\d|7(?:00[378]|97[7-9]))\\d{5}"], ["80(?:07(?:35|81)|8901)\\d{4}"], ["(?:8(?:4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))|90(?:066[59]|1810|71(?:07|55)))\\d{4}"], ["701511\\d{4}"], 0, ["(?:3(?:0(?:07(?:35|81)|8901)|3\\d{4}|4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))|55\\d{4})\\d{4}"], ["76(?:0[0-2]|2[356]|34|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}"], ["56\\d{8}"]]],
    "JM": ["1", "011", "(?:[58]\\d\\d|658|900)\\d{7}", [10], 0, "1", 0, 0, 0, 0, "658|876"],
    "JO": ["962", "00", "(?:(?:[2689]|7\\d)\\d|32|53)\\d{6}", [8, 9], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2356]|87"], "(0$1)"], ["(\\d{3})(\\d{5,6})", "$1 $2", ["[89]"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["70"], "0$1"], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["7"], "0$1"]], "0"],
    "JP": ["81", "010", "00[1-9]\\d{6,14}|[257-9]\\d{9}|(?:00|[1-9]\\d\\d)\\d{6}", [8, 9, 10, 11, 12, 13, 14, 15, 16, 17], [["(\\d{3})(\\d{3})(\\d{3})", "$1-$2-$3", ["(?:12|57|99)0"], "0$1"], ["(\\d{4})(\\d)(\\d{4})", "$1-$2-$3", ["1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|499|5(?:76|97)|746|8(?:3[89]|47|51|63)|9(?:49|80|9[16])", "1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:76|97)9|7468|8(?:3(?:8[78]|96)|477|51[24]|636)|9(?:496|802|9(?:1[23]|69))|1(?:45|58)[67]", "1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:769|979[2-69])|7468|8(?:3(?:8[78]|96[2457-9])|477|51[24]|636[457-9])|9(?:496|802|9(?:1[23]|69))|1(?:45|58)[67]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["60"], "0$1"], ["(\\d)(\\d{4})(\\d{4})", "$1-$2-$3", ["[36]|4(?:2[09]|7[01])", "[36]|4(?:2(?:0|9[02-69])|7(?:0[019]|1))"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["1(?:1|5[45]|77|88|9[69])|2(?:2[1-37]|3[0-269]|4[59]|5|6[24]|7[1-358]|8[1369]|9[0-38])|4(?:[28][1-9]|3[0-57]|[45]|6[248]|7[2-579]|9[29])|5(?:2|3[045]|4[0-369]|5[29]|8[02389]|9[0-389])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9[2-6])|8(?:2[124589]|3[279]|49|6|7[0-468]|8[68]|9[019])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9[1-489])", "1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2(?:[127]|3[014-9])|3[0-269]|4[59]|5(?:[0468][01]|[1-3]|5[0-69]|9[19])|62|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|2[01]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|8[1-9])|5(?:2|3[045]|4[0-369]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0-2469])|49|6(?:[0-24]|36|5[0-3589]|72|9[01459])|7[0-468]|8[68])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9(?:[1289]|3[34]|4[0178]))|(?:49|55|83)[29]|(?:264|837)[016-9]|2(?:57|93)[015-9]|(?:47[59]|59[89]|8(?:6[68]|9))[019]", "1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2[127]|3[0-269]|4[59]|5(?:[0468][01]|[1-3]|5[0-69]|9(?:17|99))|6(?:2|4[016-9])|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|2[01]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|9[29])|5(?:2|3[045]|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0169])|3(?:[29]|7(?:[017-9]|6[6-8]))|49|6(?:[0-24]|36[23]|5(?:[0-389]|5[23])|6(?:[01]|9[178])|72|9[0145])|7[0-468]|8[68])|9(?:4[15]|5[138]|7[156]|8[189]|9(?:[1289]|3(?:31|4[357])|4[0178]))|(?:8294|96)[1-3]|2(?:57|93)[015-9]|(?:223|8699)[014-9]|(?:48|8292|9[23])[1-9]|(?:47[59]|59[89]|8(?:68|9))[019]", "1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2[127]|3[0-269]|4[59]|5(?:[0468][01]|[1-3]|5[0-69]|7[015-9]|9(?:17|99))|6(?:2|4[016-9])|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17|3[015-9]))|4(?:2(?:[13-79]|2[01]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|9[29])|5(?:2|3[045]|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9(?:[019]|4[1-3]|6(?:[0-47-9]|5[01346-9])))|3(?:[29]|7(?:[017-9]|6[6-8]))|49|6(?:[0-24]|36[23]|5(?:[0-389]|5[23])|6(?:[01]|9[178])|72|9[0145])|7[0-468]|8[68])|9(?:4[15]|5[138]|6[1-3]|7[156]|8[189]|9(?:[1289]|3(?:31|4[357])|4[0178]))|(?:223|8699)[014-9]|(?:48|829(?:2|66)|9[23])[1-9]|(?:47[59]|59[89]|8(?:68|9))[019]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3", ["[14]|[29][2-9]|5[3-9]|7[2-4679]|8(?:[246-9]|3[3-8]|5[2-9])", "[14]|[29][2-9]|5[3-9]|7[2-4679]|8(?:[246-9]|3(?:[3-6][2-9]|7|8[2-5])|5[2-9])"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["800"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3", ["[2579]|80"], "0$1"]], "0"],
    "KE": ["254", "000", "(?:[17]\\d\\d|900)\\d{6}|(?:2|80)0\\d{6,7}|[4-6]\\d{6,8}", [7, 8, 9, 10], [["(\\d{2})(\\d{5,7})", "$1 $2", ["[24-6]"], "0$1"], ["(\\d{3})(\\d{6})", "$1 $2", ["[17]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[89]"], "0$1"]], "0"],
    "KG": ["996", "00", "8\\d{9}|(?:[235-8]\\d|99)\\d{7}", [9, 10], [["(\\d{4})(\\d{5})", "$1 $2", ["3(?:1[346]|[24-79])"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[235-79]|88"], "0$1"], ["(\\d{3})(\\d{3})(\\d)(\\d{2,3})", "$1 $2 $3 $4", ["8"], "0$1"]], "0"],
    "KH": ["855", "00[14-9]", "1\\d{9}|[1-9]\\d{7,8}", [8, 9, 10], [["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-9]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]]], "0"],
    "KI": ["686", "00", "(?:[37]\\d|6[0-79])\\d{6}|(?:[2-48]\\d|50)\\d{3}", [5, 8], 0, "0"],
    "KM": ["269", "00", "[3478]\\d{6}", [7], [["(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[3478]"]]]],
    "KN": ["1", "011", "(?:[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([2-7]\\d{6})$", "869$1", 0, "869"],
    "KP": ["850", "00|99", "85\\d{6}|(?:19\\d|[2-7])\\d{7}", [8, 10], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"], "0$1"], ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-7]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"]], "0"],
    "KR": ["82", "00(?:[125689]|3(?:[46]5|91)|7(?:00|27|3|55|6[126]))", "00[1-9]\\d{8,11}|(?:[12]|5\\d{3})\\d{7}|[13-6]\\d{9}|(?:[1-6]\\d|80)\\d{7}|[3-6]\\d{4,5}|(?:00|7)0\\d{8}", [5, 6, 8, 9, 10, 11, 12, 13, 14], [["(\\d{2})(\\d{3,4})", "$1-$2", ["(?:3[1-3]|[46][1-4]|5[1-5])1"], "0$1"], ["(\\d{4})(\\d{4})", "$1-$2", ["1"]], ["(\\d)(\\d{3,4})(\\d{4})", "$1-$2-$3", ["2"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["60|8"], "0$1"], ["(\\d{2})(\\d{3,4})(\\d{4})", "$1-$2-$3", ["[1346]|5[1-5]"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3", ["[57]"], "0$1"], ["(\\d{2})(\\d{5})(\\d{4})", "$1-$2-$3", ["5"], "0$1"]], "0", 0, "0(8(?:[1-46-8]|5\\d\\d))?"],
    "KW": ["965", "00", "(?:18|[2569]\\d\\d)\\d{5}", [7, 8], [["(\\d{4})(\\d{3,4})", "$1 $2", ["[169]|2(?:[235]|4[1-35-9])|52"]], ["(\\d{3})(\\d{5})", "$1 $2", ["[25]"]]]],
    "KY": ["1", "011", "(?:345|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([2-9]\\d{6})$", "345$1", 0, "345"],
    "KZ": ["7", "810", "33622\\d{5}|(?:7\\d|80)\\d{8}", [10], 0, "8", 0, 0, 0, 0, "33|7", 0, "8~10"],
    "LA": ["856", "00", "[23]\\d{9}|3\\d{8}|(?:[235-8]\\d|41)\\d{6}", [8, 9, 10], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["2[13]|3[14]|[4-8]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["30[013-9]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["[23]"], "0$1"]], "0"],
    "LB": ["961", "00", "[7-9]\\d{7}|[13-9]\\d{6}", [7, 8], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[13-69]|7(?:[2-57]|62|8[0-7]|9[04-9])|8[02-9]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[7-9]"]]], "0"],
    "LC": ["1", "011", "(?:[58]\\d\\d|758|900)\\d{7}", [10], 0, "1", 0, "1|([2-8]\\d{6})$", "758$1", 0, "758"],
    "LI": ["423", "00", "90\\d{5}|(?:[2378]|6\\d\\d)\\d{6}", [7, 9], [["(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[237-9]"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["69"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6"]]], "0", 0, "0|(1001)"],
    "LK": ["94", "00", "[1-9]\\d{8}", [9], [["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[1-689]"], "0$1"]], "0"],
    "LR": ["231", "00", "(?:2|33|5\\d|77|88)\\d{7}|[4-6]\\d{6}", [7, 8, 9], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[4-6]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[3578]"], "0$1"]], "0"],
    "LS": ["266", "00", "(?:[256]\\d\\d|800)\\d{5}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[2568]"]]]],
    "LT": ["370", "00", "(?:[3469]\\d|52|[78]0)\\d{6}", [8], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["52[0-7]"], "(8-$1)", 1], ["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[7-9]"], "8 $1", 1], ["(\\d{2})(\\d{6})", "$1 $2", ["37|4(?:[15]|6[1-8])"], "(8-$1)", 1], ["(\\d{3})(\\d{5})", "$1 $2", ["[3-6]"], "(8-$1)", 1]], "8", 0, "[08]"],
    "LU": ["352", "00", "35[013-9]\\d{4,8}|6\\d{8}|35\\d{2,4}|(?:[2457-9]\\d|3[0-46-9])\\d{2,9}", [4, 5, 6, 7, 8, 9, 10, 11], [["(\\d{2})(\\d{3})", "$1 $2", ["2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])"]], ["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])"]], ["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["20[2-689]"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})", "$1 $2 $3 $4", ["2(?:[0367]|4[3-8])"]], ["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["80[01]|90[015]"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["20"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})", "$1 $2 $3 $4 $5", ["2(?:[0367]|4[3-8])"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{1,5})", "$1 $2 $3 $4", ["[3-57]|8[13-9]|9(?:0[89]|[2-579])|(?:2|80)[2-9]"]]], 0, 0, "(15(?:0[06]|1[12]|[35]5|4[04]|6[26]|77|88|99)\\d)"],
    "LV": ["371", "00", "(?:[268]\\d|90)\\d{6}", [8], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[269]|8[01]"]]]],
    "LY": ["218", "00", "[2-9]\\d{8}", [9], [["(\\d{2})(\\d{7})", "$1-$2", ["[2-9]"], "0$1"]], "0"],
    "MA": ["212", "00", "[5-8]\\d{8}", [9], [["(\\d{5})(\\d{4})", "$1-$2", ["5(?:29|38)", "5(?:29|38)[89]", "5(?:29|38)[89]0"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["5[45]"], "0$1"], ["(\\d{4})(\\d{5})", "$1-$2", ["5(?:2[2-489]|3[5-9]|9)|892", "5(?:2(?:[2-49]|8[235-9])|3[5-9]|9)|892"], "0$1"], ["(\\d{2})(\\d{7})", "$1-$2", ["8"], "0$1"], ["(\\d{3})(\\d{6})", "$1-$2", ["[5-7]"], "0$1"]], "0", 0, 0, 0, 0, 0, [["5(?:29(?:[189][05]|2[29]|3[01])|38[89][05])\\d{4}|5(?:2(?:[015-7]\\d|2[02-9]|3[0-578]|4[02-46-8]|8[0235-7]|90)|3(?:[0-47]\\d|5[02-9]|6[02-8]|80|9[3-9])|(?:4[067]|5[03])\\d)\\d{5}"], ["(?:6(?:[0-79]\\d|8[0-247-9])|7(?:0[016-8]|6[1267]|7[0-27]))\\d{6}"], ["80\\d{7}"], ["89\\d{7}"], 0, 0, 0, 0, ["592(?:4[0-2]|93)\\d{4}"]]],
    "MC": ["377", "00", "870\\d{5}|(?:[349]|6\\d)\\d{7}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["4"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[39]"]], ["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["6"], "0$1"]], "0"],
    "MD": ["373", "00", "(?:[235-7]\\d|[89]0)\\d{6}", [8], [["(\\d{3})(\\d{5})", "$1 $2", ["[89]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["22|3"], "0$1"], ["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[25-7]"], "0$1"]], "0"],
    "ME": ["382", "00", "(?:20|[3-79]\\d)\\d{6}|80\\d{6,7}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-9]"], "0$1"]], "0"],
    "MF": ["590", "00", "(?:590|69\\d|976)\\d{6}", [9], 0, "0", 0, 0, 0, 0, 0, [["590(?:0[079]|[14]3|[27][79]|30|5[0-268]|87)\\d{4}"], ["69(?:0\\d\\d|1(?:2[29]|3[0-5]))\\d{4}"], 0, 0, 0, 0, 0, 0, ["976[01]\\d{5}"]]],
    "MG": ["261", "00", "[23]\\d{8}", [9], [["(\\d{2})(\\d{2})(\\d{3})(\\d{2})", "$1 $2 $3 $4", ["[23]"], "0$1"]], "0", 0, "0|([24-9]\\d{6})$", "20$1"],
    "MH": ["692", "011", "329\\d{4}|(?:[256]\\d|45)\\d{5}", [7], [["(\\d{3})(\\d{4})", "$1-$2", ["[2-6]"]]], "1"],
    "MK": ["389", "00", "[2-578]\\d{7}", [8], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[347]"], "0$1"], ["(\\d{3})(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[58]"], "0$1"]], "0"],
    "ML": ["223", "00", "[24-9]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[24-9]"]]]],
    "MM": ["95", "00", "1\\d{5,7}|95\\d{6}|(?:[4-7]|9[0-46-9])\\d{6,8}|(?:2|8\\d)\\d{5,8}", [6, 7, 8, 9, 10], [["(\\d)(\\d{2})(\\d{3})", "$1 $2 $3", ["16|2"], "0$1"], ["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["[45]|6(?:0[23]|[1-689]|7[235-7])|7(?:[0-4]|5[2-7])|8[1-6]"], "0$1"], ["(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[12]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[4-7]|8[1-35]"], "0$1"], ["(\\d)(\\d{3})(\\d{4,6})", "$1 $2 $3", ["9(?:2[0-4]|[35-9]|4[137-9])"], "0$1"], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"], "0$1"], ["(\\d)(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["92"], "0$1"], ["(\\d)(\\d{5})(\\d{4})", "$1 $2 $3", ["9"], "0$1"]], "0"],
    "MN": ["976", "001", "[12]\\d{7,9}|[57-9]\\d{7}", [8, 9, 10], [["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["[12]1"], "0$1"], ["(\\d{4})(\\d{4})", "$1 $2", ["[57-9]"]], ["(\\d{3})(\\d{5,6})", "$1 $2", ["[12]2[1-3]"], "0$1"], ["(\\d{4})(\\d{5,6})", "$1 $2", ["[12](?:27|3[2-8]|4[2-68]|5[1-4689])", "[12](?:27|3[2-8]|4[2-68]|5[1-4689])[0-3]"], "0$1"], ["(\\d{5})(\\d{4,5})", "$1 $2", ["[12]"], "0$1"]], "0"],
    "MO": ["853", "00", "(?:28|[68]\\d)\\d{6}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[268]"]]]],
    "MP": ["1", "011", "[58]\\d{9}|(?:67|90)0\\d{7}", [10], 0, "1", 0, "1|([2-9]\\d{6})$", "670$1", 0, "670"],
    "MQ": ["596", "00", "69\\d{7}|(?:59|97)6\\d{6}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[569]"], "0$1"]], "0"],
    "MR": ["222", "00", "(?:[2-4]\\d\\d|800)\\d{5}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-48]"]]]],
    "MS": ["1", "011", "(?:[58]\\d\\d|664|900)\\d{7}", [10], 0, "1", 0, "1|([34]\\d{6})$", "664$1", 0, "664"],
    "MT": ["356", "00", "3550\\d{4}|(?:[2579]\\d\\d|800)\\d{5}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[2357-9]"]]]],
    "MU": ["230", "0(?:0|[24-7]0|3[03])", "(?:[2-468]|5\\d)\\d{6}", [7, 8], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-46]|8[013]"]], ["(\\d{4})(\\d{4})", "$1 $2", ["5"]]], 0, 0, 0, 0, 0, 0, 0, "020"],
    "MV": ["960", "0(?:0|19)", "(?:800|9[0-57-9]\\d)\\d{7}|[34679]\\d{6}", [7, 10], [["(\\d{3})(\\d{4})", "$1-$2", ["[3467]|9[13-9]"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[89]"]]], 0, 0, 0, 0, 0, 0, 0, "00"],
    "MW": ["265", "00", "1\\d{6}(?:\\d{2})?|(?:[23]1|77|88|99)\\d{7}", [7, 9], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["1[2-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[137-9]"], "0$1"]], "0"],
    "MX": ["52", "0[09]", "(?:1(?:[01467]\\d|[2359][1-9]|8[1-79])|[2-9]\\d)\\d{8}", [10, 11], [["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["33|5[56]|81"], 0, 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-9]"], 0, 1], ["(\\d)(\\d{2})(\\d{4})(\\d{4})", "$2 $3 $4", ["1(?:33|5[56]|81)"], 0, 1], ["(\\d)(\\d{3})(\\d{3})(\\d{4})", "$2 $3 $4", ["1"], 0, 1]], "01", 0, "0(?:[12]|4[45])|1", 0, 0, 0, 0, "00"],
    "MY": ["60", "00", "1\\d{8,9}|(?:3\\d|[4-9])\\d{7}", [8, 9, 10], [["(\\d)(\\d{3})(\\d{4})", "$1-$2 $3", ["[4-79]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1-$2 $3", ["1(?:[02469]|[378][1-9])|8"], "0$1"], ["(\\d)(\\d{4})(\\d{4})", "$1-$2 $3", ["3"], "0$1"], ["(\\d)(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3-$4", ["1[36-8]"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1-$2 $3", ["15"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1-$2 $3", ["1"], "0$1"]], "0"],
    "MZ": ["258", "00", "(?:2|8\\d)\\d{7}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2|8[2-79]"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]]]],
    "NA": ["264", "00", "[68]\\d{7,8}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["88"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["6"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["87"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"], "0$1"]], "0"],
    "NC": ["687", "00", "[2-57-9]\\d{5}", [6], [["(\\d{2})(\\d{2})(\\d{2})", "$1.$2.$3", ["[2-57-9]"]]]],
    "NE": ["227", "00", "[0289]\\d{7}", [8], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["08"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[089]|2[013]"]]]],
    "NF": ["672", "00", "[13]\\d{5}", [6], [["(\\d{2})(\\d{4})", "$1 $2", ["1[0-3]"]], ["(\\d)(\\d{5})", "$1 $2", ["[13]"]]], 0, 0, "([0-258]\\d{4})$", "3$1"],
    "NG": ["234", "009", "(?:[124-7]|9\\d{3})\\d{6}|[1-9]\\d{7}|[78]\\d{9,13}", [7, 8, 10, 11, 12, 13, 14], [["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["78"], "0$1"], ["(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[12]|9(?:0[3-9]|[1-9])"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["[3-7]|8[2-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[7-9]"], "0$1"], ["(\\d{3})(\\d{4})(\\d{4,5})", "$1 $2 $3", ["[78]"], "0$1"], ["(\\d{3})(\\d{5})(\\d{5,6})", "$1 $2 $3", ["[78]"], "0$1"]], "0"],
    "NI": ["505", "00", "(?:1800|[25-8]\\d{3})\\d{4}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[125-8]"]]]],
    "NL": ["31", "00", "(?:[124-7]\\d\\d|3(?:[02-9]\\d|1[0-8]))\\d{6}|[89]\\d{6,9}|1\\d{4,5}", [5, 6, 7, 8, 9, 10], [["(\\d{3})(\\d{4,7})", "$1 $2", ["[89]0"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["66"], "0$1"], ["(\\d)(\\d{8})", "$1 $2", ["6"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["1[16-8]|2[259]|3[124]|4[17-9]|5[124679]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-57-9]"], "0$1"]], "0"],
    "NO": ["47", "00", "(?:0|[2-9]\\d{3})\\d{4}", [5, 8], [["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[489]|5[89]"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[235-7]"]]], 0, 0, 0, 0, 0, "[02-689]|7[0-8]"],
    "NP": ["977", "00", "9\\d{9}|[1-9]\\d{7}", [8, 10], [["(\\d)(\\d{7})", "$1-$2", ["1[2-6]"], "0$1"], ["(\\d{2})(\\d{6})", "$1-$2", ["[1-8]|9(?:[1-579]|6[2-6])"], "0$1"], ["(\\d{3})(\\d{7})", "$1-$2", ["9"]]], "0"],
    "NR": ["674", "00", "(?:444|(?:55|8\\d)\\d|666)\\d{4}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[4-68]"]]]],
    "NU": ["683", "00", "(?:[47]|888\\d)\\d{3}", [4, 7], [["(\\d{3})(\\d{4})", "$1 $2", ["8"]]]],
    "NZ": ["64", "0(?:0|161)", "[29]\\d{7,9}|50\\d{5}(?:\\d{2,3})?|6[0-35-9]\\d{6}|7\\d{7,8}|8\\d{4,9}|(?:11\\d|[34])\\d{7}", [5, 6, 7, 8, 9, 10], [["(\\d{2})(\\d{3,8})", "$1 $2", ["83"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["50[0367]|[89]0"], "0$1"], ["(\\d)(\\d{3})(\\d{4})", "$1-$2 $3", ["24|[346]|7[2-57-9]|9[2-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2(?:10|74)|[59]|80"], "0$1"], ["(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["1|2[028]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,5})", "$1 $2 $3", ["2(?:[169]|7[0-35-9])|7|86"], "0$1"]], "0", 0, 0, 0, 0, 0, 0, "00"],
    "OM": ["968", "00", "(?:1505|[279]\\d{3}|500)\\d{4}|8007\\d{4,5}", [7, 8, 9], [["(\\d{3})(\\d{4,6})", "$1 $2", ["[58]"]], ["(\\d{2})(\\d{6})", "$1 $2", ["2"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[179]"]]]],
    "PA": ["507", "00", "(?:[1-57-9]|6\\d)\\d{6}", [7, 8], [["(\\d{3})(\\d{4})", "$1-$2", ["[1-57-9]"]], ["(\\d{4})(\\d{4})", "$1-$2", ["6"]]]],
    "PE": ["51", "19(?:1[124]|77|90)00", "(?:[14-8]|9\\d)\\d{7}", [8, 9], [["(\\d{3})(\\d{5})", "$1 $2", ["80"], "(0$1)"], ["(\\d)(\\d{7})", "$1 $2", ["1"], "(0$1)"], ["(\\d{2})(\\d{6})", "$1 $2", ["[4-8]"], "(0$1)"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"]]], "0", 0, 0, 0, 0, 0, 0, 0, " Anexo "],
    "PF": ["689", "00", "[48]\\d{7}|4\\d{5}", [6, 8], [["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["44"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[48]"]]]],
    "PG": ["675", "00|140[1-3]", "(?:180|[78]\\d{3})\\d{4}|(?:[2-589]\\d|64)\\d{5}", [7, 8], [["(\\d{3})(\\d{4})", "$1 $2", ["18|[2-69]|85"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[78]"]]], 0, 0, 0, 0, 0, 0, 0, "00"],
    "PH": ["63", "00", "1800\\d{7,9}|(?:2|[89]\\d{4})\\d{5}|[2-8]\\d{8}|[28]\\d{7}", [6, 8, 9, 10, 11, 12, 13], [["(\\d)(\\d{5})", "$1 $2", ["2"], "(0$1)"], ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["2"], "(0$1)"], ["(\\d{4})(\\d{4,6})", "$1 $2", ["3(?:23|39|46)|4(?:2[3-6]|[35]9|4[26]|76)|544|88[245]|(?:52|64|86)2", "3(?:230|397|461)|4(?:2(?:35|[46]4|51)|396|4(?:22|63)|59[347]|76[15])|5(?:221|446)|642[23]|8(?:622|8(?:[24]2|5[13]))"], "(0$1)"], ["(\\d{5})(\\d{4})", "$1 $2", ["346|4(?:27|9[35])|883", "3469|4(?:279|9(?:30|56))|8834"], "(0$1)"], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[3-7]|8[2-8]"], "(0$1)"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[89]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]], ["(\\d{4})(\\d{1,2})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["1"]]], "0"],
    "PK": ["92", "00", "122\\d{6}|[24-8]\\d{10,11}|9(?:[013-9]\\d{8,10}|2(?:[01]\\d\\d|2(?:[06-8]\\d|1[01]))\\d{7})|(?:[2-8]\\d{3}|92(?:[0-7]\\d|8[1-9]))\\d{6}|[24-9]\\d{8}|[89]\\d{7}", [8, 9, 10, 11, 12], [["(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3", ["[89]0"], "0$1"], ["(\\d{4})(\\d{5})", "$1 $2", ["1"]], ["(\\d{3})(\\d{6,7})", "$1 $2", ["2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:2[2-8]|3[27-9]|4[2-6]|6[3569]|9[25-8])", "9(?:2[3-8]|98)|(?:2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:22|3[27-9]|4[2-6]|6[3569]|9[25-7]))[2-9]"], "(0$1)"], ["(\\d{2})(\\d{7,8})", "$1 $2", ["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]"], "(0$1)"], ["(\\d{5})(\\d{5})", "$1 $2", ["58"], "(0$1)"], ["(\\d{3})(\\d{7})", "$1 $2", ["3"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91"], "(0$1)"], ["(\\d{3})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["[24-9]"], "(0$1)"]], "0"],
    "PL": ["48", "00", "[1-57-9]\\d{6}(?:\\d{2})?|6\\d{5,8}", [6, 7, 8, 9], [["(\\d{5})", "$1", ["19"]], ["(\\d{3})(\\d{3})", "$1 $2", ["11|64"]], ["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])1", "(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])19"]], ["(\\d{3})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["64"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["39|45|5[0137]|6[0469]|7[02389]|8[08]"]], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[2-8]|[2-8]|9[145]"]]]],
    "PM": ["508", "00", "[45]\\d{5}", [6], [["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["[45]"], "0$1"]], "0"],
    "PR": ["1", "011", "(?:[589]\\d\\d|787)\\d{7}", [10], 0, "1", 0, 0, 0, 0, "787|939"],
    "PS": ["970", "00", "[2489]2\\d{6}|(?:1\\d|5)\\d{8}", [8, 9, 10], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2489]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["5"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]]], "0"],
    "PT": ["351", "00", "(?:[26-9]\\d|30)\\d{7}", [9], [["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["2[12]"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[236-9]"]]]],
    "PW": ["680", "01[12]", "(?:[24-8]\\d\\d|345|900)\\d{4}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-9]"]]]],
    "PY": ["595", "00", "59\\d{4,6}|(?:[2-46-9]\\d|5[0-8])\\d{4,7}", [6, 7, 8, 9], [["(\\d{3})(\\d{3,6})", "$1 $2", ["[2-9]0"], "0$1"], ["(\\d{2})(\\d{5})", "$1 $2", ["[26]1|3[289]|4[1246-8]|7[1-3]|8[1-36]"], "(0$1)"], ["(\\d{3})(\\d{4,5})", "$1 $2", ["2[279]|3[13-5]|4[359]|5|6(?:[34]|7[1-46-8])|7[46-8]|85"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2[14-68]|3[26-9]|4[1246-8]|6(?:1|75)|7[1-35]|8[1-36]"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["87"]], ["(\\d{3})(\\d{6})", "$1 $2", ["9"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-8]"], "0$1"]], "0"],
    "QA": ["974", "00", "[2-7]\\d{7}|(?:2\\d\\d|800)\\d{4}", [7, 8], [["(\\d{3})(\\d{4})", "$1 $2", ["2[126]|8"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[2-7]"]]]],
    "RE": ["262", "00", "9769\\d{5}|(?:26|[68]\\d)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2689]"], "0$1"]], "0", 0, 0, 0, 0, "26[23]|69|[89]"],
    "RO": ["40", "00", "(?:[237]\\d|[89]0)\\d{7}|[23]\\d{5}", [6, 9], [["(\\d{3})(\\d{3})", "$1 $2", ["2[3-6]", "2[3-6]\\d9"], "0$1"], ["(\\d{2})(\\d{4})", "$1 $2", ["219|31"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[23]1"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[237-9]"], "0$1"]], "0", 0, 0, 0, 0, 0, 0, 0, " int "],
    "RS": ["381", "00", "38[02-9]\\d{6,9}|6\\d{7,9}|90\\d{4,8}|38\\d{5,6}|(?:7\\d\\d|800)\\d{3,9}|(?:[12]\\d|3[0-79])\\d{5,10}", [6, 7, 8, 9, 10, 11, 12], [["(\\d{3})(\\d{3,9})", "$1 $2", ["(?:2[389]|39)0|[7-9]"], "0$1"], ["(\\d{2})(\\d{5,10})", "$1 $2", ["[1-36]"], "0$1"]], "0"],
    "RU": ["7", "810", "[347-9]\\d{9}", [10], [["(\\d{4})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["7(?:1[0-8]|2[1-9])", "7(?:1(?:[0-6]2|7|8[27])|2(?:1[23]|[2-9]2))", "7(?:1(?:[0-6]2|7|8[27])|2(?:13[03-69]|62[013-9]))|72[1-57-9]2"], "8 ($1)", 1], ["(\\d{5})(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["7(?:1[0-68]|2[1-9])", "7(?:1(?:[06][3-6]|[18]|2[35]|[3-5][3-5])|2(?:[13][3-5]|[24-689]|7[457]))", "7(?:1(?:0(?:[356]|4[023])|[18]|2(?:3[013-9]|5)|3[45]|43[013-79]|5(?:3[1-8]|4[1-7]|5)|6(?:3[0-35-9]|[4-6]))|2(?:1(?:3[178]|[45])|[24-689]|3[35]|7[457]))|7(?:14|23)4[0-8]|71(?:33|45)[1-79]"], "8 ($1)", 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "8 ($1)", 1], ["(\\d{3})(\\d{3})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[3489]"], "8 ($1)", 1]], "8", 0, 0, 0, 0, "3[04-689]|[489]", 0, "8~10"],
    "RW": ["250", "00", "(?:06|[27]\\d\\d|[89]00)\\d{6}", [8, 9], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["0"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[7-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"]]], "0"],
    "SA": ["966", "00", "92\\d{7}|(?:[15]|8\\d)\\d{8}", [9, 10], [["(\\d{4})(\\d{5})", "$1 $2", ["9"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["5"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["81"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"]]], "0"],
    "SB": ["677", "0[01]", "(?:[1-6]|[7-9]\\d\\d)\\d{4}", [5, 7], [["(\\d{2})(\\d{5})", "$1 $2", ["7|8[4-9]|9(?:[1-8]|9[0-8])"]]]],
    "SC": ["248", "010|0[0-2]", "8000\\d{3}|(?:[249]\\d|64)\\d{5}", [7], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[246]|9[57]"]]], 0, 0, 0, 0, 0, 0, 0, "00"],
    "SD": ["249", "00", "[19]\\d{8}", [9], [["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[19]"], "0$1"]], "0"],
    "SE": ["46", "00", "(?:[26]\\d\\d|9)\\d{9}|[1-9]\\d{8}|[1-689]\\d{7}|[1-4689]\\d{6}|2\\d{5}", [6, 7, 8, 9, 10], [["(\\d{2})(\\d{2,3})(\\d{2})", "$1-$2 $3", ["20"], "0$1", 0, "$1 $2 $3"], ["(\\d{3})(\\d{4})", "$1-$2", ["9(?:00|39|44)"], "0$1", 0, "$1 $2"], ["(\\d{2})(\\d{3})(\\d{2})", "$1-$2 $3", ["[12][136]|3[356]|4[0246]|6[03]|90[1-9]"], "0$1", 0, "$1 $2 $3"], ["(\\d)(\\d{2,3})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["8"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d{3})(\\d{2,3})(\\d{2})", "$1-$2 $3", ["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[125689]|4[02-57]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"], "0$1", 0, "$1 $2 $3"], ["(\\d{3})(\\d{2,3})(\\d{3})", "$1-$2 $3", ["9(?:00|39|44)"], "0$1", 0, "$1 $2 $3"], ["(\\d{2})(\\d{2,3})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["1[13689]|2[0136]|3[1356]|4[0246]|54|6[03]|90[1-9]"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["10|7"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d)(\\d{3})(\\d{3})(\\d{2})", "$1-$2 $3 $4", ["8"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["[13-5]|2(?:[247-9]|5[0138])|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{3})", "$1-$2 $3 $4", ["9"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1-$2 $3 $4 $5", ["[26]"], "0$1", 0, "$1 $2 $3 $4 $5"]], "0"],
    "SG": ["65", "0[0-3]\\d", "(?:(?:1\\d|8)\\d\\d|7000)\\d{7}|[3689]\\d{7}", [8, 10, 11], [["(\\d{4})(\\d{4})", "$1 $2", ["[369]|8(?:01|[1-9])"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"]], ["(\\d{4})(\\d{4})(\\d{3})", "$1 $2 $3", ["7"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]]]],
    "SH": ["290", "00", "(?:[256]\\d|8)\\d{3}", [4, 5], 0, 0, 0, 0, 0, 0, "[256]"],
    "SI": ["386", "00|10(?:22|66|88|99)", "[1-7]\\d{7}|8\\d{4,7}|90\\d{4,6}", [5, 6, 7, 8], [["(\\d{2})(\\d{3,6})", "$1 $2", ["8[09]|9"], "0$1"], ["(\\d{3})(\\d{5})", "$1 $2", ["59|8"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[37][01]|4[0139]|51|6"], "0$1"], ["(\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[1-57]"], "(0$1)"]], "0", 0, 0, 0, 0, 0, 0, "00"],
    "SJ": ["47", "00", "0\\d{4}|(?:[4589]\\d|79)\\d{6}", [5, 8], 0, 0, 0, 0, 0, 0, "79"],
    "SK": ["421", "00", "[2-689]\\d{8}|[2-59]\\d{6}|[2-5]\\d{5}", [6, 7, 9], [["(\\d)(\\d{2})(\\d{3,4})", "$1 $2 $3", ["21"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["[3-5][1-8]1", "[3-5][1-8]1[67]"], "0$1"], ["(\\d)(\\d{3})(\\d{3})(\\d{2})", "$1/$2 $3 $4", ["2"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[689]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1/$2 $3 $4", ["[3-5]"], "0$1"]], "0"],
    "SL": ["232", "00", "(?:[2378]\\d|66|99)\\d{6}", [8], [["(\\d{2})(\\d{6})", "$1 $2", ["[236-9]"], "(0$1)"]], "0"],
    "SM": ["378", "00", "(?:0549|[5-7]\\d)\\d{6}", [8, 10], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-7]"]], ["(\\d{4})(\\d{6})", "$1 $2", ["0"]]], 0, 0, "([89]\\d{5})$", "0549$1"],
    "SN": ["221", "00", "(?:[378]\\d{4}|93330)\\d{4}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"]], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[379]"]]]],
    "SO": ["252", "00", "[346-9]\\d{8}|[12679]\\d{7}|[1-5]\\d{6}|[1348]\\d{5}", [6, 7, 8, 9], [["(\\d{2})(\\d{4})", "$1 $2", ["8[125]"]], ["(\\d{6})", "$1", ["[134]"]], ["(\\d)(\\d{6})", "$1 $2", ["[15]|2[0-79]|3[0-46-8]|4[0-7]"]], ["(\\d)(\\d{7})", "$1 $2", ["24|[67]"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[3478]|64|90"]], ["(\\d{2})(\\d{5,7})", "$1 $2", ["1|28|6[1-35-9]|9[2-9]"]]], "0"],
    "SR": ["597", "00", "(?:[2-5]|68|[78]\\d)\\d{5}", [6, 7], [["(\\d{2})(\\d{2})(\\d{2})", "$1-$2-$3", ["56"]], ["(\\d{3})(\\d{3})", "$1-$2", ["[2-5]"]], ["(\\d{3})(\\d{4})", "$1-$2", ["[6-8]"]]]],
    "SS": ["211", "00", "[19]\\d{8}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[19]"], "0$1"]], "0"],
    "ST": ["239", "00", "(?:22|9\\d)\\d{5}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[29]"]]]],
    "SV": ["503", "00", "[267]\\d{7}|[89]00\\d{4}(?:\\d{4})?", [7, 8, 11], [["(\\d{3})(\\d{4})", "$1 $2", ["[89]"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[267]"]], ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["[89]"]]]],
    "SX": ["1", "011", "7215\\d{6}|(?:[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|(5\\d{6})$", "721$1", 0, "721"],
    "SY": ["963", "00", "[1-39]\\d{8}|[1-5]\\d{7}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-5]"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "0$1", 1]], "0"],
    "SZ": ["268", "00", "0800\\d{4}|(?:[237]\\d|900)\\d{6}", [8, 9], [["(\\d{4})(\\d{4})", "$1 $2", ["[0237]"]], ["(\\d{5})(\\d{4})", "$1 $2", ["9"]]]],
    "TA": ["290", "00", "8\\d{3}", [4], 0, 0, 0, 0, 0, 0, "8"],
    "TC": ["1", "011", "(?:[58]\\d\\d|649|900)\\d{7}", [10], 0, "1", 0, "1|([2-479]\\d{6})$", "649$1", 0, "649"],
    "TD": ["235", "00|16", "(?:22|[69]\\d|77)\\d{6}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2679]"]]], 0, 0, 0, 0, 0, 0, 0, "00"],
    "TG": ["228", "00", "[279]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[279]"]]]],
    "TH": ["66", "00[1-9]", "1\\d{8,9}|(?:[2-57]|[689]\\d)\\d{7}", [8, 9, 10], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["14|[3-9]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]]], "0"],
    "TJ": ["992", "810", "(?:00|11|[3-579]\\d|88)\\d{7}", [9], [["(\\d{6})(\\d)(\\d{2})", "$1 $2 $3", ["331", "3317"], 0, 1], ["(\\d{3})(\\d{2})(\\d{4})", "$1 $2 $3", ["[34]7|91[78]"], 0, 1], ["(\\d{4})(\\d)(\\d{4})", "$1 $2 $3", ["3"], 0, 1], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[0457-9]|11"], 0, 1]], "8", 0, 0, 0, 0, 0, 0, "8~10"],
    "TK": ["690", "00", "[2-47]\\d{3,6}", [4, 5, 6, 7]],
    "TL": ["670", "00", "7\\d{7}|(?:[2-47]\\d|[89]0)\\d{5}", [7, 8], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-489]|70"]], ["(\\d{4})(\\d{4})", "$1 $2", ["7"]]]],
    "TM": ["993", "810", "[1-6]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["12"], "(8 $1)"], ["(\\d{3})(\\d)(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[1-5]"], "(8 $1)"], ["(\\d{2})(\\d{6})", "$1 $2", ["6"], "8 $1"]], "8", 0, 0, 0, 0, 0, 0, "8~10"],
    "TN": ["216", "00", "[2-57-9]\\d{7}", [8], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-57-9]"]]]],
    "TO": ["676", "00", "(?:0800|[5-8]\\d{3})\\d{3}|[2-8]\\d{4}", [5, 7], [["(\\d{2})(\\d{3})", "$1-$2", ["[2-4]|50|6[09]|7[0-24-69]|8[05]"]], ["(\\d{4})(\\d{3})", "$1 $2", ["0"]], ["(\\d{3})(\\d{4})", "$1 $2", ["[5-8]"]]]],
    "TR": ["90", "00", "(?:4|8\\d{5})\\d{6}|(?:[2-58]\\d\\d|900)\\d{7}", [7, 10, 12], [["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["512|8[0589]|90"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["5(?:[0-59]|61)", "5(?:[0-59]|616)", "5(?:[0-59]|6161)"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[24][1-8]|3[1-9]"], "(0$1)", 1], ["(\\d{3})(\\d{3})(\\d{6})", "$1 $2 $3", ["80"], "0$1", 1]], "0"],
    "TT": ["1", "011", "(?:[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([2-46-8]\\d{6})$", "868$1", 0, "868"],
    "TV": ["688", "00", "(?:2|7\\d\\d|90)\\d{4}", [5, 6, 7], [["(\\d{2})(\\d{3})", "$1 $2", ["2"]], ["(\\d{2})(\\d{4})", "$1 $2", ["90"]], ["(\\d{2})(\\d{5})", "$1 $2", ["7"]]]],
    "TW": ["886", "0(?:0[25-79]|19)", "[2-689]\\d{8}|7\\d{9,10}|[2-8]\\d{7}|2\\d{6}", [7, 8, 9, 10, 11], [["(\\d{2})(\\d)(\\d{4})", "$1 $2 $3", ["202"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[258]0"], "0$1"], ["(\\d)(\\d{3,4})(\\d{4})", "$1 $2 $3", ["[23568]|4(?:0[02-48]|[1-47-9])|7[1-9]", "[23568]|4(?:0[2-48]|[1-47-9])|(?:400|7)[1-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[49]"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4,5})", "$1 $2 $3", ["7"], "0$1"]], "0", 0, 0, 0, 0, 0, 0, 0, "#"],
    "TZ": ["255", "00[056]", "(?:[26-8]\\d|41|90)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{4})", "$1 $2 $3", ["[89]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[24]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[67]"], "0$1"]], "0"],
    "UA": ["380", "00", "[89]\\d{9}|[3-9]\\d{8}", [9, 10], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6[12][29]|(?:3[1-8]|4[136-8]|5[12457]|6[49])2|(?:56|65)[24]", "6[12][29]|(?:35|4[1378]|5[12457]|6[49])2|(?:56|65)[24]|(?:3[1-46-8]|46)2[013-9]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["4[45][0-5]|5(?:0|6[37])|6(?:[12][018]|[36-8])|7|89|9[1-9]|(?:48|57)[0137-9]", "4[45][0-5]|5(?:0|6(?:3[14-7]|7))|6(?:[12][018]|[36-8])|7|89|9[1-9]|(?:48|57)[0137-9]"], "0$1"], ["(\\d{4})(\\d{5})", "$1 $2", ["[3-6]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[89]"], "0$1"]], "0", 0, 0, 0, 0, 0, 0, "0~0"],
    "UG": ["256", "00[057]", "800\\d{6}|(?:[29]0|[347]\\d)\\d{7}", [9], [["(\\d{4})(\\d{5})", "$1 $2", ["202", "2024"], "0$1"], ["(\\d{3})(\\d{6})", "$1 $2", ["[27-9]|4(?:6[45]|[7-9])"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["[34]"], "0$1"]], "0"],
    "US": ["1", "011", "[2-9]\\d{9}", [10], [["(\\d{3})(\\d{3})(\\d{4})", "($1) $2-$3", ["[2-9]"], 0, 1, "$1-$2-$3"]], "1", 0, 0, 0, 0, 0, [["(?:2(?:0[1-35-9]|1[02-9]|2[03-589]|3[149]|4[08]|5[1-46]|6[0279]|7[0269]|8[13])|3(?:0[1-57-9]|1[02-9]|2[0135]|3[0-24679]|4[167]|5[12]|6[014]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[0235]|58|6[39]|7[0589]|8[04])|5(?:0[1-57-9]|1[0235-8]|20|3[0149]|4[01]|5[19]|6[1-47]|7[013-5]|8[056])|6(?:0[1-35-9]|1[024-9]|2[03689]|[34][016]|5[0179]|6[0-279]|78|8[0-29])|7(?:0[1-46-8]|1[2-9]|2[04-7]|3[1247]|4[037]|5[47]|6[02359]|7[02-59]|8[156])|8(?:0[1-68]|1[02-8]|2[08]|3[0-28]|4[3578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[0146-8]|4[0179]|5[12469]|7[0-389]|8[04-69]))[2-9]\\d{6}"], [""], ["8(?:00|33|44|55|66|77|88)[2-9]\\d{6}"], ["900[2-9]\\d{6}"], ["52(?:35(?:[02-46-9]\\d|1[02-9]|5[0-46-9])|45(?:[034]\\d|1[02-9]|2[024-9]|5[0-46-9]))\\d{4}|52(?:3[2-46-9]|4[2-4])(?:[02-9]\\d|1[02-9])\\d{4}|5(?:00|2[12]|33|44|66|77|88)[2-9]\\d{6}"]]],
    "UY": ["598", "0(?:0|1[3-9]\\d)", "(?:[249]\\d\\d|80)\\d{5}|9\\d{6}", [7, 8], [["(\\d{3})(\\d{4})", "$1 $2", ["8|90"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "0$1"], ["(\\d{4})(\\d{4})", "$1 $2", ["[24]"]]], "0", 0, 0, 0, 0, 0, 0, "00", " int. "],
    "UZ": ["998", "810", "(?:[679]\\d|88)\\d{7}", [9], [["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[6-9]"], "8 $1"]], "8", 0, 0, 0, 0, 0, 0, "8~10"],
    "VA": ["39", "00", "0\\d{5,10}|3[0-8]\\d{7,10}|55\\d{8}|8\\d{5}(?:\\d{2,4})?|(?:1\\d|39)\\d{7,8}", [6, 7, 8, 9, 10, 11], 0, 0, 0, 0, 0, 0, "06698"],
    "VC": ["1", "011", "(?:[58]\\d\\d|784|900)\\d{7}", [10], 0, "1", 0, "1|([2-7]\\d{6})$", "784$1", 0, "784"],
    "VE": ["58", "00", "[68]00\\d{7}|(?:[24]\\d|[59]0)\\d{8}", [10], [["(\\d{3})(\\d{7})", "$1-$2", ["[24-689]"], "0$1"]], "0"],
    "VG": ["1", "011", "(?:284|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "1|([2-578]\\d{6})$", "284$1", 0, "284"],
    "VI": ["1", "011", "[58]\\d{9}|(?:34|90)0\\d{7}", [10], 0, "1", 0, "1|([2-9]\\d{6})$", "340$1", 0, "340"],
    "VN": ["84", "00", "[12]\\d{9}|[135-9]\\d{8}|[16]\\d{7}|[16-8]\\d{6}", [7, 8, 9, 10], [["(\\d{2})(\\d{5})", "$1 $2", ["80"], "0$1", 1], ["(\\d{4})(\\d{4,6})", "$1 $2", ["1"], 0, 1], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[69]"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[3578]"], "0$1", 1], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["2[48]"], "0$1", 1], ["(\\d{3})(\\d{4})(\\d{3})", "$1 $2 $3", ["2"], "0$1", 1]], "0"],
    "VU": ["678", "00", "(?:[23]\\d|[48]8)\\d{3}|(?:[57]\\d|90)\\d{5}", [5, 7], [["(\\d{3})(\\d{4})", "$1 $2", ["[579]"]]]],
    "WF": ["681", "00", "(?:[45]0|68|72|8\\d)\\d{4}", [6], [["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["[4-8]"]]]],
    "WS": ["685", "0", "(?:[2-6]|8\\d{5})\\d{4}|[78]\\d{6}|[68]\\d{5}", [5, 6, 7, 10], [["(\\d{5})", "$1", ["[2-5]|6[1-9]"]], ["(\\d{3})(\\d{3,7})", "$1 $2", ["[68]"]], ["(\\d{2})(\\d{5})", "$1 $2", ["7"]]]],
    "XK": ["383", "00", "[23]\\d{7,8}|(?:4\\d\\d|[89]00)\\d{5}", [8, 9], [["(\\d{3})(\\d{5})", "$1 $2", ["[89]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-4]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[23]"], "0$1"]], "0"],
    "YE": ["967", "00", "(?:1|7\\d)\\d{7}|[1-7]\\d{6}", [7, 8, 9], [["(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-6]|7[24-68]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["7"], "0$1"]], "0"],
    "YT": ["262", "00", "80\\d{7}|(?:26|63)9\\d{6}", [9], 0, "0", 0, 0, 0, 0, "269|63"],
    "ZA": ["27", "00", "[1-9]\\d{8}|8\\d{4,7}", [5, 6, 7, 8, 9], [["(\\d{2})(\\d{3,4})", "$1 $2", ["8[1-4]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["8[1-4]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["860"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-9]"], "0$1"]], "0"],
    "ZM": ["260", "00", "(?:63|80)0\\d{6}|(?:21|[79]\\d)\\d{7}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[28]"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["[79]"], "0$1"]], "0"],
    "ZW": ["263", "00", "2(?:[0-57-9]\\d{6,8}|6[0-24-9]\\d{6,7})|[38]\\d{9}|[35-8]\\d{8}|[3-6]\\d{7}|[1-689]\\d{6}|[1-3569]\\d{5}|[1356]\\d{4}", [5, 6, 7, 8, 9, 10], [["(\\d{3})(\\d{3,5})", "$1 $2", ["2(?:0[45]|2[278]|[49]8)|3(?:[09]8|17)|6(?:[29]8|37|75)|[23][78]|(?:33|5[15]|6[68])[78]"], "0$1"], ["(\\d)(\\d{3})(\\d{2,4})", "$1 $2 $3", ["[49]"], "0$1"], ["(\\d{3})(\\d{4})", "$1 $2", ["80"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["24|8[13-59]|(?:2[05-79]|39|5[45]|6[15-8])2", "2(?:02[014]|4|[56]20|[79]2)|392|5(?:42|525)|6(?:[16-8]21|52[013])|8[13-59]"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2(?:1[39]|2[0157]|[378]|[56][14])|3(?:12|29)", "2(?:1[39]|2[0157]|[378]|[56][14])|3(?:123|29)"], "0$1"], ["(\\d{4})(\\d{6})", "$1 $2", ["8"], "0$1"], ["(\\d{2})(\\d{3,5})", "$1 $2", ["1|2(?:0[0-36-9]|12|29|[56])|3(?:1[0-689]|[24-6])|5(?:[0236-9]|1[2-4])|6(?:[013-59]|7[0-46-9])|(?:33|55|6[68])[0-69]|(?:29|3[09]|62)[0-79]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["29[013-9]|39|54"], "0$1"], ["(\\d{4})(\\d{3,5})", "$1 $2", ["(?:25|54)8", "258|5483"], "0$1"]], "0"]
  },
  "nonGeographic": {
    "800": ["800", 0, "[1-9]\\d{7}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[1-9]"]]], 0, 0, 0, 0, 0, 0, [0, 0, ["[1-9]\\d{7}"]]],
    "808": ["808", 0, "[1-9]\\d{7}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[1-9]"]]], 0, 0, 0, 0, 0, 0, [0, 0, 0, 0, 0, 0, 0, 0, 0, ["[1-9]\\d{7}"]]],
    "870": ["870", 0, "[35-7]\\d{8}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[35-7]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:[356]\\d|7[6-8])\\d{7}"]]],
    "878": ["878", 0, "10\\d{10}", [12], [["(\\d{2})(\\d{5})(\\d{5})", "$1 $2 $3", ["1"]]], 0, 0, 0, 0, 0, 0, [0, 0, 0, 0, 0, 0, 0, 0, ["10\\d{10}"]]],
    "881": ["881", 0, "[0-36-9]\\d{8}", [9], [["(\\d)(\\d{3})(\\d{5})", "$1 $2 $3", ["[0-36-9]"]]], 0, 0, 0, 0, 0, 0, [0, ["[0-36-9]\\d{8}"]]],
    "882": ["882", 0, "[13]\\d{6}(?:\\d{2,5})?|285\\d{9}|[19]\\d{7}", [7, 8, 9, 10, 11, 12], [["(\\d{2})(\\d{5})", "$1 $2", ["16|342"]], ["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["[19]"]], ["(\\d{2})(\\d{4})(\\d{3})", "$1 $2 $3", ["3[23]"]], ["(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["1"]], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["34[57]"]], ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["34"]], ["(\\d{2})(\\d{4,5})(\\d{5})", "$1 $2 $3", ["[1-3]"]]], 0, 0, 0, 0, 0, 0, [0, ["3(?:37\\d\\d|42)\\d{4}|3(?:2|47|7\\d{3})\\d{7}", [7, 9, 10, 12]], 0, 0, 0, 0, 0, 0, ["1(?:3(?:0[0347]|[13][0139]|2[035]|4[013568]|6[0459]|7[06]|8[15-8]|9[0689])\\d{4}|6\\d{5,10})|(?:(?:285\\d\\d|3(?:45|[69]\\d{3}))\\d|9[89])\\d{6}"]]],
    "883": ["883", 0, "51\\d{7}(?:\\d{3})?", [9, 12], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["510"]], ["(\\d{3})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["510"]], ["(\\d{4})(\\d{4})(\\d{4})", "$1 $2 $3", ["5"]]], 0, 0, 0, 0, 0, 0, [0, 0, 0, 0, 0, 0, 0, 0, ["51[013]0\\d{8}|5100\\d{5}"]]],
    "888": ["888", 0, "\\d{11}", [11], [["(\\d{3})(\\d{3})(\\d{5})", "$1 $2 $3"]], 0, 0, 0, 0, 0, 0, [0, 0, 0, 0, 0, 0, ["\\d{11}"]]],
    "979": ["979", 0, "[1359]\\d{8}", [9], [["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["[1359]"]]], 0, 0, 0, 0, 0, 0, [0, 0, 0, ["[1359]\\d{8}"]]]
  }
};

// The minimum length of the national significant number.
var MIN_LENGTH_FOR_NSN = 2; // The ITU says the maximum length should be 15,
// but one can find longer numbers in Germany.

var MAX_LENGTH_FOR_NSN = 17; // The maximum length of the country calling code.

var MAX_LENGTH_COUNTRY_CODE = 3; // Digits accepted in phone numbers
// (ascii, fullwidth, arabic-indic, and eastern arabic digits).

var VALID_DIGITS = "0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9"; // `DASHES` will be right after the opening square bracket of the "character class"

var DASHES = "-\u2010-\u2015\u2212\u30FC\uFF0D";
var SLASHES = "\uFF0F/";
var DOTS = "\uFF0E.";
var WHITESPACE = " \xA0\xAD\u200B\u2060\u3000";
var BRACKETS = "()\uFF08\uFF09\uFF3B\uFF3D\\[\\]"; // export const OPENING_BRACKETS = '(\uFF08\uFF3B\\\['

var TILDES = "~\u2053\u223C\uFF5E"; // Regular expression of acceptable punctuation found in phone numbers. This
// excludes punctuation found as a leading character only. This consists of dash
// characters, white space characters, full stops, slashes, square brackets,
// parentheses and tildes. Full-width variants are also present.

var VALID_PUNCTUATION = "".concat(DASHES).concat(SLASHES).concat(DOTS).concat(WHITESPACE).concat(BRACKETS).concat(TILDES);
var PLUS_CHARS = "+\uFF0B"; // const LEADING_PLUS_CHARS_PATTERN = new RegExp('^[' + PLUS_CHARS + ']+')

/**
 * Checks whether the entire input sequence can be matched
 * against the regular expression.
 * @return {boolean}
 */
function matchesEntirely(text, regular_expression) {
  // If assigning the `''` default value is moved to the arguments above,
  // code coverage would decrease for some weird reason.
  text = text || '';
  return new RegExp('^(?:' + regular_expression + ')$').test(text);
}
/**
 * Merges two arrays.
 * @param  {*} a
 * @param  {*} b
 * @return {*}
 */

function mergeArrays(a, b) {
  var merged = a.slice();

  for (var _iterator = b, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var element = _ref;

    if (a.indexOf(element) < 0) {
      merged.push(element);
    }
  }

  return merged.sort(function (a, b) {
    return a - b;
  }); // ES6 version, requires Set polyfill.
  // let merged = new Set(a)
  // for (const element of b)
  // {
  // 	merged.add(i)
  // }
  // return Array.from(merged).sort((a, b) => a - b)
}

function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
} // https://stackoverflow.com/a/46971044/970769


var ParseError = function ParseError(code) {
  _classCallCheck$1(this, ParseError);

  this.name = this.constructor.name;
  this.message = code;
  this.stack = new Error(code).stack;
};
ParseError.prototype = Object.create(Error.prototype);
ParseError.prototype.constructor = ParseError;

// Copy-pasted from:
// https://github.com/substack/semver-compare/blob/master/index.js
//
// Inlining this function because some users reported issues with
// importing from `semver-compare` in a browser with ES6 "native" modules.
//
// Fixes `semver-compare` not being able to compare versions with alpha/beta/etc "tags".
// https://github.com/catamphetamine/libphonenumber-js/issues/381
function compare (a, b) {
  a = a.split('-');
  b = b.split('-');
  var pa = a[0].split('.');
  var pb = b[0].split('.');

  for (var i = 0; i < 3; i++) {
    var na = Number(pa[i]);
    var nb = Number(pb[i]);
    if (na > nb) return 1;
    if (nb > na) return -1;
    if (!isNaN(na) && isNaN(nb)) return 1;
    if (isNaN(na) && !isNaN(nb)) return -1;
  }

  if (a[1] && b[1]) {
    return a[1] > b[1] ? 1 : a[1] < b[1] ? -1 : 0;
  }

  return !a[1] && b[1] ? 1 : a[1] && !b[1] ? -1 : 0;
}

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck$2(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties$1(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass$1(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$1(Constructor, staticProps);
  return Constructor;
}

var V3 = '1.2.0'; // Moved `001` country code to "nonGeographic" section of metadata.

var V4 = '1.7.35';
var DEFAULT_EXT_PREFIX = ' ext. ';
/**
 * See: https://gitlab.com/catamphetamine/libphonenumber-js/blob/master/METADATA.md
 */

var Metadata = /*#__PURE__*/function () {
  function Metadata(metadata) {
    _classCallCheck$2(this, Metadata);

    validateMetadata(metadata);
    this.metadata = metadata;
    setVersion.call(this, metadata);
  }

  _createClass$1(Metadata, [{
    key: "getCountries",
    value: function getCountries() {
      return Object.keys(this.metadata.countries).filter(function (_) {
        return _ !== '001';
      });
    }
  }, {
    key: "getCountryMetadata",
    value: function getCountryMetadata(countryCode) {
      return this.metadata.countries[countryCode];
    }
  }, {
    key: "nonGeographic",
    value: function nonGeographic() {
      if (this.v1 || this.v2 || this.v3) return; // `nonGeographical` was a typo.
      // It's present in metadata generated from `1.7.35` to `1.7.37`.

      return this.metadata.nonGeographic || this.metadata.nonGeographical;
    }
  }, {
    key: "hasCountry",
    value: function hasCountry(country) {
      return this.getCountryMetadata(country) !== undefined;
    }
  }, {
    key: "hasCallingCode",
    value: function hasCallingCode(callingCode) {
      if (this.getCountryCodesForCallingCode(callingCode)) {
        return true;
      }

      if (this.nonGeographic()) {
        if (this.nonGeographic()[callingCode]) {
          return true;
        }
      } else {
        // A hacky workaround for old custom metadata (generated before V4).
        var countryCodes = this.countryCallingCodes()[callingCode];

        if (countryCodes && countryCodes.length === 1 && countryCodes[0] === '001') {
          return true;
        }
      }
    }
  }, {
    key: "isNonGeographicCallingCode",
    value: function isNonGeographicCallingCode(callingCode) {
      if (this.nonGeographic()) {
        return this.nonGeographic()[callingCode] ? true : false;
      } else {
        return this.getCountryCodesForCallingCode(callingCode) ? false : true;
      }
    } // Deprecated.

  }, {
    key: "country",
    value: function country(countryCode) {
      return this.selectNumberingPlan(countryCode);
    }
  }, {
    key: "selectNumberingPlan",
    value: function selectNumberingPlan(countryCode, callingCode) {
      if (countryCode && countryCode !== '001') {
        if (!this.hasCountry(countryCode)) {
          throw new Error("Unknown country: ".concat(countryCode));
        }

        this.numberingPlan = new NumberingPlan(this.getCountryMetadata(countryCode), this);
      } else if (callingCode) {
        if (!this.hasCallingCode(callingCode)) {
          throw new Error("Unknown calling code: ".concat(callingCode));
        }

        this.numberingPlan = new NumberingPlan(this.getNumberingPlanMetadata(callingCode), this);
      } else {
        this.numberingPlan = undefined;
      }

      return this;
    }
  }, {
    key: "getCountryCodesForCallingCode",
    value: function getCountryCodesForCallingCode(callingCode) {
      var countryCodes = this.countryCallingCodes()[callingCode];

      if (countryCodes) {
        // Metadata before V4 included "non-geographic entity" calling codes
        // inside `country_calling_codes` (for example, `"881":["001"]`).
        // Now the semantics of `country_calling_codes` has changed:
        // it's specifically for "countries" now.
        // Older versions of custom metadata will simply skip parsing
        // "non-geographic entity" phone numbers with new versions
        // of this library: it's not considered a bug,
        // because such numbers are extremely rare,
        // and developers extremely rarely use custom metadata.
        if (countryCodes.length === 1 && countryCodes[0].length === 3) {
          return;
        }

        return countryCodes;
      }
    }
  }, {
    key: "getCountryCodeForCallingCode",
    value: function getCountryCodeForCallingCode(callingCode) {
      var countryCodes = this.getCountryCodesForCallingCode(callingCode);

      if (countryCodes) {
        return countryCodes[0];
      }
    }
  }, {
    key: "getNumberingPlanMetadata",
    value: function getNumberingPlanMetadata(callingCode) {
      var countryCode = this.getCountryCodeForCallingCode(callingCode);

      if (countryCode) {
        return this.getCountryMetadata(countryCode);
      }

      if (this.nonGeographic()) {
        var metadata = this.nonGeographic()[callingCode];

        if (metadata) {
          return metadata;
        }
      } else {
        // A hacky workaround for old custom metadata (generated before V4).
        var countryCodes = this.countryCallingCodes()[callingCode];

        if (countryCodes && countryCodes.length === 1 && countryCodes[0] === '001') {
          return this.metadata.countries['001'];
        }
      }
    } // Deprecated.

  }, {
    key: "countryCallingCode",
    value: function countryCallingCode() {
      return this.numberingPlan.callingCode();
    } // Deprecated.

  }, {
    key: "IDDPrefix",
    value: function IDDPrefix() {
      return this.numberingPlan.IDDPrefix();
    } // Deprecated.

  }, {
    key: "defaultIDDPrefix",
    value: function defaultIDDPrefix() {
      return this.numberingPlan.defaultIDDPrefix();
    } // Deprecated.

  }, {
    key: "nationalNumberPattern",
    value: function nationalNumberPattern() {
      return this.numberingPlan.nationalNumberPattern();
    } // Deprecated.

  }, {
    key: "possibleLengths",
    value: function possibleLengths() {
      return this.numberingPlan.possibleLengths();
    } // Deprecated.

  }, {
    key: "formats",
    value: function formats() {
      return this.numberingPlan.formats();
    } // Deprecated.

  }, {
    key: "nationalPrefixForParsing",
    value: function nationalPrefixForParsing() {
      return this.numberingPlan.nationalPrefixForParsing();
    } // Deprecated.

  }, {
    key: "nationalPrefixTransformRule",
    value: function nationalPrefixTransformRule() {
      return this.numberingPlan.nationalPrefixTransformRule();
    } // Deprecated.

  }, {
    key: "leadingDigits",
    value: function leadingDigits() {
      return this.numberingPlan.leadingDigits();
    } // Deprecated.

  }, {
    key: "hasTypes",
    value: function hasTypes() {
      return this.numberingPlan.hasTypes();
    } // Deprecated.

  }, {
    key: "type",
    value: function type(_type) {
      return this.numberingPlan.type(_type);
    } // Deprecated.

  }, {
    key: "ext",
    value: function ext() {
      return this.numberingPlan.ext();
    }
  }, {
    key: "countryCallingCodes",
    value: function countryCallingCodes() {
      if (this.v1) return this.metadata.country_phone_code_to_countries;
      return this.metadata.country_calling_codes;
    } // Deprecated.

  }, {
    key: "chooseCountryByCountryCallingCode",
    value: function chooseCountryByCountryCallingCode(callingCode) {
      this.selectNumberingPlan(null, callingCode);
    }
  }, {
    key: "hasSelectedNumberingPlan",
    value: function hasSelectedNumberingPlan() {
      return this.numberingPlan !== undefined;
    }
  }]);

  return Metadata;
}();

var NumberingPlan = /*#__PURE__*/function () {
  function NumberingPlan(metadata, globalMetadataObject) {
    _classCallCheck$2(this, NumberingPlan);

    this.globalMetadataObject = globalMetadataObject;
    this.metadata = metadata;
    setVersion.call(this, globalMetadataObject.metadata);
  }

  _createClass$1(NumberingPlan, [{
    key: "callingCode",
    value: function callingCode() {
      return this.metadata[0];
    } // Formatting information for regions which share
    // a country calling code is contained by only one region
    // for performance reasons. For example, for NANPA region
    // ("North American Numbering Plan Administration",
    //  which includes USA, Canada, Cayman Islands, Bahamas, etc)
    // it will be contained in the metadata for `US`.

  }, {
    key: "getDefaultCountryMetadataForRegion",
    value: function getDefaultCountryMetadataForRegion() {
      return this.globalMetadataObject.getNumberingPlanMetadata(this.callingCode());
    }
  }, {
    key: "IDDPrefix",
    value: function IDDPrefix() {
      if (this.v1 || this.v2) return;
      return this.metadata[1];
    }
  }, {
    key: "defaultIDDPrefix",
    value: function defaultIDDPrefix() {
      if (this.v1 || this.v2) return;
      return this.metadata[12];
    }
  }, {
    key: "nationalNumberPattern",
    value: function nationalNumberPattern() {
      if (this.v1 || this.v2) return this.metadata[1];
      return this.metadata[2];
    }
  }, {
    key: "possibleLengths",
    value: function possibleLengths() {
      if (this.v1) return;
      return this.metadata[this.v2 ? 2 : 3];
    }
  }, {
    key: "_getFormats",
    value: function _getFormats(metadata) {
      return metadata[this.v1 ? 2 : this.v2 ? 3 : 4];
    } // For countries of the same region (e.g. NANPA)
    // formats are all stored in the "main" country for that region.
    // E.g. "RU" and "KZ", "US" and "CA".

  }, {
    key: "formats",
    value: function formats() {
      var _this = this;

      var formats = this._getFormats(this.metadata) || this._getFormats(this.getDefaultCountryMetadataForRegion()) || [];
      return formats.map(function (_) {
        return new Format$1(_, _this);
      });
    }
  }, {
    key: "nationalPrefix",
    value: function nationalPrefix() {
      return this.metadata[this.v1 ? 3 : this.v2 ? 4 : 5];
    }
  }, {
    key: "_getNationalPrefixFormattingRule",
    value: function _getNationalPrefixFormattingRule(metadata) {
      return metadata[this.v1 ? 4 : this.v2 ? 5 : 6];
    } // For countries of the same region (e.g. NANPA)
    // national prefix formatting rule is stored in the "main" country for that region.
    // E.g. "RU" and "KZ", "US" and "CA".

  }, {
    key: "nationalPrefixFormattingRule",
    value: function nationalPrefixFormattingRule() {
      return this._getNationalPrefixFormattingRule(this.metadata) || this._getNationalPrefixFormattingRule(this.getDefaultCountryMetadataForRegion());
    }
  }, {
    key: "_nationalPrefixForParsing",
    value: function _nationalPrefixForParsing() {
      return this.metadata[this.v1 ? 5 : this.v2 ? 6 : 7];
    }
  }, {
    key: "nationalPrefixForParsing",
    value: function nationalPrefixForParsing() {
      // If `national_prefix_for_parsing` is not set explicitly,
      // then infer it from `national_prefix` (if any)
      return this._nationalPrefixForParsing() || this.nationalPrefix();
    }
  }, {
    key: "nationalPrefixTransformRule",
    value: function nationalPrefixTransformRule() {
      return this.metadata[this.v1 ? 6 : this.v2 ? 7 : 8];
    }
  }, {
    key: "_getNationalPrefixIsOptionalWhenFormatting",
    value: function _getNationalPrefixIsOptionalWhenFormatting() {
      return !!this.metadata[this.v1 ? 7 : this.v2 ? 8 : 9];
    } // For countries of the same region (e.g. NANPA)
    // "national prefix is optional when formatting" flag is
    // stored in the "main" country for that region.
    // E.g. "RU" and "KZ", "US" and "CA".

  }, {
    key: "nationalPrefixIsOptionalWhenFormattingInNationalFormat",
    value: function nationalPrefixIsOptionalWhenFormattingInNationalFormat() {
      return this._getNationalPrefixIsOptionalWhenFormatting(this.metadata) || this._getNationalPrefixIsOptionalWhenFormatting(this.getDefaultCountryMetadataForRegion());
    }
  }, {
    key: "leadingDigits",
    value: function leadingDigits() {
      return this.metadata[this.v1 ? 8 : this.v2 ? 9 : 10];
    }
  }, {
    key: "types",
    value: function types() {
      return this.metadata[this.v1 ? 9 : this.v2 ? 10 : 11];
    }
  }, {
    key: "hasTypes",
    value: function hasTypes() {
      // Versions 1.2.0 - 1.2.4: can be `[]`.

      /* istanbul ignore next */
      if (this.types() && this.types().length === 0) {
        return false;
      } // Versions <= 1.2.4: can be `undefined`.
      // Version >= 1.2.5: can be `0`.


      return !!this.types();
    }
  }, {
    key: "type",
    value: function type(_type2) {
      if (this.hasTypes() && getType(this.types(), _type2)) {
        return new Type(getType(this.types(), _type2), this);
      }
    }
  }, {
    key: "ext",
    value: function ext() {
      if (this.v1 || this.v2) return DEFAULT_EXT_PREFIX;
      return this.metadata[13] || DEFAULT_EXT_PREFIX;
    }
  }]);

  return NumberingPlan;
}();

var Format$1 = /*#__PURE__*/function () {
  function Format(format, metadata) {
    _classCallCheck$2(this, Format);

    this._format = format;
    this.metadata = metadata;
  }

  _createClass$1(Format, [{
    key: "pattern",
    value: function pattern() {
      return this._format[0];
    }
  }, {
    key: "format",
    value: function format() {
      return this._format[1];
    }
  }, {
    key: "leadingDigitsPatterns",
    value: function leadingDigitsPatterns() {
      return this._format[2] || [];
    }
  }, {
    key: "nationalPrefixFormattingRule",
    value: function nationalPrefixFormattingRule() {
      return this._format[3] || this.metadata.nationalPrefixFormattingRule();
    }
  }, {
    key: "nationalPrefixIsOptionalWhenFormattingInNationalFormat",
    value: function nationalPrefixIsOptionalWhenFormattingInNationalFormat() {
      return !!this._format[4] || this.metadata.nationalPrefixIsOptionalWhenFormattingInNationalFormat();
    }
  }, {
    key: "nationalPrefixIsMandatoryWhenFormattingInNationalFormat",
    value: function nationalPrefixIsMandatoryWhenFormattingInNationalFormat() {
      // National prefix is omitted if there's no national prefix formatting rule
      // set for this country, or when the national prefix formatting rule
      // contains no national prefix itself, or when this rule is set but
      // national prefix is optional for this phone number format
      // (and it is not enforced explicitly)
      return this.usesNationalPrefix() && !this.nationalPrefixIsOptionalWhenFormattingInNationalFormat();
    } // Checks whether national prefix formatting rule contains national prefix.

  }, {
    key: "usesNationalPrefix",
    value: function usesNationalPrefix() {
      return this.nationalPrefixFormattingRule() && // Check that national prefix formatting rule is not a "dummy" one.
      !FIRST_GROUP_ONLY_PREFIX_PATTERN.test(this.nationalPrefixFormattingRule()); // Previously, `FIRST_GROUP_ONLY_PREFIX_PATTERN` check was instead done via:
      // // Check that national prefix formatting rule is not a "dummy" one.
      // this.nationalPrefixFormattingRule() !== '$1' &&
      // // Check that national prefix formatting rule actually has national prefix digit(s).
      // // Filters out cases like "($1)".
      // // Is used in place of `libphonenumber`'s `FIRST_GROUP_ONLY_PREFIX_PATTERN_` regexp.
      // /\d/.test(this.nationalPrefixFormattingRule().replace('$1', ''))
    }
  }, {
    key: "internationalFormat",
    value: function internationalFormat() {
      return this._format[5] || this.format();
    }
  }]);

  return Format;
}();
/**
 * A pattern that is used to determine if the national prefix formatting rule
 * has the first group only, i.e., does not start with the national prefix.
 * Note that the pattern explicitly allows for unbalanced parentheses.
 */


var FIRST_GROUP_ONLY_PREFIX_PATTERN = /^\(?\$1\)?$/;

var Type = /*#__PURE__*/function () {
  function Type(type, metadata) {
    _classCallCheck$2(this, Type);

    this.type = type;
    this.metadata = metadata;
  }

  _createClass$1(Type, [{
    key: "pattern",
    value: function pattern() {
      if (this.metadata.v1) return this.type;
      return this.type[0];
    }
  }, {
    key: "possibleLengths",
    value: function possibleLengths() {
      if (this.metadata.v1) return;
      return this.type[1] || this.metadata.possibleLengths();
    }
  }]);

  return Type;
}();

function getType(types, type) {
  switch (type) {
    case 'FIXED_LINE':
      return types[0];

    case 'MOBILE':
      return types[1];

    case 'TOLL_FREE':
      return types[2];

    case 'PREMIUM_RATE':
      return types[3];

    case 'PERSONAL_NUMBER':
      return types[4];

    case 'VOICEMAIL':
      return types[5];

    case 'UAN':
      return types[6];

    case 'PAGER':
      return types[7];

    case 'VOIP':
      return types[8];

    case 'SHARED_COST':
      return types[9];
  }
}

function validateMetadata(metadata) {
  if (!metadata) {
    throw new Error('[libphonenumber-js] `metadata` argument not passed. Check your arguments.');
  } // `country_phone_code_to_countries` was renamed to
  // `country_calling_codes` in `1.0.18`.


  if (!is_object(metadata) || !is_object(metadata.countries)) {
    throw new Error("[libphonenumber-js] `metadata` argument was passed but it's not a valid metadata. Must be an object having `.countries` child object property. Got ".concat(is_object(metadata) ? 'an object of shape: { ' + Object.keys(metadata).join(', ') + ' }' : 'a ' + type_of(metadata) + ': ' + metadata, "."));
  }
} // Babel transforms `typeof` into some "branches"
// so istanbul will show this as "branch not covered".

/* istanbul ignore next */

var is_object = function is_object(_) {
  return _typeof(_) === 'object';
}; // Babel transforms `typeof` into some "branches"
// so istanbul will show this as "branch not covered".

/* istanbul ignore next */


var type_of = function type_of(_) {
  return _typeof(_);
};
/**
 * Returns "country calling code" for a country.
 * Throws an error if the country doesn't exist or isn't supported by this library.
 * @param  {string} country
 * @param  {object} metadata
 * @return {string}
 * @example
 * // Returns "44"
 * getCountryCallingCode("GB")
 */

function getCountryCallingCode(country, metadata) {
  metadata = new Metadata(metadata);

  if (metadata.hasCountry(country)) {
    return metadata.country(country).countryCallingCode();
  }

  throw new Error("Unknown country: ".concat(country));
}
function isSupportedCountry(country, metadata) {
  // metadata = new Metadata(metadata)
  // return metadata.hasCountry(country)
  return metadata.countries[country] !== undefined;
}

function setVersion(metadata) {
  this.v1 = !metadata.version;
  this.v2 = metadata.version !== undefined && compare(metadata.version, V3) === -1;
  this.v3 = metadata.version !== undefined && compare(metadata.version, V4) === -1;
  this.v4 = metadata.version !== undefined; // && compare(metadata.version, V5) === -1
} // const ISO_COUNTRY_CODE = /^[A-Z]{2}$/
// function isCountryCode(countryCode) {
// 	return ISO_COUNTRY_CODE.test(countryCodeOrCountryCallingCode)
// }

var RFC3966_EXTN_PREFIX = ';ext='; // Pattern to capture digits used in an extension.
// Places a maximum length of '7' for an extension.

var CAPTURING_EXTN_DIGITS = '([' + VALID_DIGITS + ']{1,7})';
/**
 * Regexp of all possible ways to write extensions, for use when parsing. This
 * will be run as a case-insensitive regexp match. Wide character versions are
 * also provided after each ASCII version. There are three regular expressions
 * here. The first covers RFC 3966 format, where the extension is added using
 * ';ext='. The second more generic one starts with optional white space and
 * ends with an optional full stop (.), followed by zero or more spaces/tabs
 * /commas and then the numbers themselves. The other one covers the special
 * case of American numbers where the extension is written with a hash at the
 * end, such as '- 503#'. Note that the only capturing groups should be around
 * the digits that you want to capture as part of the extension, or else parsing
 * will fail! We allow two options for representing the accented o - the
 * character itself, and one in the unicode decomposed form with the combining
 * acute accent.
 */

function create_extension_pattern(purpose) {
  // One-character symbols that can be used to indicate an extension.
  var single_extension_characters = "x\uFF58#\uFF03~\uFF5E";

  switch (purpose) {
    // For parsing, we are slightly more lenient in our interpretation than for matching. Here we
    // allow "comma" and "semicolon" as possible extension indicators. When matching, these are
    case 'parsing':
      single_extension_characters = ',;' + single_extension_characters;
  }

  return RFC3966_EXTN_PREFIX + CAPTURING_EXTN_DIGITS + '|' + "[ \xA0\\t,]*" + "(?:e?xt(?:ensi(?:o\u0301?|\xF3))?n?|\uFF45?\uFF58\uFF54\uFF4E?|" + // "доб."
  "\u0434\u043E\u0431|" + '[' + single_extension_characters + "]|int|anexo|\uFF49\uFF4E\uFF54)" + "[:\\.\uFF0E]?[ \xA0\\t,-]*" + CAPTURING_EXTN_DIGITS + '#?|' + '[- ]+([' + VALID_DIGITS + ']{1,5})#';
}
/**
 * Regexp of all possible ways to write extensions, for use when parsing. This
 * will be run as a case-insensitive regexp match. Wide character versions are
 * also provided after each ASCII version. There are three regular expressions
 * here. The first covers RFC 3966 format, where the extension is added using
 * ';ext='. The second more generic one starts with optional white space and
 * ends with an optional full stop (.), followed by zero or more spaces/tabs
 * /commas and then the numbers themselves. The other one covers the special
 * case of American numbers where the extension is written with a hash at the
 * end, such as '- 503#'. Note that the only capturing groups should be around
 * the digits that you want to capture as part of the extension, or else parsing
 * will fail! We allow two options for representing the accented o - the
 * character itself, and one in the unicode decomposed form with the combining
 * acute accent.
 */


var EXTN_PATTERNS_FOR_PARSING = create_extension_pattern('parsing');
var EXTN_PATTERNS_FOR_MATCHING = create_extension_pattern('matching'); // Regexp of all known extension prefixes used by different regions followed by
// 1 or more valid digits, for use when parsing.

var EXTN_PATTERN = new RegExp('(?:' + EXTN_PATTERNS_FOR_PARSING + ')$', 'i'); // Strips any extension (as in, the part of the number dialled after the call is
// connected, usually indicated with extn, ext, x or similar) from the end of
// the number, and returns it.

function extractExtension(number) {
  var start = number.search(EXTN_PATTERN);

  if (start < 0) {
    return {};
  } // If we find a potential extension, and the number preceding this is a viable
  // number, we assume it is an extension.


  var number_without_extension = number.slice(0, start);
  var matches = number.match(EXTN_PATTERN);
  var i = 1;

  while (i < matches.length) {
    if (matches[i] != null && matches[i].length > 0) {
      return {
        number: number_without_extension,
        ext: matches[i]
      };
    }

    i++;
  }
}

//  Checks we have at least three leading digits, and only valid punctuation,
//  alpha characters and digits in the phone number. Does not include extension
//  data. The symbol 'x' is allowed here as valid punctuation since it is often
//  used as a placeholder for carrier codes, for example in Brazilian phone
//  numbers. We also allow multiple '+' characters at the start.
//
//  Corresponds to the following:
//  [digits]{minLengthNsn}|
//  plus_sign*
//  (([punctuation]|[star])*[digits]){3,}([punctuation]|[star]|[digits]|[alpha])*
//
//  The first reg-ex is to allow short numbers (two digits long) to be parsed if
//  they are entered as "15" etc, but only if there is no punctuation in them.
//  The second expression restricts the number of digits to three or more, but
//  then allows them to be in international form, and to have alpha-characters
//  and punctuation. We split up the two reg-exes here and combine them when
//  creating the reg-ex VALID_PHONE_NUMBER_PATTERN itself so we can prefix it
//  with ^ and append $ to each branch.
//
//  "Note VALID_PUNCTUATION starts with a -,
//   so must be the first in the range" (c) Google devs.
//  (wtf did they mean by saying that; probably nothing)
//

var MIN_LENGTH_PHONE_NUMBER_PATTERN = '[' + VALID_DIGITS + ']{' + MIN_LENGTH_FOR_NSN + '}'; //
// And this is the second reg-exp:
// (see MIN_LENGTH_PHONE_NUMBER_PATTERN for a full description of this reg-exp)
//

var VALID_PHONE_NUMBER = '[' + PLUS_CHARS + ']{0,1}' + '(?:' + '[' + VALID_PUNCTUATION + ']*' + '[' + VALID_DIGITS + ']' + '){3,}' + '[' + VALID_PUNCTUATION + VALID_DIGITS + ']*'; // The combined regular expression for valid phone numbers:
//

var VALID_PHONE_NUMBER_PATTERN = new RegExp( // Either a short two-digit-only phone number
'^' + MIN_LENGTH_PHONE_NUMBER_PATTERN + '$' + '|' + // Or a longer fully parsed phone number (min 3 characters)
'^' + VALID_PHONE_NUMBER + // Phone number extensions
'(?:' + EXTN_PATTERNS_FOR_PARSING + ')?' + '$', 'i'); // Checks to see if the string of characters could possibly be a phone number at
// all. At the moment, checks to see that the string begins with at least 2
// digits, ignoring any punctuation commonly found in phone numbers. This method
// does not require the number to be normalized in advance - but does assume
// that leading non-number symbols have been removed, such as by the method
// `extract_possible_number`.
//

function isViablePhoneNumber(number) {
  return number.length >= MIN_LENGTH_FOR_NSN && VALID_PHONE_NUMBER_PATTERN.test(number);
}

// These mappings map a character (key) to a specific digit that should
// replace it for normalization purposes. Non-European digits that
// may be used in phone numbers are mapped to a European equivalent.
//
// E.g. in Iraq they don't write `+442323234` but rather `+٤٤٢٣٢٣٢٣٤`.
//
var DIGITS = {
  '0': '0',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  "\uFF10": '0',
  // Fullwidth digit 0
  "\uFF11": '1',
  // Fullwidth digit 1
  "\uFF12": '2',
  // Fullwidth digit 2
  "\uFF13": '3',
  // Fullwidth digit 3
  "\uFF14": '4',
  // Fullwidth digit 4
  "\uFF15": '5',
  // Fullwidth digit 5
  "\uFF16": '6',
  // Fullwidth digit 6
  "\uFF17": '7',
  // Fullwidth digit 7
  "\uFF18": '8',
  // Fullwidth digit 8
  "\uFF19": '9',
  // Fullwidth digit 9
  "\u0660": '0',
  // Arabic-indic digit 0
  "\u0661": '1',
  // Arabic-indic digit 1
  "\u0662": '2',
  // Arabic-indic digit 2
  "\u0663": '3',
  // Arabic-indic digit 3
  "\u0664": '4',
  // Arabic-indic digit 4
  "\u0665": '5',
  // Arabic-indic digit 5
  "\u0666": '6',
  // Arabic-indic digit 6
  "\u0667": '7',
  // Arabic-indic digit 7
  "\u0668": '8',
  // Arabic-indic digit 8
  "\u0669": '9',
  // Arabic-indic digit 9
  "\u06F0": '0',
  // Eastern-Arabic digit 0
  "\u06F1": '1',
  // Eastern-Arabic digit 1
  "\u06F2": '2',
  // Eastern-Arabic digit 2
  "\u06F3": '3',
  // Eastern-Arabic digit 3
  "\u06F4": '4',
  // Eastern-Arabic digit 4
  "\u06F5": '5',
  // Eastern-Arabic digit 5
  "\u06F6": '6',
  // Eastern-Arabic digit 6
  "\u06F7": '7',
  // Eastern-Arabic digit 7
  "\u06F8": '8',
  // Eastern-Arabic digit 8
  "\u06F9": '9' // Eastern-Arabic digit 9

};
function parseDigit(character) {
  return DIGITS[character];
}
/**
 * Parses phone number digits from a string.
 * Drops all punctuation leaving only digits.
 * Also converts wide-ascii and arabic-indic numerals to conventional numerals.
 * E.g. in Iraq they don't write `+442323234` but rather `+٤٤٢٣٢٣٢٣٤`.
 * @param  {string} string
 * @return {string}
 * @example
 * ```js
 * parseDigits('8 (800) 555')
 * // Outputs '8800555'.
 * ```
 */

function parseDigits(string) {
  var result = ''; // Using `.split('')` here instead of normal `for ... of`
  // because the importing application doesn't neccessarily include an ES6 polyfill.
  // The `.split('')` approach discards "exotic" UTF-8 characters
  // (the ones consisting of four bytes) but digits
  // (including non-European ones) don't fall into that range
  // so such "exotic" characters would be discarded anyway.

  for (var _iterator = string.split(''), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var character = _ref;
    var digit = parseDigit(character);

    if (digit) {
      result += digit;
    }
  }

  return result;
}

/**
 * Parses phone number characters from a string.
 * Drops all punctuation leaving only digits and the leading `+` sign (if any).
 * Also converts wide-ascii and arabic-indic numerals to conventional numerals.
 * E.g. in Iraq they don't write `+442323234` but rather `+٤٤٢٣٢٣٢٣٤`.
 * @param  {string} string
 * @return {string}
 * @example
 * ```js
 * // Outputs '8800555'.
 * parseIncompletePhoneNumber('8 (800) 555')
 * // Outputs '+7800555'.
 * parseIncompletePhoneNumber('+7 800 555')
 * ```
 */

function parseIncompletePhoneNumber(string) {
  var result = ''; // Using `.split('')` here instead of normal `for ... of`
  // because the importing application doesn't neccessarily include an ES6 polyfill.
  // The `.split('')` approach discards "exotic" UTF-8 characters
  // (the ones consisting of four bytes) but digits
  // (including non-European ones) don't fall into that range
  // so such "exotic" characters would be discarded anyway.

  for (var _iterator = string.split(''), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var character = _ref;
    result += parsePhoneNumberCharacter(character, result) || '';
  }

  return result;
}
/**
 * `input-format` `parse()` function.
 * https://gitlab.com/catamphetamine/input-format
 * @param  {string} character - Yet another character from raw input string.
 * @param  {string} value - The value parsed so far.
 * @param  {object} meta - Optional custom use-case-specific metadata.
 * @return {string?} The parsed character.
 */

function parsePhoneNumberCharacter(character, value) {
  // Only allow a leading `+`.
  if (character === '+') {
    // If this `+` is not the first parsed character
    // then discard it.
    if (value) {
      return;
    }

    return '+';
  } // Allow digits.


  return parseDigit(character);
}

var NON_FIXED_LINE_PHONE_TYPES = ['MOBILE', 'PREMIUM_RATE', 'TOLL_FREE', 'SHARED_COST', 'VOIP', 'PERSONAL_NUMBER', 'PAGER', 'UAN', 'VOICEMAIL']; // Finds out national phone number type (fixed line, mobile, etc)

function getNumberType(input, options, metadata) {
  // If assigning the `{}` default value is moved to the arguments above,
  // code coverage would decrease for some weird reason.
  options = options || {}; // When `parse()` returned `{}`
  // meaning that the phone number is not a valid one.

  if (!input.country) {
    return;
  }

  metadata = new Metadata(metadata);
  metadata.selectNumberingPlan(input.country, input.countryCallingCode);
  var nationalNumber = options.v2 ? input.nationalNumber : input.phone; // The following is copy-pasted from the original function:
  // https://github.com/googlei18n/libphonenumber/blob/3ea547d4fbaa2d0b67588904dfa5d3f2557c27ff/javascript/i18n/phonenumbers/phonenumberutil.js#L2835
  // Is this national number even valid for this country

  if (!matchesEntirely(nationalNumber, metadata.nationalNumberPattern())) {
    return;
  } // Is it fixed line number


  if (is_of_type(nationalNumber, 'FIXED_LINE', metadata)) {
    // Because duplicate regular expressions are removed
    // to reduce metadata size, if "mobile" pattern is ""
    // then it means it was removed due to being a duplicate of the fixed-line pattern.
    //
    if (metadata.type('MOBILE') && metadata.type('MOBILE').pattern() === '') {
      return 'FIXED_LINE_OR_MOBILE';
    } // v1 metadata.
    // Legacy.
    // Deprecated.


    if (!metadata.type('MOBILE')) {
      return 'FIXED_LINE_OR_MOBILE';
    } // Check if the number happens to qualify as both fixed line and mobile.
    // (no such country in the minimal metadata set)

    /* istanbul ignore if */


    if (is_of_type(nationalNumber, 'MOBILE', metadata)) {
      return 'FIXED_LINE_OR_MOBILE';
    }

    return 'FIXED_LINE';
  }

  for (var _i = 0, _NON_FIXED_LINE_PHONE = NON_FIXED_LINE_PHONE_TYPES; _i < _NON_FIXED_LINE_PHONE.length; _i++) {
    var _type = _NON_FIXED_LINE_PHONE[_i];

    if (is_of_type(nationalNumber, _type, metadata)) {
      return _type;
    }
  }
}
function is_of_type(nationalNumber, type, metadata) {
  type = metadata.type(type);

  if (!type || !type.pattern()) {
    return false;
  } // Check if any possible number lengths are present;
  // if so, we use them to avoid checking
  // the validation pattern if they don't match.
  // If they are absent, this means they match
  // the general description, which we have
  // already checked before a specific number type.


  if (type.possibleLengths() && type.possibleLengths().indexOf(nationalNumber.length) < 0) {
    return false;
  }

  return matchesEntirely(nationalNumber, type.pattern());
} // Should only be called for the "new" metadata which has "possible lengths".

function checkNumberLengthForType(nationalNumber, type, metadata) {
  var type_info = metadata.type(type); // There should always be "<possiblePengths/>" set for every type element.
  // This is declared in the XML schema.
  // For size efficiency, where a sub-description (e.g. fixed-line)
  // has the same "<possiblePengths/>" as the "general description", this is missing,
  // so we fall back to the "general description". Where no numbers of the type
  // exist at all, there is one possible length (-1) which is guaranteed
  // not to match the length of any real phone number.

  var possible_lengths = type_info && type_info.possibleLengths() || metadata.possibleLengths(); // let local_lengths    = type_info && type.possibleLengthsLocal() || metadata.possibleLengthsLocal()
  // Metadata before version `1.0.18` didn't contain `possible_lengths`.

  if (!possible_lengths) {
    return 'IS_POSSIBLE';
  }

  if (type === 'FIXED_LINE_OR_MOBILE') {
    // No such country in metadata.

    /* istanbul ignore next */
    if (!metadata.type('FIXED_LINE')) {
      // The rare case has been encountered where no fixedLine data is available
      // (true for some non-geographic entities), so we just check mobile.
      return checkNumberLengthForType(nationalNumber, 'MOBILE', metadata);
    }

    var mobile_type = metadata.type('MOBILE');

    if (mobile_type) {
      // Merge the mobile data in if there was any. "Concat" creates a new
      // array, it doesn't edit possible_lengths in place, so we don't need a copy.
      // Note that when adding the possible lengths from mobile, we have
      // to again check they aren't empty since if they are this indicates
      // they are the same as the general desc and should be obtained from there.
      possible_lengths = mergeArrays(possible_lengths, mobile_type.possibleLengths()); // The current list is sorted; we need to merge in the new list and
      // re-sort (duplicates are okay). Sorting isn't so expensive because
      // the lists are very small.
      // if (local_lengths)
      // {
      // 	local_lengths = mergeArrays(local_lengths, mobile_type.possibleLengthsLocal())
      // }
      // else
      // {
      // 	local_lengths = mobile_type.possibleLengthsLocal()
      // }
    }
  } // If the type doesn't exist then return 'INVALID_LENGTH'.
  else if (type && !type_info) {
      return 'INVALID_LENGTH';
    }

  var actual_length = nationalNumber.length; // In `libphonenumber-js` all "local-only" formats are dropped for simplicity.
  // // This is safe because there is never an overlap beween the possible lengths
  // // and the local-only lengths; this is checked at build time.
  // if (local_lengths && local_lengths.indexOf(nationalNumber.length) >= 0)
  // {
  // 	return 'IS_POSSIBLE_LOCAL_ONLY'
  // }

  var minimum_length = possible_lengths[0];

  if (minimum_length === actual_length) {
    return 'IS_POSSIBLE';
  }

  if (minimum_length > actual_length) {
    return 'TOO_SHORT';
  }

  if (possible_lengths[possible_lengths.length - 1] < actual_length) {
    return 'TOO_LONG';
  } // We skip the first element since we've already checked it.


  return possible_lengths.indexOf(actual_length, 1) >= 0 ? 'IS_POSSIBLE' : 'INVALID_LENGTH';
}

function isPossiblePhoneNumber(input, options, metadata) {
  /* istanbul ignore if */
  if (options === undefined) {
    options = {};
  }

  metadata = new Metadata(metadata);

  if (options.v2) {
    if (!input.countryCallingCode) {
      throw new Error('Invalid phone number object passed');
    }

    metadata.chooseCountryByCountryCallingCode(input.countryCallingCode);
  } else {
    if (!input.phone) {
      return false;
    }

    if (input.country) {
      if (!metadata.hasCountry(input.country)) {
        throw new Error("Unknown country: ".concat(input.country));
      }

      metadata.country(input.country);
    } else {
      if (!input.countryCallingCode) {
        throw new Error('Invalid phone number object passed');
      }

      metadata.chooseCountryByCountryCallingCode(input.countryCallingCode);
    }
  }

  if (metadata.possibleLengths()) {
    return isPossibleNumber(input.phone || input.nationalNumber, undefined, metadata);
  } else {
    // There was a bug between `1.7.35` and `1.7.37` where "possible_lengths"
    // were missing for "non-geographical" numbering plans.
    // Just assume the number is possible in such cases:
    // it's unlikely that anyone generated their custom metadata
    // in that short period of time (one day).
    // This code can be removed in some future major version update.
    if (input.countryCallingCode && metadata.isNonGeographicCallingCode(input.countryCallingCode)) {
      // "Non-geographic entities" did't have `possibleLengths`
      // due to a bug in metadata generation process.
      return true;
    } else {
      throw new Error('Missing "possibleLengths" in metadata. Perhaps the metadata has been generated before v1.0.18.');
    }
  }
}
function isPossibleNumber(nationalNumber, isInternational, metadata) {
  switch (checkNumberLengthForType(nationalNumber, undefined, metadata)) {
    case 'IS_POSSIBLE':
      return true;
    // case 'IS_POSSIBLE_LOCAL_ONLY':
    // 	return !isInternational

    default:
      return false;
  }
}

var CAPTURING_DIGIT_PATTERN = new RegExp('([' + VALID_DIGITS + '])');
/**
 * Pattern that makes it easy to distinguish whether a region has a single
 * international dialing prefix or not. If a region has a single international
 * prefix (e.g. 011 in USA), it will be represented as a string that contains
 * a sequence of ASCII digits, and possibly a tilde, which signals waiting for
 * the tone. If there are multiple available international prefixes in a
 * region, they will be represented as a regex string that always contains one
 * or more characters that are not ASCII digits or a tilde.
 */

var SINGLE_IDD_PREFIX = /^[\d]+(?:[~\u2053\u223C\uFF5E][\d]+)?$/; // For regions that have multiple IDD prefixes
// a preferred IDD prefix is returned.

function getIDDPrefix(country, callingCode, metadata) {
  var countryMetadata = new Metadata(metadata);
  countryMetadata.selectNumberingPlan(country, callingCode);

  if (SINGLE_IDD_PREFIX.test(countryMetadata.IDDPrefix())) {
    return countryMetadata.IDDPrefix();
  }

  return countryMetadata.defaultIDDPrefix();
}
function stripIDDPrefix(number, country, callingCode, metadata) {
  if (!country) {
    return;
  } // Check if the number is IDD-prefixed.


  var countryMetadata = new Metadata(metadata);
  countryMetadata.selectNumberingPlan(country, callingCode);
  var IDDPrefixPattern = new RegExp(countryMetadata.IDDPrefix());

  if (number.search(IDDPrefixPattern) !== 0) {
    return;
  } // Strip IDD prefix.


  number = number.slice(number.match(IDDPrefixPattern)[0].length); // Some kind of a weird edge case.
  // No explanation from Google given.

  var matchedGroups = number.match(CAPTURING_DIGIT_PATTERN);
  /* istanbul ignore next */

  if (matchedGroups && matchedGroups[1] != null && matchedGroups[1].length > 0) {
    if (matchedGroups[1] === '0') {
      return;
    }
  }

  return number;
}

function _slicedToArray$1(arr, i) {
  return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _nonIterableRest$1();
}

function _nonIterableRest$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _iterableToArrayLimit$1(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayWithHoles$1(arr) {
  if (Array.isArray(arr)) return arr;
}

/**
 * @param  {string} text - Phone URI (RFC 3966).
 * @return {object} `{ ?number, ?ext }`.
 */

function parseRFC3966(text) {
  var number;
  var ext; // Replace "tel:" with "tel=" for parsing convenience.

  text = text.replace(/^tel:/, 'tel=');

  for (var _iterator = text.split(';'), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var part = _ref;

    var _part$split = part.split('='),
        _part$split2 = _slicedToArray$1(_part$split, 2),
        name = _part$split2[0],
        value = _part$split2[1];

    switch (name) {
      case 'tel':
        number = value;
        break;

      case 'ext':
        ext = value;
        break;

      case 'phone-context':
        // Only "country contexts" are supported.
        // "Domain contexts" are ignored.
        if (value[0] === '+') {
          number = value + number;
        }

        break;
    }
  } // If the phone number is not viable, then abort.


  if (!isViablePhoneNumber(number)) {
    return {};
  }

  var result = {
    number: number
  };

  if (ext) {
    result.ext = ext;
  }

  return result;
}
/**
 * @param  {object} - `{ ?number, ?extension }`.
 * @return {string} Phone URI (RFC 3966).
 */

function formatRFC3966(_ref2) {
  var number = _ref2.number,
      ext = _ref2.ext;

  if (!number) {
    return '';
  }

  if (number[0] !== '+') {
    throw new Error("\"formatRFC3966()\" expects \"number\" to be in E.164 format.");
  }

  return "tel:".concat(number).concat(ext ? ';ext=' + ext : '');
}

/**
 * Checks if a given phone number is valid.
 *
 * If the `number` is a string, it will be parsed to an object,
 * but only if it contains only valid phone number characters (including punctuation).
 * If the `number` is an object, it is used as is.
 *
 * The optional `defaultCountry` argument is the default country.
 * I.e. it does not restrict to just that country,
 * e.g. in those cases where several countries share
 * the same phone numbering rules (NANPA, Britain, etc).
 * For example, even though the number `07624 369230`
 * belongs to the Isle of Man ("IM" country code)
 * calling `isValidNumber('07624369230', 'GB', metadata)`
 * still returns `true` because the country is not restricted to `GB`,
 * it's just that `GB` is the default one for the phone numbering rules.
 * For restricting the country see `isValidNumberForRegion()`
 * though restricting a country might not be a good idea.
 * https://github.com/googlei18n/libphonenumber/blob/master/FAQ.md#when-should-i-use-isvalidnumberforregion
 *
 * Examples:
 *
 * ```js
 * isValidNumber('+78005553535', metadata)
 * isValidNumber('8005553535', 'RU', metadata)
 * isValidNumber('88005553535', 'RU', metadata)
 * isValidNumber({ phone: '8005553535', country: 'RU' }, metadata)
 * ```
 */

function isValidNumber(input, options, metadata) {
  // If assigning the `{}` default value is moved to the arguments above,
  // code coverage would decrease for some weird reason.
  options = options || {};
  metadata = new Metadata(metadata); // This is just to support `isValidNumber({})`
  // for cases when `parseNumber()` returns `{}`.

  if (!input.country) {
    return false;
  }

  metadata.selectNumberingPlan(input.country, input.countryCallingCode); // By default, countries only have type regexps when it's required for
  // distinguishing different countries having the same `countryCallingCode`.

  if (metadata.hasTypes()) {
    return getNumberType(input, options, metadata.metadata) !== undefined;
  } // If there are no type regexps for this country in metadata then use
  // `nationalNumberPattern` as a "better than nothing" replacement.


  var national_number = options.v2 ? input.nationalNumber : input.phone;
  return matchesEntirely(national_number, metadata.nationalNumberPattern());
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty$1(target, key, source[key]);
    });
  }

  return target;
}

function _defineProperty$1(obj, key, value) {
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
} // This is a port of Google Android `libphonenumber`'s
var DEFAULT_OPTIONS = {
  formatExtension: function formatExtension(formattedNumber, extension, metadata) {
    return "".concat(formattedNumber).concat(metadata.ext()).concat(extension);
  } // Formats a phone number
  //
  // Example use cases:
  //
  // ```js
  // formatNumber('8005553535', 'RU', 'INTERNATIONAL')
  // formatNumber('8005553535', 'RU', 'INTERNATIONAL', metadata)
  // formatNumber({ phone: '8005553535', country: 'RU' }, 'INTERNATIONAL')
  // formatNumber({ phone: '8005553535', country: 'RU' }, 'INTERNATIONAL', metadata)
  // formatNumber('+78005553535', 'NATIONAL')
  // formatNumber('+78005553535', 'NATIONAL', metadata)
  // ```
  //

};
function formatNumber$1(input, format, options, metadata) {
  // Apply default options.
  if (options) {
    options = _objectSpread({}, DEFAULT_OPTIONS, options);
  } else {
    options = DEFAULT_OPTIONS;
  }

  metadata = new Metadata(metadata);

  if (input.country && input.country !== '001') {
    // Validate `input.country`.
    if (!metadata.hasCountry(input.country)) {
      throw new Error("Unknown country: ".concat(input.country));
    }

    metadata.country(input.country);
  } else if (input.countryCallingCode) {
    metadata.chooseCountryByCountryCallingCode(input.countryCallingCode);
  } else return input.phone || '';

  var countryCallingCode = metadata.countryCallingCode();
  var nationalNumber = options.v2 ? input.nationalNumber : input.phone; // This variable should have been declared inside `case`s
  // but Babel has a bug and it says "duplicate variable declaration".

  var number;

  switch (format) {
    case 'NATIONAL':
      // Legacy argument support.
      // (`{ country: ..., phone: '' }`)
      if (!nationalNumber) {
        return '';
      }

      number = formatNationalNumber(nationalNumber, 'NATIONAL', metadata, options);
      return addExtension(number, input.ext, metadata, options.formatExtension);

    case 'INTERNATIONAL':
      // Legacy argument support.
      // (`{ country: ..., phone: '' }`)
      if (!nationalNumber) {
        return "+".concat(countryCallingCode);
      }

      number = formatNationalNumber(nationalNumber, 'INTERNATIONAL', metadata, options);
      number = "+".concat(countryCallingCode, " ").concat(number);
      return addExtension(number, input.ext, metadata, options.formatExtension);

    case 'E.164':
      // `E.164` doesn't define "phone number extensions".
      return "+".concat(countryCallingCode).concat(nationalNumber);

    case 'RFC3966':
      return formatRFC3966({
        number: "+".concat(countryCallingCode).concat(nationalNumber),
        ext: input.ext
      });

    case 'IDD':
      if (!options.fromCountry) {
        return; // throw new Error('`fromCountry` option not passed for IDD-prefixed formatting.')
      }

      var IDDPrefix = getIDDPrefix(options.fromCountry, undefined, metadata.metadata);

      if (!IDDPrefix) {
        return;
      }

      if (options.humanReadable) {
        var formattedForSameCountryCallingCode = countryCallingCode && formatIDDSameCountryCallingCodeNumber(nationalNumber, metadata.countryCallingCode(), options.fromCountry, metadata, options);

        if (formattedForSameCountryCallingCode) {
          number = formattedForSameCountryCallingCode;
        } else {
          number = "".concat(IDDPrefix, " ").concat(countryCallingCode, " ").concat(formatNationalNumber(nationalNumber, 'INTERNATIONAL', metadata, options));
        }

        return addExtension(number, input.ext, metadata, options.formatExtension);
      }

      return "".concat(IDDPrefix).concat(countryCallingCode).concat(nationalNumber);

    default:
      throw new Error("Unknown \"format\" argument passed to \"formatNumber()\": \"".concat(format, "\""));
  }
} // This was originally set to $1 but there are some countries for which the
// first group is not used in the national pattern (e.g. Argentina) so the $1
// group does not match correctly.  Therefore, we use \d, so that the first
// group actually used in the pattern will be matched.

var FIRST_GROUP_PATTERN = /(\$\d)/;
function formatNationalNumberUsingFormat(number, format, useInternationalSeparator, useNationalPrefixFormattingRule, metadata) {
  var formattedNumber = number.replace(new RegExp(format.pattern()), useInternationalSeparator ? format.internationalFormat() : useNationalPrefixFormattingRule && format.nationalPrefixFormattingRule() ? format.format().replace(FIRST_GROUP_PATTERN, format.nationalPrefixFormattingRule()) : format.format());

  if (useInternationalSeparator) {
    return applyInternationalSeparatorStyle(formattedNumber);
  }

  return formattedNumber;
}

function formatNationalNumber(number, formatAs, metadata, options) {
  var format = chooseFormatForNumber(metadata.formats(), number);

  if (!format) {
    return number;
  }

  return formatNationalNumberUsingFormat(number, format, formatAs === 'INTERNATIONAL', format.nationalPrefixIsOptionalWhenFormattingInNationalFormat() && options.nationalPrefix === false ? false : true);
}

function chooseFormatForNumber(availableFormats, nationalNnumber) {
  for (var _iterator = availableFormats, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var format = _ref; // Validate leading digits

    if (format.leadingDigitsPatterns().length > 0) {
      // The last leading_digits_pattern is used here, as it is the most detailed
      var lastLeadingDigitsPattern = format.leadingDigitsPatterns()[format.leadingDigitsPatterns().length - 1]; // If leading digits don't match then move on to the next phone number format

      if (nationalNnumber.search(lastLeadingDigitsPattern) !== 0) {
        continue;
      }
    } // Check that the national number matches the phone number format regular expression


    if (matchesEntirely(nationalNnumber, format.pattern())) {
      return format;
    }
  }
} // Removes brackets and replaces dashes with spaces.
//
// E.g. "(999) 111-22-33" -> "999 111 22 33"
//
// For some reason Google's metadata contains `<intlFormat/>`s with brackets and dashes.
// Meanwhile, there's no single opinion about using punctuation in international phone numbers.
//
// For example, Google's `<intlFormat/>` for USA is `+1 213-373-4253`.
// And here's a quote from WikiPedia's "North American Numbering Plan" page:
// https://en.wikipedia.org/wiki/North_American_Numbering_Plan
//
// "The country calling code for all countries participating in the NANP is 1.
// In international format, an NANP number should be listed as +1 301 555 01 00,
// where 301 is an area code (Maryland)."
//
// I personally prefer the international format without any punctuation.
// For example, brackets are remnants of the old age, meaning that the
// phone number part in brackets (so called "area code") can be omitted
// if dialing within the same "area".
// And hyphens were clearly introduced for splitting local numbers into memorizable groups.
// For example, remembering "5553535" is difficult but "555-35-35" is much simpler.
// Imagine a man taking a bus from home to work and seeing an ad with a phone number.
// He has a couple of seconds to memorize that number until it passes by.
// If it were spaces instead of hyphens the man wouldn't necessarily get it,
// but with hyphens instead of spaces the grouping is more explicit.
// I personally think that hyphens introduce visual clutter,
// so I prefer replacing them with spaces in international numbers.
// In the modern age all output is done on displays where spaces are clearly distinguishable
// so hyphens can be safely replaced with spaces without losing any legibility.
//


function applyInternationalSeparatorStyle(local) {
  return local.replace(new RegExp("[".concat(VALID_PUNCTUATION, "]+"), 'g'), ' ').trim();
}

function addExtension(formattedNumber, ext, metadata, formatExtension) {
  return ext ? formatExtension(formattedNumber, ext, metadata) : formattedNumber;
}

function formatIDDSameCountryCallingCodeNumber(number, toCountryCallingCode, fromCountry, toCountryMetadata, options) {
  var fromCountryMetadata = new Metadata(toCountryMetadata.metadata);
  fromCountryMetadata.country(fromCountry); // If calling within the same country calling code.

  if (toCountryCallingCode === fromCountryMetadata.countryCallingCode()) {
    // For NANPA regions, return the national format for these regions
    // but prefix it with the country calling code.
    if (toCountryCallingCode === '1') {
      return toCountryCallingCode + ' ' + formatNationalNumber(number, 'NATIONAL', toCountryMetadata, options);
    } // If regions share a country calling code, the country calling code need
    // not be dialled. This also applies when dialling within a region, so this
    // if clause covers both these cases. Technically this is the case for
    // dialling from La Reunion to other overseas departments of France (French
    // Guiana, Martinique, Guadeloupe), but not vice versa - so we don't cover
    // this edge case for now and for those cases return the version including
    // country calling code. Details here:
    // http://www.petitfute.com/voyage/225-info-pratiques-reunion
    //


    return formatNationalNumber(number, 'NATIONAL', toCountryMetadata, options);
  }
}

function _objectSpread$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty$2(target, key, source[key]);
    });
  }

  return target;
}

function _defineProperty$2(obj, key, value) {
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

function _classCallCheck$3(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties$2(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass$2(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$2(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$2(Constructor, staticProps);
  return Constructor;
}

var PhoneNumber = /*#__PURE__*/function () {
  function PhoneNumber(countryCallingCode, nationalNumber, metadata) {
    _classCallCheck$3(this, PhoneNumber);

    if (!countryCallingCode) {
      throw new TypeError('`country` or `countryCallingCode` not passed');
    }

    if (!nationalNumber) {
      throw new TypeError('`nationalNumber` not passed');
    }

    var _metadata = new Metadata(metadata); // If country code is passed then derive `countryCallingCode` from it.
    // Also store the country code as `.country`.


    if (isCountryCode(countryCallingCode)) {
      this.country = countryCallingCode;

      _metadata.country(countryCallingCode);

      countryCallingCode = _metadata.countryCallingCode();
    }

    this.countryCallingCode = countryCallingCode;
    this.nationalNumber = nationalNumber;
    this.number = '+' + this.countryCallingCode + this.nationalNumber;
    this.metadata = metadata;
  }

  _createClass$2(PhoneNumber, [{
    key: "isPossible",
    value: function isPossible() {
      return isPossiblePhoneNumber(this, {
        v2: true
      }, this.metadata);
    }
  }, {
    key: "isValid",
    value: function isValid() {
      return isValidNumber(this, {
        v2: true
      }, this.metadata);
    }
  }, {
    key: "isNonGeographic",
    value: function isNonGeographic() {
      var metadata = new Metadata(this.metadata);
      return metadata.isNonGeographicCallingCode(this.countryCallingCode);
    }
  }, {
    key: "isEqual",
    value: function isEqual(phoneNumber) {
      return this.number === phoneNumber.number && this.ext === phoneNumber.ext;
    } // // Is just an alias for `this.isValid() && this.country === country`.
    // // https://github.com/googlei18n/libphonenumber/blob/master/FAQ.md#when-should-i-use-isvalidnumberforregion
    // isValidForRegion(country) {
    // 	return isValidNumberForRegion(this, country, { v2: true }, this.metadata)
    // }

  }, {
    key: "getType",
    value: function getType() {
      return getNumberType(this, {
        v2: true
      }, this.metadata);
    }
  }, {
    key: "format",
    value: function format(_format, options) {
      return formatNumber$1(this, _format, options ? _objectSpread$1({}, options, {
        v2: true
      }) : {
        v2: true
      }, this.metadata);
    }
  }, {
    key: "formatNational",
    value: function formatNational(options) {
      return this.format('NATIONAL', options);
    }
  }, {
    key: "formatInternational",
    value: function formatInternational(options) {
      return this.format('INTERNATIONAL', options);
    }
  }, {
    key: "getURI",
    value: function getURI(options) {
      return this.format('RFC3966', options);
    }
  }]);

  return PhoneNumber;
}();

var isCountryCode = function isCountryCode(value) {
  return /^[A-Z]{2}$/.test(value);
};

// This is a port of Google Android `libphonenumber`'s
// This prevents malicious input from consuming CPU.

var MAX_INPUT_STRING_LENGTH = 250; // This consists of the plus symbol, digits, and arabic-indic digits.

var PHONE_NUMBER_START_PATTERN = new RegExp('[' + PLUS_CHARS + VALID_DIGITS + ']'); // Regular expression of trailing characters that we want to remove.

var AFTER_PHONE_NUMBER_END_PATTERN = new RegExp('[^' + VALID_DIGITS + ']+$');
//  {
//    country:
//    {
//      restrict - (a two-letter country code)
//                 the phone number must be in this country
//
//      default - (a two-letter country code)
//                default country to use for phone number parsing and validation
//                (if no country code could be derived from the phone number)
//    }
//  }
//
// Returns `{ country, number }`
//
// Example use cases:
//
// ```js
// parse('8 (800) 555-35-35', 'RU')
// parse('8 (800) 555-35-35', 'RU', metadata)
// parse('8 (800) 555-35-35', { country: { default: 'RU' } })
// parse('8 (800) 555-35-35', { country: { default: 'RU' } }, metadata)
// parse('+7 800 555 35 35')
// parse('+7 800 555 35 35', metadata)
// ```
//

function parse$1(text, options, metadata) {
  // If assigning the `{}` default value is moved to the arguments above,
  // code coverage would decrease for some weird reason.
  options = options || {};
  metadata = new Metadata(metadata); // Validate `defaultCountry`.

  if (options.defaultCountry && !metadata.hasCountry(options.defaultCountry)) {
    if (options.v2) {
      throw new ParseError('INVALID_COUNTRY');
    }

    throw new Error("Unknown country: ".concat(options.defaultCountry));
  } // Parse the phone number.


  var _parseInput = parseInput(text, options.v2),
      formattedPhoneNumber = _parseInput.number,
      ext = _parseInput.ext; // If the phone number is not viable then return nothing.


  if (!formattedPhoneNumber) {
    if (options.v2) {
      throw new ParseError('NOT_A_NUMBER');
    }

    return {};
  }

  var _parsePhoneNumber = parsePhoneNumber(formattedPhoneNumber, options.defaultCountry, options.defaultCallingCode, metadata),
      country = _parsePhoneNumber.country,
      nationalNumber = _parsePhoneNumber.nationalNumber,
      countryCallingCode = _parsePhoneNumber.countryCallingCode,
      carrierCode = _parsePhoneNumber.carrierCode;

  if (!metadata.hasSelectedNumberingPlan()) {
    if (options.v2) {
      throw new ParseError('INVALID_COUNTRY');
    }

    return {};
  } // Validate national (significant) number length.


  if (!nationalNumber || nationalNumber.length < MIN_LENGTH_FOR_NSN) {
    // Won't throw here because the regexp already demands length > 1.

    /* istanbul ignore if */
    if (options.v2) {
      throw new ParseError('TOO_SHORT');
    } // Google's demo just throws an error in this case.


    return {};
  } // Validate national (significant) number length.
  //
  // A sidenote:
  //
  // They say that sometimes national (significant) numbers
  // can be longer than `MAX_LENGTH_FOR_NSN` (e.g. in Germany).
  // https://github.com/googlei18n/libphonenumber/blob/7e1748645552da39c4e1ba731e47969d97bdb539/resources/phonenumber.proto#L36
  // Such numbers will just be discarded.
  //


  if (nationalNumber.length > MAX_LENGTH_FOR_NSN) {
    if (options.v2) {
      throw new ParseError('TOO_LONG');
    } // Google's demo just throws an error in this case.


    return {};
  }

  if (options.v2) {
    var phoneNumber = new PhoneNumber(countryCallingCode, nationalNumber, metadata.metadata);

    if (country) {
      phoneNumber.country = country;
    }

    if (carrierCode) {
      phoneNumber.carrierCode = carrierCode;
    }

    if (ext) {
      phoneNumber.ext = ext;
    }

    return phoneNumber;
  } // Check if national phone number pattern matches the number.
  // National number pattern is different for each country,
  // even for those ones which are part of the "NANPA" group.


  var valid = (options.extended ? metadata.hasSelectedNumberingPlan() : country) ? matchesEntirely(nationalNumber, metadata.nationalNumberPattern()) : false;

  if (!options.extended) {
    return valid ? result(country, nationalNumber, ext) : {};
  }

  return {
    country: country,
    countryCallingCode: countryCallingCode,
    carrierCode: carrierCode,
    valid: valid,
    possible: valid ? true : options.extended === true && metadata.possibleLengths() && isPossibleNumber(nationalNumber, countryCallingCode !== undefined, metadata) ? true : false,
    phone: nationalNumber,
    ext: ext
  };
}
/**
 * Extracts a formatted phone number from text.
 * Doesn't guarantee that the extracted phone number
 * is a valid phone number (for example, doesn't validate its length).
 * @param  {string} text
 * @param  {boolean} throwOnError — By default, it won't throw if the text is too long.
 * @return {string}
 * @example
 * // Returns "(213) 373-4253".
 * extractFormattedPhoneNumber("Call (213) 373-4253 for assistance.")
 */

function extractFormattedPhoneNumber(text, throwOnError) {
  if (!text) {
    return;
  }

  if (text.length > MAX_INPUT_STRING_LENGTH) {
    if (throwOnError) {
      throw new ParseError('TOO_LONG');
    }

    return;
  } // Attempt to extract a possible number from the string passed in


  var startsAt = text.search(PHONE_NUMBER_START_PATTERN);

  if (startsAt < 0) {
    return;
  }

  return text // Trim everything to the left of the phone number
  .slice(startsAt) // Remove trailing non-numerical characters
  .replace(AFTER_PHONE_NUMBER_END_PATTERN, '');
}
/**
 * Strips any national prefix (such as 0, 1) present in a
 * (possibly incomplete) number provided.
 * "Carrier codes" are only used  in Colombia and Brazil,
 * and only when dialing within those countries from a mobile phone to a fixed line number.
 * Sometimes it won't actually strip national prefix
 * and will instead prepend some digits to the `number`:
 * for example, when number `2345678` is passed with `VI` country selected,
 * it will return `{ number: "3402345678" }`, because `340` area code is prepended.
 * @param {string} number — National number digits.
 * @param {object} metadata — Metadata with country selected.
 * @return {object} `{ nationalNumber: string, carrierCode: string? }`.
 */

function stripNationalPrefixAndCarrierCode(number, metadata) {
  if (number && metadata.nationalPrefixForParsing()) {
    // See METADATA.md for the description of
    // `national_prefix_for_parsing` and `national_prefix_transform_rule`.
    // Attempt to parse the first digits as a national prefix.
    var prefixPattern = new RegExp('^(?:' + metadata.nationalPrefixForParsing() + ')');
    var prefixMatch = prefixPattern.exec(number);

    if (prefixMatch) {
      var nationalNumber;
      var carrierCode; // If a "capturing group" didn't match
      // then its element in `prefixMatch[]` array will be `undefined`.

      var capturedGroupsCount = prefixMatch.length - 1;

      if (metadata.nationalPrefixTransformRule() && capturedGroupsCount > 0 && prefixMatch[capturedGroupsCount]) {
        nationalNumber = number.replace(prefixPattern, metadata.nationalPrefixTransformRule()); // Carrier code is the last captured group,
        // but only when there's more than one captured group.

        if (capturedGroupsCount > 1 && prefixMatch[capturedGroupsCount]) {
          carrierCode = prefixMatch[1];
        }
      } // If it's a simple-enough case then just
      // strip the national prefix from the number.
      else {
          // National prefix is the whole substring matched by
          // the `national_prefix_for_parsing` regexp.
          var nationalPrefix = prefixMatch[0];
          nationalNumber = number.slice(nationalPrefix.length); // Carrier code is the last captured group.

          if (capturedGroupsCount > 0) {
            carrierCode = prefixMatch[1];
          }
        } // We require that the national (significant) number remaining after
      // stripping the national prefix and carrier code be long enough
      // to be a possible length for the region. Otherwise, we don't do
      // the stripping, since the original number could be a valid number.
      // For example, in some countries (Russia, Belarus) the same digit
      // could be both a national prefix and a leading digit of a valid
      // national phone number, like `8` is the national prefix for Russia
      // and `800 555 35 35` is a valid national (significant) number.


      if (matchesEntirely(number, metadata.nationalNumberPattern()) && !matchesEntirely(nationalNumber, metadata.nationalNumberPattern())) ; else {
        return {
          nationalNumber: nationalNumber,
          carrierCode: carrierCode
        };
      }
    }
  }

  return {
    nationalNumber: number
  };
}
function findCountryCode(callingCode, nationalPhoneNumber, metadata) {


  var possibleCountries = metadata.getCountryCodesForCallingCode(callingCode);

  if (!possibleCountries) {
    return;
  } // If there's just one country corresponding to the country code,
  // then just return it, without further phone number digits validation.


  if (possibleCountries.length === 1) {
    return possibleCountries[0];
  }

  return _findCountryCode(possibleCountries, nationalPhoneNumber, metadata.metadata);
} // Changes `metadata` `country`.

function _findCountryCode(possibleCountries, nationalPhoneNumber, metadata) {
  metadata = new Metadata(metadata);

  for (var _iterator = possibleCountries, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var country = _ref;
    metadata.country(country); // Leading digits check would be the simplest one

    if (metadata.leadingDigits()) {
      if (nationalPhoneNumber && nationalPhoneNumber.search(metadata.leadingDigits()) === 0) {
        return country;
      }
    } // Else perform full validation with all of those
    // fixed-line/mobile/etc regular expressions.
    else if (getNumberType({
        phone: nationalPhoneNumber,
        country: country
      }, undefined, metadata.metadata)) {
        return country;
      }
  }
}
/**
 * @param  {string} text - Input.
 * @return {object} `{ ?number, ?ext }`.
 */


function parseInput(text, v2) {
  // Parse RFC 3966 phone number URI.
  if (text && text.indexOf('tel:') === 0) {
    return parseRFC3966(text);
  }

  var number = extractFormattedPhoneNumber(text, v2); // If the phone number is not viable, then abort.

  if (!number || !isViablePhoneNumber(number)) {
    return {};
  } // Attempt to parse extension first, since it doesn't require region-specific
  // data and we want to have the non-normalised number here.


  var withExtensionStripped = extractExtension(number);

  if (withExtensionStripped.ext) {
    return withExtensionStripped;
  }

  return {
    number: number
  };
}
/**
 * Creates `parse()` result object.
 */


function result(country, nationalNumber, ext) {
  var result = {
    country: country,
    phone: nationalNumber
  };

  if (ext) {
    result.ext = ext;
  }

  return result;
}
/**
 * Parses a viable phone number.
 * @param {string} formattedPhoneNumber — Example: "(213) 373-4253".
 * @param {string} [defaultCountry]
 * @param {string} [defaultCallingCode]
 * @param {Metadata} metadata
 * @return {object} Returns `{ country: string?, countryCallingCode: string?, nationalNumber: string? }`.
 */


function parsePhoneNumber(formattedPhoneNumber, defaultCountry, defaultCallingCode, metadata) {
  // Extract calling code from phone number.
  var _extractCountryCallin = extractCountryCallingCode(parseIncompletePhoneNumber(formattedPhoneNumber), defaultCountry, defaultCallingCode, metadata.metadata),
      countryCallingCode = _extractCountryCallin.countryCallingCode,
      number = _extractCountryCallin.number; // Choose a country by `countryCallingCode`.


  var country;

  if (countryCallingCode) {
    metadata.chooseCountryByCountryCallingCode(countryCallingCode);
  } // If `formattedPhoneNumber` is in "national" format
  // then `number` is defined and `countryCallingCode` isn't.
  else if (number && (defaultCountry || defaultCallingCode)) {
      metadata.selectNumberingPlan(defaultCountry, defaultCallingCode);

      if (defaultCountry) {
        country = defaultCountry;
      }

      countryCallingCode = defaultCallingCode || getCountryCallingCode(defaultCountry, metadata.metadata);
    } else return {};

  if (!number) {
    return {
      countryCallingCode: countryCallingCode
    };
  }

  var _stripNationalPrefixA = stripNationalPrefixAndCarrierCodeFromCompleteNumber(parseIncompletePhoneNumber(number), metadata),
      nationalNumber = _stripNationalPrefixA.nationalNumber,
      carrierCode = _stripNationalPrefixA.carrierCode; // Sometimes there are several countries
  // corresponding to the same country phone code
  // (e.g. NANPA countries all having `1` country phone code).
  // Therefore, to reliably determine the exact country,
  // national (significant) number should have been parsed first.
  //
  // When `metadata.json` is generated, all "ambiguous" country phone codes
  // get their countries populated with the full set of
  // "phone number type" regular expressions.
  //


  var exactCountry = findCountryCode(countryCallingCode, nationalNumber, metadata);

  if (exactCountry) {
    country = exactCountry;
    /* istanbul ignore if */

    if (exactCountry === '001') ; else {
      metadata.country(country);
    }
  }

  return {
    country: country,
    countryCallingCode: countryCallingCode,
    nationalNumber: nationalNumber,
    carrierCode: carrierCode
  };
}
/**
 * Strips national prefix and carrier code from a complete phone number.
 * The difference from the non-"FromCompleteNumber" function is that
 * it won't extract national prefix if the resultant number is too short
 * to be a complete number for the selected phone numbering plan.
 * @param  {string} number — Complete phone number digits.
 * @param  {Metadata} metadata — Metadata with a phone numbering plan selected.
 * @return {object} `{ nationalNumber: string, carrierCode: string? }`.
 */


function stripNationalPrefixAndCarrierCodeFromCompleteNumber(number, metadata) {
  // Parsing national prefixes and carrier codes
  // is only required for local phone numbers
  // but some people don't understand that
  // and sometimes write international phone numbers
  // with national prefixes (or maybe even carrier codes).
  // http://ucken.blogspot.ru/2016/03/trunk-prefixes-in-skype4b.html
  // Google's original library forgives such mistakes
  // and so does this library, because it has been requested:
  // https://github.com/catamphetamine/libphonenumber-js/issues/127
  var _stripNationalPrefixA2 = stripNationalPrefixAndCarrierCode(parseIncompletePhoneNumber(number), metadata),
      nationalNumber = _stripNationalPrefixA2.nationalNumber,
      carrierCode = _stripNationalPrefixA2.carrierCode; // If a national prefix has been extracted, check to see
  // if the resultant number isn't too short.


  if (nationalNumber.length !== number.length + (carrierCode ? carrierCode.length : 0)) {
    // If not using legacy generated metadata (before version `1.0.18`)
    // then it has "possible lengths", so use those to validate the number length.
    if (metadata.possibleLengths()) {
      // "We require that the NSN remaining after stripping the national prefix and
      // carrier code be long enough to be a possible length for the region.
      // Otherwise, we don't do the stripping, since the original number could be
      // a valid short number."
      // https://github.com/google/libphonenumber/blob/876268eb1ad6cdc1b7b5bef17fc5e43052702d57/java/libphonenumber/src/com/google/i18n/phonenumbers/PhoneNumberUtil.java#L3236-L3250
      switch (checkNumberLengthForType(nationalNumber, undefined, metadata)) {
        case 'TOO_SHORT':
        case 'INVALID_LENGTH':
          // case 'IS_POSSIBLE_LOCAL_ONLY':
          // Don't strip the national prefix.
          return {
            nationalNumber: number
          };
      }
    }
  }

  return {
    nationalNumber: nationalNumber,
    carrierCode: carrierCode
  };
}
/**
 * Converts a phone number digits (possibly with a `+`)
 * into a calling code and the rest phone number digits.
 * The "rest phone number digits" could include
 * a national prefix, carrier code, and national
 * (significant) number.
 * @param  {string} number — Phone number digits (possibly with a `+`).
 * @param  {string} [country] — Default country.
 * @param  {string} [callingCode] — Default calling code (some phone numbering plans are non-geographic).
 * @param  {object} metadata
 * @return {object} `{ countryCallingCode: string?, number: string }`
 * @example
 * // Returns `{ countryCallingCode: "1", number: "2133734253" }`.
 * extractCountryCallingCode('2133734253', 'US', null, metadata)
 * extractCountryCallingCode('2133734253', null, '1', metadata)
 * extractCountryCallingCode('+12133734253', null, null, metadata)
 * extractCountryCallingCode('+12133734253', 'RU', null, metadata)
 */

function extractCountryCallingCode(number, country, callingCode, metadata) {
  if (!number) {
    return {};
  } // If this is not an international phone number,
  // then either extract an "IDD" prefix, or extract a
  // country calling code from a number by autocorrecting it
  // by prepending a leading `+` in cases when it starts
  // with the country calling code.
  // https://wikitravel.org/en/International_dialling_prefix
  // https://github.com/catamphetamine/libphonenumber-js/issues/376


  if (number[0] !== '+') {
    // Convert an "out-of-country" dialing phone number
    // to a proper international phone number.
    var numberWithoutIDD = stripIDDPrefix(number, country, callingCode, metadata); // If an IDD prefix was stripped then
    // convert the number to international one
    // for subsequent parsing.

    if (numberWithoutIDD && numberWithoutIDD !== number) {
      number = '+' + numberWithoutIDD;
    } else {
      // Check to see if the number starts with the country calling code
      // for the default country. If so, we remove the country calling code,
      // and do some checks on the validity of the number before and after.
      // https://github.com/catamphetamine/libphonenumber-js/issues/376
      if (country || callingCode) {
        var _extractCountryCallin2 = extractCountryCallingCodeFromInternationalNumberWithoutPlusSign(number, country, callingCode, metadata),
            countryCallingCode = _extractCountryCallin2.countryCallingCode,
            shorterNumber = _extractCountryCallin2.number;

        if (countryCallingCode) {
          return {
            countryCallingCode: countryCallingCode,
            number: shorterNumber
          };
        }
      }

      return {
        number: number
      };
    }
  } // Fast abortion: country codes do not begin with a '0'


  if (number[1] === '0') {
    return {};
  }

  metadata = new Metadata(metadata); // The thing with country phone codes
  // is that they are orthogonal to each other
  // i.e. there's no such country phone code A
  // for which country phone code B exists
  // where B starts with A.
  // Therefore, while scanning digits,
  // if a valid country code is found,
  // that means that it is the country code.
  //

  var i = 2;

  while (i - 1 <= MAX_LENGTH_COUNTRY_CODE && i <= number.length) {
    var _countryCallingCode = number.slice(1, i);

    if (metadata.hasCallingCode(_countryCallingCode)) {
      metadata.selectNumberingPlan(undefined, _countryCallingCode);
      return {
        countryCallingCode: _countryCallingCode,
        number: number.slice(i)
      };
    }

    i++;
  }

  return {};
}
/**
 * Sometimes some people incorrectly input international phone numbers
 * without the leading `+`. This function corrects such input.
 * @param  {string} number — Phone number digits.
 * @param  {string?} country
 * @param  {string?} callingCode
 * @param  {object} metadata
 * @return {object} `{ countryCallingCode: string?, number: string }`.
 */

function extractCountryCallingCodeFromInternationalNumberWithoutPlusSign(number, country, callingCode, metadata) {
  var countryCallingCode = country ? getCountryCallingCode(country, metadata) : callingCode;

  if (number.indexOf(countryCallingCode) === 0) {
    metadata = new Metadata(metadata);
    metadata.selectNumberingPlan(country, callingCode);
    var possibleShorterNumber = number.slice(countryCallingCode.length);

    var _stripNationalPrefixA3 = stripNationalPrefixAndCarrierCode(possibleShorterNumber, metadata),
        possibleShorterNationalNumber = _stripNationalPrefixA3.nationalNumber;

    var _stripNationalPrefixA4 = stripNationalPrefixAndCarrierCode(number, metadata),
        nationalNumber = _stripNationalPrefixA4.nationalNumber; // If the number was not valid before but is valid now,
    // or if it was too long before, we consider the number
    // with the country calling code stripped to be a better result
    // and keep that instead.
    // For example, in Germany (+49), `49` is a valid area code,
    // so if a number starts with `49`, it could be both a valid
    // national German number or an international number without
    // a leading `+`.


    if (!matchesEntirely(nationalNumber, metadata.nationalNumberPattern()) && matchesEntirely(possibleShorterNationalNumber, metadata.nationalNumberPattern()) || checkNumberLengthForType(nationalNumber, undefined, metadata) === 'TOO_LONG') {
      return {
        countryCallingCode: countryCallingCode,
        number: possibleShorterNumber
      };
    }
  }

  return {
    number: number
  };
}

function _objectSpread$2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty$3(target, key, source[key]);
    });
  }

  return target;
}

function _defineProperty$3(obj, key, value) {
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
function parsePhoneNumber$1(text, options, metadata) {
  return parse$1(text, _objectSpread$2({}, options, {
    v2: true
  }), metadata);
}

function _typeof$1(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$1 = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof$1 = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof$1(obj);
}

function _objectSpread$3(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty$4(target, key, source[key]);
    });
  }

  return target;
}

function _defineProperty$4(obj, key, value) {
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

function _slicedToArray$2(arr, i) {
  return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _nonIterableRest$2();
}

function _nonIterableRest$2() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _iterableToArrayLimit$2(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayWithHoles$2(arr) {
  if (Array.isArray(arr)) return arr;
}
function normalizeArguments(args) {
  var _Array$prototype$slic = Array.prototype.slice.call(args),
      _Array$prototype$slic2 = _slicedToArray$2(_Array$prototype$slic, 4),
      arg_1 = _Array$prototype$slic2[0],
      arg_2 = _Array$prototype$slic2[1],
      arg_3 = _Array$prototype$slic2[2],
      arg_4 = _Array$prototype$slic2[3];

  var text;
  var options;
  var metadata; // If the phone number is passed as a string.
  // `parsePhoneNumber('88005553535', ...)`.

  if (typeof arg_1 === 'string') {
    text = arg_1;
  } else throw new TypeError('A text for parsing must be a string.'); // If "default country" argument is being passed then move it to `options`.
  // `parsePhoneNumber('88005553535', 'RU', [options], metadata)`.


  if (!arg_2 || typeof arg_2 === 'string') {
    if (arg_4) {
      options = arg_3;
      metadata = arg_4;
    } else {
      options = undefined;
      metadata = arg_3;
    }

    if (arg_2) {
      options = _objectSpread$3({
        defaultCountry: arg_2
      }, options);
    }
  } // `defaultCountry` is not passed.
  // Example: `parsePhoneNumber('+78005553535', [options], metadata)`.
  else if (isObject$1(arg_2)) {
      if (arg_3) {
        options = arg_2;
        metadata = arg_3;
      } else {
        metadata = arg_2;
      }
    } else throw new Error("Invalid second argument: ".concat(arg_2));

  return {
    text: text,
    options: options,
    metadata: metadata
  };
} // Otherwise istanbul would show this as "branch not covered".

/* istanbul ignore next */

var isObject$1 = function isObject(_) {
  return _typeof$1(_) === 'object';
};

function _objectSpread$4(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty$5(target, key, source[key]);
    });
  }

  return target;
}

function _defineProperty$5(obj, key, value) {
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
function parsePhoneNumberFromString(text, options, metadata) {
  // Validate `defaultCountry`.
  if (options && options.defaultCountry && !isSupportedCountry(options.defaultCountry, metadata)) {
    options = _objectSpread$4({}, options, {
      defaultCountry: undefined
    });
  } // Parse phone number.


  try {
    return parsePhoneNumber$1(text, options, metadata);
  } catch (error) {
    /* istanbul ignore else */
    if (error instanceof ParseError) ; else {
      throw error;
    }
  }
}

function parsePhoneNumberFromString$1() {
  var _normalizeArguments = normalizeArguments(arguments),
      text = _normalizeArguments.text,
      options = _normalizeArguments.options,
      metadata = _normalizeArguments.metadata;

  return parsePhoneNumberFromString(text, options, metadata);
}

/** Returns a regular expression quantifier with an upper and lower limit. */
function limit(lower, upper) {
  if (lower < 0 || upper <= 0 || upper < lower) {
    throw new TypeError();
  }

  return "{".concat(lower, ",").concat(upper, "}");
}
/**
 * Trims away any characters after the first match of {@code pattern} in {@code candidate},
 * returning the trimmed version.
 */

function trimAfterFirstMatch(regexp, string) {
  var index = string.search(regexp);

  if (index >= 0) {
    return string.slice(0, index);
  }

  return string;
}
function startsWith(string, substring) {
  return string.indexOf(substring) === 0;
}
function endsWith(string, substring) {
  return string.indexOf(substring, string.length - substring.length) === string.length - substring.length;
}

// of parsing. This allows us to strip off parts of the number that are actually the start of
// another number, such as for: (530) 583-6985 x302/x2303 -> the second extension here makes this
// actually two phone numbers, (530) 583-6985 x302 and (530) 583-6985 x2303. We remove the second
// extension so that the first number is parsed correctly.
//
// Matches a slash (\ or /) followed by a space followed by an `x`.
//

var SECOND_NUMBER_START_PATTERN = /[\\/] *x/;
function parsePreCandidate(candidate) {
  // Check for extra numbers at the end.
  // TODO: This is the place to start when trying to support extraction of multiple phone number
  // from split notations (+41 79 123 45 67 / 68).
  return trimAfterFirstMatch(SECOND_NUMBER_START_PATTERN, candidate);
}

// Matches strings that look like dates using "/" as a separator.
// Examples: 3/10/2011, 31/10/96 or 08/31/95.
var SLASH_SEPARATED_DATES = /(?:(?:[0-3]?\d\/[01]?\d)|(?:[01]?\d\/[0-3]?\d))\/(?:[12]\d)?\d{2}/; // Matches timestamps.
// Examples: "2012-01-02 08:00".
// Note that the reg-ex does not include the
// trailing ":\d\d" -- that is covered by TIME_STAMPS_SUFFIX.

var TIME_STAMPS = /[12]\d{3}[-/]?[01]\d[-/]?[0-3]\d +[0-2]\d$/;
var TIME_STAMPS_SUFFIX_LEADING = /^:[0-5]\d/;
function isValidPreCandidate(candidate, offset, text) {
  // Skip a match that is more likely to be a date.
  if (SLASH_SEPARATED_DATES.test(candidate)) {
    return false;
  } // Skip potential time-stamps.


  if (TIME_STAMPS.test(candidate)) {
    var followingText = text.slice(offset + candidate.length);

    if (TIME_STAMPS_SUFFIX_LEADING.test(followingText)) {
      return false;
    }
  }

  return true;
}

// Javascript doesn't support UTF-8 regular expressions.
// So mimicking them here.
// Copy-pasted from `PhoneNumberMatcher.js`.

/**
 * "\p{Z}" is any kind of whitespace or invisible separator ("Separator").
 * http://www.regular-expressions.info/unicode.html
 * "\P{Z}" is the reverse of "\p{Z}".
 * "\p{N}" is any kind of numeric character in any script ("Number").
 * "\p{Nd}" is a digit zero through nine in any script except "ideographic scripts" ("Decimal_Digit_Number").
 * "\p{Sc}" is a currency symbol ("Currency_Symbol").
 * "\p{L}" is any kind of letter from any language ("Letter").
 * "\p{Mn}" is "non-spacing mark".
 *
 * Javascript doesn't support Unicode Regular Expressions
 * so substituting it with this explicit set of characters.
 *
 * https://stackoverflow.com/questions/13210194/javascript-regex-equivalent-of-a-za-z-using-pl
 * https://github.com/danielberndt/babel-plugin-utf-8-regex/blob/master/src/transformer.js
 */
var _pZ = " \xA0\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000";
var pZ = "[".concat(_pZ, "]");
var PZ = "[^".concat(_pZ, "]");
var _pN = "0-9\xB2\xB3\xB9\xBC-\xBE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19"; // const pN = `[${_pN}]`

var _pNd = "0-9\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19";
var pNd = "[".concat(_pNd, "]");
var _pL = "A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC";
var pL = "[".concat(_pL, "]");
var pL_regexp = new RegExp(pL);
var _pSc = "$\xA2-\xA5\u058F\u060B\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20B9\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6";
var pSc = "[".concat(_pSc, "]");
var pSc_regexp = new RegExp(pSc);
var _pMn = "\u0300-\u036F\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08E4-\u08FE\u0900-\u0902\u093A\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962\u0963\u0981\u09BC\u09C1-\u09C4\u09CD\u09E2\u09E3\u0A01\u0A02\u0A3C\u0A41\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81\u0A82\u0ABC\u0AC1-\u0AC5\u0AC7\u0AC8\u0ACD\u0AE2\u0AE3\u0B01\u0B3C\u0B3F\u0B41-\u0B44\u0B4D\u0B56\u0B62\u0B63\u0B82\u0BC0\u0BCD\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0CBC\u0CBF\u0CC6\u0CCC\u0CCD\u0CE2\u0CE3\u0D41-\u0D44\u0D4D\u0D62\u0D63\u0DCA\u0DD2-\u0DD4\u0DD6\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F71-\u0F7E\u0F80-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039\u103A\u103D\u103E\u1058\u1059\u105E-\u1060\u1071-\u1074\u1082\u1085\u1086\u108D\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4\u17B5\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DD\u180B-\u180D\u18A9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193B\u1A17\u1A18\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1B00-\u1B03\u1B34\u1B36-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80\u1B81\u1BA2-\u1BA5\u1BA8\u1BA9\u1BAB\u1BE6\u1BE8\u1BE9\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1DC0-\u1DE6\u1DFC-\u1DFF\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302D\u3099\u309A\uA66F\uA674-\uA67D\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA825\uA826\uA8C4\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC\uAA29-\uAA2E\uAA31\uAA32\uAA35\uAA36\uAA43\uAA4C\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEC\uAAED\uAAF6\uABE5\uABE8\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE26";
var pMn = "[".concat(_pMn, "]");
var pMn_regexp = new RegExp(pMn);
var _InBasic_Latin = "\0-\x7F";
var _InLatin_1_Supplement = "\x80-\xFF";
var _InLatin_Extended_A = "\u0100-\u017F";
var _InLatin_Extended_Additional = "\u1E00-\u1EFF";
var _InLatin_Extended_B = "\u0180-\u024F";
var _InCombining_Diacritical_Marks = "\u0300-\u036F";
var latinLetterRegexp = new RegExp('[' + _InBasic_Latin + _InLatin_1_Supplement + _InLatin_Extended_A + _InLatin_Extended_Additional + _InLatin_Extended_B + _InCombining_Diacritical_Marks + ']');
/**
 * Helper method to determine if a character is a Latin-script letter or not.
 * For our purposes, combining marks should also return true since we assume
 * they have been added to a preceding Latin character.
 */

function isLatinLetter(letter) {
  // Combining marks are a subset of non-spacing-mark.
  if (!pL_regexp.test(letter) && !pMn_regexp.test(letter)) {
    return false;
  }

  return latinLetterRegexp.test(letter);
}
function isInvalidPunctuationSymbol(character) {
  return character === '%' || pSc_regexp.test(character);
}

// Copy-pasted from `PhoneNumberMatcher.js`.
var OPENING_PARENS = "(\\[\uFF08\uFF3B";
var CLOSING_PARENS = ")\\]\uFF09\uFF3D";
var NON_PARENS = "[^".concat(OPENING_PARENS).concat(CLOSING_PARENS, "]");
var LEAD_CLASS = "[".concat(OPENING_PARENS).concat(PLUS_CHARS, "]"); // Punctuation that may be at the start of a phone number - brackets and plus signs.

var LEAD_CLASS_LEADING = new RegExp('^' + LEAD_CLASS); // Limit on the number of pairs of brackets in a phone number.

var BRACKET_PAIR_LIMIT = limit(0, 3);
/**
 * Pattern to check that brackets match. Opening brackets should be closed within a phone number.
 * This also checks that there is something inside the brackets. Having no brackets at all is also
 * fine.
 *
 * An opening bracket at the beginning may not be closed, but subsequent ones should be.  It's
 * also possible that the leading bracket was dropped, so we shouldn't be surprised if we see a
 * closing bracket first. We limit the sets of brackets in a phone number to four.
 */

var MATCHING_BRACKETS_ENTIRE = new RegExp('^' + "(?:[" + OPENING_PARENS + "])?" + "(?:" + NON_PARENS + "+" + "[" + CLOSING_PARENS + "])?" + NON_PARENS + "+" + "(?:[" + OPENING_PARENS + "]" + NON_PARENS + "+[" + CLOSING_PARENS + "])" + BRACKET_PAIR_LIMIT + NON_PARENS + "*" + '$');
/**
 * Matches strings that look like publication pages. Example:
 * <pre>Computing Complete Answers to Queries in the Presence of Limited Access Patterns.
 * Chen Li. VLDB J. 12(3): 211-227 (2003).</pre>
 *
 * The string "211-227 (2003)" is not a telephone number.
 */

var PUB_PAGES = /\d{1,5}-+\d{1,5}\s{0,4}\(\d{1,4}/;
function isValidCandidate(candidate, offset, text, leniency) {
  // Check the candidate doesn't contain any formatting
  // which would indicate that it really isn't a phone number.
  if (!MATCHING_BRACKETS_ENTIRE.test(candidate) || PUB_PAGES.test(candidate)) {
    return;
  } // If leniency is set to VALID or stricter, we also want to skip numbers that are surrounded
  // by Latin alphabetic characters, to skip cases like abc8005001234 or 8005001234def.


  if (leniency !== 'POSSIBLE') {
    // If the candidate is not at the start of the text,
    // and does not start with phone-number punctuation,
    // check the previous character.
    if (offset > 0 && !LEAD_CLASS_LEADING.test(candidate)) {
      var previousChar = text[offset - 1]; // We return null if it is a latin letter or an invalid punctuation symbol.

      if (isInvalidPunctuationSymbol(previousChar) || isLatinLetter(previousChar)) {
        return false;
      }
    }

    var lastCharIndex = offset + candidate.length;

    if (lastCharIndex < text.length) {
      var nextChar = text[lastCharIndex];

      if (isInvalidPunctuationSymbol(nextChar) || isLatinLetter(nextChar)) {
        return false;
      }
    }
  }

  return true;
}

function _classCallCheck$4(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties$3(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass$3(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$3(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$3(Constructor, staticProps);
  return Constructor;
}

function _defineProperty$6(obj, key, value) {
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
} // This is a legacy function.

var VALID_PHONE_NUMBER$1 = '[' + PLUS_CHARS + ']{0,1}' + '(?:' + '[' + VALID_PUNCTUATION + ']*' + '[' + VALID_DIGITS + ']' + '){3,}' + '[' + VALID_PUNCTUATION + VALID_DIGITS + ']*';
var WHITESPACE_IN_THE_BEGINNING_PATTERN = new RegExp('^[' + WHITESPACE + ']+');
var PUNCTUATION_IN_THE_END_PATTERN = new RegExp('[' + VALID_PUNCTUATION + ']+$'); // // Regular expression for getting opening brackets for a valid number
/**
 * Extracts a parseable phone number including any opening brackets, etc.
 * @param  {string} text - Input.
 * @return {object} `{ ?number, ?startsAt, ?endsAt }`.
 */

var PhoneNumberSearch = /*#__PURE__*/function () {
  // Iteration tristate.
  function PhoneNumberSearch(text, options, metadata) {
    _classCallCheck$4(this, PhoneNumberSearch);

    _defineProperty$6(this, "state", 'NOT_READY');

    this.text = text; // If assigning the `{}` default value is moved to the arguments above,
    // code coverage would decrease for some weird reason.

    this.options = options || {};
    this.metadata = metadata;
    this.regexp = new RegExp(VALID_PHONE_NUMBER$1 + // Phone number extensions
    '(?:' + EXTN_PATTERNS_FOR_PARSING + ')?', 'ig'); // this.searching_from = 0
  }

  _createClass$3(PhoneNumberSearch, [{
    key: "find",
    value: function find() {
      var matches = this.regexp.exec(this.text);

      if (!matches) {
        return;
      }

      var number = matches[0];
      var startsAt = matches.index;
      number = number.replace(WHITESPACE_IN_THE_BEGINNING_PATTERN, '');
      startsAt += matches[0].length - number.length; // Fixes not parsing numbers with whitespace in the end.
      // Also fixes not parsing numbers with opening parentheses in the end.
      // https://github.com/catamphetamine/libphonenumber-js/issues/252

      number = number.replace(PUNCTUATION_IN_THE_END_PATTERN, '');
      number = parsePreCandidate(number);
      var result = this.parseCandidate(number, startsAt);

      if (result) {
        return result;
      } // Tail recursion.
      // Try the next one if this one is not a valid phone number.


      return this.find();
    }
  }, {
    key: "parseCandidate",
    value: function parseCandidate(number, startsAt) {
      if (!isValidPreCandidate(number, startsAt, this.text)) {
        return;
      } // Don't parse phone numbers which are non-phone numbers
      // due to being part of something else (e.g. a UUID).
      // https://github.com/catamphetamine/libphonenumber-js/issues/213
      // Copy-pasted from Google's `PhoneNumberMatcher.js` (`.parseAndValidate()`).


      if (!isValidCandidate(number, startsAt, this.text, this.options.extended ? 'POSSIBLE' : 'VALID')) {
        return;
      } // // Prepend any opening brackets left behind by the
      // // `PHONE_NUMBER_START_PATTERN` regexp.
      // const text_before_number = text.slice(this.searching_from, startsAt)
      // const full_number_starts_at = text_before_number.search(BEFORE_NUMBER_DIGITS_PUNCTUATION)
      // if (full_number_starts_at >= 0)
      // {
      // 	number   = text_before_number.slice(full_number_starts_at) + number
      // 	startsAt = full_number_starts_at
      // }
      //
      // this.searching_from = matches.lastIndex


      var result = parse$1(number, this.options, this.metadata);

      if (!result.phone) {
        return;
      }

      result.startsAt = startsAt;
      result.endsAt = startsAt + number.length;
      return result;
    }
  }, {
    key: "hasNext",
    value: function hasNext() {
      if (this.state === 'NOT_READY') {
        this.last_match = this.find();

        if (this.last_match) {
          this.state = 'READY';
        } else {
          this.state = 'DONE';
        }
      }

      return this.state === 'READY';
    }
  }, {
    key: "next",
    value: function next() {
      // Check the state and find the next match as a side-effect if necessary.
      if (!this.hasNext()) {
        throw new Error('No next element');
      } // Don't retain that memory any longer than necessary.


      var result = this.last_match;
      this.last_match = null;
      this.state = 'NOT_READY';
      return result;
    }
  }]);

  return PhoneNumberSearch;
}();

function _defineProperties$4(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass$4(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$4(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$4(Constructor, staticProps);
  return Constructor;
}

function _classCallCheck$5(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
} // https://medium.com/dsinjs/implementing-lru-cache-in-javascript-94ba6755cda9


var Node = function Node(key, value) {
  var next = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var prev = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  _classCallCheck$5(this, Node);

  this.key = key;
  this.value = value;
  this.next = next;
  this.prev = prev;
};

var LRUCache = /*#__PURE__*/function () {
  //set default limit of 10 if limit is not passed.
  function LRUCache() {
    var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

    _classCallCheck$5(this, LRUCache);

    this.size = 0;
    this.limit = limit;
    this.head = null;
    this.tail = null;
    this.cache = {};
  } // Write Node to head of LinkedList
  // update cache with Node key and Node reference


  _createClass$4(LRUCache, [{
    key: "put",
    value: function put(key, value) {
      this.ensureLimit();

      if (!this.head) {
        this.head = this.tail = new Node(key, value);
      } else {
        var node = new Node(key, value, this.head);
        this.head.prev = node;
        this.head = node;
      } //Update the cache map


      this.cache[key] = this.head;
      this.size++;
    } // Read from cache map and make that node as new Head of LinkedList

  }, {
    key: "get",
    value: function get(key) {
      if (this.cache[key]) {
        var value = this.cache[key].value; // node removed from it's position and cache

        this.remove(key); // write node again to the head of LinkedList to make it most recently used

        this.put(key, value);
        return value;
      }

      console.log("Item not available in cache for key ".concat(key));
    }
  }, {
    key: "ensureLimit",
    value: function ensureLimit() {
      if (this.size === this.limit) {
        this.remove(this.tail.key);
      }
    }
  }, {
    key: "remove",
    value: function remove(key) {
      var node = this.cache[key];

      if (node.prev !== null) {
        node.prev.next = node.next;
      } else {
        this.head = node.next;
      }

      if (node.next !== null) {
        node.next.prev = node.prev;
      } else {
        this.tail = node.prev;
      }

      delete this.cache[key];
      this.size--;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.head = null;
      this.tail = null;
      this.size = 0;
      this.cache = {};
    } // // Invokes the callback function with every node of the chain and the index of the node.
    // forEach(fn) {
    //   let node = this.head;
    //   let counter = 0;
    //   while (node) {
    //     fn(node, counter);
    //     node = node.next;
    //     counter++;
    //   }
    // }
    // // To iterate over LRU with a 'for...of' loop
    // *[Symbol.iterator]() {
    //   let node = this.head;
    //   while (node) {
    //     yield node;
    //     node = node.next;
    //   }
    // }

  }]);

  return LRUCache;
}();

function _classCallCheck$6(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties$5(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass$5(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$5(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$5(Constructor, staticProps);
  return Constructor;
}
// countries being used for the same doc with ~10 patterns for each country. Some pages will have
// a lot more countries in use, but typically fewer numbers for each so expanding the cache for
// that use-case won't have a lot of benefit.

var RegExpCache = /*#__PURE__*/function () {
  function RegExpCache(size) {
    _classCallCheck$6(this, RegExpCache);

    this.cache = new LRUCache(size);
  }

  _createClass$5(RegExpCache, [{
    key: "getPatternForRegExp",
    value: function getPatternForRegExp(pattern) {
      var regExp = this.cache.get(pattern);

      if (!regExp) {
        regExp = new RegExp('^' + pattern);
        this.cache.put(pattern, regExp);
      }

      return regExp;
    }
  }]);

  return RegExpCache;
}();

/**
 * Leniency when finding potential phone numbers in text segments
 * The levels here are ordered in increasing strictness.
 */

var Leniency = {
  /**
   * Phone numbers accepted are "possible", but not necessarily "valid".
   */
  POSSIBLE: function POSSIBLE(number, candidate, metadata) {
    return true;
  },

  /**
   * Phone numbers accepted are "possible" and "valid".
   * Numbers written in national format must have their national-prefix
   * present if it is usually written for a number of this type.
   */
  VALID: function VALID(number, candidate, metadata) {
    if (!isValidNumber(number, undefined, metadata) || !containsOnlyValidXChars(number, candidate.toString())) {
      return false;
    } // Skipped for simplicity.
    // return isNationalPrefixPresentIfRequired(number, metadata)


    return true;
  },

  /**
   * Phone numbers accepted are "valid" and
   * are grouped in a possible way for this locale. For example, a US number written as
   * "65 02 53 00 00" and "650253 0000" are not accepted at this leniency level, whereas
   * "650 253 0000", "650 2530000" or "6502530000" are.
   * Numbers with more than one '/' symbol in the national significant number
   * are also dropped at this level.
   *
   * Warning: This level might result in lower coverage especially for regions outside of
   * country code "+1". If you are not sure about which level to use,
   * email the discussion group libphonenumber-discuss@googlegroups.com.
   */
  STRICT_GROUPING: function STRICT_GROUPING(number, candidate, metadata, regExpCache) {
    var candidateString = candidate.toString();

    if (!isValidNumber(number, undefined, metadata) || !containsOnlyValidXChars(number, candidateString) || containsMoreThanOneSlashInNationalNumber(number, candidateString) || !isNationalPrefixPresentIfRequired(number)) {
      return false;
    }

    return checkNumberGroupingIsValid(number, candidate, metadata, allNumberGroupsRemainGrouped, regExpCache);
  },

  /**
   * Phone numbers accepted are {@linkplain PhoneNumberUtil#isValidNumber(PhoneNumber) valid} and
   * are grouped in the same way that we would have formatted it, or as a single block. For
   * example, a US number written as "650 2530000" is not accepted at this leniency level, whereas
   * "650 253 0000" or "6502530000" are.
   * Numbers with more than one '/' symbol are also dropped at this level.
   * <p>
   * Warning: This level might result in lower coverage especially for regions outside of country
   * code "+1". If you are not sure about which level to use, email the discussion group
   * libphonenumber-discuss@googlegroups.com.
   */
  EXACT_GROUPING: function EXACT_GROUPING(number, candidate, metadata, regExpCache) {
    var candidateString = candidate.toString();

    if (!isValidNumber(number, undefined, metadata) || !containsOnlyValidXChars(number, candidateString) || containsMoreThanOneSlashInNationalNumber(number, candidateString) || !isNationalPrefixPresentIfRequired(number)) {
      return false;
    }

    return checkNumberGroupingIsValid(number, candidate, metadata, allNumberGroupsAreExactlyPresent, regExpCache);
  }
};

function containsOnlyValidXChars(number, candidate, metadata) {
  // The characters 'x' and 'X' can be (1) a carrier code, in which case they always precede the
  // national significant number or (2) an extension sign, in which case they always precede the
  // extension number. We assume a carrier code is more than 1 digit, so the first case has to
  // have more than 1 consecutive 'x' or 'X', whereas the second case can only have exactly 1 'x'
  // or 'X'. We ignore the character if it appears as the last character of the string.
  for (var index = 0; index < candidate.length - 1; index++) {
    var charAtIndex = candidate.charAt(index);

    if (charAtIndex === 'x' || charAtIndex === 'X') {
      var charAtNextIndex = candidate.charAt(index + 1);

      if (charAtNextIndex === 'x' || charAtNextIndex === 'X') {
        // This is the carrier code case, in which the 'X's always precede the national
        // significant number.
        index++;

        if (util.isNumberMatch(number, candidate.substring(index)) != MatchType.NSN_MATCH) {
          return false;
        } // This is the extension sign case, in which the 'x' or 'X' should always precede the
        // extension number.

      } else if (parseDigits(candidate.substring(index)) !== number.ext) {
        return false;
      }
    }
  }

  return true;
}

function isNationalPrefixPresentIfRequired(number, _metadata) {
  // First, check how we deduced the country code. If it was written in international format, then
  // the national prefix is not required.
  if (number.getCountryCodeSource() != 'FROM_DEFAULT_COUNTRY') {
    return true;
  }

  var phoneNumberRegion = util.getRegionCodeForCountryCode(number.getCountryCode());
  var metadata = util.getMetadataForRegion(phoneNumberRegion);

  if (metadata == null) {
    return true;
  } // Check if a national prefix should be present when formatting this number.


  var nationalNumber = util.getNationalSignificantNumber(number);
  var formatRule = util.chooseFormattingPatternForNumber(metadata.numberFormats(), nationalNumber); // To do this, we check that a national prefix formatting rule was present
  // and that it wasn't just the first-group symbol ($1) with punctuation.

  if (formatRule && formatRule.getNationalPrefixFormattingRule().length > 0) {
    if (formatRule.getNationalPrefixOptionalWhenFormatting()) {
      // The national-prefix is optional in these cases, so we don't need to check if it was
      // present.
      return true;
    }

    if (PhoneNumberUtil.formattingRuleHasFirstGroupOnly(formatRule.getNationalPrefixFormattingRule())) {
      // National Prefix not needed for this number.
      return true;
    } // Normalize the remainder.


    var rawInputCopy = PhoneNumberUtil.normalizeDigitsOnly(number.getRawInput()); // Check if we found a national prefix and/or carrier code at the start of the raw input, and
    // return the result.

    return util.maybeStripNationalPrefixAndCarrierCode(rawInputCopy, metadata, null);
  }

  return true;
}

function containsMoreThanOneSlashInNationalNumber(number, candidate) {
  var firstSlashInBodyIndex = candidate.indexOf('/');

  if (firstSlashInBodyIndex < 0) {
    // No slashes, this is okay.
    return false;
  } // Now look for a second one.


  var secondSlashInBodyIndex = candidate.indexOf('/', firstSlashInBodyIndex + 1);

  if (secondSlashInBodyIndex < 0) {
    // Only one slash, this is okay.
    return false;
  } // If the first slash is after the country calling code, this is permitted.


  var candidateHasCountryCode = number.getCountryCodeSource() === CountryCodeSource.FROM_NUMBER_WITH_PLUS_SIGN || number.getCountryCodeSource() === CountryCodeSource.FROM_NUMBER_WITHOUT_PLUS_SIGN;

  if (candidateHasCountryCode && PhoneNumberUtil.normalizeDigitsOnly(candidate.substring(0, firstSlashInBodyIndex)) === String(number.getCountryCode())) {
    // Any more slashes and this is illegal.
    return candidate.slice(secondSlashInBodyIndex + 1).indexOf('/') >= 0;
  }

  return true;
}

function checkNumberGroupingIsValid(number, candidate, metadata, checkGroups, regExpCache) {
  var normalizedCandidate = normalizeDigits(candidate, true
  /* keep non-digits */
  );
  var formattedNumberGroups = getNationalNumberGroups(metadata, number, null);

  if (checkGroups(metadata, number, normalizedCandidate, formattedNumberGroups)) {
    return true;
  } // If this didn't pass, see if there are any alternate formats that match, and try them instead.


  var alternateFormats = MetadataManager.getAlternateFormatsForCountry(number.getCountryCode());
  var nationalSignificantNumber = util.getNationalSignificantNumber(number);

  if (alternateFormats) {
    for (var _iterator = alternateFormats.numberFormats(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var alternateFormat = _ref;

      if (alternateFormat.leadingDigitsPatterns().length > 0) {
        // There is only one leading digits pattern for alternate formats.
        var leadingDigitsRegExp = regExpCache.getPatternForRegExp('^' + alternateFormat.leadingDigitsPatterns()[0]);

        if (!leadingDigitsRegExp.test(nationalSignificantNumber)) {
          // Leading digits don't match; try another one.
          continue;
        }
      }

      formattedNumberGroups = getNationalNumberGroups(metadata, number, alternateFormat);

      if (checkGroups(metadata, number, normalizedCandidate, formattedNumberGroups)) {
        return true;
      }
    }
  }

  return false;
}
/**
 * Helper method to get the national-number part of a number, formatted without any national
 * prefix, and return it as a set of digit blocks that would be formatted together following
 * standard formatting rules.
 */


function getNationalNumberGroups(metadata, number, formattingPattern) {
  if (formattingPattern) {
    // We format the NSN only, and split that according to the separator.
    var nationalSignificantNumber = util.getNationalSignificantNumber(number);
    return util.formatNsnUsingPattern(nationalSignificantNumber, formattingPattern, 'RFC3966', metadata).split('-');
  } // This will be in the format +CC-DG1-DG2-DGX;ext=EXT where DG1..DGX represents groups of digits.


  var rfc3966Format = formatNumber(number, 'RFC3966', metadata); // We remove the extension part from the formatted string before splitting it into different
  // groups.

  var endIndex = rfc3966Format.indexOf(';');

  if (endIndex < 0) {
    endIndex = rfc3966Format.length;
  } // The country-code will have a '-' following it.


  var startIndex = rfc3966Format.indexOf('-') + 1;
  return rfc3966Format.slice(startIndex, endIndex).split('-');
}

function allNumberGroupsAreExactlyPresent(metadata, number, normalizedCandidate, formattedNumberGroups) {
  var candidateGroups = normalizedCandidate.split(NON_DIGITS_PATTERN); // Set this to the last group, skipping it if the number has an extension.

  var candidateNumberGroupIndex = number.hasExtension() ? candidateGroups.length - 2 : candidateGroups.length - 1; // First we check if the national significant number is formatted as a block.
  // We use contains and not equals, since the national significant number may be present with
  // a prefix such as a national number prefix, or the country code itself.

  if (candidateGroups.length == 1 || candidateGroups[candidateNumberGroupIndex].contains(util.getNationalSignificantNumber(number))) {
    return true;
  } // Starting from the end, go through in reverse, excluding the first group, and check the
  // candidate and number groups are the same.


  var formattedNumberGroupIndex = formattedNumberGroups.length - 1;

  while (formattedNumberGroupIndex > 0 && candidateNumberGroupIndex >= 0) {
    if (candidateGroups[candidateNumberGroupIndex] !== formattedNumberGroups[formattedNumberGroupIndex]) {
      return false;
    }

    formattedNumberGroupIndex--;
    candidateNumberGroupIndex--;
  } // Now check the first group. There may be a national prefix at the start, so we only check
  // that the candidate group ends with the formatted number group.


  return candidateNumberGroupIndex >= 0 && endsWith(candidateGroups[candidateNumberGroupIndex], formattedNumberGroups[0]);
}

function allNumberGroupsRemainGrouped(metadata, number, normalizedCandidate, formattedNumberGroups) {
  var fromIndex = 0;

  if (number.getCountryCodeSource() !== CountryCodeSource.FROM_DEFAULT_COUNTRY) {
    // First skip the country code if the normalized candidate contained it.
    var countryCode = String(number.getCountryCode());
    fromIndex = normalizedCandidate.indexOf(countryCode) + countryCode.length();
  } // Check each group of consecutive digits are not broken into separate groupings in the
  // {@code normalizedCandidate} string.


  for (var i = 0; i < formattedNumberGroups.length; i++) {
    // Fails if the substring of {@code normalizedCandidate} starting from {@code fromIndex}
    // doesn't contain the consecutive digits in formattedNumberGroups[i].
    fromIndex = normalizedCandidate.indexOf(formattedNumberGroups[i], fromIndex);

    if (fromIndex < 0) {
      return false;
    } // Moves {@code fromIndex} forward.


    fromIndex += formattedNumberGroups[i].length();

    if (i == 0 && fromIndex < normalizedCandidate.length()) {
      // We are at the position right after the NDC. We get the region used for formatting
      // information based on the country code in the phone number, rather than the number itself,
      // as we do not need to distinguish between different countries with the same country
      // calling code and this is faster.
      var region = util.getRegionCodeForCountryCode(number.getCountryCode());

      if (util.getNddPrefixForRegion(region, true) != null && Character.isDigit(normalizedCandidate.charAt(fromIndex))) {
        // This means there is no formatting symbol after the NDC. In this case, we only
        // accept the number if there is no formatting symbol at all in the number, except
        // for extensions. This is only important for countries with national prefixes.
        var nationalSignificantNumber = util.getNationalSignificantNumber(number);
        return startsWith(normalizedCandidate.slice(fromIndex - formattedNumberGroups[i].length), nationalSignificantNumber);
      }
    }
  } // The check here makes sure that we haven't mistakenly already used the extension to
  // match the last group of the subscriber number. Note the extension cannot have
  // formatting in-between digits.


  return normalizedCandidate.slice(fromIndex).contains(number.getExtension());
}

function _objectSpread$5(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty$7(target, key, source[key]);
    });
  }

  return target;
}

function _classCallCheck$7(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties$6(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass$6(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$6(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$6(Constructor, staticProps);
  return Constructor;
}

function _defineProperty$7(obj, key, value) {
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
/**
 * Patterns used to extract phone numbers from a larger phone-number-like pattern. These are
 * ordered according to specificity. For example, white-space is last since that is frequently
 * used in numbers, not just to separate two numbers. We have separate patterns since we don't
 * want to break up the phone-number-like text on more than one different kind of symbol at one
 * time, although symbols of the same type (e.g. space) can be safely grouped together.
 *
 * Note that if there is a match, we will always check any text found up to the first match as
 * well.
 */

var INNER_MATCHES = [// Breaks on the slash - e.g. "651-234-2345/332-445-1234"
'\\/+(.*)/', // Note that the bracket here is inside the capturing group, since we consider it part of the
// phone number. Will match a pattern like "(650) 223 3345 (754) 223 3321".
'(\\([^(]*)', // Breaks on a hyphen - e.g. "12345 - 332-445-1234 is my number."
// We require a space on either side of the hyphen for it to be considered a separator.
"(?:".concat(pZ, "-|-").concat(pZ, ")").concat(pZ, "*(.+)"), // Various types of wide hyphens. Note we have decided not to enforce a space here, since it's
// possible that it's supposed to be used to break two numbers without spaces, and we haven't
// seen many instances of it used within a number.
"[\u2012-\u2015\uFF0D]".concat(pZ, "*(.+)"), // Breaks on a full stop - e.g. "12345. 332-445-1234 is my number."
"\\.+".concat(pZ, "*([^.]+)"), // Breaks on space - e.g. "3324451234 8002341234"
"".concat(pZ, "+(").concat(PZ, "+)")]; // Limit on the number of leading (plus) characters.

var leadLimit = limit(0, 2); // Limit on the number of consecutive punctuation characters.

var punctuationLimit = limit(0, 4);
/* The maximum number of digits allowed in a digit-separated block. As we allow all digits in a
 * single block, set high enough to accommodate the entire national number and the international
 * country code. */

var digitBlockLimit = MAX_LENGTH_FOR_NSN + MAX_LENGTH_COUNTRY_CODE; // Limit on the number of blocks separated by punctuation.
// Uses digitBlockLimit since some formats use spaces to separate each digit.

var blockLimit = limit(0, digitBlockLimit);
/* A punctuation sequence allowing white space. */

var punctuation = "[".concat(VALID_PUNCTUATION, "]") + punctuationLimit; // A digits block without punctuation.

var digitSequence = pNd + limit(1, digitBlockLimit);
/**
 * Phone number pattern allowing optional punctuation.
 * The phone number pattern used by `find()`, similar to
 * VALID_PHONE_NUMBER, but with the following differences:
 * <ul>
 *   <li>All captures are limited in order to place an upper bound to the text matched by the
 *       pattern.
 * <ul>
 *   <li>Leading punctuation / plus signs are limited.
 *   <li>Consecutive occurrences of punctuation are limited.
 *   <li>Number of digits is limited.
 * </ul>
 *   <li>No whitespace is allowed at the start or end.
 *   <li>No alpha digits (vanity numbers such as 1-800-SIX-FLAGS) are currently supported.
 * </ul>
 */

var PATTERN = '(?:' + LEAD_CLASS + punctuation + ')' + leadLimit + digitSequence + '(?:' + punctuation + digitSequence + ')' + blockLimit + '(?:' + EXTN_PATTERNS_FOR_MATCHING + ')?'; // Regular expression of trailing characters that we want to remove.
// We remove all characters that are not alpha or numerical characters.
// The hash character is retained here, as it may signify
// the previous block was an extension.
//
// // Don't know what does '&&' mean here.
// const UNWANTED_END_CHAR_PATTERN = new RegExp(`[[\\P{N}&&\\P{L}]&&[^#]]+$`)
//

var UNWANTED_END_CHAR_PATTERN = new RegExp("[^".concat(_pN).concat(_pL, "#]+$"));
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;
/**
 * A stateful class that finds and extracts telephone numbers from {@linkplain CharSequence text}.
 * Instances can be created using the {@linkplain PhoneNumberUtil#findNumbers factory methods} in
 * {@link PhoneNumberUtil}.
 *
 * <p>Vanity numbers (phone numbers using alphabetic digits such as <tt>1-800-SIX-FLAGS</tt> are
 * not found.
 *
 * <p>This class is not thread-safe.
 */

var PhoneNumberMatcher = /*#__PURE__*/function () {
  /** The iteration tristate. */

  /** The next index to start searching at. Undefined in {@link State#DONE}. */
  // A cache for frequently used country-specific regular expressions. Set to 32 to cover ~2-3
  // countries being used for the same doc with ~10 patterns for each country. Some pages will have
  // a lot more countries in use, but typically fewer numbers for each so expanding the cache for
  // that use-case won't have a lot of benefit.

  /**
   * Creates a new instance. See the factory methods in {@link PhoneNumberUtil} on how to obtain a
   * new instance.
   *
   * @param util  the phone number util to use
   * @param text  the character sequence that we will search, null for no text
   * @param country  the country to assume for phone numbers not written in international format
   *     (with a leading plus, or with the international dialing prefix of the specified region).
   *     May be null or "ZZ" if only numbers with a leading plus should be
   *     considered.
   * @param leniency  the leniency to use when evaluating candidate phone numbers
   * @param maxTries  the maximum number of invalid numbers to try before giving up on the text.
   *     This is to cover degenerate cases where the text has a lot of false positives in it. Must
   *     be {@code >= 0}.
   */
  function PhoneNumberMatcher() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var metadata = arguments.length > 2 ? arguments[2] : undefined;

    _classCallCheck$7(this, PhoneNumberMatcher);

    _defineProperty$7(this, "state", 'NOT_READY');

    _defineProperty$7(this, "searchIndex", 0);

    _defineProperty$7(this, "regExpCache", new RegExpCache(32));

    options = _objectSpread$5({}, options, {
      defaultCallingCode: options.defaultCallingCode,
      defaultCountry: options.defaultCountry && isSupportedCountry(options.defaultCountry, metadata) ? options.defaultCountry : undefined,
      leniency: options.leniency || options.extended ? 'POSSIBLE' : 'VALID',
      maxTries: options.maxTries || MAX_SAFE_INTEGER
    });

    if (!options.leniency) {
      throw new TypeError('`Leniency` not supplied');
    }

    if (options.maxTries < 0) {
      throw new TypeError('`maxTries` not supplied');
    }

    this.text = text;
    this.options = options;
    this.metadata = metadata;
    /** The degree of validation requested. */

    this.leniency = Leniency[options.leniency];

    if (!this.leniency) {
      throw new TypeError("Unknown leniency: ".concat(options.leniency, "."));
    }
    /** The maximum number of retries after matching an invalid number. */


    this.maxTries = options.maxTries;
    this.PATTERN = new RegExp(PATTERN, 'ig');
  }
  /**
   * Attempts to find the next subsequence in the searched sequence on or after {@code searchIndex}
   * that represents a phone number. Returns the next match, null if none was found.
   *
   * @param index  the search index to start searching at
   * @return  the phone number match found, null if none can be found
   */


  _createClass$6(PhoneNumberMatcher, [{
    key: "find",
    value: function find() // (index)
    {
      // // Reset the regular expression.
      // this.PATTERN.lastIndex = index
      var matches;

      while (this.maxTries > 0 && (matches = this.PATTERN.exec(this.text)) !== null) {
        var candidate = matches[0];
        var offset = matches.index;
        candidate = parsePreCandidate(candidate);

        if (isValidPreCandidate(candidate, offset, this.text)) {
          var match = // Try to come up with a valid match given the entire candidate.
          this.parseAndVerify(candidate, offset, this.text) // If that failed, try to find an "inner match" -
          // there might be a phone number within this candidate.
          || this.extractInnerMatch(candidate, offset, this.text);

          if (match) {
            if (this.options.v2) {
              var phoneNumber = new PhoneNumber(match.country || match.countryCallingCode, match.phone, this.metadata);

              if (match.ext) {
                phoneNumber.ext = match.ext;
              }

              return {
                startsAt: match.startsAt,
                endsAt: match.endsAt,
                number: phoneNumber
              };
            }

            return match;
          }
        }

        this.maxTries--;
      }
    }
    /**
     * Attempts to extract a match from `candidate`
     * if the whole candidate does not qualify as a match.
     */

  }, {
    key: "extractInnerMatch",
    value: function extractInnerMatch(candidate, offset, text) {
      for (var _i = 0, _INNER_MATCHES = INNER_MATCHES; _i < _INNER_MATCHES.length; _i++) {
        var innerMatchPattern = _INNER_MATCHES[_i];
        var isFirstMatch = true;
        var matches = void 0;
        var possibleInnerMatch = new RegExp(innerMatchPattern, 'g');

        while ((matches = possibleInnerMatch.exec(candidate)) !== null && this.maxTries > 0) {
          if (isFirstMatch) {
            // We should handle any group before this one too.
            var _group = trimAfterFirstMatch(UNWANTED_END_CHAR_PATTERN, candidate.slice(0, matches.index));

            var _match = this.parseAndVerify(_group, offset, text);

            if (_match) {
              return _match;
            }

            this.maxTries--;
            isFirstMatch = false;
          }

          var group = trimAfterFirstMatch(UNWANTED_END_CHAR_PATTERN, matches[1]); // Java code does `groupMatcher.start(1)` here,
          // but there's no way in javascript to get a group match start index,
          // therefore using the overall match start index `matches.index`.

          var match = this.parseAndVerify(group, offset + matches.index, text);

          if (match) {
            return match;
          }

          this.maxTries--;
        }
      }
    }
    /**
     * Parses a phone number from the `candidate` using `parseNumber` and
     * verifies it matches the requested `leniency`. If parsing and verification succeed,
     * a corresponding `PhoneNumberMatch` is returned, otherwise this method returns `null`.
     *
     * @param candidate  the candidate match
     * @param offset  the offset of {@code candidate} within {@link #text}
     * @return  the parsed and validated phone number match, or null
     */

  }, {
    key: "parseAndVerify",
    value: function parseAndVerify(candidate, offset, text) {
      if (!isValidCandidate(candidate, offset, text, this.options.leniency)) {
        return;
      }

      var number = parse$1(candidate, {
        extended: true,
        defaultCountry: this.options.defaultCountry,
        defaultCallingCode: this.options.defaultCallingCode
      }, this.metadata);

      if (!number.possible) {
        return;
      }

      if (this.leniency(number, candidate, this.metadata, this.regExpCache)) {
        // // We used parseAndKeepRawInput to create this number,
        // // but for now we don't return the extra values parsed.
        // // TODO: stop clearing all values here and switch all users over
        // // to using rawInput() rather than the rawString() of PhoneNumberMatch.
        // number.clearCountryCodeSource()
        // number.clearRawInput()
        // number.clearPreferredDomesticCarrierCode()
        var result = {
          startsAt: offset,
          endsAt: offset + candidate.length,
          phone: number.phone
        };

        if (number.country && number.country !== '001') {
          result.country = number.country;
        } else {
          result.countryCallingCode = number.countryCallingCode;
        }

        if (number.ext) {
          result.ext = number.ext;
        }

        return result;
      }
    }
  }, {
    key: "hasNext",
    value: function hasNext() {
      if (this.state === 'NOT_READY') {
        this.lastMatch = this.find(); // (this.searchIndex)

        if (this.lastMatch) {
          // this.searchIndex = this.lastMatch.endsAt
          this.state = 'READY';
        } else {
          this.state = 'DONE';
        }
      }

      return this.state === 'READY';
    }
  }, {
    key: "next",
    value: function next() {
      // Check the state and find the next match as a side-effect if necessary.
      if (!this.hasNext()) {
        throw new Error('No next element');
      } // Don't retain that memory any longer than necessary.


      var result = this.lastMatch;
      this.lastMatch = null;
      this.state = 'NOT_READY';
      return result;
    }
  }]);

  return PhoneNumberMatcher;
}();

function _typeof$2(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$2 = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof$2 = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof$2(obj);
}

function _classCallCheck$8(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties$7(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass$7(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$7(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$7(Constructor, staticProps);
  return Constructor;
}

function _defineProperty$8(obj, key, value) {
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
} // This is an enhanced port of Google Android `libphonenumber`'s
// Could be any digit, I guess.

var DUMMY_DIGIT = '9'; // I don't know why is it exactly `15`

var LONGEST_NATIONAL_PHONE_NUMBER_LENGTH = 15; // Create a phone number consisting only of the digit 9 that matches the
// `number_pattern` by applying the pattern to the "longest phone number" string.

var LONGEST_DUMMY_PHONE_NUMBER = repeat(DUMMY_DIGIT, LONGEST_NATIONAL_PHONE_NUMBER_LENGTH); // The digits that have not been entered yet will be represented by a \u2008,
// the punctuation space.

var DIGIT_PLACEHOLDER = 'x'; // '\u2008' (punctuation space)

var DIGIT_PLACEHOLDER_MATCHER = new RegExp(DIGIT_PLACEHOLDER); // A set of characters that, if found in a national prefix formatting rules, are an indicator to
// us that we should separate the national prefix from the number when formatting.

var NATIONAL_PREFIX_SEPARATORS_PATTERN = /[- ]/; // Deprecated: Google has removed some formatting pattern related code from their repo.
// An example of a character class is "[1-4]".

var CREATE_CHARACTER_CLASS_PATTERN =  function () {
  return /\[([^\[\]])*\]/g;
}; // Any digit in a regular expression that actually denotes a digit. For
// example, in the regular expression "80[0-2]\d{6,10}", the first 2 digits
// (8 and 0) are standalone digits, but the rest are not.
// Two look-aheads are needed because the number following \\d could be a
// two-digit number, since the phone number can be as long as 15 digits.


var CREATE_STANDALONE_DIGIT_PATTERN =  function () {
  return /\d(?=[^,}][^,}])/g;
}; // A pattern that is used to determine if a `format` is eligible
// to be used by the "as you type formatter".
// It is eligible when the `format` contains groups of the dollar sign
// followed by a single digit, separated by valid phone number punctuation.
// This prevents invalid punctuation (such as the star sign in Israeli star numbers)
// getting into the output of the "as you type formatter".


var ELIGIBLE_FORMAT_PATTERN = new RegExp('^' + '[' + VALID_PUNCTUATION + ']*' + '(\\$\\d[' + VALID_PUNCTUATION + ']*)+' + '$'); // This is the minimum length of the leading digits of a phone number
// to guarantee the first "leading digits pattern" for a phone number format
// to be preemptive.

var MIN_LEADING_DIGITS_LENGTH = 3;
var VALID_FORMATTED_PHONE_NUMBER_PART = '[' + VALID_PUNCTUATION + VALID_DIGITS + ']+';
var VALID_FORMATTED_PHONE_NUMBER_PART_PATTERN = new RegExp('^' + VALID_FORMATTED_PHONE_NUMBER_PART + '$', 'i');
var VALID_PHONE_NUMBER$2 = '(?:' + '[' + PLUS_CHARS + ']' + '[' + VALID_PUNCTUATION + VALID_DIGITS + ']*' + '|' + '[' + VALID_PUNCTUATION + VALID_DIGITS + ']+' + ')';
var AFTER_PHONE_NUMBER_DIGITS_END_PATTERN = new RegExp('[^' + VALID_PUNCTUATION + VALID_DIGITS + ']+' + '.*' + '$');

var AsYouType = /*#__PURE__*/function () {
  // Not setting `options` to a constructor argument
  // not to break backwards compatibility
  // for older versions of the library.

  /**
   * @param {(string|object)?} [optionsOrDefaultCountry] - The default country used for parsing non-international phone numbers. Can also be an `options` object.
   * @param {Object} metadata
   */
  function AsYouType(optionsOrDefaultCountry, metadata) {
    _classCallCheck$8(this, AsYouType);

    _defineProperty$8(this, "options", {});

    this.metadata = new Metadata(metadata); // Set `defaultCountry` and `defaultCallingCode` options.

    var defaultCountry;
    var defaultCallingCode; // Turns out `null` also has type "object". Weird.

    if (optionsOrDefaultCountry) {
      if (_typeof$2(optionsOrDefaultCountry) === 'object') {
        defaultCountry = optionsOrDefaultCountry.defaultCountry;
        defaultCallingCode = optionsOrDefaultCountry.defaultCallingCode;
      } else {
        defaultCountry = optionsOrDefaultCountry;
      }
    }

    if (defaultCountry && this.metadata.hasCountry(defaultCountry)) {
      this.defaultCountry = defaultCountry;
    }

    if (defaultCallingCode) {

      this.defaultCallingCode = defaultCallingCode;
    } // Reset.


    this.reset();
  }

  _createClass$7(AsYouType, [{
    key: "reset",
    value: function reset() {
      this.formattedOutput = '';
      this.international = false;
      this.internationalPrefix = undefined;
      this.countryCallingCode = undefined;
      this.digits = '';
      this.nationalNumberDigits = '';
      this.nationalPrefix = '';
      this.carrierCode = '';
      this.setCountry(this.defaultCountry, this.defaultCallingCode);
      return this;
    }
  }, {
    key: "resetFormat",
    value: function resetFormat() {
      this.chosenFormat = undefined;
      this.template = undefined;
      this.populatedNationalNumberTemplate = undefined;
      this.populatedNationalNumberTemplatePosition = -1;
    }
    /**
     * Returns `true` if the phone number is being input in international format.
     * In other words, returns `true` if and only if the parsed phone number starts with a `"+"`.
     * @return {boolean}
     */

  }, {
    key: "isInternational",
    value: function isInternational() {
      return this.international;
    }
    /**
     * Returns the "country calling code" part of the phone number.
     * Returns `undefined` if the number is not being input in international format.
     * Returns "country calling code" for "non-geographic" phone numbering plans too.
     * @return {string} [countryCallingCode]
     */

  }, {
    key: "getCountryCallingCode",
    value: function getCountryCallingCode() {
      return this.countryCallingCode;
    }
    /**
     * Returns a two-letter country code of the phone number.
     * Returns `undefined` for "non-geographic" phone numbering plans.
     * Returns `undefined` if no phone number has been input yet.
     * @return {string} [country]
     */

  }, {
    key: "getCountry",
    value: function getCountry() {
      // If no digits have been input yet,
      // then `this.country` is the `defaultCountry`.
      // Won't return the `defaultCountry` in such case.
      if (!this.digits) {
        return;
      }

      var countryCode = this.country;

      return countryCode;
    }
  }, {
    key: "setCountry",
    value: function setCountry(country, callingCode) {
      this.country = country;
      this.metadata.selectNumberingPlan(country, callingCode);

      if (this.metadata.hasSelectedNumberingPlan()) {
        this.initializePhoneNumberFormatsForCountry();
      } else {
        this.matchingFormats = [];
      }

      this.resetFormat();
    }
    /**
     * Inputs "next" phone number characters.
     * @param  {string} text
     * @return {string} Formatted phone number characters that have been input so far.
     */

  }, {
    key: "input",
    value: function input(text) {
      var formattedDigits = this.extractFormattedDigits(text); // If the extracted phone number part
      // can possibly be a part of some valid phone number
      // then parse phone number characters from a formatted phone number.

      if (VALID_FORMATTED_PHONE_NUMBER_PART_PATTERN.test(formattedDigits)) {
        this.formattedOutput = this.getFullNumber(this.inputDigits(parseDigits(formattedDigits)) || this.getNonFormattedNationalNumber());
      }

      return this.formattedOutput;
    }
    /**
     * Extracts formatted phone number digits from text (if there're any).
     * @param  {string} text
     * @return {string}
     */

  }, {
    key: "extractFormattedDigits",
    value: function extractFormattedDigits(text) {
      // Extract a formatted phone number part from text.
      var extractedNumber = extractFormattedPhoneNumber$1(text) || ''; // Trim a `+`.

      if (extractedNumber[0] === '+') {
        // Trim the `+`.
        extractedNumber = extractedNumber.slice('+'.length);

        if (this.digits) ; else {
          this.formattedOutput = '+';
          this.startInternationalNumber();
        }
      }

      return extractedNumber;
    }
  }, {
    key: "startInternationalNumber",
    value: function startInternationalNumber() {
      // Prepend the `+` to parsed input.
      this.international = true; // If a default country was set then reset it
      // because an explicitly international phone
      // number is being entered.

      this.setCountry();
    }
    /**
     * Inputs "next" phone number digits.
     * @param  {string} digits
     * @return {string} [formattedNumber] Formatted national phone number (if it can be formatted at this stage). Returning `undefined` means "don't format the national phone number at this stage".
     */

  }, {
    key: "inputDigits",
    value: function inputDigits(nextDigits) {
      // Some users input their phone number in "out-of-country"
      // dialing format instead of using the leading `+`.
      // https://github.com/catamphetamine/libphonenumber-js/issues/185
      // Detect such numbers.
      if (!this.digits) {
        var numberWithoutIDD = stripIDDPrefix(nextDigits, this.defaultCountry, this.defaultCallingCode, this.metadata.metadata);

        if (numberWithoutIDD && numberWithoutIDD !== nextDigits) {
          // If an IDD prefix was stripped then
          // convert the number to international one
          // for subsequent parsing.
          this.internationalPrefix = nextDigits.slice(0, nextDigits.length - numberWithoutIDD.length);
          nextDigits = numberWithoutIDD;
          this.startInternationalNumber();
        }
      } // Append phone number digits.


      this.digits += nextDigits; // Try to format the parsed input

      if (this.isInternational()) {
        if (this.countryCallingCode) {
          this.nationalNumberDigits += nextDigits; // `this.country` could be `undefined`, for example, when there is
          // ambiguity in a form of several different countries,
          // each corresponding to the same country phone code
          // (e.g. NANPA: USA, Canada, etc), and there's not enough digits
          // to reliably determine the country the phone number belongs to.
          // Therefore, in cases of such ambiguity, each time something is input,
          // try to determine the country (if it hasn't been determined yet).

          if (!this.country || this.isCountryCallingCodeAmbiguous()) {
            this.determineTheCountry();
          }
        } else {
          // Extract country calling code from the digits entered so far.
          // There must be some digits in order to extract anything from them.
          //
          // If one looks at country phone codes
          // then they can notice that no one country phone code
          // is ever a (leftmost) substring of another country phone code.
          // So if a valid country code is extracted so far
          // then it means that this is the country code.
          //
          // If no country phone code could be extracted so far,
          // then don't format the phone number.
          //
          if (!this.extractCountryCallingCode()) {
            // Don't format the phone number.
            return;
          } // Possibly extract a national prefix.
          // Some people incorrectly input national prefix
          // in an international phone number.
          // For example, some people write British phone numbers as `+44(0)...`.
          // Also, mobile phone numbers in Mexico are supposed to be dialled
          // internationally using a `15` national prefix.
          //
          // https://www.mexperience.com/dialing-cell-phones-in-mexico/
          //
          // "Dialing a Mexican cell phone from abroad
          // When you are calling a cell phone number in Mexico from outside Mexico,
          // it’s necessary to dial an additional “1” after Mexico’s country code
          // (which is “52”) and before the area code.
          // You also ignore the 045, and simply dial the area code and the
          // cell phone’s number.
          //
          // If you don’t add the “1”, you’ll receive a recorded announcement
          // asking you to redial using it.
          //
          // For example, if you are calling from the USA to a cell phone
          // in Mexico City, you would dial +52 – 1 – 55 – 1234 5678.
          // (Note that this is different to calling a land line in Mexico City
          // from abroad, where the number dialed would be +52 – 55 – 1234 5678)".
          //


          this.nationalNumberDigits = this.digits.slice(this.countryCallingCode.length); // this.extractNationalPrefix()
          //
          // Determine the country from country calling code and national number.

          this.determineTheCountry();
        }
      } else {
        this.nationalNumberDigits += nextDigits; // If `defaultCallingCode` is set,
        // see if the `country` could be derived.

        if (!this.country) {
          this.determineTheCountry();
        } // Some national prefixes are substrings of other national prefixes
        // (for the same country), therefore try to extract national prefix each time
        // because a longer national prefix might be available at some point in time.


        var previousNationalPrefix = this.nationalPrefix;
        this.nationalNumberDigits = this.nationalPrefix + this.nationalNumberDigits; // Re-extract national prefix.

        this.extractNationalPrefix(); // If another national prefix has been extracted.

        if (this.nationalPrefix !== previousNationalPrefix) {
          // National number has changed
          // (due to another national prefix been extracted)
          // therefore national number has changed
          // therefore reset all previous formatting data.
          // (and leading digits matching state)
          this.initializePhoneNumberFormatsForCountry();
          this.resetFormat();
        }
      }

      if (this.nationalNumberDigits) {
        // Match the available formats by the currently available leading digits.
        this.matchFormats(this.nationalNumberDigits);
      } // Format the phone number (given the next digits)


      return this.formatNationalNumberWithNextDigits(nextDigits);
    }
  }, {
    key: "formatNationalNumberWithNextDigits",
    value: function formatNationalNumberWithNextDigits(nextDigits) {
      // See if the phone number digits can be formatted as a complete phone number.
      // If not, use the results from `formatNextNationalNumberDigits()`,
      // which formats based on the chosen formatting pattern.
      // Attempting to format complete phone number first is how it's done
      // in Google's `libphonenumber`.
      var formattedNumber = this.attemptToFormatCompletePhoneNumber(); // Just because a phone number doesn't have a suitable format
      // that doesn't mean that the phone number is invalid,
      // because phone number formats only format phone numbers,
      // they don't validate them and some (rare) phone numbers
      // are meant to stay non-formatted.

      if (formattedNumber) {
        return formattedNumber;
      } // Format the next phone number digits
      // using the previously chosen phone number format.
      //
      // This is done here because if `attemptToFormatCompletePhoneNumber`
      // was placed before this call then the `template`
      // wouldn't reflect the situation correctly (and would therefore be inconsistent)
      //


      var previouslyChosenFormat = this.chosenFormat; // Choose a format from the list of matching ones.

      var newlyChosenFormat = this.chooseFormat();

      if (newlyChosenFormat) {
        if (newlyChosenFormat === previouslyChosenFormat) {
          // If could format the next (current) digit
          // using the previously chosen phone number format
          // then return the formatted number so far.
          //
          // If no new phone number format could be chosen,
          // and couldn't format the supplied national number
          // using the previously chosen phone number pattern,
          // then return `undefined`.
          //
          return this.formatNextNationalNumberDigits(nextDigits);
        } else {
          // If a more appropriate phone number format
          // has been chosen for these "leading digits",
          // then format the national phone number (so far)
          // using the newly selected format.
          //
          // Will return `undefined` if it couldn't format
          // the supplied national number
          // using the selected phone number pattern.
          //
          return this.reformatNationalNumber();
        }
      }
    }
  }, {
    key: "chooseFormat",
    value: function chooseFormat() {
      // When there are multiple available formats, the formatter uses the first
      // format where a formatting template could be created.
      for (var _iterator = this.matchingFormats, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var format = _ref; // If this format is currently being used
        // and is still possible, then stick to it.

        if (this.chosenFormat === format) {
          break;
        }

        if (!this.createFormattingTemplate(format)) {
          continue;
        }

        this.chosenFormat = format; // With a new formatting template, the matched position
        // using the old template needs to be reset.

        this.populatedNationalNumberTemplatePosition = -1;
        break;
      }

      if (!this.chosenFormat) {
        // No format matches the national phone number entered.
        this.resetFormat();
      }

      return this.chosenFormat;
    } // Formats each digit of the national phone number (so far)
    // using the selected format.

  }, {
    key: "reformatNationalNumber",
    value: function reformatNationalNumber() {
      return this.formatNextNationalNumberDigits(this.nationalPrefix + this.nationalNumberDigits);
    }
  }, {
    key: "initializePhoneNumberFormatsForCountry",
    value: function initializePhoneNumberFormatsForCountry() {
      // Get all "eligible" phone number formats for this country
      this.matchingFormats = this.metadata.formats().filter(function (format) {
        // Compared to `libphonenumber`'s code, the two "Discard a few formats
        // that we know are not relevant based on the presence of the national prefix"
        // checks have changed: the first one has been moved to `.matchFormats()`,
        // and the second one doesn't apply to this library because it doesn't deal with
        // "incomplete" phone numbers (for example, phone numbers, entered without "area code").
        return ELIGIBLE_FORMAT_PATTERN.test(format.internationalFormat());
      });
    }
  }, {
    key: "matchFormats",
    value: function matchFormats(leadingDigits) {
      var _this = this; // "leading digits" pattern list starts with a
      // "leading digits" pattern fitting a maximum of 3 leading digits.
      // So, after a user inputs 3 digits of a national (significant) phone number
      // this national (significant) number can already be formatted.
      // The next "leading digits" pattern is for 4 leading digits max,
      // and the "leading digits" pattern after it is for 5 leading digits max, etc.
      // This implementation is different from Google's
      // in that it searches for a fitting format
      // even if the user has entered less than
      // `MIN_LEADING_DIGITS_LENGTH` digits of a national number.
      // Because some leading digit patterns already match for a single first digit.


      var leadingDigitsPatternIndex = leadingDigits.length - MIN_LEADING_DIGITS_LENGTH;

      if (leadingDigitsPatternIndex < 0) {
        leadingDigitsPatternIndex = 0;
      }

      this.matchingFormats = this.matchingFormats.filter(function (format) {
        // If national prefix is mandatory for this phone number format
        // and the user didn't input the national prefix
        // then this phone number format isn't suitable.
        if (!_this.isInternational() && !_this.nationalPrefix && format.nationalPrefixIsMandatoryWhenFormattingInNationalFormat()) {
          return false;
        }

        var leadingDigitsPatternsCount = format.leadingDigitsPatterns().length; // If this format is not restricted to a certain
        // leading digits pattern then it fits.

        if (leadingDigitsPatternsCount === 0) {
          return true;
        } // Start excluding any non-matching formats only when the
        // national number entered so far is at least 3 digits long,
        // otherwise format matching would give false negatives.
        // For example, when the digits entered so far are `2`
        // and the leading digits pattern is `21` –
        // it's quite obvious in this case that the format could be the one
        // but due to the absence of further digits it would give false negative.


        if (leadingDigits.length < MIN_LEADING_DIGITS_LENGTH) {
          return true;
        } // If at least `MIN_LEADING_DIGITS_LENGTH` digits of a national number are available
        // then format matching starts narrowing down the list of possible formats
        // (only previously matched formats are considered for next digits).


        leadingDigitsPatternIndex = Math.min(leadingDigitsPatternIndex, leadingDigitsPatternsCount - 1);
        var leadingDigitsPattern = format.leadingDigitsPatterns()[leadingDigitsPatternIndex]; // Brackets are required for `^` to be applied to
        // all or-ed (`|`) parts, not just the first one.

        return new RegExp("^(".concat(leadingDigitsPattern, ")")).test(leadingDigits);
      }); // If there was a phone number format chosen
      // and it no longer holds given the new leading digits then reset it.
      // The test for this `if` condition is marked as:
      // "Reset a chosen format when it no longer holds given the new leading digits".
      // To construct a valid test case for this one can find a country
      // in `PhoneNumberMetadata.xml` yielding one format for 3 `<leadingDigits>`
      // and yielding another format for 4 `<leadingDigits>` (Australia in this case).

      if (this.chosenFormat && this.matchingFormats.indexOf(this.chosenFormat) === -1) {
        this.resetFormat();
      }
    }
  }, {
    key: "getSeparatorAfterNationalPrefix",
    value: function getSeparatorAfterNationalPrefix(format) {
      if (this.metadata.countryCallingCode() === '1') {
        return ' ';
      }

      if (format && format.nationalPrefixFormattingRule() && NATIONAL_PREFIX_SEPARATORS_PATTERN.test(format.nationalPrefixFormattingRule())) {
        return ' ';
      }

      return '';
    } // This is in accordance to how Google's `libphonenumber` does it.
    // "Check to see if there is an exact pattern match for these digits.
    // If so, we should use this instead of any other formatting template
    // whose `leadingDigitsPattern` also matches the input."

  }, {
    key: "attemptToFormatCompletePhoneNumber",
    value: function attemptToFormatCompletePhoneNumber() {
      for (var _iterator2 = this.matchingFormats, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var format = _ref2;
        var matcher = new RegExp("^(?:".concat(format.pattern(), ")$"));

        if (!matcher.test(this.nationalNumberDigits)) {
          continue;
        } // Here, national number is formatted without "national prefix
        // formatting rule", because otherwise there'd be a bug
        // when "area code" is "duplicated" during input:
        // https://github.com/catamphetamine/libphonenumber-js/issues/318


        var formattedNationalNumber = formatNationalNumberUsingFormat(this.nationalNumberDigits, format, this.isInternational(), false, // Don't prepend national prefix (it will be prepended manually).
        this.metadata); // Check if this `format` preserves all digits.
        // This is how it's done in Google's `libphonenumber`.
        // Also, it fixes the bug when "area code" is "duplicated" during input:
        // https://github.com/catamphetamine/libphonenumber-js/issues/318
        //
        // "Check that we didn't remove nor add any extra digits when we matched
        // this formatting pattern. This usually happens after we entered the last
        // digit during AYTF. Eg: In case of MX, we swallow mobile token (1) when
        // formatted but AYTF should retain all the number entered and not change
        // in order to match a format (of same leading digits and length) display
        // in that way."
        // "If it's the same (i.e entered number and format is same), then it's
        // safe to return this in formatted number as nothing is lost / added."
        // Otherwise, don't use this format.
        // https://github.com/google/libphonenumber/commit/3e7c1f04f5e7200f87fb131e6f85c6e99d60f510#diff-9149457fa9f5d608a11bb975c6ef4bc5
        // https://github.com/google/libphonenumber/commit/3ac88c7106e7dcb553bcc794b15f19185928a1c6#diff-2dcb77e833422ee304da348b905cde0b
        //

        if (parseDigits(formattedNationalNumber) !== this.nationalNumberDigits) {
          continue;
        } // Prepend national prefix (if any).


        if (this.nationalPrefix) {
          // Here, national number is formatted with "national prefix
          // formatting rule". The reason is that "national prefix
          // formatting rule" often adds parentheses, and while Google's
          // `libphonenumber` dismisses those preferring simply prepending
          // national prefix followed by a " " character, this library
          // looks if the national prefix could be formatted better.
          var formattedNationalNumberWithNationalPrefix = formatNationalNumberUsingFormat(this.nationalNumberDigits, format, this.isInternational(), true, // Prepend national prefix.
          this.metadata);

          if (parseDigits(formattedNationalNumberWithNationalPrefix) === this.nationalPrefix + this.nationalNumberDigits) {
            formattedNationalNumber = formattedNationalNumberWithNationalPrefix;
          } else {
            formattedNationalNumber = this.nationalPrefix + this.getSeparatorAfterNationalPrefix(format) + formattedNationalNumber;
          }
        } // formats national number (probably) without national prefix.
        // Formatting a national number with national prefix could result in
        // bugs when "area code" is "duplicated" during input:
        // https://github.com/catamphetamine/libphonenumber-js/issues/318
        // The "are all digits preserved" check fixes that type of bug.
        // To leave the formatter in a consistent state


        this.resetFormat();
        this.chosenFormat = format; // Set `this.template` and `this.populatedNationalNumberTemplate`.

        /* istanbul ignore else */

        if (this.createFormattingTemplate(format)) {
          // Populate `this.populatedNationalNumberTemplate` with phone number digits.
          this.reformatNationalNumber();
        } else {
          // If the formatting template couldn't be created for a format,
          // create it manually from the formatted phone number.
          // This case doesn't ever happen with the current metadata.
          this.template = this.getFullNumber(formattedNationalNumber).replace(/[\d\+]/g, DIGIT_PLACEHOLDER);
          this.populatedNationalNumberTemplate = formattedNationalNumber;
          this.populatedNationalNumberTemplatePosition = this.populatedNationalNumberTemplate.length - 1;
        }

        return formattedNationalNumber;
      }
    }
  }, {
    key: "getInternationalPrefix",
    value: function getInternationalPrefix(options) {
      return this.internationalPrefix ? options && options.spacing === false ? this.internationalPrefix : this.internationalPrefix + ' ' : '+';
    } // Prepends `+CountryCode ` in case of an international phone number

  }, {
    key: "getFullNumber",
    value: function getFullNumber(formattedNationalNumber) {
      if (this.isInternational()) {
        var prefix = this.getInternationalPrefix();

        if (!this.countryCallingCode) {
          return "".concat(prefix).concat(this.digits);
        }

        if (!formattedNationalNumber) {
          return "".concat(prefix).concat(this.countryCallingCode);
        }

        return "".concat(prefix).concat(this.countryCallingCode, " ").concat(formattedNationalNumber);
      }

      return formattedNationalNumber;
    }
  }, {
    key: "getNonFormattedNationalNumber",
    value: function getNonFormattedNationalNumber() {
      return this.nationalPrefix + (this.nationalPrefix && this.nationalNumberDigits && this.getSeparatorAfterNationalPrefix()) + this.nationalNumberDigits;
    } // Extracts the country calling code from the beginning
    // of the entered `national_number` (so far),
    // and places the remaining input into the `national_number`.

  }, {
    key: "extractCountryCallingCode",
    value: function extractCountryCallingCode$1() {
      var _extractCountryCallin = extractCountryCallingCode('+' + this.digits, this.defaultCountry, this.defaultCallingCode, this.metadata.metadata),
          countryCallingCode = _extractCountryCallin.countryCallingCode,
          number = _extractCountryCallin.number;

      if (!countryCallingCode) {
        return;
      }

      this.nationalNumberDigits = number;
      this.countryCallingCode = countryCallingCode;
      this.metadata.chooseCountryByCountryCallingCode(countryCallingCode);
      this.initializePhoneNumberFormatsForCountry();
      this.resetFormat();
      return this.metadata.hasSelectedNumberingPlan();
    }
  }, {
    key: "extractNationalPrefix",
    value: function extractNationalPrefix() {
      this.nationalPrefix = '';

      if (!this.metadata.hasSelectedNumberingPlan()) {
        return;
      } // Only strip national prefixes for non-international phone numbers
      // because national prefixes can't be present in international phone numbers.
      // While `parseNumber()` is forgiving is such cases, `AsYouType` is not.


      var _stripNationalPrefixA = stripNationalPrefixAndCarrierCode(this.nationalNumberDigits, this.metadata),
          nationalNumber = _stripNationalPrefixA.nationalNumber,
          carrierCode = _stripNationalPrefixA.carrierCode; // Sometimes `stripNationalPrefixAndCarrierCode()` won't actually
      // strip national prefix and will instead prepend some digits to the `number`:
      // for example, when number `2345678` is passed with `VI` country selected,
      // it will return `{ number: "3402345678" }`, because `340` area code is prepended.
      // So check if the `nationalNumber` is actually at the end of `this.nationalNumberDigits`.


      if (nationalNumber) {
        var index = this.nationalNumberDigits.indexOf(nationalNumber);

        if (index < 0 || index !== this.nationalNumberDigits.length - nationalNumber.length) {
          return;
        }
      }

      if (carrierCode) {
        this.carrierCode = carrierCode;
      }

      this.nationalPrefix = this.nationalNumberDigits.slice(0, this.nationalNumberDigits.length - nationalNumber.length);
      this.nationalNumberDigits = nationalNumber;
      return this.nationalPrefix;
    } // isPossibleNumber(number) {
    // 	switch (checkNumberLengthForType(number, undefined, this.metadata)) {
    // 		case 'IS_POSSIBLE':
    // 			return true
    // 		// case 'IS_POSSIBLE_LOCAL_ONLY':
    // 		// 	return !this.isInternational()
    // 		default:
    // 			return false
    // 	}
    // }

  }, {
    key: "isCountryCallingCodeAmbiguous",
    value: function isCountryCallingCodeAmbiguous() {
      var countryCodes = this.metadata.getCountryCodesForCallingCode(this.countryCallingCode);
      return countryCodes && countryCodes.length > 1;
    }
  }, {
    key: "createFormattingTemplate",
    value: function createFormattingTemplate(format) {
      // The formatter doesn't format numbers when numberPattern contains '|', e.g.
      // (20|3)\d{4}. In those cases we quickly return.
      // (Though there's no such format in current metadata)

      /* istanbul ignore if */
      if ( format.pattern().indexOf('|') >= 0) {
        return;
      } // Get formatting template for this phone number format


      var template = this.getTemplateForNumberFormatPattern(format, this.nationalPrefix); // If the national number entered is too long
      // for any phone number format, then abort.

      if (!template) {
        return;
      }

      this.template = template;
      this.populatedNationalNumberTemplate = template; // For convenience, the public `.template` property
      // contains the whole international number
      // if the phone number being input is international:
      // 'x' for the '+' sign, 'x'es for the country phone code,
      // a spacebar and then the template for the formatted national number.

      if (this.isInternational()) {
        this.template = this.getInternationalPrefix().replace(/[\d\+]/g, DIGIT_PLACEHOLDER) + repeat(DIGIT_PLACEHOLDER, this.countryCallingCode.length) + ' ' + template;
      }

      return this.template;
    }
    /**
     * Generates formatting template for a national phone number,
     * optionally containing a national prefix, for a format.
     * @param  {Format} format
     * @param  {string} nationalPrefix
     * @return {string}
     */

  }, {
    key: "getTemplateForNumberFormatPattern",
    value: function getTemplateForNumberFormatPattern(format, nationalPrefix) {
      var pattern = format.pattern();
      /* istanbul ignore else */

      {
        pattern = pattern // Replace anything in the form of [..] with \d
        .replace(CREATE_CHARACTER_CLASS_PATTERN(), '\\d') // Replace any standalone digit (not the one in `{}`) with \d
        .replace(CREATE_STANDALONE_DIGIT_PATTERN(), '\\d');
      } // Generate a dummy national number (consisting of `9`s)
      // that fits this format's `pattern`.
      //
      // This match will always succeed,
      // because the "longest dummy phone number"
      // has enough length to accomodate any possible
      // national phone number format pattern.
      //


      var digits = LONGEST_DUMMY_PHONE_NUMBER.match(pattern)[0]; // If the national number entered is too long
      // for any phone number format, then abort.

      if (this.nationalNumberDigits.length > digits.length) {
        return;
      } // Get a formatting template which can be used to efficiently format
      // a partial number where digits are added one by one.
      // Below `strictPattern` is used for the
      // regular expression (with `^` and `$`).
      // This wasn't originally in Google's `libphonenumber`
      // and I guess they don't really need it
      // because they're not using "templates" to format phone numbers
      // but I added `strictPattern` after encountering
      // South Korean phone number formatting bug.
      //
      // Non-strict regular expression bug demonstration:
      //
      // this.nationalNumberDigits : `111111111` (9 digits)
      //
      // pattern : (\d{2})(\d{3,4})(\d{4})
      // format : `$1 $2 $3`
      // digits : `9999999999` (10 digits)
      //
      // '9999999999'.replace(new RegExp(/(\d{2})(\d{3,4})(\d{4})/g), '$1 $2 $3') = "99 9999 9999"
      //
      // template : xx xxxx xxxx
      //
      // But the correct template in this case is `xx xxx xxxx`.
      // The template was generated incorrectly because of the
      // `{3,4}` variability in the `pattern`.
      //
      // The fix is, if `this.nationalNumberDigits` has already sufficient length
      // to satisfy the `pattern` completely then `this.nationalNumberDigits`
      // is used instead of `digits`.


      var strictPattern = new RegExp('^' + pattern + '$');
      var nationalNumberDummyDigits = this.nationalNumberDigits.replace(/\d/g, DUMMY_DIGIT); // If `this.nationalNumberDigits` has already sufficient length
      // to satisfy the `pattern` completely then use it
      // instead of `digits`.

      if (strictPattern.test(nationalNumberDummyDigits)) {
        digits = nationalNumberDummyDigits;
      }

      var numberFormat = this.getFormatFormat(format);
      var includesNationalPrefix;

      if (nationalPrefix) {
        if (format.nationalPrefixFormattingRule()) {
          var numberFormatWithNationalPrefix = numberFormat.replace(FIRST_GROUP_PATTERN, format.nationalPrefixFormattingRule());

          if (parseDigits(numberFormatWithNationalPrefix) === nationalPrefix + parseDigits(numberFormat)) {
            numberFormat = numberFormatWithNationalPrefix;
            includesNationalPrefix = true;
            var i = nationalPrefix.length;

            while (i > 0) {
              numberFormat = numberFormat.replace(/\d/, DIGIT_PLACEHOLDER);
              i--;
            }
          }
        }
      } // Generate formatting template for this phone number format.


      var template = digits // Format the dummy phone number according to the format.
      .replace(new RegExp(pattern), numberFormat) // Replace each dummy digit with a DIGIT_PLACEHOLDER.
      .replace(new RegExp(DUMMY_DIGIT, 'g'), DIGIT_PLACEHOLDER);

      if (nationalPrefix) {
        if (!includesNationalPrefix) {
          // Prepend national prefix to the template manually.
          template = repeat(DIGIT_PLACEHOLDER, nationalPrefix.length) + this.getSeparatorAfterNationalPrefix(format) + template;
        }
      }

      return template;
    }
  }, {
    key: "formatNextNationalNumberDigits",
    value: function formatNextNationalNumberDigits(digits) {
      // Using `.split('')` to iterate through a string here
      // to avoid requiring `Symbol.iterator` polyfill.
      // `.split('')` is generally not safe for Unicode,
      // but in this particular case for `digits` it is safe.
      // for (const digit of digits)
      for (var _iterator3 = digits.split(''), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray3) {
          if (_i3 >= _iterator3.length) break;
          _ref3 = _iterator3[_i3++];
        } else {
          _i3 = _iterator3.next();
          if (_i3.done) break;
          _ref3 = _i3.value;
        }

        var digit = _ref3; // If there is room for more digits in current `template`,
        // then set the next digit in the `template`,
        // and return the formatted digits so far.
        // If more digits are entered than the current format could handle.

        if (this.populatedNationalNumberTemplate.slice(this.populatedNationalNumberTemplatePosition + 1).search(DIGIT_PLACEHOLDER_MATCHER) < 0) {
          // Reset the format.
          this.resetFormat();
          return;
        }

        this.populatedNationalNumberTemplatePosition = this.populatedNationalNumberTemplate.search(DIGIT_PLACEHOLDER_MATCHER);
        this.populatedNationalNumberTemplate = this.populatedNationalNumberTemplate.replace(DIGIT_PLACEHOLDER_MATCHER, digit);
      } // Return the formatted phone number so far.


      return cutAndStripNonPairedParens(this.populatedNationalNumberTemplate, this.populatedNationalNumberTemplatePosition + 1); // The old way which was good for `input-format` but is not so good
      // for `react-phone-number-input`'s default input (`InputBasic`).
      // return closeNonPairedParens(this.populatedNationalNumberTemplate, this.populatedNationalNumberTemplatePosition + 1)
      // 	.replace(new RegExp(DIGIT_PLACEHOLDER, 'g'), ' ')
    }
  }, {
    key: "getFormatFormat",
    value: function getFormatFormat(format) {
      if (this.isInternational()) {
        return applyInternationalSeparatorStyle(format.internationalFormat());
      }

      return format.format();
    } // Determines the country of the phone number
    // entered so far based on the country phone code
    // and the national phone number.

  }, {
    key: "determineTheCountry",
    value: function determineTheCountry() {
      this.country = findCountryCode(this.isInternational() ? this.countryCallingCode : this.defaultCallingCode, this.nationalNumberDigits, this.metadata);
    }
    /**
     * Returns an instance of `PhoneNumber` class.
     * Will return `undefined` if no national (significant) number
     * digits have been entered so far, or if no `defaultCountry` has been
     * set and the user enters a phone number not in international format.
     */

  }, {
    key: "getNumber",
    value: function getNumber() {
      if (this.isInternational()) {
        if (!this.countryCallingCode) {
          return;
        }
      } else {
        if (!this.country && !this.defaultCallingCode) {
          return;
        }
      }

      if (!this.nationalNumberDigits) {
        return undefined;
      }

      var countryCode = this.getCountry();
      var callingCode = this.getCountryCallingCode() || this.defaultCallingCode;
      var nationalNumber = this.nationalNumberDigits;
      var carrierCode = this.carrierCode; // When an international number without a leading `+` has been autocorrected,
      // extract country calling code, because normally it's only extracted
      // for international numbers with a leading `+`.
      // Could also just use `parsePhoneNumberFromString()` here
      // instead of hacking around this single case.

      if (!this.isInternational() && this.nationalNumberDigits === this.digits) {
        var _extractCountryCallin2 = extractCountryCallingCodeFromInternationalNumberWithoutPlusSign(this.digits, countryCode, callingCode, this.metadata.metadata),
            countryCallingCode = _extractCountryCallin2.countryCallingCode,
            number = _extractCountryCallin2.number;

        if (countryCallingCode) {
          var _stripNationalPrefixA2 = stripNationalPrefixAndCarrierCodeFromCompleteNumber(number, this.metadata),
              shorterNationalNumber = _stripNationalPrefixA2.nationalNumber,
              newCarrierCode = _stripNationalPrefixA2.carrierCode;

          nationalNumber = shorterNationalNumber;
          carrierCode = newCarrierCode;
        }
      }

      var phoneNumber = new PhoneNumber(countryCode || callingCode, nationalNumber, this.metadata.metadata);

      if (carrierCode) {
        phoneNumber.carrierCode = carrierCode;
      } // Phone number extensions are not supported by "As You Type" formatter.


      return phoneNumber;
    }
    /**
     * Returns `true` if the phone number is "possible".
     * Is just a shortcut for `PhoneNumber.isPossible()`.
     * @return {boolean}
     */

  }, {
    key: "isPossible",
    value: function isPossible() {
      var phoneNumber = this.getNumber();

      if (!phoneNumber) {
        return false;
      }

      return phoneNumber.isPossible();
    }
    /**
     * Returns `true` if the phone number is "valid".
     * Is just a shortcut for `PhoneNumber.isValid()`.
     * @return {boolean}
     */

  }, {
    key: "isValid",
    value: function isValid() {
      var phoneNumber = this.getNumber();

      if (!phoneNumber) {
        return false;
      }

      return phoneNumber.isValid();
    }
    /**
     * @deprecated
     * This method is used in `react-phone-number-input/source/input-control.js`
     * in versions before `3.0.16`.
     */

  }, {
    key: "getNationalNumber",
    value: function getNationalNumber() {
      return this.nationalNumberDigits;
    }
  }, {
    key: "getNonFormattedTemplate",
    value: function getNonFormattedTemplate() {
      return this.getFullNumber(this.getNonFormattedNationalNumber()).replace(/[\+\d]/g, DIGIT_PLACEHOLDER);
    }
    /**
     * Returns formatted phone number template.
     * @return {string} [template]
     */

  }, {
    key: "getTemplate",
    value: function getTemplate() {
      if (!this.template) {
        return this.getNonFormattedTemplate();
      }

      var index = -1;
      var i = 0;

      while (i < (this.isInternational() ? this.getInternationalPrefix({
        spacing: false
      }).length : 0) + this.digits.length) {
        index = this.template.indexOf(DIGIT_PLACEHOLDER, index + 1);
        i++;
      }

      return cutAndStripNonPairedParens(this.template, index + 1);
    }
  }]);

  return AsYouType;
}();
function stripNonPairedParens(string) {
  var dangling_braces = [];
  var i = 0;

  while (i < string.length) {
    if (string[i] === '(') {
      dangling_braces.push(i);
    } else if (string[i] === ')') {
      dangling_braces.pop();
    }

    i++;
  }

  var start = 0;
  var cleared_string = '';
  dangling_braces.push(string.length);

  for (var _i4 = 0, _dangling_braces = dangling_braces; _i4 < _dangling_braces.length; _i4++) {
    var index = _dangling_braces[_i4];
    cleared_string += string.slice(start, index);
    start = index + 1;
  }

  return cleared_string;
}
function cutAndStripNonPairedParens(string, cutBeforeIndex) {
  if (string[cutBeforeIndex] === ')') {
    cutBeforeIndex++;
  }

  return stripNonPairedParens(string.slice(0, cutBeforeIndex));
}
// http://stackoverflow.com/questions/202605/repeat-string-javascript

function repeat(string, times) {
  if (times < 1) {
    return '';
  }

  var result = '';

  while (times > 1) {
    if (times & 1) {
      result += string;
    }

    times >>= 1;
    string += string;
  }

  return result + string;
}
/**
 * Extracts formatted phone number from text (if there's any).
 * @param  {string} text
 * @return {string} [formattedPhoneNumber]
 */

function extractFormattedPhoneNumber$1(text) {
  // Attempt to extract a possible number from the string passed in.
  var startsAt = text.search(VALID_PHONE_NUMBER$2);

  if (startsAt < 0) {
    return;
  } // Trim everything to the left of the phone number.


  text = text.slice(startsAt); // Trim the `+`.

  var hasPlus;

  if (text[0] === '+') {
    hasPlus = true;
    text = text.slice('+'.length);
  } // Trim everything to the right of the phone number.


  text = text.replace(AFTER_PHONE_NUMBER_DIGITS_END_PATTERN, ''); // Re-add the previously trimmed `+`.

  if (hasPlus) {
    text = '+' + text;
  }

  return text;
}

// Deprecated.
function parsePhoneNumberFromString$2() {
  var parameters = Array.prototype.slice.call(arguments);
  parameters.push(metadata);
  return parsePhoneNumberFromString$1.apply(this, parameters);
}

function PhoneNumberSearch$1(text, options) {
  PhoneNumberSearch.call(this, text, options, metadata);
} // Deprecated.

PhoneNumberSearch$1.prototype = Object.create(PhoneNumberSearch.prototype, {});
PhoneNumberSearch$1.prototype.constructor = PhoneNumberSearch$1;
function PhoneNumberMatcher$1(text, options) {
  PhoneNumberMatcher.call(this, text, options, metadata);
}
PhoneNumberMatcher$1.prototype = Object.create(PhoneNumberMatcher.prototype, {});
PhoneNumberMatcher$1.prototype.constructor = PhoneNumberMatcher$1;
function AsYouType$1(country) {
  AsYouType.call(this, country, metadata);
}
AsYouType$1.prototype = Object.create(AsYouType.prototype, {});
AsYouType$1.prototype.constructor = AsYouType$1;

function _extends$4() { _extends$4 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$4.apply(this, arguments); }

var _ref$3 = /*#__PURE__*/React.createElement("path", {
  fill: "currentColor",
  fillRule: "evenodd",
  d: "M9.753.333c4.603 0 7.876 3.732 7.31 8.334C16.498 13.269 12.31 17 7.707 17S-.17 13.27.397 8.667C.962 4.065 5.15.333 9.753.333zm-1.56 12.704c-1.432 0-2.515.134-3.215.4-.5.19-.721.407-.825.628.373.297.783.546 1.228.745.778.347 1.63.523 2.53.523.901 0 1.796-.176 2.659-.523.497-.2.97-.45 1.417-.75-.043-.254-.216-.469-.665-.65-.62-.251-1.643-.373-3.129-.373zM9.55 2c-.901 0-1.796.176-2.659.523a7.838 7.838 0 00-2.295 1.43 7.912 7.912 0 00-1.69 2.12 7.242 7.242 0 00-.842 2.594c-.11.9-.041 1.774.205 2.594.177.59.44 1.136.784 1.628l.07-.08c.357-.386.837-.696 1.43-.92.932-.354 2.155-.519 3.846-.519 1.741 0 2.887.15 3.715.485.646.262 1.042.624 1.274 1.018a7.847 7.847 0 001.168-1.612c.448-.82.731-1.694.842-2.594.11-.9.042-1.774-.205-2.595a5.654 5.654 0 00-1.169-2.12 5.604 5.604 0 00-1.944-1.429A6.163 6.163 0 009.549 2zm-.18 1.458c2.014 0 3.446 1.633 3.199 3.646-.248 2.014-2.08 3.646-4.094 3.646-2.013 0-3.445-1.632-3.198-3.646.248-2.013 2.08-3.646 4.094-3.646zm-.204 1.667c-1.091 0-2.088.888-2.222 1.979-.134 1.091.645 1.98 1.736 1.98s2.088-.889 2.222-1.98c.134-1.091-.645-1.979-1.736-1.979z"
});

function SvgAccount(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$4({
    viewBox: "0 0 18 17"
  }, props), _ref$3);
}

function _extends$5() { _extends$5 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$5.apply(this, arguments); }

var _ref$4 = /*#__PURE__*/React.createElement("path", {
  fill: "currentColor",
  d: "M11.66.137c-.986 0-1.973.357-2.726 1.07l-1.128 1.07-1.13-1.07A3.956 3.956 0 003.952.136c-.987 0-1.973.357-2.725 1.07-1.506 1.426-1.316 3.42 0 5.163 1.762 2.338 6.58 7.121 6.58 7.121s4.818-4.783 6.58-7.12c1.315-1.745 1.505-3.738 0-5.165A3.955 3.955 0 0011.66.137"
});

function SvgHeartFilled(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$5({
    viewBox: "0 0 16 14"
  }, props), _ref$4);
}

var FavoritesHeartIconComponent = styles.styled(SvgHeartFilled)(function (_ref) {
  var theme = _ref.theme;
  return {
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.light
    }
  };
});

var HeaderNavViewModel = /*#__PURE__*/function () {
  function HeaderNavViewModel(store) {
    var _this = this;

    _classCallCheck(this, HeaderNavViewModel);

    _defineProperty(this, "store", void 0);

    _defineProperty(this, "analyticsHandler", void 0);

    _defineProperty(this, "handleSignOutClick", function () {
      _this.analyticsHandler.trackSignOutClicked();

      _this.store.signOut();
    });

    _defineProperty(this, "getPhoneNumberLinkData", function (phoneNumber) {
      var defaultPhoneNumberLinkData = {
        href: 'tel:+18555241300',
        label: '(855) 524-1300'
      };

      if (!phoneNumber) {
        return defaultPhoneNumberLinkData;
      }

      var parsedPhoneNumber = parsePhoneNumberFromString$2(decodeURIComponent(phoneNumber), 'US');

      if (!parsedPhoneNumber) {
        return defaultPhoneNumberLinkData;
      }

      if (!parsedPhoneNumber.isValid()) {
        return defaultPhoneNumberLinkData;
      }

      var phoneNumberLinkData = {
        href: parsedPhoneNumber.getURI(),
        label: parsedPhoneNumber.formatNational()
      };
      return phoneNumberLinkData;
    });

    this.store = store;
    this.analyticsHandler = new AnalyticsHandler();
  }

  _createClass(HeaderNavViewModel, [{
    key: "handleMount",
    value: function handleMount() {
      this.store.initClientSide();
    }
  }, {
    key: "getAccountLabel",
    value: function getAccountLabel() {
      var name = this.store.name;

      if (!name) {
        return 'ACCOUNT';
      }

      var tokens = name.split(' ');
      var firstLetters = tokens.map(function (token) {
        return token[0];
      });
      var initials = firstLetters.join('');
      return initials;
    }
  }, {
    key: "desktopLinks",
    value: function desktopLinks() {
      var _this2 = this;

      var phoneNumberLinkData = this.getPhoneNumberLinkData(this.store.phoneNumber); // FIT-566
      // Persist query string across navigation so that vlassic attribution works.
      // This is a stopgap until a better attribution system is in place.
      // retain brand query param to ensure whitelabeled pages are not cached/seen when navigating the vroom version of the app

      var queryString = "".concat(this.store.queryString).concat(this.store.queryString ? '&' : '?', "brand=vroom");

      if (!this.store.loggedIn) {
        return [{
          type: 'link',
          href: "/cars".concat(queryString),
          label: 'BUY',
          onClick: function onClick() {
            return _this2.analyticsHandler.trackBuyClicked();
          }
        }, {
          type: 'link',
          href: "/sell".concat(queryString),
          label: 'SELL/TRADE',
          onClick: function onClick() {
            return _this2.analyticsHandler.trackSellTradeClicked();
          }
        }, {
          type: 'link',
          href: "/finance".concat(queryString),
          label: 'FINANCE',
          onClick: function onClick() {
            return _this2.analyticsHandler.trackFinanceClicked();
          }
        }, {
          type: 'dropdown',
          label: 'ABOUT',
          links: [{
            href: "/about".concat(queryString),
            label: 'About Us',
            onClick: function onClick() {
              return _this2.analyticsHandler.trackAboutUsClicked();
            }
          }, {
            href: "/protection".concat(queryString),
            label: 'Vroom Protection',
            onClick: function onClick() {
              return _this2.analyticsHandler.trackVroomProtectionClicked();
            }
          }, {
            href: "/how-it-works".concat(queryString),
            label: 'How It Works',
            onClick: function onClick() {
              return _this2.analyticsHandler.trackHowItWorksClicked();
            }
          }, {
            href: "/reviews".concat(queryString),
            label: 'Customer Reviews',
            onClick: function onClick() {
              return _this2.analyticsHandler.trackCustomerReviewsClicked();
            }
          }, {
            href: 'https://ir.vroom.com/',
            label: 'Investor Relations',
            onClick: function onClick() {
              return _this2.analyticsHandler.trackInvestorRelationsClicked();
            }
          }]
        }, {
          type: 'dropdown',
          label: 'CONTACT',
          links: [{
            href: 'https://vroom.zendesk.com/hc/en-us',
            label: 'FAQ',
            onClick: function onClick() {
              return _this2.analyticsHandler.trackFAQClicked();
            }
          }, {
            href: phoneNumberLinkData.href,
            label: phoneNumberLinkData.label,
            onClick: function onClick() {
              return _this2.analyticsHandler.trackPhoneClicked();
            }
          }, {
            href: "/contact".concat(queryString),
            label: 'Contact Us',
            onClick: function onClick() {
              return _this2.analyticsHandler.trackContactUsClicked();
            }
          }]
        }, {
          type: 'dropdown',
          label: 'LOG IN',
          links: [{
            href: "/account/login".concat(queryString),
            label: 'Log In',
            onClick: function onClick() {
              return _this2.analyticsHandler.trackLoginClicked();
            }
          }, {
            href: "/account/create".concat(queryString),
            label: 'Register',
            onClick: function onClick() {
              return _this2.analyticsHandler.trackRegisterClicked();
            }
          }]
        }];
      }

      return [{
        type: 'link',
        href: "/cars".concat(queryString),
        label: 'BUY',
        onClick: function onClick() {
          return _this2.analyticsHandler.trackBuyClicked();
        }
      }, {
        type: 'link',
        href: "/sell".concat(queryString),
        label: 'SELL/TRADE',
        onClick: function onClick() {
          return _this2.analyticsHandler.trackSellTradeClicked();
        }
      }, {
        type: 'link',
        href: "/finance".concat(queryString),
        label: 'FINANCE',
        onClick: function onClick() {
          return _this2.analyticsHandler.trackFinanceClicked();
        }
      }, {
        type: 'dropdown',
        label: 'ABOUT',
        links: [{
          href: "/about".concat(queryString),
          label: 'About Us',
          onClick: function onClick() {
            return _this2.analyticsHandler.trackAboutUsClicked();
          }
        }, {
          href: "/protection".concat(queryString),
          label: 'Vroom Protection',
          onClick: function onClick() {
            return _this2.analyticsHandler.trackVroomProtectionClicked();
          }
        }, {
          href: "/how-it-works".concat(queryString),
          label: 'How It Works',
          onClick: function onClick() {
            return _this2.analyticsHandler.trackHowItWorksClicked();
          }
        }, {
          href: "/reviews".concat(queryString),
          label: 'Customer Reviews',
          onClick: function onClick() {
            return _this2.analyticsHandler.trackCustomerReviewsClicked();
          }
        }, {
          href: 'https://ir.vroom.com/',
          label: 'Investor Relations',
          onClick: function onClick() {
            return _this2.analyticsHandler.trackInvestorRelationsClicked();
          }
        }]
      }, {
        type: 'dropdown',
        label: 'CONTACT',
        links: [{
          href: 'https://vroom.zendesk.com/hc/en-us',
          label: 'FAQ',
          onClick: function onClick() {
            return _this2.analyticsHandler.trackFAQClicked();
          }
        }, {
          href: phoneNumberLinkData.href,
          label: phoneNumberLinkData.label,
          onClick: function onClick() {
            return _this2.analyticsHandler.trackPhoneClicked();
          }
        }, {
          href: "/contact".concat(queryString),
          label: 'Contact Us',
          onClick: function onClick() {
            return _this2.analyticsHandler.trackContactUsClicked();
          }
        }]
      }, {
        type: 'link',
        href: "/my-account/favorites".concat(queryString),
        IconComponent: FavoritesHeartIconComponent,
        onClick: function onClick() {
          return _this2.analyticsHandler.trackFavoritesHeartClicked();
        }
      }, {
        type: 'dropdown',
        IconComponent: SvgAccount,
        label: this.getAccountLabel(),
        links: [{
          href: "/my-account/favorites".concat(queryString),
          label: 'Favorites',
          onClick: function onClick() {
            return _this2.analyticsHandler.trackFavoritesClicked();
          }
        }, {
          href: "/my-account/profile".concat(queryString),
          label: 'Profile',
          onClick: function onClick() {
            return _this2.analyticsHandler.trackProfileClicked();
          }
        }, {
          href: "/my-account/addresses".concat(queryString),
          label: 'Addresses',
          onClick: function onClick() {
            return _this2.analyticsHandler.trackAddressesClicked();
          }
        }, {
          href: "/my-account/transactions".concat(queryString),
          label: 'Transactions',
          onClick: function onClick() {
            return _this2.analyticsHandler.trackTransactionsClicked();
          }
        }, {
          href: "/cars".concat(queryString),
          label: 'Sign Out',
          onClick: this.handleSignOutClick
        }]
      }];
    }
  }, {
    key: "mobileLinks",
    value: function mobileLinks() {
      var _this3 = this;

      var phoneNumberLinkData = this.getPhoneNumberLinkData(this.store.phoneNumber); // FIT-566
      // Persist query string across navigation so that vlassic attribution works.
      // This is a stopgap until a better attribution system is in place.

      var queryString = this.store.queryString;

      if (!this.store.loggedIn) {
        return [{
          type: 'link',
          href: "/account/login".concat(queryString),
          label: 'LOG IN',
          onClick: function onClick() {
            return _this3.analyticsHandler.trackLoginClicked();
          }
        }, {
          type: 'link',
          href: "/".concat(queryString),
          label: 'HOME',
          onClick: function onClick() {
            return _this3.analyticsHandler.trackHomeClicked();
          }
        }, {
          type: 'link',
          href: "/cars".concat(queryString),
          label: 'BUY',
          onClick: function onClick() {
            return _this3.analyticsHandler.trackBuyClicked();
          }
        }, {
          type: 'link',
          href: "/sell".concat(queryString),
          label: 'SELL/TRADE',
          onClick: function onClick() {
            return _this3.analyticsHandler.trackSellTradeClicked();
          }
        }, {
          type: 'link',
          href: "/finance".concat(queryString),
          label: 'FINANCE',
          onClick: function onClick() {
            return _this3.analyticsHandler.trackFinanceClicked();
          }
        }, {
          type: 'link',
          href: "/about".concat(queryString),
          label: 'ABOUT US',
          onClick: function onClick() {
            return _this3.analyticsHandler.trackAboutUsClicked();
          }
        }, {
          type: 'link',
          href: "/protection".concat(queryString),
          label: 'VROOM PROTECTION',
          onClick: function onClick() {
            return _this3.analyticsHandler.trackVroomProtectionClicked();
          }
        }, {
          type: 'link',
          href: "/how-it-works".concat(queryString),
          label: 'HOW IT WORKS',
          onClick: function onClick() {
            return _this3.analyticsHandler.trackHowItWorksClicked();
          }
        }, {
          type: 'link',
          href: "/reviews".concat(queryString),
          label: 'CUSTOMER REVIEWS',
          onClick: function onClick() {
            return _this3.analyticsHandler.trackCustomerReviewsClicked();
          }
        }, {
          type: 'link',
          href: 'https://ir.vroom.com/',
          label: 'INVESTOR RELATIONS',
          onClick: function onClick() {
            return _this3.analyticsHandler.trackInvestorRelationsClicked();
          }
        }, {
          type: 'link',
          href: 'https://vroom.zendesk.com/hc/en-us',
          label: 'FAQ',
          onClick: function onClick() {
            return _this3.analyticsHandler.trackFAQClicked();
          }
        }, {
          type: 'link',
          href: phoneNumberLinkData.href,
          label: 'CALL',
          onClick: function onClick() {
            return _this3.analyticsHandler.trackPhoneClicked();
          }
        }, {
          type: 'link',
          href: "/contact".concat(queryString),
          label: 'CONTACT US',
          onClick: function onClick() {
            return _this3.analyticsHandler.trackContactUsClicked();
          }
        }];
      }

      return [{
        type: 'dropdown',
        IconComponent: SvgAccount,
        label: this.getAccountLabel(),
        links: [{
          href: "/my-account/favorites".concat(queryString),
          label: 'Favorites',
          onClick: function onClick() {
            return _this3.analyticsHandler.trackFavoritesClicked();
          }
        }, {
          href: "/my-account/profile".concat(queryString),
          label: 'Profile',
          onClick: function onClick() {
            return _this3.analyticsHandler.trackProfileClicked();
          }
        }, {
          href: "/my-account/addresses".concat(queryString),
          label: 'Addresses',
          onClick: function onClick() {
            return _this3.analyticsHandler.trackAddressesClicked();
          }
        }, {
          href: "/my-account/transactions".concat(queryString),
          label: 'Transactions',
          onClick: function onClick() {
            return _this3.analyticsHandler.trackTransactionsClicked();
          }
        }]
      }, {
        type: 'link',
        href: "/".concat(queryString),
        label: 'HOME',
        onClick: function onClick() {
          return _this3.analyticsHandler.trackHomeClicked();
        }
      }, {
        type: 'link',
        href: "/cars".concat(queryString),
        label: 'BUY',
        onClick: function onClick() {
          return _this3.analyticsHandler.trackBuyClicked();
        }
      }, {
        type: 'link',
        href: "/sell".concat(queryString),
        label: 'SELL/TRADE',
        onClick: function onClick() {
          return _this3.analyticsHandler.trackSellTradeClicked();
        }
      }, {
        type: 'link',
        href: "/finance".concat(queryString),
        label: 'FINANCE',
        onClick: function onClick() {
          return _this3.analyticsHandler.trackFinanceClicked();
        }
      }, {
        type: 'link',
        href: "/about".concat(queryString),
        label: 'ABOUT US',
        onClick: function onClick() {
          return _this3.analyticsHandler.trackAboutUsClicked();
        }
      }, {
        type: 'link',
        href: "/protection".concat(queryString),
        label: 'VROOM PROTECTION',
        onClick: function onClick() {
          return _this3.analyticsHandler.trackVroomProtectionClicked();
        }
      }, {
        type: 'link',
        href: "/how-it-works".concat(queryString),
        label: 'HOW IT WORKS',
        onClick: function onClick() {
          return _this3.analyticsHandler.trackHowItWorksClicked();
        }
      }, {
        type: 'link',
        href: "/reviews".concat(queryString),
        label: 'CUSTOMER REVIEWS',
        onClick: function onClick() {
          return _this3.analyticsHandler.trackCustomerReviewsClicked();
        }
      }, {
        type: 'link',
        href: 'https://ir.vroom.com/',
        label: 'INVESTOR RELATIONS',
        onClick: function onClick() {
          return _this3.analyticsHandler.trackInvestorRelationsClicked();
        }
      }, {
        type: 'link',
        href: 'https://vroom.zendesk.com/hc/en-us',
        label: 'FAQ',
        onClick: function onClick() {
          return _this3.analyticsHandler.trackFAQClicked();
        }
      }, {
        type: 'link',
        href: phoneNumberLinkData.href,
        label: 'CALL',
        onClick: function onClick() {
          return _this3.analyticsHandler.trackPhoneClicked();
        }
      }, {
        type: 'link',
        href: "/contact".concat(queryString),
        label: 'CONTACT US',
        onClick: function onClick() {
          return _this3.analyticsHandler.trackContactUsClicked();
        }
      }, {
        type: 'link',
        href: "/cars".concat(queryString),
        label: 'SIGN OUT',
        onClick: this.handleSignOutClick
      }];
    }
  }]);

  return HeaderNavViewModel;
}();

var HeaderNav$1 = function HeaderNav() {
  var store = new HeaderNavStore();
  var viewModel = new HeaderNavViewModel(store);
  React.useEffect(function () {
    store.initClientSide();
    return function () {
      store.tearDownClientSide();
    };
  }, [store]);
  return /*#__PURE__*/React__default.createElement(View, {
    viewModel: viewModel
  });
};

var Status;

(function (Status) {
  Status["INITIAL"] = "initial";
  Status["FETCHING"] = "fetching";
  Status["SUCCESS"] = "success";
  Status["ERROR"] = "error";
})(Status || (Status = {}));

var _class$1, _descriptor$1, _descriptor2$1, _descriptor3$1, _descriptor4$1, _class2$1, _temp$1;
var InProgressDealBarStore = (_class$1 = (_temp$1 = _class2$1 = function InProgressDealBarStore(gearboxPrivateUrl) {
  _classCallCheck(this, InProgressDealBarStore);

  _defineProperty(this, "dealsV2Networker", void 0);

  _initializerDefineProperty(this, "inProgressDeal", _descriptor$1, this);

  _initializerDefineProperty(this, "inProgressDealStatus", _descriptor2$1, this);

  _defineProperty(this, "getAccessToken", function () {
    try {
      // https://github.com/js-cookie/js-cookie/blob/master/SERVER_SIDE.md#express
      var authTokenWithExpressPrefix = js_cookie.get(InProgressDealBarStore.authTokenCookieName);

      if (!authTokenWithExpressPrefix) {
        return undefined;
      }

      var authToken = JSON.parse(authTokenWithExpressPrefix.slice(2));

      var _jwtDecode = lib$1(authToken.accessToken),
          expirationTimestamp = _jwtDecode.exp;

      var loggedIn = expirationTimestamp > new Date().getTime() / 1000;

      if (!loggedIn) {
        return undefined;
      }

      return authToken.accessToken;
    } catch (_unused) {
      return undefined;
    }
  });

  _initializerDefineProperty(this, "initInProgressDeal", _descriptor3$1, this);

  _initializerDefineProperty(this, "initClientSide", _descriptor4$1, this);

  this.dealsV2Networker = new dealsV2Networking.DealsV2Networker(gearboxPrivateUrl);
}, _defineProperty(_class2$1, "authTokenCookieName", 'authToken'), _temp$1), (_descriptor$1 = _applyDecoratedDescriptor(_class$1.prototype, "inProgressDeal", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor2$1 = _applyDecoratedDescriptor(_class$1.prototype, "inProgressDealStatus", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return Status.INITIAL;
  }
}), _descriptor3$1 = _applyDecoratedDescriptor(_class$1.prototype, "initInProgressDeal", [action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this = this;

    return /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var accessToken, response, inProgressDeal;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              accessToken = _this.getAccessToken();

              if (accessToken) {
                _context.next = 4;
                break;
              }

              throw new Error('No accessToken was found');

            case 4:
              _this.inProgressDealStatus = Status.FETCHING;
              _context.next = 7;
              return _this.dealsV2Networker.getMyDeals(accessToken);

            case 7:
              response = _context.sent;
              inProgressDeal = response.data.user.deals.find(function (deal) {
                return deal.dealSummary.dealStatus.status === 'In-Progress';
              });

              if (inProgressDeal) {
                _context.next = 11;
                break;
              }

              throw new Error('No In-Progress deal was found');

            case 11:
              runInAction(function () {
                _this.inProgressDeal = inProgressDeal;
                _this.inProgressDealStatus = Status.SUCCESS;
              });
              _context.next = 17;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](0);
              runInAction(function () {
                _this.inProgressDealStatus = Status.ERROR;
              });

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 14]]);
    }));
  }
}), _descriptor4$1 = _applyDecoratedDescriptor(_class$1.prototype, "initClientSide", [action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this2 = this;

    return function () {
      _this2.initInProgressDeal();
    };
  }
})), _class$1);

function _extends$6() { _extends$6 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$6.apply(this, arguments); }

var _ref$5 = /*#__PURE__*/React.createElement("path", {
  fill: "currentColor",
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M4.37 31.2c1.98 0 3.24 1.53 2.88 3.51-.36 1.98-2.16 3.51-4.14 3.51-1.98 0-3.24-1.53-2.88-3.51.36-1.89 2.25-3.51 4.14-3.51zm-.27 1.89c-.9 0-1.8.72-1.89 1.62-.18.9.45 1.62 1.35 1.62.9 0 1.8-.72 1.89-1.62.09-.9-.45-1.62-1.35-1.62zm19.8-1.89c1.98 0 3.24 1.53 2.88 3.51-.36 1.98-2.16 3.51-4.14 3.51-1.98 0-3.24-1.53-2.88-3.51.36-1.89 2.16-3.51 4.14-3.51zm-.36 1.89c-.9 0-1.8.72-1.89 1.62-.18.9.45 1.62 1.35 1.62.9 0 1.8-.72 1.89-1.62.18-.9-.45-1.62-1.35-1.62zm3.87-4.68H2.48L4.64 2.67H.86L1.22.78H6.8L4.46 26.52h21.87l7.47-14.04H13.46l.36-1.89h23.04l-9.45 17.82z"
});

function SvgCart(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$6({
    viewBox: "0 0 37 39"
  }, props), _ref$5);
}

var StyledCollapse = styles.styled(Collapse)(function (_ref) {
  var theme = _ref.theme;
  return {
    top: '0px',
    position: 'sticky',
    zIndex: theme.zIndex.appBar
  };
});
var StyledBar = styles.styled(Bar)(function (_ref2) {
  var theme = _ref2.theme;
  return _defineProperty({
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'stretch'
  }, theme.breakpoints.only('xs'), {
    flexDirection: 'column',
    alignItems: 'stretch'
  });
});
var Information = styles.styled('div')(function (_ref4) {
  var _ref5;

  var theme = _ref4.theme;
  return _ref5 = {
    display: 'flex',
    alignItems: 'center'
  }, _defineProperty(_ref5, theme.breakpoints.only('sm'), {
    marginRight: theme.spacing(2)
  }), _defineProperty(_ref5, "minWidth", 0), _ref5;
});
var StyledCartSvg = styles.styled(SvgCart)(function (_ref6) {
  var theme = _ref6.theme;
  return _defineProperty({
    flexShrink: 0,
    width: '32px',
    height: '32px'
  }, theme.breakpoints.up('sm'), {
    width: '36px',
    height: '36px',
    marginRight: theme.spacing(1)
  });
});
var VehicleInfo = styles.styled('div')(function (_ref8) {
  var _ref9;

  var theme = _ref8.theme;
  return _ref9 = {
    display: 'flex',
    alignItems: 'center'
  }, _defineProperty(_ref9, theme.breakpoints.only('sm'), {
    flexDirection: 'column',
    alignItems: 'stretch'
  }), _defineProperty(_ref9, "minWidth", 0), _ref9;
});
var YearMakeModel = styles.styled(ui.Typography)(function (_ref10) {
  var _ref11;

  var theme = _ref10.theme;
  return _ref11 = {
    flexBasis: 0,
    flexGrow: 1,
    marginRight: theme.spacing(1)
  }, _defineProperty(_ref11, theme.breakpoints.only('sm'), {
    flexBasis: 'auto',
    marginBottom: theme.spacing(1)
  }), _defineProperty(_ref11, theme.breakpoints.up('md'), {
    minWidth: '100px'
  }), _ref11;
});
var TrimAndPrice = styles.styled('div')(function () {
  return {
    display: 'flex',
    alignItems: 'center',
    // https://stackoverflow.com/questions/39838908/text-overflow-ellipsis-not-working-in-nested-flexbox
    minWidth: 0
  };
});
var Trim = styles.styled(ui.Typography)(function (_ref12) {
  var theme = _ref12.theme;
  return _defineProperty({
    flexBasis: 0,
    flexGrow: 1,
    marginRight: theme.spacing(1)
  }, theme.breakpoints.only('sm'), {
    flexBasis: 'auto',
    flexGrow: 0
  });
});
var Price = styles.styled(ui.Typography)(function (_ref14) {
  var theme = _ref14.theme;
  return _defineProperty({}, theme.breakpoints.up('md'), {
    marginRight: theme.spacing(3)
  });
});
var StyledButton = styles.styled(ui.Button)(function (_ref16) {
  var _ref17;

  var theme = _ref16.theme;
  return _ref17 = {
    flexShrink: 0
  }, _defineProperty(_ref17, theme.breakpoints.only('xs'), {
    marginTop: theme.spacing(2)
  }), _defineProperty(_ref17, theme.breakpoints.up('sm'), {
    marginLeft: 'auto'
  }), _ref17;
});

var InProgressDealBarView = function InProgressDealBarView(_ref18) {
  var viewModel = _ref18.viewModel;
  var theme = styles.useTheme();
  var smUp = useMediaQuery(theme.breakpoints.up('sm'));
  var mdUp = useMediaQuery(theme.breakpoints.up('md'));
  React__default.useEffect(function () {
    viewModel.handleMount();
  }, [viewModel]);

  var handleButtonClick = function handleButtonClick() {
    viewModel.handleButtonClick();
  };

  var show = viewModel.show();
  return /*#__PURE__*/React__default.createElement(StyledCollapse, {
    "in": show
  }, /*#__PURE__*/React__default.createElement(StyledBar, null, show && /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(Information, null, /*#__PURE__*/React__default.createElement(StyledCartSvg, null), mdUp && /*#__PURE__*/React__default.createElement(ui.Typography, {
    fontWeight: "fontWeightMedium"
  }, viewModel.statusText), /*#__PURE__*/React__default.createElement(Divider, {
    flexItem: true,
    orientation: "vertical",
    variant: "middle"
  }), /*#__PURE__*/React__default.createElement(VehicleInfo, null, /*#__PURE__*/React__default.createElement(YearMakeModel, {
    fontWeight: "fontWeightMedium",
    whiteSpace: "nowrap"
  }, viewModel.yearMakeModel()), /*#__PURE__*/React__default.createElement(TrimAndPrice, null, smUp && /*#__PURE__*/React__default.createElement(Trim, {
    whiteSpace: "nowrap"
  }, viewModel.trim()), /*#__PURE__*/React__default.createElement(Price, null, viewModel.price())))), /*#__PURE__*/React__default.createElement(StyledButton, {
    color: "secondary",
    onClick: handleButtonClick,
    variant: "contained"
  }, viewModel.buttonText))));
};

var View$1 = observer$1(InProgressDealBarView);

var InProgressDealBarViewModel = /*#__PURE__*/function () {
  function InProgressDealBarViewModel(store) {
    _classCallCheck(this, InProgressDealBarViewModel);

    _defineProperty(this, "statusText", 'Purchase\xa0in\xa0progress');

    _defineProperty(this, "buttonText", 'RESUME PURCHASE');

    _defineProperty(this, "store", void 0);

    _defineProperty(this, "currencyFormatter", void 0);

    _defineProperty(this, "analyticsHandler", void 0);

    this.store = store;
    this.currencyFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    this.analyticsHandler = new AnalyticsHandler();
  }

  _createClass(InProgressDealBarViewModel, [{
    key: "handleMount",
    value: function handleMount() {
      this.store.initClientSide();
    }
  }, {
    key: "show",
    value: function show() {
      return this.store.inProgressDealStatus === Status.SUCCESS;
    }
  }, {
    key: "yearMakeModel",
    value: function yearMakeModel() {
      var _this$store$inProgres = this.store.inProgressDeal.dealSummary.inventory.vehicle,
          make = _this$store$inProgres.make,
          model = _this$store$inProgres.model,
          year = _this$store$inProgres.year;
      return "".concat(year, " ").concat(make, " ").concat(model);
    }
  }, {
    key: "trim",
    value: function trim() {
      var trim = this.store.inProgressDeal.dealSummary.inventory.vehicle.trim;
      return trim;
    }
  }, {
    key: "price",
    value: function price() {
      var listPrice = this.store.inProgressDeal.dealSummary.inventory.pricing.listPrice;
      return this.currencyFormatter.format(listPrice);
    } // TODO: 'step' and all the cases in the switch should use an enum.
    // We need to export an enum from the networking library for deals.

  }, {
    key: "getResumeStepHref",
    value: function getResumeStepHref(step, vin) {
      switch (step) {
        case 'TradeIn':
          return "/e2e/".concat(vin, "/checkoutTradeIn");

        case 'RegistrationAddress':
          return "/e2e/".concat(vin, "/registration");

        case 'DeliveryAddress':
          return "/e2e/".concat(vin, "/delivery-form");

        case 'Financing':
          return "/e2e/".concat(vin, "/vroomFinancing");

        case 'PaymentType':
          return "/e2e/".concat(vin, "/payment");

        case 'DepositPaymentInfo':
          return "/e2e/".concat(vin, "/dealReview");

        case 'DealSummary':
          return "/deal/".concat(vin, "/congratulations");

        case 'FinancingOption':
          return "/e2e/".concat(vin, "/autofi");

        case 'FinancingPending':
          return "/e2e/".concat(vin, "/autofi");

        case 'BackendProducts':
          return "/e2e/".concat(vin, "/dealCoverage");

        case 'Review':
          return "/e2e/".concat(vin, "/dealReview");

        case 'DocumentUpload':
          return "/e2e/".concat(vin, "/documentUpload");

        default:
          // If we got an unexpected step, link to the transactions page as a fallback.
          return '/my-account/transactions';
      }
    }
  }, {
    key: "handleButtonClick",
    value: function handleButtonClick() {
      this.analyticsHandler.trackTransactionResumeClicked();
      var step = this.store.inProgressDeal.dealSummary.dealStatus.step;
      var vin = this.store.inProgressDeal.dealSummary.inventory.vehicle.vin;
      var href = this.getResumeStepHref(step, vin);
      window.location.href = href;
    }
  }]);

  return InProgressDealBarViewModel;
}();

var InProgressDealBar = function InProgressDealBar(_ref) {
  var gearboxPrivateUrl = _ref.gearboxPrivateUrl;
  var store = new InProgressDealBarStore(gearboxPrivateUrl);
  var viewModel = new InProgressDealBarViewModel(store);
  return /*#__PURE__*/React__default.createElement(View$1, {
    viewModel: viewModel
  });
};

var SimpleHeader = function SimpleHeader(_ref) {
  var gearboxPrivateUrl = _ref.gearboxPrivateUrl;
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(Bar, null, /*#__PURE__*/React__default.createElement(Box, {
    mr: "auto"
  }, /*#__PURE__*/React__default.createElement(Logo$1, null)), /*#__PURE__*/React__default.createElement(HeaderNav$1, null)), /*#__PURE__*/React__default.createElement(InProgressDealBar, {
    gearboxPrivateUrl: gearboxPrivateUrl
  }));
};

var _class$2, _descriptor$2, _descriptor2$2, _descriptor3$2, _descriptor4$2, _temp$2;
var Store = (_class$2 = (_temp$2 = function Store() {
  _classCallCheck(this, Store);

  _initializerDefineProperty(this, "isOpen", _descriptor$2, this);

  _initializerDefineProperty(this, "isDrawerOpen", _descriptor2$2, this);

  _initializerDefineProperty(this, "setIsOpen", _descriptor3$2, this);

  _initializerDefineProperty(this, "setIsDrawerOpen", _descriptor4$2, this);
}, _temp$2), (_descriptor$2 = _applyDecoratedDescriptor(_class$2.prototype, "isOpen", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2$2 = _applyDecoratedDescriptor(_class$2.prototype, "isDrawerOpen", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor3$2 = _applyDecoratedDescriptor(_class$2.prototype, "setIsOpen", [action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this = this;

    return function (open) {
      _this.isOpen = open;
    };
  }
}), _descriptor4$2 = _applyDecoratedDescriptor(_class$2.prototype, "setIsDrawerOpen", [action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this2 = this;

    return function (open) {
      _this2.isDrawerOpen = open;
    };
  }
})), _class$2);

var interopRequireDefault = createCommonjsModule(function (module) {
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
});

unwrapExports(interopRequireDefault);

var _extends_1 = createCommonjsModule(function (module) {
function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;
});

var createSvgIcon_1 = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createSvgIcon;

var _extends2 = interopRequireDefault(_extends_1);

var _react = interopRequireDefault(React__default);

var _SvgIcon = interopRequireDefault(SvgIcon);

function createSvgIcon(path, displayName) {
  var Component = _react.default.memo(_react.default.forwardRef(function (props, ref) {
    return _react.default.createElement(_SvgIcon.default, (0, _extends2.default)({
      ref: ref
    }, props), path);
  }));

  if (process.env.NODE_ENV !== 'production') {
    Component.displayName = "".concat(displayName, "Icon");
  }

  Component.muiName = _SvgIcon.default.muiName;
  return Component;
}
});

unwrapExports(createSvgIcon_1);

var ExpandLess = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = interopRequireDefault(React__default);

var _createSvgIcon = interopRequireDefault(createSvgIcon_1);

var _default = (0, _createSvgIcon.default)(_react.default.createElement("path", {
  d: "M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"
}), 'ExpandLess');

exports.default = _default;
});

var ExpandLess$1 = unwrapExports(ExpandLess);

var ExpandMore = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = interopRequireDefault(React__default);

var _createSvgIcon = interopRequireDefault(createSvgIcon_1);

var _default = (0, _createSvgIcon.default)(_react.default.createElement("path", {
  d: "M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
}), 'ExpandMore');

exports.default = _default;
});

var ExpandMore$1 = unwrapExports(ExpandMore);

var Menu = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = interopRequireDefault(React__default);

var _createSvgIcon = interopRequireDefault(createSvgIcon_1);

var _default = (0, _createSvgIcon.default)(_react.default.createElement("path", {
  d: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
}), 'Menu');

exports.default = _default;
});

var Menu$1 = unwrapExports(Menu);

function _extends$7() { _extends$7 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$7.apply(this, arguments); }

var _ref$6 = /*#__PURE__*/React.createElement("path", {
  d: "M478 119.06c0 23.7 12.42 37.25 31.05 37.25 9.87 0 15.94-3.95 19.89-10.16l.85 8.47H544V84.06c-8.18-2.82-16.51-4-26.67-4-26.08.05-39.33 14.16-39.33 39zm50.52 19.47a24.27 24.27 0 01-15.1 5.08c-13.83 0-19.61-10.16-19.61-24.55 0-15.81 7.47-25.69 23.56-25.69a63.5 63.5 0 0111.15.85zm60.68-58.42c-7.47 0-18.34 1.55-28.22 4v70.56h15.52V94.5a78.62 78.62 0 0112.28-1.13c15.52 0 19.19 5.37 19.19 16.51v44.74h15.53V107.2c-.01-17.07-8.34-27.09-34.31-27.09zm97.66 1.13a60.38 60.38 0 00-11.57-1.13c-26.11 0-39.37 14.11-39.37 39 0 23.7 12.42 37.25 31 37.25 10.16 0 16.23-4.09 20.18-10.72l.85 9h14.25V55.83c-5.08 0-10.58.43-15.38 2.12zm0 57a24.89 24.89 0 01-15.52 5.36c-13.83 0-19.62-10.16-19.62-24.55 0-16.09 7.34-25.69 22.72-25.69a62.47 62.47 0 0112.42 1.41zM383.43 80.11c-7.48 0-18.34 1.55-28.22 4v70.56h15.52V94.5A78.62 78.62 0 01383 93.37c15.52 0 19.19 5.37 19.19 16.51v44.74h15.52V107.2c.01-17.07-8.31-27.09-34.28-27.09zm-257.07 1.83A32.48 32.48 0 00122 67.06L98.5 26.31a32.57 32.57 0 01-3.72-9.85l-1 1.7a32.62 32.62 0 000 32.6l18.82 32.6a32.6 32.6 0 010 32.59l-1 1.71a32.33 32.33 0 00-3.73-9.85L90.68 78l-11-19A32.77 32.77 0 0176 49.06l-1 1.7a32.61 32.61 0 00-.06 32.49L93.8 116a32.62 32.62 0 010 32.6l-1 1.7a32.53 32.53 0 00-3.73-9.85l-23.5-40.79a32.51 32.51 0 01-4.33-17.72c-25.19 6.58-42.57 20.55-42.57 36.73 0 22.5 33.64 40.75 75.13 40.75s75.13-18.25 75.13-40.75c0-16.18-17.38-30.15-42.57-36.73zm110.73 18.21l-7.62-3.25c-9.88-4.23-15.39-8.47-15.39-15.81s5.65-12.27 17.92-12.27a71.63 71.63 0 0123.14 4.09A54.13 54.13 0 00258 58.8a77.43 77.43 0 00-25.82-4.09c-22.86 0-34 10.3-34 26.38 0 15 9 22.44 22.3 28.23l7.19 3.1c13.27 5.79 18.63 9.6 18.63 17.78 0 8.33-7.34 12.56-20.46 12.56a66 66 0 01-25.83-5.5 47.47 47.47 0 00-2.68 14.25c7.9 3.67 17.36 5.37 28.93 5.37 24 0 36.27-11.15 36.27-27.38-.04-13.69-7.53-21.73-25.44-29.35zm35.14 18.91c0 23.7 12.42 37.25 31 37.25 9.87 0 15.94-3.95 19.89-10.16l.85 8.47h14.25V84.06c-8.18-2.82-16.51-4-26.67-4-26.06.05-39.32 14.16-39.32 39zm50.52 19.47a24.27 24.27 0 01-15.1 5.08c-13.83 0-19.62-10.16-19.62-24.55 0-15.81 7.48-25.69 23.57-25.69a63.5 63.5 0 0111.15.85zm149.17-42.76a120.48 120.48 0 001.41-13.26h-24.55V55.83a53.8 53.8 0 00-15.53 2.26v74.09c0 17.22 9.6 24.13 24.7 24.13a35.09 35.09 0 0013.12-2.26c.85-4.09 1.41-8.89 1.84-13.12a35.19 35.19 0 01-12.14 2.12c-7.48 0-12-3.53-12-12.7V95.77zm873.73-.23a22.06 22.06 0 00-1-2.39c-.18-.38-.37-.76-.57-1.13a20.43 20.43 0 00-1.3-2.1c-4.51-6.37-12.64-9.8-25.29-9.8-1.08 0-2.15 0-3.22.11a54.34 54.34 0 00-12.52 2.33c-1 .31-2 .65-3 1q-3 1.09-5.93 2.48a21.18 21.18 0 00-5.33-3.19 32 32 0 00-6.77-1.94 57 57 0 00-10-.8 97.53 97.53 0 00-14.23 1.1q-3 .45-5.94 1c-2.53.52-5.08 1.12-7.63 1.8v70.56h9.88V90.85c2.06-.48 4.21-.88 6.36-1.19a76.38 76.38 0 0110.57-.79c5.66 0 10 .79 13.2 2.51a14.17 14.17 0 011.51.93 12.66 12.66 0 014.27 5.34 26.56 26.56 0 011.77 10.55v46.43h9.87v-47.7a40 40 0 00-1.37-11 24.15 24.15 0 00-1-2.94 47.78 47.78 0 0118.77-4.09c14.54 0 20.75 6.77 20.75 19.62v46.14h9.87v-47.7a40.58 40.58 0 00-.63-7.45 29.09 29.09 0 00-1.09-3.97zm120.79-15.11h-3.43a71.61 71.61 0 00-7.42.42h-.3c-2 .21-3.92.48-5.84.81-1.7.3-3.36.64-4.93 1-.75.18-1.47.37-2.17.56l-1.56.45-1.2.39v70.56h9.88v-64.2l1.76-.35c1.18-.22 2.38-.41 3.58-.57a63.9 63.9 0 018.48-.63 86.5 86.5 0 0110.87.56 19.6 19.6 0 00.56-2.7q.08-.54.15-1.11a43.12 43.12 0 00.28-4.65c-1.17-.16-2.51-.28-4-.37s-3.04-.14-4.71-.17zm-48.65 10.37a24.36 24.36 0 00-7.54-6.75 26.76 26.76 0 00-2.73-1.37 34.23 34.23 0 00-13.65-2.56 37.87 37.87 0 00-11.6 1.68 29.36 29.36 0 00-3.26 1.25 26.63 26.63 0 00-6.85 4.49c-7.56 6.83-10.89 17.77-10.89 30.26 0 15.17 4.85 26.42 14.24 32.73a31.06 31.06 0 006.18 3.19 43.49 43.49 0 0015.57 2.6 53.53 53.53 0 0011.58-1.14l1.39-.34c.93-.24 1.84-.51 2.75-.82a39.08 39.08 0 004-1.65c.89-.43 1.78-.9 2.66-1.41.27-1.16.51-2.43.73-3.69.36-2.09.65-4.18.82-5.76a44.52 44.52 0 01-10.34 4.28 50.35 50.35 0 01-13.36 1.78c-12.07 0-20.08-5.08-23.87-14.76a38.55 38.55 0 01-2.38-11.2h52.21a58.57 58.57 0 00.57-8.75c0-8-1.73-15.23-5.45-20.88-.21-.4-.49-.8-.78-1.18zm-3.6 21.92h-42.9a33.85 33.85 0 013.79-14 18.9 18.9 0 015.45-6.23 18.55 18.55 0 015.73-2.76 25.48 25.48 0 017.19-1 23.09 23.09 0 019.13 1.7 16.93 16.93 0 015.1 3.31 17.27 17.27 0 011.38 1.46c3.44 4.11 5.13 10 5.13 17zm-200.38 27.09a31.11 31.11 0 01-3.82 3.09 29.17 29.17 0 01-5.24 2.84 28.83 28.83 0 01-11 2.12c-4.76 0-8.57-.88-11.47-2.74-4.84-3.11-7.15-9-7.15-18.15V81.81h-9.88V129a38.19 38.19 0 002.11 13.46 23.77 23.77 0 001 2.35c.19.38.39.74.59 1.1a21.94 21.94 0 001.32 2 19 19 0 007.22 5.87 20 20 0 002.27.93 28.6 28.6 0 005.08 1.24 39.29 39.29 0 005.79.4 41.18 41.18 0 0013.67-2 25.94 25.94 0 002.75-1.13 26.7 26.7 0 002.53-1.38 26.15 26.15 0 004.47-3.52l.29 6.35h9.31V81.81h-9.88zM1565 57.68v63.22a32.45 32.45 0 01-1.58 10.33c-.1.29-.2.58-.31.86a22.82 22.82 0 01-4.88 7.88 22.62 22.62 0 01-1.75 1.64c-4.35 3.62-10.3 5.67-17.71 5.67-9.37 0-16.55-3.39-21-9.22-.25-.33-.49-.66-.72-1a23.47 23.47 0 01-1.86-3.24 30.88 30.88 0 01-2.77-13.35V56.13a42.19 42.19 0 00-9.61 1.48l-.27.07v64.21c0 13.49 5.94 24.84 17.35 30.61a33 33 0 003.25 1.44 38.83 38.83 0 005.38 1.6 47.41 47.41 0 0010.29 1.06c8.83 0 16.12-2.12 21.78-5.81a29.64 29.64 0 006.22-5.38 29 29 0 002-2.56 31.88 31.88 0 003.78-7.26 39.29 39.29 0 002.33-13.7V56.13a42.28 42.28 0 00-9.61 1.48zm90.12 69.23a24 24 0 00-2-7.6 20.58 20.58 0 00-1-1.92c-.19-.31-.38-.62-.58-.93a22.11 22.11 0 00-1.32-1.78 20.35 20.35 0 00-1.53-1.71c-4.09-4.18-10.24-7.68-18.91-11.12l-6.78-2.68c-12.28-4.8-18.77-9.74-18.77-19.61a14.43 14.43 0 011.51-6.73 12.31 12.31 0 011.83-2.62 17.83 17.83 0 019.34-5 40.23 40.23 0 019-.93 65.85 65.85 0 0119.8 3.14c.58.18 1.15.38 1.72.58.74.25 1.47.51 2.19.79l.09-.3q.23-.7.42-1.47l.12-.48a49.38 49.38 0 001.06-7.06q-3-1.11-6-2c-1-.28-2-.54-3-.77q-3-.7-6.25-1.14c-1.07-.14-2.15-.26-3.26-.36-2.22-.19-4.51-.29-6.91-.29a46.26 46.26 0 00-17.17 2.89l-.77.32a24.75 24.75 0 00-7.4 4.8c-4.25 4.07-6.55 9.63-6.55 16.55 0 11.32 4.92 18.36 13.46 23.55.71.43 1.44.85 2.2 1.26 1.52.82 3.14 1.59 4.85 2.33.86.37 1.73.73 2.63 1.08l6.78 2.68q2.51 1 4.66 2c.94.41 1.83.83 2.68 1.23l1.47.73c.36.18.7.37 1 .55a31.58 31.58 0 016.24 4.23 15.8 15.8 0 013.15 3.81c.09.16.18.32.26.48a16 16 0 011.66 7.61 14 14 0 01-3.55 9.73c-3.88 4.24-10.8 6.5-20.15 6.5-8.47 0-18.91-2-27.38-6.63a27.15 27.15 0 00-1.35 5.5 36.08 36.08 0 00-.34 4.1 56.63 56.63 0 0021.11 6q3.92.38 8.1.37a55.51 55.51 0 0011.23-1.06c.57-.12 1.12-.24 1.66-.38a36.79 36.79 0 004.62-1.45c1-.38 1.89-.79 2.77-1.23s1.72-.92 2.52-1.42a25.48 25.48 0 002.26-1.62 23.21 23.21 0 002.92-2.76c.29-.33.57-.66.84-1a22.36 22.36 0 003.67-6.88 24 24 0 00.68-2.59 26.16 26.16 0 00.42-2.72c.09-.93.13-1.88.13-2.85v-1.28c.1-.83.04-1.65-.05-2.44zm53-70.64a62.73 62.73 0 00-9.59.72c-1 .16-2 .34-2.83.55l-34 97.09h10.45l8.18-23.85h43.6l8.19 23.85h10.44zm-24.7 65.2l18.77-54.9 18.63 54.9zM1011 106.1a41.37 41.37 0 00-1.5-5.14 33.84 33.84 0 00-2.09-4.7c-.26-.5-.54-1-.83-1.46a32.92 32.92 0 00-1.86-2.74 28.71 28.71 0 00-3.3-3.66c-5.19-4.85-12.28-7.83-21.27-8.23h-2.11a39.72 39.72 0 00-13 2A30.27 30.27 0 00956 87c-.44.34-.86.7-1.28 1.07a30 30 0 00-4.48 5 31.93 31.93 0 00-1.81 2.93 36.82 36.82 0 00-3.44 8.39 52.91 52.91 0 00-1.83 14.28c0 21.73 11.43 37.67 34 37.67 22.3 0 35-14.67 35-38.8a55.89 55.89 0 00-.53-7.77c-.17-1.26-.39-2.48-.63-3.67zm-11.2 26.78a25.9 25.9 0 01-1 2.4c-.19.38-.39.76-.59 1.13-3.91 7-10.69 11-20.41 11-16.09 0-24.56-10.58-24.56-29.49 0-7 1.33-13.15 4-17.9.42-.73.86-1.43 1.34-2.1a21.69 21.69 0 012.36-2.77c4-3.94 9.62-6.16 16.85-6.16a26.63 26.63 0 0110.54 2q.57.24 1.11.51a19.87 19.87 0 017.28 6.16c.24.33.48.67.7 1a24.68 24.68 0 011.26 2.2c.19.38.38.77.56 1.17a30.3 30.3 0 011.39 3.83 44.69 44.69 0 011.57 12.36 41.47 41.47 0 01-2.42 14.66zM914.66 55c-11.11 0-20.46 2.62-27.8 7.59-.61.42-1.21.85-1.79 1.29-6.43 4.92-11.15 11.79-14 20.41-.25.79-.5 1.59-.72 2.4A71.05 71.05 0 00868 105.8c0 9.57 1.59 18.12 4.67 25.35a44.86 44.86 0 002 4.18 43.62 43.62 0 002.38 3.85 39 39 0 005.81 6.65 36.6 36.6 0 003.42 2.77A36.14 36.14 0 00890 151a41.33 41.33 0 008.5 3.55 50.38 50.38 0 009.8 1.83c1.74.16 3.53.23 5.37.23s3.8-.06 5.57-.18 3.24-.29 4.76-.51l.74-.12c1.47-.23 2.89-.51 4.25-.85a43.07 43.07 0 004.3-1.3 64.55 64.55 0 001.37-7.9c.08-.85.14-1.69.18-2.54a39.63 39.63 0 01-4.54 1.69c-.8.24-1.62.47-2.45.68-1.54.38-3.14.69-4.75.93-1.05.17-2.11.3-3.17.4-1.68.16-3.35.25-5 .25-18.11 0-31-10.15-35.21-28.12a59.86 59.86 0 01-1.48-13.65 62.05 62.05 0 011-11.63 46.79 46.79 0 011.57-6.07c.21-.64.43-1.27.67-1.88.39-1 .83-2 1.3-3 .36-.75.74-1.48 1.15-2.19q.46-.8 1-1.56a30.72 30.72 0 017.13-7.74c.46-.35.93-.69 1.41-1a30 30 0 014.58-2.56c.53-.25 1.08-.48 1.64-.7a38.91 38.91 0 0110.93-2.46c1.32-.11 2.66-.16 4-.16 1.73 0 3.45.08 5.14.23a56 56 0 0111.51 2.25l1.27.41c.47.16.95.32 1.41.49a25.91 25.91 0 00.87-3.21c.17-.78.33-1.6.45-2.43a37.23 37.23 0 00.38-3.81c-.76-.3-1.54-.58-2.35-.83A63 63 0 00914.66 55zM1132 114.55l-6.63-2.25c-2.19-.75-4.17-1.45-5.92-2.22a22.59 22.59 0 01-3.51-1.86 12 12 0 01-1.85-1.47 10 10 0 01-3-7.72c0-6 4.21-9.51 12.54-10.28 1.19-.11 2.47-.16 3.82-.16a62.77 62.77 0 0113.06 1.41 54.92 54.92 0 017.55 2.17c.1-.36.2-.71.29-1.07.28-1.08.5-2.18.68-3.26.11-.71.2-1.41.28-2.08q0-.51.09-1c0-.32 0-.63.07-.93a49.11 49.11 0 00-7.75-2.28 65.27 65.27 0 00-8.52-1.17q-3-.23-6-.22c-15.94 0-25.54 6.63-25.54 19.19 0 7.76 3.27 13.19 9.39 17.06q.84.52 1.74 1a44.71 44.71 0 008.34 3.37l6.5 2a49 49 0 016.37 2.37 17.13 17.13 0 015.35 3.73 11 11 0 01.8 1 10.62 10.62 0 012 6.46c0 5-2.59 8.24-7.19 9.94a30.16 30.16 0 01-10.31 1.49 53.82 53.82 0 01-7.19-.5 45 45 0 01-15.81-5c-.15.42-.29.89-.43 1.38a31.31 31.31 0 00-1 7.23c.54.31 1.12.59 1.68.88a37.67 37.67 0 006.44 2.53c1 .29 2 .54 3 .77a63.53 63.53 0 0013.56 1.32 46.7 46.7 0 008.77-.77l1.3-.28c.86-.2 1.69-.42 2.48-.68a25.53 25.53 0 005.39-2.38c.64-.39 1.25-.8 1.82-1.23s1.11-.9 1.62-1.38a18.09 18.09 0 005.44-13.6c.01-12.33-8.6-17.7-19.72-21.51zM794.53 84.06v70.56h15.53v-60.4a77.14 77.14 0 0111.43-.85 98.74 98.74 0 0111.71.57 57.71 57.71 0 001.41-13.27 127.62 127.62 0 00-13.55-.56c-8.75 0-19.9 1.69-26.53 3.95zm-45.16-4c-24.69 0-34.43 16.65-34.43 37.68 0 24.13 12.56 38.52 38.52 38.52 8.33 0 15.81-1.27 22.86-4.52 1-4.65 1.84-10 2.4-14.11a60.46 60.46 0 01-24.83 5.37c-13.83 0-21.17-6.07-23.15-18.63h49.54a83.41 83.41 0 00.84-12c0-17.73-9.59-32.26-31.75-32.26zm-18.91 31.33c1.27-12 7.06-18.35 18.06-18.35 10.73 0 16.94 6.77 16.94 18.35zM1079.3 88a19.64 19.64 0 00-4-3.23 25.25 25.25 0 00-3.79-1.88c-.92-.36-1.9-.7-2.92-1-.52-.15-1-.29-1.58-.42a58.63 58.63 0 00-13.47-1.37 86.44 86.44 0 00-13.24 1.12c-1.83.28-3.7.62-5.59 1-2.53.52-5.1 1.12-7.7 1.82v70.56h9.88V90.85c1.34-.32 2.72-.6 4.11-.85.78-.14 1.58-.26 2.37-.38a70.53 70.53 0 019.89-.75c17.36 0 22.3 6.77 22.3 19.9v45.86h9.87v-47.7c0-6.93-1.32-12.66-4.5-17a18.18 18.18 0 00-1.63-1.93z",
  fill: "#fff"
});

function SvgLogo$1(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$7({
    viewBox: "0 0 1767.22 187.01"
  }, props), _ref$6);
}

function _extends$8() { _extends$8 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$8.apply(this, arguments); }

var _ref$7 = /*#__PURE__*/React.createElement("path", {
  clipRule: "evenodd",
  d: "M12 2c2.5 0 4.5 2 4.5 4.5v2h5c.2 0 .4.2.5.4v8.2c0 2.7-2.2 4.9-4.9 4.9H6.9C4.2 22 2 19.8 2 17.1V9c0-.3.2-.5.5-.5h5v-2c0-2.4 1.9-4.4 4.3-4.5zm9 7.5h-4.5v2c0 .2-.2.4-.4.5H16c-.3 0-.5-.2-.5-.5v-2h-7v2c0 .2-.2.4-.4.5H8c-.3 0-.5-.2-.5-.5v-2H3v7.6C3 19.3 4.7 21 6.9 21h10.2c2.2 0 3.9-1.7 3.9-3.9zM12 3c-1.9 0-3.5 1.6-3.5 3.5v2h7v-2c0-1.9-1.5-3.4-3.3-3.5z"
});

function SvgShop(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$8({
    viewBox: "0 0 24 24"
  }, props), _ref$7);
}

function _extends$9() { _extends$9 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$9.apply(this, arguments); }

var _ref$8 = /*#__PURE__*/React.createElement("g", {
  fill: "#767676"
}, /*#__PURE__*/React.createElement("path", {
  d: "M83.102 8.062c.893-.681 1.943-1.334 2.964-1.334 1.078 0 1.575.866 1.362 2.13l-1.575 8.872h5.192l1.63-9.54c.767-4.543-2.155-6.176-4.779-6.176-1.972 0-3.915.866-5.305 2.414-.709-1.818-2.283-2.414-3.773-2.414-1.815 0-3.546.738-4.964 2.314l.369-2.044H66.45l-.808 4.515h2.936L66.663 17.73h5.149l1.702-9.668c.893-.681 1.943-1.334 2.964-1.334 1.078 0 1.575.866 1.362 2.13l-1.575 8.872h5.149z"
}), /*#__PURE__*/React.createElement("path", {
  clipRule: "evenodd",
  d: "M48.962 10.49c0-4.5 3.22-8.49 8.68-8.49 4.326 0 7.815 2.854 7.815 7.51 0 4.5-3.22 8.49-8.68 8.49-4.326 0-7.815-2.84-7.815-7.51zm5.134-.242c0 1.86 1.15 3.308 2.965 3.308 2 0 3.262-1.788 3.276-3.804 0-1.86-1.149-3.308-2.964-3.308-2.014 0-3.277 1.803-3.277 3.804zM31.672 10.49c0-4.5 3.22-8.49 8.68-8.49 4.326 0 7.815 2.854 7.815 7.51 0 4.5-3.22 8.49-8.68 8.49-4.326 0-7.815-2.84-7.815-7.51zm5.134-.242c0 1.86 1.15 3.308 2.965 3.308 2 0 3.276-1.788 3.276-3.804 0-1.86-1.149-3.308-2.964-3.308-2.014 0-3.277 1.803-3.277 3.804z",
  fillRule: "evenodd"
}), /*#__PURE__*/React.createElement("path", {
  d: "M32.211 2L31.19 7.565h-2.1c-1.97 0-2.78.994-3.049 2.598l-1.29 7.567h-5.163L21.502 6.8h-2.936l.809-4.515h7.772l-.553 2.967C27.644 2.752 29.927 2 32.055 2zM0 6.799l.794-4.515h7.404l-.354 10.761L12.78 2.284h5.8L10.766 17.73H2.936V6.8zM101.192 2.96c0-1.696-1.312-2.928-2.896-2.928S95.4 1.264 95.4 2.96s1.312 2.928 2.896 2.928 2.896-1.232 2.896-2.928zm-.496 0c0 1.424-1.072 2.448-2.4 2.448S95.88 4.384 95.88 2.96c0-1.44 1.088-2.464 2.416-2.464s2.4 1.024 2.4 2.464zm-2.464.416l.72 1.088h.752l-.784-1.152c.416-.112.672-.432.672-.912 0-.64-.416-1.008-1.088-1.008H97.16v3.072h.672V3.376zm.72-.976c0 .224-.176.416-.48.416h-.64v-.848h.64c.304 0 .48.192.48.432z"
}));

function SvgVroomLogoGray(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$9({
    fill: "none",
    height: 20,
    width: 102
  }, props), _ref$8);
}

var ViewContainer = styles.styled('div')(function () {
  return {
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    zIndex: 1001,
    top: 0
  };
});
var Top = styles.styled('div')(function (_ref) {
  var theme = _ref.theme;
  return _defineProperty({
    display: 'flex',
    color: '#FFFFFF',
    background: '#CC0000',
    maxHeight: '48px',
    minHeight: '48px',
    padding: theme.spacing(1, 2)
  }, theme.breakpoints.only('xs'), {
    padding: theme.spacing(1, 2)
  });
});
var Bottom = styles.styled('div')(function (_ref3) {
  var _ref4;

  var theme = _ref3.theme;
  return _ref4 = {
    display: 'flex',
    color: '#767676',
    background: '#FFFFFF',
    maxHeight: '48px',
    minHeight: '48px',
    alignItems: 'center',
    padding: theme.spacing(1, 2)
  }, _defineProperty(_ref4, theme.breakpoints.only('xs'), {
    padding: theme.spacing(1, 2)
  }), _defineProperty(_ref4, "borderBottom", 'solid 1px #F1F1F1'), _ref4;
});
var Logo$2 = styles.styled(SvgLogo$1)(function () {
  return {
    maxWidth: '295px',
    minWidth: '295px'
  };
});
var DesktopView$1 = styles.styled('div')(function (_ref5) {
  var theme = _ref5.theme;
  return _defineProperty({
    display: 'flex',
    width: '100%',
    alignItems: 'center'
  }, theme.breakpoints.down('sm'), {
    display: 'none'
  });
});
var MobileView$1 = styles.styled('div')(function (_ref7) {
  var theme = _ref7.theme;
  return _defineProperty({
    display: 'none',
    width: '100%',
    alignItems: 'center'
  }, theme.breakpoints.down('sm'), {
    display: 'flex'
  });
});
var ShopNowContainer = styles.styled('a')(function () {
  return {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    marginLeft: 'auto'
  };
});
var ShopLabel = styles.styled(ui.Typography)(function (_ref9) {
  var theme = _ref9.theme;
  return _defineProperty({
    color: '#FFFFFF',
    fontSize: '18px'
  }, theme.breakpoints.down('sm'), {
    color: '#767676',
    fontSize: '14px',
    fontWeight: 600
  });
});
var ShopIcon = styles.styled(SvgShop)(function (_ref11) {
  var theme = _ref11.theme;
  return _defineProperty({
    width: '20px',
    marginRight: theme.spacing(1),
    fill: '#FFFFFF'
  }, theme.breakpoints.down('sm'), {
    fill: '#767676'
  });
});
var Link = styles.styled('a')(function (_ref13) {
  var theme = _ref13.theme;
  return {
    display: 'flex',
    textDecoration: 'none',
    '& >p': {
      fontSize: '16px'
    },
    color: '#767676',
    marginRight: theme.spacing(4)
  };
});
var MenuLink = styles.styled('a')(function (_ref14) {
  var theme = _ref14.theme;
  return {
    display: 'flex',
    textDecoration: 'none',
    '& >p': {
      fontSize: '18px'
    },
    color: '#767676',
    padding: theme.spacing(2),
    borderBottom: 'solid 1px #D8D8D8'
  };
});
var DropdownLink = styles.styled(Link)(function (_ref15) {
  var theme = _ref15.theme;
  return {
    '& >p': {
      lineHeight: '20px',
      fontSize: '14px'
    },
    marginRight: theme.spacing(0),
    marginBottom: theme.spacing(1)
  };
});
var DropdownLabelContainer = styles.styled('div')(function (_ref16) {
  var _ref17;

  var theme = _ref16.theme;
  return _ref17 = {
    display: 'flex',
    alignItems: 'center',
    color: '#767676',
    '& >p': {
      fontSize: '16px'
    },
    marginRight: theme.spacing(4)
  }, _defineProperty(_ref17, theme.breakpoints.down('sm'), {
    display: 'none'
  }), _defineProperty(_ref17, "cursor", 'pointer'), _ref17;
});
var CustomTooltip = withStyles(function () {
  return {
    tooltip: {
      backgroundColor: '#FFFFFF',
      margin: '10px 0',
      padding: 0,
      maxWidth: '160px'
    }
  };
})(Tooltip);
var Dropdown = styles.styled('div')(function (_ref18) {
  var theme = _ref18.theme;
  return {
    background: '#FFFFFF',
    padding: theme.spacing(2),
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.15)',
    '& >a:last-child': {
      marginBottom: 0
    },
    '& >a': {
      pointerEvents: 'all'
    }
  };
});
var ExpandLessIcon = styles.styled(ExpandLess$1)(function () {
  return {
    marginTop: '4px',
    height: '22px'
  };
});
var ExpandMoreIcon = styles.styled(ExpandMore$1)(function () {
  return {
    marginTop: '4px',
    height: '22px'
  };
});
var MenuIcon = styles.styled(Menu$1)(function () {
  return {
    marginLeft: 'auto',
    cursor: 'pointer'
  };
});
var LearningCenter = styles.styled('div')(function (_ref19) {
  var theme = _ref19.theme;
  return {
    borderBottom: 'solid 1px #D8D8D8',
    padding: theme.spacing(2)
  };
});
var LearningLabel = styles.styled(ui.Typography)(function (_ref20) {
  var theme = _ref20.theme;
  return {
    color: '#767676',
    fontSize: '18px',
    fontWeight: 600,
    paddingBottom: theme.spacing(1)
  };
});
var LearningLinks = styles.styled('a')(function (_ref21) {
  var theme = _ref21.theme;
  return {
    display: 'flex',
    textDecoration: 'none',
    '& >p': {
      fontSize: '18px'
    },
    color: '#767676',
    padding: theme.spacing(1)
  };
});
var PoweredBy = styles.styled('div')(function (_ref22) {
  var theme = _ref22.theme;
  return _defineProperty({
    display: 'flex',
    alignItems: 'center'
  }, theme.breakpoints.up('md'), {
    marginLeft: 'auto'
  });
});
var PoweredByLabel = styles.styled(ui.Typography)(function () {
  return {
    color: '#767676',
    fontSize: '16px'
  };
});
var VroomLogo = styles.styled(SvgVroomLogoGray)(function (_ref24) {
  var theme = _ref24.theme;
  return {
    marginLeft: theme.spacing(1)
  };
});

var View$2 = function View(_ref25) {
  var viewModel = _ref25.viewModel;
  return /*#__PURE__*/React__default.createElement(ViewContainer, null, /*#__PURE__*/React__default.createElement(Top, null, /*#__PURE__*/React__default.createElement("a", {
    href: viewModel.logoLink.href,
    onClick: viewModel.logoLink.handleAnalytics
  }, /*#__PURE__*/React__default.createElement(Logo$2, null)), /*#__PURE__*/React__default.createElement(DesktopView$1, null, /*#__PURE__*/React__default.createElement(ShopNowContainer, {
    href: viewModel.shopNow.href,
    onClick: viewModel.shopNow.handleAnalytics
  }, /*#__PURE__*/React__default.createElement(ShopIcon, null), /*#__PURE__*/React__default.createElement(ShopLabel, null, viewModel.shopNow.label))), /*#__PURE__*/React__default.createElement(MobileView$1, null, /*#__PURE__*/React__default.createElement(MenuIcon, {
    onClick: viewModel.onDrawerClick
  }), /*#__PURE__*/React__default.createElement(Drawer, {
    anchor: "right",
    open: viewModel.isDrawerOpen(),
    onClose: viewModel.onDrawerClick
  }, /*#__PURE__*/React__default.createElement(MenuLink, {
    onClick: viewModel.financeCalculators.handleAnalytics,
    href: viewModel.financeCalculators.href,
    target: viewModel.financeCalculators.target
  }, /*#__PURE__*/React__default.createElement(ui.Typography, null, viewModel.financeCalculators.label)), /*#__PURE__*/React__default.createElement(LearningCenter, null, /*#__PURE__*/React__default.createElement(LearningLabel, null, viewModel.learningCenterLabel), viewModel.learningCenterLinks.map(function (link) {
    return /*#__PURE__*/React__default.createElement(LearningLinks, {
      onClick: link.handleAnalytics,
      key: link.href,
      href: link.href,
      target: link.target
    }, /*#__PURE__*/React__default.createElement(ui.Typography, null, link.label));
  })), /*#__PURE__*/React__default.createElement(MenuLink, {
    href: viewModel.contactUs.href,
    onClick: viewModel.contactUs.handleAnalytics
  }, /*#__PURE__*/React__default.createElement(ui.Typography, null, viewModel.contactUs.label)), /*#__PURE__*/React__default.createElement(MenuLink, {
    onClick: viewModel.backToCorporate.handleAnalytics,
    href: viewModel.backToCorporate.href,
    target: viewModel.backToCorporate.target
  }, /*#__PURE__*/React__default.createElement(ui.Typography, null, viewModel.backToCorporate.label))))), /*#__PURE__*/React__default.createElement(Bottom, null, /*#__PURE__*/React__default.createElement(DesktopView$1, null, /*#__PURE__*/React__default.createElement(Link, {
    onClick: viewModel.financeCalculators.handleAnalytics,
    href: viewModel.financeCalculators.href,
    target: viewModel.financeCalculators.target
  }, /*#__PURE__*/React__default.createElement(ui.Typography, null, viewModel.financeCalculators.label)), /*#__PURE__*/React__default.createElement(ClickAwayListener, {
    onClickAway: viewModel.onClickAway
  }, /*#__PURE__*/React__default.createElement(CustomTooltip, {
    onClose: viewModel.onDropdownClick,
    open: viewModel.isDropdownOpen(),
    disableFocusListener: true,
    disableHoverListener: true,
    disableTouchListener: true,
    title: /*#__PURE__*/React__default.createElement(Dropdown, null, viewModel.learningCenterLinks.map(function (link) {
      return /*#__PURE__*/React__default.createElement(DropdownLink, {
        onClick: link.handleAnalytics,
        key: link.href,
        href: link.href,
        target: link.target
      }, /*#__PURE__*/React__default.createElement(ui.Typography, null, link.label));
    }))
  }, /*#__PURE__*/React__default.createElement(DropdownLabelContainer, {
    onClick: viewModel.onDropdownClick
  }, /*#__PURE__*/React__default.createElement(ui.Typography, null, viewModel.learningCenterLabel), viewModel.isDropdownOpen() ? /*#__PURE__*/React__default.createElement(ExpandLessIcon, null) : /*#__PURE__*/React__default.createElement(ExpandMoreIcon, null)))), /*#__PURE__*/React__default.createElement(Link, {
    href: viewModel.contactUs.href,
    onClick: viewModel.contactUs.handleAnalytics
  }, /*#__PURE__*/React__default.createElement(ui.Typography, null, viewModel.contactUs.label)), /*#__PURE__*/React__default.createElement(Link, {
    onClick: viewModel.backToCorporate.handleAnalytics,
    href: viewModel.backToCorporate.href,
    target: viewModel.backToCorporate.target
  }, /*#__PURE__*/React__default.createElement(ui.Typography, null, viewModel.backToCorporate.label)), /*#__PURE__*/React__default.createElement(PoweredBy, null, /*#__PURE__*/React__default.createElement(PoweredByLabel, null, viewModel.poweredBy), /*#__PURE__*/React__default.createElement(VroomLogo, null))), /*#__PURE__*/React__default.createElement(MobileView$1, null, /*#__PURE__*/React__default.createElement(PoweredBy, null, /*#__PURE__*/React__default.createElement(PoweredByLabel, null, viewModel.poweredBy), /*#__PURE__*/React__default.createElement(VroomLogo, null)), /*#__PURE__*/React__default.createElement(ShopNowContainer, {
    href: viewModel.shopNow.href,
    onClick: viewModel.shopNow.handleAnalytics
  }, /*#__PURE__*/React__default.createElement(ShopIcon, null), /*#__PURE__*/React__default.createElement(ShopLabel, null, viewModel.shopNow.label)))));
};

var View$3 = observer$1(View$2);

var AnalyticsHandler$1 = /*#__PURE__*/function (_BaseAnalyticsHandler) {
  _inherits(AnalyticsHandler, _BaseAnalyticsHandler);

  var _super = _createSuper(AnalyticsHandler);

  function AnalyticsHandler() {
    var _this;

    _classCallCheck(this, AnalyticsHandler);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "trackShopNow", function () {
      var event = 'Shop Now Clicked';
      var properties = {
        category: 'Main Navigation'
      };

      _this.track(event, properties);
    });

    _defineProperty(_assertThisInitialized(_this), "trackLogo", function () {
      var event = 'Home Clicked';
      var properties = {
        category: 'Main Navigation'
      };

      _this.track(event, properties);
    });

    _defineProperty(_assertThisInitialized(_this), "trackFinanceCalculator", function () {
      var event = 'Finance Calculators Clicked';
      var properties = {
        category: 'Main Navigation'
      };

      _this.track(event, properties);
    });

    _defineProperty(_assertThisInitialized(_this), "trackContact", function () {
      var event = 'Contact Us Clicked';
      var properties = {
        category: 'Main Navigation'
      };

      _this.track(event, properties);
    });

    _defineProperty(_assertThisInitialized(_this), "trackCorporateSite", function () {
      var event = 'Back to Corporate Site Clicked';
      var properties = {
        category: 'Main Navigation'
      };

      _this.track(event, properties);
    });

    _defineProperty(_assertThisInitialized(_this), "trackLearningOverview", function () {
      var event = 'Learning Center Overview Clicked';
      var properties = {
        category: 'Main Navigation',
        label: 'Learning Center'
      };

      _this.track(event, properties);
    });

    _defineProperty(_assertThisInitialized(_this), "trackLearningBlog", function () {
      var event = 'Learning Center Blog Clicked';
      var properties = {
        category: 'Main Navigation',
        label: 'Learning Center'
      };

      _this.track(event, properties);
    });

    _defineProperty(_assertThisInitialized(_this), "trackLearningServicemembers", function () {
      var event = 'Learning Center Servicemembers Civil Relief Act Clicked';
      var properties = {
        category: 'Main Navigation',
        label: 'Learning Center'
      };

      _this.track(event, properties);
    });

    return _this;
  }

  return AnalyticsHandler;
}(analyticsIntegration.AnalyticsHandler);

var ViewModel = function ViewModel(store) {
  var _this = this;

  _classCallCheck(this, ViewModel);

  _defineProperty(this, "store", void 0);

  _defineProperty(this, "analyticsHandler", new AnalyticsHandler$1());

  _defineProperty(this, "shopNow", {
    label: 'Shop now',
    href: "/cars",
    handleAnalytics: this.analyticsHandler.trackShopNow
  });

  _defineProperty(this, "logoLink", {
    href: '/',
    handleAnalytics: this.analyticsHandler.trackLogo
  });

  _defineProperty(this, "financeCalculators", {
    label: 'Finance Calculators',
    href: 'https://santanderconsumerusa.com/learning-center/finance-calculators',
    target: '_blank',
    handleAnalytics: this.analyticsHandler.trackFinanceCalculator
  });

  _defineProperty(this, "learningCenterLabel", 'Learning Center');

  _defineProperty(this, "learningCenterLinks", [{
    label: 'Overview',
    href: 'https://santanderconsumerusa.com/learning-center',
    target: '_blank',
    handleAnalytics: this.analyticsHandler.trackLearningOverview
  }, {
    label: 'Blog',
    href: 'https://santanderconsumerusa.com/blog',
    target: '_blank',
    handleAnalytics: this.analyticsHandler.trackLearningBlog
  }, {
    label: 'Servicemembers Civil Relief Act',
    href: 'https://santanderconsumerusa.com/legal/servicemembers-civil-relief-act',
    target: '_blank',
    handleAnalytics: this.analyticsHandler.trackLearningServicemembers
  }]);

  _defineProperty(this, "contactUs", {
    label: 'Contact Us',
    href: "/contact",
    handleAnalytics: this.analyticsHandler.trackContact
  });

  _defineProperty(this, "backToCorporate", {
    label: 'Back to Corporate Site',
    href: 'https://santanderconsumerusa.com/',
    handleAnalytics: this.analyticsHandler.trackCorporateSite
  });

  _defineProperty(this, "poweredBy", 'Powered by');

  _defineProperty(this, "isDropdownOpen", function () {
    return _this.store.isOpen;
  });

  _defineProperty(this, "isDrawerOpen", function () {
    return _this.store.isDrawerOpen;
  });

  _defineProperty(this, "onDrawerClick", function () {
    _this.store.isDrawerOpen ? _this.closeDrawer() : _this.openDrawer();
  });

  _defineProperty(this, "onDropdownClick", function () {
    _this.store.isOpen ? _this.closeDropdown() : _this.openDropdown();
  });

  _defineProperty(this, "onClickAway", function () {
    _this.store.isOpen && _this.closeDropdown();
  });

  _defineProperty(this, "closeDrawer", function () {
    _this.store.setIsDrawerOpen(false);
  });

  _defineProperty(this, "openDrawer", function () {
    _this.store.setIsDrawerOpen(true);
  });

  _defineProperty(this, "closeDropdown", function () {
    _this.store.setIsOpen(false);
  });

  _defineProperty(this, "openDropdown", function () {
    _this.store.setIsOpen(true);
  });

  this.store = store;
};

var SantanderHeader = function SantanderHeader() {
  var viewModel = new ViewModel(new Store());
  return /*#__PURE__*/React__default.createElement(View$3, {
    viewModel: viewModel
  });
};

var _class$3, _descriptor$3, _descriptor2$3, _temp$3;
var Store$1 = (_class$3 = (_temp$3 = function Store() {
  _classCallCheck(this, Store);

  _initializerDefineProperty(this, "isDrawerOpen", _descriptor$3, this);

  _initializerDefineProperty(this, "setIsDrawerOpen", _descriptor2$3, this);
}, _temp$3), (_descriptor$3 = _applyDecoratedDescriptor(_class$3.prototype, "isDrawerOpen", [observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2$3 = _applyDecoratedDescriptor(_class$3.prototype, "setIsDrawerOpen", [action], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this = this;

    return function (open) {
      _this.isDrawerOpen = open;
    };
  }
})), _class$3);

function _extends$a() { _extends$a = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$a.apply(this, arguments); }

var _ref$9 = /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("style", null, ".logo_svg__cls-7{fill:#999da3}.logo_svg__cls-8{fill:#ed1c24}"));

var _ref2 = /*#__PURE__*/React.createElement("path", {
  d: "M70.07 38.55S50 36.86 30.25 42.43 0 56.11 0 56.11l18.15.11s9.08-8 18.76-11.13a89.87 89.87 0 0117.91-3.87s-13.07 2.18-21.3 6.9-11.38 8-11.38 8h16.34s4.84-3.63 11-8.36 20.59-9.21 20.59-9.21z",
  transform: "translate(0 -4.42)",
  fill: "#352d2e"
});

var _ref3 = /*#__PURE__*/React.createElement("path", {
  d: "M8.23 41.22L18 12.78s4 3.75 6.66 3.63 8.22-2.06 8.22-2.06l-9.52 28.57s-4.6 3.38-8.6 2.41a13.36 13.36 0 01-6.53-4.11z",
  transform: "translate(0 -4.42)",
  fill: "#354c77"
});

var _ref4 = /*#__PURE__*/React.createElement("path", {
  d: "M26.87 30.69c.12.36-3.76 12.71-3.76 12.71s6.17-4.4 11.74-3.75 6.17 4.48 11.74 5.2a12.87 12.87 0 009.2-2.18l3.75-14.4s-6.9 2.05-12.83-1.46-8.59-3.38-9.2-3.26-3.63 1.21-4.35 1.45a67.64 67.64 0 00-5.57 4z",
  transform: "translate(0 -4.42)",
  fill: "#e82b28"
});

var _ref5 = /*#__PURE__*/React.createElement("path", {
  d: "M15.37 26.57s.85.61 1.94 1.33 1.45.73 1.45.73L21.18 25l.12 4a3.31 3.31 0 001.69.13 15.61 15.61 0 002.42-.49l-4.11 2.9.24 3.63a9.61 9.61 0 01-2.18-1.45 5.73 5.73 0 01-.73-1.22s-.24.37-1.57.73a22 22 0 01-2.18.49l2.3-3.4a20.86 20.86 0 01-1.33-2.05 2.81 2.81 0 01-.48-1.7z",
  transform: "translate(0 -4.42)",
  fill: "#fff"
});

var _ref6 = /*#__PURE__*/React.createElement("path", {
  d: "M64.5 14.11s-5 3.75-9.8 2.06-6.05-6.3-11.62-5.81-10.65 4.35-10.65 4.35l-5.2 15s6.77-5.07 12.34-4.58 6 4.95 11 5.68A13.3 13.3 0 0059.3 29z",
  transform: "translate(0 -4.42)",
  fill: "#e9e9e7"
});

var _ref7 = /*#__PURE__*/React.createElement("path", {
  d: "M15.49 19.56c-.61-1-.85-8.59 5.32-11.26s16.82 1.57 25.54 12.59 9.8 24.8 5.08 29.52-11 1.82-11 1.82 7.74 3.51 12.22-.36S62 36 47.56 18.1c-25.65-28.49-36.19-4.59-32.07 1.46z",
  transform: "translate(0 -4.42)",
  fill: "#857c76"
});

var _ref8 = /*#__PURE__*/React.createElement("path", {
  d: "M97 28c0 4.13 0 7.53.21 9.33.13 1.25.39 2.2 1.68 2.37.6.08 1.55.17 1.93.17s.35.13.35.26-.22.34-.69.34c-2.37 0-5.08-.13-5.29-.13s-2.93.13-4.22.13c-.47 0-.69-.08-.69-.34s.09-.26.35-.26a7.25 7.25 0 001.29-.17c.86-.17 1.07-1.12 1.25-2.37.21-1.8.21-5.2.21-9.33V9.75L87 9.83c-2.66.05-3.7.35-4.39 1.38a7.84 7.84 0 00-.73 1.33c-.13.35-.25.43-.43.43s-.21-.13-.21-.38c0-.43.86-4.13.94-4.48s.26-.82.43-.82a8.46 8.46 0 001.9.52c1.25.13 2.88.22 3.4.22H104a17.07 17.07 0 003.06-.22c.64-.09 1-.21 1.2-.21s.22.25.22.51c0 1.29-.13 4.26-.13 4.73s-.13.56-.3.56-.31-.13-.35-.73v-.47c-.13-1.29-1.16-2.28-5.29-2.37L97 9.75zM115.05 23.34c0-5.68 0-6.71-.08-7.87s-.3-1.85-1.55-2a10.59 10.59 0 00-1.29-.09.36.36 0 01-.3-.3c0-.22.17-.3.6-.3 1.72 0 4.17.08 4.39.08s8.17.05 9 0 1.42-.17 1.72-.21a2.63 2.63 0 01.52-.17c.13 0 .17.17.17.34s-.21.69-.3 1.72c0 .35-.13 2-.22 2.41 0 .17-.17.39-.34.39s-.3-.17-.3-.47a3.81 3.81 0 00-.22-1.29c-.25-.61-.64-.87-2.71-1.12-.64-.09-5-.13-5.46-.13-.17 0-.22.13-.22.38v9.94c0 .26 0 .39.22.39.47 0 5.46 0 6.32-.09s1.47-.12 1.85-.51.43-.48.56-.48.22.09.22.31a17.76 17.76 0 00-.3 2c-.09.73-.17 2.11-.17 2.36s-.09.69-.35.69-.26-.13-.26-.34a3.31 3.31 0 00-.17-1.21c-.13-.51-.47-.94-1.94-1.11-1-.13-5.07-.18-5.72-.18a.23.23 0 00-.26.26V36.03c.09 2.46.78 2.93 4.52 2.93a12.54 12.54 0 003.79-.39 2.77 2.77 0 001.75-2.57c.09-.43.17-.55.39-.55s.25.3.25.55a31.06 31.06 0 01-.51 3.53c-.26.95-.65.95-2.11.95-2.84 0-5-.09-6.58-.13s-2.58-.09-3.14-.09c-.09 0-.82 0-1.64.05s-1.59.08-2.19.08c-.39 0-.61-.08-.61-.3a.3.3 0 01.31-.3c.34 0 .81-.13 1.16-.17.73-.13.82-.86 1-1.94a76.36 76.36 0 00.21-7.91zM142.79 26.27l-6-9.81c-.86-1.42-1.59-2.45-2.88-2.84a8 8 0 00-1.59-.26.37.37 0 01-.35-.34c0-.18.18-.26.65-.26 1.07 0 4.13.08 4.43.08s2.41-.08 3.7-.08c.52 0 .65.08.65.26a.34.34 0 01-.35.34 4.15 4.15 0 00-1 .09.51.51 0 00-.47.56 2.88 2.88 0 00.38 1.2c1.6 2.88 3 5.51 5 8.65 1.12-1.59 5.12-7.75 5.47-8.52a2.35 2.35 0 00.39-1.29c0-.26-.26-.47-.65-.6a4.74 4.74 0 00-1-.09.34.34 0 01-.35-.34c0-.18.18-.26.65-.26 1.42 0 3 .08 3.35.08s1.9-.08 3.19-.08c.43 0 .6.08.6.26a.38.38 0 01-.39.34 5 5 0 00-1.29.17c-1.07.35-1.76 1.29-2.84 2.89l-6.06 8.86c.73 1.12 7.18 11.74 8 12.73a3.61 3.61 0 002.15 1.6 8 8 0 001.29.21.27.27 0 01.3.3c0 .17-.17.3-.51.3-2.33 0-4.13 0-6.2-.08-1-.05-1.16-.13-1.16-.3a.34.34 0 01.21-.31c.22 0 .56-.43.22-1-2.07-3.57-4.13-7.1-6.41-10.8L138 37.5a3.56 3.56 0 00-.47 1.63c0 .35.26.52.6.6a3.63 3.63 0 00.69.09.34.34 0 01.34.34c0 .18-.21.26-.47.26-.9 0-3.4-.13-3.74-.13s-2.2.13-3.45.13c-.3 0-.34-.13-.34-.26a.3.3 0 01.3-.34 8.35 8.35 0 001.42-.21c1.12-.31 1.89-1 3.1-2.84zM171.64 13.49c.48-1.21.65-1.42.91-1.42s.51.52.9 1.33c.69 1.55 6.75 16.65 9.08 22.2 1.37 3.27 2.41 3.75 3.22 4a5.32 5.32 0 001.51.21c.22 0 .47.09.47.3s-.43.3-.86.3-3.35 0-6-.08c-.73-.05-1.33-.05-1.33-.26s.08-.17.26-.26a.69.69 0 00.34-1l-3.4-8.39c-.08-.17-.13-.21-.34-.21h-8.74a.38.38 0 00-.38.3l-2.15 5.85a7.41 7.41 0 00-.56 2.45c0 .73.64 1 1.29 1h.34c.3 0 .39.13.39.3s-.22.3-.56.3c-.9 0-3-.13-3.4-.13s-2.28.13-3.83.13c-.47 0-.73-.08-.73-.3a.33.33 0 01.34-.3 9 9 0 001.12-.09c1.72-.21 2.45-1.5 3.19-3.35zm4.22 15.23c.17 0 .17-.09.13-.26l-3.75-10c-.21-.56-.43-.56-.64 0l-3.53 10c0 .17 0 .26.13.26zM189.79 39.91c-.52-.26-.56-.39-.56-1.38 0-1.81.17-3.27.21-3.87 0-.39.09-.6.3-.6s.35.12.35.43a5.44 5.44 0 00.13 1.33c.6 2.67 3.44 3.61 6 3.61 3.74 0 5.68-2.1 5.68-4.86s-1.42-3.87-4.78-6.37l-1.72-1.29c-4.09-3.05-5.42-5.29-5.42-7.83 0-4.3 3.4-6.88 8.39-6.88a18 18 0 013.91.43 5 5 0 001.34.17c.3 0 .38 0 .38.26s-.17 1.38-.17 3.87c0 .56 0 .82-.3.82s-.3-.17-.34-.47a7.3 7.3 0 00-.56-1.81c-.26-.43-1.51-1.81-4.91-1.81-2.75 0-5 1.38-5 4 0 2.32 1.16 3.66 4.9 6.2l1.08.73c4.6 3.14 6.19 5.68 6.19 8.82a7.13 7.13 0 01-3.52 6.24 11.66 11.66 0 01-6 1.29 13.88 13.88 0 01-5.58-1.03zM228.34 20.37c0-6.71 0-7.91-.09-9.29s-.43-2.15-1.85-2.45a7.77 7.77 0 00-1.46-.13c-.18 0-.35-.09-.35-.26s.22-.34.69-.34c1.94 0 4.65.13 4.86.13.52 0 3.23-.13 5.81-.13 4.26 0 12.13-.39 17.25 4.9a15.39 15.39 0 014.18 10.93 17.58 17.58 0 01-4.65 12.13c-1.85 1.94-5.72 5-13 5-1.85 0-4.13-.13-6-.26s-3.35-.26-3.57-.26-.82 0-1.72.05-1.85.08-2.49.08c-.48 0-.69-.08-.69-.34s.08-.26.34-.26a7 7 0 001.29-.17c.86-.17 1.08-1.12 1.25-2.37.22-1.8.22-5.2.22-9.33zM232 25c0 4.56 0 8.52.09 9.34a9.24 9.24 0 00.47 3.27c.56.81 2.24 1.72 7.31 1.72a14.48 14.48 0 0010.24-4c2.24-2.2 3.44-6.33 3.44-10.29a15.37 15.37 0 00-4.13-10.84c-4-4.26-9-4.86-14.07-4.86a11.52 11.52 0 00-2.79.3.78.78 0 00-.52.86v9.17zM267.35 29.8c0 3.52 0 6.41.17 7.91.13 1.08.26 1.77 1.37 1.94a17 17 0 001.72.17.3.3 0 01.31.3c0 .17-.18.3-.61.3-2.1 0-4.56-.13-4.73-.13s-2.58.13-3.74.13c-.39 0-.6-.08-.6-.3a.29.29 0 01.3-.3 5.91 5.91 0 001.16-.17c.73-.17.86-.86 1-1.94.17-1.5.21-4.39.21-7.91v-6.46c0-5.68 0-6.71-.08-7.87s-.39-1.81-1.21-2a6.37 6.37 0 00-1.16-.13.32.32 0 01-.3-.3c0-.22.17-.3.6-.3 1.25 0 3.62.08 3.83.08s2.63-.08 3.79-.08c.43 0 .6.08.6.3a.36.36 0 01-.3.3 4.06 4.06 0 00-.95.09c-1 .21-1.25.73-1.33 2s0 2.19 0 7.87zM277.83 23.34c0-5.68 0-6.71-.08-7.87s-.3-1.85-1.55-2a10.59 10.59 0 00-1.29-.09.36.36 0 01-.3-.3c0-.22.17-.3.6-.3 1.72 0 4.26.08 4.47.08.39 0 3.57-.08 4.74-.08 2.41 0 5.07.21 7.05 1.59a6.41 6.41 0 012.63 5c0 2.71-1.12 5.34-4.65 8.35 3.1 3.87 5.72 7.18 7.92 9.46 2 2.07 3.27 2.41 4.21 2.54a6.92 6.92 0 001.34.13.33.33 0 01.34.3c0 .22-.21.3-.9.3H300a7.57 7.57 0 01-4-.73c-1.64-.86-3-2.62-5.17-5.38-1.59-2-3.26-4.34-4.08-5.33a.59.59 0 00-.52-.22l-4.82-.08c-.17 0-.26.08-.26.3v.86c0 3.53 0 6.37.18 7.87.13 1.08.34 1.77 1.5 1.94a15.37 15.37 0 001.68.17.27.27 0 01.3.3c0 .17-.17.3-.6.3-2.07 0-4.48-.13-4.65-.13s-2.58.13-3.74.13c-.39 0-.6-.08-.6-.3a.29.29 0 01.3-.3 5.8 5.8 0 001.16-.17c.73-.17.82-.86 1-1.94a76.36 76.36 0 00.21-7.91zm3.27 3.1a.54.54 0 00.26.47 12.9 12.9 0 004.18.56 5 5 0 002.84-.64c1.29-.86 2.28-2.8 2.28-5.6 0-4.56-2.5-7.18-6.54-7.18a17.28 17.28 0 00-2.71.21.47.47 0 00-.31.43zM307.29 23.34c0-5.68 0-6.71-.09-7.87s-.3-1.85-1.55-2a10.45 10.45 0 00-1.29-.09.36.36 0 01-.3-.3c0-.22.17-.3.6-.3 1.73 0 4.18.08 4.39.08s8.18.05 9 0 1.42-.17 1.72-.21a2.43 2.43 0 01.52-.17c.13 0 .17.17.17.34a16.92 16.92 0 00-.3 1.72c-.05.35-.13 2-.22 2.41 0 .17-.17.39-.34.39s-.3-.17-.3-.47a4.08 4.08 0 00-.22-1.29c-.26-.61-.64-.87-2.71-1.12-.64-.09-5-.13-5.46-.13-.17 0-.22.13-.22.38v9.94c0 .26 0 .39.22.39.47 0 5.46 0 6.32-.09s1.46-.12 1.85-.51.43-.48.56-.48.22.09.22.31a17.76 17.76 0 00-.3 2c-.09.73-.18 2.11-.18 2.36s-.08.69-.34.69-.26-.13-.26-.34a3.31 3.31 0 00-.17-1.21c-.13-.51-.47-.94-1.94-1.11-1-.13-5.07-.18-5.72-.18a.23.23 0 00-.26.26V36.03c.09 2.46.78 2.93 4.52 2.93a12.54 12.54 0 003.79-.39 2.77 2.77 0 001.76-2.57c.08-.43.17-.55.38-.55s.26.3.26.55a31.06 31.06 0 01-.51 3.53c-.26.95-.65.95-2.11.95-2.84 0-5-.09-6.59-.13s-2.58-.09-3.14-.09c-.08 0-.81 0-1.63.05s-1.59.08-2.2.08c-.38 0-.6-.08-.6-.3a.29.29 0 01.3-.3 11.17 11.17 0 001.16-.17c.74-.13.82-.86 1-1.94a72.91 72.91 0 00.22-7.91zM329 37a13.71 13.71 0 01-4.6-10.84 14.43 14.43 0 014.26-10c2.28-2.2 5.72-3.92 11.53-3.92a37.31 37.31 0 015.51.43 26.35 26.35 0 003.87.56c.39 0 .47.17.47.39s-.08.73-.17 2.06 0 3.23-.09 3.75-.21.77-.43.77-.3-.26-.3-.77a4.76 4.76 0 00-1.59-3.66c-1.33-1.12-4.09-2-7.44-2-4.86 0-7.19 1.29-8.52 2.54-2.8 2.58-3.4 5.85-3.4 9.55a13.29 13.29 0 0013.64 13.25c2.84 0 4.73-.22 6.24-1.72a6.81 6.81 0 001.46-3.06c.09-.38.13-.51.39-.51s.34.26.34.51a37.36 37.36 0 01-.9 4.69c-.22.69-.3.82-.95 1.08a22.46 22.46 0 01-6.84.82C335.83 40.9 332 39.56 329 37zM366.52 29.8c0 3.52 0 6.41.18 7.91.13 1.08.3 1.77 1.46 1.94a16 16 0 001.72.17.27.27 0 01.3.3c0 .17-.17.3-.6.3-2.07 0-4.48-.13-4.69-.13s-2.8.13-3.91.13c-.44 0-.61-.08-.61-.3a.26.26 0 01.3-.26 4.74 4.74 0 001.12-.17c.78-.17 1-.9 1.12-2 .17-1.5.17-4.39.17-7.91V14.44l-5.46.08c-2.37.05-3.27.3-3.83 1.16a6 6 0 00-.6 1.17c-.09.3-.22.34-.39.34a.29.29 0 01-.26-.3c0-.39.78-3.66.82-4s.26-.69.39-.69a12.77 12.77 0 001.67.43c1.08.13 2.54.17 3 .17h14.29a18.37 18.37 0 002.71-.17c.56-.08.9-.17 1.07-.17s.18.21.18.43c0 1.12-.13 3.74-.13 4.17s-.18.48-.35.48-.26-.13-.3-.65v-.39c-.13-1.11-.95-1.93-4.56-2l-4.74-.08zM403.53 9c.51-1.42.68-1.68.94-1.68s.43.22.95 1.55c.64 1.64 7.4 19.41 10 26 1.55 3.83 2.8 4.51 3.7 4.77a5.49 5.49 0 001.73.26c.25 0 .43 0 .43.26s-.39.34-.86.34c-.65 0-3.79 0-6.76-.08-.82-.05-1.29-.05-1.29-.3s.13-.26.3-.31.52-.47.26-1.16L409 28a.38.38 0 00-.39-.26h-9.25c-.22 0-.34.13-.43.34l-2.58 7.62a9 9 0 00-.6 2.88c0 .86.9 1.25 1.63 1.25h.43c.3 0 .43.09.43.26s-.26.34-.64.34c-1 0-2.89-.13-3.36-.13s-2.84.13-4.86.13c-.56 0-.82-.08-.82-.34s.17-.26.39-.26a11.31 11.31 0 001.25-.09c2-.25 2.84-1.89 3.61-4zM408 26.18c.22 0 .22-.13.17-.3l-4.08-11.62c-.22-.64-.43-.64-.65 0l-3.79 11.62c-.08.22 0 .3.13.3zM421.83 23.34c0-5.68 0-6.71-.08-7.87s-.3-1.85-1.55-2a10.59 10.59 0 00-1.29-.09.36.36 0 01-.3-.3c0-.22.17-.3.6-.3 1.72 0 4 .08 4.34.08s2.71-.08 3.83-.08c.43 0 .65.08.65.3a.37.37 0 01-.35.3 4.2 4.2 0 00-.94.09c-1 .17-1.21.81-1.29 2s-.09 2.19-.09 7.87v5.12c0 5.29 1.16 7.49 2.8 8.95a7.36 7.36 0 005.63 2 7.75 7.75 0 005.85-2.58c1.77-2.11 2.16-5.12 2.16-8.86v-4.63c0-5.68-.05-6.71-.09-7.87s-.26-1.85-1.51-2a10.45 10.45 0 00-1.29-.09.32.32 0 01-.3-.3c0-.22.17-.3.6-.3 1.68 0 3.88.08 4.09.08s2.07-.08 3.19-.08c.43 0 .6.08.6.3a.32.32 0 01-.3.3 4.24 4.24 0 00-1 .09c-1 .21-1.25.81-1.33 2s-.05 2.19-.05 7.87v3.92c0 4-.51 8.39-3.52 11A11.5 11.5 0 01433 40.9c-1.25 0-5.21-.09-7.87-2.59-1.85-1.72-3.32-4.25-3.32-9.59zM462.86 29.8c0 3.52 0 6.41.18 7.91.13 1.08.3 1.77 1.46 1.94a16 16 0 001.72.17.27.27 0 01.3.3c0 .17-.17.3-.6.3-2.07 0-4.47-.13-4.69-.13s-2.8.13-3.91.13c-.43 0-.61-.08-.61-.3a.26.26 0 01.3-.26 4.74 4.74 0 001.12-.17c.78-.17 1-.9 1.12-2 .17-1.5.17-4.39.17-7.91V14.44l-5.46.08c-2.37.05-3.27.3-3.83 1.16a6 6 0 00-.6 1.17c-.09.3-.22.34-.39.34a.29.29 0 01-.26-.3c0-.39.78-3.66.82-4s.26-.69.39-.69a13.29 13.29 0 001.67.43c1.08.13 2.54.17 3 .17H469a18.26 18.26 0 002.71-.17c.56-.08.9-.17 1.07-.17s.18.21.18.43c0 1.12-.13 3.74-.13 4.17s-.18.48-.35.48-.26-.13-.3-.65v-.39c-.13-1.11-1-1.93-4.56-2l-4.74-.08zM489 12.24c8.52 0 15 5.21 15 13.73 0 8.17-6.07 14.93-15.19 14.93-10.37 0-14.8-7.79-14.8-14.37A14.49 14.49 0 01489 12.24zm.86 27.15c3.4 0 10.24-1.81 10.24-12.39 0-8.78-5.34-13.38-11.32-13.38-6.32 0-10.88 4-10.88 11.92.03 8.52 5.15 13.85 11.99 13.85z",
  transform: "translate(0 -4.42)"
});

var _ref9 = /*#__PURE__*/React.createElement("path", {
  className: "logo_svg__cls-7",
  d: "M270.91 62.22v4.91h-2.23V54h5.08c2.72 0 4.5 1.41 4.5 4.14s-1.78 4.11-4.5 4.11zm2.81-6.32h-2.81v4.39h2.81a2.2 2.2 0 100-4.39zM287.92 67.34c-3.56 0-6.06-2.87-6.06-6.79s2.5-6.8 6.06-6.8 6.08 2.85 6.08 6.8-2.52 6.79-6.08 6.79zm0-11.59c-2.31 0-3.81 2-3.81 4.8s1.5 4.8 3.81 4.8 3.84-2 3.84-4.8-1.52-4.8-3.84-4.8zM306.09 54l2.49 9.69L311 54h2.14l-3.39 13.16h-2.06l-2.48-9.41-2.53 9.41h-2L297.22 54h2.18l2.38 9.69 2.51-9.69zM326.05 54v2h-6.41v3.47h5.81v2h-5.81v3.78h6.41v2h-8.59V54zM333.75 61.79v5.34h-2.23V54h5.08c2.72 0 4.48 1.37 4.48 3.94a3.59 3.59 0 01-3.37 3.8l3.82 5.42H339l-3.67-5.34zm0-1.86h2.8c1.48 0 2.32-.8 2.32-2s-.84-2-2.32-2h-2.8zM354.81 54v2h-6.41v3.47h5.81v2h-5.81v3.78h6.41v2h-8.59V54zM360.45 54h4.43c3.88 0 6.39 2.57 6.39 6.58s-2.51 6.58-6.39 6.58h-4.43zm4.35 11.17c2.76 0 4.24-1.78 4.24-4.59s-1.48-4.61-4.24-4.61h-2.12v9.2zM393.53 63.36c0 2.46-1.71 3.77-4.46 3.77h-5V54h4.61c2.74 0 4.45 1.22 4.45 3.58a2.82 2.82 0 01-1.71 2.78 3.19 3.19 0 012.11 3zm-4.91-3.86c1.53 0 2.34-.58 2.34-1.82s-.81-1.78-2.34-1.78h-2.42v3.6zm-2.42 5.7h2.8c1.5 0 2.32-.75 2.32-1.93s-.82-1.93-2.32-1.93h-2.8zM405.93 54h2.36l-4.78 7.91v5.25h-2.21v-5.28L396.54 54H399l3.49 5.89z",
  transform: "translate(0 -4.42)"
});

var _ref10 = /*#__PURE__*/React.createElement("path", {
  className: "logo_svg__cls-8",
  d: "M447.62 53.51l-.9 4.89h-1.84a2.41 2.41 0 00-2.69 2.28l-1.14 6.65h-4.54l1.69-9.61h-2.58l.7-4h6.85l-.49 2.61a4.81 4.81 0 014.8-2.85z",
  transform: "translate(0 -4.42)"
});

var _ref11 = /*#__PURE__*/React.createElement("path", {
  className: "logo_svg__cls-8",
  d: "M418.57 53.3l.71-3.97h6.51l-.31 9.46 4.34-9.46h5.1l-6.87 13.58h-6.9V53.3h-2.58z"
});

var _ref12 = /*#__PURE__*/React.createElement("path", {
  className: "logo_svg__cls-8",
  d: "M455.5 53.51a7.28 7.28 0 00-7.63 7.49c0 4.1 3.07 6.6 6.87 6.6a7.28 7.28 0 007.63-7.47c0-4.13-3.07-6.62-6.87-6.62zm-.5 10.16a2.65 2.65 0 01-2.6-2.91 3.07 3.07 0 012.88-3.34 2.65 2.65 0 012.6 2.91 3.07 3.07 0 01-2.88 3.34zM471.42 53.51a7.28 7.28 0 00-7.63 7.49c0 4.1 3.07 6.6 6.87 6.6a7.28 7.28 0 007.63-7.47c0-4.13-3.07-6.62-6.87-6.62zm-.52 10.16a2.65 2.65 0 01-2.6-2.91 3.07 3.07 0 012.88-3.34 2.65 2.65 0 012.6 2.91 3.07 3.07 0 01-2.88 3.34zM494.53 58.83a4.76 4.76 0 012.61-1.16c.95 0 1.38.76 1.19 1.87L497 67.33h4.56l1.44-8.39c.68-4-1.9-5.43-4.21-5.43a6.3 6.3 0 00-4.67 2.12 3.33 3.33 0 00-3.32-2.12 5.76 5.76 0 00-4.37 2l.33-1.8h-6.85l-.7 4h2.58l-1.69 9.61h4.54l1.49-8.5a4.76 4.76 0 012.61-1.16c.95 0 1.38.76 1.19 1.87l-1.38 7.79H493z",
  transform: "translate(0 -4.42)"
});

function SvgLogo$2(props) {
  return /*#__PURE__*/React.createElement("svg", _extends$a({
    id: "logo_svg__Layer_1",
    "data-name": "Layer 1",
    viewBox: "0 0 504 63.16"
  }, props), _ref$9, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, _ref10, _ref11, _ref12);
}

var ViewContainer$1 = styles.styled('div')(function () {
  return {
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    zIndex: 1001,
    top: 0
  };
});
var Bar$1 = styles.styled('div')(function (_ref) {
  var _ref2;

  var theme = _ref.theme;
  return _ref2 = {
    display: 'flex',
    alignItems: 'center',
    color: '#041022',
    background: '#FFFFFF',
    height: '72px',
    padding: theme.spacing(2, 4)
  }, _defineProperty(_ref2, theme.breakpoints.down('sm'), {
    padding: theme.spacing(1, 2),
    height: '56px'
  }), _defineProperty(_ref2, "borderBottom", "1px solid ".concat(theme.palette.grey[400])), _defineProperty(_ref2, "boxShadow", "0 1px 4px 0 rgba(51, 51, 51, 0.1)"), _ref2;
});
var LogoAnchor = styles.styled('a')(function () {
  return {
    display: 'flex',
    marginRight: '16px'
  };
});
var Logo$3 = styles.styled(SvgLogo$2)(function (_ref3) {
  var theme = _ref3.theme;
  return _defineProperty({
    height: '32px'
  }, theme.breakpoints.down('sm'), {
    height: '24px'
  });
});
var NavDesktopView = styles.styled('div')(function (_ref5) {
  var _ref6;

  var theme = _ref5.theme;
  return _ref6 = {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto'
  }, _defineProperty(_ref6, theme.breakpoints.down('sm'), {
    display: 'none'
  }), _defineProperty(_ref6, '& > *:not(:last-child)', {
    marginRight: '24px'
  }), _ref6;
});
var NavLink = styles.styled('a')(function (_ref7) {
  var theme = _ref7.theme;
  return {
    display: 'inline-flex',
    flexDirection: 'column',
    position: 'relative',
    color: 'inherit',
    textDecoration: 'none',
    '&:visited': {
      color: 'inherit',
      textDecoration: 'none'
    },
    '&:hover': {
      color: 'inherit',
      textDecoration: 'none'
    },
    '&:active': {
      color: 'inherit',
      textDecoration: 'none'
    },
    '&:after': {
      content: '""',
      display: 'flex',
      width: '0px',
      height: '2px',
      margin: 'auto',
      marginTop: '4px',
      background: theme.palette.primary.main,
      transition: 'width 250ms ease, background-color 250ms ease'
    },
    '&:hover:after': {
      width: '100%'
    }
  };
});
var NavMobileView = styles.styled('div')(function (_ref8) {
  var theme = _ref8.theme;
  return _defineProperty({
    display: 'none',
    width: '100%',
    alignItems: 'center'
  }, theme.breakpoints.down('sm'), {
    display: 'flex'
  });
});
var MobileNavLink = styles.styled('a')(function (_ref10) {
  var theme = _ref10.theme;
  return {
    padding: theme.spacing(2),
    borderBottom: "1px solid ".concat(theme.palette.grey[300]),
    color: 'inherit',
    textDecoration: 'none',
    display: 'flex',
    '&:visited': {
      color: 'inherit',
      textDecoration: 'none'
    },
    '&:hover': {
      color: theme.palette.primary.main,
      textDecoration: 'none'
    },
    '&:active': {
      color: 'inherit',
      textDecoration: 'none'
    }
  };
});
var MenuIcon$1 = styles.styled(Menu$1)(function () {
  return {
    marginLeft: 'auto',
    cursor: 'pointer'
  };
});
var StyledDrawer$1 = styles.styled(Drawer)(function () {
  return {
    '& .MuiDrawer-paper': {
      minWidth: '280px'
    }
  };
});

var View$4 = function View(_ref11) {
  var viewModel = _ref11.viewModel;
  return /*#__PURE__*/React__default.createElement(ViewContainer$1, null, /*#__PURE__*/React__default.createElement(Bar$1, null, /*#__PURE__*/React__default.createElement(LogoAnchor, {
    href: viewModel.logoLink.href,
    onClick: viewModel.logoLink.handleAnalytics
  }, /*#__PURE__*/React__default.createElement(Logo$3, null)), /*#__PURE__*/React__default.createElement(NavDesktopView, null, viewModel.navLinks.map(function (navLink) {
    return /*#__PURE__*/React__default.createElement(NavLink, {
      key: navLink.label,
      href: navLink.href,
      onClick: navLink.handleAnalytics
    }, /*#__PURE__*/React__default.createElement(ui.Typography, {
      letterSpacing: "1.25px",
      variant: "button",
      fontWeight: "fontWeightSemibold"
    }, navLink.label));
  })), /*#__PURE__*/React__default.createElement(NavMobileView, null, /*#__PURE__*/React__default.createElement(MenuIcon$1, {
    onClick: viewModel.onDrawerClick
  }), /*#__PURE__*/React__default.createElement(StyledDrawer$1, {
    anchor: "right",
    open: viewModel.isDrawerOpen(),
    onClose: viewModel.onDrawerClick
  }, viewModel.navLinks.map(function (navLink) {
    return /*#__PURE__*/React__default.createElement(MobileNavLink, {
      key: navLink.label,
      href: navLink.href
    }, /*#__PURE__*/React__default.createElement(ui.Typography, {
      letterSpacing: "1.25px",
      variant: "button",
      fontWeight: "fontWeightSemibold"
    }, navLink.label));
  })))));
};

var View$5 = observer$1(View$4);

var AnalyticsHandler$2 = /*#__PURE__*/function (_BaseAnalyticsHandler) {
  _inherits(AnalyticsHandler, _BaseAnalyticsHandler);

  var _super = _createSuper(AnalyticsHandler);

  function AnalyticsHandler() {
    var _this;

    _classCallCheck(this, AnalyticsHandler);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "trackLogoClicked", function () {
      var event = 'Logo Clicked';
      var properties = {
        category: 'Main Navigation'
      };

      _this.track(event, properties);
    });

    _defineProperty(_assertThisInitialized(_this), "trackBuyClicked", function () {
      var event = 'Buy Clicked';
      var properties = {
        category: 'Main Navigation'
      };

      _this.track(event, properties);
    });

    _defineProperty(_assertThisInitialized(_this), "trackSellTradeClicked", function () {
      var event = 'Sell/Trade Clicked';
      var properties = {
        category: 'Main Navigation'
      };

      _this.track(event, properties);
    });

    _defineProperty(_assertThisInitialized(_this), "trackFinanceClicked", function () {
      var event = 'Finance Clicked';
      var properties = {
        category: 'Main Navigation'
      };

      _this.track(event, properties);
    });

    _defineProperty(_assertThisInitialized(_this), "trackLocationsClicked", function () {
      var event = 'Locations Clicked';
      var properties = {
        category: 'Main Navigation'
      };

      _this.track(event, properties);
    });

    _defineProperty(_assertThisInitialized(_this), "trackContactUsClicked", function () {
      var event = 'Contact Us Clicked';
      var properties = {
        category: 'Main Navigation'
      };

      _this.track(event, properties);
    });

    return _this;
  }

  return AnalyticsHandler;
}(analyticsIntegration.AnalyticsHandler);

var ViewModel$1 = function ViewModel(store, vroomUrl) {
  var _this = this;

  _classCallCheck(this, ViewModel);

  _defineProperty(this, "store", void 0);

  _defineProperty(this, "analyticsHandler", new AnalyticsHandler$2());

  _defineProperty(this, "TDAQueryString", '?vit_source=texasdirectauto&vit_medium=wl&vit_dest=vroom&vit_brand=TDA');

  _defineProperty(this, "logoLink", {
    linkToVroom: false,
    href: '/',
    handleAnalytics: this.analyticsHandler.trackLogoClicked
  });

  _defineProperty(this, "navLinks", [{
    linkToVroom: false,
    href: '/cars',
    label: 'BUY',
    handleAnalytics: this.analyticsHandler.trackBuyClicked
  }, {
    linkToVroom: true,
    href: '/sell',
    label: 'SELL/TRADE',
    handleAnalytics: this.analyticsHandler.trackSellTradeClicked
  }, {
    linkToVroom: true,
    href: '/finance',
    label: 'FINANCE',
    handleAnalytics: this.analyticsHandler.trackFinanceClicked
  }, {
    linkToVroom: false,
    href: '/contact',
    label: 'CONTACT US',
    handleAnalytics: this.analyticsHandler.trackContactUsClicked
  }]);

  _defineProperty(this, "isDrawerOpen", function () {
    return _this.store.isDrawerOpen;
  });

  _defineProperty(this, "onDrawerClick", function () {
    _this.store.isDrawerOpen ? _this.closeDrawer() : _this.openDrawer();
  });

  _defineProperty(this, "closeDrawer", function () {
    _this.store.setIsDrawerOpen(false);
  });

  _defineProperty(this, "openDrawer", function () {
    _this.store.setIsDrawerOpen(true);
  });

  this.store = store;

  if (vroomUrl) {
    this.navLinks.forEach(function (navLink) {
      if (navLink.linkToVroom) navLink.href = "".concat(vroomUrl).concat(navLink.href).concat(_this.TDAQueryString);
    });
  }
};

var TDAHeader = function TDAHeader(_ref) {
  var vroomUrl = _ref.vroomUrl;
  var viewModel = new ViewModel$1(new Store$1(), vroomUrl);
  return /*#__PURE__*/React__default.createElement(View$5, {
    viewModel: viewModel
  });
};

exports.Bar = Bar;
exports.InProgressDealBar = InProgressDealBar;
exports.Logo = Logo$1;
exports.Nav = Nav;
exports.SantanderHeader = SantanderHeader;
exports.SimpleHeader = SimpleHeader;
exports.TDAHeader = TDAHeader;
