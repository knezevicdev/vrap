"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _util = require("../foundation/themes/util");

var _Typography = require("../foundation/Typography");

var _Icon = _interopRequireWildcard(require("./Icon/Icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n  margin-top: 4px;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  color: ", ";\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n  height: 0px;\n  border-top: solid 1px ", ";\n  margin: 0px 16px;\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  z-index: 1;\n  height: 10px;\n  background: ", ";\n  border-left: 1px solid\n    ", ";\n  border-right: 1px solid\n    ", ";\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  cursor: pointer;\n  padding: 8px 16px;\n  ", "\n  :hover {\n    background: ", ";\n  }\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  display: ", ";\n  flex-direction: column;\n  background: ", ";\n  max-height: 500px;\n  overflow-y: scroll;\n  position: absolute;\n  top: 72px;\n  left: 0px;\n  right: 0px;\n  border: 1px solid\n    ", ";\n  border-top: none;\n  padding-top: 8px;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  margin-left: auto;\n  margin-right: 16px;\n  min-width: 16px;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  transform: rotate(", ");\n  transition: transform 250ms;\n  ", "\n  ", "\n  margin-right: 16px;\n  min-width: 12px;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  padding-right: 8px;\n  user-select: none;\n  line-height: 24px;\n  margin-left: 16px;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  padding: 11px 0px;\n  cursor: ", ";\n  margin-top: 4px;\n  border: 1px solid\n    ", ";\n\n  ", "\n  ", "\n  outline: none;\n\n  ", "\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  width: 256px;\n  background: ", ";\n  position: relative;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Dropdown = props => {
  var {
    label: dropdownLabel,
    options,
    onSelectCallback,
    placeholder,
    className,
    error,
    disabled
  } = props;
  var [open, setOpen] = (0, _react.useState)(false);
  var [label, setLabel] = (0, _react.useState)(undefined);
  var [labelPosition, setLabelPosition] = (0, _react.useState)(undefined);
  var actualLabel = label ? label : placeholder;
  var isShowingPlaceholder = label === undefined;
  var showError = error && error !== '' || false;

  var onValueClick = () => {
    setOpen(!open);
  };

  var setSelection = (value, label) => {
    setOpen(false);
    setLabel(label);
    onSelectCallback(value, label);
  };

  var onSelectClick = (value, label) => () => {
    setSelection(value, label);
  };

  var onKeyDown = e => {
    var key = e.key;
    var menuIsClosed = !open;
    var menuIsOpen = open;

    switch (key) {
      case 'ArrowRight':
        {
          if (menuIsClosed) {
            if (labelPosition === undefined) {
              var {
                value: _value,
                label: _label
              } = options[0];
              setSelection(_value, _label);
              setLabelPosition(0);
            } else {
              var isNotAtTheEnd = labelPosition !== options.length - 1;

              if (isNotAtTheEnd) {
                var newPosition = labelPosition + 1;
                var {
                  value: _value2,
                  label: _label2
                } = options[newPosition];
                setSelection(_value2, _label2);
                setLabelPosition(newPosition);
              }
            }
          }

          break;
        }

      case 'ArrowLeft':
        {
          if (menuIsClosed && labelPosition !== undefined) {
            var isNotAtTheStart = labelPosition !== 0;

            if (isNotAtTheStart) {
              var _newPosition = labelPosition - 1;

              var {
                value: _value3,
                label: _label3
              } = options[_newPosition];
              setSelection(_value3, _label3);
              setLabelPosition(_newPosition);
            }
          }

          break;
        }

      case 'ArrowDown':
        {
          if (menuIsOpen) {
            var _isNotAtTheEnd = labelPosition !== options.length - 1;

            if (labelPosition === undefined) {
              setLabelPosition(0);
            } else if (_isNotAtTheEnd) {
              setLabelPosition(labelPosition + 1);
            }
          } else if (menuIsClosed) {
            setOpen(true);
          }

          break;
        }

      case 'ArrowUp':
        {
          if (menuIsOpen) {
            var _isNotAtTheStart = labelPosition !== 0;

            if (labelPosition === undefined) {
              setLabelPosition(0);
            } else if (_isNotAtTheStart) {
              setLabelPosition(labelPosition - 1);
            }
          } else if (menuIsClosed) {
            setOpen(true);
          }

          break;
        }

      case 'Tab':
      case 'Enter':
        {
          if (menuIsOpen) {
            if (labelPosition !== undefined) {
              var {
                value: _value4,
                label: _label4
              } = options[labelPosition];
              setSelection(_value4, _label4);
            }
          }

          break;
        }

      default:
        break;
    }
  };

  return /*#__PURE__*/_react.default.createElement(Container, {
    className: className
  }, /*#__PURE__*/_react.default.createElement(_Typography.Body.Small, null, dropdownLabel), /*#__PURE__*/_react.default.createElement(LabelContainer, {
    onClick: disabled ? undefined : onValueClick,
    open: open,
    disabled: disabled,
    showError: showError,
    tabIndex: 0,
    onKeyDown: disabled ? undefined : onKeyDown
  }, /*#__PURE__*/_react.default.createElement(Label, {
    isShowingPlaceholder: isShowingPlaceholder
  }, actualLabel), showError && /*#__PURE__*/_react.default.createElement(ErrorIcon, {
    icon: _Icon.Icons.FEEDBACK_ERROR
  }), /*#__PURE__*/_react.default.createElement(Arrow, {
    disabled: disabled,
    open: open,
    showError: showError,
    icon: _Icon.Icons.CHEVRON_DOWN
  })), showError && !open && /*#__PURE__*/_react.default.createElement(Error, null, error), open && /*#__PURE__*/_react.default.createElement(Divider, {
    showError: showError
  }, /*#__PURE__*/_react.default.createElement(DividerBorder, null)), /*#__PURE__*/_react.default.createElement(Menu, {
    open: open,
    showError: showError
  }, options.map((option, index) => {
    var {
      value,
      label
    } = option;
    var manualHover = index === labelPosition;
    return /*#__PURE__*/_react.default.createElement(Option, {
      key: value,
      onClick: onSelectClick(value, label),
      manualHover: manualHover
    }, label);
  })));
};

Dropdown.defaultProps = {
  placeholder: 'Placeholder'
};
var _default = Dropdown;
exports.default = _default;

var primaryWhite = props => props.theme.colors.primary.white;

var primaryBlack = props => props.theme.colors.primary.black;

var grayTwo = props => props.theme.colors.gray.two;

var grayFour = props => props.theme.colors.gray.four;

var secondaryBrand = props => props.theme.colors.secondary.brand;

var secondaryError = props => props.theme.colors.secondary.error;

var Container = _styledComponents.default.div(_templateObject(), primaryWhite);

var LabelContainer = _styledComponents.default.div(_templateObject2(), props => props.disabled ? 'default' : 'pointer', props => props.showError ? secondaryError(props) : grayTwo(props), props => props.disabled && "\n    background: ".concat(grayFour(props), ";\n  "), props => props.open && "border-bottom: none; ", props => !props.disabled && "\n      :focus {\n        outline: 4px solid ".concat((0, _util.addOpacityToHex)(secondaryBrand(props), 20), ";\n      }\n  "));

var Label = (0, _styledComponents.default)(_Typography.Body.Regular)(_templateObject3(), props => props.isShowingPlaceholder ? grayTwo(props) : primaryBlack(props));
var Arrow = (0, _styledComponents.default)(_Icon.default)(_templateObject4(), props => props.open ? '180deg' : '0deg', props => !props.showError && 'margin-left: auto;', props => props.disabled && "fill: ".concat(grayTwo(props), ";"));
var ErrorIcon = (0, _styledComponents.default)(_Icon.default)(_templateObject5());

var Menu = _styledComponents.default.div(_templateObject6(), props => props.open ? 'flex' : 'none', primaryWhite, props => props.showError ? secondaryError(props) : grayTwo(props));

var Option = (0, _styledComponents.default)(_Typography.Body.Regular)(_templateObject7(), props => props.manualHover && "background: ".concat(grayFour(props), ";"), grayFour);

var Divider = _styledComponents.default.div(_templateObject8(), primaryWhite, props => props.showError ? secondaryError(props) : grayTwo(props), props => props.showError ? secondaryError(props) : grayTwo(props));

var DividerBorder = _styledComponents.default.div(_templateObject9(), grayFour);

var Error = (0, _styledComponents.default)(_Typography.Fine)(_templateObject10(), secondaryError);