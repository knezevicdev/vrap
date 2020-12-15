"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Typography = require("../foundation/Typography");

var _Icon = _interopRequireWildcard(require("./Icon/Icon"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  color: ", ";\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 42px;\n  right: 18px;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n\n  :disabled {\n    color: ", ";\n    background: ", ";\n  }\n\n  padding: 12px 38px 12px 16px;\n  margin: 4px 0px;\n  line-height: 24px;\n  font-size: 18px;\n  letter-spacing: 0.25px;\n  font-family: Calibre;\n  border: solid 1px\n    ", ";\n  outline: none;\n\n  :focus {\n    border: solid 1px ", ";\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  width: 256px;\n  position: relative;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Input = props => {
  var {
    value,
    onChange,
    label,
    className,
    placeholder,
    error,
    disabled,
    success
  } = props;
  var isDisabled = disabled === true;
  var hasError = error ? error !== '' : false;
  var hasSuccess = success ? success : value !== '';
  var showError = isDisabled ? false : hasError;
  var showSuccess = isDisabled ? false : hasSuccess;

  var onInputChange = event => {
    onChange(event.target.value);
  };

  return /*#__PURE__*/_react.default.createElement(Container, {
    className: className
  }, /*#__PURE__*/_react.default.createElement(_Typography.Body.Small, null, label), showError ? /*#__PURE__*/_react.default.createElement(CustomIconPosition, {
    icon: _Icon.Icons.FEEDBACK_ERROR
  }) : showSuccess && /*#__PURE__*/_react.default.createElement(CustomIconPosition, {
    icon: _Icon.Icons.FEEDBACK_SUCCESS
  }), /*#__PURE__*/_react.default.createElement(CustomInput, {
    type: "text",
    error: showError,
    disabled: disabled,
    placeholder: placeholder,
    value: value,
    onChange: onInputChange
  }), showError && /*#__PURE__*/_react.default.createElement(Error, null, error));
};

Input.defaultProps = {
  placeholder: 'Placeholder'
};
var _default = Input;
exports.default = _default;

var textColor = props => props.theme.typography.color;

var grayTwo = props => props.theme.colors.gray.two;

var grayFour = props => props.theme.colors.gray.four;

var secondaryBrand = props => props.theme.colors.secondary.brand;

var secondaryError = props => props.theme.colors.secondary.error;

var Container = _styledComponents.default.div(_templateObject());

var CustomInput = _styledComponents.default.input(_templateObject2(), textColor, grayTwo, grayFour, props => props.error ? secondaryError(props) : grayTwo(props), secondaryBrand);

var CustomIconPosition = (0, _styledComponents.default)(_Icon.default)(_templateObject3());
var Error = (0, _styledComponents.default)(_Typography.Fine)(_templateObject4(), secondaryError);