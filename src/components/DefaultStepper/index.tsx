import React from 'react';

import View from './View';

export interface Props {
  activeStep: number;
}

const DefaultStepper: React.FC<Props> = ({ activeStep }) => {
  return <View activeStep={activeStep} />;
};

export default DefaultStepper;
