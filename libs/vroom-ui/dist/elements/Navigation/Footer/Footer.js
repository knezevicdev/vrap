"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Vroom = require("../../../foundation/themes/Vroom");

var _Typography = require("../../../foundation/Typography");

var _Icon = _interopRequireWildcard(require("../../Icon/Icon"));

var _Links = require("./Desktop/Links");

var _Links2 = require("./Mobile/Links");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject11() {
  var data = _taggedTemplateLiteral(["\n  line-height: 0;\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n  letter-spacing: 1.25px;\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n  margin-top: 16px;\n  margin-bottom: 8px;\n  letter-spacing: 1.25px;\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  margin-right: 16px;\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  fill: ", ";\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  margin-right: 16px;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  fill: ", ";\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  margin: 16px 0;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  ", "\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  background: ", ";\n  padding: 48px 64px 32px 64px;\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Footer = (_ref) => {
  var {
    sections
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(Container, null, /*#__PURE__*/_react.default.createElement(Information, null, /*#__PURE__*/_react.default.createElement(CustomA, {
    href: "https://www.vroom.com/"
  }, /*#__PURE__*/_react.default.createElement(VroomIcon, {
    icon: _Icon.Icons.VROOM
  })), /*#__PURE__*/_react.default.createElement(Message, {
    bold: true
  }, "GET THE VROOM APP"), /*#__PURE__*/_react.default.createElement(Apps, null, /*#__PURE__*/_react.default.createElement(CustomA, {
    href: "https://play.google.com/store/apps/details?id=com.vroom.app.android"
  }, /*#__PURE__*/_react.default.createElement(GoogleIcon, {
    icon: _Icon.Icons.GOOGLE_PLAY
  })), /*#__PURE__*/_react.default.createElement(CustomA, {
    href: "https://apps.apple.com/app/apple-store/id1494048038?pt=120897984"
  }, /*#__PURE__*/_react.default.createElement(_Icon.default, {
    icon: _Icon.Icons.APPLE_STORE
  }))), /*#__PURE__*/_react.default.createElement(Socials, null, /*#__PURE__*/_react.default.createElement(CustomA, {
    href: "https://www.facebook.com/vroom"
  }, /*#__PURE__*/_react.default.createElement(SocialIconSpace, {
    icon: _Icon.Icons.FACEBOOK
  })), /*#__PURE__*/_react.default.createElement(CustomA, {
    href: "https://www.twitter.com/vroomcar"
  }, /*#__PURE__*/_react.default.createElement(SocialIconSpace, {
    icon: _Icon.Icons.TWITTER
  })), /*#__PURE__*/_react.default.createElement(CustomA, {
    href: "https://www.instagram.com/vroom"
  }, /*#__PURE__*/_react.default.createElement(SocialIcon, {
    icon: _Icon.Icons.INSTAGRAM
  }))), /*#__PURE__*/_react.default.createElement(Copyright, null, "\xA92020 VROOM. ALL RIGHTS RESERVED.")), /*#__PURE__*/_react.default.createElement(_Links.DesktopLinks, {
    sections: sections
  }), /*#__PURE__*/_react.default.createElement(_Links2.MobileLinks, {
    sections: sections
  }));
};

var primaryBlack = props => props.theme.colors.primary.black;

var primaryWhite = props => props.theme.colors.primary.white;

var Container = _styledComponents.default.div(_templateObject(), primaryBlack, (0, _Vroom.addStyleForMobile)("\n    flex-direction: column;\n    padding: 24px;\n  "));

var Information = _styledComponents.default.div(_templateObject2(), (0, _Vroom.addStyleForMobile)("\n    order: 2;\n  "));

var Apps = _styledComponents.default.div(_templateObject3());

var Socials = _styledComponents.default.div(_templateObject4());

var VroomIcon = (0, _styledComponents.default)(_Icon.default)(_templateObject5(), primaryWhite);
var GoogleIcon = (0, _styledComponents.default)(_Icon.default)(_templateObject6());
var SocialIcon = (0, _styledComponents.default)(_Icon.default)(_templateObject7(), primaryWhite);
var SocialIconSpace = (0, _styledComponents.default)(SocialIcon)(_templateObject8());
var Message = (0, _styledComponents.default)(_Typography.Body.Small)(_templateObject9(), primaryWhite);
var Copyright = (0, _styledComponents.default)(_Typography.Fine)(_templateObject10(), primaryWhite);

var CustomA = _styledComponents.default.a(_templateObject11());

var _default = Footer;
exports.default = _default;