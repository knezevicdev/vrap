import { ABSmartlyContextValue } from '@vroom-web/analytics-integration/dist/absmartly/types';

import { Stepper } from 'src/interfaces.d';

class VerificationStepperViewModel {
  constructor(private absmartly: ABSmartlyContextValue) {}
  readonly defaultSteps: Stepper[] = [
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
  readonly vehiclePhotosSteps: Stepper[] = [
    {
      step: '1',
      progress: '20',
      next: 'Document upload',
      title: 'Verify Your Info',
    },
    {
      step: '2',
      progress: '40',
      next: 'Vehicle Photos',
      title: 'Additional Docs',
    },
    {
      step: '3',
      progress: '60',
      next: 'Review your information',
      title: 'Upload Vehicle Photos',
    },
    {
      step: '4',
      progress: '80',
      next: 'Payment Method',
      title: 'Review',
    },
    {
      step: '5',
      progress: '100',
      next: 'Your Information is submitted',
      title: 'Payment Method',
    },
  ];

  isVehiclePhotosExp = (): boolean => {
    return this.absmartly.isInExperiment(
      'verification-form-vehicle-photo-upload'
    );
  };
}

export default VerificationStepperViewModel;
