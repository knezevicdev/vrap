/* Adding opacity for hex https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4 */
const opacityMap = {
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
  100: 'FF',
};

export const addOpacityToHex = (hex: string, opacity: number): string => {
  switch (opacity) {
    case 0: {
      return `${hex}${opacityMap['0']}`;
    }
    case 10: {
      return `${hex}${opacityMap['10']}`;
    }
    case 20: {
      return `${hex}${opacityMap['20']}`;
    }
    case 30: {
      return `${hex}${opacityMap['30']}`;
    }
    case 40: {
      return `${hex}${opacityMap['40']}`;
    }
    case 50: {
      return `${hex}${opacityMap['50']}`;
    }
    case 60: {
      return `${hex}${opacityMap['60']}`;
    }
    case 70: {
      return `${hex}${opacityMap['70']}`;
    }
    case 80: {
      return `${hex}${opacityMap['80']}`;
    }
    case 90: {
      return `${hex}${opacityMap['90']}`;
    }
    case 100: {
      return `${hex}${opacityMap['100']}`;
    }
    default: {
      return hex;
    }
  }
};
