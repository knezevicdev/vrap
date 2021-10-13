import React from 'react';

import { StepModel } from './types';
import View from './View';
import ViewModel from './ViewModel';

export interface Props {
  activeStep: StepModel;
}

const DefaultStepper: React.FC<Props> = ({ activeStep }) => {
  return <View viewModel={new ViewModel()} activeStep={activeStep} />;
};

export default DefaultStepper;
