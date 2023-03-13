import { useABSmartly } from '@vroom-web/analytics-integration';
import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

interface Prop {
  activeStep: string;
}

const VerificationStepper: React.FC<Prop> = ({ activeStep }) => {
  const absmartly = useABSmartly();
  const viewModel = new ViewModel(absmartly);
  return <View viewModel={viewModel} activeStep={activeStep} />;
};

export default VerificationStepper;
