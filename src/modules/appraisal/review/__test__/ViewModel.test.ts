import { useRouter } from 'next/router';

import ViewModel from '../ViewModel';

import Store from 'src/store';

jest.mock('next/config', () => (): unknown => ({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
}));

describe('Appraisal review index page test', () => {
  let viewModel: ViewModel;

  beforeEach(() => {
    const stores = new Store();
    const router = useRouter();
    viewModel = new ViewModel(stores, router);
  });

  it('check title', () => {
    expect(viewModel.title).toEqual('my appraisal review');
  });
});
