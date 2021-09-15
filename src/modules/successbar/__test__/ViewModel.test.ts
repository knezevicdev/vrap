import ViewModel from '../ViewModel';

jest.mock('next/config', () => (): unknown => ({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
}));

describe('test success bar ViewModel', () => {
  const viewModel = new ViewModel();

  it('test contents', () => {
    expect(viewModel.success).toEqual(
      'Thanks for submitting your information!'
    );
  });
});
