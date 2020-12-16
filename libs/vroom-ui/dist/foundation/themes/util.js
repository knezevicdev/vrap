"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addOpacityToHex = void 0;

/* Adding opacity for hex https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4 */
var opacityMap = {
  0: '00',
  10: '1A',
  20: '33',
  30: '4D',
  40: '66',
  50: '80',
  60: '99',
  70: 'B3',
  80: 'CC',
  90: 'E6',
  100: 'FF'
};

var addOpacityToHex = (hex, opacity) => {
  switch (opacity) {
    case 0:
      {
        return "".concat(hex).concat(opacityMap['0']);
      }

    case 10:
      {
        return "".concat(hex).concat(opacityMap['10']);
      }

    case 20:
      {
        return "".concat(hex).concat(opacityMap['20']);
      }

    case 30:
      {
        return "".concat(hex).concat(opacityMap['30']);
      }

    case 40:
      {
        return "".concat(hex).concat(opacityMap['40']);
      }

    case 50:
      {
        return "".concat(hex).concat(opacityMap['50']);
      }

    case 60:
      {
        return "".concat(hex).concat(opacityMap['60']);
      }

    case 70:
      {
        return "".concat(hex).concat(opacityMap['70']);
      }

    case 80:
      {
        return "".concat(hex).concat(opacityMap['80']);
      }

    case 90:
      {
        return "".concat(hex).concat(opacityMap['90']);
      }

    case 100:
      {
        return "".concat(hex).concat(opacityMap['100']);
      }

    default:
      {
        return hex;
      }
  }
};

exports.addOpacityToHex = addOpacityToHex;