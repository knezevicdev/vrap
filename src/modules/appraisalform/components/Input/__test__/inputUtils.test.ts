import { hiddenString, removeLastNumber } from '../inputUtils';

describe('test inputUtils ', () => {
  it('test removeLastNumber ', () => {
    const removed = removeLastNumber('abc123abc');
    const notRemoved = removeLastNumber('abc');
    expect(removed).toEqual('abc12abc');
    expect(notRemoved).toEqual('abc');
  });

  it('test hiddenString ', () => {
    const stringHidden = hiddenString(3);
    expect(stringHidden).toEqual('\u2022\u2022\u2022');
  });
});
