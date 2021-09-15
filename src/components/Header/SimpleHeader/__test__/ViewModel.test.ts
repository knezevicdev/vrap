import ViewModel from '../ViewModel';

describe('SimpleHeader Test', () => {
  const viewModel = new ViewModel();

  it('readonly values', () => {
    expect(viewModel.callUs).toBe(`QUESTIONS? CALL US: (832) 538-3550`);
  });
});
