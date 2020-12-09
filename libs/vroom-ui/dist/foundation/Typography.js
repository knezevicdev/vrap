"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Link = exports.Fine = exports.Body = exports.Title = exports.Heading = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _Vroom = require("./themes/Vroom");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject14() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  font-size: 18px;\n  line-height: 24px;\n  text-decoration: underline;\n"]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  font-size: 10px;\n  line-height: 16px;\n  ", "\n"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  font-size: 14px;\n  line-height: 20px;\n  ", "\n"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  font-size: 18px;\n  line-height: 24px;\n  ", "\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  font-size: 20px;\n  line-height: 32px;\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  font-size: 24px;\n  line-height: 32px;\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  font-size: 28px;\n  line-height: 32px;\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  font-size: 30px;\n  line-height: 40px;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  font-size: 36px;\n  line-height: 40px;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  font-size: 42px;\n  line-height: 64px;\n\n  ", "\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  font-size: 62px;\n  line-height: 72px;\n\n  ", "\n\n  ", "\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  font-family: ", ";\n  font-weight: normal;\n  letter-spacing: 0.25px;\n  color: ", ";\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  font-family: ", ";\n  font-weight: 600;\n  letter-spacing: 0.25px;\n  color: ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  margin: 0;\n  font-family: ", ";\n  font-weight: normal;\n  letter-spacing: 1px;\n  color: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var headingFamily = (_ref) => {
  var {
    theme: {
      typography
    }
  } = _ref;
  return typography.family.heading;
};

var titleFamily = (_ref2) => {
  var {
    theme: {
      typography
    }
  } = _ref2;
  return typography.family.title;
};

var bodyFamily = (_ref3) => {
  var {
    theme: {
      typography
    }
  } = _ref3;
  return typography.family.body;
};

var color = (_ref4) => {
  var {
    theme: {
      typography
    }
  } = _ref4;
  return typography.color;
};

var headingBase = (0, _styledComponents.css)(_templateObject(), headingFamily, color);
var titleBase = (0, _styledComponents.css)(_templateObject2(), titleFamily, color);
var bodyBase = (0, _styledComponents.css)(_templateObject3(), bodyFamily, color);

var Heading1 = _styledComponents.default.h1(_templateObject4(), headingBase, (0, _Vroom.addStyleForTablet)("\n    font-size: 42px;\n    line-height: 64px;\n  "), (0, _Vroom.addStyleForMobile)("\n    font-size: 36px;\n    line-height: 40px;\n  "));

var Heading2 = _styledComponents.default.h2(_templateObject5(), headingBase, (0, _Vroom.addStyleForMobile)("\n    font-size: 36px;\n    line-height: 40px;\n  "));

var Heading3 = _styledComponents.default.h3(_templateObject6(), headingBase);

var Heading4 = _styledComponents.default.h4(_templateObject7(), headingBase);

var Title1 = _styledComponents.default.span(_templateObject8(), titleBase);

var Title2 = _styledComponents.default.span(_templateObject9(), titleBase);

var Title3 = _styledComponents.default.span(_templateObject10(), titleBase);

var BodyRegular = _styledComponents.default.span(_templateObject11(), bodyBase, (_ref5) => {
  var {
    bold
  } = _ref5;
  return bold && 'font-weight: 600;';
});

var BodySmall = _styledComponents.default.span(_templateObject12(), bodyBase, (_ref6) => {
  var {
    bold
  } = _ref6;
  return bold && 'font-weight: 600;';
});

var Heading = {
  One: Heading1,
  Two: Heading2,
  Three: Heading3,
  Four: Heading4
};
exports.Heading = Heading;
var Title = {
  One: Title1,
  Two: Title2,
  Three: Title3
};
exports.Title = Title;
var Body = {
  Regular: BodyRegular,
  Small: BodySmall
};
exports.Body = Body;

var Fine = _styledComponents.default.span(_templateObject13(), bodyBase, (_ref7) => {
  var {
    bold
  } = _ref7;
  return bold && 'font-weight: 600;';
});

exports.Fine = Fine;

var A = _styledComponents.default.a(_templateObject14(), bodyBase);

var Link = (_ref8) => {
  var {
    className,
    children,
    href,
    blank
  } = _ref8;
  var target = blank && '_blank' || undefined;
  return /*#__PURE__*/_react.default.createElement(A, {
    className: className,
    href: href,
    target: target
  }, children);
};

exports.Link = Link;
var Typography = {
  Heading,
  Title,
  Body,
  Fine,
  Link
};
var _default = Typography;
exports.default = _default;