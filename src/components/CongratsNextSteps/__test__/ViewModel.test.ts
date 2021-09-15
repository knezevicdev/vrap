import ViewModel from '../ViewModel';

describe('CongratsNextSteps Test', () => {
  const viewModel = new ViewModel();
  const ExpectedSteps = [
    {
      id: 1,
      description:
        'Expect to receive an email or a physical package by mail with contracts to sign.',
      title: 'Sign documents',
    },
    {
      id: 2,
      description:
        'Our shipping specialists will schedule a time to come pick up your car.',
      title: 'We pick up',
    },
    {
      id: 3,
      description: `Once we have your car, we'll process your payment within 2-3 business days.`,
      title: 'You get paid',
    },
  ];

  afterEach(() => {
    localStorage.removeItem('priceId');
  });

  it('readonly values', () => {
    expect(viewModel.nextSteps).toBe(`what to expect next...`);
    expect(viewModel.steps).toEqual(ExpectedSteps);
  });
});
