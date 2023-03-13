import { ABSmartlyContextValue } from '@vroom-web/analytics-integration/dist/absmartly/types';

import ViewModel from '../ViewModel';

jest.mock('next/config', () => (): unknown => ({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
}));

const absmartly = {
  isInExperiment: () => false,
  isLoading: false,
} as any as ABSmartlyContextValue;

describe('Stepper Test', () => {
  let viewModel: ViewModel;

  beforeEach(() => {
    viewModel = new ViewModel(absmartly);
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
    absmartly.isInExperiment = jest.fn().mockReturnValue(true);
    expect(viewModel.isPaymentRequireExp()).toEqual(true);
  });
});
