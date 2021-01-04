"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MobileLinks = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Vroom = require("../../../../foundation/themes/Vroom");

var _Typography = require("../../../../foundation/Typography");

var _Icon = _interopRequireWildcard(require("../../../Icon/Icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n  margin-bottom: 8px;\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  display: ", ";\n  flex-direction: column;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  transform: rotate(", ");\n  transition: transform 250ms;\n  fill: ", ";\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  width: max-content;\n  :hover {\n    text-decoration-color: ", ";\n  }\n  ", "\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n  margin: 16px 0;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  cursor: pointer;\n\n  ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  order: 1;\n  margin-bottom: 16px;\n\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var MobileLinks = (_ref) => {
  var {
    sections
  } = _ref;
  var [visibleSection, setVisibleSection] = (0, _react.useState)('');

  var onClick = title => () => {
    var section = title === visibleSection ? '' : title;
    setVisibleSection(section);
  };

  return /*#__PURE__*/_react.default.createElement(Links, null, sections.map(section => {
    var {
      title,
      links
    } = section;
    var visible = visibleSection === title;
    return /*#__PURE__*/_react.default.createElement(SectionContainer, {
      key: title,
      onClick: onClick(title),
      visible: visible
    }, /*#__PURE__*/_react.default.createElement(TitleContainer, null, /*#__PURE__*/_react.default.createElement(Title, {
      bold: true
    }, title), /*#__PURE__*/_react.default.createElement(Arrow, {
      visible: visible,
      icon: _Icon.Icons.CHEVRON_DOWN
    })), /*#__PURE__*/_react.default.createElement(LinksContainer, {
      visible: visible
    }, links.map(link => {
      var {
        href,
        name
      } = link;
      return /*#__PURE__*/_react.default.createElement(CustomLink, {
        key: href,
        href: href,
        visible: visible
      }, /*#__PURE__*/_react.default.createElement(LinkText, null, name));
    })));
  }));
};

exports.MobileLinks = MobileLinks;

var primaryBrand = props => props.theme.colors.primary.brand;

var primaryWhite = props => props.theme.colors.primary.white;

var Links = _styledComponents.default.div(_templateObject(), (0, _Vroom.addStyleForDesktop)("\n     display: none;\n  "));

var SectionContainer = _styledComponents.default.div(_templateObject2(), props => !props.visible ? "border-bottom: solid 1px ".concat(primaryWhite(props), ";") : undefined);

var TitleContainer = _styledComponents.default.div(_templateObject3());

var Title = (0, _styledComponents.default)(_Typography.Body.Regular)(_templateObject4(), primaryWhite);
var CustomLink = (0, _styledComponents.default)(_Typography.Link)(_templateObject5(), primaryBrand, props => props.visible ? "\n        :last-child {\n           border-bottom: solid 1px ".concat(primaryWhite(props), ";\n           padding-bottom: 8px;\n           width: 100%;\n         }\n        ") : undefined);
var Arrow = (0, _styledComponents.default)(_Icon.default)(_templateObject6(), props => props.visible ? '180deg' : '0deg', primaryWhite);

var LinksContainer = _styledComponents.default.div(_templateObject7(), props => props.visible ? 'flex' : 'none');

var LinkText = (0, _styledComponents.default)(_Typography.Body.Small)(_templateObject8(), primaryWhite);