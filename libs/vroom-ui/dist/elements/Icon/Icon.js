"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Icons = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _icons = _interopRequireDefault(require("../../../public/assets/icons.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  min-height: ", "px;\n  max-height: ", "px;\n  min-width: ", "px;\n  max-width: ", "px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var SVG = _styledComponents.default.svg(_templateObject(), props => props.height, props => props.height, props => props.width, props => props.width);

var Icon = (_ref) => {
  var {
    icon,
    fill,
    stroke,
    className
  } = _ref;
  var width = icon.width;
  var height = icon.height;
  var name = icon.name;
  var iconDefaultFill = icon.fill ? icon.fill : '#041022';
  var iconFill = fill ? fill : iconDefaultFill;
  var iconDefaultStroke = icon.stroke ? icon.stroke : 'none';
  var iconStroke = stroke ? stroke : iconDefaultStroke;
  var id = "#".concat(name);
  var xlinkHref = "".concat(_icons.default).concat(id);
  return /*#__PURE__*/_react.default.createElement(SVG, {
    className: className,
    fill: iconFill,
    stroke: iconStroke,
    width: width,
    height: height,
    viewBox: "0 0 ".concat(width, " ").concat(height)
  }, /*#__PURE__*/_react.default.createElement("use", {
    xlinkHref: xlinkHref
  }));
};

var _default = Icon;
exports.default = _default;
var Icons = {
  GAS: {
    name: 'gas',
    width: 24,
    height: 24
  },
  ENGINE: {
    name: 'engine',
    width: 24,
    height: 24
  },
  SEAT: {
    name: 'seat',
    width: 24,
    height: 24
  },
  VROOM: {
    name: 'vroom',
    width: 116,
    height: 20,
    fill: '#E7131A'
  },
  GOOGLE_PLAY: {
    name: 'google-play',
    width: 108,
    height: 32
  },
  APPLE_STORE: {
    name: 'apple-store',
    width: 96,
    height: 32
  },
  FACEBOOK: {
    name: 'facebook',
    width: 24,
    height: 24
  },
  TWITTER: {
    name: 'twitter',
    width: 24,
    height: 24
  },
  INSTAGRAM: {
    name: 'instagram',
    width: 24,
    height: 24
  },
  CHEVRON_DOWN: {
    name: 'chevron-down',
    width: 12,
    height: 8
  },
  CHEVRON_UP: {
    name: 'chevron-up',
    width: 12,
    height: 8
  },
  CLOSE_SMALL: {
    name: 'close-small',
    width: 8,
    height: 8
  },
  CLOSE_LARGE: {
    name: 'close-large',
    width: 12,
    height: 12
  },
  MINUS: {
    name: 'minus',
    width: 16,
    height: 2
  },
  PLUS: {
    name: 'plus',
    width: 16,
    height: 16
  },
  BULLET: {
    name: 'bullet',
    width: 6,
    height: 6,
    fill: '#E7131A'
  },
  LOADING: {
    name: 'loading',
    width: 16,
    height: 16
  },
  CARET_LEFT: {
    name: 'caret-left',
    width: 10,
    height: 16
  },
  CARET_RIGHT: {
    name: 'caret-right',
    width: 10,
    height: 16
  },
  CARET_DOUBLE_LEFT: {
    name: 'caret-double-left',
    width: 20,
    height: 16
  },
  CARET_DOUBLE_RIGHT: {
    name: 'caret-double-right',
    width: 20,
    height: 16
  },
  ARROW_LEFT: {
    name: 'arrow-left',
    width: 16,
    height: 16
  },
  ARROW_RIGHT: {
    name: 'arrow-right',
    width: 16,
    height: 16
  },
  IMAGE_EXPAND: {
    name: 'image-expand',
    width: 16,
    height: 16
  },
  IMAGE_CONTRACT: {
    name: 'image-contract',
    width: 16,
    height: 16
  },
  CHECKMARK_LARGE: {
    name: 'checkmark-large',
    width: 16,
    height: 12
  },
  CHECKMARK_SMALL: {
    name: 'checkmark-small',
    width: 12,
    height: 9
  },
  STAR_FILLED: {
    name: 'star',
    width: 16,
    height: 14,
    fill: '#E7131A'
  },
  STAR_HALF_FILLED: {
    name: 'star-half',
    width: 16,
    height: 14,
    fill: '#E7131A',
    stroke: 'none'
  },
  STAR_EMPTY: {
    name: 'star-empty',
    width: 16,
    height: 14,
    fill: 'none',
    stroke: '#E7131A'
  },
  FAVORITE: {
    name: 'favorite',
    width: 18,
    height: 16,
    fill: '#041022'
  },
  FAVORITE_SELECTED: {
    name: 'favorite-selected',
    width: 18,
    height: 16,
    fill: '#E7131A'
  },
  SEARCH: {
    name: 'search',
    width: 18,
    height: 18
  },
  MENU: {
    name: 'menu',
    width: 18,
    height: 16
  },
  SORT: {
    name: 'sort',
    width: 18,
    height: 20
  },
  FILTER: {
    name: 'filter',
    width: 20,
    height: 14
  },
  CART_EMPTY: {
    name: 'cart-empty',
    width: 20,
    height: 18
  },
  CART_FILLED: {
    name: 'cart-filled',
    width: 20,
    height: 18
  },
  EDIT: {
    name: 'edit',
    width: 14,
    height: 16
  },
  LOGIN: {
    name: 'login',
    width: 24,
    height: 24
  },
  EXIT: {
    name: 'exit',
    width: 20,
    height: 16
  },
  LOCK: {
    name: 'lock',
    width: 16,
    height: 17
  },
  FEEDBACK_INFO: {
    name: 'feedback-info',
    width: 16,
    height: 16,
    fill: '#E7131A'
  },
  FEEDBACK_ERROR: {
    name: 'feedback-error',
    width: 16,
    height: 16,
    fill: '#F26900'
  },
  FEEDBACK_QUESTION: {
    name: 'feedback-question',
    width: 16,
    height: 16,
    fill: '#E7131A'
  },
  FEEDBACK_SUCCESS: {
    name: 'feedback-success',
    width: 16,
    height: 16,
    fill: '#308406'
  },
  PHONE: {
    name: 'phone',
    width: 22,
    height: 20
  },
  HOT: {
    name: 'hot',
    width: 10,
    height: 12
  },
  QUESTION: {
    name: 'question',
    width: 14,
    height: 22
  },
  ENVELOPE: {
    name: 'envelope',
    width: 24,
    height: 14
  },
  CALENDAR: {
    name: 'calendar',
    width: 22,
    height: 18
  }
};
exports.Icons = Icons;