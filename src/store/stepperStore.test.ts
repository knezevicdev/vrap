import { StepperStore } from './stepperStore';

describe('test stepper store', () => {
  let store: StepperStore;
  beforeEach(() => {
    store = new StepperStore();
  });

  test('initial current step value ', () => {
    expect(store.currentStep).toEqual({
      step: '1',
      progress: '25',
      next: 'Document upload',
      title: 'Verify Your Info',
    });
  });

  test('setStep called, should currentStep value change ', () => {
    store.setStep(2);
    expect(store.currentStep).toEqual({
      step: '3',
      progress: '75',
      next: 'Payment Method',
      title: 'Review',
    });
  });
});
