import ViewModel from '../ViewModel';

import store from 'src/store';

jest.mock('next/config', () => (): unknown => ({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
}));

describe('Stepper Test', () => {
  const appStore = new store();
  let viewModel: ViewModel;

  beforeEach(() => {
    viewModel = new ViewModel(appStore);
  });

  const defaultSteps = [
    {
      step: '1',
      progress: '25',
      next: 'Document upload',
      title: 'Verify Your Info',
    },
    {
      step: '2',
      progress: '50',
      next: 'Review your information',
      title: 'Additional Docs',
    },
    {
      step: '3',
      progress: '75',
      next: 'Payment Method',
      title: 'Review',
    },
    {
      step: '4',
      progress: '100',
      next: 'Your Information is submitted',
      title: 'Payment Method',
    },
  ];

  const paymentRequiredSteps = [
    {
      step: '1',
      progress: '25',
      next: 'Document upload',
      title: 'Verify Your Info',
    },
    {
      step: '2',
      progress: '50',
      next: 'Review your information',
      title: 'Additional Docs',
    },
    {
      step: '3',
      progress: '75',
      next: 'Review',
      title: 'Payment Method',
    },
    {
      step: '4',
      progress: '100',
      next: 'Your Information is submitted',
      title: 'Review',
    },
  ];

  it('readonly values', () => {
    expect(viewModel.defaultSteps).toEqual(defaultSteps);
    expect(viewModel.paymentRequiredSteps).toEqual(paymentRequiredSteps);
  });

  it('test absmart should return true', () => {
    appStore.absmart.isInExperiment = jest.fn().mockReturnValue(true);
    expect(viewModel.isPaymentRequireExp()).toEqual(true);
  });
});
