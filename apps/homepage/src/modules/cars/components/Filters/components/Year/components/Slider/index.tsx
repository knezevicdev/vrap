import React from 'react';

import { SliderProps } from './types';
import View from './View';
import ViewModel from './ViewModel';

const Slider: React.FC<SliderProps> = props => {
  const viewModel = new ViewModel();
  return <View {...props} viewModel={viewModel} />;
};

export default Slider;
