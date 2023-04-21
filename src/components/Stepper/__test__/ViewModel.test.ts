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

  it('readonly values', () => {
    expect(viewModel.defaultSteps).toEqual(defaultSteps);
  });
});
