import { addOpacityToHex } from '../util';

describe('test Util in themes ', () => {
  it('test addOpacityToHex', () => {
    const hexZero = addOpacityToHex('d1df', 0);
    expect(hexZero).toEqual('d1df00');

    const hexOne = addOpacityToHex('d1df', 10);
    expect(hexOne).toEqual('d1df1A');

    const hexTwo = addOpacityToHex('d1df', 20);
    expect(hexTwo).toEqual('d1df33');

    const hexThree = addOpacityToHex('d1df', 30);
    expect(hexThree).toEqual('d1df4D');

    const hexFour = addOpacityToHex('d1df', 40);
    expect(hexFour).toEqual('d1df66');

    const hexFive = addOpacityToHex('d1df', 50);
    expect(hexFive).toEqual('d1df80');

    const hexSix = addOpacityToHex('d1df', 60);
    expect(hexSix).toEqual('d1df99');

    const hexSeven = addOpacityToHex('d1df', 70);
    expect(hexSeven).toEqual('d1dfB3');

    const hexEight = addOpacityToHex('d1df', 80);
    expect(hexEight).toEqual('d1dfCC');

    const hexNine = addOpacityToHex('d1df', 90);
    expect(hexNine).toEqual('d1dfE6');

    const hexTen = addOpacityToHex('d1df', 100);
    expect(hexTen).toEqual('d1dfFF');
  });
});
