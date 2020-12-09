"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _util = require("../foundation/themes/util");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  background: ", ";\n\n  ", "\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  background: ", ";\n  ", "\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  ", "\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  ", "\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  min-height: 48px;\n  max-height: 48px;\n  padding: 0 32px;\n  border: none;\n  cursor: pointer;\n  width: max-content;\n  font-family: ", ";\n  letter-spacing: 1.25px;\n  text-transform: uppercase;\n  font-size: 18px;\n  font-weight: 600;\n\n  color: ", ";\n  white-space: nowrap;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var bodyFamily = props => props.theme.typography.family.body;

var primaryBrand = props => props.theme.colors.primary.brand;

var primaryBlack = props => props.theme.colors.primary.black;

var primaryWhite = props => props.theme.colors.primary.white;

var secondaryBrand = props => props.theme.colors.secondary.brand;

var grayTwo = props => props.theme.colors.gray.two;

var grayThree = props => props.theme.colors.gray.three;

var base = (0, _styledComponents.css)(_templateObject(), bodyFamily, primaryWhite);

var Primary = _styledComponents.default.button(_templateObject2(), base, props => {
  if (props.disabled) {
    return "\n        background: ".concat(grayThree(props), ";\n        color: ").concat(grayTwo(props), ";\n        cursor: default;\n      ");
  } else {
    return "\n        background: ".concat(primaryBrand(props), ";\n        :hover {\n            background: #d01118;\n        }\n        :focus {\n            outline: 4px solid ").concat((0, _util.addOpacityToHex)(secondaryBrand(props), 20), ";\n        }\n        ");
  }
});

var Secondary = _styledComponents.default.button(_templateObject3(), base, props => {
  if (props.disabled) {
    return "\n        background: ".concat(grayThree(props), ";\n        color: ").concat(grayTwo(props), ";\n        cursor: default;\n      ");
  } else {
    return "\n          background: ".concat(primaryBlack(props), ";\n          :focus {\n              outline: 4px solid ").concat((0, _util.addOpacityToHex)(secondaryBrand(props), 20), ";\n          }\n        ");
  }
});

var Outline = _styledComponents.default.button(_templateObject4(), base, primaryWhite, props => {
  if (props.disabled) {
    return "\n          color: ".concat(grayTwo(props), ";\n          border: solid 2px ").concat(grayTwo(props), ";\n          cursor: default;\n        ");
  } else {
    return "\n          color: ".concat(primaryBrand(props), ";\n          border: solid 2px ").concat(primaryBrand(props), ";\n          :hover {\n              background: ").concat((0, _util.addOpacityToHex)(primaryBrand(props), 10), ";\n          }\n          :focus {\n              outline: 4px solid ").concat((0, _util.addOpacityToHex)(secondaryBrand(props), 20), ";\n          }\n        ");
  }
});

var Bare = _styledComponents.default.button(_templateObject5(), base, primaryWhite, props => {
  if (props.disabled) {
    return "\n        color: ".concat(grayTwo(props), ";\n        cursor: default;\n        ");
  } else {
    return "\n        color: ".concat(primaryBrand(props), ";\n        :hover {\n            background: ").concat((0, _util.addOpacityToHex)(primaryBlack(props), 10), ";\n        }\n        :focus {\n            outline: 4px solid ").concat((0, _util.addOpacityToHex)(secondaryBrand(props), 20), ";\n        }\n        ");
  }
});

var PrimaryButton = (_ref) => {
  var {
    className,
    children,
    onClick,
    disabled
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(Primary, {
    className: className,
    disabled: disabled,
    onClick: onClick
  }, children);
};

var SecondaryButton = (_ref2) => {
  var {
    className,
    children,
    onClick,
    disabled
  } = _ref2;
  return /*#__PURE__*/_react.default.createElement(Secondary, {
    className: className,
    disabled: disabled,
    onClick: onClick
  }, children);
};

var OutlineButton = (_ref3) => {
  var {
    className,
    children,
    onClick,
    disabled
  } = _ref3;
  return /*#__PURE__*/_react.default.createElement(Outline, {
    className: className,
    disabled: disabled,
    onClick: onClick
  }, children);
};

var BareButton = (_ref4) => {
  var {
    className,
    children,
    onClick,
    disabled
  } = _ref4;
  return /*#__PURE__*/_react.default.createElement(Bare, {
    className: className,
    disabled: disabled,
    onClick: onClick
  }, children);
};

var Button = {
  Primary: PrimaryButton,
  Secondary: SecondaryButton,
  Bare: BareButton,
  Outline: OutlineButton
};
exports.Button = Button;