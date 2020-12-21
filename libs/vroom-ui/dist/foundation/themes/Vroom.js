"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlobalStyle = exports.addStyleForDesktop = exports.addStyleForTablet = exports.addStyleForMobile = exports.getVroomTheme = void 0;

var _styledComponents = require("styled-components");

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  html {\n    height: 100%;\n  }\n  \n  body {\n    margin: 0;\n    height: 100%;\n  }\n  \n  @font-face {\n    font-family: Calibre;\n    font-weight: normal;\n    src: url(assets/fonts/Vroom/Calibre-Regular.woff2) format('woff2');\n    font-display: swap;\n  }\n  @font-face {\n    font-family: Calibre;\n    font-weight: 600;\n    src: url(assets/fonts/Vroom/Calibre-Semibold.woff2) format('woff2');\n    font-display: swap;\n  }\n  @font-face {\n    font-family: Vroom Sans;\n    font-weight: normal;\n    src: url(assets/fonts/Vroom/Vroom-Sans.woff2) format('woff2');\n    font-display: swap;\n  }\n  \n  #__next {\n    height: 100%;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n    @media (min-width: 960px) {\n      ", "\n    }\n  "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    @media (min-width: 600px) and (max-width: 959px) {\n      ", "\n    }\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    @media (max-width: 599px) {\n      ", "\n    }\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var getVroomTheme = () => {
  return {
    typography: {
      family: {
        heading: 'Vroom Sans',
        title: 'Calibre',
        body: 'Calibre'
      },
      color: '#041022'
    },
    colors: {
      primary: {
        brand: '#E7131A',
        black: '#041022',
        white: '#FFFFFF'
      },
      secondary: {
        brand: '#1960D0',
        success: '#308406',
        error: '#F26900',
        warning: '#FFD400'
      },
      gray: {
        one: '#6C717A',
        two: '#999DA3',
        three: '#D6D7DA',
        four: '#F5F5F5'
      }
    }
  };
};

exports.getVroomTheme = getVroomTheme;

var addStyleForMobile = injectedCss => {
  return (0, _styledComponents.css)(_templateObject(), injectedCss);
};

exports.addStyleForMobile = addStyleForMobile;

var addStyleForTablet = injectedCss => {
  return (0, _styledComponents.css)(_templateObject2(), injectedCss);
};

exports.addStyleForTablet = addStyleForTablet;

var addStyleForDesktop = injectedCss => {
  return (0, _styledComponents.css)(_templateObject3(), injectedCss);
};

exports.addStyleForDesktop = addStyleForDesktop;
var GlobalStyle = (0, _styledComponents.createGlobalStyle)(_templateObject4());
exports.GlobalStyle = GlobalStyle;