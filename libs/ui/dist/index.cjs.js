'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var MuiButton = _interopDefault(require('@material-ui/core/Button'));
var styles = require('@material-ui/core/styles');
var MuiContainer = _interopDefault(require('@material-ui/core/Container'));
var useMediaQuery = _interopDefault(require('@material-ui/core/useMediaQuery'));
var React = _interopDefault(require('react'));
var createMuiTheme = _interopDefault(require('@material-ui/core/styles/createMuiTheme'));
var CssBaseline = _interopDefault(require('@material-ui/core/CssBaseline'));
var Box = _interopDefault(require('@material-ui/core/Box'));

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

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var Button = styles.styled(MuiButton)(function (_ref) {
  var _ref2;

  var theme = _ref.theme;
  return _ref2 = {}, _defineProperty(_ref2, theme.breakpoints.only('xs'), {
    flexGrow: 1
  }), _defineProperty(_ref2, "minWidth", '120px'), _defineProperty(_ref2, "minHeight", '48px'), _defineProperty(_ref2, "borderRadius", 0), _defineProperty(_ref2, "boxShadow", 'none'), _defineProperty(_ref2, '&:hover', {
    boxShadow: 'none'
  }), _ref2;
});

function toVal(mix) {
  var k,
      y,
      str = '';

  if (mix) {
    if (typeof mix === 'object') {
      if (Array.isArray(mix)) {
        for (k = 0; k < mix.length; k++) {
          if (mix[k] && (y = toVal(mix[k]))) {
            str && (str += ' ');
            str += y;
          }
        }
      } else {
        for (k in mix) {
          if (mix[k] && (y = toVal(k))) {
            str && (str += ' ');
            str += y;
          }
        }
      }
    } else if (typeof mix !== 'boolean' && !mix.call) {
      str && (str += ' ');
      str += mix;
    }
  }

  return str;
}

function clsx () {
  var i = 0,
      x,
      str = '';

  while (i < arguments.length) {
    if (x = toVal(arguments[i++])) {
      str && (str += ' ');
      str += x;
    }
  }

  return str;
}

var StyledMuiContainer = styles.styled(MuiContainer)(function (_ref) {
  var _defaultPaddingTo;

  var theme = _ref.theme;
  return {
    '&.default-padding-top-and-bottom': (_defaultPaddingTo = {}, _defineProperty(_defaultPaddingTo, theme.breakpoints.between('xs', 'md'), {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3)
    }), _defineProperty(_defaultPaddingTo, theme.breakpoints.up('lg'), {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5)
    }), _defaultPaddingTo)
  };
});

var Container = function Container(_ref2) {
  var className = _ref2.className,
      children = _ref2.children,
      disableDefaultPadding = _ref2.disableDefaultPadding,
      maxWidth = _ref2.maxWidth;
  var theme = styles.useTheme();
  var smDown = useMediaQuery(theme.breakpoints.down('sm'));
  var mdUp = useMediaQuery(theme.breakpoints.up('md'));
  var defaultMaxWidth;

  if (smDown) {
    defaultMaxWidth = 'sm';
  } else if (mdUp) {
    defaultMaxWidth = 'lg';
  }

  return /*#__PURE__*/React.createElement(StyledMuiContainer, {
    className: clsx({
      'default-padding-top-and-bottom': !disableDefaultPadding
    }, className),
    disableGutters: disableDefaultPadding,
    maxWidth: maxWidth ? maxWidth : defaultMaxWidth
  }, children);
};

var _h;
var muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#EC0000',
      contrastText: '#fff'
    },
    secondary: {
      main: '#257FA4',
      contrastText: '#fff'
    },
    background: {
      paper: '#fff',
      "default": '#f1f1f1'
    },
    // Define as needed.
    // Try to assign a key as close to the actual values defined here:
    // https://material-ui.com/customization/default-theme/
    // For example, since #bebebe is super close in value to the default grey.400 (#bdbdbd), Motown used grey.400 for #bebebe.
    // grey: {
    //   // 100: '#f5f5f5',
    //   // 200: '#eaeaea',
    //   // 400: '#bebebe',
    //   500: '#999da3',
    //   // 600: '#808080',
    //   700: '#6c717a',
    //   // 900: '#333333',
    //   A100: '#d6d7da',
    // },
    text: {
      primary: '#444444',
      secondary: '#fff'
    }
  }
});

var santanderTheme = _objectSpread2(_objectSpread2({}, muiTheme), {}, {
  typography: {
    pxToRem: muiTheme.typography.pxToRem,
    fontFamily: 'SantanderText, Arial, sans-serif',
    fontSize: 14,
    fontWeightBold: 700,
    fontWeightSemibold: 600,
    fontWeightMedium: 500,
    fontWeightRegular: 400,
    fontWeightLight: 300,
    h1: (_h = {
      fontFamily: 'SantanderHeadline, Arial, sans-serif',
      fontSize: '36px'
    }, _defineProperty(_h, muiTheme.breakpoints.only('md'), {
      fontSize: '42px'
    }), _defineProperty(_h, muiTheme.breakpoints.up('lg'), {
      fontSize: '62px'
    }), _h),
    h2: _defineProperty({
      fontFamily: 'SantanderHeadline, Arial, sans-serif',
      fontSize: '22px'
    }, muiTheme.breakpoints.up('md'), {
      fontSize: '30px'
    }),
    h3: {},
    h4: {},
    h5: {},
    h6: {},
    subtitle1: {},
    subtitle2: {},
    body1: _defineProperty({
      fontFamily: 'SantanderText, Arial, sans-serif',
      fontSize: '14px'
    }, muiTheme.breakpoints.up('md'), {
      fontSize: '18px'
    }),
    body2: {},
    button: _defineProperty({
      fontFamily: 'SantanderText, Arial, sans-serif',
      fontSize: '14px'
    }, muiTheme.breakpoints.up('md'), {
      fontSize: '16px'
    }),
    caption: {},
    overline: {}
  }
});

var _h$1, _body;
var muiTheme$1 = createMuiTheme({
  palette: {
    primary: {
      main: '#e7131a',
      contrastText: '#fff'
    },
    secondary: {
      main: '#041022',
      contrastText: '#fff'
    },
    background: {
      paper: '#fff',
      "default": '#f5f5f5'
    },
    // Define as needed.
    // Try to assign a key as close to the actual values defined here:
    // https://material-ui.com/customization/default-theme/
    // For example, since #bebebe is super close in value to the default grey.400 (#bdbdbd), Motown used grey.400 for #bebebe.
    grey: {
      // 100: '#f5f5f5',
      // 200: '#eaeaea',
      // 400: '#bebebe',
      500: '#999da3',
      // 600: '#808080',
      700: '#6c717a',
      // 900: '#333333',
      A100: '#d6d7da'
    },
    text: {
      primary: '#041022',
      secondary: '#fff'
    }
  }
});

var vroomTheme = _objectSpread2(_objectSpread2({}, muiTheme$1), {}, {
  typography: {
    pxToRem: muiTheme$1.typography.pxToRem,
    fontFamily: 'Calibre, Arial, sans-serif',
    fontSize: 16,
    fontWeightBold: 700,
    fontWeightSemibold: 600,
    fontWeightMedium: 500,
    fontWeightRegular: 400,
    fontWeightLight: 300,
    h1: (_h$1 = {
      fontFamily: 'VroomSans, serif',
      fontSize: '36px'
    }, _defineProperty(_h$1, muiTheme$1.breakpoints.only('md'), {
      fontSize: '42px'
    }), _defineProperty(_h$1, muiTheme$1.breakpoints.up('lg'), {
      fontSize: '62px'
    }), _h$1),
    h2: _defineProperty({
      fontFamily: 'VroomSans, serif',
      fontSize: '36px'
    }, muiTheme$1.breakpoints.up('md'), {
      fontSize: '42px'
    }),
    h3: {},
    h4: {},
    h5: {},
    h6: {},
    subtitle1: {},
    subtitle2: {},
    body1: (_body = {
      fontFamily: 'Calibre, Arial, sans-serif',
      fontSize: '16px'
    }, _defineProperty(_body, muiTheme$1.breakpoints.only('md'), {
      fontSize: '18px'
    }), _defineProperty(_body, muiTheme$1.breakpoints.up('lg'), {
      fontSize: '20px'
    }), _body),
    body2: {},
    button: {
      fontFamily: 'Calibre, Arial, sans-serif',
      fontSize: '16px',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '1.75px'
    },
    caption: {
      fontFamily: 'Calibre, Arial, sans-serif',
      fontSize: '14px'
    },
    overline: {}
  }
});

(function (Brand) {
  Brand["VROOM"] = "vroom";
  Brand["SANTANDER"] = "santander";
})(exports.Brand || (exports.Brand = {}));

var getThemeForBrand = function getThemeForBrand(brand) {
  if (brand === exports.Brand.SANTANDER) {
    return santanderTheme;
  }

  return vroomTheme;
};

var ThemeProvider = function ThemeProvider(_ref) {
  var _ref$brand = _ref.brand,
      brand = _ref$brand === void 0 ? exports.Brand.VROOM : _ref$brand,
      children = _ref.children;
  var theme = getThemeForBrand(brand);
  return /*#__PURE__*/React.createElement(styles.ThemeProvider, {
    theme: theme
  }, /*#__PURE__*/React.createElement(CssBaseline, null), children);
};

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

var useStyles = styles.makeStyles(function (theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      margin: 0
    },

    /* Styles applied to the root element if `variant="h1"`. */
    h1: theme.typography.h1,

    /* Styles applied to the root element if `variant="h2"`. */
    h2: theme.typography.h2,

    /* Styles applied to the root element if `variant="body1"`. */
    body1: theme.typography.body1,

    /* Styles applied to the root element if `variant="button"`. */
    button: theme.typography.button,

    /* Styles applied to the root element if `variant="caption"`. */
    caption: theme.typography.caption,

    /* Styles applied to the root element if `variant="srOnly"`. Only accessible to screen readers. */
    srOnly: {
      position: 'absolute',
      height: 1,
      width: 1,
      overflow: 'hidden'
    },

    /* Styles applied to the root element if `whiteSpace="nowrap"`. */
    whiteSpaceNowrap: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },

    /* Styles applied to the root element if `whiteSpace="pre"`. */
    whiteSpacePre: {
      whiteSpace: 'pre'
    },

    /* Styles applied to the root element if `whiteSpace="preline"`. */
    whiteSpacePreline: {
      whiteSpace: 'pre-line'
    },

    /* Styles applied to the root element if `whiteSpace="prewrap"`. */
    whiteSpacePrewrap: {
      whiteSpace: 'pre-wrap'
    }
  };
});
var defaultVariantToTagMapping = {
  h1: 'h1',
  h2: 'h2',
  body1: 'p',
  button: 'span',
  caption: 'span',
  srOnly: 'span'
};

var Typography = function Typography(props) {
  var _clsx;

  var children = props.children,
      className = props.className,
      color = props.color,
      component = props.component,
      display = props.display,
      fontStyle = props.fontStyle,
      _props$fontWeight = props.fontWeight,
      fontWeight = _props$fontWeight === void 0 ? 400 : _props$fontWeight,
      _props$letterSpacing = props.letterSpacing,
      letterSpacing = _props$letterSpacing === void 0 ? 'normal' : _props$letterSpacing,
      _props$lineHeight = props.lineHeight,
      lineHeight = _props$lineHeight === void 0 ? 1 : _props$lineHeight,
      onClick = props.onClick,
      textAlign = props.textAlign,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'body1' : _props$variant,
      _props$whiteSpace = props.whiteSpace,
      whiteSpace = _props$whiteSpace === void 0 ? 'inherit' : _props$whiteSpace;
  var Component = component || defaultVariantToTagMapping[variant] || 'span';
  var classes = useStyles();
  return /*#__PURE__*/React.createElement(Box, {
    className: clsx(classes.root, (_clsx = {}, _defineProperty(_clsx, classes[variant], variant !== 'inherit'), _defineProperty(_clsx, classes["whiteSpace".concat(capitalize(whiteSpace))], whiteSpace !== 'inherit'), _clsx), className),
    color: color,
    component: Component,
    display: display,
    fontStyle: fontStyle,
    fontWeight: fontWeight,
    letterSpacing: letterSpacing,
    lineHeight: lineHeight,
    onClick: onClick,
    textAlign: textAlign
  }, children);
};

// TODO: update this to the actual Santander favicons

var SantanderFaviconSnippet = function SantanderFaviconSnippet(_ref) {
  var hostUrl = _ref.hostUrl,
      theme = _ref.theme;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("link", {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "".concat(hostUrl, "/apple-touch-icon.png")
  }), /*#__PURE__*/React.createElement("link", {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "".concat(hostUrl, "/favicon-32x32.png")
  }), /*#__PURE__*/React.createElement("link", {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "".concat(hostUrl, "/favicon-16x16.png")
  }), /*#__PURE__*/React.createElement("link", {
    rel: "manifest",
    href: "".concat(hostUrl, "/site.webmanifest")
  }), /*#__PURE__*/React.createElement("link", {
    rel: "mask-icon",
    href: "".concat(hostUrl, "/safari-pinned-tab.svg"),
    color: theme.palette.primary.main
  }), /*#__PURE__*/React.createElement("meta", {
    name: "msapplication-TileColor",
    content: theme.palette.primary.main
  }), /*#__PURE__*/React.createElement("meta", {
    name: "theme-color",
    content: theme.palette.primary.main
  }));
};

// TODO: update this to the actual Santander fonts

var SantanderFontsSnippet = function SantanderFontsSnippet(_ref) {
  var hostUrl = _ref.hostUrl;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("link", {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/icon?family=Material+Icons"
  }), /*#__PURE__*/React.createElement("style", {
    dangerouslySetInnerHTML: {
      __html: "\n            @font-face {\n              font-family: 'SantanderHeadline';\n              src: url('".concat(hostUrl, "/fonts/SantanderHeadline-Regular.ttf') format('truetype');\n            }\n            @font-face {\n              font-family: 'SantanderHeadline';\n              font-weight: 700\n              src: url('").concat(hostUrl, "/fonts/SantanderHeadline-Bold.ttf') format('truetype');\n            }\n            @font-face {\n              font-family: 'SantanderText';\n              src: url('").concat(hostUrl, "/fonts/SantanderText-Regular.ttf') format('truetype');\n            }\n            @font-face {\n              font-family: 'SantanderText';\n              font-weight: 700\n              src: url('").concat(hostUrl, "/fonts/SantanderText-Bold.ttf') format('truetype');\n            }\n          ")
    }
  }));
};

var VroomFaviconSnippet = function VroomFaviconSnippet(_ref) {
  var hostUrl = _ref.hostUrl,
      theme = _ref.theme;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("link", {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "".concat(hostUrl, "/apple-touch-icon.png")
  }), /*#__PURE__*/React.createElement("link", {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "".concat(hostUrl, "/favicon-32x32.png")
  }), /*#__PURE__*/React.createElement("link", {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "".concat(hostUrl, "/favicon-16x16.png")
  }), /*#__PURE__*/React.createElement("link", {
    rel: "manifest",
    href: "".concat(hostUrl, "/site.webmanifest")
  }), /*#__PURE__*/React.createElement("link", {
    rel: "mask-icon",
    href: "".concat(hostUrl, "/safari-pinned-tab.svg"),
    color: theme.palette.primary.main
  }), /*#__PURE__*/React.createElement("meta", {
    name: "msapplication-TileColor",
    content: theme.palette.primary.main
  }), /*#__PURE__*/React.createElement("meta", {
    name: "theme-color",
    content: theme.palette.primary.main
  }));
};

var VroomFontsSnippet = function VroomFontsSnippet(_ref) {
  var hostUrl = _ref.hostUrl;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("link", {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/icon?family=Material+Icons"
  }), /*#__PURE__*/React.createElement("style", {
    dangerouslySetInnerHTML: {
      __html: "\n            @font-face {\n              font-family: 'VroomSans';\n              src: url('".concat(hostUrl, "/fonts/VroomSansSMALL-ExtraBoldItalicWEB.woff') format('woff');\n            }\n            @font-face {\n              font-family: Calibre;\n              font-weight: 400;\n              src: url('").concat(hostUrl, "/fonts/CalibreWeb-Regular.woff') format('woff');\n            }\n            @font-face {\n              font-family: Calibre;\n              font-weight: 500;\n              src: url('").concat(hostUrl, "/fonts/CalibreWeb-Semibold.woff') format('woff');\n            }\n            @font-face {\n              font-family: 'Calibre';\n              font-weight: 600;\n              src: url('").concat(hostUrl, "/fonts/CalibreWeb-Semibold.woff') format('woff');\n            }\n          ")
    }
  }));
};

var UISnippet = function UISnippet(_ref) {
  var _ref$brand = _ref.brand,
      brand = _ref$brand === void 0 ? exports.Brand.VROOM : _ref$brand,
      hostUrl = _ref.hostUrl;
  var theme = getThemeForBrand(brand);

  if (brand === exports.Brand.SANTANDER) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SantanderFaviconSnippet, {
      hostUrl: hostUrl,
      theme: theme
    }), /*#__PURE__*/React.createElement(SantanderFontsSnippet, {
      hostUrl: hostUrl
    }));
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(VroomFaviconSnippet, {
    hostUrl: hostUrl,
    theme: theme
  }), /*#__PURE__*/React.createElement(VroomFontsSnippet, {
    hostUrl: hostUrl
  }));
};

exports.Button = Button;
exports.Container = Container;
exports.ThemeProvider = ThemeProvider;
exports.Typography = Typography;
exports.UISnippet = UISnippet;
exports.getThemeForBrand = getThemeForBrand;
exports.santanderTheme = santanderTheme;
exports.vroomTheme = vroomTheme;
