import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

interface Prop {
  activeStep: string;
}

const VerificationStepper: React.FC<Prop> = ({ activeStep }) => {
  const viewModel = new ViewModel();
  return <View viewModel={viewModel} activeStep={activeStep} />;
};

export default VerificationStepper;
