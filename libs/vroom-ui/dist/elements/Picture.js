"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Picture = void 0;

var _reactIntersectionObserver = _interopRequireDefault(require("@researchgate/react-intersection-observer"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: ", ";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: ", ";\n  object-position: ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  position: relative;\n  overflow: hidden;\n  width: ", ";\n  height: 0;\n  padding-bottom: ", ";\n\n  @keyframes shimmer {\n    0% {\n      background-position: -1000px 0;\n    }\n    100% {\n      background-position: 1000px 0;\n    }\n  }\n\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Pic = _styledComponents.default.picture(_templateObject(), props => props.width, props => props.height, props => props.isLoading && "\n      animation: shimmer 2s infinite;\n      background: linear-gradient(235deg, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%);\n      background-size: 1000px 100%;\n    ");

var Img = _styledComponents.default.img(_templateObject2(), props => props.loaded ? 'flex' : 'none', props => props.objectFit ? props.objectFit : undefined, props => props.objectPosition ? props.objectPosition : undefined);

var isWidthHeight = props => {
  return props.width !== undefined && props.height !== undefined;
};

class Picture extends _react.default.Component {
  // 0.5 -> "50%",
  floatToPercent(fraction) {
    // Limit the fraction to the range 0-1.
    var clampedFraction = Math.min(Math.max(fraction, 0), 1);
    var percent = Math.round(clampedFraction * 1e4) / 1e2;
    return "".concat(percent, "%");
  } // "50%" -> 0.5


  percentToFloat(percent) {
    var percentFloat = parseFloat(percent);

    if (isNaN(percentFloat)) {
      console.error('Picture could not convert invalid percent string to float');
      return 0;
    }

    return percentFloat / 100.0;
  }

  getHeightFromWidthAndAspectRatio(width, aspectRatio) {
    if (!this.aspectRatioRegex.test(aspectRatio)) {
      console.error('Picture using invalid aspect ratio format. Please use the format <number>:<number>, e.g. 4:3');
    }

    var aspectRatioTokens = aspectRatio.split(':');
    var aspectRatioWidthInt = parseInt(aspectRatioTokens[0]);
    var aspectRatioHeightInt = parseInt(aspectRatioTokens[1]);
    var aspectRatioValue = aspectRatioHeightInt / aspectRatioWidthInt;
    var widthIsPercent = width.includes('%');

    if (widthIsPercent) {
      // Be advised, height percentage is based on the PARENT'S width.
      // This is why additional computation is needed here.
      // https://css-tricks.com/oh-hey-padding-percentage-is-based-on-the-parent-elements-width/
      var widthFloat = this.percentToFloat(width);
      return this.floatToPercent(widthFloat * aspectRatioValue);
    }

    var widthIsAuto = width === 'auto';

    if (widthIsAuto) {
      return this.floatToPercent(aspectRatioValue);
    }

    var units = width.split(/[0-9]+/g).pop();
    var widthInt = parseInt(width, 10);

    if (isNaN(widthInt)) {
      console.error('Picture could not convert invalid width to int');
      return 'auto';
    }

    var heightInt = Math.round(widthInt * aspectRatioValue);
    return "".concat(heightInt).concat(units);
  }

  constructor(props) {
    super(props);

    _defineProperty(this, "aspectRatioRegex", new RegExp('^\\d+:\\d+$'));

    _defineProperty(this, "onlyDigitsRegex", new RegExp('^\\d+$'));

    _defineProperty(this, "handleObserverChange", entry => {
      if (entry.isIntersecting) {
        this.setState({
          intersecting: true
        });
      }
    });

    _defineProperty(this, "handleImageLoad", () => {
      this.setState({
        loaded: true
      });
    });

    this.state = {
      intersecting: false,
      loaded: false
    };
  }

  render() {
    var {
      alt,
      objectFit,
      objectPosition,
      onClick,
      src,
      width
    } = this.props;
    var loading = this.state.intersecting && !this.state.loaded;
    var sanitizedWidth = this.onlyDigitsRegex.test(width) ? "".concat(width, "px") : width;
    var height = isWidthHeight(this.props) ? this.props.height : this.getHeightFromWidthAndAspectRatio(width, this.props.aspectRatio);
    var sanitizedHeight = this.onlyDigitsRegex.test(height) ? "".concat(height, "px") : height;
    return /*#__PURE__*/_react.default.createElement(_reactIntersectionObserver.default, {
      disabled: this.state.intersecting,
      onChange: this.handleObserverChange
    }, /*#__PURE__*/_react.default.createElement(Pic, {
      isLoading: loading,
      onClick: onClick,
      width: sanitizedWidth,
      height: sanitizedHeight
    }, /*#__PURE__*/_react.default.createElement(Img, {
      alt: alt // TODO: use loading="lazy" when it's supported by safari, instead of intersection observer.
      ,
      objectFit: objectFit,
      objectPosition: objectPosition,
      onLoad: this.handleImageLoad,
      loaded: this.state.loaded,
      src: this.state.intersecting ? src : undefined
    })));
  }

}

exports.Picture = Picture;