import ViewModel from '../ViewModel';

jest.mock('next/config', () => (): unknown => ({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
}));

describe('Appraisal review index page test', () => {
  let viewModel: ViewModel;

  beforeEach(() => {
    viewModel = new ViewModel();
  });

  it('check title', () => {
    expect(viewModel.title).toEqual('my appraisal review');
  });
});
