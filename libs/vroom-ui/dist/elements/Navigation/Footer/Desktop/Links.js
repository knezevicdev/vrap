"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DesktopLinks = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Vroom = require("../../../../foundation/themes/Vroom");

var _Typography = require("../../../../foundation/Typography");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n  margin-bottom: 8px;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  :hover {\n    text-decoration-color: ", ";\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n  margin-bottom: 8px;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  width: 25%;\n  :not(:last-child) {\n    padding-right: 16px;\n\n    ", "\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  margin-left: auto;\n  padding-left: 16px;\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var primaryBrand = props => props.theme.colors.primary.brand;

var grayThree = props => props.theme.colors.gray.three;

var primaryWhite = props => props.theme.colors.primary.white;

var Links = _styledComponents.default.div(_templateObject(), (0, _Vroom.addStyleForMobile)("\n    display: none;\n  "));

var SectionDiv = _styledComponents.default.div(_templateObject2(), (0, _Vroom.addStyleForTablet)("\n      padding-right: 32px;\n    "));

var Title = (0, _styledComponents.default)(_Typography.Body.Regular)(_templateObject3(), grayThree);
var CustomLink = (0, _styledComponents.default)(_Typography.Link)(_templateObject4(), primaryBrand);
var LinkText = (0, _styledComponents.default)(_Typography.Body.Small)(_templateObject5(), primaryWhite);

var DesktopLinks = (_ref) => {
  var {
    sections
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(Links, null, sections.map(section => {
    var {
      title,
      links
    } = section;
    return /*#__PURE__*/_react.default.createElement(SectionDiv, {
      key: title
    }, /*#__PURE__*/_react.default.createElement(Title, {
      bold: true
    }, title), links.map(link => {
      var {
        href,
        name
      } = link;
      return /*#__PURE__*/_react.default.createElement(CustomLink, {
        key: href,
        href: href
      }, /*#__PURE__*/_react.default.createElement(LinkText, null, name));
    }));
  }));
};

exports.DesktopLinks = DesktopLinks;