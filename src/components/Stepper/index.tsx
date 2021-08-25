import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { Stepper } from 'src/interfaces.d';

export interface Props {
  activeStep: Stepper;
}

const VerificationStepper: React.FC<Props> = ({ activeStep }) => {
  const viewModel = new ViewModel();
  return <View activeStep={activeStep} viewModel={viewModel} />;
};

export default VerificationStepper;
